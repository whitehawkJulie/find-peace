import React, { useState } from "react";
import Checklist from "./Checklist";
import { feelingsData } from "./FeelingsData";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";

const Feelings = () => {
	const { observation, feelings, setFeelings } = useWizard();
	const [showFauxHelp, setShowFauxHelp] = useState(false);

	return (
		<div className="step-feelings">
			<p>
				How are you feeling now about <strong>{observation || "what happened"}</strong>?
			</p>

			<Checklist data={feelingsData} selectedItems={feelings} setSelectedItems={setFeelings} type="feelings" />

			<div style={{ marginTop: "2rem", textAlign: "center" }}>
				<button className="subtle-button" onClick={() => setShowFauxHelp(true)}>
					Can't find the word you're looking for?
				</button>
			</div>

			<SlideDrawer isOpen={showFauxHelp} onClose={() => setShowFauxHelp(false)} title="Faux Feelings">
				<p>
					Sometimes we say things like “I feel ignored” or “I feel manipulated.” But these aren’t actual
					feelings — they’re interpretations of someone else’s behaviour.
				</p>
				<p>
					A real feeling might be “I feel sad” or “I feel lonely.” Try asking yourself: “If I couldn’t blame
					them, what would I be feeling?”
				</p>
			</SlideDrawer>
		</div>
	);
};

Feelings.title = "Feelings";
Feelings.helpContent =
	"What are you feeling in response to the observation you just made? Feelings point toward what matters — your needs.";

export default Feelings;
