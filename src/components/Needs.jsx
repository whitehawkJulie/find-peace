import React, { useState } from "react";
import "./Needs.css";

import SlideDrawer from "./SlideDrawer";
import NeedsChecklist from "./NeedsChecklist";
import needsData from "./NeedsData";

const Needs = ({ needs: selectedNeeds, setNeeds }) => {
	const [showDrawer, setShowDrawer] = useState(false);

	const renderOrganizedNeeds = () => {
		const output = [];

		Object.entries(needsData).forEach(([category, subcategories]) => {
			const categoryNeeds = [];

			Object.entries(subcategories).forEach(([sub, items]) => {
				items.forEach((need) => {
					if (selectedNeeds.includes(need)) {
						categoryNeeds.push(need);
					}
				});
			});

			if (categoryNeeds.length > 0) {
				output.push(
					<div key={category}>
						<strong>{category}:</strong> {categoryNeeds.join(", ")}
					</div>
				);
			}
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
				{selectedNeeds.length > 0 ? <div className="selected-needs">{renderOrganizedNeeds()}</div> : "None yet"}
			</p>

			<SlideDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} title="Pick Your Needs">
				<NeedsChecklist selectedNeeds={selectedNeeds} setSelectedNeeds={setNeeds} />
			</SlideDrawer>
		</div>
	);
};

export default Needs;
