import React, { useState, useEffect } from "react";
import "./ObservationStep.css";

export default function ObservationStep() {
	const [showHelp, setShowHelp] = useState(false);
	const [observation, setObservation] = useState("");

	useEffect(() => {
		const saved = localStorage.getItem("nvc_observation");
		if (saved) setObservation(saved);
	}, []);

	useEffect(() => {
		localStorage.setItem("nvc_observation", observation);
	}, [observation]);

	const clearObservation = () => {
		setObservation("");
		localStorage.removeItem("nvc_observation");
	};

	return (
		<>
			<div className="observation-container">
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
					value={observation}
					onChange={(e) => setObservation(e.target.value)}
					placeholder="e.g. 'She said: That’s a stupid idea.'"
				/>

				<button onClick={clearObservation} className="clear-button">
					Clear
				</button>
			</div>

			<div className={`help-panel ${showHelp ? "show" : ""}`}>
				<div className="help-header">
					<h3>Need help?</h3>
					<button onClick={() => setShowHelp(false)} className="close-help" aria-label="Close help">
						×
					</button>
				</div>
				<p>Observation means what you could see or hear on a video—without judgment or interpretation.</p>
				<ul>
					<li>
						<strong>Good:</strong> "He said: 'You’re always late.'"
					</li>
					<li>
						<strong>Not-so-good:</strong> "He was rude to me."
					</li>
				</ul>
			</div>
		</>
	);
}
