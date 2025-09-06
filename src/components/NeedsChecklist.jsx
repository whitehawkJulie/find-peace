import React, { useState } from "react";
import "./NeedsChecklist.css";
import needsData from "./NeedsData";

const NeedsChecklist = ({ selectedNeeds, setSelectedNeeds }) => {
	const handleClick = (need) => {
		setSelectedNeeds((prev) => {
			if (prev[need] === "unmet") {
				const newState = { ...prev };
				delete newState[need];
				return newState;
			}
			return { ...prev, [need]: "unmet" };
		});
	};

	const handleDoubleClick = (need) => {
		setSelectedNeeds((prev) => ({
			...prev,
			[need]: "met",
		}));
	};

	return (
		<div className="needs-checklist">
			{Object.entries(needsData).map(([category, subcategories]) => {
				const categoryClass = `needs-category category-${category.toLowerCase().replace(/\s+/g, "-")}`;

				return (
					<div key={category} className={categoryClass}>
						<h3 className="category-heading">{category}</h3>

						{Object.entries(subcategories).map(([sub, needs]) => (
							<div key={sub} className="needs-subcategory">
								<h4 className="subcategory-title">{sub}</h4>
								<div className="needs-grid">
									{needs.map((need) => {
										const status = selectedNeeds[need];
										let className = "need-pill";
										if (status === "unmet") className += " unmet";
										if (status === "met") className += " met";

										return (
											<div
												key={need}
												className={className}
												onClick={() => handleClick(need)}
												onDoubleClick={() => handleDoubleClick(need)}
												tabIndex={0}
												title={
													status === "met"
														? "Met"
														: status === "unmet"
														? "Unmet"
														: "Unselected"
												}>
												{need}
											</div>
										);
									})}
								</div>
							</div>
						))}
					</div>
				);
			})}
		</div>
	);
};

export default NeedsChecklist;
