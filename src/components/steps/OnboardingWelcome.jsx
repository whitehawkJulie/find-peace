import React from "react";
import HelpLink from "../HelpLink";
import { useWizard } from "../WizardContext";
import "./Introduction.css";
import "./Onboarding.css";

const STEP_LINKS = [
	{ icon: "👁", label: "What happened", sub: "just the facts", navTitle: "Let's get clear" },
	{ icon: "💧", label: "What you felt", sub: "how it landed in you", navTitle: "What am I feeling?" },
	{ icon: "❤️", label: "What mattered", sub: "your needs", navTitle: "What matters to me?" },
	{ icon: "🔍", label: "What may be going on for them", sub: "widen the picture", navTitle: "Their View" },
	{ icon: "🌱", label: "What to do next", sub: "find a way forward", navTitle: "What next?" },
];

const OnboardingWelcome = () => {
	const { visibleSteps, setStepIndex, skipToMain } = useWizard();

	const navigateTo = (navTitle) => {
		const idx = visibleSteps.findIndex((s) => s.component?.navTitle === navTitle);
		if (idx !== -1) setStepIndex(idx);
	};

	return (
		<div className="step-onboarding step-container">
			<div className="intro-scene">
				<div className="intro-person-col" aria-hidden="true">
					<img src="./head-and-shoulders.png" alt="" className="intro-person-img" />
				</div>
				<div className="intro-bubbles-col">
					<div className="intro-bubble-row">
						<div className="intro-dot-chain">
							<span /><span /><span />
						</div>
						<div className="intro-thought-bubble">
							<ul>
								<li>That's not fair!</li>
								<li>How could they do/say that?!</li>
								<li>They're not hearing me!</li>
							</ul>
						</div>
					</div>
					<div className="intro-bubble-row">
						<div className="intro-dot-chain intro-dot-chain--warm">
							<span /><span /><span />
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

			<div className="process-preview">
				<p className="process-intro">
					When <HelpLink topic="think-of-situation">something difficult happens</HelpLink>, we can get
					stuck spinning in our heads — reacting, not knowing what to do. This app helps you slow down
					and untangle it, step by step.
				</p>
				<p className="process-intro">Here's what we'll go through together:</p>

				<ul className="process-steps">
					{STEP_LINKS.map(({ icon, label, sub, navTitle }) => (
						<li key={label}>
							<button
								className="intro-step-link"
								onClick={() => navigateTo(navTitle)}
								aria-label={`Go to ${label}`}>
								<span className="icon">{icon}</span>
								<div>
									<strong>{label}</strong>
									<div className="sub">{sub}</div>
								</div>
							</button>
						</li>
					))}
				</ul>
				<div>
					<p className="intro-more-link">
						<HelpLink topic="this-process" aside>More about this process</HelpLink>
					</p>
				</div>
			</div>

			<div className="onboarding-footer">
				<button className="onboarding-skip-btn" onClick={skipToMain}>
					Skip intro →
				</button>
			</div>
		</div>
	);
};

OnboardingWelcome.title = "Understand what's happening, feel better, and know what to do";
OnboardingWelcome.titleSweary = "WTF just happened and how do I make it stop?!";
OnboardingWelcome.navTitle = "Intro";
OnboardingWelcome.helpContent = null;

export default OnboardingWelcome;
