import React, { useState } from "react";
// import "./Feelings.css";
import { metNeedsFeelings, unmetNeedsFeelings } from "./FeelingsData";

import FeelingsChecklist from "./FeelingsChecklist";

const Feelings = ({ selectedUpFeelings, setSelectedUpFeelings, selectedDownFeelings, setSelectedDownFeelings }) => {
	const [showMet, setShowMet] = useState(false);

	const toggleFeeling = (feeling, type) => {
		if (type === "met") {
			setSelectedMet((prev) => (prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]));
		} else {
			setSelectedUnmet((prev) =>
				prev.includes(feeling) ? prev.filter((f) => f !== feeling) : [...prev, feeling]
			);
		}
	};

	return (
		<div className="feelings">
			<div className="feelings-section">
				<h3>Feelings when needs are met</h3>
				<button onClick={() => setShowMet((prev) => !prev)} className="toggle-button">
					{showMet ? "Hide" : "Show"} Feelings
				</button>
				{showMet && (
					<FeelingsChecklist
						data={metNeedsFeelings}
						selected={selectedUpFeelings}
						setSelected={setSelectedUpFeelings}
					/>
				)}
			</div>

			<div className="feelings-section">
				<h3>Feelings when needs are not met</h3>
				<FeelingsChecklist
					data={unmetNeedsFeelings}
					selected={selectedDownFeelings}
					setSelected={setSelectedDownFeelings}
				/>
			</div>
		</div>
	);
};

export default Feelings;
