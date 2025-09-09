import React, { useState } from "react";
import Pill from "./Pill";
import "./Checklist.css";

const Checklist = ({ data, selectedItems, setSelectedItems, type = "feelings" }) => {
	const [collapsedCategories, setCollapsedCategories] = useState({});

	// Toggle between click and double-click states
	const handleClick = (item) => {
		const newState = { ...selectedItems };

		// If item was "double", change to "click"
		if (newState[item] === "double") {
			newState[item] = "click";
		}
		// If item was "click", remove it (toggle off)
		else if (newState[item] === "click") {
			delete newState[item];
		}
		// If item wasn't selected yet, add as "click"
		else {
			newState[item] = "click";
		}

		setSelectedItems(newState);
	};

	const handleDoubleClick = (item) => {
		const newState = { ...selectedItems };
		newState[item] = "double";
		setSelectedItems(newState);
	};

	const toggleCategory = (category) => {
		setCollapsedCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	return (
		<div className="checklist">
			{Object.entries(data).map(([mainCategory, subcategories], index) => (
				<div key={mainCategory} className={`category category-${index % 8}`}>
					<div
						className="category-header"
						onClick={() => toggleCategory(mainCategory)}
						title={collapsedCategories[mainCategory] ? "Expand section" : "Collapse section"}>
						<h3 className="category-title">{mainCategory}</h3>
						<span className="collapse-icon">{collapsedCategories[mainCategory] ? "▼" : "▲"}</span>
					</div>

					{!collapsedCategories[mainCategory] && (
						<div className="subcategories">
							{Object.entries(subcategories).map(([subcategory, items]) => (
								<div key={subcategory} className="subcategory">
									<h4 className="subcategory-title">{subcategory}</h4>
									<div className="pill-grid">
										{items.map(({ item, meaning }) => (
											<Pill
												key={item}
												item={item}
												type={type}
												state={selectedItems[item] || ""}
												meaning={meaning}
												onClick={() => handleClick(item)}
												onDoubleClick={() => handleDoubleClick(item)}
											/>
										))}
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
