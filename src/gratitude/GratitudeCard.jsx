import React, { useEffect } from "react";
import { useGratitude } from "./GratitudeContext";
import GratitudeMenuBar from "./GratitudeMenuBar";
import GratitudeSummaryModal from "./GratitudeSummaryModal";
import GratitudeHistory from "./GratitudeHistory";
import "./GratitudeCard.css";

const GratitudeCard = ({ title, children }) => {
	const { cardContentRef, currentStep, showSummary, showHistory, setShowHistory } = useGratitude();

	const color = currentStep?.color || "#7a9a5a";

	// Scroll to top on step change
	useEffect(() => {
		cardContentRef.current?.scrollTo(0, 0);
	}, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="g-card" style={{ "--step-color": color }}>
			<div className="g-card-header">
				<h1 className="g-card-title">{title}</h1>
				<button
					className="g-card-history-btn"
					onClick={() => setShowHistory(true)}
					aria-label="Past entries"
					title="Past entries">
					📖
				</button>
			</div>

			<div className="g-card-content" ref={cardContentRef}>
				{children}
			</div>

			<GratitudeMenuBar />
			{showSummary && <GratitudeSummaryModal />}
			{showHistory && <GratitudeHistory />}
		</div>
	);
};

export default GratitudeCard;
