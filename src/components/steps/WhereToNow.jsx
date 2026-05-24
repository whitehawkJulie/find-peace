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

// Populated on first render rather than at module scope to avoid circular-dep
// TDZ (step components → ReflectBox → WizardContext → WhereToNow → step components).
let _navRegistered = false;

const WhereToNow = () => {
	if (!_navRegistered) {
		_navRegistered = true;
		[Reflect, Requests, Collaborate, MeetMyNeeds, Stuck].forEach((C) => {
			stepNavOverrides.set(C, { prevStep: WhereToNow, nextStep: Review });
		});
	}

	const { visibleSteps, setStepIndex } = useWizard();

	const goTo = (TargetComponent) => {
		const idx = visibleSteps.findIndex((s) => s.component === TargetComponent);
		if (idx >= 0) setStepIndex(idx);
	};

	const options = [
		{
			id: "complete",
			heading: "I feel complete",
			links: [
				{
					text: "I’d like to reflect on all this",
					target: Reflect,
					description:
						"Many people find that simply doing this process changes things internally, without needing to address anything about the original situation.",
				},
				{ text: "I’m done!", target: Review },
			],
		},
		{
			id: "other-person",
			heading: "I still want something to change with the other person",
			links: [
				{
					text: "Make a simple request",
					target: Requests,
					description:
						"Sometimes a simple request is enough — especially when the issue is practical, low-stakes, or unlikely to affect the other person’s needs very much.",
				},
				{
					text: "Collaborate on a solution together",
					target: Collaborate,
					description:
						"But when something matters deeply to both people, real resolution usually comes through a deeper conversation where both people’s needs are understood and worked with together.",
				},
			],
		},
		{
			id: "unmet-needs",
			heading: "I’ve discovered I have unmet needs that I need to address in my life in general",
			links: [
				{
					text: "Find ways to meet my needs",
					target: MeetMyNeeds,
					description:
						"Sometimes the process helps us uncover needs that we’d like to address in our life in general, but we’re not sure where to start.",
				},
			],
		},
		{
			id: "still-unresolved",
			heading: "Something still feels unresolved",
			intro: (
				<>
					<p>Sometimes this process brings relief or clarity.</p>
					<p>Other times, you may still feel:</p>
					<ul>
						<li>activated</li>
						<li>protective</li>
						<li>certain</li>
						<li>angry</li>
						<li>unconvinced</li>
						<li>hurt</li>
						<li>not ready to let go</li>
						<li>focused on the other person changing</li>
					</ul>
					<p>That does not mean you did anything wrong.</p>
					<p>
						It may simply mean there is still something important your system is trying to protect,
						understand, or hold onto.
					</p>
				</>
			),
			links: [
				{ text: "Explore what still feels unresolved", target: Stuck },
				{ text: "Start again", target: OnboardingWelcome },
			],
		},
	];

	return (
		<div className="step-container">
			<p>
				You've now finished the "unpacking feelings and needs" part of the process, for both you and the other
				person. Sometimes that's enough to bring a sense of peace and clarity, and other times it just brings up
				more questions. There are a few common next steps, depending on how you're feeling and what you want to
				do.
			</p>
			{options.map(({ id, heading, intro, links }) => (
				<div key={id} className="where-to-now-option guesses-section">
					<h3 className="where-to-now-heading">{heading}</h3>
					{intro && <div className="where-to-now-desc">{intro}</div>}
					<div className="where-to-now-links">
						{links.map(({ text, target, description }) => (
							<div key={text} className="where-to-now-link-item">
								{description && <p className="where-to-now-link-desc">{description}</p>}
								<button className="where-to-now-link" onClick={() => goTo(target)}>
									{text} →
								</button>
							</div>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

WhereToNow.title = "Where to now?";
WhereToNow.navTitle = "Where to now?";
WhereToNow.helpContent = null;

export default WhereToNow;
