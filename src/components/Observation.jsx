import React, { useState, useRef, useEffect } from "react";
import { useWizard } from "./WizardContext";
import { useContent } from "../content/useContent";
import { observationChecks, observationHelpContent } from "../content/observation.jsx";
import "./Observation.css";

// ── Check panel ────────────────────────────────────────────────────────────

const CheckPanel = ({ title }) => {
	const [expanded, setExpanded] = useState({});

	return (
		<div className="obs-check-inline">
			<div className="obs-check-header">
				<h3>{title}</h3>
			</div>

			<div className="obs-checks">
				{observationChecks.map((check, i) => (
					<div className="obs-check" key={i}>
						<h4>
							<span className="obs-check-icon">{check.icon}</span>
							{check.heading}
						</h4>

						<p>{check.description}</p>

						<button
							type="button"
							className="button-styled-as-link"
							aria-expanded={expanded[i]}
							onClick={() =>
								setExpanded((prev) => ({
									...prev,
									[i]: !prev[i],
								}))
							}>
							{expanded[i] ? "Hide example" : "Show example"}
						</button>

						{expanded[i] && <div className="obs-check-hint-box">{check.extraInfo}</div>}
					</div>
				))}
			</div>
		</div>
	);
};

// ── Main step component ────────────────────────────────────────────────────

const Observation = () => {
	const { observation, setObservation, jackalTalk, setJackalTalk } = useWizard();
	const { t } = useContent();
	const [showCheckPanel, setShowCheckPanel] = useState(false);
	const checkPanelRef = useRef(null);

	useEffect(() => {
		if (showCheckPanel) {
			checkPanelRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
		}
	}, [showCheckPanel]);

	return (
		<div className="step-observation step-container">
			<p>{t("observation.purpose")}</p>
			<p>{t("observation.intro")}</p>

			<div>
				<p>{t("observation.jackalSection.intro")}</p>
				<p className="obs-panel-intro">{t("observation.jackalSection.prompt")}</p>
				<textarea
					value={jackalTalk}
					onChange={(e) => setJackalTalk(e.target.value)}
					placeholder={t("observation.jackalSection.placeholder")}
					rows={6}
				/>
			</div>

			<p>Now, reading what you've just written, can you check for the following?</p>
			<CheckPanel title={t("observation.checkPanel.title")} />

			<p>{t("observation.refinedIntro")}</p>
			<textarea
				className="obs-main-textarea"
				value={observation.refined || ""}
				onChange={(e) =>
					setObservation((prev) => ({
						...prev,
						refined: e.target.value,
					}))
				}
				rows={6}
				placeholder={t("observation.refinedPlaceholder")}
			/>
		</div>
	);
};

Observation.titleKey = "observation.title";
Observation.title = "What was the moment that upset you?";
Observation.helpContent = observationHelpContent;

export default Observation;
