import React from "react";
import { useWizard } from "./WizardContext";
import "./MenuBar.css";

const MenuBar = () => {
	const { stepIndex, setStepIndex, visibleSteps } = useWizard();

	const hasPrev = stepIndex > 0;
	const hasNext = stepIndex < visibleSteps.length - 1;

	const goToPrevious = () => {
		if (hasPrev) setStepIndex(stepIndex - 1);
	};

	const goToNext = () => {
		if (hasNext) setStepIndex(stepIndex + 1);
	};

	return (
		<div className="menu-bar">
			<button onClick={goToPrevious} disabled={!hasPrev} className="nav-button" aria-label="Previous">
				← Prev
			</button>

			<button onClick={goToNext} disabled={!hasNext} className="nav-button" aria-label="Next">
				Next →
			</button>
		</div>
	);
};

export default MenuBar;
