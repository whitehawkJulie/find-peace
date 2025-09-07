import React, { useState } from "react";
import "./Checklist.css";

const Checklist = ({ data, selectedItems, setSelectedItems, doubleClickEnabled = true }) => {
	const [collapsedCategories, setCollapsedCategories] = useState({});

	const toggleItem = (itemKey) => {
		console.log("Adding item " + itemKey + " to feelings list");

		setSelectedItems((prev) => {
			if (prev[itemKey]) {
				const newState = { ...prev };
				delete newState[itemKey];
				return newState;
			}
			return { ...prev, [itemKey]: "unmet" };
		});
	};

	const markAsMet = (itemKey) => {
		setSelectedItems((prev) => ({
			...prev,
			[itemKey]: "met",
		}));
	};

	const toggleCategoryCollapse = (category) => {
		setCollapsedCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	return (
		<div className="checklist-container">
			{Object.entries(data).map(([mainCategory, subcategories], index) => {
				const isCollapsed = collapsedCategories[mainCategory];

				return (
					<div key={mainCategory} className={`category-container category-${index % 8}`}>
						<div className="category-header" onClick={() => toggleCategoryCollapse(mainCategory)}>
							<h3 className="category-title">
								{mainCategory}
								<span className="collapse-icon" title={isCollapsed ? "Open section" : "Close section"}>
									{isCollapsed ? "▶" : "▼"}
								</span>{" "}
							</h3>
						</div>

						{!isCollapsed &&
							Object.entries(subcategories).map(([sub, items]) => (
								<div key={sub} className="subcategory">
									<h4 className="subcategory-title">{sub}</h4>
									<div className="pill-grid">
										{items.map(({ item, meaning }) => {
											const status = selectedItems[item];
											let className = "pill";
											if (status === "unmet") className += " unmet";
											if (status === "met") className += " met";

											return (
												<div
													key={item}
													className={className}
													onClick={() => toggleItem(item)}
													{...(doubleClickEnabled
														? { onDoubleClick: () => markAsMet(item) }
														: {})}
													tabIndex={0}
													title={meaning}>
													{item}
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

export default Checklist;
