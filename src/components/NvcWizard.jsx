// NvcWizard.jsx
import React from "react";
import Card from "./Card";
import { useWizard } from "./WizardContext";

const NvcWizard = () => {
	const { stepIndex, setStepIndex, visibleSteps } = useWizard();

	if (!visibleSteps || visibleSteps.length === 0) return null;

	const CurrentStepComponent = visibleSteps[stepIndex].component;

	const title = CurrentStepComponent.title || "";
	const helpContent = CurrentStepComponent.helpContent || null;

	return (
		<>
			<div className="app-header">
				<h1>Find Peace</h1>
			</div>
			<div className="nvc-wizard">
				<Card title={title} helpContent={helpContent} showHelp={!!helpContent}>
					<CurrentStepComponent />
				</Card>
			</div>
		</>
	);
};

export default NvcWizard;
