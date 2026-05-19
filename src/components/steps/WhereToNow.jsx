import React from "react";
import { useWizard } from "../WizardContext";
import "./WhereToNow.css";
import Reflect from "./Reflect";
import Requests from "./Requests";
import Collaborate from "./Collaborate";
import MeetMyNeeds from "./MeetMyNeeds";
import Stuck from "./Stuck";
import OnboardingWelcome from "./OnboardingWelcome";
import Review from "./Review";
import stepNavOverrides from "./stepNavOverrides";

const OPTIONS = [
	{
		id: "complete",
		heading: "I feel complete",
		description:
			"Many people find that simply doing this process changes things internally, without needing to address anything about the original situation.",
		links: [
			{ text: "I'd like to reflect on all this", target: Reflect },
			{ text: "I'm done!", target: Review },
		],
	},
	{
		id: "unmet-needs",
		heading: "I've discovered I have unmet needs that I need to address in my life in general",
		description:
			"Sometimes the process helps us uncover needs that we'd like to address in our life in general, but we're not sure where to start.",
		links: [{ text: "Go to Meet my needs", target: MeetMyNeeds }],
	},
	{
		id: "other-person",
		heading: "I want something to change with the other person",
		description:
			"Sometimes we need to figure out how to move forward with the other person, and find a better way to interact.",
		links: [
			{ text: "I want to ask for something specific from them", target: Requests },
			{ text: "We probably need to collaborate on a solution", target: Collaborate },
		],
	},
	{
		id: "dont-know",
		heading: "I don't know!",
		description:
			"Sometimes doing this process doesn't bring the clarity we'd have liked. If it's brought up frustation, it might be that you've uncovered needs that you don't know how to meet. Alternately, you might like to go through the process again, to see if it brings more clarity the second time around.",
		links: [
			{ text: "Consider my needs", target: MeetMyNeeds },
			{ text: "Where did I get stuck?", target: Stuck },
			{ text: "Start again", target: OnboardingWelcome },
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
			<p>
				Now that you've been through the process, you might be wondering where to go from here. There are a few
				common next steps, depending on how you're feeling and what you want to do.
			</p>
			{OPTIONS.map(({ id, heading, description, links }) => (
				<div key={id} className="where-to-now-option">
					<h3 className="where-to-now-heading">{heading}</h3>
					<p className="where-to-now-desc">{description}</p>
					{links.map(({ text, target }) => (
						<>
							<button key={text} className="where-to-now-link" onClick={() => goTo(target)}>
								{text} →
							</button>
							<br />
						</>
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
[Reflect, Requests, Collaborate, MeetMyNeeds, Stuck].forEach((C) => {
	stepNavOverrides.set(C, { prevStep: WhereToNow, nextStep: Review });
});

export default WhereToNow;
