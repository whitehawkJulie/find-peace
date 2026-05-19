import React from "react";
import { useWizard } from "../WizardContext";
import "./WhereToNow.css";
import Requests from "./Requests";
import Collaborate from "./Collaborate";
import Review from "./Review";

const OPTIONS = [
	{
		id: "complete",
		target: Review,
		label: "You feel complete",
		description: "placeholder text",
	},
	{
		id: "request",
		target: Requests,
		label: "You would like to make a simple request of the other person",
		description: "placeholder text",
	},
	{
		id: "collaborate",
		target: Collaborate,
		label: "This might need a longer conversation with the other person, to co-create a solution",
		description: "placeholder text",
	},
];

const WhereToNow = () => {
	const { visibleSteps, setStepIndex } = useWizard();

	const goTo = (TargetComponent) => {
		const idx = visibleSteps.findIndex((s) => s.component === TargetComponent);
		if (idx >= 0) setStepIndex(idx);
	};

	return (
		<div className="step-container">
			{OPTIONS.map(({ id, target, label, description }) => (
				<button key={id} className="where-to-now-option" onClick={() => goTo(target)}>
					<span className="where-to-now-label">{label}</span>
					<span className="where-to-now-desc">{description}</span>
				</button>
			))}
		</div>
	);
};

WhereToNow.title = "Where to now?";
WhereToNow.navTitle = "Where to now?";
WhereToNow.helpContent = null;

export default WhereToNow;
