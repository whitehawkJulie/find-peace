import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWizard } from "./WizardContext";
import { filterByState } from "../utils/renderHelpers";

const STEP_IDS = ["step1", "step2", "step3", "step4", "step5", "step6"];
const STEPS_WITH_EXTRA_HELP = new Set(["step2", "step3", "step4", "step5", "step6"]);

const STEP_DATA = {
	step1: {
		title: "Start with permission",
		desc: "Gently check if they're open.",
		hint: "This helps both of you feel safer before you begin.",
		scriptDefault: "Hey, is now a good time to talk about something?",
	},
	step2: {
		title: "Understand them first",
		desc: "Let them know you want to understand their side.",
		hint: "When people feel understood, things often soften.",
		scriptDefault: "I'd really like to understand what was going on for you earlier.",
	},
	step3: {
		title: "Check they're open to hearing you",
		desc: "Before sharing, make sure they're willing to listen.",
		hint: "If they're not ready yet, that's okay — you can come back to this later.",
		scriptDefault: "Would you be open to hearing what was going on for me?",
	},
	step4: {
		title: "Share your experience",
		desc: "Keep it simple and grounded in your experience.",
		hint: "You don't have to get this exactly right.",
		scriptDefault: "When [what happened], I felt [feeling], because I was needing [need].",
	},
	step5: {
		title: "Check they got it",
		desc: "Invite them to reflect back what they heard.",
		hint: "This isn't a test — it just helps you both feel clearer.",
		scriptDefault: "Could you tell me what you think I'm trying to say?",
	},
	step6: {
		title: "Find a way forward",
		desc: "Work together on what might help.",
		hint: "It doesn't have to be perfect — just a step that feels okay for both of you.",
		scriptDefault: "What could we do next time that would work better for both of us?",
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

// Per-step extraHelp JSX
const renderExtraHelp = (stepId) => {
	switch (stepId) {
		case "step2":
			return (
				<>
					<p>
						This might take a bit of listening. You don't have to agree with them — just focus on
						understanding what it was like for them.
					</p>
					<p>If you're not sure, you can gently guess:</p>
					<ul>
						<li>{'"Were you feeling…?"'}</li>
						<li>{'"Was it because you were needing…?"'}</li>
					</ul>
					<p>
						If your guess is off, that's okay — they'll usually correct you, and that helps you get closer.
					</p>
				</>
			);
		case "step3":
			return (
				<>
					<p>If they say no, or seem defensive, it usually means they're not ready yet.</p>
					<p>You might:</p>
					<ul>
						<li>{"Come back to listening to them a bit more"}</li>
						<li>{"Take a break and return later"}</li>
					</ul>
					<p>This isn't failure — it's pacing.</p>
				</>
			);
		case "step4":
			return (
				<>
					<p>Try to stay with:</p>
					<ul>
						<li>{"What actually happened (not interpretations)"}</li>
						<li>{"How you felt"}</li>
						<li>{"What you were needing"}</li>
					</ul>
					<p>
						{
							'If you notice blame or "you always / you never" creeping in, gently come back to talking about your own internal experience, rather than your thoughts about them.'
						}
					</p>
				</>
			);
		case "step5":
			return (
				<>
					<p>If they didn't quite get it, that's okay — you can try again more simply.</p>
					<p>You might say:</p>
					<ul>
						<li>{'"Not quite — what I meant was…"'}</li>
					</ul>
					<p>This step helps reduce misunderstandings before moving forward.</p>
				</>
			);
		case "step6":
			return (
				<>
					<p>You're looking for something that works for both of you — not just one person "winning".</p>
					<p>It can help to keep it:</p>
					<ul>
						<li>{"Specific"}</li>
						<li>{"Doable"}</li>
						<li>{"Open to adjustment"}</li>
					</ul>
				</>
			);
		default:
			return null;
	}
};

const buildFinalScript = (script) => {
	const h = (key) => SCRIPT_HEADINGS[key];
	const parts = [];

	parts.push(h("checkWillingness"));
	if (script.step1) parts.push(script.step1);
	parts.push("");

	parts.push(h("expressGuesses"));
	if (script.step2) parts.push(script.step2);
	parts.push("");

	parts.push(h("checkUnderstood"));
	parts.push(h("checkUnderstoodPrompt"));
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
	} = useWizard();

	const [openHelp, setOpenHelp] = useState(new Set());
	const textareaRefs = useRef({});

	const autoResize = useCallback((el) => {
		if (!el) return;
		el.style.height = "auto";
		el.style.height = el.scrollHeight + "px";
	}, []);

	const toggleHelp = (id) => {
		setOpenHelp((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

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
				step2 = `I'm wondering what it was like for you when ${guessObservation}, if you might have been feeling ${guessFeelStr || "[feeling]"}, and wanting ${guessNeedStr || "[need]"}.`;
			} else if (guessObservation) {
				step2 = `I'm wondering what it was like for you when ${guessObservation}.`;
			} else {
				step2 = `I'd really like to understand how it was for you earlier, if you might have been feeling ${guessFeelStr || "[feeling]"}, and wanting ${guessNeedStr || "[need]"}.`;
			}
		}

		const defaults = {};
		STEP_IDS.forEach((id) => {
			defaults[id] = STEP_DATA[id].scriptDefault;
		});

		const fields = {
			...defaults,
			step2: step2 || defaults.step2,
			step4: `When ${obs}, I felt ${feelStr}, because I was needing ${needStr}.`,
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
			<p className="collab-intro-note">{"Use these as prompts, not a script. Let it sound like you."}</p>

			<div className="collab-steps">
				{STEP_IDS.map((stepId, idx) => {
					const stepData = STEP_DATA[stepId];
					const value = collabScript[stepId] ?? stepData.scriptDefault ?? "";
					const helpOpen = openHelp.has(stepId);
					const hasExtraHelp = STEPS_WITH_EXTRA_HELP.has(stepId);
					return (
						<div className="collab-step" key={stepId}>
							<h3 className="collab-step-title">
								<span className="collab-step-num">{idx + 1}.</span>
								{stepData.title}
							</h3>
							<p className="collab-step-desc">{stepData.desc}</p>
							<p className="collab-step-hint">{stepData.hint}</p>
							<textarea
								className="collab-step-textarea"
								ref={(el) => {
									textareaRefs.current[stepId] = el;
									autoResize(el);
								}}
								value={value}
								onInput={(e) => autoResize(e.target)}
								onChange={(e) => updateCollabScript(stepId, e.target.value)}
							/>
							{hasExtraHelp && (
								<>
									<button
										className="collab-help-toggle"
										onClick={() => toggleHelp(stepId)}
										aria-expanded={helpOpen}>
										{helpOpen ? "▲ Hide extra help" : "Need a bit more help with this step?"}
									</button>
									{helpOpen && <div className="collab-help-extra">{renderExtraHelp(stepId)}</div>}
								</>
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
