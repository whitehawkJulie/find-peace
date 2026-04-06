import React from "react";
import { useWizard } from "./WizardContext";
import "./Review.css";

const Review = () => {
	const { reviewReflection, setReviewReflection, setShowSummary, openHelpTopic } = useWizard();

	// Track when a user reaches the Review page (fires once on mount) - REPLACED with analytics page tracking
	// React.useEffect(() => {
	// 	fetch("/api/visit.php");
	// }, []);

	return (
		<div className="review">
			<p>You've taken the time to slow down and listen to what was happening for you. What did you learn?</p>

			<p className="review-reflection-prompt">
				{"Would you like to make any final notes on what you learned, or what stood out to you?"}
			</p>
			<textarea
				className="review-reflection-textarea"
				data-field-id="review-reflection"
				rows={3}
				value={reviewReflection}
				onChange={(e) => setReviewReflection(e.target.value)}
			/>

			<button className="review-view-summary-btn" onClick={() => setShowSummary(true)}>
				📋 View summary
			</button>

			<p className="review-feedback-prompt">
				<button className="review-feedback-link" onClick={() => openHelpTopic("feedback")}>
					How did this go for you?
				</button>
			</p>
		</div>
	);
};

Review.title = "Review";
Review.navTitle = "Review";

export default Review;
