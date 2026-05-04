import React, { useState, useEffect, useMemo, useRef } from "react";
import { trackEvent, currentPage } from "../analytics/analytics";
import Pill from "./Pill";
import { useScrollIndicator } from "../hooks/useScrollIndicator";
import "./ClarifyFeelings.css";
import "./popup-scroll.css";

const ClarifyFeelings = ({ itemData, feelings, needs, onToggleFeeling, onToggleNeed, onClose }) => {
	const [responses, setResponses] = useState({});

	// Pick a random attunement statement once per item (stable across re-renders)
	const attunement = useMemo(() => {
		if (!itemData?.clarify?.attunement?.length) return null;
		const arr = itemData.clarify.attunement;
		return arr[Math.floor(Math.random() * arr.length)];
	}, [itemData?.item]);

	const bodyRef = useRef(null);
	const hasMoreBelow = useScrollIndicator(bodyRef);

	// Track open/close (fires once on mount/unmount)
	const openAt = useRef(Date.now());
	useEffect(() => {
		const wordType = itemData?.type === "storyWord" ? "story_word" : "murky";
		trackEvent("ui_open", { type: "modal", name: "clarify-feelings",
			word: itemData?.item, word_type: wordType, page_name: currentPage });
		return () => {
			trackEvent("ui_close", { type: "modal", name: "clarify-feelings",
				time_open_ms: Date.now() - openAt.current });
		};
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Reset internal state and scroll position when the popup opens for a different item
	useEffect(() => {
		setResponses({});
		if (bodyRef.current) bodyRef.current.scrollTop = 0;
	}, [itemData?.item]);

	if (!itemData) return null;

	const isStoryWord = itemData.type === "storyWord";
	const isMurky = itemData.clarify?.type === "murky";

	const isChosen = (obj, key) => obj[key] === "clicked" || obj[key] === "double-clicked";

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
							<h3 className="clarify-popup-title">{itemData.item}</h3>
							<button className="clarify-popup-close" onClick={onClose} aria-label="Close">×</button>
						</div>
						<div className="popup-scroll-wrapper">
						<div className="clarify-popup-body" ref={bodyRef}>

						{itemData.storyHint && <p className="clarify-reframe highlight-box">{itemData.storyHint}.</p>}

						{itemData.empathyGuesses?.length > 0 && (
							<div className="clarify-guess-rows">
								{itemData.empathyGuesses.map((entry, i) => {
									const hasFeelings = entry.feelings?.length > 0;
									const hasNeeds = entry.needs?.length > 0;
									const hasPills = hasFeelings || hasNeeds;
									const isOrienting = i === 0 && !hasPills;
									const rowClass = [
										"clarify-guess-row",
										isOrienting ? "clarify-guess-row--orienting" : "",
										hasPills ? "clarify-guess-row--has-pills" : "",
									].filter(Boolean).join(" ");
									return (
										<div key={i} className={rowClass}>
											{entry.text && (
												<p className="clarify-guess-text">{entry.text}</p>
											)}
											{hasFeelings && (
												<div className="clarify-guess-pill-group">
													<span className="clarify-guess-pill-label">are you feeling</span>
													{entry.feelings.map((f) => (
														<Pill
															key={f}
															item={f}
															type="feeling"
															state={feelings[f] || ""}
															onClick={() => {
																trackEvent("action", { action_name: "story_word_feeling_toggle",
																	word: itemData.item, feeling: f, selected: !isChosen(feelings, f) });
																onToggleFeeling(f);
															}}
														/>
													))}
												</div>
											)}
											{hasNeeds && (
												<div className="clarify-guess-pill-group">
													<span className="clarify-guess-pill-label">are you needing</span>
													{entry.needs.map((n) => (
														<Pill
															key={n}
															item={n}
															type="need"
															state={needs[n] || ""}
															onClick={() => {
																trackEvent("action", { action_name: "story_word_need_toggle",
																	word: itemData.item, need: n, selected: !isChosen(needs, n) });
																onToggleNeed(n);
															}}
														/>
													))}
												</div>
											)}
										</div>
									);
								})}
							</div>
						)}

						<button className="clarify-ok" onClick={() => {
							trackEvent("action", {
								action_name: "story_word_ok",
								word: itemData.item,
								feelings_chosen: (itemData.suggestedFeelings || []).filter((f) => feelings[f]).length,
								needs_chosen:    (itemData.suggestedNeeds    || []).filter((n) => needs[n]).length,
							});
							onClose();
						}}>
							OK
						</button>
						</div>{/* end clarify-popup-body */}
						<div className="popup-scroll-fade" aria-hidden="true" style={{ opacity: hasMoreBelow ? 1 : 0 }} />
						<button
							className="popup-scroll-label"
							style={{ opacity: hasMoreBelow ? 1 : 0, pointerEvents: hasMoreBelow ? "auto" : "none" }}
							onClick={() => bodyRef.current?.scrollBy({ top: bodyRef.current.clientHeight * 0.75, behavior: "smooth" })}
							tabIndex={hasMoreBelow ? 0 : -1}
							aria-label="Scroll down for more">
							scroll for more ↓
						</button>
					</div>{/* end popup-scroll-wrapper */}
				</>
			)}

			{/* ===== Murky Feeling Mode ===== */}
				{isMurky && (
					<>
						<div className="clarify-popup-header">
							<h3 className="clarify-popup-title">{itemData.clarify.title}</h3>
							<button className="clarify-popup-close" onClick={onClose} aria-label="Close">×</button>
						</div>
						<div className="popup-scroll-wrapper">
						<div className="clarify-popup-body" ref={bodyRef}>
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
										data-field-id="clarify-feelings"
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
						</div>{/* end clarify-popup-body */}
						<div className="popup-scroll-fade" aria-hidden="true" style={{ opacity: hasMoreBelow ? 1 : 0 }} />
						<button
							className="popup-scroll-label"
							style={{ opacity: hasMoreBelow ? 1 : 0, pointerEvents: hasMoreBelow ? "auto" : "none" }}
							onClick={() => bodyRef.current?.scrollBy({ top: bodyRef.current.clientHeight * 0.75, behavior: "smooth" })}
							tabIndex={hasMoreBelow ? 0 : -1}
							aria-label="Scroll down for more">
							scroll for more ↓
						</button>
					</div>{/* end popup-scroll-wrapper */}
				</>
			)}
		</div>
	</div>
);
};

export default ClarifyFeelings;
