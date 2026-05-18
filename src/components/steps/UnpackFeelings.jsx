import React, { useState, useMemo } from "react";
import { useWizard } from "../WizardContext";
import { trackEvent, currentPage } from "../../analytics/analytics";
import HelpLink from "../HelpLink";
import ImportanceBanner from "../ImportanceBanner";
import { AllFeelingsData as FeelingsData, feelingDescriptionByName } from "../../data/AllFeelingsData";
import { feelingTypes } from "../../data/FeelingTypes";
import { storyWordSet } from "../../data/StoryWords";
import Pill from "../Pill";
import "./UnpackFeelings.css";

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

// Build a set of all "feelings when needs met" item names (positive feelings)
const feelingsMetSet = new Set();
const metSection = FeelingsData.sections.feelingsMet;
if (metSection?.groups) {
	for (const group of Object.values(metSection.groups)) for (const item of group.items) feelingsMetSet.add(item.item);
}

// Build a lookup: item name → group heading (for the reduce-list popup)
const feelingGroupLookup = {};
if (unmetSection?.groups) {
	for (const group of Object.values(unmetSection.groups))
		for (const item of group.items) feelingGroupLookup[item.item] = group.ui.heading;
}
if (metSection?.groups) {
	for (const group of Object.values(metSection.groups))
		for (const item of group.items) feelingGroupLookup[item.item] = group.ui.heading;
}

const EXPLORE_TYPES = ["fear", "anger", "distress", "shame", "shutdown", "confusion"];

const UnpackFeelings = () => {
	const {
		feelings,
		setFeelings,
		feelingsExploreResponses,
		setFeelingsExploreResponses,
		firstFeelings,
		setFirstFeelings,
	} = useWizard();
	const [expandedTypes, setExpandedTypes] = useState(new Set());
	const [pendingRemoveFeeling, setPendingRemoveFeeling] = useState(null);
	const [skipRemoveConfirm, setSkipRemoveConfirm] = useState(false);
	const [showReducePopup, setShowReducePopup] = useState(false);

	const removeFeeling = (name) => {
		setFeelings((prev) => {
			const updated = { ...prev };
			delete updated[name];
			return updated;
		});
	};

	// Detect which of fear/anger/distress have any selected feelings,
	// and record which feeling names belong to each type
	const { detectedTypes, feelingsForType } = useMemo(() => {
		const selectedNames = Object.entries(feelings)
			.filter(([name, s]) => (s === "clicked" || s === "double-clicked") && !storyWordSet.has(name))
			.map(([name]) => name);

		const byType = {};
		for (const name of selectedNames) {
			const type = itemLookup[name]?.feelingType;
			if (type) {
				if (!byType[type]) byType[type] = [];
				byType[type].push(name);
			}
		}

		return {
			detectedTypes: EXPLORE_TYPES.filter((type) => byType[type]?.length > 0),
			feelingsForType: byType,
		};
	}, [feelings]);

	// Group all selected feelings by their family (for the reduce-list popup)
	const groupedSelectedEntries = useMemo(() => {
		const groups = {};
		for (const [name, state] of Object.entries(feelings)) {
			if ((state !== "clicked" && state !== "double-clicked") || storyWordSet.has(name)) continue;
			const groupName = feelingGroupLookup[name] || "Other";
			if (!groups[groupName]) groups[groupName] = [];
			groups[groupName].push([name, state]);
		}
		return groups;
	}, [feelings]);

	const toggleType = (type) => {
		setExpandedTypes((prev) => {
			const next = new Set(prev);
			const isOpening = !prev.has(type);
			next.has(type) ? next.delete(type) : next.add(type);
			if (isOpening) trackEvent("ui_open", { type: "section", name: `feelings-${type}`, page_name: currentPage });
			return next;
		});
	};

	const toggleFeeling = (name) => {
		setFeelings((prev) => {
			const updated = { ...prev };
			if (updated[name] === "double-clicked") delete updated[name];
			else if (updated[name] === "clicked") updated[name] = "double-clicked";
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
						data-field-id={`feelings-explore-${prompt.id}`}
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

			{prompt.type === "multiChoice" && !prompt.selectsFeeling && (
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

			{prompt.type === "multiChoice" && prompt.selectsFeeling && (
				<div className="feelings-explore-choices">
					{prompt.options.map((opt) => (
						<button
							key={opt}
							className={`feelings-explore-choice ${feelings[opt] ? "chosen" : ""}`}
							onClick={() => toggleFeeling(opt)}>
							{opt}
						</button>
					))}
				</div>
			)}
		</div>
	);

	const allSelectedEntries = Object.entries(feelings).filter(
		([name, s]) => (s === "clicked" || s === "double-clicked") && !storyWordSet.has(name),
	);
	const hasSelectedFeelings = allSelectedEntries.length > 0;
	const selectedFeelingsCount = allSelectedEntries.length;
	const sortByStrength = ([, a], [, b]) => (a === "double-clicked" ? 0 : 1) - (b === "double-clicked" ? 0 : 1);
	const unmetEntries = allSelectedEntries.filter(([name]) => !feelingsMetSet.has(name)).sort(sortByStrength);
	const metEntries = allSelectedEntries.filter(([name]) => feelingsMetSet.has(name)).sort(sortByStrength);

	return (
		<div className="feelings-explore">
			<ImportanceBanner
				heading="Optional"
				message="The sections below help you look more closely at your feelings."
			/>
			{!hasSelectedFeelings && (
				<p className="empty-state-notice">
					No feelings selected yet — this page isn't useful until you've chosen some feelings on the previous
					step.
				</p>
			)}
			<p>
				Some feelings are direct emotions, while others are more like protective states or blended experiences.
				This page allows you to explore them more deeply, if you'd like to - or you can just go straight to
				looking at what needs they're pointing to.
			</p>

			<div>
				{hasSelectedFeelings && (
					<div>
						{selectedFeelingsCount > 8 && (
							<div>
								<h3>Feeling Overloaded? (optional)</h3>
								<p>
									As you look at this list, does it feel clear and settled, or a bit busy? If it feels
									busy, you might want to remove some similar words.
								</p>
								<button className="reduce-list-btn" onClick={() => setShowReducePopup(true)}>
									Would you like to reduce the list?
								</button>
							</div>
						)}
						<div className="pill-grid cloud feelings-selected-pills first-feelings-cloud">
							{unmetEntries.map(([name, state]) => {
								const isFirst = !!firstFeelings[name];
								return (
									<Pill
										key={name}
										item={name}
										type="feeling"
										state={state}
										meaning={feelingDescriptionByName[name] || ""}
										extraClass={`feeling-removable${isFirst ? " first-feeling-selected" : ""}`}
										firstBadge={isFirst}
										onClick={() =>
											setFirstFeelings((prev) => {
												const next = { ...prev };
												if (next[name]) delete next[name];
												else next[name] = true;
												return next;
											})
										}
										onRemove={() => {
											if (skipRemoveConfirm) removeFeeling(name);
											else setPendingRemoveFeeling(name);
										}}
									/>
								);
							})}
						</div>
						{metEntries.length > 0 && (
							<>
								<div className="feelings-met-cloud-heading">AND you were also feeling</div>
								<div className="pill-grid cloud feelings-selected-pills">
									{metEntries.map(([name, state]) => {
										const isFirst = !!firstFeelings[name];
										return (
											<Pill
												key={name}
												item={name}
												type="feeling"
												state={state}
												meaning={feelingDescriptionByName[name] || ""}
												extraClass={`feeling-removable${isFirst ? " first-feeling-selected" : ""}`}
												firstBadge={isFirst}
												onClick={() =>
													setFirstFeelings((prev) => {
														const next = { ...prev };
														if (next[name]) delete next[name];
														else next[name] = true;
														return next;
													})
												}
												onRemove={() => {
													if (skipRemoveConfirm) removeFeeling(name);
													else setPendingRemoveFeeling(name);
												}}
											/>
										);
									})}
								</div>
							</>
						)}
					</div>
				)}

				{pendingRemoveFeeling && (
					<div className="feeling-remove-confirm-backdrop" onClick={() => setPendingRemoveFeeling(null)}>
						<div className="feeling-remove-confirm" onClick={(e) => e.stopPropagation()}>
							<span>
								Remove <strong>{pendingRemoveFeeling}</strong> from your feelings?
							</span>
							<div className="feeling-remove-confirm-btns">
								<button
									className="feeling-remove-confirm-yes"
									onClick={() => {
										removeFeeling(pendingRemoveFeeling);
										setPendingRemoveFeeling(null);
									}}>
									Yes, remove
								</button>
								<button
									className="feeling-remove-confirm-cancel"
									onClick={() => setPendingRemoveFeeling(null)}>
									Cancel
								</button>
							</div>
							<button
								className="feeling-remove-confirm-skip"
								onClick={() => {
									setSkipRemoveConfirm(true);
									removeFeeling(pendingRemoveFeeling);
									setPendingRemoveFeeling(null);
								}}>
								Remove and don't show again this session
							</button>
						</div>
					</div>
				)}
				{hasSelectedFeelings && (
					<div>
						<h3>What came first?</h3>

						<p>
							Looking at your list, can you notice any feelings that feel like they came{" "}
							<HelpLink topic="first-feeling">first</HelpLink> — before your mind started trying to make
							sense of things? If so, click on them above.
						</p>
					</div>
				)}
			</div>

			<div className="feelings-explore-categories">
				<h3>Pause with it</h3>
				<p>
					There's nothing to solve here. If you'd like, just notice what happens when you choose one or more
					of these feelings and just <HelpLink topic="stay-with-it">stay with it for a moment</HelpLink>,
					without digging or forcing. Is there something it wants to tell you? Can you pause long enough to
					hear from your body, rather than your mind?
				</p>
			</div>

			{detectedTypes.length > 0 && (
				<div className="feelings-explore-categories">
					<h3>Go deeper</h3>

					<p className="feelings-explore-categories-intro">
						{"You've chosen feelings in these categories. Start with the one that feels loudest."}
					</p>
					{detectedTypes.map((type) => {
						const card = feelingTypes[type];
						const isExpanded = expandedTypes.has(type);
						return (
							<div key={type} className="feelings-explore-category">
								<button
									className={`feelings-explore-category-toggle ${isExpanded ? "expanded" : ""}`}
									onClick={() => toggleType(type)}>
									<span className="feelings-explore-category-title">
										{card.title}
										{feelingsForType[type]?.length > 0 && (
											<span className="feelings-explore-category-matches">
												{feelingsForType[type].join(", ")}
											</span>
										)}
									</span>
									<span className="feelings-explore-category-chevron">
										{isExpanded ? "▲" : "▼"}
									</span>
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

			{showReducePopup && (
				<div className="reduce-popup-backdrop" onClick={() => setShowReducePopup(false)}>
					<div className="reduce-popup" onClick={(e) => e.stopPropagation()}>
						<div className="reduce-popup-header">
							<h3>Remove similar feelings</h3>
							<button className="reduce-popup-close" onClick={() => setShowReducePopup(false)}>
								✕
							</button>
						</div>
						<p className="reduce-popup-intro">
							Tap × to remove feelings you don't need. Words in the same group are similar — keeping the
							most accurate one is enough.
						</p>
						<div className="reduce-popup-groups">
							{Object.entries(groupedSelectedEntries).map(([groupName, entries]) => (
								<div key={groupName} className="reduce-popup-group">
									<div className="reduce-popup-group-heading">{groupName}</div>
									<div className="pill-grid cloud">
										{entries.map(([name, state]) => (
											<Pill
												key={name}
												item={name}
												type="feeling"
												state={state}
												meaning={feelingDescriptionByName[name] || ""}
												extraClass="feeling-removable"
												onRemove={() => removeFeeling(name)}
											/>
										))}
									</div>
								</div>
							))}
						</div>
						<div className="reduce-popup-footer">
							<button className="reduce-popup-done" onClick={() => setShowReducePopup(false)}>
								Done
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

UnpackFeelings.title = "Explore Feelings";
UnpackFeelings.navTitle = "Explore Feelings";

export default UnpackFeelings;
