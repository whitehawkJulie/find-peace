import React, { useState, useRef, useEffect } from "react";
import { useWizard } from "./WizardContext";
import ObservationExample from "./ObservationExample";
import "./Observation.css";

const observationChecks = [
	{
		icon: "⏳",
		heading: "One specific moment",
		description: "Choose a single moment — not the whole history. It's just easier to work with.",
		extraInfo: (
			<>
				Words like "always," "never," or "every time" often signal that multiple events are bundled together.
				<br />
				Try narrowing to one moment: <em>"On Tuesday evening when…"</em> instead of{" "}
				<em>"Every time we talk about this…"</em>
			</>
		),
	},
	{
		icon: "🔎",
		heading: "Just what happened — not what it meant",
		description: `Can you describe what was actually said or done, rather than interpretations like "disrespectful," "uncaring," "manipulative"?`,
		extraInfo: (
			<>
				Try stripping out words that carry a judgment or meaning, and rewriting in terms of actions, words, and
				what was physically present. Instead of <em>"she was dismissive"</em>, try{" "}
				<em>"she looked at her phone while I was speaking."</em>
				<br />
				If it helps, imagine what someone else in the room might have noticed happening. What might they say
				they saw or heard?
			</>
		),
	},
	{
		icon: "🧠",
		heading: `Leave the "why" aside just for now`,
		description: `Can you remove any assumptions about motive? (e.g., "to control me," "to hurt me," "because he doesn't care")`,
		extraInfo: (
			<>
				Our minds fill in meaning very quickly — that's normal. Try leaving out the "because" for now. Just
				describe what happened. The question of why can come later.
			</>
		),
	},
];

// ── Check panel ────────────────────────────────────────────────────────────

const CheckPanel = ({ title }) => {
	const [expanded, setExpanded] = useState({});

	return (
		<div className="obs-check-inline">
			<div className="obs-check-header">
				<h3>{title}</h3>
			</div>

			<div className="obs-checks">
				{observationChecks.map((check, i) => (
					<div className="obs-check" key={i}>
						<h4>
							<span className="obs-check-icon">{check.icon}</span>
							{check.heading}
						</h4>

						<p>{check.description}</p>

						<button
							type="button"
							className="button-styled-as-link"
							aria-expanded={expanded[i]}
							onClick={() =>
								setExpanded((prev) => ({
									...prev,
									[i]: !prev[i],
								}))
							}>
							{expanded[i] ? "Hide example" : "Show example"}
						</button>

						{expanded[i] && <div className="obs-check-hint-box">{check.extraInfo}</div>}
					</div>
				))}
			</div>
		</div>
	);
};

// ── Main step component ────────────────────────────────────────────────────

const Observation = () => {
	const { observation, setObservation, jackalTalk, setJackalTalk } = useWizard();
	const [showCheckPanel, setShowCheckPanel] = useState(false);
	const checkPanelRef = useRef(null);

	useEffect(() => {
		if (showCheckPanel) {
			checkPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}
	}, [showCheckPanel]);

	return (
		<div className="step-observation step-container">
			<p>
				Here we're separating what happened from the story, so that we can start to move out of reaction and
				into clearer understanding.
			</p>
			<p>
				Let's slow down and look at the specific moment itself — just what someone could have seen or heard,
				before any interpretations, or assumptions about motives.
			</p>

			<div>
				<p>
					Before we try to make sense of it, say it the raw way. This isn't about being fair or accurate —
					just letting the first wave out.
				</p>
				<p className="obs-panel-intro">
					{"If you said the uncensored version in one breath, what would it be?"}
				</p>
				<textarea
					value={jackalTalk}
					onChange={(e) => setJackalTalk(e.target.value)}
					placeholder="They ALWAYS do this! I'm so over it..."
					rows={3}
				/>
			</div>

			<p>Now, reading what you've just written, can you check for the following?</p>
			<CheckPanel title="From threat mode to curiosity" />

			<p>
				Now, if you were to remove all those parts, and replace them with what a camera would have seen and
				heard, what would you write?
			</p>
			<textarea
				className="obs-main-textarea"
				value={observation.refined || ""}
				onChange={(e) =>
					setObservation((prev) => ({
						...prev,
						refined: e.target.value,
					}))
				}
				rows={4}
				placeholder={
					"Example:\nYesterday evening,\nwhile I was telling you about my day,\nyou looked at your phone and didn't respond."
				}
			/>
		</div>
	);
};

Observation.title = "What just happened?";
Observation.titleSweary = "What the hell just happened?";
Observation.navTitle = "What was the moment?";
Observation.helpContent = (
	<>
		<h4>What is an observation?</h4>
		<>
			An observation is a description of a specific moment — something that could have been seen or heard by
			someone in the room. It avoids interpretation, judgment, motive-guessing, and time collapse.
		</>

		<h4>How to write one</h4>
		<ul>
			<li>
				<strong>Be specific</strong> — one moment, not "you always…"
			</li>
			<li>
				<strong>Stick to actions and words</strong> — what was said or done
			</li>
			<li>
				<strong>Leave out the "why"</strong> — motives can come later
			</li>
		</ul>

		<h4>Interactive Example</h4>
		<p>Click the buttons to see it change.</p>
		<ObservationExample />
	</>
);

export default Observation;
