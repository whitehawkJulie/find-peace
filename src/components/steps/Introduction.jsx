import React from "react";
import HelpLink from "../HelpLink";
import { useWizard } from "../WizardContext";

import "./Introduction.css";

const introductionOutcomes = [
	"what actually happened",
	"how it landed in you (your feelings)",
	"and why — what mattered to you (your needs)",
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

			<div className="intro-thought-bubble">
				<p className="intro-bubble-label">Recognise any of this?</p>

				<p className="intro-bubble-sub">You might be thinking…</p>
				<ul>
					<li>This isn't fair! They need to change!</li>
					<li>I don't feel safe to share what's coming up in me, I'm walking on eggshells</li>
					<li>How could they do/say that?!</li>
					<li>I can't make any sense of what's happening, I'm trapped</li>
					<li>I'm not being heard or understood</li>
					<li>I'm stuck, with no clear way forward</li>
				</ul>

				<p className="intro-bubble-sub">…and feeling…</p>
				<ul>
					<li>frustrated or angry</li>
					<li>anxious, overwhelmed</li>
					<li>hurt, distressed</li>
					<li>confused, lost</li>
				</ul>
			</div>

			<div className="intro-punchline">Yes? Then this process is for you.</div>

			<div className="intro-outcomes-section">
				<p className="intro-outcomes-label">It helps you pause and get clear on:</p>
				<ol className="intro-outcomes">
					{introductionOutcomes.map((step, i) => (
						<li key={i}>
							<span className="intro-outcome-num">{i + 1}</span>
							<span>{step}</span>
						</li>
					))}
				</ol>
				<p className="intro-more-link">
					<HelpLink topic="this-process" aside>
						More about this process
					</HelpLink>
				</p>
			</div>
		</div>
	);
};

Introduction.title = "Understand what's happening, feel better, and know what to do";
Introduction.titleSweary = "WTF just happened and how do I make it stop?!";
Introduction.navTitle = "Intro";

export default Introduction;
