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
			<p>More coming soon!</p>
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
