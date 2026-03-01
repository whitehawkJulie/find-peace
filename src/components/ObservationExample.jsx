import React, { useState, useRef } from "react";
import "./ObservationExample.css";

const START_TEXT = `"You never take me seriously. You're so dismissive and selfish. You just don't care about what I'm saying — you're trying to shut me down. I'm probably just being too sensitive like always."`;

const STEPS = [
	{
		label: "Shrink time",
		description: "Focus on one specific moment instead of a pattern.",
		text: `"Yesterday evening, when I was talking about my work, you didn't take me seriously. You were dismissive and selfish. You were trying to shut me down."`,
		note: `"never" and "always" removed — but labels and motive guesses remain.`,
	},
	{
		label: "Remove labels",
		description: "Replace character judgments with observable behaviour.",
		text: `"Yesterday evening, when I was talking about my work, you interrupted me and laughed. You were trying to shut me down."`,
		note: `"dismissive," "selfish," and "too sensitive" removed. Motive attribution remains.`,
	},
	{
		label: "Remove motive attribution",
		description: "Put aside guesses about intention and stick to what was said or done.",
		text: `"Yesterday evening, when I was talking about my work, you interrupted me and laughed, and said, 'It's not that big a deal.'"`,
		note: null,
	},
];

// Annotated segment transitions for adjacent steps.
// fromSegs: current text split into parts; strike:true = show as strikethrough
// toSegs:   next text split into parts;    isNew:true = briefly highlight as addition
// Segments must concatenate exactly to the corresponding plain text strings.
const TRANSITIONS = {
	"null->0": {
		fromSegs: [
			{ text: `"You never`, strike: true },
			{ text: ` take me seriously. You're so dismissive and selfish. ` },
			{ text: `You just don't care about what I'm saying — `, strike: true },
			{ text: `you're trying to shut me down.` },
			{ text: ` I'm probably just being too sensitive like always."`, strike: true },
		],
		toSegs: [
			{ text: `"Yesterday evening, when I was talking about my work, you didn't`, isNew: true },
			{ text: ` take me seriously. You were dismissive and selfish. You were trying to shut me down."` },
		],
	},
	"0->1": {
		fromSegs: [
			{ text: `"Yesterday evening, when I was talking about my work, ` },
			{ text: `you didn't take me seriously. You were dismissive and selfish.`, strike: true },
			{ text: ` You were trying to shut me down."` },
		],
		toSegs: [
			{ text: `"Yesterday evening, when I was talking about my work, ` },
			{ text: `you interrupted me and laughed.`, isNew: true },
			{ text: ` You were trying to shut me down."` },
		],
	},
	"1->2": {
		fromSegs: [
			{ text: `"Yesterday evening, when I was talking about my work, you interrupted me and laughed` },
			{ text: `. You were trying to shut me down."`, strike: true },
		],
		toSegs: [
			{ text: `"Yesterday evening, when I was talking about my work, you interrupted me and laughed` },
			{ text: `, and said, 'It's not that big a deal.'"`, isNew: true },
		],
	},
};

const STRIKE_DURATION = 1800; // ms to hold strikethrough before swapping
const REVEAL_DURATION = 1400; // ms to hold highlight before settling

const ObservationExample = () => {
	const [displayedStep, setDisplayedStep] = useState(null);
	const [animPhase, setAnimPhase] = useState("idle"); // "idle" | "strike" | "reveal"
	const [animSegs, setAnimSegs] = useState([]);
	const timers = useRef([]);

	const clearTimers = () => {
		timers.current.forEach(clearTimeout);
		timers.current = [];
	};

	const schedule = (fn, delay) => {
		const id = setTimeout(fn, delay);
		timers.current.push(id);
	};

	const handleStep = (index) => {
		if (index === displayedStep || animPhase !== "idle") return;
		clearTimers();

		const key = `${displayedStep === null ? "null" : displayedStep}->${index}`;
		const transition = TRANSITIONS[key];

		if (transition) {
			// Phase 1: show strikethroughs on current text
			setAnimPhase("strike");
			setAnimSegs(transition.fromSegs);

			schedule(() => {
				// Phase 2: swap to new text with additions highlighted
				setDisplayedStep(index);
				setAnimPhase("reveal");
				setAnimSegs(transition.toSegs);

				schedule(() => {
					// Phase 3: settle to plain text
					setAnimPhase("idle");
					setAnimSegs([]);
				}, REVEAL_DURATION);
			}, STRIKE_DURATION);
		} else {
			// Non-adjacent jump: swap immediately
			setDisplayedStep(index);
		}
	};

	const handleReset = () => {
		clearTimers();
		setDisplayedStep(null);
		setAnimPhase("idle");
		setAnimSegs([]);
	};

	const renderQuoteText = () => {
		if (animPhase === "idle") {
			const text = displayedStep === null ? START_TEXT : STEPS[displayedStep].text;
			return <p className="obs-ex-text">{text}</p>;
		}
		return (
			<p className="obs-ex-text">
				{animSegs.map((seg, i) => (
					<span
						key={i}
						className={seg.strike ? "obs-ex-strike" : seg.isNew ? "obs-ex-new" : undefined}>
						{seg.text}
					</span>
				))}
			</p>
		);
	};

	const note =
		displayedStep !== null && animPhase !== "strike" ? STEPS[displayedStep].note : null;

	return (
		<div className="obs-ex">
			<div className="obs-ex-quote">
				{renderQuoteText()}
				{note && <p className="obs-ex-note">{note}</p>}
			</div>

			{displayedStep !== null && animPhase === "idle" && (
				<button className="obs-ex-reset" onClick={handleReset}>
					← Start over
				</button>
			)}

			<div className="obs-ex-steps">
				{STEPS.map((step, i) => (
					<div key={i} className="obs-ex-row">
						<button
							className={`obs-ex-btn ${displayedStep === i ? "obs-ex-btn--active" : ""}`}
							onClick={() => handleStep(i)}
							disabled={animPhase !== "idle"}>
							{step.label}
						</button>
						<span className="obs-ex-desc">{step.description}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default ObservationExample;
