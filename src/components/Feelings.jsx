import React from "react";
import Checklist from "./Checklist";
import { feelingsData } from "./FeelingsData";
import { useWizard } from "./WizardContext";

const Feelings = () => {
	const { observation, feelings, setFeelings } = useWizard();

	return (
		<div className="step-feelings">
			<p>
				How are you feeling now about <strong>{observation || "what happened"}</strong>?
			</p>

			<p className="smaller">Selected: {feelings.join(", ")}</p>

			<Checklist
				data={feelingsData}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				allowDoubleClick={false}
				showMeanings={true}
			/>
		</div>
	);
};

Feelings.title = "Feelings";
Feelings.helpContent =
	"What are you feeling in response to the observation you just made? Feelings point toward what matters — your needs.";

export default Feelings;
