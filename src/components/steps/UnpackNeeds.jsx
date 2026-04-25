import React, { useEffect, useState, useRef } from "react";
import { useWizard } from "../WizardContext";
import { useOverlayHistory } from "../../hooks/useOverlayHistory";
import { getNeedData, resolveNeedUnpackingType } from "../../utils/renderHelpers";
import { UNPACKING_TYPE, unpackingTypeData } from "../../data/unpackingTypeData";
import { DEEPENING_BIAS_BY_DOMAIN } from "../../data/AllNeedsFlat";
import { needSpecificGuesses } from "../../data/NeedsSpecificGuesses";
import HelpLink from "../HelpLink";
import { trackEvent, currentPage } from "../../analytics/analytics";
import DismissibleHint from "../DismissibleHint";
import ImportanceBanner from "../ImportanceBanner";

import AudioPlayer from "../AudioPlayer";
import meditationAudio from "../../assets/Beauty_of_need.mp3";
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
		needExplorationOpen,
		openHelpTopic,
	} = useWizard();
	// Accordion open state
	const [openStage1, setOpenStage1] = useState(false);
	const [openStage2, setOpenStage2] = useState(false);

	// Readiness check answer: null (pending) | 'yes' | 'close'
	const [readinessAnswer, setReadinessAnswer] = useState(null);

	// Pending removal confirmation
	const [pendingRemoveNeed, setPendingRemoveNeed] = useState(null);

	const { feelings, observation } = useWizard();
	const hasStarted = Object.keys(feelings).length > 0 || Object.keys(needs).length > 0 || observation?.moment?.trim();

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
					imaginedMet: "",
					metCircumstances: "",
					oftenUnmet: "",
					whereToMeet: "",
					mourningViewed: false,
					completed: false,
				},
			}));
		}
	}, [currentExploringNeed, explorationStep]); // eslint-disable-line react-hooks/exhaustive-deps

	// Reset accordion + readiness state when switching needs
	useEffect(() => {
		setOpenStage1(false);
		setOpenStage2(false);
		setReadinessAnswer(null);
	}, [currentExploringNeed]);

	// ── Unmet needs lists ──
	const unmetNeeds = Object.entries(needs)
		.filter(([, s]) => s === "clicked" || s === "double-clicked")
		.sort(([, a], [, b]) => (a === "double-clicked" ? 0 : 1) - (b === "double-clicked" ? 0 : 1))
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
	// Use need-specific guesses if available, otherwise fall back to type-based guesses
	const specificNeedGuesses = currentExploringNeed ? (needSpecificGuesses[currentExploringNeed] ?? null) : null;
	const stage1Guesses = specificNeedGuesses ?? [...stage1GuessesSet];

	// Stage 2: questions read directly from the flat need data
	const currentNeedData = currentExploringNeed ? getNeedData(currentExploringNeed) : null;
	const skipDeepening = DEEPENING_BIAS_BY_DOMAIN[currentNeedData?.domain] !== "check";
	const showReadinessCheck = DEEPENING_BIAS_BY_DOMAIN[currentNeedData?.domain] === "check";
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

	const isPopupOpen = explorationStep > 0 && !!currentExploringNeed;
	const { closeWithCleanup: closePopup, cleanupHistory: popupCleanupHistory } = useOverlayHistory(
		isPopupOpen,
		() => exitExploration(false),
		"needsPopup",
	);

	// Track explore-need popup open/close
	const popupOpenAt = useRef(null);
	useEffect(() => {
		if (isPopupOpen) {
			popupOpenAt.current = Date.now();
			trackEvent("ui_open", { type: "modal", name: "explore-need", page_name: currentPage });
		} else if (popupOpenAt.current) {
			trackEvent("ui_close", {
				type: "modal",
				name: "explore-need",
				time_open_ms: Date.now() - popupOpenAt.current,
			});
			popupOpenAt.current = null;
		}
	}, [isPopupOpen]); // eslint-disable-line react-hooks/exhaustive-deps

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
					imaginedMet: "",
					metCircumstances: "",
					oftenUnmet: "",
					whereToMeet: "",
					mourningViewed: false,
					completed: false,
				},
			}));
		}
		setExplorationStep(1);
	};

	// Mark mourning as viewed for the need currently being explored
	const markMourningViewed = () => {
		if (!currentExploringNeed) return;
		setNeedExplorations((prev) => ({
			...prev,
			[currentExploringNeed]: { ...prev[currentExploringNeed], mourningViewed: true },
		}));
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

	const hasSelectedNeeds = Object.values(needs).some((s) => s === "clicked" || s === "double-clicked");

	// Which needs has the user opened the mourning help topic for?
	const mourningViewedNeeds = Object.entries(needExplorations)
		.filter(([, e]) => e?.mourningViewed)
		.map(([name]) => name);
	const anyMourningViewed = mourningViewedNeeds.length > 0;

	// Human-readable list: "Affection", or "Affection and Belonging", or "Affection, Belonging and Safety"
	const mourningNeedsList =
		mourningViewedNeeds.length === 1
			? mourningViewedNeeds[0]
			: mourningViewedNeeds.slice(0, -1).join(", ") +
				" and " +
				mourningViewedNeeds[mourningViewedNeeds.length - 1];

	return (
		<div className="need-unpacking">
			<ImportanceBanner heading="Important" message="This is where things often shift - take your time here." />

			{!hasSelectedNeeds && !needExplorationOpen && (
				<p className="empty-state-notice">
					No needs selected yet — this page isn't useful until you've chosen some needs on the previous step.
				</p>
			)}
			{hasStarted && (
				<DismissibleHint id="summary-intro">
					Tip: to see all your responses at any time, tap <strong>Summary</strong> in the menu, or at the
					bottom of the screen.
				</DismissibleHint>
			)}

			<p>
				Naming a need is a start. Getting clear on how it feels for you — and what it looks like when it’s met —
				makes the next step much easier to see.
			</p>
			<AudioPlayer
				src={meditationAudio}
				title="The beauty of a need"
				description="A short guided meditation to connect with what matters most."
			/>
			<h3>Exploring individual needs</h3>
			<p>Click on a need to explore more deeply, starting with the one that's loudest for you.</p>
			<p className="cloud-label">Your needs</p>
			<div className="pill-grid cloud needs-selected-pills">
				{unexploredNeeds.map((name) => (
					<div
						key={name}
						className={`pill need ${needs[name]} need-removable`}
						onClick={() => startExploring(name)}>
						{needs[name] === "double-clicked" && <span className="pill-strong-badge">●</span>}
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
					<p className="explored-label">{"Already explored:"}</p>
					<div className="pill-grid cloud needs-selected-pills">
						{exploredNeeds.map((name) => (
							<div
								key={name}
								className={`pill need ${needs[name] || "clicked"} need-removable`}
								onClick={() => startExploring(name)}>
								{needs[name] === "double-clicked" && <span className="pill-strong-badge">●</span>}
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
			{/* Grief and mourning section — replaces the former standalone Grief page */}
			{hasSelectedNeeds && (
				<div className="internal-section">
					<h3>Mourning</h3>
					{!anyMourningViewed ? (
						<>
							<p>
								Sometimes, in this process, a need comes into view that hasn{"\u2019"}t been met for a
								long time — or perhaps ever. When that happens, it{"\u2019"}s natural for strong
								feelings to arise, like grief or anger.
							</p>
							<p className="help-callout">
								If that{"\u2019"}s what you{"\u2019"}re noticing, it{"\u2019"}s worth slowing down and
								making space for it.{" "}
								<HelpLink topic="mourning">
									There{"\u2019"}s some support here for sitting with it.
								</HelpLink>
							</p>
						</>
					) : (
						<>
							<p>
								You{"\u2019"}ve already looked at mourning {mourningNeedsList}. Is there anything else
								here that still needs to be heard and grieved?
							</p>
							<p className="help-callout">
								<HelpLink topic="mourning">That support is still here whenever you need it.</HelpLink>
							</p>
						</>
					)}
				</div>
			)}

			{explorationStep > 0 && currentExploringNeed && (
				<div
					className="need-explore-backdrop"
					onClick={(e) => {
						if (e.target === e.currentTarget) closePopup();
					}}>
					<div className="need-explore-popup">
						<div className="need-explore-header">
							<h3 className="need-explore-title">{currentExploringNeed}</h3>
							<button className="need-explore-close" onClick={closePopup} title="Close">
								×
							</button>
						</div>

						<div className="need-explore-body">
							{/* Readiness check — only for check-type needs, before answering */}
							{showReadinessCheck && readinessAnswer === null && (
								<div className="readiness-check">
									<p className="readiness-check-question">
										Does this feel like it really fits what matters here?
									</p>
									<div className="readiness-check-btns">
										<button
											className="readiness-check-btn readiness-check-btn--yes"
											onClick={() => setReadinessAnswer("yes")}>
											Yes, that{"'"}s it
										</button>
										<button
											className="readiness-check-btn readiness-check-btn--explore"
											onClick={() => setReadinessAnswer("close")}>
											Close, but not quite
										</button>
									</div>
								</div>
							)}

							{/* Stage 1 — only when user says "close, but not quite" */}
							{!skipDeepening && readinessAnswer === "close" && (
								<div className="unpacking-chunk">
									<h3 className="unpacking-chunk-heading">Want to get a bit more specific?</h3>
									<p>These questions might help you notice what this need is really pointing at.</p>
									<div className="unpacking-section">
										<button
											className="unpacking-section-toggle"
											onClick={() => setOpenStage1((o) => !o)}>
											<span>{"What would having this give you?"}</span>
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
															{"Are any of these also alive for you?"}
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
								</div>
							)}

							{/* Stage 2 — shown once deepening is skipped or readiness is answered */}
							{(skipDeepening || readinessAnswer !== null) && (
							<div className={`unpacking-chunk${readinessAnswer === "close" ? " unpacking-chunk--second" : ""}`}>
								<h3 className="unpacking-chunk-heading">Get to know how the need lives in YOU</h3>
								<p>
									Next, we'll explore how this need shows up and how it wants to be met. This is where
									the real shift happens — the more you connect with the lived experience of the need,
									the more power you have to meet it in ways that truly satisfy you.
								</p>
								<div className="unpacking-section unpacking-section-stage2">
									<button
										className="unpacking-section-toggle"
										onClick={() => setOpenStage2((o) => !o)}>
										<span>{"Get to know the need"}</span>
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
														data-field-id="unpack-core-specific"
														rows={3}
														value={currentData.coreSpecific || ""}
														onChange={(e) => updateField("coreSpecific", e.target.value)}
													/>
												</div>
											)}

											<div className="unpacking-prompt">
												<p className="unpacking-prompt-text">
													{
														"Notice in your body how it feels when the need isn't met — what happens when you focus on the un-met-ness of the need?"
													}
												</p>
												<textarea
													className="unpacking-textarea"
													data-field-id="unpack-unmet-feeling"
													rows={3}
													value={currentData.unmetFeeling || ""}
													onChange={(e) => updateField("unmetFeeling", e.target.value)}
												/>
											</div>

											<div className="unpacking-prompt">
												<p className="unpacking-prompt-text">
													{
														"Now remember when the need was most met for you — even if that was just a little — and how that felt."
													}
												</p>
												<textarea
													className="unpacking-textarea"
													data-field-id="unpack-met-feeling"
													rows={3}
													value={currentData.metFeeling || ""}
													onChange={(e) => updateField("metFeeling", e.target.value)}
												/>
											</div>

											<div className="unpacking-prompt">
												<p className="unpacking-prompt-text">
													If you can't remember a single time the need was met, can you{" "}
													<em>imagine</em> what it might look like if it was met? If still
													not, can you imagine what it would look like for someone else?
												</p>
												<textarea
													className="unpacking-textarea"
													data-field-id="unpack-imagined-met"
													rows={3}
													value={currentData.imaginedMet || ""}
													onChange={(e) => updateField("imaginedMet", e.target.value)}
												/>
											</div>

											<div className="unpacking-prompt">
												<p className="unpacking-prompt-text">
													{
														"If you were able to remember or imagine the need being met, what was present that helped it be met? What would it have to look like for this need to feel fulfilled for you?"
													}
												</p>
												<textarea
													className="unpacking-textarea"
													data-field-id="unpack-met-circumstances"
													rows={3}
													value={currentData.metCircumstances || ""}
													onChange={(e) => updateField("metCircumstances", e.target.value)}
												/>
											</div>

											<div className="unpacking-prompt">
												<p className="unpacking-prompt-text">
													Is this a need that often goes unmet in your life? Are there small
													ways you could move towards it,{" "}
													<HelpLink topic="finding-strategies">top up the tank</HelpLink>,
													even a little?
												</p>
												<textarea
													className="unpacking-textarea"
													data-field-id="unpack-often-unmet"
													rows={3}
													value={currentData.oftenUnmet || ""}
													onChange={(e) => updateField("oftenUnmet", e.target.value)}
												/>
											</div>

											<div className="unpacking-prompt">
												<p className="unpacking-prompt-text">
													{
														"Back to the issue at hand: could this need be met in the current situation? Is the other person capable of meeting it — or is there a better place to get it met?"
													}
												</p>
												<textarea
													className="unpacking-textarea"
													data-field-id="unpack-where-to-meet"
													rows={3}
													value={currentData.whereToMeet || ""}
													onChange={(e) => updateField("whereToMeet", e.target.value)}
												/>
											</div>
											<p className="help-callout">
												If this has left you feeling like you{"\u2019"}ve never had the need
												met, or never quite enough, you might like to read about{" "}
												<a
													href="#"
													className="inline-help-link"
													onClick={(e) => {
														e.preventDefault();
														markMourningViewed();
														openHelpTopic("mourning");
													}}>
													being with an unmet need, here.
												</a>
											</p>
										</div>
									)}
								</div>
							</div>
							)}
						</div>
						{/* end need-explore-body */}

						{/* Footer */}
						<div className="unpacking-footer">
							<button
								className="unpacking-done-btn"
								onClick={() => {
									popupCleanupHistory();
									exitExploration(true);
								}}>
								Done ✓
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

UnpackNeeds.title = "Explore what matters";
UnpackNeeds.navTitle = "Explore what matters";

export default UnpackNeeds;
