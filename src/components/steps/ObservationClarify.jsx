import React from "react";
import { useWizard } from "../WizardContext";
import HelpLink from "../HelpLink";
import "./ObservationJackal.css";

const ObservationClarify = () => {
	const { observation, setObservation } = useWizard();

	return (
		<div className="step-observation step-container">
			<p>
				When things feel intense, our brains go into <HelpLink topic="threat-mode">threat mode</HelpLink> — and
				the story we tell ourselves can feel 100% true, even though it might be full of assumptions. Separating
				what actually happened from our interpretation is the vital first step in this process - even if you're
				sure you don't need to do it.
			</p>

			<p>
				What did they actually say or do — just the facts, before any meanings or guesses about why.{"  "}
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
