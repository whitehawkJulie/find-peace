import React, { useRef, useEffect } from "react";
import Card from "./Card";
/* Pause screens imports — kept for when pauses are re-enabled:
import PauseInterstitial from "./PauseInterstitial";
*/
import UnpackNeeds from "./UnpackNeeds";
import { useWizard } from "./WizardContext";
import { trackEvent, startPage, endPage, flush, consumeNavMethod, SESSION_START, currentPage } from "../analytics/analytics";
const NvcWizard = () => {
	const {
		stepIndex,
		setStepIndex,
		visibleSteps,
		needExplorationOpen,
		setHelpDrawerOpen,
		setHelpDrawerOverride,
		currentExploringNeed,
		explorationStep,
		cardContentRef,
		dirtyRef,
		settings,
		feelings,
		needs,
		needExplorations,
	} = useWizard();

	// Keep a ref with current session data so the [] beforeunload effect can read it
	const sessionDataRef = useRef({});
	sessionDataRef.current = { feelings, needs, needExplorations };
	const prevStepIndex = useRef(stepIndex);
	const isPopState = useRef(false);
	const mounted = useRef(false);

	// Warn before leaving the page if the user has unsaved changes; also fire session_end analytics
	const sessionEndFiredRef = useRef(false);
	useEffect(() => {
		const fireSessionEnd = () => {
			if (sessionEndFiredRef.current) return; // only fire once per session
			sessionEndFiredRef.current = true;
			const { feelings: f, needs: n, needExplorations: ne } = sessionDataRef.current;
			const times = endPage();
			trackEvent("session_end", {
				duration_ms: Date.now() - SESSION_START,
				last_page: currentPage,
				feelings_count: Object.keys(f || {}).length,
				needs_count: Object.keys(n || {}).length,
				feelings_selected: Object.entries(f || {}).filter(([, s]) => s === "clicked").map(([name]) => name),
				feelings_strong:   Object.entries(f || {}).filter(([, s]) => s === "double-clicked").map(([name]) => name),
				needs_selected:    Object.entries(n || {}).filter(([, s]) => s === "clicked").map(([name]) => name),
				needs_strong:      Object.entries(n || {}).filter(([, s]) => s === "double-clicked").map(([name]) => name),
				needs_unpacked: Object.entries(ne || {})
					.filter(([, v]) => v.completed)
					.map(([name]) => name),
				...times,
			});
			flush();
		};

		const handleBeforeUnload = (e) => {
			fireSessionEnd();
			if (!dirtyRef.current) return;
			e.preventDefault();
			// Modern browsers ignore custom messages and show their own generic text,
			// but setting returnValue is still required to trigger the dialog.
			e.returnValue = "";
		};

		// visibilitychange → hidden is the most reliable signal on mobile (iOS Safari
		// often skips beforeunload entirely). pagehide catches remaining cases.
		const handleVisibilityChange = () => {
			if (document.visibilityState === "hidden") fireSessionEnd();
		};
		const handlePageHide = () => fireSessionEnd();

		window.addEventListener("beforeunload", handleBeforeUnload);
		document.addEventListener("visibilitychange", handleVisibilityChange);
		window.addEventListener("pagehide", handlePageHide, { passive: true });
		return () => {
			window.removeEventListener("beforeunload", handleBeforeUnload);
			document.removeEventListener("visibilitychange", handleVisibilityChange);
			window.removeEventListener("pagehide", handlePageHide);
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Register popstate listener once on mount
	useEffect(() => {
		const handlePopState = (e) => {
			if (e.state && typeof e.state.stepIndex === "number") {
				isPopState.current = true;
				setStepIndex(e.state.stepIndex);
			}
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		cardContentRef.current?.scrollTo(0, 0);
		setHelpDrawerOpen(false);
		setHelpDrawerOverride(null);

		// Capture page names BEFORE updating prevStepIndex
		const pageName = visibleSteps[stepIndex]?.component?.navTitle ?? `step-${stepIndex}`;
		const prevName = visibleSteps[prevStepIndex.current]?.component?.navTitle ?? `step-${prevStepIndex.current}`;

		prevStepIndex.current = stepIndex;

		// On first render: seed the initial history entry so Back works from step 0
		if (!mounted.current) {
			mounted.current = true;
			history.replaceState({ stepIndex: 0 }, "");
			startPage(pageName);
			trackEvent("page_view", { page_name: pageName });
			return;
		}
		// On popstate-driven changes: clear the flag, don't push a duplicate entry
		if (isPopState.current) {
			isPopState.current = false;
			const times = endPage();
			trackEvent("page_exit", { page_name: prevName, ...times });
			trackEvent("backtrack", { page_name: pageName });
			startPage(pageName);
			trackEvent("page_view", { page_name: pageName });
			return;
		}
		// Normal step change: push a new history entry
		const times = endPage();
		trackEvent("page_exit", { page_name: prevName, ...times });
		trackEvent("navigation", { from_page: prevName, to_page: pageName, method: consumeNavMethod() ?? "button" });
		startPage(pageName);
		trackEvent("page_view", { page_name: pageName });
		history.pushState({ stepIndex }, "");
	}, [stepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!visibleSteps || visibleSteps.length === 0) return null;

	const currentStep = visibleSteps[stepIndex];

	// When the need exploration overlay is open, render UnpackNeeds instead of the current step
	const CurrentStepComponent = needExplorationOpen ? UnpackNeeds : currentStep.component;

	// Resolve the page title using .title / .titleSweary static properties
	const tone = settings?.tone ?? "polite";
	const title = needExplorationOpen
		? currentExploringNeed && explorationStep > 0
			? `Exploring "${currentExploringNeed}"?`
			: UnpackNeeds.title || ""
		: (tone === "sweary" && CurrentStepComponent.titleSweary)
			? CurrentStepComponent.titleSweary
			: CurrentStepComponent.title || "";

	const helpContent = needExplorationOpen ? UnpackNeeds.helpContent : CurrentStepComponent.helpContent || null;

	/* To re-enable pause screens:
	   1. Restore `useState` to the React import
	   2. Restore `PauseInterstitial` import
	   3. Restore `settings` from useWizard
	   4. Add: const [showPause, setShowPause] = useState(false);
	   5. Add: const [pauseMessage, setPauseMessage] = useState("");
	   6. Add: const skipPauses = settings.skipPauses ?? true;
	   7. Add to useEffect: if (!skipPauses && movedForward && visibleSteps[stepIndex]?.pause) {
	           setPauseMessage(visibleSteps[stepIndex].pause); setShowPause(true);
	       } else { setShowPause(false); }
	   8. Replace the Card below with:
	      {showPause ? (
	          <Card title="" helpContent={null} showHelp={false} hideNav>
	              <PauseInterstitial message={pauseMessage} onContinue={() => setShowPause(false)} />
	          </Card>
	      ) : (
	          <Card title={title} helpContent={helpContent} showHelp={!!helpContent}>
	              <CurrentStepComponent />
	          </Card>
	      )}
	*/

	return (
		<div className="nvc-wizard">
			<Card title={title} helpContent={helpContent} showHelp={!!helpContent}>
				<CurrentStepComponent />
			</Card>
		</div>
	);
};

export default NvcWizard;
