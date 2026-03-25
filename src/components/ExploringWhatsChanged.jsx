import React from "react";
import { useWizard } from "./WizardContext";
import { useContent } from "../content/useContent";
import "./RequestFormulation.css";

const ExploringWhatsChanged = () => {
	const { whatsChangedResponses, setWhatsChangedResponses } = useWizard();
	const { t } = useContent();

	const handleChange = (key, value) => {
		setWhatsChangedResponses((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className="step-whats-changed step-container">
			<p>{t("exploringWhatsChanged.purpose")}</p>

			<p>{t("exploringWhatsChanged.intro1")}</p>
			<p>{t("exploringWhatsChanged.intro2")}</p>
			<div className="request-section">
				<p>{t("exploringWhatsChanged.beforePrompt")}</p>
				<textarea
					className="request-textarea"
					value={whatsChangedResponses.before || ""}
					onChange={(e) => handleChange("before", e.target.value)}
					rows={4}
				/>
			</div>

			<div className="request-section">
				<p>{t("exploringWhatsChanged.differentlyPrompt")}</p>
				<textarea
					className="request-textarea"
					value={whatsChangedResponses.differently || ""}
					onChange={(e) => handleChange("differently", e.target.value)}
					rows={4}
				/>
			</div>
		</div>
	);
};

ExploringWhatsChanged.titleKey = "exploringWhatsChanged.title";
ExploringWhatsChanged.title = "Notice what's changed"; // polite fallback
ExploringWhatsChanged.helpContent = null;

export default ExploringWhatsChanged;
