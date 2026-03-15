import React, { useState, useMemo } from "react";
import Checklist from "./Checklist";
import { Needs as NeedsData } from "../data/AllNeedsData";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import PatriarchyNeeds from "./PatriarchyNeeds";
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
				Needs are what we’re hoping to experience when things go well — and what we’re longing for when they
				don’t.
			</p>

			{renderOrderedFeelings(feelings)}
			<p>Each feeling you selected is an indication of something that matters to you here.</p>

			<p>
				Just notice what feels alive. Select all that feel relevant. Tap{" "}
				<span
					style={{
						display: "inline-flex",
						alignItems: "center",
						justifyContent: "center",
						width: "1rem",
						height: "1rem",
						fontSize: "0.65rem",
						fontWeight: 700,
						color: "#888",
						background: "rgba(0,0,0,0.08)",
						borderRadius: "50%",
						verticalAlign: "middle",
					}}>
					?
				</span>{" "}
				on any selected need to explore it more deeply.
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

			{/* Faux feelings stuff - now embedded as actual options for selection, instead */}
			{/* <div style={{ marginTop: "2rem", textAlign: "center" }}>
				<button className="subtle-button" onClick={() => setShowPatriarchy(true)}>
					Can't find some words you expected to see here?
				</button>
			</div> */}

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
		<h3>What Is a Need?</h3>

		<p>
			Needs are qualities that all human beings long for — things that help us thrive, like safety, respect,
			understanding, choice, or connection.
		</p>

		<p>A need isn’t a demand and it isn’t a specific outcome. It’s simply a word for what matters most to us.</p>

		<p>Needs are universal. Strategies are personal.</p>

		<p>
			<strong>Need:</strong> Respect
			<br />
			<strong>Strategy:</strong> “I want this particular person to act in this particular way.”
		</p>

		<p>When we focus on the need instead of one strategy, many more possibilities open up.</p>

		<h3>Why Naming Needs Helps</h3>

		<p>
			Feelings are signals that something important is happening. When we identify the need underneath, the
			intensity often softens — even before anything changes externally.
		</p>

		<p>
			If the need isn’t clear, we often reach for strategies that promise relief — arguing, withdrawing, blaming,
			or trying to control the situation.
		</p>

		<p>
			Marshall Rosenberg called these “tragic strategies for unmet needs.” They’re tragic not because we’re wrong,
			but because the strategy aims for relief while missing the real source of the pain.
		</p>

		<h3>Hold Tightly to the Need, Loosely to the Strategy</h3>

		<p>
			The need is what matters. Any specific strategy — a particular person acting in a particular way — is just
			one possible way to meet it.
		</p>

		<p>When we loosen our grip on one strategy, we open the door to many other ways forward.</p>
	</>
);

export default Needs;
