import React from "react";
import HelpLink from "../HelpLink";
import { useWizard } from "../WizardContext";

import "./Introduction.css";

const introductionFourSteps = [
	"what actually happened",
	"how it landed in you (your feelings)",
	"and why - what mattered to you (your needs)",
	"what might have been happening for them",
	"how to resolve things and feel better",
];

const Introduction = () => {
	const { settings } = useWizard();
	return (
		<div className="step-introduction step-container">
			<h2 className="intro-tagline">
				{settings.tone === "sweary" ? Introduction.titleSweary : Introduction.title}
			</h2>
			{/* <p>
				If you’re here, something probably feels off — maybe confusing, frustrating, or just stuck.{" "}
				<HelpLink topic="not-ready" aside>
					Super distressed? Try this instead.
				</HelpLink>
			</p> */}

			<p>If you're thinking:</p>

			<ul>
				<li>This isn't fair! they need to change!</li>
				<li>I don't feel safe to share what's coming up in me, I'm walking on eggshells</li>
				<li>How could they do/say that?!</li>
				<li>I can’t make any sense of what’s happening, I'm trapped</li>
				<li>I'm not being heard or understood</li>
				<li>I'm stuck, with no clear way forward</li>
			</ul>

			<p>and feeling:</p>

			<ul>
				<li>frustrated or angry</li>
				<li>anxious, overwhelmed</li>
				<li>hurt, distressed</li>
				<li>confused, lost</li>
			</ul>

			<p>
				… this process is for you.{" "}
				<HelpLink topic="this-process" aside>
					More about this process
				</HelpLink>
			</p>
			<p>It helps you pause and get clear on:</p>
			<ul>
				{introductionFourSteps.map((step, i) => (
					<li key={i}>{step}</li>
				))}
			</ul>
		</div>
	);
};

Introduction.title = "Understand what’s happening, feel better, and know what to do";
// Introduction.title = "Make sense of what’s happening, feel relief, and find a way forward";

Introduction.titleSweary = "WTF just happened and how do I make it stop?!";
Introduction.navTitle = "Intro";

export default Introduction;
