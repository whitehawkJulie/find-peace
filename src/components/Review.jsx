import React, { useState, useRef, useEffect } from "react";
import { useWizard } from "./WizardContext";
import { useContent } from "../content/useContent";
import { filterByState } from "../utils/renderHelpers";
import { feelingTypes } from "../data/FeelingTypes";
import "./Review.css";

const Review = () => {
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
		reviewReflection,
		setReviewReflection,
		saveSession,
		resetSession,
	} = useWizard();
	const { t } = useContent();

	// Track when a user reaches the Review page (fires once on mount)
	useEffect(() => {
		fetch("/api/visit.php");
	}, []);

	const [saved, setSaved] = useState(false);
	const [savedNotice, setSavedNotice] = useState(false);
	const [copied, setCopied] = useState(false);
	const [copiedConvo, setCopiedConvo] = useState(false);
	const [whatHappenedOpen, setWhatHappenedOpen] = useState(false);
	const [confirmRestart, setConfirmRestart] = useState(false);
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
	// Show the conversation guide section if the user visited and initialised the collab script
	const hasCollabScript = collabScript?.step1 !== undefined;
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
		hasCollabScript;

	const generateSummaryText = () => {
		const lines = [];
		const heading = (text) => {
			lines.push("", `— ${text} —`, "");
		};

		heading(t("review.summaryHeadings.whatWasHappening"));

		if (jackalTalk) {
			lines.push(`${t("review.summaryLabels.lettingItOut")}`, jackalTalk, "");
		}

		if (obsText) {
			lines.push(`${t("review.summaryLabels.observation")}`, obsText, "");
		}

		heading(t("review.summaryHeadings.feelings"));

		if (hasBodySensations) {
			const parts = [];
			if (bodySensations.selected.length > 0) parts.push(bodySensations.selected.join(", "));
			if (bodySensations.custom?.trim()) parts.push(bodySensations.custom.trim());
			lines.push(`${t("review.summaryLabels.bodySensations")} ${parts.join("; ")}`, "");
		}

		if (allFeelings.length > 0) {
			lines.push(`${t("review.summaryLabels.feelings")} ${allFeelings.join(", ")}`, "");
		}

		if (hasFeelingsExplore) {
			lines.push(`${t("review.summaryLabels.feelingExploration")}`);
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
		heading(t("review.summaryHeadings.needs"));
		if (unmetNeeds.length > 0) {
			lines.push(`${t("review.summaryLabels.unmetNeeds")} ${unmetNeeds.join(", ")}`, "");
		}

		if (metNeeds.length > 0) {
			lines.push(`${t("review.summaryLabels.metNeeds")} ${metNeeds.join(", ")}`, "");
		}

		if (exploredNeeds.length > 0) {
			lines.push(`${t("review.summaryLabels.needExplorations")}`);
			for (const [name, exp] of exploredNeeds) {
				lines.push(`  ${name}:`);
				if (exp.coreSpecific) lines.push(`    ${t("review.labels.aboutThisNeed")} ${exp.coreSpecific}`);
				if (exp.differentiation) lines.push(`    ${t("review.labels.whichFlavour")} ${exp.differentiation}`);
				if (exp.whereMetResponse) lines.push(`    ${t("review.labels.whereToFind")} ${exp.whereMetResponse}`);
				if (exp.unmetFeeling) lines.push(`    ${t("review.labels.whenNotMet")} ${exp.unmetFeeling}`);
				if (exp.metFeeling) lines.push(`    ${t("review.labels.whenMet")} ${exp.metFeeling}`);
				if (exp.metCircumstances) lines.push(`    ${t("review.labels.whatHelped")} ${exp.metCircumstances}`);
				if (exp.oftenUnmet) lines.push(`    ${t("review.labels.oftenUnmet")} ${exp.oftenUnmet}`);
				if (exp.whereToMeet) lines.push(`    ${t("review.labels.whereToGetMet")} ${exp.whereToMeet}`);
			}
			lines.push("");
		}

		if (hasStrategies) {
			lines.push(`${t("review.summaryLabels.strategies")}`);
			for (const [need, strats] of Object.entries(strategies)) {
				if (strats.length > 0) {
					lines.push(`  ${need}:`);
					strats.forEach((s) => lines.push(`    - ${s}`));
				}
			}
			lines.push("");
		}

		if (hasGuesses) {
			heading(t("review.summaryHeadings.otherPerspective"));
			if (guessObservation) lines.push(`${t("review.labels.theyMightHaveObserved")} ${guessObservation}`, "");
			if (guessFeelingsAll.length > 0) lines.push(`${t("review.labels.theyMightBeFeeling")} ${guessFeelingsAll.join(", ")}`, "");
			if (guessNeedsAll.length > 0) lines.push(`${t("review.labels.theirNeedsMight")} ${guessNeedsAll.join(", ")}`, "");
		}

		if (hasWhatsChanged) {
			heading(t("review.summaryHeadings.whatsChanged"));
			if (whatsChangedResponses?.before?.trim()) lines.push(`${t("review.summaryLabels.before")} ${whatsChangedResponses.before.trim()}`, "");
			if (whatsChangedResponses?.differently?.trim())
				lines.push(`${t("review.summaryLabels.whatsDifferentNow")} ${whatsChangedResponses.differently.trim()}`, "");
		}

		if (hasRequests) {
			heading(t("review.summaryHeadings.requests"));
			if (simpleRequest?.trim()) lines.push(`${t("review.summaryLabels.request")} ${simpleRequest.trim()}`, "");
			if (requestOfSelf) lines.push(`${t("review.summaryLabels.ofMyself")} ${requestOfSelf}`);
			if (requestOfOther) lines.push(`${t("review.summaryLabels.ofThem")} ${requestOfOther}`);
		}

		if (hasCollabScript) {
			heading(t("review.summaryHeadings.conversationGuide"));
			if (collabScript.finalScript?.trim()) {
				lines.push(collabScript.finalScript.trim(), "");
			} else {
				// Fallback: individual steps if final script not yet compiled
				const steps = [
					["1. Start with permission", collabScript.step1],
					["2. Understand them first", collabScript.step2],
					["3. Check they're open to hearing you", collabScript.step3],
					["4. Share your experience", collabScript.step4],
					["5. Check they got it", collabScript.step5],
					["6. Find a way forward", collabScript.step6],
				];
				for (const [label, text] of steps) {
					if (text?.trim()) lines.push(`${label}: ${text.trim()}`, "");
				}
			}
		}

		if (reviewReflection?.trim()) {
			lines.push("", `${t("review.summaryLabels.somethingStandsOut")} ${reviewReflection.trim()}`);
		}

		logSelections();
		navigator.clipboard.writeText(lines.join("\n")).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		});
	};

	// analytics - recording JUST feelings and needs, no personal data
	const logSelections = () => {
		fetch("/api/log-selections.php", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				feelings: allFeelings,
				needs: unmetNeeds,
			}),
		});
	};

	const handleSave = async () => {
		logSelections();
		await saveSession();
		setSaved(true);
		setSavedNotice(true);
		setTimeout(() => setSavedNotice(false), 10000);
	};

	return (
		<div className="review">
			<p>{t("review.intro")}</p>

			<div className="review-accordion">
				<div
					className="review-accordion-toggle"
					role="button"
					tabIndex={0}
					title={whatHappenedOpen ? "Click to collapse" : "Click to open"}
					onKeyDown={(e) => e.key === "Enter" && setWhatHappenedOpen((o) => !o)}
					onClick={() => setWhatHappenedOpen((o) => !o)}>
					<span>{t("review.accordionTitle")}</span>
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
						{!hasAnyData && <p className="review-no-data">{t("review.noData")}</p>}
						{jackalTalk && (
							<div className="review-section">
								<h3>{t("review.sections.lettingItOut")}</h3>
								<p className="review-text" style={{ whiteSpace: "pre-wrap" }}>{jackalTalk}</p>
							</div>
						)}
						{obsText && (
							<div className="review-section">
								<h3>{t("review.sections.observation")}</h3>
								<p className="review-text">{obsText}</p>
							</div>
						)}

						{allFeelings.length > 0 && (
							<div className="review-section">
								<h3>{t("review.sections.feelings")}</h3>
								<p>{allFeelings.join(", ")}</p>
							</div>
						)}

						{hasFeelingsExplore && (
							<div className="review-section">
								<h3>{t("review.sections.feelingExploration")}</h3>
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
								<h3>{t("review.sections.bodySensations")}</h3>
								{bodySensations.selected.length > 0 && <p>{bodySensations.selected.join(", ")}</p>}
								{bodySensations.custom?.trim() && <p>{bodySensations.custom.trim()}</p>}
							</div>
						)}

						{unmetNeeds.length > 0 && (
							<div className="review-section">
								<h3>{t("review.sections.unmetNeeds")}</h3>
								<p>{unmetNeeds.join(", ")}</p>
							</div>
						)}

						{metNeeds.length > 0 && (
							<div className="review-section">
								<h3>{t("review.sections.metNeeds")}</h3>
								<p>{metNeeds.join(", ")}</p>
							</div>
						)}

						{exploredNeeds.length > 0 && (
							<div className="review-section">
								<h3>{t("review.sections.needExplorations")}</h3>
								{exploredNeeds.map(([name, exp]) => (
									<div key={name} className="review-exploration">
										<strong>{name}</strong>
										{exp.coreSpecific && (
											<p>
												<em>{t("review.labels.aboutThisNeed")}</em> {exp.coreSpecific}
											</p>
										)}
										{exp.differentiation && (
											<p>
												<em>{t("review.labels.whichFlavour")}</em> {exp.differentiation}
											</p>
										)}
										{exp.whereMetResponse && (
											<p>
												<em>{t("review.labels.whereToFind")}</em> {exp.whereMetResponse}
											</p>
										)}
										{exp.unmetFeeling && (
											<p>
												<em>{t("review.labels.whenNotMet")}</em> {exp.unmetFeeling}
											</p>
										)}
										{exp.metFeeling && (
											<p>
												<em>{t("review.labels.whenMet")}</em> {exp.metFeeling}
											</p>
										)}
										{exp.metCircumstances && (
											<p>
												<em>{t("review.labels.whatHelped")}</em> {exp.metCircumstances}
											</p>
										)}
										{exp.oftenUnmet && (
											<p>
												<em>{t("review.labels.oftenUnmet")}</em> {exp.oftenUnmet}
											</p>
										)}
										{exp.whereToMeet && (
											<p>
												<em>{t("review.labels.whereToGetMet")}</em> {exp.whereToMeet}
											</p>
										)}
									</div>
								))}
							</div>
						)}

						{hasStrategies && (
							<div className="review-section">
								<h3>{t("review.sections.strategies")}</h3>
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
								<h3>{t("review.sections.otherPerspective")}</h3>
								{guessObservation && (
									<p>
										<span className="review-label">{t("review.labels.theyMightHaveObserved")}</span>{" "}
										{guessObservation}
									</p>
								)}
								{guessFeelingsAll.length > 0 && (
									<p>
										<span className="review-label">{t("review.labels.theyMightBeFeeling")}</span>{" "}
										{guessFeelingsAll.join(", ")}
									</p>
								)}
								{guessNeedsAll.length > 0 && (
									<p>
										<span className="review-label">{t("review.labels.theirNeedsMight")}</span>{" "}
										{guessNeedsAll.join(", ")}
									</p>
								)}
							</div>
						)}

						{hasWhatsChanged && (
							<div className="review-section">
								<h3>{t("review.sections.whatsChanged")}</h3>
								{whatsChangedResponses?.before?.trim() && (
									<p>
										<span className="review-label">{t("review.labels.beforeProcess")}</span>{" "}
										{whatsChangedResponses.before}
									</p>
								)}
								{whatsChangedResponses?.differently?.trim() && (
									<p>
										<span className="review-label">{t("review.labels.whatsDifferentNow")}</span>{" "}
										{whatsChangedResponses.differently}
									</p>
								)}
							</div>
						)}

						{hasRequests && (
							<div className="review-section">
								<h3>{t("review.sections.requests")}</h3>
								{simpleRequest?.trim() && (
									<p>
										<span className="review-label">{t("review.labels.request")}</span> {simpleRequest.trim()}
									</p>
								)}
								{requestOfSelf && (
									<p>
										<span className="review-label">{t("review.labels.ofMyself")}</span> {requestOfSelf}
									</p>
								)}
								{requestOfOther && (
									<p>
										<span className="review-label">{t("review.labels.ofThem")}</span> {requestOfOther}
									</p>
								)}
							</div>
						)}

						{hasCollabScript && (
							<div className="review-section">
								<h3>{t("review.sections.conversationGuide")}</h3>
								{collabScript.finalScript?.trim() ? (
									<p className="review-text review-convo-text" style={{ whiteSpace: "pre-wrap" }}>
										{collabScript.finalScript.trim()}
									</p>
								) : (
									// Fallback: individual steps if final script not yet compiled
									<div className="review-convo-script">
										{[
											["1. Start with permission", collabScript.step1],
											["2. Understand them first", collabScript.step2],
											["3. Check they\u2019re open to hearing you", collabScript.step3],
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
								<button
									className="review-action-btn review-action-btn-secondary review-action-btn-small"
									onClick={() => {
										const text = collabScript.finalScript?.trim()
											? collabScript.finalScript.trim()
											: [
													collabScript.step1,
													collabScript.step2,
													collabScript.step3,
													collabScript.step4,
													collabScript.step5,
													collabScript.step6,
												]
													.filter(Boolean)
													.join("\n\n");
										navigator.clipboard.writeText(text).then(() => {
											setCopiedConvo(true);
											setTimeout(() => setCopiedConvo(false), 2500);
										});
									}}>
									{copiedConvo ? t("review.copiedButton") : t("review.copyConvoButton")}
								</button>
							</div>
						)}

						<div className="review-reflection">
							<p className="review-reflection-prompt">{t("review.reflectionPrompt")}</p>
							<textarea
								className="review-reflection-textarea"
								rows={3}
								value={reviewReflection}
								onChange={(e) => setReviewReflection(e.target.value)}
							/>
						</div>

						<div className="review-actions" ref={actionsRef}>
							<button onClick={generateSummaryText} disabled={!hasAnyData} className="review-action-btn">
								{copied ? t("review.copiedButton") : t("review.copyButton")}
							</button>
							<button
								onClick={handleSave}
								disabled={saved || !hasAnyData}
								className="review-action-btn review-action-btn-secondary"
								title="Save to local browser storage, can reload from Settings">
								{saved ? t("review.savedButton") : t("review.saveButton")}
							</button>
						</div>

						<p className="review-privacy-note">
							{t("review.privacyNote")}
						</p>

						{savedNotice && (
							<p className="review-saved-notice">
								{t("review.savedNotice")}
							</p>
						)}
					</div>
				)}
			</div>

			<div className="review-session-end">
				<p className="review-session-end-label">{t("review.whenReady")}</p>
				<div className="review-session-end-buttons">
					<button className="review-end-btn review-end-btn--close" onClick={() => window.close()}>
						{t("review.closeButton")}
					</button>
					{confirmRestart ? (
						<div className="review-restart-confirm">
							<span>{t("review.confirmRestartPrompt")}</span>
							<div className="review-restart-confirm-btns">
								<button
									className="review-end-btn review-end-btn--restart-yes"
									onClick={() => {
										resetSession();
										setConfirmRestart(false);
									}}>
									{t("review.confirmYes")}
								</button>
								<button
									className="review-end-btn review-end-btn--cancel"
									onClick={() => setConfirmRestart(false)}>
									{t("review.confirmCancel")}
								</button>
							</div>
						</div>
					) : (
						<button
							className="review-end-btn review-end-btn--restart"
							onClick={() => setConfirmRestart(true)}>
							{t("review.restartButton")}
						</button>
					)}
				</div>
				<p className="review-close-hint">
					{t("review.closeHint")}
				</p>
			</div>

			<div className="feedback">
				<p>
					If you have any feedback, questions, comments or if you found any bugs, please let me know, by
					emailing me at julielawrencenvc@gmail.com, or using the contact form on my website,{" "}
					<a href="https://makinglifemorewonderful.com.au" target="_blank" rel="noopener noreferrer">
						Making Life More Wonderful
					</a>
					.
				</p>
			</div>
		</div>
	);
};

Review.titleKey = "review.title";
Review.title = "Review"; // polite fallback
Review.helpContent = null;

export default Review;
