import React from "react";
import HelpLink from "./HelpLink";
import "./Introduction.css";

const introductionFeelingList = [
	"confused, frustrated, annoyed, judged, blamed",
	"not feeling heard or understood",
	"STUCK with no way to move forward",
	"like your self identity is being criticized",
];

const introductionFourSteps = [
	"what actually happened",
	"how it landed in you (your feelings)",
	"what mattered to you (your needs)",
	"what you'd like to do next",
];

const Introduction = () => {
	return (
		<div className="step-introduction step-container">
			<p>If you're feeling anything like this:</p>
			<ul>
				{introductionFeelingList.map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>
			<p>
				… this process is for you. It will help you find a way forward that works for you, and you'll feel much
				better in the process.
			</p>

			<p>
				<HelpLink topic="about">This process</HelpLink> helps you pause and get clear on four things:
			</p>
			<ol>
				{introductionFourSteps.map((step, i) => (
					<li key={i}>{step}</li>
				))}
			</ol>

			<p>
				When you do that, your brain is able to move out of <HelpLink topic="threat-mode">threat mode</HelpLink>
				, where it's not firing on all cylinders, and into the seeking and care circuits, which are much better
				at finding creative solutions, often ones that work for everyone involved.
			</p>
			<p>This makes a huge difference. Things shift.</p>
		</div>
	);
};

Introduction.title = "Feel better, understand what’s happening, and know what to do";
Introduction.titleSweary = "WTF just happened and how do I make it stop?!";
Introduction.navTitle = "Intro";

export default Introduction;
