import React, { useEffect, useRef, useCallback } from "react";
import { useWizard } from "../WizardContext";
import { filterByState } from "../../utils/renderHelpers";
import HelpLink from "../HelpLink";

const STEP_IDS = ["step1", "step2", "step2a", "step3", "step4", "step5", "step6"];

const STEP_DATA = {
	step1: {
		title: "Start with permission",
		desc: "Gently check if they're open, and whether this is a good time to talk.",
		hint: "This makes it much more likely to go well!",
		scriptDefault: "Hey, is now a good time to talk about something?",
	},
	step2: {
		title: "Express your guesses for them, first",
		desc: "Let them know you want to understand their side, and offer your guesses about how it might have been for them \
			AND be willing to hear their corrections, if you've guessed wrongly.",
		hint: "Make it clear that they are guesses, not an analysis of them. Also, if you've guessed a lot of feelings and needs, you might want to focus on the most significant ones.",
		scriptDefault: "I'd really like to understand how it was for you at that time.",
		helpQuestion: "Why express guesses first?",
		helpTopicId: "collab-understand-them",
	},
	step2a: {
		title: "Keep checking your understanding of them",
		desc: "We don't just offer our guesses - we check if we're understanding them right, and invite them to correct us if not.",
		hint: "When people feel understood, they often soften.",
		scriptDefault: "Is that right? Am I understanding you correctly?",
		// helpQuestion: "What if they're not ready to listen?",
		// helpTopicId: "collab-check-willingness",
	},
	step3: {
		title: "Check they're open to hearing you",
		desc: "Before sharing your side of things, make sure they're willing to listen.",
		hint: "If they're not ready yet, that's okay — you can come back to this later.",
		scriptDefault: "Would you be open to hearing what was going on for me?",
		helpQuestion: "What if they're not ready to listen?",
		helpTopicId: "collab-check-willingness",
	},

	step4: {
		title: "Share your experience",
		desc: "Sharing your observation, feels and needs keeps it simple and grounded in your experience, \
		rather than expressing your thoughts about THEM. You might like to edit the following \
		down to the 2 or 3 loudest of your feelings and needs.",
		hint: "You don't have to get this exactly right.",
		scriptDefault: "When [what happened], I felt [feeling], because I was needing [need].",
		helpQuestion: "How do I share without it coming out as blame?",
		helpTopicId: "collab-share-experience",
	},
	step5: {
		title: "Check they got it",
		desc: "Invite them to reflect back what they heard - not to test they've heard you, but that you'd expressed yourself clearly enough for them to understand.",
		hint: "This isn't a test — it just helps you both feel clearer.",
		scriptDefault:
			"Could you tell me what you think I'm trying to say, so I know I've expressed myself clearly enough?",
		helpQuestion: "What if they didn't quite get it?",
		helpTopicId: "collab-check-understood",
	},
	step6: {
		title: "Find a way forward",
		desc: "Work together on what might help.",
		hint: "It doesn't have to be perfect — just a step that feels okay for both of you.",
		scriptDefault: "What could we do next time that would work better for both of us?",
		helpQuestion: "How do we find something that works for both of us?",
		helpTopicId: "collab-way-forward",
	},
};

const SCRIPT_HEADINGS = {
	checkWillingness: "=== CHECK WILLINGNESS FOR CONVERSATION ===",
	expressGuesses: "=== EXPRESS GUESSES FOR THEM ===",
	checkUnderstood: "=== Need to check you've understood them? ===",
	checkUnderstoodPrompt: "Have I heard you correctly? Is this what you're saying?",
	checkWillingnessHear: "=== CHECK FOR WILLINGNESS TO HEAR YOU ===",
	expressOwn: "=== EXPRESS OWN FEELINGS AND NEEDS ===",
	checkTheyUnderstood: "=== Need to check they've understood you? ===",
	mutualSolution: "=== FIND A MUTUAL SOLUTION ===",
};

const buildFinalScript = (script) => {
	const h = (key) => SCRIPT_HEADINGS[key];
	const parts = [];

	parts.push(h("checkWillingness"));
	if (script.step1) parts.push(script.step1);
	parts.push("");

	parts.push(h("expressGuesses"));
	if (script.step2) parts.push(script.step2);
	if (script.step2a) parts.push(script.step2a);
	parts.push("");

	parts.push(h("checkWillingnessHear"));
	if (script.step3) parts.push(script.step3);
	parts.push("");

	parts.push(h("expressOwn"));
	if (script.step4) parts.push(script.step4);
	parts.push("");

	parts.push(h("checkTheyUnderstood"));
	if (script.step5) parts.push(script.step5);
	parts.push("");

	parts.push(h("mutualSolution"));
	if (script.step6) parts.push(script.step6);
	parts.push("");

	return parts.join("\n");
};

const Collaborate = () => {
	const {
		collabScript,
		setCollabScript,
		includeCollabInSummary,
		setIncludeCollabInSummary,
		guessObservation,
		guessFeelings,
		guessNeeds,
		observation,
		feelings,
		needs,
		openHelpTopic,
	} = useWizard();

	const textareaRefs = useRef({});

	const autoResize = useCallback((el) => {
		if (!el) return;
		el.style.height = "auto";
		el.style.height = el.scrollHeight + "px";
	}, []);

	const updateCollabScript = (field, value) => {
		setCollabScript((prev) => ({ ...prev, [field]: value }));
		setIncludeCollabInSummary(true);
	};

	// Initialise step fields from context data on first visit
	useEffect(() => {
		if (collabScript.step1 !== undefined) return;

		const allFeelings = [...filterByState(feelings, "clicked"), ...filterByState(feelings, "double-clicked")];
		const allNeeds = [...filterByState(needs, "clicked"), ...filterByState(needs, "double-clicked")];
		const obs = observation?.refined?.trim() || "[what happened]";
		const feelStr = allFeelings.length ? allFeelings.join(", ").toLowerCase() : "[feeling]";
		const needStr = allNeeds.length ? allNeeds.join(", ").toLowerCase() : "[need]";

		const guessFeelingsAll = [
			...filterByState(guessFeelings, "clicked"),
			...filterByState(guessFeelings, "double-clicked"),
		];
		const guessNeedsAll = [...filterByState(guessNeeds, "clicked"), ...filterByState(guessNeeds, "double-clicked")];
		const guessFeelStr = guessFeelingsAll.join(", ").toLowerCase();
		const guessNeedStr = guessNeedsAll.join(", ").toLowerCase();

		let step2 = "";
		if (guessObservation || guessFeelStr || guessNeedStr) {
			if (guessObservation && (guessFeelStr || guessNeedStr)) {
				step2 = `I'm wondering what it was like for you when\n${guessObservation}\nif you might have been feeling\n${guessFeelStr || "[feeling]"}\nand wanting\n${guessNeedStr || "[need]"}.`;
			} else if (guessObservation) {
				step2 = `I'm wondering what it was like for you when\n${guessObservation}.`;
			} else {
				step2 = `I'd really like to understand how it was for you earlier, if you might have been feeling\n${guessFeelStr || "[feeling]"}\nand wanting\n${guessNeedStr || "[need]"}.`;
			}
		}

		const defaults = {};
		STEP_IDS.forEach((id) => {
			defaults[id] = STEP_DATA[id].scriptDefault;
		});

		const fields = {
			...defaults,
			step2: step2 || defaults.step2,
			step4: `When\n${obs}\nI felt\n${feelStr}\nbecause I was needing\n${needStr}.`,
		};

		setCollabScript({
			...fields,
			finalScript: buildFinalScript(fields),
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Auto-resize all tracked textareas whenever their content changes
	useEffect(() => {
		Object.values(textareaRefs.current).forEach(autoResize);
	}, [collabScript, autoResize]);

	return (
		<div>
			<p>If you'd like to talk this through with the other person, this can help you plan the conversation.</p>
			<p>There's no perfect way to do this — just something honest and human.</p>
			<p className="collab-intro-note">
				We've used what you entered earlier — your feelings, needs, and your guesses about their perspective —
				to pre-fill the text boxes below. Edit them until they sound like you.
			</p>

			<div className="collab-steps">
				{STEP_IDS.map((stepId, idx) => {
					const stepData = STEP_DATA[stepId];
					const value = collabScript[stepId] ?? stepData.scriptDefault ?? "";
					return (
						<div className="collab-step" key={stepId}>
							<h3 className="collab-step-title">
								<span className="collab-step-num">{stepId.replace("step", "")}.</span>
								{stepData.title}
							</h3>
							<p className="collab-step-desc">{stepData.desc}</p>
							<p className="collab-step-hint">{stepData.hint}</p>
							<textarea
								className="collab-step-textarea"
								data-field-id={`collab-${stepId}`}
								ref={(el) => {
									textareaRefs.current[stepId] = el;
									autoResize(el);
								}}
								value={value}
								onInput={(e) => autoResize(e.target)}
								onChange={(e) => updateCollabScript(stepId, e.target.value)}
							/>
							{stepData.helpTopicId && (
								<button
									className="expand-text-toggle"
									onClick={() => openHelpTopic(stepData.helpTopicId)}>
									{stepData.helpQuestion}
								</button>
							)}
						</div>
					);
				})}

				<div className="collab-step collab-step--final">
					<h3 className="collab-step-title">{"Say it in your own words"}</h3>
					<p className="collab-step-desc">
						{"Here's your whole script — edit it to make it sound more like you."}
					</p>
					<p className="collab-step-hint">
						{"This is just a guide, not the exact words to use. If you speak it, let it sound natural."}
					</p>
					<textarea
						className="collab-step-textarea collab-step-textarea--very-tall"
						data-field-id="collab-final-script"
						placeholder="Your conversation script will appear here…"
						ref={(el) => {
							textareaRefs.current["finalScript"] = el;
							autoResize(el);
						}}
						value={collabScript.finalScript ?? ""}
						onInput={(e) => autoResize(e.target)}
						onChange={(e) => updateCollabScript("finalScript", e.target.value)}
					/>
					<button
						className="collab-regenerate-btn"
						onClick={() => updateCollabScript("finalScript", buildFinalScript(collabScript))}>
						{"↺ Regenerate from fields above"}
					</button>
				</div>
			</div>

			<button className="expand-text-toggle" onClick={() => openHelpTopic("nervous")}>
				{"Nervous about having the conversation?"}
			</button>

			<label className="collab-include-label">
				<input
					type="checkbox"
					className="collab-include-checkbox"
					checked={includeCollabInSummary}
					onChange={(e) => setIncludeCollabInSummary(e.target.checked)}
				/>
				<span className="collab-include-text">Include this conversation guide in my summary</span>
			</label>
		</div>
	);
};

export default Collaborate;
