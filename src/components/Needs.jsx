import React, { useState } from "react";
import Checklist from "./Checklist";
import { Needs as NeedsData } from "../data/AllNeedsData";
import { useWizard } from "./WizardContext";
import HelpLink from "./HelpLink";

import "./Needs.css";

const renderOrderedFeelings = (feelings) => {
	const entries = Object.entries(feelings)
		.filter(([, s]) => s === "clicked" || s === "double-clicked")
		.sort(([, a], [, b]) => (a === "double-clicked" ? 0 : 1) - (b === "double-clicked" ? 0 : 1));

	if (entries.length === 0) return null;

	return (
		<>
			<p className="cloud-label">The feelings you chose</p>
			<div className="pill-grid cloud feelings-selected-pills">
				{entries.map(([feeling, state]) => (
					<div key={feeling} className={`pill feeling ${state}`}>
						{state === "double-clicked" && <span className="pill-strong-badge">●</span>}
						{feeling}
					</div>
				))}
			</div>
		</>
	);
};

const Needs = () => {
	const { needs, setNeeds, feelings } = useWizard();

	const [showPatriarchy, setShowPatriarchy] = useState(false);

	return (
		<div className="step-needs">
			<p>
				Here we're looking to see what our feelings are pointing to - what we were longing for in that moment
				(which also often tells us what we're longing for in life, in general).
			</p>

			<p>
				We call these longings <HelpLink topic="needs">"fundamental human needs"</HelpLink>, and every single
				human being on the planet shares them. They're what we all have in common, underneath all our
				differences. Every thing we do in life is simply an attempt to meet one or more of these very human
				needs. All our goals and dreams come down to this simple set of longings.
			</p>
			<p>
				If we don't know what we're actually needing, everything we do misses the mark. This is the missing
				information in our lives.
			</p>

			{renderOrderedFeelings(feelings)}

			<p>Just notice what feels alive. Select all that feel relevant.</p>
			<p className="checklist-hint">Tap twice on any need that feels especially strong or urgent.</p>

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
				defaultListMode="short"
			/>

			{/* <SlideDrawer
				isOpen={showPatriarchy}
				onClose={() => setShowPatriarchy(false)}
				title="Needs Shaped by Culture">
				<PatriarchyNeeds />
			</SlideDrawer> */}
		</div>
	);
};

Needs.title = "What matters to me?";
Needs.titleSweary = "What actually matters here?";
Needs.navTitle = "What matters to me?";

export default Needs;
