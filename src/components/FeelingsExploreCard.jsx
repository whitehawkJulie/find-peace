import React, { useState, useEffect, useMemo } from "react";
import { useWizard } from "./WizardContext";
import { AllFeelingsData as FeelingsData } from "../data/AllFeelingsData";
import { familyCards, pickDominantFamily } from "../data/familyCards";
import "./FeelingsExploreCard.css";

// Build a lookup: item name → full item data (only for unmet feelings with a family tag)
const itemLookup = {};
const unmetSection = FeelingsData.sections.feelings;
if (unmetSection?.groups) {
	for (const group of Object.values(unmetSection.groups)) {
		for (const item of group.items) {
			if (item.family) {
				itemLookup[item.item] = item;
			}
		}
	}
}

const renderOrderedFeelings = (feelings) => {
	const entries = Object.entries(feelings).filter(([, s]) => s === "clicked" || s === "double-clicked");
	if (entries.length === 0) return null;
	return (
		<p style={{ textAlign: "center" }}>
			{entries.map(([name, strength], i) => (
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

	// Get selected unmet feelings with family data
	const selectedUnmetWithFamily = useMemo(() => {
		return Object.entries(feelings)
			.filter(([_, status]) => status === "clicked" || status === "double-clicked")
			.map(([name]) => itemLookup[name])
			.filter(Boolean);
	}, [feelings]);

	const dominantFamily = pickDominantFamily(selectedUnmetWithFamily);
	const card = dominantFamily ? familyCards[dominantFamily] : null;

	// Reset expanded state when the dominant family changes
	useEffect(() => {
		setCardExpanded(false);
	}, [dominantFamily]);

	const setResponse = (promptId, value) => {
		setFeelingsExploreResponses((prev) => ({ ...prev, [promptId]: value }));
	};

	const toggleMultiChoice = (promptId, option) => {
		setFeelingsExploreResponses((prev) => {
			const current = prev[promptId] || [];
			const updated = current.includes(option)
				? current.filter((o) => o !== option)
				: [...current, option];
			return { ...prev, [promptId]: updated };
		});
	};

	return (
		<div className="feelings-explore-regulation">
			{renderOrderedFeelings(feelings)}

			{card && !cardExpanded && (
				<div className="feelings-explore-prompt-reveal">
					<p className="feelings-explore-prompt-title">{card.title} — would you like to explore that a little?</p>
					<div className="feelings-explore-reveal-buttons">
						<button className="feelings-explore-reveal-yes" onClick={() => setCardExpanded(true)}>
							Yes, let's explore
						</button>
						<button className="subtle-button feelings-explore-reveal-no" onClick={() => {}}>
							No thanks
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
												(feelingsExploreResponses[prompt.id] || []).includes(opt) ? "chosen" : ""
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
			When many of your feelings point in the same direction, it can help
			to spend a moment with that emotional family before moving on.
		</p>
		<p>
			This step is optional — if it doesn't feel right, you can skip it
			and move on to exploring your needs.
		</p>
		<p>
			There are no right answers here. Just notice what comes up.
		</p>
	</>
);

export default FeelingsExploreCard;
