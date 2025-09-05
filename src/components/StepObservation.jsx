import React from "react";
import "./StepObservation.css";

export default function StepObservation({ observation, onChange, showHelp, toggleHelp }) {
	return (
		<div className="card">
			<div className="card-header">
				<h2>Observation</h2>
				<button className="help-icon" onClick={toggleHelp}>
					?
				</button>
			</div>

			<textarea
				value={observation}
				onChange={(e) => onChange(e.target.value)}
				placeholder="What did you see or hear?"
			/>

			{showHelp && (
				<div className="slide-panel">
					<div className="slide-panel-header">
						<h3>How to write an Observation</h3>
						<button className="close-button" onClick={toggleHelp}>
							×
						</button>
					</div>
					<p>
						An observation is what you actually saw or heard — something a video camera could record. Avoid
						opinions, interpretations, or assumptions.
					</p>
					<ul>
						<li>✅ “He said, ‘You’re hopeless.’”</li>
						<li>❌ “He was being mean.”</li>
						<li>✅ “The kids ran across the floor at 8 am.”</li>
						<li>❌ “The kids were being disrespectful.”</li>
					</ul>
				</div>
			)}
		</div>
	);
}
