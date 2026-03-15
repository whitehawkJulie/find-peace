import React, { useState } from "react";
import { bodySensationGroups } from "../data/BodySensationsData";
import "./BodySensationsPopup.css";

const BodySensationsPopup = ({ selected, onToggle, onCustomChange, customText, onClose }) => {
	const selectedSet = new Set(selected);
	const [wordsOpen, setWordsOpen] = useState(false);

	return (
		<div className="body-sens-backdrop" onClick={onClose}>
			<div className="body-sens-popup" onClick={(e) => e.stopPropagation()}>
				<h2>Optional body check-in</h2>

				<p>
					<strong>Take a moment and notice what your body is doing right now.</strong>
				</p>

				<p>
					When you think about the situation you described, where do you feel it in your body? If you need
					help, scan these areas:
				</p>

				<ul>
					<li>
						<strong>Chest</strong> — tight, warm, heavy, open
					</li>
					<li>
						<strong>Belly</strong> — knots, butterflies, churning
					</li>
					<li>
						<strong>Throat</strong> — open, tight, blocked
					</li>
					<li>
						<strong>Shoulders &amp; neck</strong> — tense, raised, relaxed
					</li>
					<li>
						<strong>Jaw &amp; face</strong> — clenched, soft
					</li>
					<li>
						<strong>Hands &amp; arms</strong> — restless, tingling, heavy
					</li>
				</ul>

				<p>
					If nothing stands out, you might notice ease or tension, warmth or coolness, movement or stillness.
				</p>

				<div className="body-sens-accordion">
					<button
						className={`body-sens-accordion-toggle ${wordsOpen ? "open" : ""}`}
						onClick={() => setWordsOpen((prev) => !prev)}>
						<span>Want more sensation words?</span>
						<span className="body-sens-accordion-chevron">{wordsOpen ? "▲" : "▼"}</span>
					</button>
					{wordsOpen && (
						<div className="body-sens-accordion-body">
							<div className="body-sens-groups">
								{bodySensationGroups.map(({ heading, words }) => (
									<div key={heading} className="body-sens-group">
										<p className="body-sens-group-heading">{heading}</p>
										<div className="body-sens-words">
											{words.map((word) => (
												<button
													key={word}
													className={`body-sens-word ${selectedSet.has(word) ? "selected" : ""}`}
													onClick={() => onToggle(word)}>
													{word}
												</button>
											))}
										</div>
									</div>
								))}
							</div>
						</div>
					)}
				</div>

				<div className="body-sens-custom">
					<label className="body-sens-custom-label">Anything else you noticed?</label>
					<textarea
						className="body-sens-custom-input"
						placeholder="e.g. tight throat, heavy eyelids…"
						value={customText}
						onChange={(e) => onCustomChange(e.target.value)}
						rows={2}
					/>
				</div>

				<button className="body-sens-done" onClick={onClose}>
					Done
				</button>
			</div>
		</div>
	);
};

export default BodySensationsPopup;
