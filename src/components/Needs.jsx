import React, { useState, useMemo } from "react";
import Checklist from "./Checklist";
import { Needs as NeedsData } from "../data/AllNeedsData";
import { useWizard } from "./WizardContext";
import HelpLink from "./HelpLink";

import "./Needs.css";

const renderOrderedFeelings = (feelings) => {
	const entries = Object.entries(feelings).filter(([, s]) => s === "clicked" || s === "double-clicked");

	if (entries.length === 0) {
		return "(no feelings selected)";
	}

	return (
		<p className="feelings-selected-box">
			{entries.map(([feeling], i) => (
				<React.Fragment key={feeling}>
					{i > 0 && ", "}
					{feeling}
				</React.Fragment>
			))}
		</p>
	);
};

const Needs = () => {
	const {
		needs,
		setNeeds,
		feelings,
		needExplorations,
		setCurrentExploringNeed,
		setExplorationStep,
		setNeedExplorationOpen,
	} = useWizard();

	// Show explored+unmet needs as green ("double-clicked") visually
	const displayNeeds = useMemo(() => {
		const result = {};
		for (const [name, state] of Object.entries(needs)) {
			if (state === "clicked" && needExplorations[name]?.completed) {
				result[name] = "double-clicked";
			} else {
				result[name] = state;
			}
		}
		return result;
	}, [needs, needExplorations]);

	// Wrapper to prevent explored needs from being saved as "double-clicked"
	const handleSetNeeds = (updaterOrValue) => {
		setNeeds((prev) => {
			// Build a display version of prev (what Checklist sees)
			const prevDisplay = {};
			for (const [name, state] of Object.entries(prev)) {
				prevDisplay[name] = state === "clicked" && needExplorations[name]?.completed ? "double-clicked" : state;
			}
			const next = typeof updaterOrValue === "function" ? updaterOrValue(prevDisplay) : updaterOrValue;
			// Convert any "double-clicked" back to "clicked" for explored needs
			const result = { ...next };
			for (const name of Object.keys(result)) {
				if (result[name] === "double-clicked" && needExplorations[name]?.completed) {
					result[name] = "clicked";
				}
			}
			return result;
		});
	};
	const [showPatriarchy, setShowPatriarchy] = useState(false);

	const handleNeedInfoClick = (needName) => {
		setCurrentExploringNeed(needName);
		setExplorationStep(1);
		setNeedExplorationOpen(true);
	};

	return (
		<div className="step-needs">
			<p>
				If we don't know what we're actually needing, everything we do misses the mark. This is the missing
				information in our lives.
			</p>
			<p>
				<HelpLink topic="needs">Needs</HelpLink> are what we're hoping to experience when things go well — and
				what we're longing for when they don't. They're the core of what matters to us, and our feelings
				directly point to what they are.
			</p>

			{renderOrderedFeelings(feelings)}

			<p>
				Just notice what feels alive. Select all that feel relevant. Tap ? on any selected need if you'd like to
				explore it more deeply.
			</p>

			<Checklist
				data={[
					NeedsData.sections.subsistence,
					NeedsData.sections.connection,
					NeedsData.sections.meaning,
					NeedsData.sections.freedom,
				]}
				selectedItems={displayNeeds}
				setSelectedItems={handleSetNeeds}
				type="needs"
				onInfoClick={handleNeedInfoClick}
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
