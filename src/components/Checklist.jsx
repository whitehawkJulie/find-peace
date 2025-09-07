import React, { useState } from "react";
import "./Checklist.css";

const Checklist = ({
	data,
	selectedItems,
	setSelectedItems,
	type, // optional: used for background coloring ('needs', 'feelings-met', 'feelings-unmet')
	initiallyOpen = true,
	allowDoubleClick = true,
}) => {
	const [isCollapsed, setIsCollapsed] = useState(!initiallyOpen);

	const handleClick = (item) => {
		setSelectedItems((prev) => {
			if (prev[item] === "unmet") {
				// toggle off
				const newState = { ...prev };
				delete newState[item];
				return newState;
			}
			return { ...prev, [item]: "unmet" };
		});
	};

	const handleDoubleClick = (item) => {
		if (!allowDoubleClick) return;
		setSelectedItems((prev) => ({
			...prev,
			[item]: "met",
		}));
	};

	return (
		<div className={`checklist-container ${type}`}>
			{Object.entries(data).map(([mainCategory, subcategories], index) => (
				<div key={mainCategory} className="checklist-section">
					<div className="checklist-section-header" onClick={() => setIsCollapsed((prev) => !prev)}>
						<h2>{mainCategory}</h2>
						<span className="collapse-icon">{isCollapsed ? "▼" : "▲"}</span>
					</div>

					{!isCollapsed && (
						<div className="checklist-section-body">
							{Object.entries(subcategories).map(([subcategory, items]) => (
								<div key={subcategory} className="checklist-subcategory">
									<div className="subcategory-title">{subcategory}</div>
									<div className="checklist-grid">
										{items.map((item) => {
											const status = selectedItems[item.item];
											let className = "pill";
											if (status === "unmet") className += " unmet";
											if (status === "met") className += " met";

											return (
												<div
													key={item.item}
													className={className}
													onClick={() => handleClick(item.item)}
													onDoubleClick={() => handleDoubleClick(item.item)}
													tabIndex={0}
													title={
														item.meaning +
														(status === "met"
															? " (Met)"
															: status === "unmet"
															? " (Unmet)"
															: "")
													}>
													{item.item}
												</div>
											);
										})}
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			))}
		</div>
	);
};

export default Checklist;
