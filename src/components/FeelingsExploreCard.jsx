import React, { useState, useMemo } from "react";
import { useWizard } from "./WizardContext";
import { AllFeelingsData as FeelingsData } from "../data/AllFeelingsData";
import { feelingTypes } from "../data/FeelingTypes";
import ClarifyFeelings from "./ClarifyFeelings";
import "./FeelingsExploreCard.css";

// Build a lookup: item name → full item data (only for unmet feelings with a feelingType tag)
const itemLookup = {};
const unmetSection = FeelingsData.sections.feelings;
if (unmetSection?.groups) {
	for (const group of Object.values(unmetSection.groups)) {
		for (const item of group.items) {
			if (item.feelingType) {
				itemLookup[item.item] = item;
			}
		}
	}
}

// Build a lookup: murky feeling name → full item data
const murkyFeelingLookup = {};
for (const section of Object.values(FeelingsData.sections)) {
	if (!section.groups) continue;
	for (const group of Object.values(section.groups)) {
		for (const item of group.items || []) {
			if (item.clarify?.type === "murky") {
				murkyFeelingLookup[item.item] = item;
			}
		}
	}
}

// Only offer deeper exploration for these three types
const EXPLORE_TYPES = ["fear", "anger", "distress"];

const renderOrderedFeelings = (feelings, onMurkyClick) => {
	const entries = Object.entries(feelings).filter(([, s]) => s === "clicked" || s === "double-clicked");
	if (entries.length === 0) return null;
	return (
		<p className="feelings-selected-box">
			{entries.map(([name], i) => {
				const isMurky = name in murkyFeelingLookup;
				return (
					<React.Fragment key={name}>
						{i > 0 && ", "}
						{isMurky ? (
							<span
								title="Click to explore further"
								className="feelings-explore-murky"
								onClick={() => onMurkyClick(murkyFeelingLookup[name])}>
								{name}
							</span>
						) : (
							name
						)}
					</React.Fragment>
				);
			})}
		</p>
	);
};

const FeelingsExploreCard = () => {
	const { feelings, setFeelings, needs, setNeeds, feelingsExploreResponses, setFeelingsExploreResponses } =
		useWizard();

	const [expandedTypes, setExpandedTypes] = useState(new Set());
	const [popupItem, setPopupItem] = useState(null);

	// Detect which of fear/anger/distress have any selected feelings
	const detectedTypes = useMemo(() => {
		const selectedNames = new Set(
			Object.entries(feelings)
				.filter(([, s]) => s === "clicked" || s === "double-clicked")
				.map(([name]) => name),
		);
		return EXPLORE_TYPES.filter((type) =>
			[...selectedNames].some((name) => itemLookup[name]?.feelingType === type),
		);
	}, [feelings]);

	const toggleType = (type) => {
		setExpandedTypes((prev) => {
			const next = new Set(prev);
			next.has(type) ? next.delete(type) : next.add(type);
			return next;
		});
	};

	const toggleFeeling = (name) => {
		setFeelings((prev) => {
			const updated = { ...prev };
			if (updated[name]) delete updated[name];
			else updated[name] = "clicked";
			return updated;
		});
	};

	const toggleNeed = (name) => {
		setNeeds((prev) => {
			const updated = { ...prev };
			if (updated[name]) delete updated[name];
			else updated[name] = "clicked";
			return updated;
		});
	};

	const setResponse = (promptId, value) => {
		setFeelingsExploreResponses((prev) => ({ ...prev, [promptId]: value }));
	};

	const toggleMultiChoice = (promptId, option) => {
		setFeelingsExploreResponses((prev) => {
			const current = prev[promptId] || [];
			const updated = current.includes(option) ? current.filter((o) => o !== option) : [...current, option];
			return { ...prev, [promptId]: updated };
		});
	};

	const renderPrompt = (prompt) => (
		<div key={prompt.id} className="feelings-explore-prompt">
			<p className="feelings-explore-prompt-question">{prompt.question}</p>

			{prompt.type === "text" && (
				<>
					<textarea
						className="feelings-explore-textarea"
						value={feelingsExploreResponses[prompt.id] || ""}
						onChange={(e) => setResponse(prompt.id, e.target.value)}
						rows={3}
					/>
					{prompt.suggestFeeling && (
						<div className="feelings-explore-suggest-feeling">
							<span>{prompt.suggestFeeling.prompt}</span>
							<button
								className={`feelings-explore-choice ${feelings[prompt.suggestFeeling.name] ? "chosen" : ""}`}
								onClick={() => toggleFeeling(prompt.suggestFeeling.name)}>
								{feelings[prompt.suggestFeeling.name]
									? `✓ "${prompt.suggestFeeling.name}" added`
									: `Add "${prompt.suggestFeeling.name}"`}
							</button>
						</div>
					)}
				</>
			)}

			{prompt.type === "singleChoice" && (
				<div className="feelings-explore-choices">
					{prompt.options.map((opt) => (
						<button
							key={opt}
							className={`feelings-explore-choice ${feelingsExploreResponses[prompt.id] === opt ? "chosen" : ""}`}
							onClick={() => setResponse(prompt.id, opt)}>
							{opt}
						</button>
					))}
				</div>
			)}

			{prompt.type === "multiChoice" && (
				<div className="feelings-explore-choices">
					{prompt.options.map((opt) => (
						<button
							key={opt}
							className={`feelings-explore-choice ${
								(feelingsExploreResponses[prompt.id] || []).includes(opt) ? "chosen" : ""
							}`}
							onClick={() => toggleMultiChoice(prompt.id, opt)}>
							{opt}
						</button>
					))}
				</div>
			)}
		</div>
	);

	return (
		<div className="feelings-explore-regulation">
			<p>
				We often feel something vulnerable first, quickly followed by more defended feelings. Can you
				distinguish the early feelings, from the "thought-feelings" that came in response to those?
			</p>

			{renderOrderedFeelings(feelings, setPopupItem)}

			{detectedTypes.length > 0 && (
				<div className="feelings-explore-categories">
					<p className="feelings-explore-categories-intro">
						You've chosen feelings in these categories. Would you like to have a deeper look? Start with the
						one that's loudest.
					</p>
					{detectedTypes.map((type) => {
						const card = feelingTypes[type];
						const isExpanded = expandedTypes.has(type);
						return (
							<div key={type} className="feelings-explore-category">
								<button
									className={`feelings-explore-category-toggle ${isExpanded ? "expanded" : ""}`}
									onClick={() => toggleType(type)}>
									{card.title}
									<span className="feelings-explore-category-chevron">{isExpanded ? "▲" : "▼"}</span>
								</button>
								{isExpanded && (
									<div className="feelings-explore-category-content">
										<p className="feelings-explore-intro">{card.intro}</p>
										{card.prompts.map(renderPrompt)}
									</div>
								)}
							</div>
						);
					})}
				</div>
			)}

			{popupItem && (
				<ClarifyFeelings
					itemData={popupItem}
					feelings={feelings}
					needs={needs}
					onToggleFeeling={toggleFeeling}
					onToggleNeed={toggleNeed}
					onKeepWord={() => setPopupItem(null)}
					onClose={() => setPopupItem(null)}
				/>
			)}
		</div>
	);
};

FeelingsExploreCard.title = "Explore Feelings";
FeelingsExploreCard.helpContent = (
	<>
		<p>
			When many of your feelings point in the same direction, it can help to spend a moment with that emotional
			type before moving on.
		</p>
		<p>This step is optional — if it doesn't feel right, you can skip it and move on to exploring your needs.</p>
		<p>There are no right answers here. Just notice what comes up.</p>
		{/* TODO: Add more detailed help content here */}
		<p>
			TODO: Add stuff here about thought-feelings!! The feelings that come after the initial reaction, as a result
			of our thoughts about it. feelings START in the body, before the mind knows anything ... they're the body's
			wisdom, a different intelligence to the mind, that pick up on so much more information that's processed
			unconsciously. But then there's the feelings that get generated when we tell stories about what we think is
			happening, and they're the ones that lead us astray!! Like with friends of mine when she "dismissed" him
			when she got a phone call ... the initial feeling was confusion, surprise and maybe hurt, but then the
			stories like "she doesn't respect me" and "she's playing with me" generated HUGE anger. And it's not that we
			want to dismiss those latter "thought feelings" - they're the ones that tell us about PAST traumas, we
			absolutely need to address that too. But we need to separate them, so that we know what's relevant to THIS
			situation, and react appropriately to this, and deal with the other stuff in a different way!
		</p>
	</>
);

export default FeelingsExploreCard;
