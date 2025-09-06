import React from "react";
import "./Needs.css";
import needsData from "./NeedsData";

const NeedsMet = ({ needs }) => {
	const metNeeds = Object.entries(needs)
		.filter(([, status]) => status === "met")
		.map(([need]) => need);

	// Organize by subcategory
	const organized = [];
	Object.entries(needsData).forEach(([category, subcategories]) => {
		Object.entries(subcategories).forEach(([sub, list]) => {
			const matched = list.filter((n) => metNeeds.includes(n));
			if (matched.length > 0) {
				organized.push(
					<div key={sub} className="needs-group">
						<div className="subcategory-title">{sub}</div>
						<div className="needs-grid">
							{matched.map((need) => (
								<div key={need} className="need-pill met">
									{need}
								</div>
							))}
						</div>
					</div>
				);
			}
		});
	});

	return (
		<div className="step-needs">
			<div className="card-header">
				<h2>Met Needs</h2>
			</div>
			<p>
				These are the needs that <strong>were met</strong> during the situation.
				<br />
				Take a moment to acknowledge or appreciate this.
			</p>
			{organized}
		</div>
	);
};

export default NeedsMet;
