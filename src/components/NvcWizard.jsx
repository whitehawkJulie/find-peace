import React, { useRef, useEffect } from "react";
import Card from "./Card";
/* Pause screens imports — kept for when pauses are re-enabled:
import PauseInterstitial from "./PauseInterstitial";
*/
import NeedUnpacking from "./NeedUnpacking";
import { useWizard } from "./WizardContext";

const NvcWizard = () => {
	const {
		stepIndex,
		visibleSteps,
		needExplorationOpen,
		setHelpDrawerOpen,
		currentExploringNeed,
		explorationStep,
		cardContentRef,
	} = useWizard();
	const prevStepIndex = useRef(stepIndex);

	useEffect(() => {
		cardContentRef.current?.scrollTo(0, 0);
		setHelpDrawerOpen(false);
		prevStepIndex.current = stepIndex;
	}, [stepIndex]); // eslint-disable-line react-hooks/exhaustive-deps

	if (!visibleSteps || visibleSteps.length === 0) return null;

	const currentStep = visibleSteps[stepIndex];

	// When the need exploration overlay is open, render NeedUnpacking instead of the current step
	const CurrentStepComponent = needExplorationOpen ? NeedUnpacking : currentStep.component;
	const title = needExplorationOpen
		? currentExploringNeed && explorationStep > 0
			? `Exploring "${currentExploringNeed}"?`
			: NeedUnpacking.title || ""
		: CurrentStepComponent.title || "";
	const helpContent = needExplorationOpen ? NeedUnpacking.helpContent : CurrentStepComponent.helpContent || null;

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
