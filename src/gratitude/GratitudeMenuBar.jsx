import React, { useState } from "react";
import { useGratitude } from "./GratitudeContext";
import "./GratitudeMenuBar.css";

const GratitudeMenuBar = () => {
	const {
		stepIndex,
		setStepIndex,
		visibleSteps,
		allSteps,
		currentStep,
		resetSession,
	} = useGratitude();

	const [confirmNew, setConfirmNew] = useState(false);

	const prevIdx = stepIndex - 1;
	const nextIdx = stepIndex + 1;
	const hasPrev = prevIdx >= 0;
	const hasNext = nextIdx < visibleSteps.length;
	const isLast = !hasNext;

	const prevTitle = hasPrev ? visibleSteps[prevIdx]?.component?.navTitle || "" : "";
	const nextTitle = hasNext ? visibleSteps[nextIdx]?.component?.navTitle || "" : "";

	// Progress based on allSteps so bar doesn't jump
	const allStepIndex = allSteps.findIndex((s) => s.component === currentStep?.component);
	const progressPct = allSteps.length > 1 ? (allStepIndex / (allSteps.length - 1)) * 100 : 100;

	const handleNew = () => {
		if (!confirmNew) { setConfirmNew(true); return; }
		resetSession();
		setConfirmNew(false);
	};

	return (
		<nav className="g-menu-bar">
			<div className="g-progress-bar">
				<div className="g-progress-fill" style={{ width: `${progressPct}%` }} />
			</div>

			<div className="g-menu-bar-row">
				<button
					className="g-nav-btn g-nav-prev"
					onClick={() => hasPrev && setStepIndex(prevIdx)}
					disabled={!hasPrev}
					aria-label="Previous">
					<span className="g-nav-arrow">←</span>
					{hasPrev && <span className="g-nav-sub">{prevTitle}</span>}
				</button>

				{isLast ? (
					<button
						className={`g-nav-btn g-nav-new${confirmNew ? " g-nav-new--confirm" : ""}`}
						onClick={handleNew}
						onBlur={() => setConfirmNew(false)}>
						{confirmNew ? "Sure? Tap again" : "↺ New session"}
					</button>
				) : (
					<button
						className="g-nav-btn g-nav-next"
						onClick={() => hasNext && setStepIndex(nextIdx)}
						disabled={!hasNext}
						aria-label="Next">
						{hasNext && <span className="g-nav-sub">{nextTitle}</span>}
						<span className="g-nav-arrow">→</span>
					</button>
				)}
			</div>
		</nav>
	);
};

export default GratitudeMenuBar;
