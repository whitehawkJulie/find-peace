import React, { useState } from "react";
import SlideDrawer from "./SlideDrawer";

const Observation = ({ observation, setObservation }) => {
	const [showHelp, setShowHelp] = useState(false);

	return (
		<div className="step-observation">
			<div className="card-header">
				<h2>Observation</h2>
				<button className="help-icon" onClick={() => setShowHelp(true)}>
					?
				</button>
			</div>

			<textarea
				value={observation}
				onChange={(e) => setObservation(e.target.value)}
				placeholder="What did you see or hear?"
			/>

			<SlideDrawer isOpen={showHelp} onClose={() => setShowHelp(false)} title="Observation Help">
				<p>
					In NVC, an observation is something you could record with a video camera — something factual,
					without evaluation or interpretation.
				</p>
				<ul>
					<li>✔ “He walked out and slammed the door.”</li>
					<li>✖ “He was being rude.”</li>
					<li>✔ “She didn’t return my call.”</li>
					<li>✖ “She ignored me.”</li>
				</ul>
				<p>Stick to what you saw or heard. That gives clarity — and helps avoid blame or argument.</p>
			</SlideDrawer>
		</div>
	);
};

export default Observation;
