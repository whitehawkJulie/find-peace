import React, { useState } from "react";
import { useGratitude } from "../GratitudeContext";
import "./GratitudeStep.css";

const GratitudeReview = () => {
	const { reviewReflection, setReviewReflection, setShowSummary, saveEntry } = useGratitude();
	const [saved, setSaved] = useState(false);

	const handleSave = () => {
		saveEntry();
		setSaved(true);
		setTimeout(() => setSaved(false), 2500);
	};

	return (
		<div className="g-step g-review">
			<div className="g-review-arrival">
				<p className="g-review-main">
					You took a moment to really notice something good.
				</p>
				<p className="g-review-sub">That matters.</p>
			</div>

			<p className="g-review-prompt">Anything else you'd like to note?</p>
			<textarea
				className="g-textarea"
				rows={3}
				value={reviewReflection}
				onChange={(e) => setReviewReflection(e.target.value)}
				placeholder="Optional reflection…"
			/>

			<div className="g-review-actions">
				<button className="g-view-summary-btn" onClick={() => setShowSummary(true)}>
					📋 View summary
				</button>
				<button className="g-save-btn" onClick={handleSave}>
					{saved ? "✓ Saved!" : "💾 Save"}
				</button>
			</div>
		</div>
	);
};

GratitudeReview.title = "Done";
GratitudeReview.navTitle = "Done";

export default GratitudeReview;
