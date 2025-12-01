import React from "react";
import Card from "./Card";
import { useWizard } from "./WizardContext";
import { feelingsData } from "./feelingsData"; // adjust import path if needed
import { renderAllPills, renderPills, renderTextList, filterByState } from "../utils/renderHelpers";

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
				<i>
					The key to identifying and expressing feelings is to focus on words that describe our inner
					experience rather than words that describe our interpretations of people's actions. For example: "I
					feel lonely" describes an inner experience, while "I feel like you don't love me" describes an
					interpretation of how the other person may be feeling. - Miki Kashtan
				</i>
			</p>
			<p>EMPATHY: Ah, these particular words are so painful, aren't they?!</p>
			<p>
				WHY REFRAME? These <strong>"faux feeling"</strong> words that actually thoughts, but we often use them
				as feeling words. Part of why they so painful is they're actually thoughts (rather than specific
				body-based feelings) about what we think someone else is doing to us, as we're mostly utterly powerless
				over other people's behaviour. Don't get me wrong, there are absolutely big feelings underneath these
				words, but it's so much more useful to us if we can identify the actual feelings, rather than just the
				though. When we use these words, we often feel like victims, unable to change our experience.
			</p>
			<p>
				HOW TO REFRAME The good (or at least, better!) news is that we're NOT powerless over the stories we tell
				ourselves, and our actual feelings, which occur in our bodies. So let's unpack these particular words,
				so we can notice the judgments, diagnoses, or assumptions. This is an opportunity to (a) consider
				whether the story is actually true, and (b), unpack the actual feelings underneath. The body has a
				powerful ability to move through emotions, but the mind DOES NOT. It will dwell on them forever, given
				the opportunity! Add "message delivered" stuff here from Sarah Peyton.
			</p>
			<p>
				{" "}
				LET'S START So let’s unpack them, to see what might be going on underneath, so we see what parts we can
				actually do something about.
			</p>

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
