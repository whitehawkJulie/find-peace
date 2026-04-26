import React, { useEffect, useState, useRef } from "react";
import { useWizard } from "../WizardContext";
import { useOverlayHistory } from "../../hooks/useOverlayHistory";
import { getNeedData } from "../../utils/renderHelpers";
import HelpLink from "../HelpLink";
import { trackEvent, currentPage } from "../../analytics/analytics";
import DismissibleHint from "../DismissibleHint";
import ImportanceBanner from "../ImportanceBanner";
import AudioPlayer from "../AudioPlayer";
import meditationAudio from "../../assets/Beauty_of_need.mp3";
import "./UnpackNeeds.css";

// ─────────────────────────────────────────────
// UnpackNeeds — Page B: ConnectToNeed
// Shows all selected needs; user picks one at a time to explore
// in a focused popup (ConnectToNeed — coreQuestion + prompts).
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
					enoughResponse: "",
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

	// ── Unmet needs lists ──
	const unmetNeeds = Object.entries(needs)
		.filter(([, s]) => s === "clicked" || s === "double-clicked")
		.sort(([, a], [, b]) => (a === "double-clicked" ? 0 : 1) - (b === "double-clicked" ? 0 : 1))
		.map(([name]) => name);

	const exploredNeeds = Object.keys(needExplorations).filter((n) => needExplorations[n]?.completed);
	const unexploredNeeds = unmetNeeds.filter((n) => !exploredNeeds.includes(n));

	// ConnectToNeed: questions from flat need data
	const currentNeedData = currentExploringNeed ? getNeedData(currentExploringNeed) : null;
	const specificQ = currentNeedData?.coreQuestion ?? null;
	const directionPrompts = currentNeedData?.directionPrompts ? Object.values(currentNeedData.directionPrompts) : [];
	const enoughQuestion = currentNeedData?.enoughQuestion ?? null;
	const resonantStatement = currentNeedData?.resonantStatement ?? null;

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
					enoughResponse: "",
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
		if (currentExploringNeed === name) exitExploration(false);
	};

	const hasSelectedNeeds = Object.values(needs).some((s) => s === "clicked" || s === "double-clicked");

	const mourningViewedNeeds = Object.entries(needExplorations)
		.filter(([, e]) => e?.mourningViewed)
		.map(([name]) => name);
	const anyMourningViewed = mourningViewedNeeds.length > 0;

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
				Naming a need is a start. Getting clear on how it feels for you — and what it looks like when it's met —
				makes the next step much easier to see.
			</p>
			<AudioPlayer
				src={meditationAudio}
				title="The beauty of a need"
				description="A short guided meditation to connect with what matters most."
			/>
			<h3>Exploring individual needs</h3>
			<p>
				The more you connect with the lived experience of a need, the more power you have to actually get it
				met.
			</p>
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

			{/* Grief and mourning section */}
			{hasSelectedNeeds && (
				<div className="internal-section">
					<h3>Mourning</h3>
					{!anyMourningViewed ? (
						<>
							<p>
								Sometimes, in this process, a need comes into view that hasn{"’"}t been met for a long
								time — or perhaps ever. When that happens, it{"’"}s natural for strong feelings to
								arise, like grief or anger.
							</p>
							<p className="help-callout">
								If that{"’"}s what you{"’"}re noticing, it{"’"}s worth slowing down and making space for
								it.{" "}
								<HelpLink topic="mourning">There{"’"}s some support here for sitting with it.</HelpLink>
							</p>
						</>
					) : (
						<>
							<p>
								You{"’"}ve already looked at mourning {mourningNeedsList}. Is there anything else here
								that still needs to be heard and grieved?
							</p>
							<p className="help-callout">
								<HelpLink topic="mourning">That support is still here whenever you need it.</HelpLink>
							</p>
						</>
					)}
				</div>
			)}

			{/* ── Exploration popup ── */}
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
							{resonantStatement && <p className="unpacking-resonant-statement">{resonantStatement}</p>}

							<div className="unpacking-section">
								<p className="unpacking-section-label">Connect</p>

								{specificQ && (
									<div className="unpacking-prompt">
										<p className="unpacking-prompt-text">{specificQ}</p>
										{directionPrompts.length > 0 && (
											<p className="unpacking-direction-hints">{directionPrompts.join(" · ")}</p>
										)}
										<textarea
											className="unpacking-textarea"
											rows={4}
											value={currentData.coreSpecific || ""}
											onChange={(e) => updateField("coreSpecific", e.target.value)}
										/>
									</div>
								)}

								<div className="unpacking-prompt">
									<p className="unpacking-prompt-text">
										Notice in your body how it feels when this need isn{"’"}t met.
									</p>
									<textarea
										className="unpacking-textarea"
										rows={3}
										value={currentData.unmetFeeling || ""}
										onChange={(e) => updateField("unmetFeeling", e.target.value)}
									/>
								</div>
							</div>

							<div className="unpacking-section">
								<p className="unpacking-section-label">When it{"’"}s met</p>

								<div className="unpacking-prompt">
									<p className="unpacking-prompt-text">
										Remember a time this need was met — even just a little. How did that feel?
									</p>
									<textarea
										className="unpacking-textarea"
										rows={3}
										value={currentData.metFeeling || ""}
										onChange={(e) => updateField("metFeeling", e.target.value)}
									/>
								</div>

								<div className="unpacking-prompt">
									<p className="unpacking-prompt-text">
										If you can{"’"}t remember, can you <em>imagine</em> what it might feel like — or
										picture it for someone else?
									</p>
									<textarea
										className="unpacking-textarea"
										rows={3}
										value={currentData.imaginedMet || ""}
										onChange={(e) => updateField("imaginedMet", e.target.value)}
									/>
								</div>

								<div className="unpacking-prompt">
									<p className="unpacking-prompt-text">
										What needs to be present for this need to feel fulfilled?
									</p>
									<textarea
										className="unpacking-textarea"
										rows={3}
										value={currentData.metCircumstances || ""}
										onChange={(e) => updateField("metCircumstances", e.target.value)}
									/>
								</div>
							</div>

							<div className="unpacking-section">
								<p className="unpacking-section-label">Moving forward</p>

								{enoughQuestion && (
									<div className="unpacking-prompt">
										<p className="unpacking-prompt-text">{enoughQuestion}</p>
										<textarea
											className="unpacking-textarea"
											rows={3}
											value={currentData.enoughResponse || ""}
											onChange={(e) => updateField("enoughResponse", e.target.value)}
										/>
									</div>
								)}

								<div className="unpacking-prompt">
									<p className="unpacking-prompt-text">
										Is this a need that often goes unmet? Are there small ways you could{" "}
										<HelpLink topic="finding-strategies">top up the tank</HelpLink>?
									</p>
									<textarea
										className="unpacking-textarea"
										rows={3}
										value={currentData.oftenUnmet || ""}
										onChange={(e) => updateField("oftenUnmet", e.target.value)}
									/>
								</div>

								<div className="unpacking-prompt">
									<p className="unpacking-prompt-text">
										Could this need be met in the current situation — or is there a better place to
										get it met?
									</p>
									<textarea
										className="unpacking-textarea"
										rows={3}
										value={currentData.whereToMeet || ""}
										onChange={(e) => updateField("whereToMeet", e.target.value)}
									/>
								</div>

								<p className="help-callout">
									If this need has never felt met,{" "}
									<a
										href="#"
										className="inline-help-link"
										onClick={(e) => {
											e.preventDefault();
											markMourningViewed();
											openHelpTopic("mourning");
										}}>
										there{"’"}s some support here for sitting with that.
									</a>
								</p>
							</div>
						</div>

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
UnpackNeeds.navTitle = "Explore";

export default UnpackNeeds;
