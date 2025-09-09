import React from "react";
import { useWizard } from "./WizardContext";
import {
	getClickedItems,
	getDoubleClickedItems,
	renderPills,
	renderTextList,
	renderMarkdownList,
} from "../utils/renderHelpers";

const Review = () => {
	const { observation, feelings, needs } = useWizard();

	const handleCopy = () => {
		const markdown = `**Observation**\n${observation}\n\n**Feelings (strong)**\n
		${renderTextList(feelings, "double-clicked")}\n\n**Feelings (felt)**\n
		${renderTextList(feelings, "clicked")}\n\n**Needs (strong)**\n
		${renderTextList(needs, "double-clicked")}\n\n**Needs (met)**\n
		${renderTextList(needs, "clicked")}`;

		navigator.clipboard.writeText(markdown).then(() => {
			alert("Summary copied to clipboard!");
		});
	};

	return (
		<div>
			<h2>Review</h2>

			<h3>Observation</h3>
			<p>{observation}</p>

			<h3>Feelings</h3>
			<p>
				<strong>Strong:</strong>
			</p>
			{renderPills(feelings, "double-clicked", "feeling")}
			<p>
				<strong>Felt:</strong>
			</p>
			{renderPills(feelings, "clicked", "feeling")}

			<h3>Needs</h3>
			<p>
				<strong>Strong:</strong>
			</p>
			{renderPills(needs, "double-clicked", "need")}
			<p>
				<strong>Met:</strong>
			</p>
			{renderPills(needs, "clicked", "need")}

			<button onClick={handleCopy}>Copy to Clipboard</button>
		</div>
	);
};

export default Review;
