import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import PauseInterstitial from "./PauseInterstitial";
import NeedUnpacking from "./NeedUnpacking";
import { useWizard } from "./WizardContext";

const NvcWizard = () => {
	const {
		stepIndex,
		visibleSteps,
		settings,
		needExplorationOpen,
		setHelpDrawerOpen,
		currentExploringNeed,
		explorationStep,
		cardContentRef,
	} = useWizard();
	const [showPause, setShowPause] = useState(false);
	const [pauseMessage, setPauseMessage] = useState("");
	const prevStepIndex = useRef(stepIndex);

	const skipPauses = settings.skipPauses ?? true;

	useEffect(() => {
		cardContentRef.current?.scrollTo(0, 0);
		setHelpDrawerOpen(false);
		const movedForward = stepIndex > prevStepIndex.current;
		prevStepIndex.current = stepIndex;

		if (!skipPauses && movedForward && visibleSteps[stepIndex]?.pause) {
			setPauseMessage(visibleSteps[stepIndex].pause);
			setShowPause(true);
		} else {
			setShowPause(false);
		}
	}, [stepIndex, skipPauses]); // eslint-disable-line react-hooks/exhaustive-deps

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

	return (
		<div className="nvc-wizard">
			{showPause ? (
				<Card title="" helpContent={null} showHelp={false} hideNav>
					<PauseInterstitial message={pauseMessage} onContinue={() => setShowPause(false)} />
				</Card>
			) : (
				<Card title={title} helpContent={helpContent} showHelp={!!helpContent}>
					<CurrentStepComponent />
				</Card>
			)}
		</div>
	);
};

export default NvcWizard;
