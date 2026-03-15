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
		bodySensations,
		guessObservation,
		guessFeelings,
		guessNeeds,
		requestOfSelf,
		requestOfOther,
		whatsChangedResponses,
		saveSession,
	} = useWizard();

	const [saved, setSaved] = useState(false);
	const [copied, setCopied] = useState(false);

	const allFeelings = filterByState(feelings, "clicked");
	const metNeeds = filterByState(needs, "double-clicked");
	const unmetNeeds = filterByState(needs, "clicked");
	const exploredNeeds = Object.entries(needExplorations).filter(([_, v]) => v.completed);
	const hasFeelingsExplore = Object.values(feelingsExploreResponses).some((v) =>
		Array.isArray(v) ? v.length > 0 : v && String(v).trim() !== "",
	);
	const hasBodySensations = (bodySensations?.selected?.length > 0) || bodySensations?.custom?.trim();
	const hasStrategies = Object.values(strategies).some((s) => s.length > 0);
	const guessFeelingsAll = [
		...filterByState(guessFeelings, "clicked"),
		...filterByState(guessFeelings, "double-clicked"),
	];
	const guessNeedsAll = [...filterByState(guessNeeds, "clicked"), ...filterByState(guessNeeds, "double-clicked")];
	const hasGuesses = guessObservation || guessFeelingsAll.length > 0 || guessNeedsAll.length > 0;
	const hasRequests = requestOfSelf || requestOfOther;
	const hasWhatsChanged = whatsChangedResponses?.before?.trim() || whatsChangedResponses?.differently?.trim();

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
			lines.push(`Feelings: ${allFeelings.join(", ")}`, "");
		}

		if (hasFeelingsExplore) {
			lines.push("Feeling exploration:");
			Object.entries(feelingsExploreResponses).forEach(([_, value]) => {
				const v = Array.isArray(value) ? value.join(", ") : String(value);
				if (v.trim()) lines.push(v);
			});
			lines.push("");
		}

		if (hasBodySensations) {
			const parts = [];
			if (bodySensations.selected.length > 0) parts.push(bodySensations.selected.join(", "));
			if (bodySensations.custom?.trim()) parts.push(bodySensations.custom.trim());
			lines.push(`Body sensations: ${parts.join("; ")}`, "");
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
			if (exp.oftenUnmet) lines.push(`    Often unmet / topping up: ${exp.oftenUnmet}`);
			if (exp.whereToMeet) lines.push(`    Where to get it met: ${exp.whereToMeet}`);
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

		if (hasWhatsChanged) {
			heading("Exploring what's changed");
			if (whatsChangedResponses?.before?.trim())
				lines.push(`Before: ${whatsChangedResponses.before.trim()}`, "");
			if (whatsChangedResponses?.differently?.trim())
				lines.push(`What's different now: ${whatsChangedResponses.differently.trim()}`, "");
		}

		logSelections();
		navigator.clipboard.writeText(lines.join("\n")).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		});
	};

	// analytics - recording JUST feelings and needs, no personal data
	const logSelections = () => {
		fetch("/log-selections.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				feelings: allFeelings,
				needs: unmetNeeds,
			}),
		});
	};

	const handleSave = () => {
		logSelections();
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
					<p>{allFeelings.join(", ")}</p>
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

			{hasBodySensations && (
				<div className="review-section">
					<h3>Body sensations</h3>
					{bodySensations.selected.length > 0 && <p>{bodySensations.selected.join(", ")}</p>}
					{bodySensations.custom?.trim() && <p>{bodySensations.custom.trim()}</p>}
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
							{exp.oftenUnmet && (
								<p>
									<em>Often unmet / topping up:</em> {exp.oftenUnmet}
								</p>
							)}
							{exp.whereToMeet && (
								<p>
									<em>Where to get it met:</em> {exp.whereToMeet}
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

			{hasWhatsChanged && (
				<>
					<h2>Exploring what's changed</h2>
					<div className="review-section">
						{whatsChangedResponses?.before?.trim() && (
							<p>
								<span className="review-label">Before this process:</span>{" "}
								{whatsChangedResponses.before}
							</p>
						)}
						{whatsChangedResponses?.differently?.trim() && (
							<p>
								<span className="review-label">What's different now:</span>{" "}
								{whatsChangedResponses.differently}
							</p>
						)}
					</div>
				</>
			)}

			<div className="review-actions">
				<button onClick={generateSummaryText} className="review-action-btn">
					{copied ? "Copied!" : "Copy to Clipboard"}
				</button>
				<button
					onClick={handleSave}
					disabled={saved}
					className="review-action-btn review-action-btn-secondary"
					title="Warning, will be deleted any time you clear the browser cache">
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
