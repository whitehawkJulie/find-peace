import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import Pill from "./Pill";
import "./NeedExploration.css";

const SUMMARY_STEP = 6;

const explorationPrompts = [
	null, // step 0: pick a need
	null, // step 1: deepen ("if I had this, then what?")
	{
		title: "Body awareness",
		field: "bodyFeeling",
		prompt:
			"Close your eyes for a moment if you can. Where in your body do you feel this need? Is there tightness, heaviness, emptiness, restlessness? Just notice — there's no right answer.",
	},
	{
		title: "When this need is met",
		field: "whenMet",
		prompt:
			"Can you recall a time when this need WAS met — even partially? What did that feel like in your body? What was happening? Let yourself really feel into that memory for a moment.",
	},
	{
		title: "The beauty of this need",
		field: "beauty",
		prompt:
			"What is beautiful about this need? What does it tell you about what matters to you, about who you are? This need is life energy — it's telling you something important about what makes life wonderful for you.",
	},
	{
		title: "Is this a black hole need?",
		field: "blackHole",
		prompt:
			"Does this need feel familiar — like it keeps showing up in your life? Do you get triggered around it often, maybe intensely? If so, this might be a \"black hole need\" — one that's been deeply unmet for a long time, possibly since childhood. It doesn't mean something is wrong with you. It means this need deserves real attention, beyond just this situation. What do you notice?",
	},
	null, // step 6: summary
];

// Step 1: Deepen — "If I had this need, then what would I have?"
const DeepenStep = ({ needName, onSwap }) => {
	const [steps, setSteps] = useState([""]);

	const addStep = () => setSteps((prev) => [...prev, ""]);
	const updateStep = (index, value) =>
		setSteps((prev) => prev.map((s, i) => (i === index ? value : s)));

	// The deepest non-empty answer
	const deepestNeed = [...steps].reverse().find((s) => s.trim()) || "";

	return (
		<div className="deepen-step">
			<p className="deepen-intro">
				Sometimes the need we name first is a stepping stone to something deeper.
				Let's check — ask yourself:
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
				<button
					className="subtle-button"
					onClick={addStep}
					disabled={!steps[steps.length - 1].trim()}
				>
					Go deeper — "If I had {steps[steps.length - 1] || "that"}, then what?"
				</button>
			</div>

			<div className="deepen-test">
				<p className="deepen-test-label">How to know if you've found the real need:</p>
				<ul>
					<li>
						If you feel <strong>self-righteous</strong> about it ("I <em>deserve</em> this!"),
						you probably haven't reached it yet. Keep going.
					</li>
					<li>
						If the phrase <em>"Every cell in my body is longing for{" "}
						{deepestNeed || needName}"</em>{" "}
						brings <strong>tears or a deep softening</strong>, you've probably found it.
					</li>
				</ul>
			</div>

			{steps.some((s) => s.trim()) && (
				<>
					<div className="deepen-chain-display">
						<span className="deepen-chain-path-label">Your path:</span>
						<span className="deepen-chain-path-items">
							{needName}
							{steps.filter((s) => s.trim()).map((s, i) => (
								<span key={i}> → {s}</span>
							))}
						</span>
					</div>

					{deepestNeed && (
						<div className="deepen-swap-offer">
							<p>
								It sounds like <strong>{deepestNeed}</strong> might be the deeper need here.
								Would you like to explore <strong>{deepestNeed}</strong> instead of{" "}
								<strong>{needName}</strong>?
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
	} = useWizard();

	// Get all unmet needs (single-clicked)
	const unmetNeeds = Object.entries(needs)
		.filter(([_, status]) => status === "clicked")
		.map(([name]) => name);

	const exploredNeeds = Object.keys(needExplorations).filter(
		(n) => needExplorations[n]?.completed
	);
	const unexploredNeeds = unmetNeeds.filter((n) => !exploredNeeds.includes(n));

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

	const startExploring = (needName) => {
		setCurrentExploringNeed(needName);
		if (!needExplorations[needName]) {
			setNeedExplorations((prev) => ({
				...prev,
				[needName]: { bodyFeeling: "", whenMet: "", beauty: "", blackHole: "", completed: false },
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

	// Swap the current need for a deeper one
	const handleSwap = (deeperNeedName) => {
		const oldNeed = currentExploringNeed;

		// Move the old need's status to the new one
		setNeeds((prev) => {
			const updated = { ...prev };
			delete updated[oldNeed];
			updated[deeperNeedName] = "clicked";
			return updated;
		});

		// Move any exploration data to the new need name
		setNeedExplorations((prev) => {
			const updated = { ...prev };
			const oldData = updated[oldNeed] || { bodyFeeling: "", whenMet: "", beauty: "", blackHole: "", completed: false };
			delete updated[oldNeed];
			updated[deeperNeedName] = oldData;
			return updated;
		});

		setCurrentExploringNeed(deeperNeedName);
		// Move to step 2 (body awareness) after swapping
		setExplorationStep(2);
	};

	// Step 0: Pick a need (merged from NeedsUnmet)
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
					Here are the needs that weren't fully met for you in that moment.
					Take a moment to just notice them — not as problems to fix, but as
					important parts of who you are.
				</p>

				<p>
					Do any of these feel familiar? Needs that keep showing up — that you
					keep getting triggered around — may be what we call{" "}
					<strong>"black hole needs"</strong>: deeply unmet needs, often from
					way back, that pull everything towards them. If you notice one, that's
					actually valuable information.
				</p>

				<p>
					<strong>Tap a need above to explore it more deeply.</strong> You'll
					have a chance to check if it's the "real" need, sit with it, and
					discover what it's telling you.
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

	// Step 1: Deepen — "If I had this, then what?"
	if (explorationStep === 1) {
		return (
			<div className="need-exploration">
				<div className="exploring-header">
					<span className="exploring-label">Exploring:</span>
					<Pill item={currentExploringNeed} type="need" state="clicked" />
				</div>

				<DeepenStep
					needName={currentExploringNeed}
					onSwap={handleSwap}
				/>

				<div className="exploration-nav">
					<button className="subtle-button" onClick={() => setExplorationStep(0)}>
						Back
					</button>
					<button onClick={() => setExplorationStep(2)}>
						Continue with "{currentExploringNeed}"
					</button>
				</div>
			</div>
		);
	}

	// Summary / completion step
	if (explorationStep === SUMMARY_STEP) {
		const exploration = needExplorations[currentExploringNeed] || {};
		const isBlackHole = exploration.blackHole && exploration.blackHole.trim().length > 0;

		return (
			<div className="need-exploration">
				<h3>Sitting with: {currentExploringNeed}</h3>
				<p className="exploration-sit-with">
					Take a moment to just be with this. Your need for <strong>{currentExploringNeed}</strong>{" "}
					isn't a problem to fix — it's life energy, pointing you towards what makes life meaningful.
				</p>

				{isBlackHole && (
					<p className="exploration-black-hole-reflection">
						If this is a black hole need for you, remember: the other person in this situation may
						have touched the wound, but they probably didn't create it. This need was calling for
						attention before this incident — and it will deserve care long after. That's not a
						burden; it's an invitation to give yourself something you've needed for a long time.
					</p>
				)}

				<div className="exploration-summary">
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
					<button onClick={() => { finishCurrentNeed(); }}>
						{unexploredNeeds.length > 1
							? "Done — explore another need"
							: "Done"}
					</button>
					<button className="subtle-button" onClick={() => { finishCurrentNeed(); moveOn(); }}>
						I'm ready to move on
					</button>
				</div>
			</div>
		);
	}

	// Steps 2-5: Reflective prompts (body, whenMet, beauty, blackHole)
	const prompt = explorationPrompts[explorationStep];
	const currentValue = needExplorations[currentExploringNeed]?.[prompt.field] || "";
	const isLastPrompt = explorationStep === SUMMARY_STEP - 1;

	return (
		<div className="need-exploration">
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

			<div className="exploration-nav">
				<button className="subtle-button" onClick={() => setExplorationStep(explorationStep - 1)}>
					Back
				</button>
				<button onClick={() => setExplorationStep(explorationStep + 1)}>
					{isLastPrompt ? "Finish" : "Next"}
				</button>
			</div>
		</div>
	);
};

NeedExploration.title = "Exploring Your Needs";
NeedExploration.helpContent = (
	<>
		<p>
			This step is inspired by the work of Susan Skye and Robert Gonzales, who invite us to connect
			with needs not as deficiencies, but as beautiful expressions of what makes life wonderful.
		</p>
		<h4>Finding the real need</h4>
		<p>
			Sometimes the need you've named is actually a stepping stone to a deeper need. The test: if
			you feel self-righteous about the need, there's probably something underneath. Keep asking
			"If I had that, then what would I have?" until you find the one that brings tears or a deep
			softening — that's the real one.
		</p>
		<h4>Beauty of the needs</h4>
		<p>
			Choose the need that feels most alive in you right now and explore it gently. There's no rush
			— sit with each question and see what comes up.
		</p>
		<h4>Black hole needs</h4>
		<p>
			Some needs are so deeply unmet — often from childhood — that they act like a black hole,
			pulling every new situation into their gravity. We get triggered around them repeatedly, and
			we may have developed "tragic strategies" to cope: people-pleasing, withdrawing, controlling,
			overworking, or other patterns that don't actually meet the need.
		</p>
		<p>
			Recognising a black hole need is powerful. It often brings the clarity that the other person
			in this situation didn't cause this pain — they touched something that was already there.
			This shifts the work from "how do I fix this situation?" to "how do I care for this need in
			my life?"
		</p>
		<p>
			You can explore as many needs as you like, or skip ahead whenever you're ready.
		</p>
	</>
);

export default NeedExploration;
