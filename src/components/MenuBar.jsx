import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import { trackEvent, currentPage, setPendingNavMethod } from "../analytics/analytics";
import "./MenuBar.css";

const MenuBar = () => {
	const {
		stepIndex,
		setStepIndex,
		visibleSteps,
		allSteps,
		currentStep,
		resetSession,
		hasSessionData,
		setShowSummary,
		saveSession,
	} = useWizard();

	const [confirmNew, setConfirmNew] = useState(false);

	const subPageOf = currentStep?.subPageOf;
	const prevIdx = subPageOf ? visibleSteps.findIndex((s) => s.component === subPageOf) : stepIndex - 1;
	const nextIdx = subPageOf
		? visibleSteps.reduce((last, s, i) => (s.subPageOf === subPageOf ? i : last), -1) + 1
		: stepIndex + 1;

	const hasPrev = prevIdx >= 0;
	const hasNext = nextIdx >= 0 && nextIdx < visibleSteps.length;

	const goToPrevious = () => {
		if (hasPrev) {
			setPendingNavMethod("button");
			setStepIndex(prevIdx);
		}
	};
	const goToNext = () => {
		if (hasNext) {
			setPendingNavMethod("button");
			setStepIndex(nextIdx);
		}
	};

	const prevTitle = hasPrev ? visibleSteps[prevIdx]?.component?.navTitle || "" : "";
	const nextTitle = hasNext ? visibleSteps[nextIdx]?.component?.navTitle || "" : "";

	// Base progress on allSteps so the bar doesn't jump when conditional steps appear
	const allStepIndex = allSteps.findIndex((s) => s.component === currentStep?.component);
	const progressPct = allSteps.length > 1 ? (allStepIndex / (allSteps.length - 1)) * 100 : 100;

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

	const saveAndReset = async () => {
		await saveSession();
		trackEvent("action", { action_name: "save_and_new_session", page_name: currentPage });
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

				<button
					className="nav-summary-btn"
					onClick={() => setShowSummary(true)}
					title="View Summary"
					aria-label="View Summary">
					<span className="nav-summary-icon">📋</span>
					<span className="nav-summary-label">Summary</span>
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
						<button className="nav-button nav-button--next nav-button--new" onClick={handleNewSession}>
							<span className="nav-button-label">↺ New session</span>
						</button>
					</div>
				)}

				{confirmNew && (
					<div className="new-session-backdrop" onClick={() => setConfirmNew(false)}>
						<div className="new-session-dialog" onClick={(e) => e.stopPropagation()}>
							<p className="new-session-title">Start a new session?</p>
							<p className="new-session-msg">Would you like to save your existing selections first?</p>
							<div className="new-session-actions">
								{hasSessionData() && (
									<button className="new-session-save" onClick={saveAndReset}>
										💾 Save & start new
									</button>
								)}
								<button className="new-session-cancel" onClick={() => setConfirmNew(false)}>
									Cancel
								</button>
								<button className="new-session-confirm" onClick={confirmAndReset}>
									Restart without saving
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default MenuBar;
