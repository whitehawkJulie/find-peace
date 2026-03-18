// feelingTypes.js
// Tentative, collaborative tone.
// Designed to be optional, lightweight, and always skippable.

export const feelingTypes = {
	fear: {
		title: "Fear",
		intro: "Let's get curious about what your system might be bracing for.",
		skipLabel: "Skip this",
		prompts: [
			{
				id: "fear_body",
				type: "text",
				question:
					"Is it anticipatory fear, because this feels like something you've been in before, that didn't turn out well?",
			},
			{
				id: "fear_prediction",
				type: "text",
				question: "If there’s a worried prediction attached, what is it saying?",
				stem: "I’m afraid that…",
			},
		],
	},

	anger: {
		title: "Anger",
		intro: "Anger often shows up when a boundary has been crossed, or when we're hurt, or afraid.",
		skipLabel: "Skip this",
		prompts: [
			{
				id: "anger_body",
				type: "text",
				question:
					"Where can you feel the anger in your body? Can you ask your BODY what it's telling you about this anger, rather than your mind?",
			},
			{
				id: "anger_violation",
				type: "text",
				question:
					"Is there a sense that a boundary has been crossed? Some kind of violation or wrongness? What’s that about?",
			},
			{
				id: "anger_tears",
				type: "text",
				question:
					"Does it feel like there might be hot tears behind the anger? Is there a sense of outrage at emotional rupture?",
				suggestFeeling: {
					name: "hurt",
					prompt: 'Would you like to add "hurt" to your feeling list?',
				},
			},
			{
				id: "anger_protect",
				type: "text",
				question:
					"Does the anger feel like it’s trying to protect you from harm? What are you afraid might happen, if the anger doesn’t protect you?",
				suggestFeeling: {
					name: "afraid",
					prompt: 'Would you like to add "afraid" to your feeling list?',
				},
			},
		],
	},

	distress: {
		title: "Sadness or hurt",
		intro: "Words in this category often point to loss or longing. We can stay very gentle here.",
		skipLabel: "Skip this",
		prompts: [
			{
				id: "distress_missing",
				type: "text",
				question: "What are you missing, or longing for?",
			},
			{
				id: "distress_if_met",
				type: "text",
				question: "If things had gone the way you hoped, what would you have had?",
			},
			{
				id: "distress_kindness",
				type: "singleChoice",
				question: "What would be kind to you right now?",
				options: ["A warm hug", "Rest", "Reassurance", "Time to feel", "A small step forward", "Not sure"],
			},
		],
	},

	confusion: {
		title: "It sounds like there may be a lot of confusion or overwhelm here",
		intro: "If that resonates, smaller is usually better. Let’s find one clarity point.",
		skipLabel: "Skip this",
		prompts: [
			{
				id: "confusion_unknown",
				type: "text",
				question: "What’s the biggest unknown or tangle right now?",
			},
			{
				id: "confusion_one_clear",
				type: "text",
				question: "If we could make just one thing clearer, what would it be?",
			},
			{
				id: "confusion_next_step",
				type: "text",
				question: "What’s one tiny next step (or one question) that would help?",
			},
		],
	},

	shame: {
		title: "It sounds like there may be some shame here",
		intro: "If so, shame often comes with a harsh story about belonging or worth. We can slow down and soften.",
		skipLabel: "Skip this",
		prompts: [
			{
				id: "shame_type",
				type: "singleChoice",
				question: "Which feels closer?",
				options: ["I did something wrong", "There’s something wrong with me", "Both", "Not sure"],
			},
			{
				id: "shame_understood",
				type: "text",
				question: "If you were met with kindness, what would you want understood about you?",
			},
			{
				id: "shame_next_kind",
				type: "singleChoice",
				question: "What would be kind to you right now?",
				options: [
					"Gentleness",
					"Reassurance",
					"Repair / making amends",
					"Privacy / space",
					"Support",
					"Not sure",
				],
			},
		],
	},

	tiredness: {
		title: "It sounds like there may be a lot of tiredness here",
		intro: "If that’s right, this might be about capacity more than motivation. Let’s listen to what your system needs.",
		skipLabel: "Skip this",
		prompts: [
			{
				id: "tiredness_type",
				type: "singleChoice",
				question: "What kind of tired is this?",
				options: ["Physical", "Emotional", "Both", "Not sure"],
			},
			{
				id: "tiredness_rest_kind",
				type: "singleChoice",
				question: "What kind of rest would actually help?",
				options: [
					"Sleep",
					"Quiet / no input",
					"Food / water",
					"Stop doing things",
					"Gentle movement",
					"Not sure",
				],
			},
			{
				id: "tiredness_smallest",
				type: "text",
				question: "What’s the smallest self-care you could do right now?",
			},
		],
	},

	shutdown: {
		title: "It sounds like there may be a lot of numbness or disconnection here",
		intro: "If so, numbness can be protective. We don’t have to force feeling — just a bit more contact, if you want.",
		skipLabel: "Skip this",
		prompts: [
			{
				id: "shutdown_protecting",
				type: "text",
				question: "If the numbness is protecting you from something, what might it be protecting you from?",
			},
			{
				id: "shutdown_sensation",
				type: "singleChoice",
				question: "What’s one safe sensation you can notice right now?",
				options: ["Feet", "Hands", "Breath", "A texture", "A sound", "Not sure"],
			},
			{
				id: "shutdown_aim",
				type: "singleChoice",
				question: "Would you like to aim for…",
				options: ["A little more present", "A little more resourced", "Just naming it is enough for now"],
			},
		],
	},
};

export default feelingTypes;

// If you want the trigger logic in one place (optional helper),
// use this alongside feelingFamilies. This isn’t required, but it matches what we agreed.

export const pickDominantFeelingType = (
	selectedUnmetFeelings,
	{ dominanceThreshold = 0.7, minSelections = 2 } = {},
) => {
	// selectedUnmetFeelings: array of items that have `feelingType`
	const items = (selectedUnmetFeelings || []).filter((x) => x && x.feelingType);
	if (items.length < minSelections) return null;

	const counts = {};
	for (const it of items) counts[it.feelingType] = (counts[it.feelingType] || 0) + 1;

	const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
	if (sorted.length === 0) return null;

	const [topFeelingType, topCount] = sorted[0];
	const total = items.length;

	// tie check
	if (sorted.length > 1 && sorted[1][1] === topCount) return null;

	if (topCount / total >= dominanceThreshold) return topFeelingType;

	return null;
};
