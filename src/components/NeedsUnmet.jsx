import React from "react";
import "./Needs.css";
import needsData from "./NeedsData";

const NeedsUnmet = ({ needs }) => {
	const unmetNeeds = Object.entries(needs)
		.filter(([_, status]) => status === "unmet")
		.map(([need]) => need);

	const renderUnmetOrganized = () => {
		const output = [];

		Object.entries(needsData).forEach(([_, subcategories]) => {
			Object.entries(subcategories).forEach(([_, subNeeds]) => {
				const matching = subNeeds.filter((need) => unmetNeeds.includes(need));
				if (matching.length > 0) {
					output.push(
						<div key={matching.join("-")} className="needs-line">
							{matching.map((need) => (
								<span key={need} className="need-pill unmet">
									{need}
								</span>
							))}
						</div>
					);
				}
			});
		});

		return output;
	};

	return (
		<div className="step-needs-unmet">
			<h2>Unmet Needs</h2>
			<p>
				These are the needs you selected that are not currently met. You might take a moment to sit with them,
				without needing to change them right away.
			</p>
			{renderUnmetOrganized()}
		</div>
	);
};

export default NeedsUnmet;
