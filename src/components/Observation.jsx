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
			<p> What did you see or hear that upset you?</p>
			<textarea
				value={observation}
				onChange={(e) => setObservation(e.target.value)}
				placeholder="e.g. I saw the dishes on the sink"
			/>

			<SlideDrawer isOpen={showHelp} onClose={() => setShowHelp(false)} title="Observation Help">
				<p>
					This process works best when applied to a specific incident, in a specific moment, rather than a
					general idea. For example, instead of “I always do all the housework”, find a specific moment in
					which it annoyed you, like “When I noticed the dishes on the sink”.
				</p>
				<p>
					If you have a long story in your head about what happened, can you extract from that JUST what
					actually happened, as a camera would see it, without assumptions or blame? It may help to phrase is
					as "When I saw, heard or remembered ... ". A clear and useful observation is a statement of what
					happened which contains no judgement or blame, and it's most likely that the other person would
					easily agree that this is what happened and won't get defensive.
				</p>
				<ul>
					<li>✔ “He walked out and I heard the door slam.”</li>
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
