import React from "react";
import { useWizard } from "./WizardContext";
import { renderAllPills, renderPills, renderTextList, filterByState } from "../utils/renderHelpers";

const Review = () => {
	const { observation, feelings, needs } = useWizard();

	const handleCopy = () => {
		const markdown = `
		**Observation**\n${observation}\n\n
		**Feelings**\n**${renderTextList(feelings, "double-clicked")}**\n\n
			**${renderTextList(feelings, "clicked")}**\n\n
		**Needs (unmet)**\n${renderTextList(needs, "double-clicked")}\n\n
		**Needs (met)**\n${renderTextList(needs, "clicked")}`;

		navigator.clipboard.writeText(markdown).then(() => {
			alert("Summary copied to clipboard!");
		});
	};

	const generateSummaryText = () => {
		let output = [];

		// Observation
		if (observation && observation.trim() !== "") {
			output.push(`**Observation**\n${observation.trim()}\n`);
		}

		// Feelings
		const strongFeelings = filterByState(feelings, "double-clicked");
		const regularFeelings = filterByState(feelings, "clicked");

		if (strongFeelings.length > 0 || regularFeelings.length > 0) {
			output.push("**Feelings**");

			const feelingsText = [...strongFeelings.map((f) => `**${f}**`), ...regularFeelings.map((f) => f)].join(
				", "
			);

			output.push(feelingsText + "\n");
		}

		// Met Needs
		const metNeeds = filterByState(needs, "double-clicked");
		if (metNeeds.length > 0) {
			output.push("**Met Needs**");
			output.push(metNeeds.join(", ") + "\n");
		}

		// Unmet Needs
		const unmetNeeds = filterByState(needs, "clicked");
		if (unmetNeeds.length > 0) {
			output.push("**Unmet Needs**");
			output.push(unmetNeeds.join(", ") + "\n");
		}

		navigator.clipboard.writeText(output.join("\n")).then(() => {
			alert("Summary copied to clipboard!");
		});
	};

	return (
		<div>
			<h2>Review</h2>

			{observation && (
				<>
					<h3>Observation</h3>
					<p>{observation}</p>
				</>
			)}

			{feelings.length > 0 && (
				<>
					<h3>Feelings</h3>
					{renderAllPills(feelings, "feeling")}
				</>
			)}

			{/* Show met needs if there are any */}
			{filterByState(needs, "double-clicked").length > 0 && (
				<>
					<h3>Met needs – how lovely!</h3>
					{renderPills(needs, "double-clicked", "need")}
				</>
			)}

			<h3>Needs tanks I need to fill up</h3>

			{renderPills(needs, "clicked", "need")}
			<hr />
			<button onClick={generateSummaryText}>Copy to Clipboard</button>
		</div>
	);
};

export default Review;
