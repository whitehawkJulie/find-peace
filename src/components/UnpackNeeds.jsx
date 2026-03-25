import React, { useEffect, useState } from "react";
import { useWizard } from "./WizardContext";
import { useContent } from "../content/useContent";
import HelpLink from "./HelpLink";
import { getNeedData, resolveNeedUnpackingType } from "../utils/renderHelpers";
import { UNPACKING_TYPE, unpackingTypeData } from "../data/unpackingTypeData";
import AudioPlayer from "./AudioPlayer";
import meditationAudio from "../assets/Beauty_of_need.mp3";
import "./UnpackNeeds.css";

const PRACTICAL = UNPACKING_TYPE.PRACTICAL;

// ─────────────────────────────────────────────
// UnpackNeeds
// ─────────────────────────────────────────────
const UnpackNeeds = () => {
	const {
		needs,
		setNeeds,
		needExplorations,
		setNeedExplorations,
		currentExploringNeed,
		setCurrentExploringNeed,
		explorationStep,
		setExplorationStep,
		setNeedExplorationOpen,
	} = useWizard();
	const { t } = useContent();

	// Accordion open state
	const [openStage1, setOpenStage1] = useState(false);
	const [openStage2, setOpenStage2] = useState(false);

	// Pending removal confirmation
	const [pendingRemoveNeed, setPendingRemoveNeed] = useState(null);

	// Initialise the data record when entering exploration
	useEffect(() => {
		if (explorationStep !== 1 || !currentExploringNeed) return;
		if (!needExplorations[currentExploringNeed]) {
			setNeedExplorations((prev) => ({
				...prev,
				[currentExploringNeed]: {
					coreSpecific: "",
					differentiation: "",
					whereMetResponse: "",
					unmetFeeling: "",
					metFeeling: "",
					metCircumstances: "",
					oftenUnmet: "",
					whereToMeet: "",
					completed: false,
				},
			}));
		}
	}, [currentExploringNeed, explorationStep]); // eslint-disable-line react-hooks/exhaustive-deps

	// Reset accordion state when switching needs
	useEffect(() => {
		setOpenStage1(false);
		setOpenStage2(false);
	}, [currentExploringNeed]);

	// ── Unmet needs lists ──
	const unmetNeeds = Object.entries(needs)
		.filter(([, s]) => s === "clicked")
		.map(([name]) => name);

	const exploredNeeds = Object.keys(needExplorations).filter((n) => needExplorations[n]?.completed);
	const unexploredNeeds = unmetNeeds.filter((n) => !exploredNeeds.includes(n));

	// ── Resolve unpackingType for the current need ──
	const resolvedTypes = currentExploringNeed ? resolveNeedUnpackingType(currentExploringNeed) : [];
	const nonPracticalTypes = resolvedTypes.filter((t) => t !== PRACTICAL);
	const isPractical = nonPracticalTypes.length === 0;

	// Stage 1: merged questions + needsGuesses from all non-PRACTICAL types
	const stage1Questions = [];
	const stage1GuessesSet = new Set();
	for (const type of nonPracticalTypes) {
		const data = unpackingTypeData[type];
		if (!data) continue;
		for (const q of data.questions) {
			stage1Questions.push(q.replace(/\{need\}/g, currentExploringNeed || ""));
		}
		for (const g of data.needsGuesses) {
			stage1GuessesSet.add(g);
		}
	}
	const stage1Guesses = [...stage1GuessesSet];

	// Stage 2: questions read directly from the flat need data
	const currentNeedData = currentExploringNeed ? getNeedData(currentExploringNeed) : null;
	const specificQ = currentNeedData?.coreQuestion ?? null;
	const directionPrompts = currentNeedData?.directionPrompts ? Object.values(currentNeedData.directionPrompts) : [];

	// ── Helpers ──
	const currentData = currentExploringNeed ? needExplorations[currentExploringNeed] || {} : {};

	const updateField = (field, value) => {
		setNeedExplorations((prev) => ({
			...prev,
			[currentExploringNeed]: { ...prev[currentExploringNeed], [field]: value },
		}));
	};

	const exitExploration = (complete = false) => {
		if (complete && currentExploringNeed) {
			setNeedExplorations((prev) => ({
				...prev,
				[currentExploringNeed]: { ...prev[currentExploringNeed], completed: true },
			}));
		}
		setCurrentExploringNeed(null);
		setExplorationStep(0);
		setNeedExplorationOpen(false);
	};

	const startExploring = (needName) => {
		setCurrentExploringNeed(needName);
		if (!needExplorations[needName]) {
			setNeedExplorations((prev) => ({
				...prev,
				[needName]: {
					coreSpecific: "",
					differentiation: "",
					whereMetResponse: "",
					unmetFeeling: "",
					metFeeling: "",
					metCircumstances: "",
					oftenUnmet: "",
					whereToMeet: "",
					completed: false,
				},
			}));
		}
		setExplorationStep(1);
	};

	const unselectNeed = (name) => {
		setNeeds((prev) => {
			const updated = { ...prev };
			delete updated[name];
			return updated;
		});
		setNeedExplorations((prev) => {
			const updated = { ...prev };
			delete updated[name];
			return updated;
		});
		// If we're currently exploring this need, close the popup
		if (currentExploringNeed === name) exitExploration(false);
	};

	const toggleGuess = (needName) => {
		setNeeds((prev) => {
			const updated = { ...prev };
			if (updated[needName]) {
				delete updated[needName];
			} else {
				updated[needName] = "clicked";
			}
			return updated;
		});
	};

	return (
		<div className="need-unpacking">
			{/* ════════════════════════════════════════
			    Step 0 — Need picker (always rendered)
			    ════════════════════════════════════════ */}
			<p>{t("unpackNeeds.purpose")}</p>
			<p>{t("unpackNeeds.intro")}</p>

			<AudioPlayer
				src={meditationAudio}
				title={t("unpackNeeds.meditationTitle")}
				description={t("unpackNeeds.meditationDescription")}
			/>
			<p>{t("unpackNeeds.clickPrompt")}</p>

			<div className="pill-grid cloud">
				{unexploredNeeds.map((name) => (
					<div key={name} className="pill need clicked need-removable" onClick={() => startExploring(name)}>
						{name}
						<button
							className="pill-remove-x"
							onClick={(e) => {
								e.stopPropagation();
								setPendingRemoveNeed(name);
							}}
							title={`Remove ${name}`}
							aria-label={`Remove ${name}`}>
							×
						</button>
					</div>
				))}
			</div>

			{exploredNeeds.length > 0 && (
				<div className="explored-section">
					<p className="explored-label">{t("unpackNeeds.exploredLabel")}</p>
					<div className="pill-grid cloud">
						{exploredNeeds.map((name) => (
							<div
								key={name}
								className="pill need double-clicked need-removable"
								onClick={() => startExploring(name)}>
								{name}
								<button
									className="pill-remove-x"
									onClick={(e) => {
										e.stopPropagation();
										setPendingRemoveNeed(name);
									}}
									title={`Remove ${name}`}
									aria-label={`Remove ${name}`}>
									×
								</button>
							</div>
						))}
					</div>
				</div>
			)}

			{pendingRemoveNeed && (
				<div className="need-remove-confirm">
					<span>
						Remove <strong>{pendingRemoveNeed}</strong> from your needs?
					</span>
					<div className="need-remove-confirm-btns">
						<button
							className="need-remove-confirm-yes"
							onClick={() => {
								unselectNeed(pendingRemoveNeed);
								setPendingRemoveNeed(null);
							}}>
							Yes, remove
						</button>
						<button className="need-remove-confirm-cancel" onClick={() => setPendingRemoveNeed(null)}>
							Cancel
						</button>
					</div>
				</div>
			)}

			{/* ════════════════════════════════════════
			    Step 1 — Exploration popup overlay
			    ════════════════════════════════════════ */}
			{explorationStep > 0 && currentExploringNeed && (
				<div
					className="need-explore-backdrop"
					onClick={(e) => {
						if (e.target === e.currentTarget) exitExploration(false);
					}}>
					<div className="need-explore-popup">
						<div className="need-explore-header">
							<h3 className="need-explore-title">{currentExploringNeed}</h3>
							<button className="need-explore-close" onClick={() => exitExploration(false)} title="Close">
								×
							</button>
						</div>

						{/* Stage 1 accordion — only for non-PRACTICAL needs */}
						{!isPractical && (
							<>
								<p>{t("unpackNeeds.stage1Intro")}</p>
								<div className="unpacking-section">
									<button
										className="unpacking-section-toggle"
										onClick={() => setOpenStage1((o) => !o)}>
										<span>{t("unpackNeeds.stage1Toggle")}</span>
										<span className="unpacking-toggle-chevron">{openStage1 ? "▲" : "▼"}</span>
									</button>
									{openStage1 && (
										<div className="unpacking-section-body">
											{stage1Questions.map((q, i) => (
												<p key={i} className="unpacking-question">
													{q}
												</p>
											))}
											{stage1Guesses.length > 0 && (
												<>
													<p className="unpacking-guesses-label">
														{t("unpackNeeds.stage1GuessesLabel")}
													</p>
													<div className="pill-grid cloud">
														{stage1Guesses.map((name) => (
															<div
																key={name}
																className={`pill need ${needs[name] ? "clicked" : ""}`}
																onClick={() => toggleGuess(name)}>
																{name}
															</div>
														))}
													</div>
												</>
											)}
										</div>
									)}
								</div>
							</>
						)}

						{/* Stage 2 accordion */}
						<p>{t("unpackNeeds.stage2Intro")}</p>
						<div className="unpacking-section unpacking-section-stage2">
							<button className="unpacking-section-toggle" onClick={() => setOpenStage2((o) => !o)}>
								<span>{t("unpackNeeds.stage2Toggle")}</span>
								<span className="unpacking-toggle-chevron">{openStage2 ? "▲" : "▼"}</span>
							</button>
							{openStage2 && (
								<div className="unpacking-section-body">
									{specificQ && (
										<div className="unpacking-prompt">
											<p className="unpacking-prompt-text">{specificQ}</p>
											{directionPrompts.length > 0 && (
												<ul className="unpacking-direction-list">
													{directionPrompts.map((prompt, i) => (
														<li key={i} className="unpacking-direction-item">
															{prompt}
														</li>
													))}
												</ul>
											)}
											<textarea
												className="unpacking-textarea"
												rows={3}
												value={currentData.coreSpecific || ""}
												onChange={(e) => updateField("coreSpecific", e.target.value)}
											/>
										</div>
									)}

									<div className="unpacking-prompt">
										<p className="unpacking-prompt-text">{t("unpackNeeds.unmetPrompt")}</p>
										<textarea
											className="unpacking-textarea"
											rows={3}
											value={currentData.unmetFeeling || ""}
											onChange={(e) => updateField("unmetFeeling", e.target.value)}
										/>
									</div>

									<div className="unpacking-prompt">
										<p className="unpacking-prompt-text">{t("unpackNeeds.metPrompt")}</p>
										<textarea
											className="unpacking-textarea"
											rows={3}
											value={currentData.metFeeling || ""}
											onChange={(e) => updateField("metFeeling", e.target.value)}
										/>
										<HelpLink topic="mourning">Can't remember a single time?</HelpLink>
									</div>

									<div className="unpacking-prompt">
										<p className="unpacking-prompt-text">
											{t("unpackNeeds.metCircumstancesPrompt")}
										</p>
										<textarea
											className="unpacking-textarea"
											rows={3}
											value={currentData.metCircumstances || ""}
											onChange={(e) => updateField("metCircumstances", e.target.value)}
										/>
									</div>

									<div className="unpacking-prompt">
										<p className="unpacking-prompt-text">{t("unpackNeeds.oftenUnmetPrompt")}</p>
										<textarea
											className="unpacking-textarea"
											rows={3}
											value={currentData.oftenUnmet || ""}
											onChange={(e) => updateField("oftenUnmet", e.target.value)}
										/>
									</div>

									<div className="unpacking-prompt">
										<p className="unpacking-prompt-text">{t("unpackNeeds.whereToMeetPrompt")}</p>
										<textarea
											className="unpacking-textarea"
											rows={3}
											value={currentData.whereToMeet || ""}
											onChange={(e) => updateField("whereToMeet", e.target.value)}
										/>
									</div>
								</div>
							)}
						</div>

						{/* Footer */}
						<div className="unpacking-footer">
							<button className="unpacking-done-btn" onClick={() => exitExploration(true)}>
								Done ✓
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

UnpackNeeds.titleKey = "unpackNeeds.title";
UnpackNeeds.title = "Explore what matters"; // polite fallback

// Shown when user clicks the ? Help button in the card header
UnpackNeeds.helpContent = (
	<>
		<h3>Why explore your needs more deeply?</h3>
		<p>
			<em>Help content coming soon.</em>
		</p>
	</>
);

export default UnpackNeeds;
