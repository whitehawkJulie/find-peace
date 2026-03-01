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
		familyResponses,
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
	const hasFamilyResponses = Object.values(familyResponses).some((v) =>
		Array.isArray(v) ? v.length > 0 : v && String(v).trim() !== "",
	);
	const hasStrategies = Object.values(strategies).some((s) => s.length > 0);
	const guessFeelingsSelected = Object.keys(guessFeelings).length > 0;
	const guessNeedsSelected = Object.keys(guessNeeds).length > 0;
	const hasGuesses = guessObservation || guessFeelingsSelected || guessNeedsSelected;
	const hasRequests = requestOfSelf || requestOfOther;

	const outputHeading = (text, output) => {
		output.push("---------------------------------");
		output.push(`**${text}**`);
		output.push("---------------------------------");
	};

	const generateSummaryText = () => {
		let output = [];

		outputHeading("What was happening for you?", output);

		const obsText =
			typeof observation === "string"
				? observation.trim()
				: [observation?.moment, observation?.actions, observation?.camera].filter((s) => s?.trim()).join("\n");
		if (obsText) {
			output.push(`**Observation**\n${obsText}\n`);
		}

		if (strongFeelings.length > 0 || regularFeelings.length > 0) {
			output.push("**Feelings**");
			const feelingsText = [...strongFeelings.map((f) => `**${f}**`), ...regularFeelings.map((f) => f)].join(
				", ",
			);
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
			outputHeading("The Other Person's Perspective", output);

			if (guessObservation) output.push(`They might have observed: ${guessObservation}`);
			const gf = filterByState(guessFeelings, "clicked");
			if (gf.length > 0) output.push(`They might be feeling: ${gf.join(", ")}`);
			const gn = filterByState(guessNeeds, "clicked");
			if (gn.length > 0) output.push(`Their unmet needs might include: ${gn.join(", ")}`);
			output.push("");
		}

		if (hasRequests) {
			outputHeading("Requests", output);

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

	// TODO: add the headings and stuff to the generateSummaryText fn as well
	return (
		<div className="review">
			<p>
				Here's a summary of everything you've worked through. Take a moment to appreciate the journey you've
				just taken.
			</p>
			<h2>What was happening for you?</h2>

			{(observation?.moment || observation?.actions || observation?.camera) && (
				<div className="review-section">
					<h3>Observation</h3>
					{observation.moment && (
						<p>
							<strong>The moment:</strong> {observation.moment}
						</p>
					)}
					{observation.actions && (
						<p>
							<strong>What happened:</strong> {observation.actions}
						</p>
					)}
					{/* {observation.camera && <p><strong>What others would see:</strong> {observation.camera}</p>} */}
				</div>
			)}

			{(strongFeelings.length > 0 || regularFeelings.length > 0) && (
				<div className="review-section">
					<h3>Feelings</h3>
					{/* {renderAllPills(feelings, "feeling")} */}
					<p>
						<strong>Regular feelings:</strong> {renderTextList(feelings, "clicked")}
					</p>
					<p>
						<strong>Strong feelings:</strong> {renderTextList(feelings, "double-clicked")}
					</p>
				</div>
			)}

			{hasFamilyResponses && (
				<div className="review-section">
					<h3>Feeling exploration</h3>
					{Object.entries(familyResponses).map(([key, value]) => {
						if (!value || (Array.isArray(value) && value.length === 0) || String(value).trim() === "")
							return null;
						return <p key={key}>{Array.isArray(value) ? value.join(", ") : String(value)}</p>;
					})}
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
							{exp.bodyFeeling && (
								<p>
									<em>In my body:</em> {exp.bodyFeeling}
								</p>
							)}
							{exp.whenMet && (
								<p>
									<em>When met:</em> {exp.whenMet}
								</p>
							)}
							{exp.beauty && (
								<p>
									<em>The beauty:</em> {exp.beauty}
								</p>
							)}
							{exp.blackHole && (
								<p>
									<em>Black hole need:</em> {exp.blackHole}
								</p>
							)}
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

			<hr></hr>
			<h2>Your guesses for the other person</h2>

			{hasGuesses && (
				<div className="review-section">
					<h3>The other person</h3>
					{guessObservation && (
						<p>
							<em>They might have observed:</em> {guessObservation}
						</p>
					)}
					{guessFeelingsSelected && (
						<>
							<p>
								<em>They might be feeling:</em>
							</p>
							{renderAllPills(guessFeelings, "feeling")}
						</>
					)}
					{guessNeedsSelected && (
						<>
							<p>
								<em>Their unmet needs might include:</em>
							</p>
							{renderAllPills(guessNeeds, "need")}
						</>
					)}
				</div>
			)}
			<hr></hr>

			<h2>What you might like to do next</h2>

			{hasRequests && (
				<div className="review-section">
					<h3>Requests</h3>
					{requestOfSelf && (
						<p>
							<strong>Of myself:</strong> {requestOfSelf}
						</p>
					)}
					{requestOfOther && (
						<p>
							<strong>Of them:</strong> {requestOfOther}
						</p>
					)}
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
		<p>
			This is a summary of everything you've worked through. Take a moment to read through it — you might be
			surprised how much has shifted since you started.
		</p>

		<h4>Putting it all together</h4>
		<p>
			The classic NVC template sounds like this: "When I see/hear [observation], I feel [feeling], because I need
			[need]. Would you be willing to [request]?"
		</p>
		<p>
			You don't have to say it exactly like that — it can sound robotic. What matters is that all four elements
			are present: a clean observation, genuine feelings, universal needs, and a concrete request.
		</p>

		<h4>What to do with this</h4>
		<ul>
			<li>
				<strong>Copy to clipboard</strong> — paste into a note, message, or journal.
			</li>
			<li>
				<strong>Save to journal</strong> — keep it here so you can revisit your sessions and track patterns over
				time.
			</li>
			<li>
				You might use this as preparation for a real conversation, or simply as a self-empathy exercise — both
				are valuable.
			</li>
		</ul>

		<h4>A note on sharing</h4>
		<p>
			If you plan to share this with someone, remember: leading with empathy (guessing their feelings and needs
			first) is often more effective than leading with your own. People are much more willing to hear us after
			they feel heard.
		</p>
	</>
);

export default Review;
