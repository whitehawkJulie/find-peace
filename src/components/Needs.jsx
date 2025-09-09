import React from "react";
import Checklist from "./Checklist";
import needsData from "./NeedsData";
import { useWizard } from "./WizardContext";

const renderOrderedFeelings = (feelings) => {
	const entries = Object.entries(feelings);

	if (entries.length === 0) {
		return <p>What was missing that led to how you are feeling?</p>;
	}

	return (
		<p>
			What was missing that led to you feeling <br />
			{entries.map(([feeling, strength], i) => (
				<React.Fragment key={feeling}>
					{i > 0 && ", "}
					{strength === "double" ? <strong>{feeling}</strong> : feeling}
				</React.Fragment>
			))}
		</p>
	);
};

const Needs = () => {
	const { needs, setNeeds, feelings } = useWizard(); // <- fix: access feelings from context

	return (
		<div className="step-needs">
			{renderOrderedFeelings(feelings)}

			<Checklist data={needsData} selectedItems={needs} setSelectedItems={setNeeds} showMeanings={true} />
		</div>
	);
};

Needs.title = "Needs";
Needs.helpContent =
	"Feelings arise because our needs are met or unmet. Which needs feel relevant right now? Double-click a need if it feels met.";

export default Needs;
