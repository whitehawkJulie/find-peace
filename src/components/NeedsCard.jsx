import React from "react";
import Checklist from "./Checklist";
import CardWrapper from "./CardWrapper";
import { needsData } from "./NeedsData";

const NeedsCard = ({ needs, setNeeds, onPrev, onNext }) => {
	const helpContent = (
		<div>
			<p>
				Click a need to mark it as <strong>unmet</strong>.
			</p>
			<p>
				Double-click to mark it as <strong>met</strong>.
			</p>
			<p>Click again to remove it.</p>
		</div>
	);

	return (
		<CardWrapper title="Needs" showHelp={true} helpContent={helpContent} onPrev={onPrev} onNext={onNext}>
			<Checklist
				data={needsData}
				selectedItems={needs}
				setSelectedItems={setNeeds}
				allowDoubleClick={true}
				showMeanings={true}
			/>
		</CardWrapper>
	);
};

export default NeedsCard;
