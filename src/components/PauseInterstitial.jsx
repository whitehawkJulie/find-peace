import React from "react";
import "./PauseInterstitial.css";

const PauseInterstitial = ({ message, onContinue }) => {
	return (
		<div className="pause-interstitial">
			<p className="pause-message">{message}</p>
			<button className="pause-continue" onClick={onContinue}>
				Continue
			</button>
		</div>
	);
};

export default PauseInterstitial;
