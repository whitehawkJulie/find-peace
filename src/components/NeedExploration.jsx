import React, { useState, useEffect } from "react";
import { useWizard } from "./WizardContext";
import Pill from "./Pill";
import { getNeedData } from "../utils/renderHelpers";
import { resolvePrompts } from "../utils/resolvePrompts";
import "./NeedExploration.css";

// Steps for the OLD flow (non-clarify needs):
// 0 = pick, 1 = deepen, 2 = grounding, 3-6 = reflective, 7 = summary
const OLD_SUMMARY_STEP = 7;

const oldExplorationPrompts = [
	null, // step 0: pick
	null, // step 1: deepen
	null, // step 2: grounding
	{
		title: "Body awareness",
		field: "bodyFeeling",
		prompt: "Close your eyes for a moment if you can. Where in your body do you feel this need? Is there tightness, heaviness, emptiness, restlessness? Just notice — there's no right answer.",
	},
	{
		title: "When this need is met",
		field: "whenMet",
		prompt: "Can you recall a time when this need WAS met — even partially? What did that feel like in your body? What was happening? Let yourself really feel into that memory for a moment.",
	},
	{
		title: "The beauty of this need",
		field: "beauty",
		prompt: "What is beautiful about this need? What does it tell you about what matters to you, about who you are? This need is life energy — it's telling you something important about what makes life wonderful for you.",
	},
	{
		title: "Is this a black hole need?",
		field: "blackHole",
		prompt: "Does this need feel familiar — like it keeps showing up in your life? Do you get triggered around it often, maybe intensely? If so, this might be a \"black hole need\" — one that's been deeply unmet for a long time, possibly since childhood. It doesn't mean something is wrong with you. It means this need deserves real attention, beyond just this situation. What do you notice?",
	},
	null, // step 7: summary
];

// Grounding prompts for old flow step 2
const groundingPrompts = [
	{
		field: "groundBody",
		prompt: "If this need were met, what would change in your body — even 5%?",
	},
	{
		field: "groundStopDoing",
		prompt: "What would you be able to stop doing if it were met?",
	},
	{
		field: "groundSign",
		prompt: "What small sign would tell you this need is being met?",
	},
	{
		field: "groundTimeframe",
		prompt: "Is this about something happening now, soon, or long-term?",
	},
	{
		field: "groundWhose",
		prompt: "Is this about your experience — or about changing someone else?",
	},
];

// Steps for the NEW clarify flow (needs-clarify type):
// 0 = pick, 1 = clarify (core + go deeper), 2 = summary
const CLARIFY_SUMMARY_STEP = 2;

// Build the list of clarify prompts for a need, resolving any library refs
const getClarifyPrompts = (needName) => {
	const needData = getNeedData(needName);
	if (!needData?.clarify || needData.clarify.type !== "needs-clarify") return null;

	const resolved = resolvePrompts(needData.clarify.prompts);
	return {
		core: resolved.filter((p) => p.tier === "core"),
		deeper: resolved.filter((p) => p.tier === "deeper"),
	};
};

// ─────────────────────────────────────────────
// SubStepNav — replaces MenuBar when inside an exploration
// ─────────────────────────────────────────────
const SubStepNav = ({ current, total, onBack, onNext, nextLabel, onExit }) => (
	<div className="substep-nav">
		<div className="substep-nav-buttons">
			{onBack ? (
				<button className="substep-nav-btn substep-nav-back" onClick={onBack}>
					← Back
				</button>
			) : (
				<span className="substep-nav-spacer" />
			)}

			<span className="substep-nav-indicator">
				{current} / {total}
			</span>

			{onNext ? (
				<button className="substep-nav-btn substep-nav-next" onClick={onNext}>
					{nextLabel || "Next"} →
				</button>
			) : (
				<span className="substep-nav-spacer" />
			)}
		</div>
		<button className="substep-nav-exit" onClick={onExit}>
			↩ back to needs
		</button>
	</div>
);

// Old flow step 1: Deepen — "If I had this need, then what would I have?"
const DeepenStep = ({ needName, onSwap }) => {
	const [steps, setSteps] = useState([""]);

	const addStep = () => setSteps((prev) => [...prev, ""]);
	const updateStep = (index, value) => setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));

	const deepestNeed = [...steps].reverse().find((s) => s.trim()) || "";

	return (
		<div className="deepen-step">
			<p className="deepen-intro">
				Sometimes the need we name first is a stepping stone to something deeper. Let's check — ask yourself:
			</p>

			{steps.map((step, i) => {
				const previousNeed = i === 0 ? needName : steps[i - 1] || needName;
				return (
					<div key={i} className="deepen-chain-step">
						<label className="deepen-label">
							"If I had <strong>{previousNeed}</strong>, then what would I have?"
						</label>
						<input
							type="text"
							className="deepen-input"
							value={step}
							onChange={(e) => updateStep(i, e.target.value)}
							placeholder={`e.g. "Safety" or "Peace"`}
						/>
					</div>
				);
			})}

			<div className="deepen-actions">
				<button className="subtle-button" onClick={addStep} disabled={!steps[steps.length - 1].trim()}>
					Go deeper — "If I had {steps[steps.length - 1] || "that"}, then what?"
				</button>
			</div>

			<div className="deepen-test">
				<p className="deepen-test-label">How to know if you've found the real need:</p>
				<ul>
					<li>
						If you feel <strong>self-righteous</strong> about it ("I <em>deserve</em> this!"), you probably
						haven't reached it yet. Keep going.
					</li>
					<li>
						If the phrase <em>"Every cell in my body is longing for {deepestNeed || needName}"</em> brings{" "}
						<strong>tears or a deep softening</strong>, you've probably found it.
					</li>
				</ul>
			</div>

			{steps.some((s) => s.trim()) && (
				<>
					<div className="deepen-chain-display">
						<span className="deepen-chain-path-label">Your path:</span>
						<span className="deepen-chain-path-items">
							{needName}
							{steps
								.filter((s) => s.trim())
								.map((s, i) => (
									<span key={i}> → {s}</span>
								))}
						</span>
					</div>

					{deepestNeed && (
						<div className="deepen-swap-offer">
							<p>
								It sounds like <strong>{deepestNeed}</strong> might be the deeper need here. Would you
								like to explore <strong>{deepestNeed}</strong> instead of <strong>{needName}</strong>?
							</p>
							<div className="deepen-swap-buttons">
								<button onClick={() => onSwap(deepestNeed)}>
									Yes, explore "{deepestNeed}" instead
								</button>
								<button className="subtle-button" onClick={() => {}}>
									No, stay with "{needName}"
								</button>
							</div>
						</div>
					)}
				</>
			)}
		</div>
	);
};

// Clarify step — core (3 shown) + deeper (behind "Go deeper" button)
const ClarifyStep = ({ needName, exploration, updateField }) => {
	const [showDeeper, setShowDeeper] = useState(false);
	const prompts = getClarifyPrompts(needName);

	if (!prompts) return null;

	return (
		<div className="clarify-step">
			<div className="clarify-intro">
				<p>
					Let's get specific about what <strong>{needName}</strong> means for you right now. There's no right
					answer — just notice what feels true.
				</p>
			</div>

			<div className="clarify-prompts">
				{prompts.core.map(({ key, label, question }) => (
					<div key={key} className="clarify-prompt-item">
						<label className="clarify-prompt-label">{label}</label>
						<p className="clarify-prompt-text">{question}</p>
						<textarea
							className="clarify-prompt-input"
							value={exploration[`clarify_${key}`] || ""}
							onChange={(e) => updateField(`clarify_${key}`, e.target.value)}
							placeholder="..."
							rows={2}
						/>
					</div>
				))}
			</div>

			{!showDeeper ? (
				<button className="subtle-button clarify-deeper-button" onClick={() => setShowDeeper(true)}>
					Go deeper
				</button>
			) : (
				<div className="clarify-deeper-section">
					<div className="clarify-deeper-guidance">
						<p>As you explore, notice the tone in your body.</p>
						<p>
							If the energy feels tight, charged, or righteous, you might still be protecting something.
						</p>
						<p>
							If there's a softening, relief, or tenderness — even briefly — that can be a sign you're
							touching something important.
						</p>
						<p>There's no right answer. Just notice what happens.</p>
					</div>

					<div className="clarify-prompts clarify-deeper-prompts">
						{prompts.deeper.map(({ key, label, question }) => (
							<div key={key} className="clarify-prompt-item clarify-prompt-deeper">
								<label className="clarify-prompt-label">{label}</label>
								<p className="clarify-prompt-text">{question}</p>
								<textarea
									className="clarify-prompt-input"
									value={exploration[`clarify_${key}`] || ""}
									onChange={(e) => updateField(`clarify_${key}`, e.target.value)}
									placeholder="..."
									rows={2}
								/>
							</div>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

const NeedExploration = () => {
	const {
		needs,
		setNeeds,
		needExplorations,
		setNeedExplorations,
		currentExploringNeed,
		setCurrentExploringNeed,
		explorationStep,
		setExplorationStep,
		stepIndex,
		setStepIndex,
		setHideMainNav,
	} = useWizard();

	const inSubStep = explorationStep > 0 && !!currentExploringNeed;

	// Hide main MenuBar when inside a sub-step; restore on exit/unmount
	useEffect(() => {
		setHideMainNav(inSubStep);
		return () => setHideMainNav(false);
	}, [inSubStep, setHideMainNav]);

	// Get all unmet needs (single-clicked)
	const unmetNeeds = Object.entries(needs)
		.filter(([_, status]) => status === "clicked")
		.map(([name]) => name);

	const exploredNeeds = Object.keys(needExplorations).filter((n) => needExplorations[n]?.completed);
	const unexploredNeeds = unmetNeeds.filter((n) => !exploredNeeds.includes(n));

	// Check if the current need uses the new clarify flow
	const currentNeedData = currentExploringNeed ? getNeedData(currentExploringNeed) : null;
	const hasClarify = currentNeedData?.clarify?.type === "needs-clarify";

	// Sub-step counts for the navigation indicator
	const totalSubSteps = hasClarify ? CLARIFY_SUMMARY_STEP : OLD_SUMMARY_STEP;

	// Update a field in the current need's exploration
	const updateField = (field, value) => {
		setNeedExplorations((prev) => ({
			...prev,
			[currentExploringNeed]: {
				...prev[currentExploringNeed],
				[field]: value,
			},
		}));
	};

	const exitExploration = () => {
		setCurrentExploringNeed(null);
		setExplorationStep(0);
	};

	const startExploring = (needName) => {
		setCurrentExploringNeed(needName);
		if (!needExplorations[needName]) {
			setNeedExplorations((prev) => ({
				...prev,
				[needName]: {
					groundBody: "",
					groundStopDoing: "",
					groundSign: "",
					groundTimeframe: "",
					groundWhose: "",
					bodyFeeling: "",
					whenMet: "",
					beauty: "",
					blackHole: "",
					completed: false,
				},
			}));
		}
		setExplorationStep(1);
	};

	const finishCurrentNeed = () => {
		setNeedExplorations((prev) => ({
			...prev,
			[currentExploringNeed]: {
				...prev[currentExploringNeed],
				completed: true,
			},
		}));
		setCurrentExploringNeed(null);
		setExplorationStep(0);
	};

	const moveOn = () => {
		setStepIndex(stepIndex + 1);
	};

	// Swap the current need for a deeper one (old flow only)
	const handleSwap = (deeperNeedName) => {
		const oldNeed = currentExploringNeed;

		setNeeds((prev) => {
			const updated = { ...prev };
			delete updated[oldNeed];
			updated[deeperNeedName] = "clicked";
			return updated;
		});

		setNeedExplorations((prev) => {
			const updated = { ...prev };
			const oldData = updated[oldNeed] || {
				groundBody: "",
				groundStopDoing: "",
				groundSign: "",
				groundTimeframe: "",
				groundWhose: "",
				bodyFeeling: "",
				whenMet: "",
				beauty: "",
				blackHole: "",
				completed: false,
			};
			delete updated[oldNeed];
			updated[deeperNeedName] = oldData;
			return updated;
		});

		setCurrentExploringNeed(deeperNeedName);
		setExplorationStep(2);
	};

	// ───── Step 0: Pick a need ─────
	if (explorationStep === 0 || !currentExploringNeed) {
		return (
			<div className="need-exploration">
				{unmetNeeds.length > 0 && (
					<div className="unmet-needs-display">
						<div className="pill-grid cloud">
							{unmetNeeds.map((need) => (
								<Pill
									key={need}
									item={need}
									type="need"
									state="clicked"
									onClick={() => startExploring(need)}
								/>
							))}
						</div>
					</div>
				)}

				<p>
					These are the needs that felt alive in that moment.
					<br />
					Pause for a breath. Just notice them — not as problems to solve, but as signals of what matters to
					you.
				</p>

				<p>
					<strong>Tap a need above to explore it more deeply.</strong>
					<br />
					You'll have space to sit with it, check whether it feels true, and listen for what it's asking for.
				</p>

				{exploredNeeds.length > 0 && (
					<div className="explored-section">
						<p className="explored-label">Already explored:</p>
						<div className="pill-grid cloud">
							{exploredNeeds.map((name) => (
								<Pill
									key={name}
									item={name}
									type="need"
									state="double-clicked"
									onClick={() => startExploring(name)}
								/>
							))}
						</div>
					</div>
				)}

				<div className="exploration-actions">
					<button className="subtle-button" onClick={moveOn}>
						{exploredNeeds.length > 0 ? "I'm ready to move on" : "Skip this step"}
					</button>
				</div>
			</div>
		);
	}

	// ═══════════════════════════════════════
	//  NEW CLARIFY FLOW (for needs-clarify type)
	// ═══════════════════════════════════════
	if (hasClarify) {
		// Step 1: Clarify prompts
		if (explorationStep === 1) {
			const exploration = needExplorations[currentExploringNeed] || {};

			return (
				<div className="need-exploration need-exploration-substep">
					<div className="exploring-header">
						<span className="exploring-label">Clarifying:</span>
						<Pill item={currentExploringNeed} type="need" state="clicked" />
					</div>

					<ClarifyStep needName={currentExploringNeed} exploration={exploration} updateField={updateField} />

					<SubStepNav
						current={1}
						total={totalSubSteps}
						onBack={exitExploration}
						onNext={() => setExplorationStep(CLARIFY_SUMMARY_STEP)}
						nextLabel="Finish"
						onExit={exitExploration}
					/>
				</div>
			);
		}

		// Step 2: Clarify summary
		if (explorationStep === CLARIFY_SUMMARY_STEP) {
			const exploration = needExplorations[currentExploringNeed] || {};
			const clarifyPrompts = getClarifyPrompts(currentExploringNeed);
			const allPrompts = clarifyPrompts ? [...clarifyPrompts.core, ...clarifyPrompts.deeper] : [];
			const hasResponses = allPrompts.some(({ key }) => exploration[`clarify_${key}`]?.trim());

			return (
				<div className="need-exploration need-exploration-substep">
					<h3>Sitting with: {currentExploringNeed}</h3>
					<p className="exploration-sit-with">
						Take a moment to just be with this. Your need for <strong>{currentExploringNeed}</strong> isn't
						a problem to fix — it's life energy, pointing you towards what makes life meaningful.
					</p>
					<p>
						Before you try to solve this need, take a moment to <em>meet</em> it — not as something to
						fulfil, but as something living in you.
						{/* TODO: add a ? or something to meet, which links to "meeting a need" in the extended help file */}
					</p>
					{hasResponses && (
						<div className="exploration-summary">
							<div className="summary-item summary-item-clarify">
								<strong>What you noticed:</strong>
								{allPrompts.map(({ key, label, question }) =>
									exploration[`clarify_${key}`]?.trim() ? (
										<p key={key}>
											<em>{question}</em>
											<br />
											{exploration[`clarify_${key}`]}
										</p>
									) : null,
								)}
							</div>
						</div>
					)}

					<div className="exploration-actions">
						<button
							onClick={() => {
								finishCurrentNeed();
							}}>
							{unexploredNeeds.length > 1 ? "Done — explore another need" : "Done"}
						</button>
						<button
							className="subtle-button"
							onClick={() => {
								finishCurrentNeed();
								moveOn();
							}}>
							I'm ready to move on
						</button>
					</div>

					<SubStepNav
						current={2}
						total={totalSubSteps}
						onBack={() => setExplorationStep(1)}
						onNext={null}
						onExit={exitExploration}
					/>
				</div>
			);
		}
	}

	// ═══════════════════════════════════════
	//  OLD FLOW (for non-clarify needs)
	// ═══════════════════════════════════════

	// Step 1: Deepen — "If I had this, then what?"
	if (explorationStep === 1) {
		return (
			<div className="need-exploration need-exploration-substep">
				<div className="exploring-header">
					<span className="exploring-label">Exploring:</span>
					<Pill item={currentExploringNeed} type="need" state="clicked" />
				</div>

				<DeepenStep needName={currentExploringNeed} onSwap={handleSwap} />

				<SubStepNav
					current={1}
					total={totalSubSteps}
					onBack={exitExploration}
					onNext={() => setExplorationStep(2)}
					nextLabel="Continue"
					onExit={exitExploration}
				/>
			</div>
		);
	}

	// Step 2: Gentle grounding prompts
	if (explorationStep === 2) {
		const exploration = needExplorations[currentExploringNeed] || {};

		return (
			<div className="need-exploration need-exploration-substep">
				<div className="exploring-header">
					<span className="exploring-label">Exploring:</span>
					<Pill item={currentExploringNeed} type="need" state="clicked" />
				</div>

				<div className="grounding-intro">
					<p>
						Let's slow this down a little. When you choose a need, we're not trying to be right — we're
						trying to find what would actually bring relief or aliveness.
					</p>
					<p>You don't have to answer everything. Just notice what lands.</p>
				</div>

				<div className="grounding-prompts">
					{groundingPrompts.map(({ field, prompt }) => (
						<div key={field} className="grounding-prompt-item">
							<label className="grounding-label">{prompt}</label>
							<input
								type="text"
								className="grounding-input"
								value={exploration[field] || ""}
								onChange={(e) => updateField(field, e.target.value)}
								placeholder="..."
							/>
						</div>
					))}
				</div>

				<SubStepNav
					current={2}
					total={totalSubSteps}
					onBack={() => setExplorationStep(1)}
					onNext={() => setExplorationStep(3)}
					nextLabel="Continue"
					onExit={exitExploration}
				/>
			</div>
		);
	}

	// Step 7 (OLD_SUMMARY_STEP): Summary / completion
	if (explorationStep === OLD_SUMMARY_STEP) {
		const exploration = needExplorations[currentExploringNeed] || {};
		const isBlackHole = exploration.blackHole && exploration.blackHole.trim().length > 0;

		return (
			<div className="need-exploration need-exploration-substep">
				<h3>Sitting with: {currentExploringNeed}</h3>
				<p className="exploration-sit-with">
					Take a moment to just be with this. Your need for <strong>{currentExploringNeed}</strong> isn't a
					problem to fix — it's life energy, pointing you towards what makes life meaningful.
				</p>

				{isBlackHole && (
					<p className="exploration-black-hole-reflection">
						If this is a black hole need for you, remember: the other person in this situation may have
						touched the wound, but they probably didn't create it. This need was calling for attention
						before this incident — and it will deserve care long after. That's not a burden; it's an
						invitation to give yourself something you've needed for a long time.
					</p>
				)}

				<div className="exploration-summary">
					{groundingPrompts.some(({ field }) => exploration[field]?.trim()) && (
						<div className="summary-item summary-item-grounding">
							<strong>Grounding:</strong>
							{groundingPrompts.map(({ field, prompt }) =>
								exploration[field]?.trim() ? (
									<p key={field}>
										<em>{prompt}</em>
										<br />
										{exploration[field]}
									</p>
								) : null,
							)}
						</div>
					)}
					{exploration.bodyFeeling && (
						<div className="summary-item">
							<strong>In your body:</strong>
							<p>{exploration.bodyFeeling}</p>
						</div>
					)}
					{exploration.whenMet && (
						<div className="summary-item">
							<strong>When met:</strong>
							<p>{exploration.whenMet}</p>
						</div>
					)}
					{exploration.beauty && (
						<div className="summary-item">
							<strong>The beauty:</strong>
							<p>{exploration.beauty}</p>
						</div>
					)}
					{isBlackHole && (
						<div className="summary-item summary-item-blackhole">
							<strong>Black hole need:</strong>
							<p>{exploration.blackHole}</p>
						</div>
					)}
				</div>

				<div className="exploration-actions">
					<button
						onClick={() => {
							finishCurrentNeed();
						}}>
						{unexploredNeeds.length > 1 ? "Done — explore another need" : "Done"}
					</button>
					<button
						className="subtle-button"
						onClick={() => {
							finishCurrentNeed();
							moveOn();
						}}>
						I'm ready to move on
					</button>
				</div>

				<SubStepNav
					current={totalSubSteps}
					total={totalSubSteps}
					onBack={() => setExplorationStep(explorationStep - 1)}
					onNext={null}
					onExit={exitExploration}
				/>
			</div>
		);
	}

	// Steps 3-6: Reflective prompts (body, whenMet, beauty, blackHole)
	const prompt = oldExplorationPrompts[explorationStep];
	const currentValue = needExplorations[currentExploringNeed]?.[prompt.field] || "";
	const isLastPrompt = explorationStep === OLD_SUMMARY_STEP - 1;

	return (
		<div className="need-exploration need-exploration-substep">
			<div className="exploring-header">
				<span className="exploring-label">Exploring:</span>
				<Pill item={currentExploringNeed} type="need" state="clicked" />
			</div>

			<p className="exploration-prompt">{prompt.prompt}</p>

			<textarea
				className="exploration-textarea"
				value={currentValue}
				onChange={(e) => updateField(prompt.field, e.target.value)}
				placeholder="Take your time..."
				rows={4}
			/>

			<SubStepNav
				current={explorationStep}
				total={totalSubSteps}
				onBack={() => setExplorationStep(explorationStep - 1)}
				onNext={() => setExplorationStep(explorationStep + 1)}
				nextLabel={isLastPrompt ? "Finish" : "Next"}
				onExit={exitExploration}
			/>
		</div>
	);
};

NeedExploration.title = "Exploring Your Needs";
// help content for the main exploration page (with the need cloud)
NeedExploration.helpContent = (
	<>
		<h3>Clarifying a Need</h3>
		<p>
			Some needs are easy to name but harder to feel. When we slow down and explore what a need means personally,
			it often becomes clearer and more grounded.
		</p>

		<p>If the energy feels sharp or especially strong, you might gently ask:</p>

		<p>
			<em>“If I truly had this… what would that give me?”</em>
		</p>

		<p>Follow the thread until something softens.</p>

		<h3>Why Some Needs Feel Bigger</h3>
		<p>It can help to imagine your needs as small water tanks.</p>

		<p>Some tanks are usually full. Others fluctuate. And some may be running low.</p>

		<p>
			When a tank is low, reactions feel stronger. What looks like “overreacting” is often just a low tank being
			touched.
		</p>

		<p>
			Naming the need doesn’t fill the tank — but it often steadies the system enough to respond with more choice.
		</p>

		<p>
			<em>Learn more about the Needs Tank Model on the next page.</em>
		</p>
	</>
);

// help for the page that unpacks an individual need
NeedExploration.helpContentExtended = (
	<>
		<h3>Meeting a Need (Not Just Fulfilling It)</h3>

		<p>
			In everyday language, “meeting a need” usually means fulfilling it. Here, we’re using “meet” in a different
			way.
		</p>

		<p>
			To meet this need means to turn toward it — to sense how it lives in you, not just as a word, but as a
			longing, a forward-driving energy.
		</p>

		<p>
			Needs aren’t just concepts. They are the movement of life in you — the part that wants connection, safety,
			truth, contribution.
		</p>

		<p>
			Before looking for strategies, pause to recognise that living energy. Not to fix it. Not to analyse it. Just
			to acknowledge it.
		</p>

		<h3>Why Some Needs Feel Bigger Than the Moment</h3>

		<p>You can imagine your needs as small water tanks.</p>

		<p>
			Each need — for connection, affection, agency, freedom, safety, being seen — has its own tank. Some tanks
			are usually full. When they’re full, small disturbances don’t affect you much.
		</p>

		<p>Other tanks fluctuate — they fill and drain.</p>

		<p>
			And some tanks may feel chronically low. If a need wasn’t reliably met earlier in life, your nervous system
			may have learned to stay alert around it.
		</p>

		<p>
			When a tank is low, your system reacts faster and more intensely. The current situation may not be creating
			the wound — it may simply be touching something that was already tender.
		</p>

		<p>
			Naming the need doesn’t immediately fill the tank. But it often steadies the system enough to respond with
			more choice.
		</p>

		<h3>Black Hole Tanks</h3>

		<p>
			Some needs can feel like “black hole” tanks — no matter how much reassurance or effort comes in, it doesn’t
			seem to stay. It's like the tanks have holes in them.
		</p>

		<p>This can happen when the nervous system learned early that the need wasn’t safe to rely on.</p>

		<p>
			And, sometimes, a need can also look like a black hole because it’s standing in for a deeper one. For
			example, you might work very hard to feel accepted — and still feel unsettled — because what you’re really
			longing for is a deeper sense of mattering in yourself.
		</p>

		<p>
			In that case, no amount of reassurance from others fully lands. The surface need keeps feeling urgent and
			demanding, and you may feel easily triggered around it — not because you’re “too much,” but because
			something deeper is asking to be seen.
		</p>

		<h3>"Tragic Strategies"</h3>

		<p>
			When we’re not clear about the need underneath our feelings, we often reach for strategies that we hope will
			relieve the discomfort.
		</p>

		<p>
			We might push harder, withdraw, criticise, demand reassurance, over-explain, shut down, people-please, or
			try to control the situation.
		</p>

		<p>
			Marshall Rosenberg, who developed Nonviolent Communication, called these{" "}
			<strong>“tragic strategies for unmet needs.”</strong>
		</p>

		<p>
			They’re tragic not because we’re bad — but because the strategy is aimed at relief, while missing the real
			source of the pain.
		</p>

		<p>
			Without clarity about the need, we’re often shooting in the dark — and sometimes wounding ourselves or
			others in the process.
		</p>

		<p>
			Getting clear about the need changes the quality of our action. Instead of reacting from urgency, we respond
			from understanding.
		</p>

		<h3>Hold Tightly to the Need, Loosely to the Strategy</h3>

		<p>
			Filling the tank does <strong>not</strong> have to mean:
		</p>

		<ul>
			<li>This person</li>
			<li>This exact behaviour</li>
			<li>This one solution</li>
		</ul>

		<p>
			Once the need is clear, you can look for multiple ways to support it — including outside this relationship.
			That often reduces pressure and increases freedom.
		</p>
	</>
);

export default NeedExploration;
