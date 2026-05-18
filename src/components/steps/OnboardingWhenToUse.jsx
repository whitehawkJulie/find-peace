import React from "react";
import HelpLink from "../HelpLink";
import { useWizard } from "../WizardContext";
import "./Onboarding.css";

const OnboardingWhenToUse = () => {
	const { skipToMain } = useWizard();

	return (
		<div className="step-onboarding step-container">
			<div className="onboarding-section">
				<p className="onboarding-lead">
					Before you start, bring to mind a specific moment that's been bothering you. Something real and
					recent works best.
				</p>
				<p className="onboarding-prompt-label">You might be thinking of:</p>
				<ul className="onboarding-examples">
					<li>A conversation you keep replaying in your head</li>
					<li>A moment you felt annoyed, hurt, tense, or disappointed</li>
					<li>Something someone said or did that still has a charge</li>
					<li>A time you felt unseen, dismissed, or misunderstood</li>
					<li>A moment you shut down, got defensive, or thought "that's not fair"</li>
				</ul>
				<p className="onboarding-tip">
					Start with something that matters, but isn't the hardest thing in your life.{" "}
					<HelpLink topic="think-of-situation">More ideas →</HelpLink>
				</p>
			</div>

			<div className="onboarding-footer">
				<button className="onboarding-skip-btn" onClick={skipToMain}>
					Skip intro →
				</button>
			</div>
		</div>
	);
};

OnboardingWhenToUse.title = "Think of a situation";
OnboardingWhenToUse.navTitle = "Pick a moment";
OnboardingWhenToUse.helpContent = null;

export default OnboardingWhenToUse;
