import React, { useState, useMemo } from "react";
import { useWizard } from "./WizardContext";
import HelpLink from "./HelpLink";
import { AllFeelingsData as FeelingsData } from "../data/AllFeelingsData";
import { feelingTypes } from "../data/FeelingTypes";
import ClarifyFeelings from "./ClarifyFeelings";
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

const renderOrderedFeelings = (feelings, onMurkyClick, onRemove) => {
	const entries = Object.entries(feelings).filter(([, s]) => s === "clicked" || s === "double-clicked");
	if (entries.length === 0) return null;
	return (
		<div className="pill-grid cloud feelings-selected-pills">
			{entries.map(([name]) => {
				const isMurky = name in murkyFeelingLookup;
				return (
					<div key={name} className="pill feeling clicked feeling-removable">
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
						<button
							className="pill-remove-x"
							onClick={(e) => {
								e.stopPropagation();
								onRemove(name);
							}}
							title={`Remove ${name}`}
							aria-label={`Remove ${name}`}>
							×
						</button>
					</div>
				);
			})}
		</div>
	);
};

const UnpackFeelings = () => {
	const { feelings, setFeelings, needs, setNeeds, feelingsExploreResponses, setFeelingsExploreResponses } =
		useWizard();
	const [expandedTypes, setExpandedTypes] = useState(new Set());
	const [popupItem, setPopupItem] = useState(null);
	const [pendingRemoveFeeling, setPendingRemoveFeeling] = useState(null);

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
			.filter(([, s]) => s === "clicked" || s === "double-clicked")
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

	const hasSelectedFeelings = Object.values(feelings).some((s) => s === "clicked" || s === "double-clicked");

	return (
		<div className="feelings-explore-regulation">
			{!hasSelectedFeelings && (
				<p className="empty-state-notice">
					No feelings selected yet — this page isn't useful until you've chosen some feelings on the previous
					step.
				</p>
			)}

			<p>
				{
					"Here we're staying with what you're feeling, so that it can soften and show you more about what matters to you."
				}
			</p>

			{renderOrderedFeelings(feelings, setPopupItem, setPendingRemoveFeeling)}

			<div className="page-section">
				<p>
					There's nothing to solve here — just notice what happens when you choose one of these feelings and
					just <HelpLink topic="stay-with-it">stay with it for a moment</HelpLink>, without digging or
					forcing. Is there something it wants to tell you? Can you pause long enough to hear the answer from
					your body, rather than your mind?
				</p>

				{/* TODO: add text box so user can note anything that came up for them here! */}
			</div>

			{pendingRemoveFeeling && (
				<div className="feeling-remove-confirm">
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
						<button className="feeling-remove-confirm-cancel" onClick={() => setPendingRemoveFeeling(null)}>
							Cancel
						</button>
					</div>
				</div>
			)}

			{detectedTypes.length > 0 && (
				<div className="feelings-explore-categories">
					<p className="feelings-explore-categories-intro">
						{
							"You've chosen feelings in these categories. Would you like to have a deeper look? Start with the one that's loudest."
						}
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

			<div>
				<h3>Lastly ... </h3>
				<p>
					We often feel something vulnerable first, quickly followed by more defended feelings. Can you
					distinguish the early feelings, from the more defended feelings that came in response to those?
				</p>
			</div>

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

UnpackFeelings.title = "Explore Feelings";
UnpackFeelings.navTitle = "Explore Feelings";
UnpackFeelings.helpContent = (
	<>
		<div>
			<h2>Help: Explore Feelings</h2>

			<p>
				When many of your feelings point in the same direction, it can help to spend a moment with that
				emotional type before moving on.
			</p>

			<p>
				This step is optional — if it doesn't feel right, you can skip it and move on to exploring your needs.
			</p>

			<p>There are no right answers here. Just notice what comes up.</p>

			<hr />

			<p>It can also help to understand that not all feelings come from the same place.</p>

			<p>
				Some feelings arise <strong>directly from the body</strong>, before the mind has had time to interpret
				what's happening. These are often the <em>first feelings</em> — things like surprise, confusion, hurt,
				fear, or anger. They're fast, instinctive, and based on a huge amount of information your nervous system
				is processing outside of conscious awareness.
			</p>

			<p>You can think of these as the body's wisdom — a different kind of intelligence to the thinking mind.</p>

			<p>
				Then, very quickly, the mind starts trying to make sense of what's happening. It creates a story: what
				this means, why it happened, and what it says about you or the other person.
			</p>

			<p>
				Those stories can generate a second layer of feelings — sometimes much stronger ones. These are often{" "}
				<strong>thought-generated feelings</strong>.
			</p>

			<p>
				For example, someone might initially feel surprised or a bit hurt when a friend suddenly takes a phone
				call. But if the mind creates a story like "they don't respect me" or "they're playing with me," that
				can quickly turn into much stronger anger.
			</p>

			<p>
				There's nothing wrong with these thought-generated feelings. They often point to important things —
				including past experiences, sensitivities, or old hurts that still matter and may need care.
			</p>

			<p>At the same time, it can be helpful to gently separate:</p>

			<ul>
				<li>
					what you felt <strong>first</strong>, in direct response to what happened
				</li>
				<li>
					what you felt <strong>afterward</strong>, as your mind made sense of it
				</li>
			</ul>

			<p>
				This helps you respond more clearly to <strong>this situation</strong>, while also recognising that some
				of what's been stirred up may belong to other experiences that deserve attention in their own way.
			</p>

			<p>
				You don't need to get this perfectly right. Even a small sense of "what came first" can help bring more
				clarity to what you're feeling and what you might need.
			</p>
		</div>
	</>
);

export default UnpackFeelings;
