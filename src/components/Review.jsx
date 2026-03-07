import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import { filterByState } from "../utils/renderHelpers";
import "./Review.css";

const Review = () => {
	const {
		observation,
		feelings,
		needs,
		needExplorations,
		strategies,
		feelingsExploreResponses,
		guessObservation,
		guessFeelings,
		guessNeeds,
		requestOfSelf,
		requestOfOther,
		saveSession,
	} = useWizard();

	const [saved, setSaved] = useState(false);
	const [copied, setCopied] = useState(false);

	const strongFeelings = filterByState(feelings, "double-clicked");
	const regularFeelings = filterByState(feelings, "clicked");
	const allFeelings = [...strongFeelings, ...regularFeelings];
	const metNeeds = filterByState(needs, "double-clicked");
	const unmetNeeds = filterByState(needs, "clicked");
	const exploredNeeds = Object.entries(needExplorations).filter(([_, v]) => v.completed);
	const hasFeelingsExplore = Object.values(feelingsExploreResponses).some((v) =>
		Array.isArray(v) ? v.length > 0 : v && String(v).trim() !== "",
	);
	const hasStrategies = Object.values(strategies).some((s) => s.length > 0);
	const guessFeelingsAll = [
		...filterByState(guessFeelings, "clicked"),
		...filterByState(guessFeelings, "double-clicked"),
	];
	const guessNeedsAll = [...filterByState(guessNeeds, "clicked"), ...filterByState(guessNeeds, "double-clicked")];
	const hasGuesses = guessObservation || guessFeelingsAll.length > 0 || guessNeedsAll.length > 0;
	const hasRequests = requestOfSelf || requestOfOther;

	const obsText =
		observation?.refined?.trim() || [observation?.moment, observation?.actions].filter((s) => s?.trim()).join("\n");

	const generateSummaryText = () => {
		const lines = [];
		const heading = (text) => {
			lines.push("", `— ${text} —`, "");
		};

		heading("What was happening for you?");

		if (obsText) {
			lines.push("Observation:", obsText, "");
		}

		if (allFeelings.length > 0) {
			const feelingsList = [...strongFeelings.map((f) => `${f} (strong)`), ...regularFeelings].join(", ");
			lines.push(`Feelings: ${feelingsList}`, "");
		}

		if (hasFeelingsExplore) {
			lines.push("Feeling exploration:");
			Object.entries(feelingsExploreResponses).forEach(([_, value]) => {
				const v = Array.isArray(value) ? value.join(", ") : String(value);
				if (v.trim()) lines.push(v);
			});
			lines.push("");
		}

		if (metNeeds.length > 0) {
			lines.push(`Met needs: ${metNeeds.join(", ")}`, "");
		}

		if (unmetNeeds.length > 0) {
			lines.push(`Unmet needs: ${unmetNeeds.join(", ")}`, "");
		}

		if (exploredNeeds.length > 0) {
			lines.push("Need explorations:");
			for (const [name, exp] of exploredNeeds) {
				lines.push(`  ${name}:`);
				if (exp.coreSpecific) lines.push(`    About this need: ${exp.coreSpecific}`);
				if (exp.unmetFeeling) lines.push(`    When it's not met: ${exp.unmetFeeling}`);
				if (exp.metFeeling) lines.push(`    When it is met: ${exp.metFeeling}`);
				if (exp.metCircumstances) lines.push(`    What helped: ${exp.metCircumstances}`);
			}
			lines.push("");
		}

		if (hasStrategies) {
			lines.push("Strategies:");
			for (const [need, strats] of Object.entries(strategies)) {
				if (strats.length > 0) {
					lines.push(`  ${need}:`);
					strats.forEach((s) => lines.push(`    - ${s}`));
				}
			}
			lines.push("");
		}

		if (hasGuesses) {
			heading("The Other Person's Perspective");
			if (guessObservation) lines.push(`They might have observed: ${guessObservation}`, "");
			if (guessFeelingsAll.length > 0) lines.push(`They might be feeling: ${guessFeelingsAll.join(", ")}`, "");
			if (guessNeedsAll.length > 0) lines.push(`Their needs might include: ${guessNeedsAll.join(", ")}`, "");
		}

		if (hasRequests) {
			heading("Requests");
			if (requestOfSelf) lines.push(`Of myself: ${requestOfSelf}`);
			if (requestOfOther) lines.push(`Of them: ${requestOfOther}`);
		}

		navigator.clipboard.writeText(lines.join("\n")).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		});
	};

	const handleSave = () => {
		saveSession();
		setSaved(true);
	};

	return (
		<div className="review">
			<p>
				Here's a summary of everything you've worked through. Take a moment to appreciate the journey you've
				just taken.
			</p>

			<h2>What was happening for you?</h2>

			{obsText && (
				<div className="review-section">
					<h3>Observation</h3>
					<p className="review-text">{obsText}</p>
				</div>
			)}

			{allFeelings.length > 0 && (
				<div className="review-section">
					<h3>Feelings</h3>
					{strongFeelings.length > 0 && (
						<p>
							<strong>{strongFeelings.join(", ")}</strong>
						</p>
					)}
					{regularFeelings.length > 0 && <p>{regularFeelings.join(", ")}</p>}
				</div>
			)}

			{hasFeelingsExplore && (
				<div className="review-section">
					<h3>Feeling exploration</h3>
					{Object.entries(feelingsExploreResponses).map(([key, value]) => {
						if (!value || (Array.isArray(value) && value.length === 0) || String(value).trim() === "")
							return null;
						return <p key={key}>{Array.isArray(value) ? value.join(", ") : String(value)}</p>;
					})}
				</div>
			)}

			{unmetNeeds.length > 0 && (
				<div className="review-section">
					<h3>Unmet needs</h3>
					<p>{unmetNeeds.join(", ")}</p>
				</div>
			)}

			{metNeeds.length > 0 && (
				<div className="review-section">
					<h3>Met needs</h3>
					<p>{metNeeds.join(", ")}</p>
				</div>
			)}

			{exploredNeeds.length > 0 && (
				<div className="review-section">
					<h3>Need explorations</h3>
					{exploredNeeds.map(([name, exp]) => (
						<div key={name} className="review-exploration">
							<strong>{name}</strong>
							{exp.coreSpecific && (
								<p>
									<em>About this need:</em> {exp.coreSpecific}
								</p>
							)}
							{exp.unmetFeeling && (
								<p>
									<em>When it's not met:</em> {exp.unmetFeeling}
								</p>
							)}
							{exp.metFeeling && (
								<p>
									<em>When it is met:</em> {exp.metFeeling}
								</p>
							)}
							{exp.metCircumstances && (
								<p>
									<em>What helped:</em> {exp.metCircumstances}
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

			{hasGuesses && (
				<>
					<h2>Your guesses for the other person</h2>
					<div className="review-section">
						{guessObservation && (
							<p>
								<span className="review-label">They might have observed:</span> {guessObservation}
							</p>
						)}
						{guessFeelingsAll.length > 0 && (
							<p>
								<span className="review-label">They might be feeling:</span>{" "}
								{guessFeelingsAll.join(", ")}
							</p>
						)}
						{guessNeedsAll.length > 0 && (
							<p>
								<span className="review-label">Their needs might include:</span>{" "}
								{guessNeedsAll.join(", ")}
							</p>
						)}
					</div>
				</>
			)}

			{hasRequests && (
				<>
					<h2>What you might like to do next</h2>
					<div className="review-section">
						{requestOfSelf && (
							<p>
								<span className="review-label">Of myself:</span> {requestOfSelf}
							</p>
						)}
						{requestOfOther && (
							<p>
								<span className="review-label">Of them:</span> {requestOfOther}
							</p>
						)}
					</div>
				</>
			)}

			<div className="review-actions">
				<button onClick={generateSummaryText} className="review-action-btn">
					{copied ? "Copied!" : "Copy to Clipboard"}
				</button>
				<button onClick={handleSave} disabled={saved} className="review-action-btn review-action-btn-secondary">
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
