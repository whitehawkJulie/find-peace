import React from "react";
import Card from "./Card";
import { useWizard } from "./WizardContext";
import { feelingsData } from "./feelingsData"; // adjust import path if needed

const FauxFeelingsUnpackCard = () => {
	const { feelings } = useWizard();

	// Flatten all faux feelings into a single list for lookup
	const fauxFeelingsMap = Object.entries(feelingsData["Faux Feelings"]).flatMap(([subCategory, items]) =>
		items.map((item) => ({
			...item,
			subCategory,
		}))
	);

	// Find which selected feelings are actually faux feelings
	const selectedFauxFeelings = Object.entries(feelings)
		.filter(([_, status]) => status === "clicked") // or whatever your selection flag is
		.map(([feeling]) => {
			return fauxFeelingsMap.find((entry) => entry.item === feeling);
		})
		.filter(Boolean);

	// If no faux feelings selected, skip rendering this card
	if (selectedFauxFeelings.length === 0) return null;

	return (
		<>
			<p>
				It looks like one or more of the words you chose are <strong>faux feelings</strong> — words that sound
				like feelings, but actually contain judgments, diagnoses, or assumptions. This is an opportunity to (a)
				consider whether the story is actually true, and (b), unpack the actual feelings underneath.
			</p>
			<p>Let’s unpack them a little, to see what might really be going on underneath:</p>

			{selectedFauxFeelings.map((feeling, i) => (
				<div key={i} style={{ marginBottom: "2rem" }}>
					<h3 style={{ marginBottom: "0.25rem" }}>❌ {feeling.item}</h3>
					<p style={{ fontStyle: "italic", marginBottom: "0.5rem" }}>{feeling.problem}</p>

					{feeling.suggestedFeelings?.length > 0 && (
						<div>
							<p style={{ marginBottom: "0.25rem" }}>
								👉 <strong>Possible real feelings:</strong>
							</p>
							<ul>
								{feeling.suggestedFeelings.map((f, index) => (
									<li key={index}>{f}</li>
								))}
							</ul>
						</div>
					)}

					{feeling.suggestedNeeds?.length > 0 && (
						<div>
							<p style={{ marginBottom: "0.25rem" }}>
								💡 <strong>Possible underlying needs:</strong>
							</p>
							<ul>
								{feeling.suggestedNeeds.map((n, index) => (
									<li key={index}>{n}</li>
								))}
							</ul>
						</div>
					)}
				</div>
			))}
		</>
	);
};

export default FauxFeelingsUnpackCard;
