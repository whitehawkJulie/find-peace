import React from "react";
import allNeeds from "../data/AllNeedsFlat";

// Build a flat lookup at module scope: needLabel → need object
const needLookup = {};
for (const need of allNeeds) {
	needLookup[need.label] = need;
}

// Look up which top-level family a need belongs to (e.g. "Love" → "Connection")
export const getNeedCategory = (needName) => {
	const entry = needLookup[needName];
	return entry ? entry.family : null;
};

// Look up the short description of a need (e.g. "Love" → "Unconditional acceptance and care")
export const getNeedMeaning = (needName) => {
	const entry = needLookup[needName];
	return entry ? entry.helpText : null;
};

// Look up the full flat data object for a need
export const getNeedData = (needName) => {
	return needLookup[needName] ?? null;
};

// Return the themes (unpackingType) array for a need — already resolved in the flat data
export const resolveNeedUnpackingType = (needName) => {
	const entry = needLookup[needName];
	return entry ? (entry.tags?.themes ?? []) : [];
};

// Return the whereMet array for a need — already resolved in the flat data
export const resolveNeedWhereMet = (needName) => {
	const entry = needLookup[needName];
	return entry ? (entry.tags?.whereMet ?? []) : [];
};

// Utility functions to extract selected items by type
export const getClickedItems = (selectedItems) =>
	Object.entries(selectedItems)
		.filter(([_, value]) => value === "clicked")
		.map(([item]) => item);

export const getDoubleClickedItems = (selectedItems) =>
	Object.entries(selectedItems)
		.filter(([_, value]) => value === "double-clicked")
		.map(([item]) => item);

/* i thnk this replaces the previous two?? */
export const filterByState = (itemsObject, targetState) => {
	return Object.entries(itemsObject)
		.filter(([_, state]) => state === targetState)
		.map(([item]) => item);
};

export const getAllSelectedItems = (selectedItems) => Object.keys(selectedItems);

/* in case I want to render just one pill
	params eg happy, clicked, feeling
*/
export const renderPill = (item, type = "clicked", category = "feeling") => {
	if (!["clicked", "double-clicked"].includes(type)) return "Error, called with type=" + type;
	if (!["feeling", "need"].includes(category)) return "Error, called with category=" + category;

	return (
		<div key={item} className={`pill ${category} ${type}`}>
			{item}
		</div>
	);
};

// Renders pills for either "clicked" or "double-clicked" items
export const renderPills = (selectedItems, type = "clicked", category = "feeling") => {
	if (!["clicked", "double-clicked"].includes(type)) return "Error, called with type=" + type;
	if (!["feeling", "need"].includes(category)) return "Error, called with type=" + type;

	return (
		<div className="pill-grid  cloud">
			{Object.entries(selectedItems)
				.filter(([_, value]) => value === type)
				.map(([item]) => (
					<div key={item} className={`pill ${category} ${type}`}>
						{item}
					</div>
				))}
		</div>
	);
};

// Renders all selected pills, both clicked and double-clicked
export const renderAllPills = (selectedItems, category = "feeling") => {
	if (!["feeling", "need"].includes(category)) return "Error, called with category=" + category;

	return (
		<div className="pill-grid cloud">
			{Object.entries(selectedItems).map(([item, type]) => (
				<div key={item} className={`pill ${category} ${type}`}>
					{item}
				</div>
			))}
		</div>
	);
};

// TO DO: add categories here, to style the words with bold or whatever, if feelings or needs?

// Renders plain English list of selected items
export const renderTextList = (selectedItems, type = "clicked") => {
	if (!["clicked", "double-clicked"].includes(type)) return "";

	const items = Object.entries(selectedItems)
		.filter(([_, value]) => value === type)
		.map(([item]) => item);

	if (items.length === 0) return "";
	if (items.length === 1) return items[0];
	return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
};

// Renders Markdown-formatted bullet list
export const renderMarkdownList = (selectedItems, type) => {
	if (!["clicked", "double-clicked"].includes(type)) return "";

	return Object.entries(selectedItems)
		.filter(([_, value]) => value === type)
		.map(([item]) => `- ${item}`)
		.join("\n");
};
