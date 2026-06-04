import React from "react";
import { useGratitude } from "../GratitudeContext";
import "./GratitudeStep.css";

const GratitudeObservation = () => {
	const { observation, setObservation } = useGratitude();

	return (
		<div className="g-step">
			<p>
				Think of something — or someone — you feel grateful for right now.
			</p>
			<p>
				Try to describe it as a simple observation: what actually happened, rather than a
				judgement or story about it. Like a camera recording — just the facts.
			</p>
			<p className="g-hint">
				<em>
					e.g. "My friend rang me when she didn't have to." or "I finished the project I'd been
					putting off."
				</em>
			</p>

			<label className="g-label" htmlFor="gratitude-obs">
				What happened?
			</label>
			<textarea
				id="gratitude-obs"
				className="g-textarea"
				rows={5}
				value={observation}
				onChange={(e) => setObservation(e.target.value)}
				placeholder="Describe what happened…"
			/>
		</div>
	);
};

GratitudeObservation.title = "What happened?";
GratitudeObservation.navTitle = "Observation";

export default GratitudeObservation;
