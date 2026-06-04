import React, { useState, useEffect } from "react";
import { useGratitude } from "./GratitudeContext";
import GratitudeMenuBar from "./GratitudeMenuBar";
import GratitudeSummaryModal from "./GratitudeSummaryModal";
import "./GratitudeCard.css";

const GratitudeCard = ({ title, children }) => {
	const { cardContentRef, currentStep, showSummary } = useGratitude();

	const color = currentStep?.color || "#7a9a5a";

	// Scroll to top on step change
	useEffect(() => {
		cardContentRef.current?.scrollTo(0, 0);
	}, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="g-card" style={{ "--step-color": color }}>
			<div className="g-card-header">
				<h1 className="g-card-title">{title}</h1>
				<div className="g-card-brand">🌿 Gratitude</div>
			</div>

			<div className="g-card-content" ref={cardContentRef}>
				{children}
			</div>

			<GratitudeMenuBar />
			{showSummary && <GratitudeSummaryModal />}
		</div>
	);
};

export default GratitudeCard;
