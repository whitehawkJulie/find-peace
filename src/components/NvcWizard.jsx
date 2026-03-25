import React, { useRef, useEffect } from "react";
import Card from "./Card";
/* Pause screens imports — kept for when pauses are re-enabled:
import PauseInterstitial from "./PauseInterstitial";
*/
import UnpackNeeds from "./UnpackNeeds";
import { useWizard } from "./WizardContext";
import { getText } from "../content/resolver";

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
	} = useWizard();
	const prevStepIndex = useRef(stepIndex);
	const isPopState = useRef(false);
	const mounted = useRef(false);

	// Warn before leaving the page if the user has unsaved changes
	useEffect(() => {
		const handleBeforeUnload = (e) => {
			if (!dirtyRef.current) return;
			e.preventDefault();
			// Modern browsers ignore custom messages and show their own generic text,
			// but setting returnValue is still required to trigger the dialog.
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
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
		prevStepIndex.current = stepIndex;

		// On first render: seed the initial history entry so Back works from step 0
		if (!mounted.current) {
			mounted.current = true;
			history.replaceState({ stepIndex: 0 }, "");
			return;
		}
		// On popstate-driven changes: clear the flag, don't push a duplicate entry
		if (isPopState.current) {
			isPopState.current = false;
			return;
		}
		// Normal step change: push a new history entry
		history.pushState({ stepIndex }, "");
	}, [stepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!visibleSteps || visibleSteps.length === 0) return null;

	const currentStep = visibleSteps[stepIndex];

	// When the need exploration overlay is open, render UnpackNeeds instead of the current step
	const CurrentStepComponent = needExplorationOpen ? UnpackNeeds : currentStep.component;

	// Resolve the page title: prefer titleKey (tone-sensitive) over the plain .title fallback
	const toneContext = { tone: settings?.tone ?? "polite" };
	const title = needExplorationOpen
		? currentExploringNeed && explorationStep > 0
			? `Exploring "${currentExploringNeed}"?`
			: UnpackNeeds.title || ""
		: CurrentStepComponent.titleKey
			? getText(CurrentStepComponent.titleKey, toneContext)
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
