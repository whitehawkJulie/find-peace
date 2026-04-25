import React, { useState } from "react";
import Checklist from "../Checklist";
import { Needs as NeedsData } from "../../data/AllNeedsData";
import DismissibleHint from "../DismissibleHint";

import { useWizard } from "../WizardContext";
import HelpLink from "../HelpLink";

import "./Needs.css";

const renderOrderedFeelings = (feelings, firstFeelings) => {
	const entries = Object.entries(feelings)
		.filter(([, s]) => s === "clicked" || s === "double-clicked")
		.sort(([, a], [, b]) => (a === "double-clicked" ? 0 : 1) - (b === "double-clicked" ? 0 : 1));

	if (entries.length === 0) return null;

	return (
		<>
			<p className="cloud-label">The feelings you chose</p>
			<div className="pill-grid cloud feelings-selected-pills">
				{entries.map(([feeling, state]) => {
					const isFirst = !!firstFeelings?.[feeling];
					return (
						<div key={feeling} className={`pill feeling ${state}${isFirst ? " first-feeling-selected" : ""}`}>
							{isFirst && <span className="first-feeling-badge">①</span>}
							{!isFirst && state === "double-clicked" && <span className="pill-strong-badge">●</span>}
							{feeling}
						</div>
					);
				})}
			</div>
		</>
	);
};

const Needs = () => {
	const { needs, setNeeds, feelings, firstFeelings } = useWizard();

	const [showPatriarchy, setShowPatriarchy] = useState(false);

	return (
		<div className="step-needs">
			<p>
				Your feelings point to something deeper — what you were longing for in that moment. We call these
				longings <HelpLink topic="needs">"fundamental human needs"?</HelpLink>
			</p>

			{renderOrderedFeelings(feelings, firstFeelings)}

			<p>What were you needing in that moment, that you weren't getting?</p>

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
				selectionHint={
					<DismissibleHint id="click-needs-twice">
						HINT: Tap twice on any need that feels especially strong or urgent.
					</DismissibleHint>
				}
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
