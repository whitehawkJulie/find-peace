import React from "react";
import { useWizard } from "./WizardContext";
import "./RequestFormulation.css";

const ExploringWhatsChanged = () => {
	const { whatsChangedResponses, setWhatsChangedResponses } = useWizard();

	const handleChange = (key, value) => {
		setWhatsChangedResponses((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className="step-whats-changed step-container">
			<p>Let's take a moment to see what's changed inside you.</p>
			<p>
				This page isn't about finding solutions we plan to use, yet - it's just about noticing the shift, if
				any.
			</p>
			<div className="request-section">
				<p>
					How might you have handled this situation before doing this process? If you approached the person
					from the place you were in at the beginning… what would likely happen?
				</p>
				<textarea
					className="request-textarea"
					value={whatsChangedResponses.before || ""}
					onChange={(e) => handleChange("before", e.target.value)}
					rows={4}
				/>
			</div>

			<div className="request-section">
				<p>
					What might you want to do differently now? If you approached from where you are now… what might be
					different? What's changed?
				</p>
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
ExploringWhatsChanged.helpContent = null;

export default ExploringWhatsChanged;
