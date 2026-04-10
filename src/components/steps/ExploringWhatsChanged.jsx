import React from "react";
import { useWizard } from "../WizardContext";
import OptionalBanner from "../OptionalBanner";
import "./RequestFormulation.css";

const ExploringWhatsChanged = () => {
	const { whatsChangedResponses, setWhatsChangedResponses } = useWizard();

	const handleChange = (key, value) => {
		setWhatsChangedResponses((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className="step-whats-changed step-container">
			<OptionalBanner message="Take what's useful — this section is a gentle check-in, not essential." />
			<>
				<p>
					Let's take a moment to notice what's changed inside you, if anything.
				</p>

				<p>
					This isn't about finding solutions yet — it's simply a chance to notice any shift, if there is one.
				</p>
			</>

			<div className="request-section changed-section changed-section--before">
				<h3 className="changed-section-heading">Before this process</h3>
				<p>
					How might you have handled this situation before doing this process? If you approached the person
					from the place you were in at the beginning… what would likely happen?
				</p>
				<textarea
					className="request-textarea"
					data-field-id="changed-before"
					value={whatsChangedResponses.before || ""}
					onChange={(e) => handleChange("before", e.target.value)}
					rows={4}
				/>
			</div>

			<div className="changed-bridge" aria-hidden="true">↓ now</div>

			<div className="request-section changed-section changed-section--now">
				<h3 className="changed-section-heading">Now</h3>
				<p>
					What might you want to do differently now? If you approached from where you are now… what might be
					different? What's changed?
				</p>
				<textarea
					className="request-textarea"
					data-field-id="changed-differently"
					value={whatsChangedResponses.differently || ""}
					onChange={(e) => handleChange("differently", e.target.value)}
					rows={4}
				/>
			</div>
		</div>
	);
};

ExploringWhatsChanged.title = "Exploring what's changed";
ExploringWhatsChanged.titleSweary = "So... what's different now?";
ExploringWhatsChanged.navTitle = "Notice what's changed";

export default ExploringWhatsChanged;
