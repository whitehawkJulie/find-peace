import React from "react";
import { useGratitude } from "../GratitudeContext";
import "./GratitudeStep.css";

const GratitudeWelcome = () => {
	const { setStepIndex } = useGratitude();

	return (
		<div className="g-step g-welcome">
			<div className="g-welcome-emoji">🌿</div>

			<p className="g-welcome-lead">
				Gratitude is more than just saying thanks. When we slow down and notice exactly what happened,
				how it felt, and what need it met — gratitude becomes something we can actually feel.
			</p>

			<p>
				This tool will guide you through three simple steps:
			</p>

			<ol className="g-welcome-steps">
				<li><strong>Observation</strong> — what happened that you're grateful for?</li>
				<li><strong>Feelings</strong> — how did it feel?</li>
				<li><strong>Needs</strong> — what deep need was met?</li>
			</ol>

			<p>
				Then, if you'd like, you can turn it into something you could share with the person involved.
			</p>

			<button className="g-welcome-start" onClick={() => setStepIndex(1)}>
				Let's begin →
			</button>
		</div>
	);
};

GratitudeWelcome.title = "Gratitude";
GratitudeWelcome.navTitle = "Welcome";

export default GratitudeWelcome;
