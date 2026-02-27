import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import "./Observation.css";

// ── Clarity checks ─────────────────────────────────────────────────────────

const checks = [
	{
		icon: "🔎",
		heading: "Just what happened — not what it meant",
		description: (
			<>
				<p>
					Are we describing what was said or done? Or are we including interpretations like "disrespectful,"
					"uncaring," "manipulative"?
				</p>
				<p className="obs-check-hint">If it helps, imagine a camera in the room. What would it capture?</p>
			</>
		),
		noHint: (
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
		noHint: (
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
				Are we including assumptions about motive? (e.g., "to control me," "to hurt me," "because he doesn't
				care")
			</p>
		),
		noHint: (
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
	{
		icon: "⏳",
		heading: "One specific moment",
		description: <p>Are we describing one instance — not a pattern or the whole history?</p>,
		noHint: (
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
];

// ── Build panel ────────────────────────────────────────────────────────────

const BuildPanel = ({ observation, setObservation, jackalTalk, setJackalTalk, onClose }) => {
	const update = (field, value) => setObservation((prev) => ({ ...prev, [field]: value }));

	const handleDone = () => {
		const parts = [observation.moment, observation.actions, observation.camera].filter((s) => s?.trim());
		if (parts.length > 0) {
			setObservation((prev) => ({ ...prev, refined: parts.join("\n\n") }));
		}
		onClose();
	};

	return (
		<div className="obs-panel-backdrop" onClick={onClose}>
			<div className="obs-panel" onClick={(e) => e.stopPropagation()}>
				<div className="obs-panel-header">
					<h3>Help me build it</h3>
					<button className="obs-panel-close" onClick={onClose}>
						×
					</button>
				</div>

				<div className="obs-panel-body">
					<div className="obs-panel-section obs-panel-section-vent">
						<label className="obs-panel-label">
							If you said the uncensored version in one breath, what would it be?
						</label>
						<p className="obs-panel-sublabel">
							This is just for you. Not fair, not accurate — just the first wave.
						</p>
						<textarea
							value={jackalTalk}
							onChange={(e) => setJackalTalk(e.target.value)}
							placeholder="They ALWAYS do this! I'm so over it..."
							rows={4}
						/>
					</div>

					<div className="obs-panel-divider" />

					<p className="obs-panel-intro">
						The whole story may be big and complicated. We're just choosing one moment — like pausing a
						video on a single frame.
					</p>

					<div className="obs-panel-section">
						<label className="obs-panel-label">Which specific moment are we looking at?</label>
						<p className="obs-panel-sublabel">Not the whole pattern — just one instance.</p>
						<textarea
							value={observation.moment || ""}
							onChange={(e) => update("moment", e.target.value)}
							rows={3}
							placeholder="e.g. Last Thursday afternoon."
						/>
						{/* <button onClick={() => setShowExample(!showExample)}>See example</button>

						{showExample && (
							<p className="example-text">
								“When you walked away while I was still talking, and didn’t respond to my question.”
							</p>
						)} */}
					</div>

					<div className="obs-panel-section">
						<label className="obs-panel-label">What happened — just this one moment?</label>
						<p className="obs-panel-sublabel">
							Try to describe just the words or actions, without guessing motives.
						</p>

						<textarea
							value={observation.actions || ""}
							onChange={(e) => update("actions", e.target.value)}
							rows={3}
							placeholder="e.g. When he didn’t reply to my text."
						/>
					</div>

					{/* <div className="obs-panel-section">
						<label className="obs-panel-label obs-panel-label-secondary">
							Imagine someone else had been in the room — what would they have seen or heard?
						</label>
						<textarea
							value={observation.camera || ""}
							onChange={(e) => update("camera", e.target.value)}
							rows={3}
						/>
					</div> */}
				</div>

				<div className="obs-panel-footer">
					<button className="obs-panel-done" onClick={handleDone}>
						Done
					</button>
				</div>
			</div>
		</div>
	);
};

// ── Check panel ────────────────────────────────────────────────────────────

const CheckPanel = ({ observation, setObservation, onClose }) => {
	const [responses, setResponses] = useState({});

	return (
		<div className="obs-panel-backdrop" onClick={onClose}>
			<div className="obs-panel obs-panel-wide" onClick={(e) => e.stopPropagation()}>
				<div className="obs-panel-header">
					<h3>Let's check the clarity</h3>
					<button className="obs-panel-close" onClick={onClose}>
						×
					</button>
				</div>

				<div className="obs-panel-body">
					<p>You don't have to change anything. Just notice whether any of these land.</p>

					<div className="obs-check-edit">
						<label className="obs-check-edit-label">Your observation</label>
						<textarea
							value={observation.refined || ""}
							onChange={(e) => setObservation((prev) => ({ ...prev, refined: e.target.value }))}
							rows={4}
						/>
					</div>

					<div className="obs-checks">
						{checks.map((check, i) => (
							<div className="obs-check" key={i}>
								<h4>
									<span className="obs-check-icon">{check.icon}</span>
									{check.heading}
								</h4>
								{check.description}
								<div className="obs-check-options">
									<label className={responses[i] === "yes" ? "selected" : ""}>
										<input
											type="radio"
											name={`check-${i}`}
											checked={responses[i] === "yes"}
											onChange={() => setResponses((prev) => ({ ...prev, [i]: "yes" }))}
										/>
										Yes
									</label>
									<label className={responses[i] === "no" ? "selected" : ""}>
										<input
											type="radio"
											name={`check-${i}`}
											checked={responses[i] === "no"}
											onChange={() => setResponses((prev) => ({ ...prev, [i]: "no" }))}
										/>
										No
									</label>
								</div>
								{responses[i] === "no" && <div className="obs-check-hint-box">{check.noHint}</div>}
							</div>
						))}
					</div>
				</div>

				<div className="obs-panel-footer">
					<button className="obs-panel-done" onClick={onClose}>
						Done
					</button>
				</div>
			</div>
		</div>
	);
};

// ── Main step component ────────────────────────────────────────────────────

const Observation = () => {
	const { observation, setObservation, jackalTalk, setJackalTalk } = useWizard();
	const [showBuildPanel, setShowBuildPanel] = useState(false);
	const [showCheckPanel, setShowCheckPanel] = useState(false);

	const hasContent = observation.refined?.trim();

	return (
		<div className="step-observation">
			<textarea
				className="obs-main-textarea"
				placeholder="What happened? Enter your observation."
				value={observation.refined || ""}
				onChange={(e) => setObservation((prev) => ({ ...prev, refined: e.target.value }))}
				rows={6}
			/>

			<div className="obs-action-row">
				<button className="obs-btn obs-btn-build" onClick={() => setShowBuildPanel(true)}>
					Help me build it
				</button>
				{hasContent && (
					<button className="obs-btn obs-btn-check" onClick={() => setShowCheckPanel(true)}>
						Check my observation
					</button>
				)}
			</div>

			{showBuildPanel && (
				<BuildPanel
					observation={observation}
					setObservation={setObservation}
					jackalTalk={jackalTalk}
					setJackalTalk={setJackalTalk}
					onClose={() => setShowBuildPanel(false)}
				/>
			)}

			{showCheckPanel && (
				<CheckPanel
					observation={observation}
					setObservation={setObservation}
					onClose={() => setShowCheckPanel(false)}
				/>
			)}
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

		<h4>Not sure where to start?</h4>
		<p>
			Use <em>Help me build it</em> to work through some guided questions. Your answers will be combined into the
			text box automatically.
		</p>

		<h4>Want to check what you wrote?</h4>
		<p>
			Once you've written something, <em>Check my observation</em> will walk you through four clarity tests — and
			offer guidance if anything needs adjusting.
		</p>
	</>
);

export default Observation;
