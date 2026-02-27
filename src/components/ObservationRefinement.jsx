import React, { useState, useEffect } from "react";
import { useWizard } from "./WizardContext";
import "./ObservationRefinement.css";

const checks = [
	{
		icon: "\uD83D\uDD0E",
		heading: "Just what happened — not what it meant",
		description: (
			<>
				<p>
					Are we describing what was said or done? Or are we including interpretations like "disrespectful,"
					"uncaring," "manipulative"?
				</p>
				<p className="refinement-hint">If it helps, imagine a camera in the room. What would it capture?</p>
			</>
		),
		clear: "This is mostly concrete and observable",
		unclear: "I might be including interpretation",
	},
	{
		icon: "\uD83C\uDFA5",
		heading: "Something someone else could have seen or heard",
		description: (
			<p>Could another person in the room agree that this is what happened — even if they disagree about why?</p>
		),
		clear: "Yes, this feels observable",
		unclear: "Not quite — I may want to adjust it",
	},
	{
		icon: "\uD83E\uDDE0",
		heading: "No guesses about intention",
		description: (
			<p>
				Are we including assumptions about motive? (e.g., "to control me," "to hurt me," "because he doesn't
				care")
			</p>
		),
		clear: "I'm sticking to behaviour",
		unclear: "I may be including intention",
	},
	{
		icon: "\u23F3",
		heading: "One specific moment",
		description: <p>Are we describing one instance — not a pattern or the whole history?</p>,
		clear: "One clear moment",
		unclear: "It's blending multiple times together",
	},
];

const ObservationRefinement = () => {
	const { observation, setObservation } = useWizard();
	const [responses, setResponses] = useState({});

	// Build the combined text from the three observation fields
	const combinedObservation = [
		observation.moment,
		observation.actions,
		// observation.camera,
	]
		.filter((s) => s?.trim())
		.join("\n\n");

	// Seed the refined field if it's empty
	useEffect(() => {
		if (!observation.refined && combinedObservation) {
			setObservation((prev) => ({ ...prev, refined: combinedObservation }));
		}
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleCheck = (index, value) => {
		setResponses((prev) => ({ ...prev, [index]: value }));
	};

	return (
		<div className="step-refinement">
			<p>Before we move on, let's gently refine what you wrote.</p>
			<p>
				You don't have to change anything.
				<br />
				Just notice whether any of these land.
			</p>

			<div className="refinement-checks">
				{checks.map((check, i) => (
					<div className="refinement-check" key={i}>
						<h4>
							<span className="refinement-icon">{check.icon}</span>
							{check.heading}
						</h4>
						{check.description}
						<div className="refinement-options">
							<label className={responses[i] === "clear" ? "selected" : ""}>
								<input
									type="radio"
									name={`check-${i}`}
									checked={responses[i] === "clear"}
									onChange={() => handleCheck(i, "clear")}
								/>
								{check.clear}
							</label>
							<label className={responses[i] === "unclear" ? "selected" : ""}>
								<input
									type="radio"
									name={`check-${i}`}
									checked={responses[i] === "unclear"}
									onChange={() => handleCheck(i, "unclear")}
								/>
								{check.unclear}
							</label>
						</div>
					</div>
				))}
			</div>

			<div className="refinement-edit">
				<p>If anything shifted for you, feel free to edit your observation below.</p>
				<textarea
					value={observation.refined || ""}
					onChange={(e) => setObservation((prev) => ({ ...prev, refined: e.target.value }))}
					rows={5}
				/>
			</div>
		</div>
	);
};

ObservationRefinement.title = "Let\u2019s check the clarity of this moment";

ObservationRefinement.helpContent = (
	<>
		<p>
			This step isn't about getting it "right." It's about noticing whether your observation includes
			interpretation, motive-guessing, or pattern-stacking — and gently separating those out.
		</p>
		<p>
			A clear observation is one that another person could agree happened, even if they interpret it differently.
			It's the shared ground that makes the rest of the process possible.
		</p>
		<p>
			You don't have to change anything. But if something shifts as you reflect, you can edit your observation at
			the bottom of the page.
		</p>
	</>
);

export default ObservationRefinement;
