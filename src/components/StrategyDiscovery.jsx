import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import Pill from "./Pill";
import { strategyIdeas } from "./StrategyIdeas";
import { getNeedCategory, getNeedMeaning } from "../utils/renderHelpers";
import { getClarifyPrompts } from "./NeedExploration";
import "./StrategyDiscovery.css";

const NeedReflectionPanel = ({ needName, exploration }) => {
	// Determine which flow was used — clarify or old
	const clarifyPrompts = getClarifyPrompts(needName);
	const allClarifyPrompts = clarifyPrompts ? [...clarifyPrompts.core, ...clarifyPrompts.deeper] : [];
	const hasClarifyData = allClarifyPrompts.some(({ key }) => exploration[`clarify_${key}`]?.trim());

	// Old-flow fields
	const hasOldData = exploration.bodyFeeling || exploration.whenMet || exploration.beauty || exploration.blackHole;

	return (
		<div className="need-reflection-panel">
			{exploration?.completed ? (
				<>
					<p className="reflection-panel-intro">Here's what you discovered when you explored this need:</p>

					{/* Old flow fields */}
					{exploration.bodyFeeling && (
						<div className="reflection-recall">
							<strong>In your body:</strong> {exploration.bodyFeeling}
						</div>
					)}
					{exploration.whenMet && (
						<div className="reflection-recall">
							<strong>When met:</strong> {exploration.whenMet}
						</div>
					)}
					{exploration.beauty && (
						<div className="reflection-recall">
							<strong>The beauty:</strong> {exploration.beauty}
						</div>
					)}
					{exploration.blackHole && (
						<div className="reflection-recall reflection-recall-blackhole">
							<strong>Black hole need:</strong> {exploration.blackHole}
						</div>
					)}

					{/* Clarify flow fields */}
					{hasClarifyData && (
						<div className="reflection-recall">
							<strong>What you noticed:</strong>
							{allClarifyPrompts.map(({ key, question }) =>
								exploration[`clarify_${key}`]?.trim() ? (
									<p key={key} className="reflection-clarify-item">
										<em>{question}</em>
										<br />
										{exploration[`clarify_${key}`]}
									</p>
								) : null,
							)}
						</div>
					)}

					{!hasOldData && !hasClarifyData && (
						<p className="reflection-panel-intro" style={{ fontStyle: "italic", color: "#888" }}>
							No notes recorded during exploration.
						</p>
					)}

					{/* Self-care answer — always shown if present */}
					{exploration.selfCare?.trim() && (
						<div className="reflection-recall reflection-recall-selfcare">
							<strong>What you could do for yourself:</strong> {exploration.selfCare}
						</div>
					)}
				</>
			) : (
				<p className="reflection-panel-intro">
					Take a moment to connect with what <strong>{needName}</strong> means to you. What would it feel like
					to have this need fully met? Let that guide your strategies.
				</p>
			)}
		</div>
	);
};

const StrategyDiscovery = () => {
	const {
		needs,
		needExplorations,
		strategies,
		setStrategies,
		setCurrentExploringNeed,
		setExplorationStep,
		setNeedExplorationOpen,
	} = useWizard();
	const [newStrategy, setNewStrategy] = useState({});
	const [showIdeas, setShowIdeas] = useState({});
	const [showReflection, setShowReflection] = useState({});

	// Get all unmet needs
	const unmetNeeds = Object.entries(needs)
		.filter(([_, status]) => status === "clicked")
		.map(([name]) => name);

	const addStrategy = (needName) => {
		const text = (newStrategy[needName] || "").trim();
		if (!text) return;

		setStrategies((prev) => ({
			...prev,
			[needName]: [...(prev[needName] || []), text],
		}));
		setNewStrategy((prev) => ({ ...prev, [needName]: "" }));
	};

	const removeStrategy = (needName, index) => {
		setStrategies((prev) => ({
			...prev,
			[needName]: prev[needName].filter((_, i) => i !== index),
		}));
	};

	const toggleIdeas = (needName) => {
		setShowIdeas((prev) => ({ ...prev, [needName]: !prev[needName] }));
	};

	const toggleReflection = (needName) => {
		setShowReflection((prev) => ({ ...prev, [needName]: !prev[needName] }));
	};

	const handleNeedPillClick = (needName) => {
		setCurrentExploringNeed(needName);
		setExplorationStep(1);
		setNeedExplorationOpen(true);
	};

	return (
		<div className="strategy-discovery">
			<p>
				Now that you've connected with your needs, let's think about small things you could do to top up that
				"needs tank" — concrete things you could do to help meet these needs, inside OR outside of the current
				situation. Remember, every need can be met in many different ways!
			</p>

			{unmetNeeds.map((needName) => {
				const category = getNeedCategory(needName);
				const ideas = category ? strategyIdeas[category] || [] : [];
				const exploration = needExplorations[needName];
				const needStrategies = strategies[needName] || [];
				const meaning = getNeedMeaning(needName);
				const isExplored = exploration?.completed;

				return (
					<div key={needName} className="strategy-need-section">
						<div className="strategy-need-header">
							<Pill
								item={needName}
								type="need"
								state={isExplored ? "double-clicked" : "clicked"}
								onClick={() => handleNeedPillClick(needName)}
							/>
							{isExplored ? (
								<button
									className="think-through-btn"
									onClick={() => toggleReflection(needName)}
									title="Recall what you discovered about this need">
									{showReflection[needName] ? "Close" : "Recall my exploration"}
								</button>
							) : (
								<button
									className="think-through-btn"
									onClick={() => handleNeedPillClick(needName)}
									title="Explore this need more deeply">
									Explore this need
								</button>
							)}
						</div>

						{meaning && <p className="strategy-need-meaning">{meaning}</p>}

						{showReflection[needName] && (
							<NeedReflectionPanel needName={needName} exploration={exploration} />
						)}

						{/* Always-visible self-care note when present */}
						{!showReflection[needName] && exploration?.selfCare?.trim() && (
							<div className="strategy-self-care">
								<span className="strategy-self-care-label">You could do for yourself:</span>{" "}
								{exploration.selfCare}
							</div>
						)}

						{!showReflection[needName] && (
							<p className="strategy-context">
								What could you do — even something small — to help meet this need?
							</p>
						)}

						{needStrategies.length > 0 && (
							<ul className="strategy-list">
								{needStrategies.map((strat, i) => (
									<li key={i} className="strategy-item">
										<span>{strat}</span>
										<button
											className="remove-strategy"
											onClick={() => removeStrategy(needName, i)}
											title="Remove">
											×
										</button>
									</li>
								))}
							</ul>
						)}

						<div className="strategy-input-row">
							<textarea
								className="strategy-textarea"
								value={newStrategy[needName] || ""}
								onChange={(e) => setNewStrategy((prev) => ({ ...prev, [needName]: e.target.value }))}
								placeholder="Type a strategy..."
								rows={2}
							/>
							<button
								className="add-strategy-btn"
								onClick={() => addStrategy(needName)}
								disabled={!(newStrategy[needName] || "").trim()}>
								Add
							</button>
						</div>

						{ideas.length > 0 && (
							<div className="ideas-section">
								<button className="subtle-button" onClick={() => toggleIdeas(needName)}>
									{showIdeas[needName] ? "Hide ideas" : "Need some ideas?"}
								</button>
								{showIdeas[needName] && (
									<ul className="ideas-list">
										{ideas.map((idea, i) => (
											<li
												key={i}
												className="idea-item"
												onClick={() =>
													setNewStrategy((prev) => ({ ...prev, [needName]: idea }))
												}
												title="Click to use this idea">
												{idea}
											</li>
										))}
									</ul>
								)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

StrategyDiscovery.title = "Finding Strategies";
StrategyDiscovery.helpContent = (
	<>
		<p>
			A <strong>need</strong> is universal and internal — like connection, safety, or meaning.
		</p>
		<p>
			A <strong>strategy</strong> is a specific action you could take to meet that need. The beautiful thing is,
			every need can be met in countless ways!
		</p>
		<p>
			For example, a need for "connection" could be met by calling a friend, joining a class, writing in a
			journal, or even sitting with a pet.
		</p>
		<p>Feeling stuck is often a sign that we've confused a need with one specific strategy.</p>
		<h4>Finding the deeper need</h4>
		<p>
			Sometimes the need you've named is actually a stepping stone to a deeper need. The test: if you feel
			self-righteous about the need, there's probably something underneath. Keep asking "If I had that, then what
			would I have?" until you find the one that brings tears or a deep softening — that's the more valuable one
			to work with.
		</p>
	</>
);

export default StrategyDiscovery;
