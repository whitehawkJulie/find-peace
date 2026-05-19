import React from "react";
import { useWizard } from "../WizardContext";
import ImportanceBanner from "../ImportanceBanner";
import HelpLink from "../HelpLink";
import HowToPopup from "./HowToPopup";

import "./ObservationJackal.css";

// ── Main step component ────────────────────────────────────────────────────

const ObservationJackal = () => {
	const { jackalTalk, setJackalTalk } = useWizard();

	return (
		<div className="step-observation step-container">
			<ImportanceBanner message="Feel free to skim or skip — getting this out can help, but it's not essential." />
			<HowToPopup />
			<p className="onboarding-lead">
				Before you start, bring to mind a specific moment that's been bothering you. Something real and recent
				works best.{" "}
				<HelpLink topic="think-of-situation">Need help choosing something?</HelpLink>
			</p>
			<p>
				What's the situation you'd like to work with? Describe it in your own words, like you're telling a
				friend.
			</p>
			<p className="obs-textarea-label">{"The uncensored version:"}</p>
			<textarea
				data-field-id="jackal-talk"
				value={jackalTalk}
				onChange={(e) => setJackalTalk(e.target.value)}
				placeholder="How could they DO that?! That's not fair! They shouldn't be like that!"
				rows={3}
			/>
			<HelpLink topic="privacy" aside>
				Your data always stays private...
			</HelpLink>
		</div>
	);
};

ObservationJackal.title = "What just happened?";
ObservationJackal.titleSweary = "What the hell just happened?";
ObservationJackal.navTitle = "What was the moment?";
export default ObservationJackal;
