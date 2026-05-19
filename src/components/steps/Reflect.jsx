import React from "react";
import { useWizard } from "../WizardContext";
import ImportanceBanner from "../ImportanceBanner";
import "./RequestFormulation.css";

const Reflect = () => {
	const { whatsChangedResponses, setWhatsChangedResponses } = useWizard();

	const handleChange = (key, value) => {
		setWhatsChangedResponses((prev) => ({ ...prev, [key]: value }));
	};

	return (
		<div className="step-whats-changed step-container">
			<ImportanceBanner message="Take what's useful — this section is a gentle check-in, not essential." />
			<>
				<p>Let's take a moment to notice what's changed inside you, if anything.</p>

				<p>
					This isn't about finding solutions yet — it's simply a chance to notice any shift, if there is one.
				</p>

				{/* <p>
					WORK IN PROGRESS: If nothing has shifted for you yet, doing this process, it might be worth doing it again, and
					making sure to do all the optional sections. The more you can slow down and really listen to each
					part of the process, the more it can show you. You might also find it helpful to go back through
					your notes from each step, and see if anything new stands out to you now that you've gone through
					the whole process. Sometimes the insights come in layers, and the first time through you might just
					be scratching the surface of what's there. So feel free to revisit any part of the process, and take
					your time with it.
				</p> */}
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

			<div className="changed-bridge" aria-hidden="true">
				↓ now
			</div>

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

Reflect.title = "Reflect";
Reflect.titleSweary = "So... what's different now?";
Reflect.navTitle = "Reflect";

export default Reflect;
