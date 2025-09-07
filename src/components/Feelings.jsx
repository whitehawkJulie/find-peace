import React from "react";
import Checklist from "./Checklist";

import { feelingsData } from "./FeelingsData";

const Feelings = ({ feelings, setFeelings }) => {
	return (
		<div className="step-feelings">
			<Checklist
				data={{ Feelings: feelingsData }}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				allowDoubleClick={false}
				showMeanings={true}
			/>
		</div>
	);
};

export default Feelings;
