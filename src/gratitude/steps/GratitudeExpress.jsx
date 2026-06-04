import React from "react";
import { useGratitude } from "../GratitudeContext";
import { filterByState } from "../../utils/renderHelpers";
import "./GratitudeStep.css";

const GratitudeExpress = () => {
	const { observation, feelings, needs } = useGratitude();

	const allFeelings = [
		...filterByState(feelings, "double-clicked"),
		...filterByState(feelings, "clicked"),
	];
	const allNeeds = [
		...filterByState(needs, "double-clicked"),
		...filterByState(needs, "clicked"),
	];

	const feelingsText = allFeelings.join(", ");
	const needsText = allNeeds.join(", ");

	return (
		<div className="g-step">
			<p>
				Here's everything you've reflected on. If you'd like to express this gratitude to someone,
				you can use these three pieces as the building blocks of what you say.
			</p>

			<div className="g-express-guide">
				<p>
					A simple structure that works well:
				</p>
				<blockquote className="g-express-template">
					"When <em>[observation]</em>, I felt <em>[feelings]</em> because it met my need
					for <em>[needs]</em>."
				</blockquote>
				<p className="g-hint">
					You don't have to say it exactly like that — this is just a starting point.
					Use your own words, and share as much or as little as feels right.
				</p>
			</div>

			<div className="g-express-fields">
				<div className="g-express-field">
					<label className="g-label">What happened</label>
					<div className="g-express-box">
						{observation?.trim() || <span className="g-placeholder">Nothing entered yet</span>}
					</div>
				</div>

				<div className="g-express-field">
					<label className="g-label">How I felt</label>
					<div className="g-express-box">
						{feelingsText || <span className="g-placeholder">No feelings selected yet</span>}
					</div>
				</div>

				<div className="g-express-field">
					<label className="g-label">Needs that were met</label>
					<div className="g-express-box">
						{needsText || <span className="g-placeholder">No needs selected yet</span>}
					</div>
				</div>
			</div>
		</div>
	);
};

GratitudeExpress.title = "Expressing it";
GratitudeExpress.navTitle = "Express";

export default GratitudeExpress;
