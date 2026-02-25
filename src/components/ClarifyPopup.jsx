import React, { useState, useEffect, useMemo } from "react";
import Pill from "./Pill";
import "./ClarifyPopup.css";

const ClarifyPopup = ({
	itemData,
	feelings,
	needs,
	onToggleFeeling,
	onToggleNeed,
	onKeepWord,
	onClose,
}) => {
	const [showKeepPrompt, setShowKeepPrompt] = useState(false);
	const [responses, setResponses] = useState({});

	// Pick a random attunement statement once per item (stable across re-renders)
	const attunement = useMemo(() => {
		if (!itemData?.clarify?.attunement?.length) return null;
		const arr = itemData.clarify.attunement;
		return arr[Math.floor(Math.random() * arr.length)];
	}, [itemData?.item]);

	// Reset internal state when the popup opens for a different item
	useEffect(() => {
		setShowKeepPrompt(false);
		setResponses({});
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
			const updated = current.includes(option)
				? current.filter((o) => o !== option)
				: [...current, option];
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

						{itemData.storyHint && (
							<p className="clarify-reframe">{itemData.storyHint}.</p>
						)}

						{itemData.empathyGuesses?.length > 0 && (
							<div className="clarify-empathy-guesses">
								<p className="clarify-label">You might be telling yourself:</p>
								<ul>
									{itemData.empathyGuesses.map((guess, i) => (
										<li key={i}>{guess}</li>
									))}
								</ul>
							</div>
						)}

						{itemData.suggestedFeelings?.length > 0 && (
							<div className="clarify-suggestions">
								<p className="clarify-label">What you might actually be feeling:</p>
								<div className="pill-grid cloud">
									{itemData.suggestedFeelings.map((f) => (
										<Pill
											key={f}
											item={f}
											type="feeling"
											state={feelings[f] === "clicked" || feelings[f] === "double-clicked" ? "clicked" : ""}
											onClick={() => onToggleFeeling(f)}
										/>
									))}
								</div>
							</div>
						)}

						{itemData.suggestedNeeds?.length > 0 && (
							<div className="clarify-suggestions">
								<p className="clarify-label">Needs that might be underneath:</p>
								<div className="pill-grid cloud">
									{itemData.suggestedNeeds.map((n) => (
										<Pill
											key={n}
											item={n}
											type="need"
											state={needs[n] === "clicked" || needs[n] === "double-clicked" ? "clicked" : ""}
											onClick={() => onToggleNeed(n)}
										/>
									))}
								</div>
							</div>
						)}

						{!showKeepPrompt ? (
							<button className="clarify-ok" onClick={() => setShowKeepPrompt(true)}>
								OK
							</button>
						) : (
							<div className="clarify-keep-prompt">
								<p>Do you still want to keep "{itemData.item}"?</p>
								<div className="clarify-keep-buttons">
									<button
										className="clarify-keep-btn"
										onClick={() => onKeepWord(itemData.item, true)}>
										Yes, keep it
									</button>
									<button
										className="clarify-keep-btn clarify-keep-btn-secondary"
										onClick={() => onKeepWord(itemData.item, false)}>
										No, remove it
									</button>
								</div>
							</div>
						)}
					</>
				)}

				{/* ===== Murky Feeling Mode ===== */}
				{isMurky && (
					<>
						<div className="clarify-popup-header">
							<h3>{itemData.clarify.title}</h3>
						</div>

						{attunement && (
							<p className="clarify-attunement">{attunement}</p>
						)}

						{itemData.clarify.normalization && (
							<p className="clarify-normalization">{itemData.clarify.normalization}</p>
						)}

						{itemData.clarify.prompts.map((prompt, i) => (
							<div key={i} className="clarify-prompt">
								<p className="clarify-prompt-question">{prompt.question}</p>

								{prompt.stem && (
									<span className="clarify-stem">{prompt.stem}</span>
								)}

								{prompt.type === "text" && (
									<textarea
										className="clarify-textarea"
										value={responses[i] || ""}
										onChange={(e) => setResponse(i, e.target.value)}
										rows={3}
									/>
								)}

								{/* Feeling-selecting prompts: render as Pills that carry over */}
								{prompt.selectsFeeling && (prompt.type === "multiChoice" || prompt.type === "singleChoice") && (
									<div className="pill-grid cloud">
										{prompt.options.map((opt) => (
											<Pill
												key={opt}
												item={opt}
												type="feeling"
												state={feelings[opt] === "clicked" || feelings[opt] === "double-clicked" ? "clicked" : ""}
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

export default ClarifyPopup;
