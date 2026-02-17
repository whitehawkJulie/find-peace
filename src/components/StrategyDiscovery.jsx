import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import Pill from "./Pill";
import { strategyIdeas } from "./StrategyIdeas";
import { getNeedCategory, getNeedMeaning } from "../utils/renderHelpers";
import "./StrategyDiscovery.css";

const NeedReflectionPanel = ({ needName, exploration }) => {
	return (
		<div className="need-reflection-panel">
			{exploration?.completed ? (
				<>
					<p className="reflection-panel-intro">
						Here's what you discovered when you explored this need:
					</p>
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
				</>
			) : (
				<p className="reflection-panel-intro">
					Take a moment to connect with what <strong>{needName}</strong> means to you. What
					would it feel like to have this need fully met? Let that guide your strategies.
				</p>
			)}
		</div>
	);
};

const StrategyDiscovery = () => {
	const { needs, needExplorations, strategies, setStrategies } = useWizard();
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

	return (
		<div className="strategy-discovery">
			<p>
				Now that you've connected with your needs, let's think about <strong>strategies</strong> —
				concrete things you could do to help meet these needs. Remember, every need can be met in
				many different ways!
			</p>

			{unmetNeeds.map((needName) => {
				const category = getNeedCategory(needName);
				const ideas = category ? strategyIdeas[category] || [] : [];
				const exploration = needExplorations[needName];
				const needStrategies = strategies[needName] || [];
				const meaning = getNeedMeaning(needName);

				return (
					<div key={needName} className="strategy-need-section">
						<div className="strategy-need-header">
							<Pill item={needName} type="need" state="clicked" />
							{exploration?.completed && (
								<button
									className="think-through-btn"
									onClick={() => toggleReflection(needName)}
									title="Recall what you discovered about this need"
								>
									{showReflection[needName] ? "Close" : "Recall my exploration"}
								</button>
							)}
						</div>

						{meaning && (
							<p className="strategy-need-meaning">{meaning}</p>
						)}

						{showReflection[needName] && (
							<NeedReflectionPanel
								needName={needName}
								exploration={exploration}
							/>
						)}

						{exploration?.completed && !showReflection[needName] && (
							<p className="strategy-context">
								You noticed this need as {exploration.beauty ? "beautiful" : "important"} to you.
								What might help it get met?
							</p>
						)}

						{!exploration?.completed && !showReflection[needName] && (
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
											title="Remove"
										>
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
								onChange={(e) =>
									setNewStrategy((prev) => ({ ...prev, [needName]: e.target.value }))
								}
								placeholder="Type a strategy..."
								rows={2}
							/>
							<button
								className="add-strategy-btn"
								onClick={() => addStrategy(needName)}
								disabled={!(newStrategy[needName] || "").trim()}
							>
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
												title="Click to use this idea"
											>
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
			A <strong>strategy</strong> is a specific action you could take to meet that need. The
			beautiful thing is, every need can be met in countless ways!
		</p>
		<p>
			For example, a need for "connection" could be met by calling a friend, joining a class,
			writing in a journal, or even sitting with a pet.
		</p>
		<p>Feeling stuck is often a sign that we've confused a need with one specific strategy.</p>
		<h4>Finding the real need</h4>
		<p>
			Sometimes the need you've named is actually a stepping stone to a deeper need. The test: if
			you feel self-righteous about the need, there's probably something underneath. Keep asking
			"If I had that, then what would I have?" until you find the one that brings tears or a deep
			softening — that's the real one.
		</p>
	</>
);

export default StrategyDiscovery;
