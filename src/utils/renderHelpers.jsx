import React from "react";

// Utility functions to extract selected items by type
export const getClickedItems = (selectedItems) =>
	Object.entries(selectedItems)
		.filter(([_, value]) => value === "click")
		.map(([item]) => item);

export const getDoubleClickedItems = (selectedItems) =>
	Object.entries(selectedItems)
		.filter(([_, value]) => value === "double")
		.map(([item]) => item);

export const getAllSelectedItems = (selectedItems) => Object.keys(selectedItems);

/* in case I want to render just one pill
	params eg happy, click, feeling
*/
export const renderPill = (item, type = "click", category = "feeling") => {
	if (!["click", "double"].includes(type)) return "Error, called with type=" + type;
	if (!["feeling", "need"].includes(category)) return "Error, called with category=" + category;

	return (
		<div key={item} className={`pill ${category} ${type}`}>
			{item}
		</div>
	);
};

// Renders pills for either "click" or "double" items
export const renderPills = (selectedItems, type = "click", category = "feeling") => {
	if (!["click", "double"].includes(type)) return "Error, called with type=" + type;
	if (!["feeling", "need"].includes(category)) return "Error, called with type=" + type;

	return (
		<div className="pill-grid">
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

// TO DO: add categories here, to style the words with bold or whatever, if feelings or needs?

// Renders plain English list of selected items
export const renderTextList = (selectedItems, type = "click") => {
	if (!["click", "double"].includes(type)) return "";

	const items = Object.entries(selectedItems)
		.filter(([_, value]) => value === type)
		.map(([item]) => item);

	if (items.length === 0) return "";
	if (items.length === 1) return items[0];
	return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
};

// Renders Markdown-formatted bullet list
export const renderMarkdownList = (selectedItems, type) => {
	if (!["click", "double"].includes(type)) return "";

	return Object.entries(selectedItems)
		.filter(([_, value]) => value === type)
		.map(([item]) => `- ${item}`)
		.join("\n");
};
