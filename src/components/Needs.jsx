import React, { useState } from "react";
import SlideDrawer from "./SlideDrawer";
import NeedsChecklist from "./NeedsChecklist";

const Needs = ({ needs, setNeeds }) => {
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<div className="step-needs">
			<div className="card-header">
				<h2>Needs</h2>
				<button className="help-icon" onClick={() => setShowDrawer(true)}>
					✔
				</button>
			</div>

			<p>
				<strong>Selected:</strong>
				<br />
				{needs.length > 0 ? needs.join(", ") : "None yet"}
			</p>

			<SlideDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} title="Pick Your Needs">
				<NeedsChecklist selectedNeeds={needs} setSelectedNeeds={setNeeds} />
			</SlideDrawer>
		</div>
	);
};

export default Needs;
