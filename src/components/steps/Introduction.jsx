import React from "react";
// import HelpLink from "../HelpLink";

import "./Introduction.css";

const introductionOutcomes = [
	"what actually happened",
	"how it landed in you (your feelings)",
	"and why — what mattered to you (your needs)",
	"what might have been happening for them",
	"how to resolve things and feel better",
];

const Introduction = () => {
	return (
		<div className="step-introduction step-container">
			{/* Person + thought bubbles scene */}
			<div className="intro-scene">
				<div className="intro-person-col" aria-hidden="true">
					<img src="./head-and-shoulders.png" alt="" className="intro-person-img" />
				</div>

				<div className="intro-bubbles-col">
					{/* Thinking bubble — aligns with head */}
					<div className="intro-bubble-row">
						<div className="intro-dot-chain">
							<span />
							<span />
							<span />
						</div>
						<div className="intro-thought-bubble">
							<ul>
								<li>This isn't fair! They need to change!</li>
								<li>How could they do/say that?!</li>
								<li>I'm not being heard or understood</li>
							</ul>
						</div>
					</div>

					{/* Feeling bubble — aligns with heart */}
					<div className="intro-bubble-row">
						<div className="intro-dot-chain intro-dot-chain--warm">
							<span />
							<span />
							<span />
						</div>
						<div className="intro-thought-bubble intro-thought-bubble--feelings">
							<ul>
								<li>frustrated, angry, overwhelmed</li>
								<li>hurt, confused, lost</li>
							</ul>
						</div>
					</div>
				</div>
			</div>

			{/* <div className="intro-punchline">... this process is for you.</div> */}

			<div className="process-preview">
				<p className="process-intro">
					It can feel helpless or hopeless right now. That's OK... we'll take this step by step, and see what
					starts to untangle.
				</p>
				<p className="process-intro">Here’s a quick preview of the steps we’ll go through.</p>

				<ul className="process-steps">
					<li>
						<span className="icon">👁</span>
						<div>
							<strong>What happened</strong>
							<div className="sub">just the facts</div>
						</div>
					</li>

					<li>
						<span className="icon">💧</span>
						<div>
							<strong>What you felt</strong>
							<div className="sub">how it landed in you</div>
						</div>
					</li>

					<li>
						<span className="icon">❤️</span>
						<div>
							<strong>What mattered</strong>
							<div className="sub">your needs</div>
						</div>
					</li>

					<li>
						<span className="icon">🔍</span>
						<div>
							<strong>What may be going on for them</strong>
							<div className="sub">widen the picture</div>
						</div>
					</li>

					<li>
						<span className="icon">🌱</span>
						<div>
							<strong>What to do next</strong>
							<div className="sub">find a way forward</div>
						</div>
					</li>
				</ul>
			</div>

			{/* <div className="intro-outcomes-section">
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
			</div> */}
		</div>
	);
};

Introduction.title = "Understand what's happening, feel better, and know what to do";
Introduction.titleSweary = "WTF just happened and how do I make it stop?!";
Introduction.navTitle = "Intro";

export default Introduction;
