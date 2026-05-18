import React, { useState } from "react";
import Pill from "./Pill";
import "./Checklist.css";

/**
 * Checklist receives `data` as an array of section objects:
 *   [{ ui: { heading }, groups: { Key: { ui: { heading, order }, items: [...] } } }, ...]
 *
 * listMode controls item visibility per-section:
 *   "quick"  — only quickPick items, flat (no subcategory headings)
 *   "short"  — items without tier:"more" (default)
 *   "full"   — all items
 */
const LIST_MODES = [
	{ key: "quick", label: "Quick picks", icon: "Quick" },
	{ key: "short", label: "Short list", icon: "Short" },
	{ key: "full", label: "Full list", icon: "Full" },
];

const Checklist = ({
	data,
	selectedItems,
	setSelectedItems,
	type = "feelings",
	categoryHelpIcons = {},
	subcategoryIcons = {},
	onItemClick = null,
	onIndicatorClick = null,
	onInfoClick = null,
	showListModeToggle = false,
	defaultListMode = "short",
	afterGroupContent = null,
	headerContent = null,
	defaultCollapsed = [],
	selectionHint = null,
}) => {
	const [collapsedCategories, setCollapsedCategories] = useState(() =>
		Object.fromEntries(defaultCollapsed.map((h) => [h, true])),
	);
	// Per-section list mode, keyed by section heading
	const [sectionModes, setSectionModes] = useState({});
	// Per-section "show selected only" toggle, keyed by section heading
	const [sectionSelectedOnly, setSectionSelectedOnly] = useState({});

	const getModeForSection = (heading) => sectionModes[heading] || defaultListMode;

	const setSectionMode = (heading, mode) => {
		setSectionModes((prev) => ({ ...prev, [heading]: mode }));
	};

	const setSelectedOnly = (heading) => {
		setSectionSelectedOnly((prev) => ({ ...prev, [heading]: true }));
	};

	const clearSelectedOnly = (heading) => {
		setSectionSelectedOnly((prev) => ({ ...prev, [heading]: false }));
	};

	const handleClick = (item, itemData) => {
		if (onItemClick) {
			const proceed = onItemClick(itemData);
			if (proceed === false) return;
		}

		const newState = { ...selectedItems };

		// Click cycle: unselected → clicked → double-clicked (strong) → unselected
		if (newState[item] === "double-clicked") {
			delete newState[item];
		} else if (newState[item] === "clicked") {
			newState[item] = "double-clicked";
		} else {
			newState[item] = "clicked";
		}

		setSelectedItems(newState);
	};

	const toggleCategory = (heading) => {
		setCollapsedCategories((prev) => ({
			...prev,
			[heading]: !prev[heading],
		}));
	};

	const getSortedGroups = (groups) => {
		return Object.entries(groups).sort(([, a], [, b]) => (a.ui?.order || 0) - (b.ui?.order || 0));
	};

	const getVisibleItems = (items, mode) => {
		if (mode === "full") return items;
		if (mode === "quick") return items.filter((it) => it.ui?.quickPick);
		return items.filter((it) => !it.ui || it.ui.tier !== "more");
	};

	const getQuickPicksFlat = (groups) => {
		const picks = [];
		const sorted = getSortedGroups(groups);
		for (const [, group] of sorted) {
			for (const item of group.items) {
				if (item.ui?.quickPick) {
					picks.push(item);
				}
			}
		}
		return picks;
	};

	// Returns true if a section has any selected items
	const sectionHasSelections = (groups) => {
		for (const group of Object.values(groups)) {
			for (const item of group.items) {
				if (selectedItems[item.item]) return true;
			}
		}
		return false;
	};

	const renderPill = (itemData) => {
		const { item } = itemData;
		let tooltip = itemData.definition || itemData.description || itemData.meaning || "";

		// Determine indicator type
		let indicator = null;
		if (itemData.type === "storyWord") {
			indicator = "plus";
			if (!tooltip) tooltip = "Tap to unpack";
		}

		return (
			<Pill
				key={item}
				item={item}
				type={type}
				state={selectedItems[item] || ""}
				meaning={tooltip}
				indicator={indicator}
				onClick={() => handleClick(item, itemData)}
				onIndicatorClick={indicator === "chevron" ? () => onIndicatorClick?.(itemData) : undefined}
			/>
		);
	};

	const sectionHasTiers = (groups) => {
		return Object.values(groups).some((group) =>
			group.items.some((it) => it.ui?.quickPick || it.ui?.tier === "more"),
		);
	};

	const renderModeIcons = (sectionHeading, groups) => {
		if (!showListModeToggle || !sectionHasTiers(groups)) return null;
		const currentMode = getModeForSection(sectionHeading);
		const isSelectedOnly = sectionSelectedOnly[sectionHeading] || false;
		return (
			<span className="mode-icons">
				{LIST_MODES.map((mode) => (
					<button
						key={mode.key}
						className={`mode-icon ${!isSelectedOnly && currentMode === mode.key ? "mode-icon-active" : ""}`}
						title={mode.label}
						onClick={(e) => {
							e.stopPropagation();
							setSectionMode(sectionHeading, mode.key);
							clearSelectedOnly(sectionHeading);
							setCollapsedCategories((prev) => ({ ...prev, [sectionHeading]: false }));
						}}>
						{mode.icon}
					</button>
				))}
			</span>
		);
	};

	const renderSelectedOnlyToggle = (sectionHeading, groups) => {
		if (!sectionHasSelections(groups)) return null;
		const isActive = sectionSelectedOnly[sectionHeading] || false;
		return (
			<button
				className={`mode-icon selected-only-toggle ${isActive ? "mode-icon-active" : ""}`}
				title="Show selected"
				onClick={(e) => {
					e.stopPropagation();
					setSelectedOnly(sectionHeading);
					setCollapsedCategories((prev) => ({ ...prev, [sectionHeading]: false }));
				}}>
				✓
			</button>
		);
	};

	const renderHeaderControls = (sectionHeading, groups) => (
		<span className="category-controls">
			{renderModeIcons(sectionHeading, groups)}
			{renderSelectedOnlyToggle(sectionHeading, groups)}
			<span className="collapse-icon">{collapsedCategories[sectionHeading] ? "▼" : "▲"}</span>
		</span>
	);

	// Find the globally first (section, group) with any selection — hint renders only there
	const globalFirstSelected = selectionHint
		? (() => {
				for (const s of data) {
					const sg = getSortedGroups(s.groups);
					const found = sg.find(([, g]) => g.items.some((it) => selectedItems[it.item]));
					if (found) return { sectionHeading: s.ui.heading, groupKey: found[0] };
				}
				return null;
			})()
		: null;

	return (
		<div className="checklist">
			{data.map((section, index) => {
				const sectionHeading = section.ui.heading;
				const groups = section.groups;
				const sortedGroups = getSortedGroups(groups);
				const mode = getModeForSection(sectionHeading);
				const showSelectedOnly = sectionSelectedOnly[sectionHeading] || false;

				const sectionHeader = (
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
						{renderHeaderControls(sectionHeading, groups)}
					</div>
				);

				// In quick mode, render flat pills without subcategory headings.
				// If showSelectedOnly is active, skip this branch so the all-items selected view renders instead.
				if (mode === "quick" && !showSelectedOnly) {
					let quickPicks = getQuickPicksFlat(groups);
					// If no quickPick items exist, fall through to short-mode rendering below
					if (quickPicks.length > 0) {
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
									{renderHeaderControls(sectionHeading, groups)}
								</div>

								{!collapsedCategories[sectionHeading] && (
									<div className="subcategories">
										{index === 0 && headerContent}
										<div className="pill-grid" style={{ padding: "1rem" }}>
											{quickPicks.map(renderPill)}
										</div>
										{globalFirstSelected?.sectionHeading === sectionHeading && selectionHint}
										{afterGroupContent &&
											quickPicks.some((it) => it.item === afterGroupContent.itemName) &&
											afterGroupContent.node}
									</div>
								)}
							</div>
						);
					}
				}

				// Short mode with subcategory icons — one row per subcategory, icon inline, no heading text
				if (mode === "short" && Object.keys(subcategoryIcons).length > 0 && !showSelectedOnly) {
					return (
						<div key={sectionHeading} className={`category category-${index % 8}`}>
							{sectionHeader}
							{!collapsedCategories[sectionHeading] && (
								<div className="subcategories">
									{index === 0 && headerContent}
									{sortedGroups.map(([groupKey, group]) => {
										const visibleItems = getVisibleItems(group.items, mode);
										if (visibleItems.length === 0) return null;
										return (
											<div key={groupKey} className="subcategory subcategory--compact">
												<div className="pill-grid pill-grid--row">
													{subcategoryIcons[groupKey] &&
														React.createElement(subcategoryIcons[groupKey], {
															className: "subcategory-icon-inline",
															"aria-hidden": true,
														})}
													{visibleItems.map(renderPill)}
												</div>
												{globalFirstSelected?.sectionHeading === sectionHeading &&
													groupKey === globalFirstSelected?.groupKey &&
													selectionHint}
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				}

				// Short / full modes — render with subcategory headings.
				// Exception: when showSelectedOnly, render a flat cloud sorted strong (double-clicked) first.

				if (showSelectedOnly) {
					const allSelected = [];
					for (const [, group] of sortedGroups) {
						for (const item of group.items) {
							if (selectedItems[item.item]) {
								allSelected.push(item);
							}
						}
					}
					allSelected.sort((a, b) => {
						const aScore = selectedItems[a.item] === "double-clicked" ? 0 : 1;
						const bScore = selectedItems[b.item] === "double-clicked" ? 0 : 1;
						return aScore - bScore;
					});
					return (
						<div key={sectionHeading} className={`category category-${index % 8}`}>
							{sectionHeader}
							{!collapsedCategories[sectionHeading] && (
								<div className="subcategories">
									{index === 0 && headerContent}
									<p className="checklist-selected-only-label">Showing selected only</p>
									<div className="pill-grid" style={{ padding: "1rem" }}>
										{allSelected.map(renderPill)}
									</div>
								</div>
							)}
						</div>
					);
				}

				{
					return (
						<div key={sectionHeading} className={`category category-${index % 8}`}>
							{sectionHeader}

							{!collapsedCategories[sectionHeading] && (
								<div className="subcategories">
									{index === 0 && headerContent}
									{sortedGroups.map(([groupKey, group]) => {
										const groupHeading = group.ui?.heading || groupKey;
										const visibleItems = getVisibleItems(group.items, mode);
										if (visibleItems.length === 0) return null;

										return (
											<div key={groupKey} className="subcategory">
												<h4 className="subcategory-title">
													{subcategoryIcons[groupKey] &&
														React.createElement(subcategoryIcons[groupKey], {
															className: "subcategory-icon",
															"aria-hidden": true,
														})}
													{groupHeading}
												</h4>
												<div className="pill-grid">{visibleItems.map(renderPill)}</div>
												{globalFirstSelected?.sectionHeading === sectionHeading &&
													groupKey === globalFirstSelected?.groupKey &&
													selectionHint}
												{afterGroupContent &&
													visibleItems.some((it) => it.item === afterGroupContent.itemName) &&
													afterGroupContent.node}
											</div>
										);
									})}
								</div>
							)}
						</div>
					);
				}
			})}
		</div>
	);
};

export default Checklist;
