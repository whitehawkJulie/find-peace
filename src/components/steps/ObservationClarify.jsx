import React from "react";
import { useWizard } from "../WizardContext";
import HelpLink from "../HelpLink";
import "./Observation.css";

const ObservationClarify = () => {
	const { observation, setObservation } = useWizard();

	return (
		<div className="step-observation step-container">
			<p>
				When things feel intense, human brains go into <HelpLink topic="threat-mode">threat mode</HelpLink> —
				fast, certain, reactive, and creates a story that feels 100% true, but contains assumptions and a lot of
				blame. This can lead to words and actions that aren't as helpful as they seem at the time.
			</p>
			<p>
				Here we're separating what happened from the story, so that we can start to move out of that reaction
				and into clearer understanding.
			</p>

			<p>Let’s slow this down and look at the specific moment when this started to feel upsetting.</p>

			<p>
				What did they actually say or do? See if you can describe just what happened — before adding meanings
				like “rude,” or guessing why they did it.{"  "}
				<HelpLink topic="observation" aside>
					How do I do that?
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
ObservationClarify.helpContent = null;

export default ObservationClarify;
