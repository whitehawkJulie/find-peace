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
		const markdown = `**Observation**\n${observation}\n\n**Feelings (strong)**\n${renderMarkdownList(
			feelings,
			"double"
		)}\n\n**Feelings (felt)**\n${renderMarkdownList(feelings, "click")}\n\n**Needs (strong)**\n${renderMarkdownList(
			needs,
			"double"
		)}\n\n**Needs (met)**\n${renderMarkdownList(needs, "click")}`;

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
			{renderPills(feelings, "double")}
			<p>
				<strong>Felt:</strong>
			</p>
			{renderPills(feelings, "click")}

			<h3>Needs</h3>
			<p>
				<strong>Strong:</strong>
			</p>
			{renderPills(needs, "double")}
			<p>
				<strong>Met:</strong>
			</p>
			{renderPills(needs, "click")}

			<button onClick={handleCopy}>Copy to Clipboard</button>
		</div>
	);
};

export default Review;
