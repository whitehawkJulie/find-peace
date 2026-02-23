import React from "react";
import Card from "./Card";
import { useWizard } from "./WizardContext";

const NvcWizard = () => {
	const { stepIndex, visibleSteps } = useWizard();

	if (!visibleSteps || visibleSteps.length === 0) return null;

	const currentStep = visibleSteps[stepIndex];
	const CurrentStepComponent = currentStep.component;

	const title = CurrentStepComponent.title || "";
	const helpContent = CurrentStepComponent.helpContent || null;

	return (
		<div className="nvc-wizard">
			<Card title={title} helpContent={helpContent} showHelp={!!helpContent}>
				<CurrentStepComponent />
			</Card>
		</div>
	);
};

export default NvcWizard;
