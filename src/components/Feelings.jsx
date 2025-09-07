import React from "react";
import FeelingsChecklist from "./FeelingsChecklist";
import { metNeedsFeelings, unmetNeedsFeelings } from "./FeelingsData";

const Feelings = ({ selectedMetFeelings, setSelectedMetFeelings, selectedUnmetFeelings, setSelectedUnmetFeelings }) => {
	return (
		<div className="step-feelings">
			<FeelingsChecklist
				title="Feelings when needs are met"
				feelingsData={metNeedsFeelings}
				selectedFeelings={selectedMetFeelings}
				setSelectedFeelings={setSelectedMetFeelings}
				type="met"
				initiallyOpen={false}
			/>
			<FeelingsChecklist
				title="Feelings when needs are not met"
				feelingsData={unmetNeedsFeelings}
				selectedFeelings={selectedUnmetFeelings}
				setSelectedFeelings={setSelectedUnmetFeelings}
				type="unmet"
				initiallyOpen={true}
			/>
		</div>
	);
};

export default Feelings;
