import React from "react";
import { useWizard } from "../WizardContext";
import "./Onboarding.css";

const OnboardingHowTo = () => {
	const { settings, updateSettings, skipToMain, setStepIndex } = useWizard();

	return (
		<div className="step-onboarding step-container">
			<div className="onboarding-section">
				<p className="onboarding-lead">Here's a quick map of the app so nothing surprises you.</p>
			</div>

			<div className="howto-diagram-wrap">
				<div className="howto-card">
					<div className="howto-card-header">
						<span className="howto-card-title">What just happened?</span>
						<span className="howto-menu-icon">☰</span>
						<span className="howto-callout-badge" aria-hidden="true">1</span>
					</div>
					<div className="howto-card-body">
						<div className="howto-dummy-line howto-line--long" />
						<div className="howto-dummy-line howto-line--medium" />
						<div className="howto-dummy-line howto-line--short" />
					</div>
					<div className="howto-progress-row">
						<div className="howto-progress-track">
							<div className="howto-progress-fill" />
						</div>
						<span className="howto-callout-badge" aria-hidden="true">2</span>
					</div>
					<div className="howto-nav-row">
						<span className="howto-nav-btn">← Prev</span>
						<span className="howto-nav-btn">Next →</span>
						<span className="howto-callout-badge" aria-hidden="true">3</span>
					</div>
				</div>
			</div>

			<ol className="howto-legend">
				<li><strong>☰ Menu</strong> — access your summary, settings, and saved sessions</li>
				<li><strong>Progress bar</strong> — most steps are optional; skip what doesn't fit, come back anytime</li>
				<li><strong>Prev / Next</strong> — move between steps at your own pace</li>
			</ol>

			<p className="howto-note">
				💡 On the feelings and needs screens, <strong>double-click a word</strong> to open more detail.
			</p>

			<p className="howto-note">
				🔗 <strong>Underlined links</strong> throughout the app open help panels with more context — look out for them if something's unclear.
			</p>

			<div className="onboarding-footer onboarding-footer--howto">
				<label className="onboarding-dont-show">
					<input
						type="checkbox"
						checked={!!settings.seenOnboarding}
						onChange={(e) => {
						updateSettings({ seenOnboarding: e.target.checked });
						if (e.target.checked) setStepIndex(0);
					}}
					/>
					Don't show this intro next time
				</label>
				<button className="onboarding-skip-btn" onClick={skipToMain}>
					Get started →
				</button>
			</div>
		</div>
	);
};

OnboardingHowTo.title = "Finding your way around";
OnboardingHowTo.navTitle = "How it works";
OnboardingHowTo.helpContent = null;

export default OnboardingHowTo;
