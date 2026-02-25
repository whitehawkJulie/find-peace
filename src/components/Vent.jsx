import React from "react";
import { useWizard } from "./WizardContext";
import "./Vent.css";

const Vent = () => {
	const { jackalTalk, setJackalTalk } = useWizard();

	return (
		<div className="step-vent">
			<p className="vent-intro">
				Something happened, and it mattered.
			</p>
			<p>
				Before we try to make sense of it, you're allowed to say it the raw way.
			</p>
			<p>
				This isn't about being fair.<br />
				It's not about being accurate.<br />
				It's just about letting the first wave out.
			</p>

			<p className="vent-prompt">
				If you said the uncensored version in one breath, what would it be?
			</p>

			<textarea
				id="jackalTalk"
				value={jackalTalk}
				onChange={(e) => setJackalTalk(e.target.value)}
				placeholder="They ALWAYS do this! I'm so over it..."
				rows={6}
			/>
		</div>
	);
};

Vent.title = "Before we slow this down\u2026";

Vent.helpContent = (
	<>
		<p>
			This is your space to let it out — raw, unfiltered, and uncensored. No one
			is going to read this but you.
		</p>
		<p>
			In NVC, Marshall Rosenberg called this "jackal talk" — the voice of
			judgment, blame, and frustration. It's not wrong to have it. It's just the
			first layer.
		</p>
		<p>
			Letting it out here means it doesn't have to leak into the rest of the
			process. Once the pressure is released, you'll find it easier to slow down
			and look at what's really going on underneath.
		</p>
	</>
);

export default Vent;
