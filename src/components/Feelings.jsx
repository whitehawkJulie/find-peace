import React from "react";
import Checklist from "./Checklist";

import { feelingsData } from "./FeelingsData";

const Feelings = ({ feelings, setFeelings }) => {
	return (
		<div className="step-feelings">
			<Checklist
				data={feelingsData}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				doubleClickEnabled={false}
			/>
		</div>
	);
};

export default Feelings;
