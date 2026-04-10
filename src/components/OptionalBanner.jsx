import React from "react";
import "./OptionalBanner.css";

const OptionalBanner = ({ message = "Feel free to skim or skip — this section isn't essential." }) => (
	<div className="optional-banner" aria-label="Optional step">
		<span className="optional-banner-tag">Optional</span>
		<span className="optional-banner-text">{message}</span>
	</div>
);

export default OptionalBanner;
