import React from "react";
import "./FeelingsChecklist.css"; // You can reuse your pill styles here

const FeelingsChecklist = ({ data, selected, setSelected }) => {
	const toggleFeeling = (feeling) => {
		setSelected((prev) => (prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]));
	};

	return (
		<div className="feelings-checklist">
			{Object.entries(data).map(([category, feelings]) => (
				<div key={category} className="feelings-category">
					<h4 className="feelings-category-heading">{category}</h4>
					<div className="pill-container">
						{feelings.map((feeling) => (
							<span
								key={feeling}
								className={`pill ${selected.includes(feeling) ? "selected" : ""}`}
								onClick={() => toggleFeeling(feeling)}
								tabIndex={0}
								title={selected.includes(feeling) ? "Selected" : "Click to select"}>
								{feeling}
							</span>
						))}
					</div>
				</div>
			))}
		</div>
	);
};

export default FeelingsChecklist;
