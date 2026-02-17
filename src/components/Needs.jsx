import React from "react";
import Checklist from "./Checklist";
import needsData from "./NeedsData";
import { useWizard } from "./WizardContext";
import { fauxNeedsList, getFauxNeed } from "../utils/fauxLookup";
import FauxUnpackInline from "./FauxUnpackInline";

const renderOrderedFeelings = (feelings) => {
	const entries = Object.entries(feelings);

	if (entries.length === 0) {
		return <p>What was missing in that situation or interaction that led to how you are feeling?</p>;
	}

	return (
		<p>
			What was missing that led to you feeling <br />
			{entries.map(([feeling, strength], i) => (
				<React.Fragment key={feeling}>
					{i > 0 && ", "}
					{strength === "double-clicked" ? <strong>{feeling}</strong> : feeling}
				</React.Fragment>
			))}
		</p>
	);
};

const Needs = () => {
	const { needs, setNeeds, feelings, setFeelings } = useWizard();

	// Render callback for inline faux unpack (faux needs only suggest needs, not feelings)
	const renderFauxUnpack = (fauxItemName) => {
		const fauxItem = getFauxNeed(fauxItemName);
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
		<div className="step-needs">
			{renderOrderedFeelings(feelings)}

			<Checklist
				data={needsData}
				selectedItems={needs}
				setSelectedItems={setNeeds}
				type="needs"
				fauxItems={fauxNeedsList}
				renderFauxUnpack={renderFauxUnpack}
			/>
		</div>
	);
};

Needs.title = "Needs";
Needs.helpContent = (
	<>
		<p>
			Feelings arise because our needs are met or unmet. Which needs feel relevant right now?
		</p>
		<p>
			<strong>Tap once</strong> if a need feels unmet. <strong>Double-tap</strong> if a need
			feels met — sometimes recognising what IS nourished helps too.
		</p>
		<p>
			Each category also has a <em>"Words for pain..."</em> section. These are things we
			often think we need — like control, approval, or fairness — but they're actually
			strategies for meeting deeper needs. If one resonates, tap it to explore what's
			underneath.
		</p>
		<h4>Needs vs strategies</h4>
		<p>
			A <strong>need</strong> is universal and internal — like connection, safety, or meaning.
			A <strong>strategy</strong> is a specific way we try to get that need met. When we
			confuse a strategy for a need, we get stuck on one path. Discovering the actual need
			opens up many paths.
		</p>
	</>
);

export default Needs;
