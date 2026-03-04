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
	{ key: "quick", label: "Quick picks", icon: "●" },
	{ key: "short", label: "Short list", icon: "●●" },
	{ key: "full", label: "Full list", icon: "●●●" },
];

const Checklist = ({
	data,
	selectedItems,
	setSelectedItems,
	type = "feelings",
	categoryHelpIcons = {},
	onItemClick = null,
	onIndicatorClick = null,
	onInfoClick = null,
	showListModeToggle = false,
	defaultListMode = "short",
	regulationOverlay = false,
	regulationToggle = null,
}) => {
	const [collapsedCategories, setCollapsedCategories] = useState({});
	// Per-section list mode, keyed by section heading
	const [sectionModes, setSectionModes] = useState({});
	// Per-section "show selected only" toggle, keyed by section heading
	const [sectionSelectedOnly, setSectionSelectedOnly] = useState({});

	const getModeForSection = (heading) => sectionModes[heading] || defaultListMode;

	const setSectionMode = (heading, mode) => {
		setSectionModes((prev) => ({ ...prev, [heading]: mode }));
	};

	const toggleSelectedOnly = (heading) => {
		setSectionSelectedOnly((prev) => ({ ...prev, [heading]: !prev[heading] }));
	};

	const handleClick = (item, itemData) => {
		if (onItemClick) {
			const proceed = onItemClick(itemData);
			if (proceed === false) return;
		}

		const newState = { ...selectedItems };

		if (type === "needs") {
			// Simple toggle for needs: selected ↔ unselected (no double-click)
			if (newState[item]) {
				delete newState[item];
			} else {
				newState[item] = "clicked";
			}
		} else {
			// Click cycle: unselected → clicked → double-clicked → unselected
			if (newState[item] === "double-clicked") {
				delete newState[item];
			} else if (newState[item] === "clicked") {
				newState[item] = "double-clicked";
			} else {
				newState[item] = "clicked";
			}
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

	const getQuickPicksFlat = (groups, sectionRegType) => {
		const picks = [];
		const sorted = getSortedGroups(groups);
		for (const [, group] of sorted) {
			for (const item of group.items) {
				if (item.ui?.quickPick) {
					picks.push({
						...item,
						_resolvedRegType: item.regulationType || group.regulationType || sectionRegType || null,
					});
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
		const tooltip = itemData.description || itemData.meaning || "";

		// Determine indicator type
		let indicator = null;
		if (itemData.type === "storyWord") {
			indicator = "plus";
		} else if (itemData.clarify?.type === "murky" && selectedItems[item]) {
			indicator = "chevron";
		} else if (type === "needs" && selectedItems[item] && onInfoClick) {
			indicator = "info";
		}

		return (
			<Pill
				key={item}
				item={item}
				type={type}
				state={selectedItems[item] || ""}
				meaning={tooltip}
				indicator={indicator}
				regulationType={itemData._resolvedRegType || null}
				regulationOverlay={regulationOverlay}
				onClick={() => handleClick(item, itemData)}
				onIndicatorClick={
					indicator === "chevron"
						? () => onIndicatorClick?.(itemData)
						: indicator === "info"
						? () => onInfoClick?.(item)
						: undefined
				}
			/>
		);
	};

	const sectionHasTiers = (groups) => {
		return Object.values(groups).some((group) =>
			group.items.some((it) => it.ui?.quickPick || it.ui?.tier === "more"),
		);
	};

	const renderRegulationToggle = () => {
		if (!regulationToggle) return null;
		return (
			<span className="regulation-toggle-group">
				<button
					className={`regulation-toggle ${regulationToggle.active ? "regulation-toggle-active" : ""}`}
					title="Colour by body state"
					onClick={(e) => {
						e.stopPropagation();
						regulationToggle.onToggle();
					}}>
					🧍
				</button>
				{regulationToggle.onHelp && (
					<button
						className="regulation-help-btn"
						title="What's this?"
						onClick={(e) => {
							e.stopPropagation();
							regulationToggle.onHelp();
						}}>
						?
					</button>
				)}
			</span>
		);
	};

	const renderModeIcons = (sectionHeading, groups) => {
		if (!showListModeToggle || !sectionHasTiers(groups)) return null;
		const currentMode = getModeForSection(sectionHeading);
		return (
			<span className="mode-icons">
				{LIST_MODES.map((mode) => (
					<button
						key={mode.key}
						className={`mode-icon ${currentMode === mode.key ? "mode-icon-active" : ""}`}
						title={mode.label}
						onClick={(e) => {
							e.stopPropagation();
							setSectionMode(sectionHeading, mode.key);
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
				title={isActive ? "Show all" : "Show selected only"}
				onClick={(e) => {
					e.stopPropagation();
					toggleSelectedOnly(sectionHeading);
				}}>
				✓
			</button>
		);
	};

	const renderHeaderControls = (sectionHeading, groups, sectionIndex) => (
		<span className="category-controls">
			{sectionIndex === 0 && renderRegulationToggle()}
			{renderModeIcons(sectionHeading, groups)}
			{renderSelectedOnlyToggle(sectionHeading, groups)}
			<span className="collapse-icon">{collapsedCategories[sectionHeading] ? "▼" : "▲"}</span>
		</span>
	);

	return (
		<div className="checklist">
			{data.map((section, index) => {
				const sectionHeading = section.ui.heading;
				const groups = section.groups;
				const sortedGroups = getSortedGroups(groups);
				const mode = getModeForSection(sectionHeading);
				const sectionRegType = section.regulationType || null;
				const showSelectedOnly = sectionSelectedOnly[sectionHeading] || false;

				// In quick mode, render flat pills without subcategory headings
				if (mode === "quick") {
					let quickPicks = getQuickPicksFlat(groups, sectionRegType);
					if (showSelectedOnly) {
						quickPicks = quickPicks.filter((it) => selectedItems[it.item]);
					}
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
									{renderHeaderControls(sectionHeading, groups, index)}
								</div>

								{!collapsedCategories[sectionHeading] && (
									<div className="subcategories">
										<div className="pill-grid cloud" style={{ padding: "1rem" }}>
											{quickPicks.map(renderPill)}
										</div>
									</div>
								)}
							</div>
						);
					}
				}

				// Short / full modes — render with subcategory headings.
				// Exception: when showSelectedOnly, render a flat cloud sorted strong (double-clicked) first.
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
						{renderHeaderControls(sectionHeading, groups, index)}
					</div>
				);

				if (showSelectedOnly) {
					const allSelected = [];
					for (const [, group] of sortedGroups) {
						const groupRegType = group.regulationType || sectionRegType;
						for (const item of group.items) {
							if (selectedItems[item.item]) {
								allSelected.push({
									...item,
									_resolvedRegType: item.regulationType || groupRegType || null,
								});
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
									<div className="pill-grid cloud" style={{ padding: "1rem" }}>
										{allSelected.map(renderPill)}
									</div>
								</div>
							)}
						</div>
					);
				}

				return (
					<div key={sectionHeading} className={`category category-${index % 8}`}>
						{sectionHeader}

						{!collapsedCategories[sectionHeading] && (
							<div className="subcategories">
								{sortedGroups.map(([groupKey, group]) => {
									const groupHeading = group.ui?.heading || groupKey;
									const visibleItems = getVisibleItems(group.items, mode);
									if (visibleItems.length === 0) return null;

									const groupRegType = group.regulationType || sectionRegType;
									const resolvedItems = visibleItems.map((it) => ({
										...it,
										_resolvedRegType: it.regulationType || groupRegType || null,
									}));

									return (
										<div key={groupKey} className="subcategory">
											<h4 className="subcategory-title">{groupHeading}</h4>
											<div className="pill-grid">{resolvedItems.map(renderPill)}</div>
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
