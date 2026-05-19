import React from "react";
import { useWizard } from "../WizardContext";
import HelpLink from "../HelpLink";
import "./ObservationJackal.css";

const ObservationClarify = () => {
	const { observation, setObservation } = useWizard();

	return (
		<div className="step-observation step-container">
			<p>Let’s slow things down and focus on one specific moment when something in you reacted.</p>
			<p>If this is about a pattern or lots of moments, just choose one example for now.</p>
			<p>
				What did the other person actually say or do — just the{" "}
				<HelpLink topic="observation">observable facts</HelpLink>, before any meanings, interpretations, or
				guesses about why?
			</p>
			<p>
				When we’re upset, our brains quickly move into <HelpLink topic="threat-mode">threat mode</HelpLink> and
				start trying to explain what’s happening. Those explanations can feel completely true, but they often
				include assumptions or interpretations.
			</p>
			<p>Separating what actually happened from the story about it helps bring more clarity and choice.</p>

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
