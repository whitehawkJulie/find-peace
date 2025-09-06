import React, { useState } from "react";
// import "./Feelings.css";
import { metNeedsFeelings, unmetNeedsFeelings } from "./FeelingsData";

import FeelingsChecklist from "./FeelingsChecklist";

const Feelings = ({ selectedUpFeelings, setSelectedUpFeelings, selectedDownFeelings, setSelectedDownFeelings }) => {
	const [showMet, setShowMet] = useState(false);

	return (
		<div className="feelings">
			<div className="feelings-section">
				<button onClick={() => setShowMet((prev) => !prev)} className="toggle-button">
					{showMet ? "Hide" : "Also show"} positive feelings
				</button>
				{showMet && (
					<FeelingsChecklist
						data={metNeedsFeelings}
						selected={selectedUpFeelings}
						setSelected={setSelectedUpFeelings}
						className="met"
					/>
				)}
			</div>

			<div className="feelings-section">
				<FeelingsChecklist
					data={unmetNeedsFeelings}
					selected={selectedDownFeelings}
					setSelected={setSelectedDownFeelings}
					className="unmet"
				/>
			</div>
		</div>
	);
};

export default Feelings;
