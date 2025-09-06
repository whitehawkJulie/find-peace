import React from "react";
import needsData from "./NeedsData"; // make sure this file exports the structured needs object
import "./NeedsChecklist.css";

const NeedsChecklist = ({ selectedNeeds, setSelectedNeeds }) => {
	const toggleNeed = (need) => {
		setSelectedNeeds((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]));
	};

	return (
		<div className="needs-checklist">
			{Object.entries(needsData).map(([category, subcategories]) => (
				<div key={category} className="needs-category">
					<h2 className="category-title">{category}</h2>

					{Object.entries(subcategories).map(([sub, needs]) => (
						<div key={sub} className="needs-subcategory">
							<h3 className="subcategory-title">{sub}</h3>

							<div className="pill-container">
								{needs.map((need) => (
									<button
										key={need}
										type="button"
										className={`pill ${selectedNeeds.includes(need) ? "selected" : ""}`}
										onClick={() => toggleNeed(need)}>
										{need}
									</button>
								))}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default NeedsChecklist;
