import React, { useState } from "react";
import "./ObservationStep.css";

export default function NvcWizard() {
	const [step, setStep] = useState(1);
	const [formData, setFormData] = useState({
		observation: "",
		feelings: "",
		needs: "",
		request: "",
	});
	const [showHelp, setShowHelp] = useState(false);

	const handleChange = (field) => (e) => {
		setFormData({ ...formData, [field]: e.target.value });
	};

	const nextStep = () => setStep((s) => Math.min(s + 1, 4));
	const prevStep = () => setStep((s) => Math.max(s - 1, 1));

	const saveEntry = () => {
		const all = JSON.parse(localStorage.getItem("nvc_entries") || "[]");
		const entry = {
			...formData,
			id: `nvc_${new Date().toISOString()}`,
			created: new Date().toLocaleString(),
		};
		localStorage.setItem("nvc_entries", JSON.stringify([...all, entry]));
		alert("Entry saved!");
		setFormData({ observation: "", feelings: "", needs: "", request: "" });
		setStep(1);
	};

	return (
		<div className="observation-container">
			{step === 1 && (
				<>
					<div className="header-row">
						<h2>Step 1: Observation</h2>
						<button onClick={() => setShowHelp(!showHelp)} className="help-icon" aria-label="Toggle help">
							💡
						</button>
					</div>
					<label htmlFor="observation">What did you see or hear?</label>
					<textarea
						id="observation"
						className="observation-input"
						rows={4}
						value={formData.observation}
						onChange={handleChange("observation")}
						placeholder="e.g. 'She said: That’s a stupid idea.'"
					/>
					{showHelp && (
						<div className="help-panel show">
							<div className="help-header">
								<h3>Need help?</h3>
								<button
									onClick={() => setShowHelp(false)}
									className="close-help"
									aria-label="Close help">
									×
								</button>
							</div>
							<p>
								Observation means what you could see or hear on a video—without judgment or
								interpretation.
							</p>
							<ul>
								<li>
									<strong>Good:</strong> "He said: 'You’re always late.'"
								</li>
								<li>
									<strong>Not-so-good:</strong> "He was rude to me."
								</li>
							</ul>
						</div>
					)}
				</>
			)}

			{step === 2 && (
				<>
					<h2>Step 2: Feelings</h2>
					<label htmlFor="feelings">How did you feel?</label>
					<textarea
						id="feelings"
						className="observation-input"
						rows={4}
						value={formData.feelings}
						onChange={handleChange("feelings")}
						placeholder="e.g. 'Hurt and confused.'"
					/>
				</>
			)}

			{step === 3 && (
				<>
					<h2>Step 3: Needs</h2>
					<label htmlFor="needs">What needs were not met?</label>
					<textarea
						id="needs"
						className="observation-input"
						rows={4}
						value={formData.needs}
						onChange={handleChange("needs")}
						placeholder="e.g. 'Respect, understanding, safety'"
					/>
				</>
			)}

			{step === 4 && (
				<>
					<h2>Step 4: Request</h2>
					<label htmlFor="request">What would you like to ask for?</label>
					<textarea
						id="request"
						className="observation-input"
						rows={4}
						value={formData.request}
						onChange={handleChange("request")}
						placeholder="e.g. 'Would you be willing to speak to me more gently?'"
					/>
				</>
			)}

			<div className="button-row">
				{step > 1 && (
					<button onClick={prevStep} className="clear-button">
						Back
					</button>
				)}
				{step < 4 && (
					<button onClick={nextStep} className="save-button">
						Next
					</button>
				)}
				{step === 4 && (
					<button onClick={saveEntry} className="save-button">
						Save Entry
					</button>
				)}
			</div>
		</div>
	);
}
