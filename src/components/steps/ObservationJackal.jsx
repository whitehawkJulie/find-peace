import React from "react";
import { useWizard } from "../WizardContext";
import HelpLink from "../HelpLink";

import "./ObservationJackal.css";

// ── Main step component ────────────────────────────────────────────────────

const ObservationJackal = () => {
	const { jackalTalk, setJackalTalk } = useWizard();

	return (
		<div className="step-observation step-container">
<p>
				Are you trying to <HelpLink topic="think-of-situation">think of a situation you can use</HelpLink> with
				this tool? You don’t need a huge conflict. Small, everyday moments often work best.
			</p>
			<p>
				Before we try to make sense of it, feel free to just let it all out. This section isn't about being fair
				or accurate — just letting the first wave out, expressing your raw feelings and thoughts.
			</p>
			<p className="obs-textarea-label">{"The uncensored version:"}</p>
			<textarea
				data-field-id="jackal-talk"
				value={jackalTalk}
				onChange={(e) => setJackalTalk(e.target.value)}
				placeholder="How could they DO that?! That's not fair! They shouldn't be like that!"
				rows={3}
			/>
			<HelpLink topic="privacy" aside>
				Your data always stays private...
			</HelpLink>
		</div>
	);
};

ObservationJackal.title = "What just happened?";
ObservationJackal.titleSweary = "What the hell just happened?";
ObservationJackal.navTitle = "What was the moment?";
export default ObservationJackal;
