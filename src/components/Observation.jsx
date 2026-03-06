import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import ObservationExample from "./ObservationExample";
import "./Observation.css";

// ── Clarity checks ─────────────────────────────────────────────────────────

const checks = [
	{
		icon: "⏳",
		heading: "One specific moment",
		description: <p>Choose a single instance — not the whole history.</p>,
		extraInfo: (
			<>
				<p>
					Words like "always," "never," or "every time" often signal that multiple events are bundled
					together.
				</p>
				<p>
					Try narrowing to one moment: <em>"On Tuesday evening when…"</em> instead of{" "}
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
					Are we describing what was actually said or done, rather than interpretations like "disrespectful,"
					"uncaring," "manipulative"?
				</p>
			</>
		),
		extraInfo: (
			<>
				<p>
					Try stripping out words that carry a judgment or meaning, and rewriting in terms of actions, words,
					and what was physically present. Instead of <em>"she was dismissive"</em>, try{" "}
					<em>"she looked at her phone while I was speaking."</em>
				</p>

				<p>
					If it helps, imagine what someone else in the room might have noticed happening. What might they say
					they saw or heard?
				</p>
			</>
		),
	},

	{
		icon: "🧠",
		heading: "Leave the “why” aside just for now",
		description: (
			<p>
				Have we removed any assumptions about motive? (e.g., "to control me," "to hurt me," "because he doesn't
				care")
			</p>
		),
		extraInfo: (
			<>
				Our minds fill in meaning very quickly — that’s normal. Try leaving out the “because” for now. Just
				describe what happened. The question of why can come later.
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
				<h3>Want to check the clarity?</h3>
				<p>
					You don’t have to change anything. Just notice whether any of these land. These questions simply
					help separate what happened from the meaning our minds add.
				</p>
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
			<p>Reclaiming your agency starts right here.</p>

			<p>
				You can’t control what the other person did. But you can start by choosing where to put your attention
				and how to understand what happened.
			</p>

			<p>Start with one specific moment that stood out to you, that still holds some charge for you.</p>

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

Observation.title = "Start with one moment";

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
