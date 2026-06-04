import React from "react";
import { useGratitude } from "../GratitudeContext";
import "./GratitudeStep.css";

const GratitudeWelcome = () => {
	const { setStepIndex } = useGratitude();

	return (
		<div className="g-step g-welcome">
			<div className="g-welcome-emoji">🌿</div>

			<p className="g-welcome-lead">
				Behind every moment of gratitude is something precious that mattered to us. When we slow down and notice
				what happened, how it felt, and what need was met, gratitude can shift from a polite idea into something
				we genuinely feel.
			</p>
			<p>
				It also offers a beautiful way to let someone know not just what they did, but what it meant to us, if
				we choose to express it.
			</p>

			<p>This tool will guide you through three simple steps:</p>

			<ol className="g-welcome-steps">
				<li>
					<strong>Observation</strong> — what happened that you're grateful for?
				</li>
				<li>
					<strong>Feelings</strong> — how did it feel?
				</li>
				<li>
					<strong>Needs</strong> — what deep need was met?
				</li>
			</ol>

			<button className="g-welcome-start" onClick={() => setStepIndex(1)}>
				Let's begin →
			</button>
		</div>
	);
};

GratitudeWelcome.title = "Gratitude";
GratitudeWelcome.navTitle = "Welcome";

export default GratitudeWelcome;
