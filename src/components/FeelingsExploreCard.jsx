import React, { useState, useEffect, useMemo } from "react";
import { useWizard } from "./WizardContext";
import { AllFeelingsData as FeelingsData } from "../data/AllFeelingsData";
import { feelingTypes, pickDominantFeelingType } from "../data/FeelingTypes";
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

const renderOrderedFeelings = (feelings) => {
	const entries = Object.entries(feelings).filter(([, s]) => s === "clicked" || s === "double-clicked");
	if (entries.length === 0) return null;
	const strong = entries.filter(([, s]) => s === "double-clicked");
	const regular = entries.filter(([, s]) => s === "clicked");
	const sorted = [...strong, ...regular];
	return (
		<p className="feelings-selected-box">
			{sorted.map(([name, strength], i) => (
				<React.Fragment key={name}>
					{i > 0 && ", "}
					{strength === "double-clicked" ? <strong>{name}</strong> : name}
				</React.Fragment>
			))}
		</p>
	);
};

const FeelingsExploreCard = () => {
	const { feelings, feelingsExploreResponses, setFeelingsExploreResponses } = useWizard();

	const [cardExpanded, setCardExpanded] = useState(false);

	// Get selected unmet feelings with FeelingType data
	const selectedUnmetWithFeelingType = useMemo(() => {
		return Object.entries(feelings)
			.filter(([_, status]) => status === "clicked" || status === "double-clicked")
			.map(([name]) => itemLookup[name])
			.filter(Boolean);
	}, [feelings]);

	const dominantFeelingType = pickDominantFeelingType(selectedUnmetWithFeelingType);
	const card = dominantFeelingType ? feelingTypes[dominantFeelingType] : null;

	// Reset expanded state when the dominant FeelingType changes
	useEffect(() => {
		setCardExpanded(false);
	}, [dominantFeelingType]);

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

	return (
		<div className="feelings-explore-regulation">
			{renderOrderedFeelings(feelings)}

			<p>
				When you sit with these feelings, is there anything else that feels important or missing? If so, you
				might like to look through the feelings list again, and choose more.
			</p>

			<div className="words-box">
				<p>
					Take a moment to notice the order in which these feelings arrived. We often feel something
					vulnerable first, which is quickly covered up by the mind with stories about what the other person
					did wrong. Can you distinguish the early feelings, from the "thought-feelings" that came in response
					to those?
				</p>
			</div>

			{card && !cardExpanded && (
				<div className="feelings-explore-prompt-reveal">
					<p className="feelings-explore-prompt-title">
						{card.title} — would you like to explore that a little?
					</p>
					<div className="feelings-explore-reveal-buttons">
						<button className="feelings-explore-reveal-yes" onClick={() => setCardExpanded(true)}>
							Yes, let's explore
						</button>
					</div>
				</div>
			)}

			{card && cardExpanded && (
				<>
					<h3 className="feelings-explore-title">{card.title}</h3>
					<p className="feelings-explore-intro">{card.intro}</p>

					{card.prompts.map((prompt) => (
						<div key={prompt.id} className="feelings-explore-prompt">
							<p className="feelings-explore-prompt-question">{prompt.question}</p>

							{prompt.type === "text" && (
								<textarea
									className="feelings-explore-textarea"
									value={feelingsExploreResponses[prompt.id] || ""}
									onChange={(e) => setResponse(prompt.id, e.target.value)}
									rows={3}
								/>
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
												(feelingsExploreResponses[prompt.id] || []).includes(opt)
													? "chosen"
													: ""
											}`}
											onClick={() => toggleMultiChoice(prompt.id, opt)}>
											{opt}
										</button>
									))}
								</div>
							)}
						</div>
					))}
				</>
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
