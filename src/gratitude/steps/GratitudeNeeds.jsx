import React from "react";
import Checklist from "../../components/Checklist";
import { Needs as NeedsData } from "../../data/AllNeedsData";
import { filterByState } from "../../utils/renderHelpers";
import { useGratitude } from "../GratitudeContext";
import "./GratitudeStep.css";

const GratitudeNeeds = () => {
	const { needs, setNeeds, feelings } = useGratitude();

	const selectedFeelings = filterByState(feelings, "clicked").concat(filterByState(feelings, "double-clicked"));

	return (
		<div className="g-step g-step--checklist step-needs">
			{selectedFeelings.length > 0 && (
				<div className="g-feelings-recap">
					<span className="g-feelings-recap-label">You felt: </span>
					{selectedFeelings.map((f, i) => (
						<span key={f}>
							{i > 0 && ", "}
							<span className={feelings[f] === "double-clicked" ? "g-strong" : ""}>{f}</span>
						</span>
					))}
				</div>
			)}

			<p>
				Those feelings are telling you that something important was present. What need was being met?
			</p>
			<p className="g-hint">Tap once to select, twice to mark as especially central.</p>

			<Checklist
				data={[
					NeedsData.sections.connection,
					NeedsData.sections.meaning,
					NeedsData.sections.freedom,
					NeedsData.sections.subsistence,
				]}
				selectedItems={needs}
				setSelectedItems={setNeeds}
				type="needs"
				showListModeToggle={true}
				defaultListMode="full"
			/>
		</div>
	);
};

GratitudeNeeds.title = "What needs were met?";
GratitudeNeeds.navTitle = "Needs";

export default GratitudeNeeds;
