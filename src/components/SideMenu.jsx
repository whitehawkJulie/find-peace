import React, { useState, useEffect, useRef } from "react";
import { useWizard } from "./WizardContext";
import { getText } from "../content/resolver";
import "./SideMenu.css";

const GROUP_LABELS = {
	understand: "Understand what happened",
	find: "Find what matters",
	move: "Move forward",
};
const GROUPS = ["understand", "find", "move"];

const SideMenu = ({ isOpen, onClose }) => {
	const {
		allSteps,
		visibleSteps,
		stepIndex,
		setStepIndex,
		setShowSummary,
		setShowSettings,
		saveSession,
		hasSessionData,
	} = useWizard();

	const [savedFeedback, setSavedFeedback] = useState(false);
	const feedbackTimer = useRef(null);

	// Clear feedback timer on unmount
	useEffect(() => () => clearTimeout(feedbackTimer.current), []);

	const handleSave = async () => {
		await saveSession();
		setSavedFeedback(true);
		clearTimeout(feedbackTimer.current);
		feedbackTimer.current = setTimeout(() => setSavedFeedback(false), 2000);
	};

	const handleStepClick = (visIdx) => {
		setStepIndex(visIdx);
		onClose();
	};

	return (
		<>
			{isOpen && <div className="side-menu-backdrop" onClick={onClose} />}
			<div className={`side-menu${isOpen ? " show" : ""}`} aria-hidden={!isOpen}>
				<div className="side-menu-header">
					<button className="side-menu-close" onClick={onClose} aria-label="Close menu">
						✕
					</button>
				</div>

				<nav className="side-menu-nav">
					{GROUPS.map((group) => {
						const groupSteps = allSteps.filter((s) => s.group === group);
						if (groupSteps.length === 0) return null;
						return (
							<div key={group} className="side-menu-group">
								<div className="side-menu-group-heading">{GROUP_LABELS[group]}</div>
								{groupSteps.map((step) => {
									const visIdx = visibleSteps.findIndex((s) => s.component === step.component);
									const isLocked = visIdx === -1;
									const isCurrent = !isLocked && visIdx === stepIndex;
									const isPast = !isLocked && visIdx < stepIndex;
									// isFuture = !isLocked && visIdx > stepIndex

									const label = step.navTitleKey ? getText(step.navTitleKey) : step.title || "";
									const stateClass = isCurrent
										? "side-menu-step--current"
										: isPast
											? "side-menu-step--past"
											: "side-menu-step--unavailable";

									return (
										<button
											key={step.navTitleKey ?? label}
											className={`side-menu-step ${stateClass}`}
											disabled={!isPast}
											onClick={() => isPast && handleStepClick(visIdx)}
											aria-current={isCurrent ? "page" : undefined}>
											<span
												className="side-menu-step-dot"
												style={{ background: step.color }}
											/>
											<span className="side-menu-step-label">{label}</span>
											{isCurrent && <span className="side-menu-step-arrow">▶</span>}
										</button>
									);
								})}
							</div>
						);
					})}
				</nav>

				<div className="side-menu-divider" />

				<div className="side-menu-actions">
					<button
						className="side-menu-action"
						onClick={() => { setShowSummary(true); onClose(); }}>
						📋 Summary
					</button>
					<button
						className={`side-menu-action${savedFeedback ? " side-menu-action--saved" : ""}`}
						onClick={handleSave}
						disabled={!hasSessionData()}>
						{savedFeedback ? "✓ Saved" : "💾 Save"}
					</button>
					<button
						className="side-menu-action"
						onClick={() => { setShowSettings(true); onClose(); }}>
						📂 Load
					</button>
					<button
						className="side-menu-action"
						onClick={() => { setShowSettings(true); onClose(); }}>
						⚙ Settings
					</button>
				</div>
			</div>
		</>
	);
};

export default SideMenu;
