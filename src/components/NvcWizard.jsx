import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import PauseInterstitial from "./PauseInterstitial";
import { useWizard } from "./WizardContext";

const NvcWizard = () => {
	const { stepIndex, visibleSteps, settings } = useWizard();
	const [showPause, setShowPause] = useState(false);
	const [pauseMessage, setPauseMessage] = useState("");
	const prevStepIndex = useRef(stepIndex);

	const skipPauses = settings.skipPauses ?? false;

	useEffect(() => {
		const movedForward = stepIndex > prevStepIndex.current;
		prevStepIndex.current = stepIndex;

		if (!skipPauses && movedForward && visibleSteps[stepIndex]?.pause) {
			setPauseMessage(visibleSteps[stepIndex].pause);
			setShowPause(true);
		} else {
			setShowPause(false);
		}
	}, [stepIndex, visibleSteps, skipPauses]);

	if (!visibleSteps || visibleSteps.length === 0) return null;

	const currentStep = visibleSteps[stepIndex];
	const CurrentStepComponent = currentStep.component;

	const title = CurrentStepComponent.title || "";
	const helpContent = CurrentStepComponent.helpContent || null;

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
