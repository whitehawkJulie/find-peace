import React, { useEffect, useState } from "react";
import { useWizard } from "./WizardContext";
import { getNeedData, resolveNeedUnpackingType } from "../utils/renderHelpers";
import { UNPACKING_TYPE, unpackingTypeData } from "../data/unpackingTypeData";
import AudioPlayer from "./AudioPlayer";
import meditationAudio from "../assets/Beauty_of_need.mp3";
import "./NeedUnpacking.css";

const PRACTICAL = UNPACKING_TYPE.PRACTICAL;

// ─────────────────────────────────────────────
// NeedUnpacking
// ─────────────────────────────────────────────
const NeedUnpacking = () => {
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
		setHideMainNav,
	} = useWizard();

	const inSubStep = explorationStep > 0;

	// Accordion open state
	const [openStage1, setOpenStage1] = useState(false);
	const [openStage2, setOpenStage2] = useState(false);

	useEffect(() => {
		setHideMainNav(inSubStep);
		return () => setHideMainNav(false);
	}, [inSubStep, setHideMainNav]);

	// Initialise the data record when entering exploration
	useEffect(() => {
		if (explorationStep !== 1 || !currentExploringNeed) return;
		if (!needExplorations[currentExploringNeed]) {
			setNeedExplorations((prev) => ({
				...prev,
				[currentExploringNeed]: {
					coreSpecific: "",
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

	// Stage 2: need-specific core_specific question
	const specificQ = currentExploringNeed
		? getNeedData(currentExploringNeed)?.clarify?.prompts?.find((p) => p.key === "core_specific")?.question
		: null;

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

	// ════════════════════════════════════════
	// STEP 0 — Need picker
	// ════════════════════════════════════════
	if (explorationStep === 0) {
		return (
			<div className="need-unpacking">
				<AudioPlayer
					src={meditationAudio}
					title="The beauty of a need"
					description="A short guided meditation to connect with what matters most."
				/>
				<p>Choose a need to explore more deeply.</p>

				<div className="pill-grid cloud">
					{unexploredNeeds.map((name) => (
						<div key={name} className="pill need clicked" onClick={() => startExploring(name)}>
							{name}
						</div>
					))}
				</div>

				{exploredNeeds.length > 0 && (
					<div className="explored-section">
						<p className="explored-label">Already explored:</p>
						<div className="pill-grid cloud">
							{exploredNeeds.map((name) => (
								<div
									key={name}
									className="pill need double-clicked"
									onClick={() => startExploring(name)}>
									{name}
								</div>
							))}
						</div>
					</div>
				)}

				<div className="unpacking-footer">
					<button className="unpacking-exit-btn" onClick={() => exitExploration(false)}>
						↩ back to needs
					</button>
				</div>
			</div>
		);
	}

	// ════════════════════════════════════════
	// STEP 1 — Single accordion page
	// ════════════════════════════════════════
	return (
		<div className="need-unpacking">
			{/* Stage 1 accordion — only for non-PRACTICAL needs */}
			{!isPractical && (
				<div className="unpacking-section">
					<button className="unpacking-section-toggle" onClick={() => setOpenStage1((o) => !o)}>
						<span>Might there be a deeper need underneath this?</span>
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
									<p className="unpacking-guesses-label">Are any of these up for you as well?</p>
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
			)}

			{/* Stage 2 accordion */}
			<div className="unpacking-section unpacking-section-stage2">
				<button className="unpacking-section-toggle" onClick={() => setOpenStage2((o) => !o)}>
					<span>Get to know the need</span>
					<span className="unpacking-toggle-chevron">{openStage2 ? "▲" : "▼"}</span>
				</button>
				{openStage2 && (
					<div className="unpacking-section-body">
						{specificQ && (
							<div className="unpacking-prompt">
								<p className="unpacking-prompt-text">{specificQ}</p>
								<textarea
									className="unpacking-textarea"
									rows={3}
									value={currentData.coreSpecific || ""}
									onChange={(e) => updateField("coreSpecific", e.target.value)}
								/>
							</div>
						)}

						<div className="unpacking-prompt">
							<p className="unpacking-prompt-text">
								how does it feel when the need isn't met? (notice the unmetness)
							</p>
							<textarea
								className="unpacking-textarea"
								rows={3}
								value={currentData.unmetFeeling || ""}
								onChange={(e) => updateField("unmetFeeling", e.target.value)}
							/>
							<p className="unpacking-closing-note">
								If you're really struggling to remember or imagine a time that it was met, you might
								need to take some time to sit with the sadness of that. TODO: add info about mourning.
							</p>
						</div>

						<div className="unpacking-prompt">
							<p className="unpacking-prompt-text">
								remember when the need was met, and how that felt (find the metness)
							</p>
							<p className="unpacking-prompt-subnote">
								<em>
									if can't remember - imagine!!! if can't do that, what might it look and feel like
									for another person, if THEY had the need met?
								</em>
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
								what circumstances were present (in memory or imagination) that helped it be met?
							</p>
							<textarea
								className="unpacking-textarea"
								rows={3}
								value={currentData.metCircumstances || ""}
								onChange={(e) => updateField("metCircumstances", e.target.value)}
							/>
						</div>

						<div className="unpacking-prompt">
							<p className="unpacking-prompt-text">
								Is this a need that often goes unmet in your life? Are there small ways you could top
								up the tank, even a little?
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
								Could this need be met in the current situation? Is the other person capable of meeting
								it — or is there a better place to get it met?
							</p>
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
				<button className="unpacking-exit-btn" onClick={() => exitExploration(false)}>
					↩ back to needs
				</button>
			</div>
		</div>
	);
};

NeedUnpacking.title = "Explore a Need";
NeedUnpacking.helpContent = null;

export default NeedUnpacking;
