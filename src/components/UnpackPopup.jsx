import React, { useState, useEffect } from "react";
import Pill from "./Pill";
import "./UnpackPopup.css";

const UnpackPopup = ({
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

	// Reset internal state when the popup opens for a different item
	useEffect(() => {
		setShowKeepPrompt(false);
		setResponses({});
	}, [itemData?.item]);

	if (!itemData) return null;

	const isStoryWord = itemData.type === "storyWord";
	const isMurky = itemData.unpack?.type === "murky";

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
		<div className="unpack-popup-backdrop" onClick={onClose}>
			<div className="unpack-popup" onClick={(e) => e.stopPropagation()}>
				{/* ===== Story Word Mode ===== */}
				{isStoryWord && (
					<>
						<div className="unpack-popup-header">
							<h3>{itemData.item}</h3>
						</div>

						{itemData.storyHint && (
							<p className="unpack-reframe">{itemData.storyHint}.</p>
						)}

						{itemData.empathyGuesses?.length > 0 && (
							<div className="unpack-empathy-guesses">
								<p className="unpack-label">You might be telling yourself:</p>
								<ul>
									{itemData.empathyGuesses.map((guess, i) => (
										<li key={i}>{guess}</li>
									))}
								</ul>
							</div>
						)}

						{itemData.suggestedFeelings?.length > 0 && (
							<div className="unpack-suggestions">
								<p className="unpack-label">What you might actually be feeling:</p>
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
							<div className="unpack-suggestions">
								<p className="unpack-label">Needs that might be underneath:</p>
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
							<button className="unpack-ok" onClick={() => setShowKeepPrompt(true)}>
								OK
							</button>
						) : (
							<div className="unpack-keep-prompt">
								<p>Do you still want to keep "{itemData.item}"?</p>
								<div className="unpack-keep-buttons">
									<button
										className="unpack-keep-btn"
										onClick={() => onKeepWord(itemData.item, true)}>
										Yes, keep it
									</button>
									<button
										className="unpack-keep-btn unpack-keep-btn-secondary"
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
						<div className="unpack-popup-header">
							<h3>{itemData.unpack.title}</h3>
						</div>

						<p className="unpack-intro">{itemData.unpack.intro}</p>

						{itemData.unpack.prompts.map((prompt, i) => (
							<div key={i} className="unpack-prompt">
								<p className="unpack-prompt-question">{prompt.question}</p>

								{prompt.stem && (
									<span className="unpack-stem">{prompt.stem}</span>
								)}

								{prompt.type === "text" && (
									<textarea
										className="unpack-textarea"
										value={responses[i] || ""}
										onChange={(e) => setResponse(i, e.target.value)}
										rows={3}
									/>
								)}

								{prompt.type === "singleChoice" && (
									<div className="unpack-choices">
										{prompt.options.map((opt) => (
											<button
												key={opt}
												className={`unpack-choice ${responses[i] === opt ? "chosen" : ""}`}
												onClick={() => setResponse(i, opt)}>
												{opt}
											</button>
										))}
									</div>
								)}

								{prompt.type === "multiChoice" && (
									<div className="unpack-choices">
										{prompt.options.map((opt) => (
											<button
												key={opt}
												className={`unpack-choice ${(responses[i] || []).includes(opt) ? "chosen" : ""}`}
												onClick={() => toggleMultiChoice(i, opt)}>
												{opt}
											</button>
										))}
									</div>
								)}
							</div>
						))}

						<button className="unpack-ok" onClick={onClose}>
							Done
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default UnpackPopup;
