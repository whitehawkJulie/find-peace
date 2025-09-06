import React, { useState } from "react";
import "./Needs.css";

import SlideDrawer from "./SlideDrawer";
import NeedsChecklist from "./NeedsChecklist";
import needsData from "./NeedsData";

const Needs = ({ needs: selectedNeeds, setNeeds }) => {
	const [showDrawer, setShowDrawer] = useState(false);

	const renderOrganizedNeeds = (selectedNeeds) => {
		const output = [];

		Object.values(needsData).forEach((subcategories) => {
			Object.values(subcategories).forEach((needsList) => {
				const matching = needsList.filter((need) => need in selectedNeeds);
				if (matching.length > 0) {
					output.push(<div key={matching.join("-")}>{matching.join(", ")}</div>);
				}
			});
		});

		return output;
	};

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
				{Object.keys(selectedNeeds).length > 0 ? (
					<div className="selected-needs">{renderOrganizedNeeds(selectedNeeds)}</div>
				) : (
					"None yet"
				)}{" "}
			</p>

			<SlideDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} title="Pick Your Needs">
				<NeedsChecklist selectedNeeds={selectedNeeds} setSelectedNeeds={setNeeds} />
			</SlideDrawer>
		</div>
	);
};

export default Needs;
