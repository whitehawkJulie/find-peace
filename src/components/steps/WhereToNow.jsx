import React from "react";
import { useWizard } from "../WizardContext";
import "./WhereToNow.css";
import Reflect from "./Reflect";
import Requests from "./Requests";
import Collaborate from "./Collaborate";
import MeetMyNeeds from "./MeetMyNeeds";
import Review from "./Review";
import stepNavOverrides from "./stepNavOverrides";

const OPTIONS = [
	{
		id: "complete",
		heading: "I feel complete",
		description: "placeholder text",
		links: [
			{ text: "I'd like to reflect on all this", target: Reflect },
			{ text: "I'm done!", target: Review },
		],
	},
	{
		id: "other-person",
		heading: "I need something from the other person still",
		description: "placeholder text",
		links: [
			{ text: "I want to make a simple request", target: Requests },
			{ text: "We probably need to collaborate on a solution", target: Collaborate },
		],
	},
	{
		id: "unmet-needs",
		heading: "I've discovered I have unmet needs that I need to address in my life in general",
		description: "placeholder text",
		links: [
			{ text: "Go to Meet my needs", target: MeetMyNeeds },
		],
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
			{OPTIONS.map(({ id, heading, description, links }) => (
				<div key={id} className="where-to-now-option">
					<h3 className="where-to-now-heading">{heading}</h3>
					<p className="where-to-now-desc">{description}</p>
					{links.map(({ text, target }) => (
						<button key={text} className="where-to-now-link" onClick={() => goTo(target)}>
							{text} →
						</button>
					))}
				</div>
			))}
		</div>
	);
};

WhereToNow.title = "Where to now?";
WhereToNow.navTitle = "Where to now?";
WhereToNow.helpContent = null;

// Register branch-page nav overrides here, after WhereToNow is defined
[Reflect, Requests, Collaborate, MeetMyNeeds].forEach((C) => {
	stepNavOverrides.set(C, { prevStep: WhereToNow, nextStep: Review });
});

export default WhereToNow;
