import React from "react";
import HelpLink from "./HelpLink";
import { useWizard } from "./WizardContext";

import "./Introduction.css";

const introductionFourSteps = [
	"what actually happened",
	"how it landed in you (your feelings)",
	"and why - what mattered to you (your needs)",
	"what might have been happening for them",
	"what you'd like to do next",
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
			<p>If you're feeling:</p>

			<ul>
				<li>frustrated or angry — like something isn’t right or needs to change</li>
				<li>anxious or on edge — like something doesn’t feel safe or certain</li>
				<li>hurt or heavy — like something important hasn’t been met</li>
				<li>confused or overwhelmed — like you can’t quite make sense of what’s happening</li>
			</ul>

			<p>or thinking:</p>

			<ul>
				<li>you're not being heard or understood</li>
				<li>you're stuck, with no clear way forward</li>
			</ul>

			<p>
				… <HelpLink topic="this-process">this process</HelpLink> is for you.
			</p>
			<p>It helps you pause and get clear on:</p>
			<ul>
				{introductionFourSteps.map((step, i) => (
					<li key={i}>{step}</li>
				))}
			</ul>
			<p>
				When things feel intense, your brain goes into <HelpLink topic="threat-mode">threat mode</HelpLink> —
				fast, certain, reactive.
			</p>
			<p>
				This process helps you shift out of that, so you can think more clearly and find options that actually
				work.
			</p>
			<p>Things can feel different, quite quickly.</p>
		</div>
	);
};

// Introduction.title = "Feel better, understand what’s happening, and know what to do";
Introduction.title = "Make sense of what’s happening, feel relief, and find a way forward";

Introduction.titleSweary = "WTF just happened and how do I make it stop?!";
Introduction.navTitle = "Intro";

export default Introduction;
