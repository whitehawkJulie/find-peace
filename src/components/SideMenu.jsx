import React, { useState, useEffect, useRef } from "react";
import { useWizard } from "./WizardContext";
import { setPendingNavMethod } from "../analytics/analytics";
import SavedEntries from "./SavedEntries";
import { exportAllData, importAllData, daysSinceBackup } from "../utils/backupData";
import "./SideMenu.css";

const GROUP_LABELS = {
	intro: "",
	observation: "👁 What happened (Observation)",
	feelings: "💧 What you felt (Feelings)",
	needs: "❤️ What mattered (Needs)",
	them: "🔍 What may be going on for them",
	requests: "🌱 What to do next",
	review: "",
};
const GROUP_COLORS = {
	observation: "#a07820",
	feelings:    "#9e4466",
	needs:       "#3a72a0",
	them:        "#6d5870", // midpoint of the gradient — purple-ish
	requests:    "#5a8a4a",
};
const GROUPS = ["intro", "observation", "feelings", "needs", "them", "requests", "review"];

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
	const [backupAge, setBackupAge] = useState(() => daysSinceBackup());
	const [restoreState, setRestoreState] = useState(null); // null | "confirm" | "done" | "error"
	const [restoreError, setRestoreError] = useState("");
	const restoreInputRef = useRef(null);
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

	const handleBackup = () => {
		exportAllData();
		setBackupAge(0);
	};

	const handleRestoreFileChosen = async (e) => {
		const file = e.target.files[0];
		if (!file) return;
		e.target.value = "";
		try {
			await importAllData(file);
			setRestoreState("done");
		} catch (err) {
			setRestoreError(err.message);
			setRestoreState("error");
		}
	};

	const hasLocalData = ["findPeaceSessions", "gratitudeSessions"].some(
		(k) => localStorage.getItem(k) !== null,
	);
	const backupOverdue = hasLocalData && (backupAge === null || backupAge >= 7);

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
							<button className="side-menu-action" onClick={handleBackup}>
								⬇ Backup
							</button>
							<button
								className="side-menu-action"
								onClick={() => setRestoreState("confirm")}>
								⬆ Restore
							</button>
						</div>

						{/* Backup overdue reminder */}
						{backupOverdue && restoreState === null && (
							<div className="side-menu-backup-notice">
								{backupAge === null
									? "You haven't backed up yet."
									: `Last backup ${backupAge} day${backupAge === 1 ? "" : "s"} ago.`}{" "}
								<button className="button-styled-as-link" onClick={handleBackup}>
									Back up now
								</button>
							</div>
						)}

						{/* Restore confirm / result */}
						{restoreState === "confirm" && (
							<div className="side-menu-backup-notice side-menu-backup-notice--warn">
								<strong>Restore from file?</strong> This will overwrite all current data.{" "}
								<button
									className="button-styled-as-link"
									onClick={() => restoreInputRef.current?.click()}>
									Choose file
								</button>{" "}
								·{" "}
								<button
									className="button-styled-as-link"
									onClick={() => setRestoreState(null)}>
									Cancel
								</button>
							</div>
						)}
						{restoreState === "done" && (
							<div className="side-menu-backup-notice side-menu-backup-notice--ok">
								Restored. Reload the page to see your data.{" "}
								<button
									className="button-styled-as-link"
									onClick={() => window.location.reload()}>
									Reload now
								</button>
							</div>
						)}
						{restoreState === "error" && (
							<div className="side-menu-backup-notice side-menu-backup-notice--warn">
								{restoreError}{" "}
								<button
									className="button-styled-as-link"
									onClick={() => setRestoreState(null)}>
									Dismiss
								</button>
							</div>
						)}

						<input
							ref={restoreInputRef}
							type="file"
							accept=".json,application/json"
							style={{ display: "none" }}
							onChange={handleRestoreFileChosen}
						/>

						<div className="side-menu-divider" />

						{/* Page navigation */}
						<div className="side-menu-nav-heading">Pages</div>
						<nav className="side-menu-nav">
							{GROUPS.map((group) => {
								const groupSteps = allSteps.filter((s) => s.group === group);
								if (groupSteps.length === 0) return null;
								return (
									<div
										key={group}
										className="side-menu-group"
										style={GROUP_COLORS[group] ? {
											background: `${GROUP_COLORS[group]}12`,
											borderLeft: `3px solid ${GROUP_COLORS[group]}50`,
										} : {
											background: 'rgba(0,0,0,0.055)',
											borderLeft: '3px solid rgba(0,0,0,0.15)',
										}}>
										{GROUP_LABELS[group] && (
											<div
												className="side-menu-group-heading"
												style={GROUP_COLORS[group] ? { color: GROUP_COLORS[group] } : undefined}>
												{GROUP_LABELS[group]}
											</div>
										)}
										{groupSteps.map((step) => {
											const visIdx = visibleSteps.findIndex(
												(s) => s.component === step.component,
											);
											const isLocked = visIdx === -1;
											const isCurrent = !isLocked && visIdx === stepIndex;
											const isAccessible = !isLocked;

											const label = step.component?.navTitle || step.component?.title || "";
											const stateClass = isCurrent
												? "side-menu-step--current"
												: isAccessible
													? "side-menu-step--past"
													: "side-menu-step--unavailable";

											const handleClick = () => {
												if (isAccessible) handleStepClick(visIdx);
											};

											return (
												<button
													key={step.component?.navTitle ?? label}
													className={`side-menu-step ${stateClass}${step.subPageOf ? " side-menu-step--sub" : ""}`}
													disabled={!isAccessible}
													onClick={handleClick}
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
