import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWizard } from "./WizardContext";
import { useContent } from "../content/useContent";
import { filterByState } from "../utils/renderHelpers";
import { getText } from "../content/resolver";

const STEP_IDS = ["step1", "step2", "step3", "step4", "step5", "step6"];
const STEPS_WITH_EXTRA_HELP = new Set(["step2", "step3", "step4", "step5", "step6"]);

// Per-step extraHelp JSX, built from content keys
const renderExtraHelp = (stepId, t) => {
	const s = (key) => t(`collaborate.steps.${stepId}.extraHelp.${key}`);
	switch (stepId) {
		case "step2":
			return (
				<>
					<p>{s("intro")}</p>
					<p>{s("ifNotSure")}</p>
					<ul>
						<li>{s("guess1")}</li>
						<li>{s("guess2")}</li>
					</ul>
					<p>{s("ifWrong")}</p>
				</>
			);
		case "step3":
			return (
				<>
					<p>{s("intro")}</p>
					<p>{s("youMight")}</p>
					<ul>
						<li>{s("option1")}</li>
						<li>{s("option2")}</li>
					</ul>
					<p>{s("note")}</p>
				</>
			);
		case "step4":
			return (
				<>
					<p>{s("tryTo")}</p>
					<ul>
						<li>{s("item1")}</li>
						<li>{s("item2")}</li>
						<li>{s("item3")}</li>
					</ul>
					<p>{s("blame")}</p>
				</>
			);
		case "step5":
			return (
				<>
					<p>{s("ifMissed")}</p>
					<p>{s("youMightSay")}</p>
					<ul>
						<li>{s("example")}</li>
					</ul>
					<p>{s("helps")}</p>
				</>
			);
		case "step6":
			return (
				<>
					<p>{s("lookingFor")}</p>
					<p>{s("keepIt")}</p>
					<ul>
						<li>{s("item1")}</li>
						<li>{s("item2")}</li>
						<li>{s("item3")}</li>
					</ul>
				</>
			);
		default:
			return null;
	}
};

const buildFinalScript = (script) => {
	const h = (key) => getText(`collaborate.scriptHeadings.${key}`);
	const parts = [];

	parts.push(h("checkWillingness"));
	if (script.step1) parts.push(script.step1);
	parts.push("");

	parts.push(h("expressGuesses"));
	if (script.step2) parts.push(script.step2);
	parts.push("");

	parts.push(h("checkUnderstood"));
	parts.push(h("checkUnderstoodPrompt"));
	parts.push("");

	parts.push(h("checkWillingnessHear"));
	if (script.step3) parts.push(script.step3);
	parts.push("");

	parts.push(h("expressOwn"));
	if (script.step4) parts.push(script.step4);
	parts.push("");

	parts.push(h("checkTheyUnderstood"));
	if (script.step5) parts.push(script.step5);
	parts.push("");

	parts.push(h("mutualSolution"));
	if (script.step6) parts.push(script.step6);
	parts.push("");

	return parts.join("\n");
};

const Collaborate = () => {
	const { collabScript, setCollabScript, guessObservation, guessFeelings, guessNeeds, observation, feelings, needs } =
		useWizard();
	const { t } = useContent();

	const [openHelp, setOpenHelp] = useState(new Set());
	const textareaRefs = useRef({});

	const autoResize = useCallback((el) => {
		if (!el) return;
		el.style.height = "auto";
		el.style.height = el.scrollHeight + "px";
	}, []);

	const toggleHelp = (id) => {
		setOpenHelp((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const updateCollabScript = (field, value) => setCollabScript((prev) => ({ ...prev, [field]: value }));

	// Initialise step fields from context data on first visit
	useEffect(() => {
		if (collabScript.step1 !== undefined) return;

		const allFeelings = [...filterByState(feelings, "clicked"), ...filterByState(feelings, "double-clicked")];
		const allNeeds = [...filterByState(needs, "clicked"), ...filterByState(needs, "double-clicked")];
		const obs = observation?.refined?.trim() || "[what happened]";
		const feelStr = allFeelings.length ? allFeelings.join(", ").toLowerCase() : "[feeling]";
		const needStr = allNeeds.length ? allNeeds.join(", ").toLowerCase() : "[need]";

		const guessFeelingsAll = [
			...filterByState(guessFeelings, "clicked"),
			...filterByState(guessFeelings, "double-clicked"),
		];
		const guessNeedsAll = [...filterByState(guessNeeds, "clicked"), ...filterByState(guessNeeds, "double-clicked")];
		const guessFeelStr = guessFeelingsAll.join(", ").toLowerCase();
		const guessNeedStr = guessNeedsAll.join(", ").toLowerCase();

		let step2 = "";
		if (guessObservation || guessFeelStr || guessNeedStr) {
			if (guessObservation && (guessFeelStr || guessNeedStr)) {
				step2 = `I'm wondering what it was like for you when ${guessObservation}, if you might have been feeling ${guessFeelStr || "[feeling]"}, and wanting ${guessNeedStr || "[need]"}.`;
			} else if (guessObservation) {
				step2 = `I'm wondering what it was like for you when ${guessObservation}.`;
			} else {
				step2 = `I'd really like to understand how it was for you earlier, if you might have been feeling ${guessFeelStr || "[feeling]"}, and wanting ${guessNeedStr || "[need]"}.`;
			}
		}

		const defaults = {};
		STEP_IDS.forEach((id) => {
			defaults[id] = getText(`collaborate.steps.${id}.scriptDefault`);
		});

		const fields = {
			...defaults,
			step2: step2 || defaults.step2,
			step4: `When ${obs}, I felt ${feelStr}, because I was needing ${needStr}.`,
		};

		setCollabScript({
			...fields,
			finalScript: buildFinalScript(fields),
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Auto-resize all tracked textareas whenever their content changes
	useEffect(() => {
		Object.values(textareaRefs.current).forEach(autoResize);
	}, [collabScript, autoResize]);

	return (
		<div>
			{t("collaborate.purpose") && <p className="step-purpose">{t("collaborate.purpose")}</p>}
			<p>{t("collaborate.intro1")}</p>
			<p>{t("collaborate.intro2")}</p>
			<p className="collab-intro-note">{t("collaborate.introNote")}</p>

			<div className="collab-steps">
				{STEP_IDS.map((stepId, idx) => {
					const value = collabScript[stepId] ?? getText(`collaborate.steps.${stepId}.scriptDefault`) ?? "";
					const helpOpen = openHelp.has(stepId);
					const hasExtraHelp = STEPS_WITH_EXTRA_HELP.has(stepId);
					return (
						<div className="collab-step" key={stepId}>
							<h3 className="collab-step-title">
								<span className="collab-step-num">{idx + 1}.</span>
								{t(`collaborate.steps.${stepId}.title`)}
							</h3>
							<p className="collab-step-desc">{t(`collaborate.steps.${stepId}.desc`)}</p>
							<p className="collab-step-hint">{t(`collaborate.steps.${stepId}.hint`)}</p>
							<textarea
								className="collab-step-textarea"
								ref={(el) => {
									textareaRefs.current[stepId] = el;
									autoResize(el);
								}}
								value={value}
								onInput={(e) => autoResize(e.target)}
								onChange={(e) => updateCollabScript(stepId, e.target.value)}
							/>
							{hasExtraHelp && (
								<>
									<button
										className="collab-help-toggle"
										onClick={() => toggleHelp(stepId)}
										aria-expanded={helpOpen}>
										{helpOpen ? t("collaborate.stepHelpToggle.hide") : t("collaborate.stepHelpToggle.show")}
									</button>
									{helpOpen && <div className="collab-help-extra">{renderExtraHelp(stepId, t)}</div>}
								</>
							)}
						</div>
					);
				})}

				<div className="collab-step collab-step--final">
					<h3 className="collab-step-title">{t("collaborate.finalScript.title")}</h3>
					<p className="collab-step-desc">{t("collaborate.finalScript.desc")}</p>
					<p className="collab-step-hint">{t("collaborate.finalScript.hint")}</p>
					<textarea
						className="collab-step-textarea collab-step-textarea--very-tall"
						placeholder={t("collaborate.finalScript.placeholder")}
						ref={(el) => {
							textareaRefs.current["finalScript"] = el;
							autoResize(el);
						}}
						value={collabScript.finalScript ?? ""}
						onInput={(e) => autoResize(e.target)}
						onChange={(e) => updateCollabScript("finalScript", e.target.value)}
					/>
					<button
						className="collab-regenerate-btn"
						onClick={() => updateCollabScript("finalScript", buildFinalScript(collabScript))}>
						{t("collaborate.finalScript.regenerateButton")}
					</button>
				</div>
			</div>

			<p className="collab-save-hint">{t("collaborate.saveHint")}</p>
		</div>
	);
};

export default Collaborate;
