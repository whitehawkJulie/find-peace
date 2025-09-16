import React, { useState } from "react";
import Checklist from "./Checklist";
import { feelingsData } from "./feelingsData";
import { useWizard } from "./WizardContext";
import FauxFeelingsTable from "../data/FauxFeelingsTable";
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
				<FauxFeelingsTable />
			</SlideDrawer>
		</div>
	);
};

Feelings.title = "Feelings";
Feelings.helpContent =
	"What are you feeling in response to the observation you just made? Feelings point toward what matters — your needs.";

export default Feelings;
