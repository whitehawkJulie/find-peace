import React, { useState, useRef, useEffect } from "react";
import { useWizard } from "./WizardContext";
import HelpLink from "../components/HelpLink";
import "./Observation.css";

// ── Main step component ────────────────────────────────────────────────────

const Observation = () => {
	const { observation, setObservation, jackalTalk, setJackalTalk } = useWizard();

	return (
		<div className="step-observation step-container">
			<p>
				Here we're separating what happened from the story, so that we can start to move out of reaction and
				into clearer understanding.
			</p>
			<p>
				Let's slow down and look at the specific moment itself — just what someone could have seen or heard,
				before any interpretations, or assumptions about motives.
			</p>

			<div>
				<p>
					Before we try to make sense of it, say it the raw way. This isn't about being fair or accurate —
					just letting the first wave out.
				</p>
				<p className="obs-panel-intro">
					{"If you said the uncensored version in one breath, what would it be?"}
				</p>
				<textarea
					value={jackalTalk}
					onChange={(e) => setJackalTalk(e.target.value)}
					placeholder="They ALWAYS do this! I'm so over it..."
					rows={3}
				/>
			</div>

			<h3>Let's clarify...</h3>
			<p>
				In one specific moment, what did they say or do — without labels (like “rude”) or guesses about why?{" "}
				<HelpLink topic="observation" aside>
					How to make a clear observation
				</HelpLink>
			</p>

			<textarea
				className="obs-main-textarea"
				value={observation.refined || ""}
				onChange={(e) =>
					setObservation((prev) => ({
						...prev,
						refined: e.target.value,
					}))
				}
				rows={4}
				placeholder={
					"Example:\nYesterday evening,\nwhile I was telling you about my day,\nyou looked at your phone and didn't respond."
				}
			/>
		</div>
	);
};

Observation.title = "What just happened?";
Observation.titleSweary = "What the hell just happened?";
Observation.navTitle = "What was the moment?";
export default Observation;
