import React, { useState } from "react";
import "./Needs.css";

import SlideDrawer from "./SlideDrawer";
import NeedsChecklist from "./NeedsChecklist";
import needsData from "./NeedsData";

const Needs = ({ needs: selectedNeeds, setNeeds }) => {
	const [showDrawer, setShowDrawer] = useState(false);

	const renderOrganizedNeeds = (selectedNeeds, setSelectedNeeds) => {
		const metOutput = [];
		const unmetOutput = [];

		const removeNeed = (need) => {
			const updated = { ...selectedNeeds };
			delete updated[need];
			setSelectedNeeds(updated);
		};

		Object.values(needsData).forEach((subcategories) => {
			Object.values(subcategories).forEach((needsList) => {
				const met = needsList.filter((need) => selectedNeeds[need] === "met");
				const unmet = needsList.filter((need) => selectedNeeds[need] === "unmet");

				if (met.length > 0) {
					metOutput.push(
						<div key={`met-${met.join("-")}`}>
							{met.map((need) => (
								<span key={need} className="pill met">
									{need}
									<span className="remove" onClick={() => removeNeed(need)} title="Remove need">
										✖
									</span>
								</span>
							))}
						</div>
					);
				}

				if (unmet.length > 0) {
					unmetOutput.push(
						<div key={`unmet-${unmet.join("-")}`}>
							{unmet.map((need) => (
								<span key={need} className="pill unmet">
									{need}
									<span className="remove" onClick={() => removeNeed(need)} title="Remove need">
										✖
									</span>
								</span>
							))}
						</div>
					);
				}
			});
		});

		return (
			<>
				{metOutput.length > 0 && (
					<div className="met-needs-block">
						<strong>Met needs:</strong>
						<div className="met-needs-list">{metOutput}</div>
					</div>
				)}

				{unmetOutput.length > 0 && (
					<div className="unmet-needs-block" style={{ marginTop: "1rem" }}>
						<strong>Unmet needs:</strong>
						<div className="unmet-needs-list">{unmetOutput}</div>
					</div>
				)}
			</>
		);
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
					<div className="selected-needs">{renderOrganizedNeeds(selectedNeeds, setNeeds)}</div>
				) : (
					"None yet"
				)}{" "}
			</p>

			<SlideDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} title="What needs are alive in you?">
				<NeedsChecklist selectedNeeds={selectedNeeds} setSelectedNeeds={setNeeds} />
			</SlideDrawer>
		</div>
	);
};

export default Needs;
