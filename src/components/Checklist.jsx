import React, { useState } from "react";
import "./Checklist.css";

const Checklist = ({ data, selectedItems, setSelectedItems, showMeanings = true }) => {
	const [collapsedCategories, setCollapsedCategories] = useState({});

	// Toggle between click and double-click states
	const handleClick = (item) => {
		setSelectedItems((prev) => ({
			...prev,
			[item]: prev[item] === "click" ? undefined : "click",
		}));
	};

	const handleDoubleClick = (item) => {
		setSelectedItems((prev) => ({
			...prev,
			[item]: prev[item] === "double" ? undefined : "double",
		}));
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
											<div
												key={item}
												className={`pill ${selectedItems[item] || ""}`}
												onClick={() => handleClick(item)}
												onDoubleClick={(e) => {
													e.preventDefault();
													handleDoubleClick(item);
												}}
												{...(showMeanings ? { "data-tooltip": meaning } : {})}>
												{item}
											</div>
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
