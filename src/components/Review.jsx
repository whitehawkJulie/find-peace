import React, { useState, useRef } from "react";
import { useWizard } from "./WizardContext";
import { filterByState } from "../utils/renderHelpers";
import { feelingTypes } from "../data/FeelingTypes";
import { COLLABORATE_TIPS_TEXT } from "./ConversationsAndCollaboration";
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
		simpleRequest,
		wantsConversation,
		reviewReflection,
		setReviewReflection,
		saveSession,
	} = useWizard();

	const [saved, setSaved] = useState(false);
	const [savedNotice, setSavedNotice] = useState(false);
	const [copied, setCopied] = useState(false);
	const [copiedConvo, setCopiedConvo] = useState(false);
	const [whatHappenedOpen, setWhatHappenedOpen] = useState(false);
	const actionsRef = useRef(null);

	const openAndScrollToSave = (e) => {
		e.stopPropagation();
		setWhatHappenedOpen(true);
		// scroll after the accordion has rendered
		setTimeout(() => actionsRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }), 50);
	};

	const obsText =
		observation?.refined?.trim() || [observation?.moment, observation?.actions].filter((s) => s?.trim()).join("\n");

	const allFeelings = filterByState(feelings, "clicked");
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
	const hasAnyData =
		obsText ||
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
		wantsConversation;

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
			for (const [typeKey, typeData] of Object.entries(feelingTypes)) {
				const filledPrompts = typeData.prompts.filter((p) => {
					const val = feelingsExploreResponses[p.id];
					return val && (Array.isArray(val) ? val.length > 0 : String(val).trim() !== "");
				});
				if (filledPrompts.length === 0) continue;
				lines.push(`  ${typeData.title}:`);
				for (const p of filledPrompts) {
					const val = feelingsExploreResponses[p.id];
					const v = Array.isArray(val) ? val.join(", ") : String(val);
					lines.push(`    Q: ${p.question}`);
					lines.push(`    A: ${v}`);
				}
			}
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
				if (exp.differentiation) lines.push(`    Which flavour: ${exp.differentiation}`);
				if (exp.whereMetResponse) lines.push(`    Where to find it: ${exp.whereMetResponse}`);
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

		if (hasWhatsChanged) {
			heading("Exploring what's changed");
			if (whatsChangedResponses?.before?.trim()) lines.push(`Before: ${whatsChangedResponses.before.trim()}`, "");
			if (whatsChangedResponses?.differently?.trim())
				lines.push(`What's different now: ${whatsChangedResponses.differently.trim()}`, "");
		}

		if (hasRequests) {
			heading("Requests");
			if (simpleRequest?.trim()) lines.push(`Request: ${simpleRequest.trim()}`, "");
			if (requestOfSelf) lines.push(`Of myself: ${requestOfSelf}`);
			if (requestOfOther) lines.push(`Of them: ${requestOfOther}`);
		}

		if (wantsConversation) {
			heading("Conversation guide");
			lines.push(COLLABORATE_TIPS_TEXT);
		}

		if (reviewReflection?.trim()) {
			lines.push("", `Something that stands out to me: ${reviewReflection.trim()}`);
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
		setSavedNotice(true);
		setTimeout(() => setSavedNotice(false), 10000);
	};

	return (
		<div className="review">
			<p>
				This page gathers together what you explored. You might like to read it through and notice what stands
				out. What feels most important or surprising?
			</p>

			<div className="review-accordion">
				<div
					className="review-accordion-toggle"
					role="button"
					tabIndex={0}
					title={whatHappenedOpen ? "Click to collapse" : "Click to open"}
					onKeyDown={(e) => e.key === "Enter" && setWhatHappenedOpen((o) => !o)}
					onClick={() => setWhatHappenedOpen((o) => !o)}>
					<span>What emerged?</span>
					<span className="review-accordion-header-right">
						<button
							disabled={!hasAnyData}
							className="review-accordion-save-btn"
							onClick={openAndScrollToSave}
							title="Save to Journal">
							💾 Save
						</button>
						<span className="review-accordion-chevron">{whatHappenedOpen ? "▲" : "▼"}</span>
					</span>
				</div>
				{whatHappenedOpen && (
					<div className="review-accordion-body">
						{!hasAnyData && <p className="review-no-data">No data entered yet.</p>}
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
										<span className="review-label">They might have observed:</span>{" "}
										{guessObservation}
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
						)}

						{hasWhatsChanged && (
							<div className="review-section">
								<h3>Exploring what's changed</h3>
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

						{wantsConversation && (
							<div className="review-section">
								<h3>Conversation guide</h3>
								<pre className="review-convo-tips">{COLLABORATE_TIPS_TEXT}</pre>
								<button
									className="review-action-btn review-action-btn-secondary review-action-btn-small"
									onClick={() => {
										navigator.clipboard.writeText(COLLABORATE_TIPS_TEXT).then(() => {
											setCopiedConvo(true);
											setTimeout(() => setCopiedConvo(false), 2500);
										});
									}}>
									{copiedConvo ? "Copied!" : "Copy conversation guide"}
								</button>
							</div>
						)}

						<div className="review-reflection">
							<p className="review-reflection-prompt">Something that stands out to me here is ...</p>
							<textarea
								className="review-reflection-textarea"
								rows={3}
								value={reviewReflection}
								onChange={(e) => setReviewReflection(e.target.value)}
							/>
						</div>

						<div className="review-actions" ref={actionsRef}>
							<button onClick={generateSummaryText} disabled={!hasAnyData} className="review-action-btn">
								{copied ? "Copied!" : "Copy to Clipboard"}
							</button>
							<button
								onClick={handleSave}
								disabled={saved || !hasAnyData}
								className="review-action-btn review-action-btn-secondary"
								title="Save to local browser storage, can reload from Settings">
								{saved ? "Saved to Journal" : "Save to Journal"}
							</button>
						</div>

						{savedNotice && (
							<p className="review-saved-notice">
								✓ Saved to your browser. To reload it later, tap the ⚙ cog icon in the menu bar at the
								bottom.
							</p>
						)}
					</div>
				)}
			</div>

			<div className="feedback">
				<p>
					If you have any feedback, questions, comments or if you found any bugs, please let me know, by
					emailing me at julielawrencenvc@gmail.com, or using the contact form on my website,
					<a href="https://makinglifemorewonderful.com.au" target="_blank" rel="noopener noreferrer">
						Making Life More Wonderful
					</a>
					.
				</p>
			</div>
		</div>
	);
};

Review.title = "Review";
Review.helpContent = null;

export default Review;
