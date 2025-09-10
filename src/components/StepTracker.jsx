import React from "react";
import "./StepTracker.css";

const StepTracker = ({ steps, currentStepIndex }) => {
	return (
		<div className="step-tracker">
			{steps.map((step, index) => {
				const isOptional = step.optional;
				const isActive = index === currentStepIndex;

				return (
					<div
						key={index}
						className={`step ${isActive ? "active" : ""} ${isOptional ? "optional" : ""}`}
						title={step.title}>
						<div className="circle" />
						<span className="label">{step.title}</span>
						{index < steps.length - 1 && <div className="line" />}
					</div>
				);
			})}
		</div>
	);
};

export default StepTracker;
