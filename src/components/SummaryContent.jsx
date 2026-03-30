import React from "react";
import { useWizard } from "./WizardContext";
import { filterByState } from "../utils/renderHelpers";
import { feelingTypes } from "../data/FeelingTypes";
import "./SummaryContent.css";

/**
 * Renders the summary sections for all data entered so far.
 * Used by Review.jsx (inside its accordion) and SummaryModal.jsx.
 * Read-only — no reflection textarea or action buttons.
 */
const SummaryContent = () => {
	const {
		observation,
		jackalTalk,
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
		simpleRequest,
		collabScript,
		includeCollabInSummary,
		reviewReflection,
	} = useWizard();

	const obsText =
		observation?.refined?.trim() || [observation?.moment, observation?.actions].filter((s) => s?.trim()).join("\n");

	const strongFeelings = filterByState(feelings, "double-clicked");
	const normalFeelings = filterByState(feelings, "clicked");
	const allFeelings = [...strongFeelings, ...normalFeelings];
	const metNeeds = filterByState(needs, "double-clicked");
	const unmetNeeds = filterByState(needs, "clicked");
	const exploredNeeds = Object.entries(needExplorations).filter(([_, v]) => v.completed);
	const hasFeelingsExplore = Object.values(feelingsExploreResponses).some((v) =>
		Array.isArray(v) ? v.length > 0 : v && String(v).trim() !== "",
	);
	const hasBodySensations = bodySensations?.selected?.length > 0 || bodySensations?.custom?.trim();
	const hasStrategies = Object.values(strategies).some((s) => s.length > 0);
	const guessFeelingsAll = [
		...filterByState(guessFeelings, "clicked"),
		...filterByState(guessFeelings, "double-clicked"),
	];
	const guessNeedsAll = [...filterByState(guessNeeds, "clicked"), ...filterByState(guessNeeds, "double-clicked")];
	const hasGuesses = guessObservation || guessFeelingsAll.length > 0 || guessNeedsAll.length > 0;
	const hasRequests = requestOfSelf || requestOfOther || simpleRequest?.trim();
	const hasWhatsChanged = whatsChangedResponses?.before?.trim() || whatsChangedResponses?.differently?.trim();
	const hasCollabScript = includeCollabInSummary && collabScript?.step1 !== undefined;

	const hasAnyData =
		obsText ||
		jackalTalk ||
		allFeelings.length > 0 ||
		hasFeelingsExplore ||
		hasBodySensations ||
		unmetNeeds.length > 0 ||
		metNeeds.length > 0 ||
		exploredNeeds.length > 0 ||
		hasStrategies ||
		hasGuesses ||
		hasWhatsChanged ||
		hasRequests ||
		hasCollabScript ||
		reviewReflection?.trim();

	if (!hasAnyData) {
		return (
			<p className="review-no-data">
				Nothing entered yet — work through the pages and come back to see your summary here.
			</p>
		);
	}

	return (
		<>
			<p className="summary-intro">This is what was happening for you.</p>

			{jackalTalk && (
				<div className="review-section">
					<h3>Letting it all out</h3>
					<p className="review-text" style={{ whiteSpace: "pre-wrap" }}>
						{jackalTalk}
					</p>
				</div>
			)}

			{obsText && (
				<div className="review-section">
					<h3>Observation</h3>
					<p className="review-text">{obsText}</p>
				</div>
			)}

			{allFeelings.length > 0 && (
				<div className="review-section">
					<h3>Feelings</h3>
					<p>
						{strongFeelings.map((f, i) => (
							<React.Fragment key={f}>
								{i > 0 && ", "}
								<strong>{f}</strong>
							</React.Fragment>
						))}
						{strongFeelings.length > 0 && normalFeelings.length > 0 && ", "}
						{normalFeelings.join(", ")}
					</p>
				</div>
			)}

			{hasFeelingsExplore && (
				<div className="review-section">
					<h3>Feeling exploration</h3>
					{Object.entries(feelingTypes).map(([typeKey, typeData]) => {
						const filledPrompts = typeData.prompts.filter((p) => {
							const val = feelingsExploreResponses[p.id];
							return val && (Array.isArray(val) ? val.length > 0 : String(val).trim() !== "");
						});
						if (filledPrompts.length === 0) return null;
						return (
							<div key={typeKey} className="review-exploration">
								<strong>{typeData.title}</strong>
								{filledPrompts.map((p) => {
									const val = feelingsExploreResponses[p.id];
									return (
										<p key={p.id}>
											<em>{p.question}</em>
											<br />
											{Array.isArray(val) ? val.join(", ") : String(val)}
										</p>
									);
								})}
							</div>
						);
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

			{metNeeds.length > 0 && (
				<div className="review-section">
					<h3>Unmet needs</h3>
					<p>
						<strong>{metNeeds.join(", ")}</strong>
					</p>
					<p>{unmetNeeds.join(", ")}</p>
				</div>
			)}

			{/* {unmetNeeds.length > 0 && (
				<div className="review-section">
					<h3>Unmet needs</h3>
					<p>{unmetNeeds.join(", ")}</p>
				</div>
			)} */}

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
							{exp.differentiation && (
								<p>
									<em>Which flavour:</em> {exp.differentiation}
								</p>
							)}
							{exp.whereMetResponse && (
								<p>
									<em>Where to find it:</em> {exp.whereMetResponse}
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
							{exp.imaginedMet && (
								<p>
									<em>Imagined for someone else:</em> {exp.imaginedMet}
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
				<div className="review-section">
					<h3>Your guesses for the other person</h3>
					{guessObservation && (
						<p>
							<span className="review-label">They might have observed:</span> {guessObservation}
						</p>
					)}
					{guessFeelingsAll.length > 0 && (
						<p>
							<span className="review-label">They might be feeling:</span> {guessFeelingsAll.join(", ")}
						</p>
					)}
					{guessNeedsAll.length > 0 && (
						<p>
							<span className="review-label">Their needs might include:</span> {guessNeedsAll.join(", ")}
						</p>
					)}
				</div>
			)}

			{hasWhatsChanged && (
				<div className="review-section">
					<h3>Exploring what's changed</h3>
					{whatsChangedResponses?.before?.trim() && (
						<p>
							<span className="review-label">Before this process:</span> {whatsChangedResponses.before}
						</p>
					)}
					{whatsChangedResponses?.differently?.trim() && (
						<p>
							<span className="review-label">What's different now:</span>{" "}
							{whatsChangedResponses.differently}
						</p>
					)}
				</div>
			)}

			{hasRequests && (
				<div className="review-section">
					<h3>What you might like to do next</h3>
					{simpleRequest?.trim() && (
						<p>
							<span className="review-label">Request:</span> {simpleRequest.trim()}
						</p>
					)}
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
			)}

			{hasCollabScript && (
				<div className="review-section">
					<h3>Conversation guide</h3>
					{collabScript.finalScript?.trim() ? (
						<p className="review-text review-convo-text" style={{ whiteSpace: "pre-wrap" }}>
							{collabScript.finalScript.trim()}
						</p>
					) : (
						<div className="review-convo-script">
							{[
								["1. Start with permission", collabScript.step1],
								["2. Understand them first", collabScript.step2],
								["3. Check they're open to hearing you", collabScript.step3],
								["4. Share your experience", collabScript.step4],
								["5. Check they got it", collabScript.step5],
								["6. Find a way forward", collabScript.step6],
							]
								.filter(([, text]) => text?.trim())
								.map(([label, text]) => (
									<div key={label} className="review-convo-step">
										<p className="review-convo-step-label">{label}</p>
										<p className="review-convo-step-text">{text}</p>
									</div>
								))}
						</div>
					)}
				</div>
			)}
			{reviewReflection?.trim() && (
				<div className="review-section">
					<h3>Final reflection</h3>
					<p className="review-text" style={{ whiteSpace: "pre-wrap" }}>
						{reviewReflection.trim()}
					</p>
				</div>
			)}
		</>
	);
};

export default SummaryContent;
