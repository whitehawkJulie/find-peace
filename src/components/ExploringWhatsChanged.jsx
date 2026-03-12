import React from "react";
import { useWizard } from "./WizardContext";
import "./RequestFormulation.css";

const ExploringWhatsChanged = () => {
	const { whatsChangedResponses, setWhatsChangedResponses } = useWizard();

	const handleChange = (key, value) => {
		setWhatsChangedResponses((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className="request-formulation">
			<div className="request-section">
				<h3>How might you have handled this situation before this process?</h3>
				<textarea
					className="request-textarea"
					value={whatsChangedResponses.before || ""}
					onChange={(e) => handleChange("before", e.target.value)}
					rows={4}
				/>
			</div>

			<div className="request-section">
				<h3>What might you do differently now?</h3>
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

ExploringWhatsChanged.title = "Exploring what's changed";
ExploringWhatsChanged.helpContent = (
	<>
		<p>Help content coming soon.</p>
	</>
);

export default ExploringWhatsChanged;
