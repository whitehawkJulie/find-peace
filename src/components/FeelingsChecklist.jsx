import React, { useState } from "react";
import "./FeelingsChecklist.css";

const FeelingsChecklist = ({
	title,
	type, // 'met' or 'unmet'
	feelingsData,
	selectedFeelings = [],
	setSelectedFeelings,
	initiallyOpen = true,
}) => {
	const [isCollapsed, setIsCollapsed] = useState(!initiallyOpen);

	const toggleFeeling = (feeling) => {
		setSelectedFeelings((prev = []) =>
			prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]
		);
	};

	return (
		<div className={`feelings-list-container ${type}`}>
			<div className="feelings-list-header" onClick={() => setIsCollapsed((prev) => !prev)}>
				<h2>{title}</h2>
				<span className="collapse-icon">{isCollapsed ? "▶" : "▼"}</span>
			</div>

			{!isCollapsed && (
				<div className="feelings-list-body">
					{Object.entries(feelingsData).map(([category, feelings]) => (
						<div key={category} className="feelings-category">
							<div className="category-heading">{category}</div>
							<div className="feelings-grid">
								{feelings.map((feeling) => (
									<div
										key={feeling}
										className={`feeling-pill ${
											selectedFeelings.includes(feeling) ? "selected" : ""
										}`}
										onClick={() => toggleFeeling(feeling)}
										tabIndex={0}
										title={selectedFeelings.includes(feeling) ? "Selected" : "Click to select"}>
										{feeling}
									</div>
								))}
							</div>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default FeelingsChecklist;
