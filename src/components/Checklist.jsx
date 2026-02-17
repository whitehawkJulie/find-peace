import React, { useState } from "react";
import Pill from "./Pill";
import "./Checklist.css";

const defaultFauxLabel = {
	feelings: {
		title: "Words for pain...",
		hint: "These words carry real pain, but they describe what happened to you more than what you're feeling inside. Tap any that resonate.",
	},
	needs: {
		title: "Things we think we need...",
		hint: "These often feel like needs, but they're actually strategies — specific ways we try to get our deeper needs met. Tap any that resonate to see what's underneath.",
	},
};

const Checklist = ({
	data,
	selectedItems,
	setSelectedItems,
	type = "feelings",
	fauxItems = null,
	renderFauxUnpack = null,
}) => {
	// Start with all categories collapsed
	const [collapsedCategories, setCollapsedCategories] = useState(() => {
		const initial = {};
		Object.keys(data).forEach((key) => {
			initial[key] = true;
		});
		return initial;
	});

	const [expandedFaux, setExpandedFaux] = useState(null);

	// Build a Set of faux item names for quick lookup
	const fauxNameSet = new Set();
	const fauxByCategory = {};
	if (fauxItems) {
		fauxItems.forEach((fauxItem) => {
			fauxNameSet.add(fauxItem.item);
			const cat = fauxItem._homeCategory;
			if (cat) {
				if (!fauxByCategory[cat]) fauxByCategory[cat] = [];
				fauxByCategory[cat].push(fauxItem);
			}
		});
	}

	// Toggle between clicked and double-clicked states
	const handleClick = (item) => {
		// Faux items: toggle selection + expand inline unpack
		if (fauxNameSet.has(item)) {
			const newState = { ...selectedItems };
			if (newState[item] === "clicked") {
				delete newState[item];
				setSelectedItems(newState);
				setExpandedFaux(null);
			} else {
				newState[item] = "clicked";
				setSelectedItems(newState);
				setExpandedFaux(item);
			}
			return;
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
		if (fauxNameSet.has(item)) return;

		const newState = { ...selectedItems };
		newState[item] = "double-clicked";
		setSelectedItems(newState);
	};

	// Count selected items within a category (including faux items)
	// Handles both flat (value is array of items) and nested (value is object of subcategories)
	const countSelectedInGroup = (value) => {
		let count = 0;
		if (Array.isArray(value)) {
			value.forEach(({ item }) => {
				if (selectedItems[item]) count++;
			});
		} else if (typeof value === "object" && value !== null) {
			Object.values(value).forEach((items) => {
				if (Array.isArray(items)) {
					items.forEach(({ item }) => {
						if (selectedItems[item]) count++;
					});
				}
			});
		}
		return count;
	};

	const countSelected = (categoryValue, categoryFauxItems) => {
		let count = countSelectedInGroup(categoryValue);
		if (categoryFauxItems) {
			categoryFauxItems.forEach(({ item }) => {
				if (selectedItems[item]) count++;
			});
		}
		return count;
	};

	const toggleCategory = (category) => {
		setCollapsedCategories((prev) => ({
			...prev,
			[category]: !prev[category],
		}));
	};

	// Render a pill grid for an array of items
	const renderPillGrid = (items) => (
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
	);

	// Render the content inside a category — handles both flat and nested structures
	const renderCategoryContent = (categoryValue) => {
		if (Array.isArray(categoryValue)) {
			// Flat structure: value is directly an array of items (e.g. feelings)
			// No subcategory headers needed
			return <div className="subcategory">{renderPillGrid(categoryValue)}</div>;
		}

		// Nested structure: value is { subcategory: [items] } (e.g. needs)
		return Object.entries(categoryValue).map(([subcategory, items]) => (
			<div key={subcategory} className="subcategory">
				<h4 className="subcategory-title">{subcategory}</h4>
				{renderPillGrid(items)}
			</div>
		));
	};

	return (
		<div className="checklist">
			{Object.entries(data).map(([mainCategory, categoryValue], index) => {
				const categoryFaux = fauxByCategory[mainCategory] || [];
				const selectedCount = countSelected(categoryValue, categoryFaux);
				const isCollapsed = collapsedCategories[mainCategory];

				return (
					<div key={mainCategory} className={`category category-${index % 8}`}>
						<div
							className="category-header"
							onClick={() => toggleCategory(mainCategory)}
							title={isCollapsed ? "Expand section" : "Collapse section"}>
							<h3 className="category-title">
								{mainCategory}
								{isCollapsed && selectedCount > 0 && (
									<span className="selected-count">{selectedCount}</span>
								)}
							</h3>
							<span className="collapse-icon">{isCollapsed ? "▼" : "▲"}</span>
						</div>

						<div className={`subcategories ${isCollapsed ? "collapsed" : "expanded"}`}>
							{renderCategoryContent(categoryValue)}

							{/* Faux items merged into this category */}
							{categoryFaux.length > 0 && (
								<div className="subcategory faux-subcategory">
									<h4 className="subcategory-title faux-subcategory-title">
										{(defaultFauxLabel[type] || defaultFauxLabel.feelings).title}
									</h4>
									<p className="faux-subcategory-hint">
										{(defaultFauxLabel[type] || defaultFauxLabel.feelings).hint}
									</p>
									<div className="pill-grid">
										{categoryFaux.map(({ item }) => (
											<Pill
												key={item}
												item={item}
												type={type}
												state={selectedItems[item] || ""}
												onClick={() => handleClick(item)}
											/>
										))}
									</div>

									{/* Inline unpack for the currently expanded faux item */}
									{expandedFaux &&
										categoryFaux.some((f) => f.item === expandedFaux) &&
										renderFauxUnpack && (
											<div className="faux-inline-unpack">
												{renderFauxUnpack(expandedFaux)}
											</div>
										)}
								</div>
							)}
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default Checklist;
