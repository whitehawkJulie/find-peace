// to be deleted - now included in Feelings.js

export const FeelingsMet = {
	ui: {
		heading: "Things we might feel when our needs are met",
		helpText: "",
	},
	regulationType: "settled",

	groups: {
		Affectionate: {
			ui: { heading: "Affectionate", order: 10 },
			regulationType: "settled",
			items: [
				{ item: "affectionate", description: "warm fondness", ui: { tier: "simple", quickPick: true } },
				{ item: "compassionate", description: "care for suffering", ui: { tier: "simple" } },
				{ item: "friendly", description: "welcoming warmth", ui: { tier: "simple" } },
				{ item: "loving", description: "full of care", ui: { tier: "simple" } },
				{ item: "open hearted", description: "unguarded warmth", ui: { tier: "simple" } },

				{ item: "sympathetic", description: "concern for another", ui: { tier: "more" } },
				{ item: "tender", description: "gentle care", ui: { tier: "more" } },
				{ item: "warm", description: "kind friendliness", ui: { tier: "more" } },
			],
		},

		Engaged: {
			ui: { heading: "Engaged", order: 20 },
			regulationType: "settled",
			items: [
				{ item: "engaged", description: "actively involved", ui: { tier: "simple", quickPick: true } },
				{ item: "absorbed", description: "fully immersed", ui: { tier: "simple" } },
				{ item: "alert", description: "awake and attentive", ui: { tier: "simple" } },
				{ item: "curious", description: "wanting to know more", ui: { tier: "simple" } },
				{ item: "engrossed", description: "deeply interested", ui: { tier: "simple" } },

				{ item: "enchanted", description: "charmed and delighted", ui: { tier: "more" } },
				{ item: "entranced", description: "captivated", ui: { tier: "more" } },
				{ item: "fascinated", description: "highly interested", ui: { tier: "more" } },
				{ item: "interested", description: "attentive curiosity", ui: { tier: "more" } },
				{ item: "intrigued", description: "drawn in", ui: { tier: "more" } },
				{ item: "involved", description: "participating", ui: { tier: "more" } },
				{ item: "spellbound", description: "captured attention", ui: { tier: "more" } },
				{ item: "stimulated", description: "mentally energized", ui: { tier: "more" } },
			],
		},

		Hopeful: {
			ui: { heading: "Hopeful", order: 30 },
			regulationType: "settled",
			items: [
				{ item: "hopeful", description: "expecting good outcomes", ui: { tier: "simple", quickPick: true } },
				{ item: "expectant", description: "anticipating something good", ui: { tier: "simple" } },
				{ item: "encouraged", description: "more confidence to continue", ui: { tier: "simple" } },
				{ item: "optimistic", description: "seeing positive possibilities", ui: { tier: "simple" } },
			],
		},

		Confident: {
			ui: { heading: "Confident", order: 40 },
			regulationType: "settled",
			items: [
				{ item: "confident", description: "sure of yourself", ui: { tier: "simple", quickPick: true } },
				{ item: "empowered", description: "able to influence", ui: { tier: "simple" } },
				{ item: "open", description: "receptive and unguarded", ui: { tier: "simple" } },
				{ item: "proud", description: "pleased with yourself", ui: { tier: "simple" } },
				{ item: "safe", description: "protected", ui: { tier: "simple" } },

				{ item: "secure", description: "steady and protected", ui: { tier: "more" } },
			],
		},

		Excited: {
			ui: { heading: "Excited", order: 50 },
			regulationType: "settled",
			items: [
				{ item: "excited", description: "eager and energized", ui: { tier: "simple", quickPick: true } },
				{ item: "amazed", description: "filled with wonder", ui: { tier: "simple" } },
				{ item: "animated", description: "lively", ui: { tier: "simple" } },
				{ item: "ardent", description: "intensely enthusiastic", ui: { tier: "simple" } },
				{ item: "aroused", description: "stirred and activated", ui: { tier: "simple" } },

				{ item: "astonished", description: "very surprised", ui: { tier: "more" } },
				{ item: "dazzled", description: "impressed and delighted", ui: { tier: "more" } },
				{ item: "eager", description: "keen to begin", ui: { tier: "more" } },
				{ item: "energetic", description: "full of energy", ui: { tier: "more" } },
				{ item: "enthusiastic", description: "eager and positive", ui: { tier: "more" } },
				{ item: "giddy", description: "light excitedness", ui: { tier: "more" } },
				{ item: "invigorated", description: "renewed energy", ui: { tier: "more" } },
				{ item: "lively", description: "full of life", ui: { tier: "more" } },
				{ item: "passionate", description: "strong enthusiasm", ui: { tier: "more" } },
				{ item: "surprised", description: "caught off guard", ui: { tier: "more" } },
				{ item: "vibrant", description: "full of vitality", ui: { tier: "more" } },
			],
		},

		Grateful: {
			ui: { heading: "Grateful", order: 60 },
			regulationType: "settled",
			items: [
				{
					item: "grateful",
					description: "appreciating what’s received",
					ui: { tier: "simple", quickPick: true },
				},
				{ item: "appreciative", description: "noticing value", ui: { tier: "simple" } },
				{ item: "moved", description: "emotionally touched", ui: { tier: "simple" } },
				{ item: "thankful", description: "feeling thanks", ui: { tier: "simple" } },
				{ item: "touched", description: "warmly affected", ui: { tier: "simple" } },
			],
		},

		Inspired: {
			ui: { heading: "Inspired", order: 70 },
			regulationType: "settled",
			items: [
				{ item: "inspired", description: "uplifted into possibility", ui: { tier: "simple", quickPick: true } },
				{ item: "amazed", description: "filled with wonder", ui: { tier: "simple" } },
				{ item: "awed", description: "reverent wonder", ui: { tier: "simple" } },
				{ item: "wonder", description: "sense of awe", ui: { tier: "simple" } },
			],
		},

		Joyful: {
			ui: { heading: "Joyful", order: 80 },
			regulationType: "settled",
			items: [
				{ item: "joyful", description: "feeling joy", ui: { tier: "simple", quickPick: true } },
				{ item: "amused", description: "finding it funny", ui: { tier: "simple" } },
				{ item: "delighted", description: "very pleased", ui: { tier: "simple" } },
				{ item: "glad", description: "pleased or relieved", ui: { tier: "simple" } },
				{ item: "happy", description: "content pleasure", ui: { tier: "simple" } },

				{ item: "jubilant", description: "celebratory joy", ui: { tier: "more" } },
				{ item: "pleased", description: "satisfied pleasure", ui: { tier: "more" } },
				{ item: "tickled", description: "lightly amused", ui: { tier: "more" } },
			],
		},

		Exhilarated: {
			ui: { heading: "Exhilarated", order: 90 },
			regulationType: "settled",
			items: [
				{ item: "exhilarated", description: "energized joy", ui: { tier: "simple", quickPick: true } },
				{ item: "blissful", description: "deep contentment", ui: { tier: "simple" } },
				{ item: "ecstatic", description: "extreme happiness", ui: { tier: "simple" } },
				{ item: "elated", description: "highly happy", ui: { tier: "simple" } },
				{ item: "enthralled", description: "captivated with joy", ui: { tier: "simple" } },

				{ item: "exuberant", description: "high-spirited energy", ui: { tier: "more" } },
				{ item: "radiant", description: "glowing happiness", ui: { tier: "more" } },
				{ item: "rapturous", description: "intense joy", ui: { tier: "more" } },
				{ item: "thrilled", description: "excited and pleased", ui: { tier: "more" } },
			],
		},

		Refreshed: {
			ui: { heading: "Refreshed", order: 100 },
			regulationType: "settled",
			items: [
				{ item: "refreshed", description: "rested and renewed", ui: { tier: "simple", quickPick: true } },
				{ item: "enlivened", description: "more alive", ui: { tier: "simple" } },
				{ item: "rejuvenated", description: "renewed vitality", ui: { tier: "simple" } },
				{ item: "renewed", description: "fresh start feeling", ui: { tier: "simple" } },
				{ item: "rested", description: "adequately rested", ui: { tier: "simple" } },

				{ item: "restored", description: "strength returned", ui: { tier: "more" } },
				{ item: "revived", description: "brought back to life", ui: { tier: "more" } },
			],
		},

		Peaceful: {
			ui: { heading: "Peaceful", order: 110 },
			regulationType: "settled",
			items: [
				{ item: "peaceful", description: "calm and undisturbed", ui: { tier: "simple", quickPick: true } },
				{ item: "calm", description: "not agitated", ui: { tier: "simple" } },
				{ item: "clear headed", description: "mentally clear", ui: { tier: "simple" } },
				{ item: "comfortable", description: "at ease", ui: { tier: "simple" } },
				{ item: "centered", description: "grounded balance", ui: { tier: "simple" } },

				{ item: "content", description: "satisfied with what is", ui: { tier: "more" } },
				{ item: "equanimous", description: "steady under stress", ui: { tier: "more" } },
				{ item: "fulfilled", description: "deeply satisfied", ui: { tier: "more" } },
				{ item: "mellow", description: "easygoing calm", ui: { tier: "more" } },
				{ item: "quiet", description: "inner quiet", ui: { tier: "more" } },
				{ item: "relaxed", description: "tension released", ui: { tier: "more" } },
				{ item: "relieved", description: "pressure lifted", ui: { tier: "more" } },
				{ item: "satisfied", description: "content with outcome", ui: { tier: "more" } },
				{ item: "serene", description: "deep calm", ui: { tier: "more" } },
				{ item: "still", description: "quiet and settled", ui: { tier: "more" } },
				{ item: "tranquil", description: "peaceful calm", ui: { tier: "more" } },
				{ item: "trusting", description: "able to rely safely", ui: { tier: "more" } },
			],
		},
	},
};

export default FeelingsMet;
