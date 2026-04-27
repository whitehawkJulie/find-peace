import React, { useState, useEffect, useRef } from "react";
import { useWizard } from "./WizardContext";
import { setPendingNavMethod } from "../analytics/analytics";
import SavedEntries from "./SavedEntries";
import "./SideMenu.css";

const GROUP_LABELS = {
	intro:    "",
	happened: "👁 What happened",
	felt:     "💧 What you felt",
	mattered: "❤️ What mattered",
	them:     "🔍 What may be going on for them",
	next:     "🌱 What to do next",
};
const GROUPS = ["intro", "happened", "felt", "mattered", "them", "next"];

const SideMenu = ({ isOpen, onClose }) => {
	const {
		allSteps,
		visibleSteps,
		stepIndex,
		setStepIndex,
		setShowSummary,
		setShowSettings,
		saveSession,
		resetSession,
		hasSessionData,
		savedEntries,
		loadedId,
		openHelpTopic,
	} = useWizard();

	const [subPanel, setSubPanel] = useState(null); // null | "open"
	const [savedFeedback, setSavedFeedback] = useState(false);
	const [confirmNew, setConfirmNew] = useState(false);
	const feedbackTimer = useRef(null);

	// Reset sub-panel when menu closes
	useEffect(() => {
		if (!isOpen) setSubPanel(null);
	}, [isOpen]);

	// Clear feedback timer on unmount
	useEffect(() => () => clearTimeout(feedbackTimer.current), []);

	const handleSave = async () => {
		await saveSession();
		setSavedFeedback(true);
		clearTimeout(feedbackTimer.current);
		feedbackTimer.current = setTimeout(() => setSavedFeedback(false), 2000);
	};

	const handleStepClick = (visIdx) => {
		setPendingNavMethod("menu");
		setStepIndex(visIdx);
		onClose();
	};

	return (
		<>
			{isOpen && <div className="side-menu-backdrop" onClick={onClose} />}
			<div className={`side-menu${isOpen ? " show" : ""}`} aria-hidden={!isOpen}>
				{/* ── Sliding panels container ── */}
				<div className={`side-menu-panels${subPanel ? " side-menu-panels--slide" : ""}`}>
					{/* ── Panel 1: main menu ── */}
					<div className="side-menu-panel">
						<div className="side-menu-header">
							<button className="side-menu-close" onClick={onClose} aria-label="Close menu">
								✕
							</button>
						</div>

						{/* File operations */}
						<div className="side-menu-actions side-menu-actions--top">
							{confirmNew ? (
								<div className="side-menu-confirm-new">
									<span>Start fresh? Unsaved work will be lost.</span>
									<div className="side-menu-confirm-btns">
										<button
											className="side-menu-confirm-yes"
											onClick={() => {
												resetSession();
												setConfirmNew(false);
												onClose();
											}}>
											Yes, start new
										</button>
										<button
											className="side-menu-confirm-cancel"
											onClick={() => setConfirmNew(false)}>
											Cancel
										</button>
									</div>
								</div>
							) : (
								<button
									className="side-menu-action"
									onClick={() =>
										hasSessionData() ? setConfirmNew(true) : (resetSession(), onClose())
									}>
									✦ New
								</button>
							)}
							<button
								className="side-menu-action"
								disabled={savedEntries.length === 0}
								onClick={() => setSubPanel("open")}>
								📂 Open
							</button>
							<button
								className={`side-menu-action${savedFeedback ? " side-menu-action--saved" : ""}`}
								onClick={handleSave}
								disabled={!hasSessionData()}>
								{savedFeedback ? "✓ Saved" : "💾 Save"}
							</button>
							<button
								className="side-menu-action"
								onClick={() => {
									setShowSummary(true);
									onClose();
								}}>
								📋 Summary
							</button>
						</div>

						<div className="side-menu-divider" />

						{/* Page navigation */}
						<div className="side-menu-nav-heading">Pages</div>
						<nav className="side-menu-nav">
							{GROUPS.map((group) => {
								const groupSteps = allSteps.filter((s) => s.group === group);
								if (groupSteps.length === 0) return null;
								return (
									<div key={group} className="side-menu-group">
										{GROUP_LABELS[group] && <div className="side-menu-group-heading">{GROUP_LABELS[group]}</div>}
										{groupSteps.map((step) => {
											const visIdx = visibleSteps.findIndex(
												(s) => s.component === step.component,
											);
											const isLocked = visIdx === -1;
											const isCurrent = !isLocked && visIdx === stepIndex;
											const isPast = !isLocked && visIdx < stepIndex;
											const isAccessible = !isLocked;

											const label = step.component?.navTitle || step.component?.title || "";
											const stateClass = isCurrent
												? "side-menu-step--current"
												: isAccessible
													? "side-menu-step--past"
													: "side-menu-step--unavailable";

											return (
												<button
													key={step.component?.navTitle ?? label}
													className={`side-menu-step ${stateClass}`}
													disabled={!isAccessible}
													onClick={() => isAccessible && handleStepClick(visIdx)}
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

						{/* Secondary actions */}
						<div className="side-menu-actions">
							<button
								className="side-menu-action"
								onClick={() => {
									setShowSettings(true);
									onClose();
								}}>
								⚙ Settings
							</button>
							<button
								className="side-menu-action"
								onClick={() => {
									openHelpTopic("about");
									onClose();
								}}>
								ℹ About
							</button>
							<button
								className="side-menu-action"
								onClick={() => {
									openHelpTopic("privacy");
									onClose();
								}}>
								🔒 Privacy
							</button>
						</div>
					</div>

					{/* ── Panel 2: saved entries ── */}
					<div className="side-menu-panel" aria-hidden={subPanel !== "open"}>
						<div className="side-menu-header side-menu-header--sub">
							<button
								className="side-menu-back"
								onClick={() => setSubPanel(null)}
								aria-label="Back to menu">
								‹ Back
							</button>
							<span className="side-menu-sub-title">Saved sessions</span>
							<button className="side-menu-close" onClick={onClose} aria-label="Close menu">
								✕
							</button>
						</div>
						<div className="side-menu-sub-body">
							<SavedEntries onSessionLoaded={onClose} />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SideMenu;
