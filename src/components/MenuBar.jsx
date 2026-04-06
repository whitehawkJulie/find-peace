import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import { trackEvent, currentPage, setPendingNavMethod } from "../analytics/analytics";
import "./MenuBar.css";

const MenuBar = () => {
	const { stepIndex, setStepIndex, visibleSteps, allSteps, currentStep, resetSession, hasSessionData } = useWizard();

	const [confirmNew, setConfirmNew] = useState(false);

	const hasPrev = stepIndex > 0;
	const hasNext = stepIndex < visibleSteps.length - 1;

	const goToPrevious = () => { if (hasPrev) { setPendingNavMethod("button"); setStepIndex(stepIndex - 1); } };
	const goToNext    = () => { if (hasNext)  { setPendingNavMethod("button"); setStepIndex(stepIndex + 1); } };

	const prevStep  = hasPrev ? visibleSteps[stepIndex - 1] : null;
	const nextStep  = hasNext ? visibleSteps[stepIndex + 1] : null;
	const prevTitle = prevStep ? (prevStep.component?.navTitle || "") : "";
	const nextTitle = nextStep ? (nextStep.component?.navTitle || "") : "";

	// Base progress on allSteps so the bar doesn't jump when conditional steps appear
	const allStepIndex = allSteps.findIndex((s) => s.component === currentStep?.component);
	const progressPct  = allSteps.length > 1 ? (allStepIndex / (allSteps.length - 1)) * 100 : 100;

	const handleNewSession = () => {
		if (hasSessionData()) {
			setConfirmNew(true);
		} else {
			trackEvent("action", { action_name: "new_session", page_name: currentPage });
			resetSession();
		}
	};

	const confirmAndReset = () => {
		trackEvent("action", { action_name: "new_session", page_name: currentPage });
		resetSession();
		setConfirmNew(false);
	};

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

				{hasNext ? (
					<button
						onClick={goToNext}
						className="nav-button nav-button--next"
						aria-label="Next"
						style={currentStep?.color ? { background: currentStep.color } : undefined}>
						<span className="nav-button-label">Next →</span>
						{nextTitle && <span className="nav-button-sub">{nextTitle}</span>}
					</button>
				) : (
					<div className="nav-new-session">
						{confirmNew ? (
							<>
								<span className="nav-new-confirm-text">Start fresh?</span>
								<button className="nav-new-yes" onClick={confirmAndReset}>Yes</button>
								<button className="nav-new-cancel" onClick={() => setConfirmNew(false)}>No</button>
							</>
						) : (
							<button className="nav-button nav-button--next nav-button--new" onClick={handleNewSession}>
								<span className="nav-button-label">↺ New session</span>
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export default MenuBar;
