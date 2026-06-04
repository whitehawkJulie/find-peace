import React from "react";
import { useGratitude } from "./GratitudeContext";
import GratitudeCard from "./GratitudeCard";

const GratitudeWizard = () => {
	const { visibleSteps, stepIndex, settings } = useGratitude();

	if (!visibleSteps || visibleSteps.length === 0) return null;

	const currentStep = visibleSteps[stepIndex];
	const CurrentStepComponent = currentStep.component;
	const title = CurrentStepComponent.title || "";

	return (
		<div className={`nvc-wizard${settings?.dyslexiaFont ? " dyslexia-font" : ""}`}>
			<GratitudeCard title={title}>
				<CurrentStepComponent />
			</GratitudeCard>
		</div>
	);
};

export default GratitudeWizard;
