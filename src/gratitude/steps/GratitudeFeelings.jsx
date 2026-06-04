import React from "react";
import Checklist from "../../components/Checklist";
import { AllFeelingsData } from "../../data/AllFeelingsData";
import { useGratitude } from "../GratitudeContext";
import "./GratitudeStep.css";

const GratitudeFeelings = () => {
	const { feelings, setFeelings } = useGratitude();

	return (
		<div className="g-step g-step--checklist">
			<p>
				When that happened, how did you feel? These are the feelings that arise when our needs are
				being met — the warm, alive, expansive ones.
			</p>
			<p className="g-hint">Tap once to select, twice to mark as especially strong.</p>

			<Checklist
				data={[AllFeelingsData.sections.feelingsMet]}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				type="feelings"
				showListModeToggle={true}
				defaultListMode="short"
			/>
		</div>
	);
};

GratitudeFeelings.title = "How did it feel?";
GratitudeFeelings.navTitle = "Feelings";

export default GratitudeFeelings;
