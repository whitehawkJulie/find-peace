import React from "react";
import { useWizard } from "./WizardContext";
import { getText } from "../content/resolver";
import "./MenuBar.css";

const MenuBar = () => {
	const { stepIndex, setStepIndex, visibleSteps, allSteps, currentStep } = useWizard();

	const hasPrev = stepIndex > 0;
	const hasNext = stepIndex < visibleSteps.length - 1;

	const goToPrevious = () => {
		if (hasPrev) setStepIndex(stepIndex - 1);
	};

	const goToNext = () => {
		if (hasNext) setStepIndex(stepIndex + 1);
	};

	const prevStep = hasPrev ? visibleSteps[stepIndex - 1] : null;
	const nextStep = hasNext ? visibleSteps[stepIndex + 1] : null;
	const prevTitle = prevStep ? (prevStep.navTitleKey ? getText(prevStep.navTitleKey) : prevStep.title || "") : "";
	const nextTitle = nextStep ? (nextStep.navTitleKey ? getText(nextStep.navTitleKey) : nextStep.title || "") : "";

	// Base progress on allSteps so the bar doesn't jump when conditional steps appear
	const allStepIndex = allSteps.findIndex((s) => s.component === currentStep?.component);
	const progressPct = allSteps.length > 1 ? (allStepIndex / (allSteps.length - 1)) * 100 : 100;

	return (
		<div className="menu-bar">
			<div className="menu-bar-progress">
				<div
					className="menu-bar-progress-fill"
					style={{
						width: `${progressPct}%`,
						background: currentStep?.color || "var(--color-green)",
					}}
				/>
			</div>

			<div className="menu-bar-controls">
				<button
					onClick={goToPrevious}
					disabled={!hasPrev}
					className="nav-button nav-button--prev"
					aria-label="Previous"
					style={currentStep?.color ? { background: currentStep.color } : undefined}>
					<span className="nav-button-label">← Prev</span>
					{prevTitle && <span className="nav-button-sub">{prevTitle}</span>}
				</button>

				<button
					onClick={goToNext}
					disabled={!hasNext}
					className="nav-button nav-button--next"
					aria-label="Next"
					style={currentStep?.color ? { background: currentStep.color } : undefined}>
					<span className="nav-button-label">Next →</span>
					{nextTitle && <span className="nav-button-sub">{nextTitle}</span>}
				</button>
			</div>
		</div>
	);
};

export default MenuBar;
