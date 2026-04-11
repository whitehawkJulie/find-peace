import React from "react";
import { useWizard } from "../WizardContext";
import ImportanceBanner from "../ImportanceBanner";
import "./ObservationJackal.css";

// ── Main step component ────────────────────────────────────────────────────

const ObservationJackal = () => {
	const { jackalTalk, setJackalTalk } = useWizard();

	return (
		<div className="step-observation step-container">
			<ImportanceBanner message="Feel free to skim or skip — getting this out can help, but it's not essential." />
			<div>
				<p>
					Before we try to make sense of it, feel free to just let it all out. This section isn't about being
					fair or accurate — just letting the first wave out, expressing your raw feelings and thoughts.
				</p>
				<p className="obs-textarea-label">{"The uncensored version:"}</p>
				<textarea
					data-field-id="jackal-talk"
					value={jackalTalk}
					onChange={(e) => setJackalTalk(e.target.value)}
					placeholder="They ALWAYS do this! I'm so over it..."
					rows={3}
				/>
			</div>
		</div>
	);
};

ObservationJackal.title = "What just happened?";
ObservationJackal.titleSweary = "What the hell just happened?";
ObservationJackal.navTitle = "What was the moment?";
export default ObservationJackal;
