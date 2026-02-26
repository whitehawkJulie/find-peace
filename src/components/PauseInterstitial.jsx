import React from "react";
import "./PauseInterstitial.css";

const PauseInterstitial = ({ message, onContinue }) => {
	return (
		<div className="pause-interstitial">
			<div className="pause-message">{typeof message === "string" ? <p>{message}</p> : message}</div>

			<div className="pause-nav">
				<span className="pause-nav-spacer" />
				<button className="pause-nav-continue" onClick={onContinue}>
					Continue →
				</button>
			</div>
		</div>
	);
};

export default PauseInterstitial;
