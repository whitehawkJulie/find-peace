import React from "react";
import FeelingsChecklist from "./FeelingsChecklist";

import { metNeedsFeelingsData, unmetNeedsFeelingsData } from "./FeelingsData";

const Feelings = ({ upFeelings, setUpFeelings, downFeelings, setDownFeelings }) => {
	return (
		<div className="step-feelings">
			<FeelingsChecklist
				title="Feelings when needs are unmet"
				type="unmet"
				feelingsData={unmetNeedsFeelingsData}
				selectedFeelings={downFeelings}
				setSelectedFeelings={setDownFeelings}
				initiallyOpen={true}
			/>

			<FeelingsChecklist
				title="Feelings when needs are met"
				type="met"
				feelingsData={metNeedsFeelingsData}
				selectedFeelings={upFeelings}
				setSelectedFeelings={setUpFeelings}
				initiallyOpen={false}
			/>
		</div>
	);
};

export default Feelings;
