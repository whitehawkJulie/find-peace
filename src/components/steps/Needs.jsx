import React, { useState } from "react";
import Checklist from "../Checklist";
import { Needs as NeedsData } from "../../data/AllNeedsData";
import DismissibleHint from "../DismissibleHint";

import { useWizard } from "../WizardContext";
import HelpLink from "../HelpLink";

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
				Your feelings are pointing to something deeper — what you were longing for in that moment.{" "}
				<HelpLink topic="needs">What are "fundamental human needs"?</HelpLink>
			</p>

			{renderOrderedFeelings(feelings)}

			<p>Select anything that feels true.</p>

			<DismissibleHint id="click-needs-twice">
				HINT: Tap twice on any need that feels especially strong or urgent.
			</DismissibleHint>

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
				defaultListMode="quick"
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
