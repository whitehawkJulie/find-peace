import React, { useState, useMemo } from "react";
import Pill from "./Pill";
import "./Checklist.css";

/**
 * Checklist now receives `data` as an array of section objects:
 *   [{ ui: { heading }, groups: { Key: { ui: { heading, order }, items: [...] } } }, ...]
 *
 * Each section renders as a collapsible category.
 * Groups within a section are sorted by `group.ui.order` and rendered as subcategories.
 */
const Checklist = ({ data, selectedItems, setSelectedItems, type = "feelings", categoryHelpIcons = {}, onItemClick = null }) => {
	const [collapsedCategories, setCollapsedCategories] = useState({});
	const [expandedTiers, setExpandedTiers] = useState({}); // keyed by subcategory heading

	// Toggle between clicked and double-clicked states
	const handleClick = (item, itemData) => {
		// If onItemClick is provided, call it first — if it returns false, skip default selection
		if (onItemClick) {
			const proceed = onItemClick(itemData);
			if (proceed === false) return;
		}

		const newState = { ...selectedItems };

		if (newState[item] === "double-clicked") {
			newState[item] = "clicked";
		} else if (newState[item] === "clicked") {
			delete newState[item];
		} else {
			newState[item] = "clicked";
		}

		setSelectedItems(newState);
	};

	const handleDoubleClick = (item) => {
		const newState = { ...selectedItems };
		newState[item] = "double-clicked";
		setSelectedItems(newState);
	};

	const toggleCategory = (heading) => {
		setCollapsedCategories((prev) => ({
			...prev,
			[heading]: !prev[heading],
		}));
	};

	const toggleTier = (subcategoryHeading) => {
		setExpandedTiers((prev) => ({
			...prev,
			[subcategoryHeading]: !prev[subcategoryHeading],
		}));
	};

	// Only apply tiering to sections whose items have a `family` property
	// (i.e. FeelingsUnmet). Other sections show all items.
	const sectionUsesTiers = (groups) => {
		return Object.values(groups).some((group) =>
			group.items.some((it) => it.family)
		);
	};

	// Check if a group has any tier:"more" items
	const groupHasMore = (items) => {
		return items.some((it) => it.ui && it.ui.tier === "more");
	};

	// Collect quick pick items from a section's groups
	const getQuickPicks = (groups) => {
		const picks = [];
		for (const group of Object.values(groups)) {
			for (const item of group.items) {
				if (item.ui && item.ui.quickPick) {
					picks.push(item);
				}
			}
		}
		return picks;
	};

	// Sort groups by their ui.order
	const getSortedGroups = (groups) => {
		return Object.entries(groups)
			.sort(([, a], [, b]) => (a.ui?.order || 0) - (b.ui?.order || 0));
	};

	// Collect all group headings that have "more" tier items (for show-all toggle)
	const allTierGroups = useMemo(() => {
		const headings = [];
		for (const section of data) {
			if (!sectionUsesTiers(section.groups)) continue;
			for (const group of Object.values(section.groups)) {
				const heading = group.ui?.heading;
				if (heading && groupHasMore(group.items)) {
					headings.push(heading);
				}
			}
		}
		return headings;
	}, [data]);

	// Are all tiers expanded?
	const allTiersExpanded =
		allTierGroups.length > 0 && allTierGroups.every((h) => expandedTiers[h]);

	const toggleShowAll = () => {
		if (allTiersExpanded) {
			// Collapse all tiers back to simple view
			setExpandedTiers({});
		} else {
			// Expand all tiers to show every word
			const expanded = {};
			allTierGroups.forEach((h) => { expanded[h] = true; });
			setExpandedTiers(expanded);
		}
	};

	return (
		<div className="checklist">
			{allTierGroups.length > 0 && (
				<div className="checklist-show-all">
					<button className="show-all-btn" onClick={toggleShowAll}>
						{allTiersExpanded ? "Show fewer words" : "Show all words"}
					</button>
				</div>
			)}

			{data.map((section, index) => {
				const sectionHeading = section.ui.heading;
				const groups = section.groups;
				const usesTiers = sectionUsesTiers(groups);
				const quickPicks = getQuickPicks(groups);
				const sortedGroups = getSortedGroups(groups);

				return (
				<div key={sectionHeading} className={`category category-${index % 8}`}>
					<div
						className="category-header"
						onClick={() => toggleCategory(sectionHeading)}
						title={collapsedCategories[sectionHeading] ? "Expand section" : "Collapse section"}>
						<h3 className="category-title">
							{sectionHeading}
							{categoryHelpIcons[sectionHeading] && (
								<button
									className="category-help-icon"
									title="What's this?"
									onClick={(e) => {
										e.stopPropagation();
										categoryHelpIcons[sectionHeading]();
									}}>
									?
								</button>
							)}
						</h3>
						<span className="collapse-icon">{collapsedCategories[sectionHeading] ? "▼" : "▲"}</span>
					</div>

					{!collapsedCategories[sectionHeading] && (
						<div className="subcategories">
							{/* Quick picks row — inside this section, before groups */}
							{quickPicks.length > 0 && (
								<div className="quick-picks">
									<h4 className="quick-picks-label">Quick picks</h4>
									<div className="pill-grid cloud">
										{quickPicks.map((itemData) => {
											const { item } = itemData;
											const tooltip = itemData.description || itemData.meaning || "";
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

							{sortedGroups.map(([groupKey, group]) => {
								const groupHeading = group.ui?.heading || groupKey;
								const items = group.items;

								// Only filter by tier in sections that use tiers
								const isSubExpanded = expandedTiers[groupHeading];
								const hasMore = usesTiers && groupHasMore(items);
								const visibleItems = (!usesTiers || isSubExpanded)
									? items
									: items.filter(
										(itemData) => !itemData.ui || itemData.ui.tier !== "more"
									);
								if (visibleItems.length === 0) return null;

								return (
									<div key={groupKey} className="subcategory">
										<h4 className="subcategory-title">
											{groupHeading}
											{hasMore && (
												<button
													className="tier-toggle-icon"
													title={isSubExpanded ? "Show fewer" : "Show more"}
													onClick={(e) => {
														e.stopPropagation();
														toggleTier(groupHeading);
													}}>
													{isSubExpanded ? "−" : "+"}
												</button>
											)}
										</h4>
										<div className="pill-grid">
											{visibleItems.map((itemData) => {
												const { item } = itemData;
												const tooltip = itemData.description || itemData.meaning || "";
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
