import React, { useState, useEffect, useMemo, useRef } from "react";
import { trackEvent } from "../analytics/analytics";
import Pill from "./Pill";
import "./ClarifyFeelings.css";

const ClarifyFeelings = ({ itemData, feelings, needs, onToggleFeeling, onToggleNeed, onKeepWord, onClose }) => {
	const [responses, setResponses] = useState({});
	const [showNeedsHelp, setShowNeedsHelp] = useState(false);
	const [replaceWithFeelings, setReplaceWithFeelings] = useState(false);

	// Pick a random attunement statement once per item (stable across re-renders)
	const attunement = useMemo(() => {
		if (!itemData?.clarify?.attunement?.length) return null;
		const arr = itemData.clarify.attunement;
		return arr[Math.floor(Math.random() * arr.length)];
	}, [itemData?.item]);

	// Track open/close (fires once on mount/unmount)
	const openAt = useRef(Date.now());
	useEffect(() => {
		const wordType = itemData?.type === "storyWord" ? "story_word" : "murky";
		trackEvent("ui_open", { type: "modal", name: "clarify-feelings",
			word: itemData?.item, word_type: wordType });
		return () => {
			trackEvent("ui_close", { type: "modal", name: "clarify-feelings",
				time_open_ms: Date.now() - openAt.current });
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Reset internal state when the popup opens for a different item
	useEffect(() => {
		setResponses({});
		setShowNeedsHelp(false);
		setReplaceWithFeelings(false);
	}, [itemData?.item]);

	if (!itemData) return null;

	const isStoryWord = itemData.type === "storyWord";
	const isMurky = itemData.clarify?.type === "murky";

	const setResponse = (key, value) => {
		setResponses((prev) => ({ ...prev, [key]: value }));
	};

	const toggleMultiChoice = (key, option) => {
		setResponses((prev) => {
			const current = prev[key] || [];
			const updated = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
			return { ...prev, [key]: updated };
		});
	};

	return (
		<div className="clarify-popup-backdrop" onClick={onClose}>
			<div className="clarify-popup" onClick={(e) => e.stopPropagation()}>
				{/* ===== Story Word Mode ===== */}
				{isStoryWord && (
					<>
						<div className="clarify-popup-header">
							<h3>{itemData.item}</h3>
						</div>

						{itemData.storyHint && <p className="clarify-reframe highlight-box">{itemData.storyHint}.</p>}

						{itemData.empathyGuesses?.length > 0 && (
							<div className="clarify-empathy-guesses">
								<p className="clarify-label">How are you around this?</p>
								<ul>
									{itemData.empathyGuesses.map((guess, i) => (
										<li key={i}>{guess}</li>
									))}
								</ul>
							</div>
						)}

						{itemData.suggestedFeelings?.length > 0 && (
							<div className="clarify-suggestions">
								<p className="clarify-label">Are these also present?</p>
								<div className="pill-grid cloud">
									{itemData.suggestedFeelings.map((f) => (
										<Pill
											key={f}
											item={f}
											type="feeling"
											state={
												feelings[f] === "clicked" || feelings[f] === "double-clicked"
													? "clicked"
													: ""
											}
											onClick={() => {
												trackEvent("action", { action_name: "story_word_feeling_toggle",
													word: itemData.item, feeling: f, selected: !feelings[f] });
												onToggleFeeling(f);
											}}
										/>
									))}
								</div>
							</div>
						)}

						{itemData.suggestedNeeds?.length > 0 && (
							<div className="clarify-suggestions">
								<p className="clarify-label">
									Needs that might be underneath:
									<button
										className="clarify-needs-help-btn"
										title="Why needs here?"
										onClick={() => setShowNeedsHelp((v) => !v)}>
										?
									</button>
								</p>
								{showNeedsHelp && (
									<p className="clarify-needs-help-text">
										We're still clarifying the feeling layer here. Technically, needs come next. But
										many story words already point toward a need — for example, "unappreciated"
										often connects to appreciation. If a need feels clear to you now, you can choose
										it. We'll return to it and explore it more deeply in the next step.
									</p>
								)}
								<div className="pill-grid cloud">
									{itemData.suggestedNeeds.map((n) => (
										<Pill
											key={n}
											item={n}
											type="need"
											state={
												needs[n] === "clicked" || needs[n] === "double-clicked" ? "clicked" : ""
											}
											onClick={() => {
												trackEvent("action", { action_name: "story_word_need_toggle",
													word: itemData.item, need: n, selected: !needs[n] });
												onToggleNeed(n);
											}}
										/>
									))}
								</div>
							</div>
						)}

						{itemData.suggestedFeelings?.some((f) => feelings[f]) && (
							<label className="clarify-replace-label">
								<input
									type="checkbox"
									checked={replaceWithFeelings}
									onChange={(e) => setReplaceWithFeelings(e.target.checked)}
								/>{" "}
								Replace "{itemData.item}" with the feelings I've chosen
							</label>
						)}

						<button className="clarify-ok" onClick={() => {
							trackEvent("action", {
								action_name: "story_word_ok",
								word: itemData.item,
								replaced: replaceWithFeelings,
								feelings_chosen: (itemData.suggestedFeelings || []).filter((f) => feelings[f]).length,
								needs_chosen:    (itemData.suggestedNeeds    || []).filter((n) => needs[n]).length,
							});
							onKeepWord(itemData.item, !replaceWithFeelings);
						}}>
							OK
						</button>
					</>
				)}

				{/* ===== Murky Feeling Mode ===== */}
				{isMurky && (
					<>
						<div className="clarify-popup-header">
							<h3>{itemData.clarify.title}</h3>
						</div>

						{attunement && <p className="clarify-attunement">{attunement}</p>}

						{itemData.clarify.normalization && (
							<p className="clarify-normalization">{itemData.clarify.normalization}</p>
						)}

						{itemData.clarify.prompts.map((prompt, i) => (
							<div key={i} className="clarify-prompt">
								<p className="clarify-prompt-question">{prompt.question}</p>

								{prompt.stem && <span className="clarify-stem">{prompt.stem}</span>}

								{prompt.type === "text" && (
									<textarea
										className="clarify-textarea"
										value={responses[i] || ""}
										onChange={(e) => setResponse(i, e.target.value)}
										rows={3}
									/>
								)}

								{/* Feeling-selecting prompts: render as Pills that carry over */}
								{prompt.selectsFeeling &&
									(prompt.type === "multiChoice" || prompt.type === "singleChoice") && (
										<div className="pill-grid cloud">
											{prompt.options.map((opt) => (
												<Pill
													key={opt}
													item={opt}
													type="feeling"
													state={
														feelings[opt] === "clicked" ||
														feelings[opt] === "double-clicked"
															? "clicked"
															: ""
													}
													onClick={() => onToggleFeeling(opt)}
												/>
											))}
										</div>
									)}

								{/* Regular singleChoice (not feeling-selecting) */}
								{prompt.type === "singleChoice" && !prompt.selectsFeeling && (
									<div className="clarify-choices">
										{prompt.options.map((opt) => (
											<button
												key={opt}
												className={`clarify-choice ${responses[i] === opt ? "chosen" : ""}`}
												onClick={() => setResponse(i, opt)}>
												{opt}
											</button>
										))}
									</div>
								)}

								{/* Regular multiChoice (not feeling-selecting) */}
								{prompt.type === "multiChoice" && !prompt.selectsFeeling && (
									<div className="clarify-choices">
										{prompt.options.map((opt) => (
											<button
												key={opt}
												className={`clarify-choice ${(responses[i] || []).includes(opt) ? "chosen" : ""}`}
												onClick={() => toggleMultiChoice(i, opt)}>
												{opt}
											</button>
										))}
									</div>
								)}
							</div>
						))}

						<button className="clarify-ok" onClick={onClose}>
							Done
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default ClarifyFeelings;
