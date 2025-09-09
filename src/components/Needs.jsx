import React from "react";
import Checklist from "./Checklist";
import needsData from "./NeedsData";
import { useWizard } from "./WizardContext";

const Needs = () => {
	const { needs, setNeeds, feelings } = useWizard(); // <- fix: access feelings from context

	return (
		<div className="step-needs">
			{feelings.length > 0 && (
				<p>
					So, you're feeling <strong>{feelings.join(", ")}</strong>.
				</p>
			)}
			<p>What needs might be underneath those feelings?</p>

			<Checklist
				data={needsData}
				selectedItems={needs}
				setSelectedItems={setNeeds}
				allowDoubleClick={true}
				showMeanings={true}
			/>
		</div>
	);
};

Needs.title = "Needs";
Needs.helpContent =
	"Feelings arise because our needs are met or unmet. Which needs feel relevant right now? Double-click a need if it feels met.";

export default Needs;
