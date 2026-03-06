import React, { useState } from "react";
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

	const strong = entries.filter(([, s]) => s === "double-clicked");
	const regular = entries.filter(([, s]) => s === "clicked");
	const sorted = [...strong, ...regular];

	return (
		<p className="feelings-selected-box">
			{sorted.map(([feeling, strength], i) => (
				<React.Fragment key={feeling}>
					{i > 0 && ", "}
					{strength === "double-clicked" ? <strong>{feeling}</strong> : feeling}
				</React.Fragment>
			))}
		</p>
	);
};

const Needs = () => {
	const { needs, setNeeds, feelings, setCurrentExploringNeed, setExplorationStep, setNeedExplorationOpen } =
		useWizard();
	const [showPatriarchy, setShowPatriarchy] = useState(false);

	const handleNeedInfoClick = (needName) => {
		setCurrentExploringNeed(needName);
		setExplorationStep(1);
		setNeedExplorationOpen(true);
	};

	return (
		<div className="step-needs">
			{renderOrderedFeelings(feelings)}
			<p>Take them one at a time — each feeling is pointing to something that matters to you here.</p>

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
				selectedItems={needs}
				setSelectedItems={setNeeds}
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
			Needs are qualities that ALL human beings long for, that contribute to our thriving — things like safety,
			respect, choice, understanding, connection.
		</p>
		<p>
			In this process, a need isn’t a demand and it isn’t a specific outcome. It’s a word for what matters most —
			the human qualities that help us thrive. Needs live inside us as a longing of our hearts. They’re what we’re
			trying to meet whenever we take action — even if we don’t realize it. They’re also what we’re trying to
			soothe when we feel distress.
			<br />
			When we identify the need, we can often feel a sense of relief — even before anything changes externally.
			It’s like we’ve been fumbling around in the dark, and now we can finally see what we were reaching for.
		</p>
		<p>Needs are universal. Strategies are personal.</p>
		<ul>
			<li>
				<strong>Need:</strong> Respect
			</li>
			<li>
				<strong>Strategy:</strong> "I want this particular person to act in this particular way."
			</li>
		</ul>
		<p>When we focus on the need instead of the strategy, we open up more possible ways forward.</p>
		<h3>Why Naming Needs Helps</h3>

		<p>
			Feelings are signals that something important is happening. When we identify the need underneath, intensity
			often softens — even before anything changes externally.
		</p>

		<p>
			When we’re unclear about the need beneath our feelings, we often reach for strategies that we hope will
			relieve the discomfort — pushing harder, withdrawing, criticising, demanding reassurance, or trying to
			control the situation.
		</p>

		<p>
			Marshall Rosenberg, who developed Nonviolent Communication, called these{" "}
			<strong>"tragic strategies for unmet needs."</strong>
			They’re tragic not because we’re wrong — but because the strategy is aimed at relief while missing the real
			source of the pain.
		</p>

		<p>
			Naming the need gives us a clearer target. Instead of reacting blindly, we can respond with more choice —
			and often discover options we couldn’t see before.
		</p>
		<h3>Hold tightly to the need, loosely to the strategy</h3>
		<p>
			Filling the tank does <strong>not</strong> have to mean:
		</p>
		<ul>
			<li>This person</li>
			<li>This exact behaviour</li>
			<li>This one solution</li>
		</ul>
		<p>
			The need is what matters. The strategy (THIS particular person in THIS particular way) is just one possible
			way to support it. There are always thousands of possible ways to meet any need. When we get attached to one
			strategy, we can miss out on all the other possibilities that might work better.
		</p>
	</>
);

export default Needs;
