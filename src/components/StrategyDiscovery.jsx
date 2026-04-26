import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import Pill from "./Pill";
import { strategyIdeas } from "./StrategyIdeas";
import { getNeedCategory, getNeedMeaning } from "../utils/renderHelpers";
import "./StrategyDiscovery.css";

const NeedReflectionPanel = ({ needName, exploration }) => {
	const hasData = exploration?.completed && (
		exploration.coreSpecific || exploration.unmetFeeling || exploration.metFeeling ||
		exploration.imaginedMet || exploration.metCircumstances || exploration.oftenUnmet ||
		exploration.whereToMeet || exploration.enoughResponse
	);

	return (
		<div className="need-reflection-panel">
			{exploration?.completed ? (
				<>
					<p className="reflection-panel-intro">Here's what you discovered when you explored this need:</p>

					{exploration.coreSpecific?.trim() && (
						<div className="reflection-recall">
							<strong>What it means for you:</strong> {exploration.coreSpecific}
						</div>
					)}
					{exploration.unmetFeeling?.trim() && (
						<div className="reflection-recall">
							<strong>When unmet:</strong> {exploration.unmetFeeling}
						</div>
					)}
					{exploration.metFeeling?.trim() && (
						<div className="reflection-recall">
							<strong>When met:</strong> {exploration.metFeeling}
						</div>
					)}
					{exploration.imaginedMet?.trim() && (
						<div className="reflection-recall">
							<strong>Imagined:</strong> {exploration.imaginedMet}
						</div>
					)}
					{exploration.metCircumstances?.trim() && (
						<div className="reflection-recall">
							<strong>What helps it be met:</strong> {exploration.metCircumstances}
						</div>
					)}
					{exploration.enoughResponse?.trim() && (
						<div className="reflection-recall">
							<strong>What would be enough:</strong> {exploration.enoughResponse}
						</div>
					)}
					{exploration.oftenUnmet?.trim() && (
						<div className="reflection-recall">
							<strong>Small steps:</strong> {exploration.oftenUnmet}
						</div>
					)}
					{exploration.whereToMeet?.trim() && (
						<div className="reflection-recall">
							<strong>Where to get it met:</strong> {exploration.whereToMeet}
						</div>
					)}

					{!hasData && (
						<p className="reflection-panel-intro" style={{ fontStyle: "italic", color: "#888" }}>
							No notes recorded during exploration.
						</p>
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
								data-field-id="strategy-discovery"
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

export default StrategyDiscovery;
