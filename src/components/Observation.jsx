import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import ObservationExample from "./ObservationExample";
import "./Observation.css";

// ── Clarity checks ─────────────────────────────────────────────────────────

const checks = [
	{
		icon: "⏳",
		heading: "One specific moment",
		description: <p>Are we describing one instance — not a pattern or the whole history?</p>,
		extraInfo: (
			<>
				<p>
					Words like "always," "never," or "every time" often signal that multiple events are bundled
					together.
				</p>
				<p>
					Try narrowing to one specific time: <em>"On Tuesday evening when…"</em> rather than{" "}
					<em>"Every time we talk about this…"</em>
				</p>
			</>
		),
	},
	{
		icon: "🔎",
		heading: "Just what happened — not what it meant",
		description: (
			<>
				<p>
					Are we describing what was said or done, rather than interpretations like "disrespectful,"
					"uncaring," "manipulative"?
				</p>
				<p className="obs-check-hint">If it helps, imagine a camera in the room. What would it capture?</p>
			</>
		),
		extraInfo: (
			<>
				<p>
					Try stripping out words that carry a judgment or meaning. Instead of <em>"she was dismissive"</em>,
					try <em>"she looked at her phone while I was speaking."</em>
				</p>
				<p>Ask: could a camera have recorded this? If not, it may be interpretation.</p>
			</>
		),
	},
	{
		icon: "🎥",
		heading: "Something someone else could have seen or heard",
		description: (
			<p>Could another person in the room agree that this is what happened — even if they disagree about why?</p>
		),
		extraInfo: (
			<>
				<p>
					If someone else was there, would they describe it the same way? If they might say{" "}
					<em>"I didn't see it that way"</em>, there may be interpretation mixed in.
				</p>
				<p>Try rewriting in terms of actions, words, and what was physically present.</p>
			</>
		),
	},
	{
		icon: "🧠",
		heading: "No guesses about intention",
		description: (
			<p>
				Have we removed any assumptions about motive? (e.g., "to control me," "to hurt me," "because he doesn't
				care")
			</p>
		),
		extraInfo: (
			<>
				<p>
					We often add "because" or "in order to" — and those usually contain a guess. Our minds make meaning
					quickly; it's normal.
				</p>
				<p>
					Try leaving out the "why" for now. Just describe what happened — the motive question can come later.
				</p>
			</>
		),
	},
];

// ── Check panel ────────────────────────────────────────────────────────────

const CheckPanel = ({ observation, setObservation }) => {
	const [expanded, setExpanded] = useState({});

	return (
		<div className="obs-check-inline">
			<div className="obs-check-header">
				<h3>Let’s check the clarity</h3>
				<p>You don’t have to change anything. Just notice whether any of these land.</p>
			</div>

			<div className="obs-checks">
				{checks.map((check, i) => (
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
							{expanded[i] ? "Hide details" : "More detail"}
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
	const { observation, setObservation, setHelpDrawerOpen } = useWizard();

	return (
		<div className="step-observation">
			<p>
				Can you make a{" "}
				<button className="button-styled-as-link" onClick={() => setHelpDrawerOpen(true)}>
					clear observation
				</button>{" "}
				about what happened — just one specific moment?
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
				rows={6}
				placeholder="eg “Yesterday evening, when I was telling you about my day, you looked at your phone and didn’t respond.”"
			/>

			{/* Inline check panel always visible */}
			<CheckPanel observation={observation} setObservation={setObservation} />
		</div>
	);
};

Observation.title = "What happened?";

Observation.helpContent = (
	<>
		<h4>What is an observation?</h4>
		<p>
			An observation is a description of a specific moment — something that could have been seen or heard by
			someone in the room. It avoids interpretation, judgment, motive-guessing, and time collapse.
		</p>

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

		<h4>Example</h4>
		<ObservationExample />
	</>
);

export default Observation;
