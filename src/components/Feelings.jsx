import React from "react";
import Checklist from "./Checklist";
import { feelingsData } from "./feelingsData";
import { useWizard } from "./WizardContext";
import { fauxFeelingsList, getFauxFeeling } from "../utils/fauxLookup";
import FauxUnpackInline from "./FauxUnpackInline";

// Build the real feelings data (excluding "Faux Feelings" category)
const realFeelingsData = feelingsData["Feelings when needs are not met"];

const Feelings = () => {
	const { observation, feelings, setFeelings, needs, setNeeds } = useWizard();

	// Render callback for inline faux unpack
	const renderFauxUnpack = (fauxItemName) => {
		const fauxItem = getFauxFeeling(fauxItemName);
		if (!fauxItem) return null;

		return (
			<FauxUnpackInline
				fauxItem={fauxItem}
				feelings={feelings}
				setFeelings={setFeelings}
				needs={needs}
				setNeeds={setNeeds}
			/>
		);
	};

	return (
		<div className="step-feelings">
			<p>
				How are you feeling now about <strong>{observation || "what happened"}</strong>?
			</p>

			<Checklist
				data={realFeelingsData}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				type="feelings"
				fauxItems={fauxFeelingsList}
				renderFauxUnpack={renderFauxUnpack}
			/>
		</div>
	);
};

Feelings.title = "Feelings";
Feelings.helpContent = (
	<>
		<p>
			What are you feeling in response to the observation you just made? Feelings point toward
			what matters — your needs.
		</p>
		<p>
			<strong>Tap once</strong> to select a feeling. <strong>Double-tap</strong> to mark a
			feeling as especially strong.
		</p>
		<p>
			Start with the categories that call to you — you don't need to look at all of them. Each
			category also has a <em>"Words for pain..."</em> section at the bottom. These are words
			that carry real pain, but describe what happened to you more than what you're feeling in
			your body. If one resonates, tap it to see what feelings and needs might be underneath.
		</p>
		<h4>Why body-based feelings?</h4>
		<p>
			Our minds can dwell on stories forever. But our bodies have a powerful ability to move
			through actual emotions — if we can name them. The shift from story to sensation is where
			the real power is.
		</p>
	</>
);

export default Feelings;
