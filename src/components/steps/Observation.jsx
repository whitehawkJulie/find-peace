import React from "react";
import { useWizard } from "../WizardContext";
import "./Observation.css";

// ── Main step component ────────────────────────────────────────────────────

const Observation = () => {
	const { jackalTalk, setJackalTalk } = useWizard();

	return (
		<div className="step-observation step-container">
			<div>
				<p>
					<strong>OPTIONAL: </strong>Before we try to make sense of it, feel free to just let it all out. This
					section isn't about being fair or accurate — just letting the first wave out, expressing your raw
					feelings and thoughts.
				</p>
				<p className="obs-panel-intro">
					{"If you said the uncensored version in one breath, what would it be?"}
				</p>
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

Observation.title = "What just happened?";
Observation.titleSweary = "What the hell just happened?";
Observation.navTitle = "What was the moment?";
export default Observation;
