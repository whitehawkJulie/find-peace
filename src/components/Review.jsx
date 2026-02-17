import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import { renderAllPills, renderPills, renderTextList, filterByState } from "../utils/renderHelpers";

const Review = () => {
	const {
		observation,
		feelings,
		needs,
		needExplorations,
		strategies,
		guessObservation,
		guessFeelings,
		guessNeeds,
		requestOfSelf,
		requestOfOther,
		saveSession,
	} = useWizard();

	const [saved, setSaved] = useState(false);

	const strongFeelings = filterByState(feelings, "double-clicked");
	const regularFeelings = filterByState(feelings, "clicked");
	const metNeeds = filterByState(needs, "double-clicked");
	const unmetNeeds = filterByState(needs, "clicked");
	const exploredNeeds = Object.entries(needExplorations).filter(([_, v]) => v.completed);
	const hasStrategies = Object.values(strategies).some((s) => s.length > 0);
	const guessFeelingsSelected = Object.keys(guessFeelings).length > 0;
	const guessNeedsSelected = Object.keys(guessNeeds).length > 0;
	const hasGuesses = guessObservation || guessFeelingsSelected || guessNeedsSelected;
	const hasRequests = requestOfSelf || requestOfOther;

	const generateSummaryText = () => {
		let output = [];

		if (observation && observation.trim() !== "") {
			output.push(`**Observation**\n${observation.trim()}\n`);
		}

		if (strongFeelings.length > 0 || regularFeelings.length > 0) {
			output.push("**Feelings**");
			const feelingsText = [
				...strongFeelings.map((f) => `**${f}**`),
				...regularFeelings.map((f) => f),
			].join(", ");
			output.push(feelingsText + "\n");
		}

		if (metNeeds.length > 0) {
			output.push("**Met Needs**");
			output.push(metNeeds.join(", ") + "\n");
		}

		if (unmetNeeds.length > 0) {
			output.push("**Unmet Needs**");
			output.push(unmetNeeds.join(", ") + "\n");
		}

		if (exploredNeeds.length > 0) {
			output.push("**Need Explorations**");
			for (const [name, exp] of exploredNeeds) {
				output.push(`\n*${name}*`);
				if (exp.bodyFeeling) output.push(`In my body: ${exp.bodyFeeling}`);
				if (exp.whenMet) output.push(`When met: ${exp.whenMet}`);
				if (exp.beauty) output.push(`The beauty: ${exp.beauty}`);
				if (exp.blackHole) output.push(`Black hole need: ${exp.blackHole}`);
			}
			output.push("");
		}

		if (hasStrategies) {
			output.push("**Strategies**");
			for (const [need, strats] of Object.entries(strategies)) {
				if (strats.length > 0) {
					output.push(`\n*${need}*`);
					strats.forEach((s) => output.push(`- ${s}`));
				}
			}
			output.push("");
		}

		if (hasGuesses) {
			output.push("**The Other Person's Perspective**");
			if (guessObservation) output.push(`They might have observed: ${guessObservation}`);
			const gf = filterByState(guessFeelings, "clicked");
			if (gf.length > 0) output.push(`They might be feeling: ${gf.join(", ")}`);
			const gn = filterByState(guessNeeds, "clicked");
			if (gn.length > 0) output.push(`Their unmet needs might include: ${gn.join(", ")}`);
			output.push("");
		}

		if (hasRequests) {
			output.push("**Requests**");
			if (requestOfSelf) output.push(`Of myself: ${requestOfSelf}`);
			if (requestOfOther) output.push(`Of them: ${requestOfOther}`);
			output.push("");
		}

		navigator.clipboard.writeText(output.join("\n")).then(() => {
			alert("Summary copied to clipboard!");
		});
	};

	const handleSave = () => {
		saveSession();
		setSaved(true);
	};

	return (
		<div className="review">
			<p>Here's a summary of everything you've worked through. Take a moment to appreciate the journey you've just taken.</p>

			{observation && (
				<div className="review-section">
					<h3>Observation</h3>
					<p>{observation}</p>
				</div>
			)}

			{(strongFeelings.length > 0 || regularFeelings.length > 0) && (
				<div className="review-section">
					<h3>Feelings</h3>
					{renderAllPills(feelings, "feeling")}
				</div>
			)}

			{metNeeds.length > 0 && (
				<div className="review-section">
					<h3>Met needs</h3>
					{renderPills(needs, "double-clicked", "need")}
				</div>
			)}

			{unmetNeeds.length > 0 && (
				<div className="review-section">
					<h3>Unmet needs</h3>
					{renderPills(needs, "clicked", "need")}
				</div>
			)}

			{exploredNeeds.length > 0 && (
				<div className="review-section">
					<h3>Need explorations</h3>
					{exploredNeeds.map(([name, exp]) => (
						<div key={name} className="review-exploration">
							<strong>{name}</strong>
							{exp.bodyFeeling && <p><em>In my body:</em> {exp.bodyFeeling}</p>}
							{exp.whenMet && <p><em>When met:</em> {exp.whenMet}</p>}
							{exp.beauty && <p><em>The beauty:</em> {exp.beauty}</p>}
							{exp.blackHole && <p><em>Black hole need:</em> {exp.blackHole}</p>}
						</div>
					))}
				</div>
			)}

			{hasStrategies && (
				<div className="review-section">
					<h3>Strategies</h3>
					{Object.entries(strategies)
						.filter(([_, strats]) => strats.length > 0)
						.map(([need, strats]) => (
							<div key={need} className="review-strategies">
								<strong>{need}:</strong>
								<ul>
									{strats.map((s, i) => (
										<li key={i}>{s}</li>
									))}
								</ul>
							</div>
						))}
				</div>
			)}

			{hasGuesses && (
				<div className="review-section">
					<h3>The other person</h3>
					{guessObservation && <p><em>They might have observed:</em> {guessObservation}</p>}
					{guessFeelingsSelected && (
						<>
							<p><em>They might be feeling:</em></p>
							{renderAllPills(guessFeelings, "feeling")}
						</>
					)}
					{guessNeedsSelected && (
						<>
							<p><em>Their unmet needs might include:</em></p>
							{renderAllPills(guessNeeds, "need")}
						</>
					)}
				</div>
			)}

			{hasRequests && (
				<div className="review-section">
					<h3>Requests</h3>
					{requestOfSelf && <p><strong>Of myself:</strong> {requestOfSelf}</p>}
					{requestOfOther && <p><strong>Of them:</strong> {requestOfOther}</p>}
				</div>
			)}

			<hr />
			<div className="review-actions">
				<button onClick={generateSummaryText}>Copy to Clipboard</button>
				<button onClick={handleSave} disabled={saved}>
					{saved ? "Saved to Journal" : "Save to Journal"}
				</button>
			</div>
		</div>
	);
};

Review.title = "Review";
Review.helpContent = (
	<>
		<p>This is a summary of everything you've worked through in this session.</p>
		<p>You can copy it to your clipboard to paste somewhere, or save it to your journal to revisit later.</p>
	</>
);

export default Review;
