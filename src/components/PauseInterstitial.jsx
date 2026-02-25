import React from "react";
import "./PauseInterstitial.css";

const PauseInterstitial = ({ message, onContinue }) => {
	return (
		<div className="pause-interstitial">
			<div className="pause-message">
				{typeof message === "string" ? <p>{message}</p> : message}
			</div>
			<button className="pause-continue" onClick={onContinue}>
				Continue
			</button>
		</div>
	);
};

export default PauseInterstitial;
