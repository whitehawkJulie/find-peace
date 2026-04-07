import React, { useState, useEffect, useRef } from "react";
import { useWizard } from "./WizardContext";
import { useOverlayHistory } from "../hooks/useOverlayHistory";
import { trackEvent, currentPage } from "../analytics/analytics";
import SummaryContent from "./SummaryContent";
import { filterByState } from "../utils/renderHelpers";
import { feelingTypes } from "../data/FeelingTypes";
import "./SummaryModal.css";

const SummaryModal = () => {
	const {
		showSummary,
		setShowSummary,
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
		saveSession,
	} = useWizard();

	const [copied, setCopied] = useState(false);
	const [saved, setSaved] = useState(false);
	const summaryOpenAt = useRef(null);

	const { closeWithCleanup: closeSummary } = useOverlayHistory(showSummary, () => setShowSummary(false), "summary");

	const handleSave = () => {
		trackEvent("action", { action_name: "save_session", page_name: currentPage });
		saveSession();
		setSaved(true);
		setTimeout(() => setSaved(false), 2500);
	};

	// Close on Escape
	useEffect(() => {
		if (!showSummary) return;
		const handler = (e) => {
			if (e.key === "Escape") closeSummary();
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [showSummary]); // eslint-disable-line react-hooks/exhaustive-deps

	// Track summary open/close
	useEffect(() => {
		if (showSummary) {
			summaryOpenAt.current = Date.now();
			trackEvent("ui_open", { type: "modal", name: "summary", page_name: currentPage });
		} else if (summaryOpenAt.current) {
			trackEvent("ui_close", {
				type: "modal",
				name: "summary",
				time_open_ms: Date.now() - summaryOpenAt.current,
			});
			summaryOpenAt.current = null;
		}
	}, [showSummary]); // eslint-disable-line react-hooks/exhaustive-deps

	// - REPLACED with analytics page tracking
	// const logSelections = () => {
	// 	const allFeelings = filterByState(feelings, "clicked");
	// 	const unmetNeeds = filterByState(needs, "clicked");
	// 	fetch("/api/log-selections.php", {
	// 		method: "POST",
	// 		headers: { "Content-Type": "application/json" },
	// 		body: JSON.stringify({ feelings: allFeelings, needs: unmetNeeds }),
	// 	});
	// };

	const handleCopy = () => {
		const obsText =
			observation?.refined?.trim() ||
			[observation?.moment, observation?.actions].filter((s) => s?.trim()).join("\n");

		const allFeelings = [...filterByState(feelings, "clicked"), ...filterByState(feelings, "double-clicked")];
		const metNeeds = filterByState(needs, "double-clicked");
		const unmetNeeds = filterByState(needs, "clicked");
		const exploredNeeds = Object.entries(needExplorations).filter(([, v]) => v.completed);
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

		const lines = [];
		const heading = (text) => lines.push("", `— ${text} —`, "");

		heading("What was happening for you?");
		if (jackalTalk) lines.push("Letting it all out:", jackalTalk, "");
		if (obsText) lines.push("Observation:", obsText, "");

		heading("Feelings");
		if (hasBodySensations) {
			const parts = [];
			if (bodySensations.selected.length > 0) parts.push(bodySensations.selected.join(", "));
			if (bodySensations.custom?.trim()) parts.push(bodySensations.custom.trim());
			lines.push(`Body sensations: ${parts.join("; ")}`, "");
		}
		if (allFeelings.length > 0) lines.push(`Feelings: ${allFeelings.join(", ")}`, "");
		if (hasFeelingsExplore) {
			lines.push("Feeling exploration:");
			for (const [, typeData] of Object.entries(feelingTypes)) {
				const filledPrompts = typeData.prompts.filter((p) => {
					const val = feelingsExploreResponses[p.id];
					return val && (Array.isArray(val) ? val.length > 0 : String(val).trim() !== "");
				});
				if (filledPrompts.length === 0) continue;
				lines.push(`  ${typeData.title}:`);
				for (const p of filledPrompts) {
					const val = feelingsExploreResponses[p.id];
					lines.push(`    Q: ${p.question}`);
					lines.push(`    A: ${Array.isArray(val) ? val.join(", ") : String(val)}`);
				}
			}
			lines.push("");
		}

		heading("Needs");
		if (metNeeds.length > 0) lines.push(`Strongly unmet needs: ${metNeeds.join(", ")}`, "");
		if (unmetNeeds.length > 0) lines.push(`Unmet needs: ${unmetNeeds.join(", ")}`, "");
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

		if (hasCollabScript) {
			heading("Conversation guide");
			if (collabScript.finalScript?.trim()) {
				lines.push(collabScript.finalScript.trim(), "");
			} else {
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
			lines.push("", `Something that stands out to me: ${reviewReflection.trim()}`);
		}

		// logSelections();
		navigator.clipboard.writeText(lines.join("\n")).then(() => {
			trackEvent("action", { action_name: "copy_summary", page_name: currentPage });
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		});
	};

	if (!showSummary) return null;

	const actionButtons = (
		<div className="summary-modal-actions">
			<button
				className={`summary-modal-action-btn summary-modal-save-btn${saved ? " summary-modal-action-btn--done" : ""}`}
				onClick={handleSave}>
				<span className="summary-action-label">{saved ? "✓ Saved!" : "💾 Save"}</span>
				<span className="summary-action-sub">to this device</span>
			</button>
			<button
				className={`summary-modal-action-btn summary-modal-copy-btn${copied ? " summary-modal-action-btn--done" : ""}`}
				onClick={handleCopy}>
				<span className="summary-action-label">{copied ? "✓ Copied!" : "📋 Copy"}</span>
				<span className="summary-action-sub">as plain text</span>
			</button>
			<button className="summary-modal-action-btn summary-modal-close-btn" onClick={closeSummary}>
				<span className="summary-action-label">✕ Close</span>
				<span className="summary-action-sub">summary</span>
			</button>
		</div>
	);

	return (
		<div className="summary-modal-backdrop" onClick={closeSummary}>
			<div
				className="summary-modal"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label="Summary">
				<div className="summary-modal-header">
					<div className="summary-modal-header-top">
						<h2>What came up</h2>
						<button className="summary-modal-close" onClick={closeSummary} aria-label="Close summary">
							×
						</button>
					</div>
					{/* {actionButtons} */}
				</div>
				<div className="summary-modal-body">
					<SummaryContent />
				</div>
				<div className="summary-modal-footer">
					{actionButtons}
					<p className="summary-modal-privacy">
						🔒 Your data stays on this device. Copying shares feelings and needs word selections anonymously
						to help improve this tool.
					</p>
				</div>
			</div>
		</div>
	);
};

export default SummaryModal;
