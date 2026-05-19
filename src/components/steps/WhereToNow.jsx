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
		heading: "You feel complete",
		description: "placeholder text",
		linkText: "Go to final review page",
	},
	{
		id: "request",
		target: Requests,
		heading: "You would like to make a simple request of the other person",
		description: "placeholder text",
		linkText: "Go to Requests page",
	},
	{
		id: "collaborate",
		target: Collaborate,
		heading: "This might need a longer conversation with the other person, to co-create a solution",
		description: "placeholder text",
		linkText: "Go to Collaboration page",
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
			{OPTIONS.map(({ id, target, heading, description, linkText }) => (
				<div key={id} className="where-to-now-option">
					<h3 className="where-to-now-heading">{heading}</h3>
					<p className="where-to-now-desc">{description}</p>
					<button className="where-to-now-link" onClick={() => goTo(target)}>
						{linkText} →
					</button>
				</div>
			))}
		</div>
	);
};

WhereToNow.title = "Where to now?";
WhereToNow.navTitle = "Where to now?";
WhereToNow.helpContent = null;

export default WhereToNow;
