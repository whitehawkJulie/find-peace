import React, { useState } from "react";
import Pill from "./Pill";
import "./Checklist.css";

const Checklist = ({ data, selectedItems, setSelectedItems, type = "feelings", categoryHelpIcons = {}, onItemClick = null }) => {
	const [collapsedCategories, setCollapsedCategories] = useState({});
	const [expandedTiers, setExpandedTiers] = useState({}); // keyed by subcategory name

	// Toggle between clicked and double-clicked states
	const handleClick = (item, itemData) => {
		// If onItemClick is provided, call it first — if it returns false, skip default selection
		if (onItemClick) {
			const proceed = onItemClick(itemData);
			if (proceed === false) return;
		}

		const newState = { ...selectedItems };

		// If item was "double-clicked", change to "clicked"
		if (newState[item] === "double-clicked") {
			newState[item] = "clicked";
		}
		// If item was "clicked", remove it (toggle off)
		else if (newState[item] === "clicked") {
			delete newState[item];
		}
		// If item wasn't selected yet, add as "clicked"
		else {
			newState[item] = "clicked";
		}

		setSelectedItems(newState);
	};

	const handleDoubleClick = (item) => {
		const newState = { ...selectedItems };
		newState[item] = "double-clicked";
		setSelectedItems(newState);
	};

	const toggleCategory = (category) => {
		setCollapsedCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	const toggleTier = (subcategory) => {
		setExpandedTiers((prev) => ({
			...prev,
			[subcategory]: !prev[subcategory],
		}));
	};

	// Only apply tiering to categories whose items have a `family` property
	// (i.e. "Feelings when needs are not met"). Other sections show all items.
	const categoryUsesTiers = (subcategories) => {
		return Object.values(subcategories).some((items) =>
			items.some((it) => it.family)
		);
	};

	// Check if a subcategory has any tier:"more" items
	const subcategoryHasMore = (items) => {
		return items.some((it) => it.ui && it.ui.tier === "more");
	};

	// Collect quick pick items from a category's subcategories
	const getQuickPicks = (subcategories) => {
		const picks = [];
		for (const items of Object.values(subcategories)) {
			for (const item of items) {
				if (item.ui && item.ui.quickPick) {
					picks.push(item);
				}
			}
		}
		return picks;
	};

	return (
		<div className="checklist">
			{Object.entries(data)
				.filter(([key]) => key !== "meta")
				.map(([mainCategory, subcategories], index) => {
				const usesTiers = categoryUsesTiers(subcategories);
				const quickPicks = getQuickPicks(subcategories);

				return (
				<div key={mainCategory} className={`category category-${index % 8}`}>
					<div
						className="category-header"
						onClick={() => toggleCategory(mainCategory)}
						title={collapsedCategories[mainCategory] ? "Expand section" : "Collapse section"}>
						<h3 className="category-title">
							{mainCategory}
							{categoryHelpIcons[mainCategory] && (
								<button
									className="category-help-icon"
									title="What's this?"
									onClick={(e) => {
										e.stopPropagation();
										categoryHelpIcons[mainCategory]();
									}}>
									?
								</button>
							)}
						</h3>
						<span className="collapse-icon">{collapsedCategories[mainCategory] ? "▼" : "▲"}</span>
					</div>

					{!collapsedCategories[mainCategory] && (
						<div className="subcategories">
							{/* Quick picks row — inside this category, before subcategories */}
							{quickPicks.length > 0 && (
								<div className="quick-picks">
									<h4 className="quick-picks-label">Quick picks</h4>
									<div className="pill-grid cloud">
										{quickPicks.map((itemData) => {
											const { item } = itemData;
											const tooltip = itemData.meaning || itemData.problem || "";
											return (
												<Pill
													key={item}
													item={item}
													type={type}
													state={selectedItems[item] || ""}
													meaning={tooltip}
													onClick={() => handleClick(item, itemData)}
													onDoubleClick={() => handleDoubleClick(item)}
												/>
											);
										})}
									</div>
								</div>
							)}

							{Object.entries(subcategories).map(([subcategory, items]) => {
								// Only filter by tier in the unmet-needs section
								const isSubExpanded = expandedTiers[subcategory];
								const hasMore = usesTiers && subcategoryHasMore(items);
								const visibleItems = (!usesTiers || isSubExpanded)
									? items
									: items.filter(
										(itemData) => !itemData.ui || itemData.ui.tier !== "more"
									);
								if (visibleItems.length === 0) return null;

								return (
									<div key={subcategory} className="subcategory">
										<h4 className="subcategory-title">
											{subcategory}
											{hasMore && (
												<button
													className="tier-toggle-icon"
													title={isSubExpanded ? "Show fewer" : "Show more"}
													onClick={(e) => {
														e.stopPropagation();
														toggleTier(subcategory);
													}}>
													{isSubExpanded ? "−" : "+"}
												</button>
											)}
										</h4>
										<div className="pill-grid">
											{visibleItems.map((itemData) => {
												const { item } = itemData;
												const tooltip = itemData.meaning || itemData.problem || "";
												return (
													<Pill
														key={item}
														item={item}
														type={type}
														state={selectedItems[item] || ""}
														meaning={tooltip}
														onClick={() => handleClick(item, itemData)}
														onDoubleClick={() => handleDoubleClick(item)}
													/>
												);
											})}
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
				);
			})}
		</div>
	);
};

export default Checklist;
