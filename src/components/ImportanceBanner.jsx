import React from "react";
import "./ImportanceBanner.css";

const ImportanceBanner = ({
	heading = "Optional",
	message = "Feel free to skim or skip — this section isn't essential.",
}) => (
	<div className="importance-banner" aria-label="Optional step">
		<span className="importance-banner-tag">{heading}</span>
		<span className="importance-banner-text">{message}</span>
	</div>
);

export default ImportanceBanner;
