import React, { useState } from "react";
import Checklist from "./Checklist";
import needsData from "./NeedsData";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import PatriarchyNeeds from "./PatriarchyNeeds";

const renderOrderedFeelings = (feelings) => {
	const entries = Object.entries(feelings);

	if (entries.length === 0) {
		return <p>What would you like instead? What feels important or meaningful about this?</p>;
	}

	return (
		<p>
			With these feelings here —{" "}
			{entries.map(([feeling, strength], i) => (
				<React.Fragment key={feeling}>
					{i > 0 && ", "}
					{strength === "double-clicked" ? <strong>{feeling}</strong> : feeling}
				</React.Fragment>
			))}
			<br />
			what would you like instead? What feels important or meaningful about this?
		</p>
	);
};

const Needs = () => {
	const { needs, setNeeds, feelings } = useWizard();
	const [showPatriarchy, setShowPatriarchy] = useState(false);

	return (
		<div className="step-needs">
			{renderOrderedFeelings(feelings)}

			<Checklist data={needsData} selectedItems={needs} setSelectedItems={setNeeds} type="needs" />

			<div style={{ marginTop: "2rem", textAlign: "center" }}>
				<button className="subtle-button" onClick={() => setShowPatriarchy(true)}>
					Can't find some words you expected to see here?
				</button>
			</div>

			<SlideDrawer
				isOpen={showPatriarchy}
				onClose={() => setShowPatriarchy(false)}
				title="Needs Shaped by Culture">
				<PatriarchyNeeds />
			</SlideDrawer>
		</div>
	);
};

Needs.title = "Needs";
Needs.helpContent = (
	<>
		<p>
			In NVC, needs are universal human longings — things every person shares, regardless of culture, age, or
			circumstances. They are not about any specific person or action. They're about what makes life feel full,
			connected, and meaningful.
		</p>

		<h4>Needs vs. strategies</h4>
		<p>
			A need is universal and doesn't depend on any particular person or action. A strategy is one specific way to
			meet a need. For example:
		</p>
		<ul>
			<li>
				<strong>Need:</strong> Connection. <strong>Strategy:</strong> "I want them to call me every day."
			</li>
			<li>
				<strong>Need:</strong> Respect. <strong>Strategy:</strong> "I want them to ask before making decisions."
			</li>
		</ul>
		<p>
			When we focus on needs rather than strategies, we open up to many possible ways of getting what we really
			long for — instead of being stuck on just one.
		</p>

		<h4>How to find your needs</h4>
		<ul>
			<li>
				Look at the feelings you selected. Each feeling is a messenger. Ask: "What need of mine is met or unmet
				that's producing this feeling?"
			</li>
			<li>
				<strong>Tap once</strong> for unmet needs — these are needs that aren't being met in this situation.
			</li>
			<li>
				<strong>Double-tap</strong> for needs that <em>are</em> being met — even in difficult situations, some
				needs are still alive and nourished.
			</li>
			<li>Needs don't point to anyone. "I need you to listen" is a strategy. "I need to be heard" is a need.</li>
		</ul>

		<h4>Why needs matter</h4>
		<p>
			Marshall Rosenberg said that behind every action, no matter how destructive, is an attempt to meet a need.
			When we can see the need, compassion becomes possible — for ourselves and for others. This is the heart of
			NVC.
		</p>
	</>
);

export default Needs;
