import React from "react";
import { useWizard } from "../WizardContext";
import UnpackNeeds from "./UnpackNeeds";

const MeetMyNeeds = () => {
	const { visibleSteps, setStepIndex } = useWizard();

	const goTo = (TargetComponent) => {
		const idx = visibleSteps.findIndex((s) => s.component === TargetComponent);
		if (idx >= 0) setStepIndex(idx);
	};

	return (
		<div className="step-container">
			<p>This is where we explore finding strategies to meet our needs.</p>
			<p>People commonly get stuck here for two different reasons:</p>
			<ul>
				<li>
					They are stuck on ONE particular strategy, some internal demands about HOW that need MUST be met (eg
					my PARTNER must love me right NOW, my BOSS must understand me)
				</li>
				<li>It's a need that's never been predictably met for them, and they have no idea where to start.</li>
			</ul>
			<p>Work in progress - more coming soon.</p>
			<p>
				In the meantime, try going back to the Exploring Needs page, and drill down into each need that's
				important to you.
			</p>
			<button className="where-to-now-link" onClick={() => goTo(UnpackNeeds)}>
				Explore Needs →
			</button>
		</div>
	);
};

MeetMyNeeds.title = "Meet my needs";
MeetMyNeeds.navTitle = "Meet my needs";
MeetMyNeeds.helpContent = null;

export default MeetMyNeeds;
