import React from "react";
import { useWizard } from "../WizardContext";
import HelpLink from "../HelpLink";
import "./ObservationJackal.css";

const ObservationClarify = () => {
	const { observation, setObservation } = useWizard();

	return (
		<div className="step-observation step-container">
			<p>
				Now, can you identify the specific moment when something in you reacted? (If it's about a lot of
				moments, just choose one.) That's what we're going to work with throughout this process.
			</p>
			<p>
				At these moments, our brains tend to go into <HelpLink topic="threat-mode">threat mode</HelpLink>, and
				try to figure out who to blame as fast as possible. The stories it comes up with usually feel 100% true
				(because certainty helps us feel safe), but they can be full of assumptions and interpretations.{" "}
				<strong>Separating what actually happened from our interpretation</strong> is the vital first step in
				this process - even if you're sure you don't need to do it.
			</p>

			<p>
				What did the other person actually say or do — just the facts, before any meanings or guesses about why.
				{"  "}
				<HelpLink topic="observation" aside>
					How do I do that? (Instructions)
				</HelpLink>
			</p>

			<textarea
				className="obs-main-textarea"
				data-field-id="observation-refined"
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

ObservationClarify.title = "Let's get clear";
ObservationClarify.navTitle = "Let's get clear";

export default ObservationClarify;
