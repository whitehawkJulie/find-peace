// feelingsData.js
// v4: Clean separation + no duplication.
// - Keeps your original UI category structure
// - Renames "Faux Feelings" -> "Words that point to what happened"
// - Adds `family` directly on unmet-needs feeling items (for optional pacing logic)
// - Removes `meta.quickPicks` and any `byItem` mapping (derive quick picks from items)
// - Adds 5 “murky feelings” unpack cards (angry/anxious/depressed/ashamed/guilty)
// - Avoids wording like “real feeling” (no implied hierarchy)
// - Leaves needs-met feelings untagged (no `family`, no “positive” family)
//
// Suggested UI logic:
// - Quick picks row: filter unmet-needs items where ui.quickPick === true
// - Simple view: show only items where ui.tier !== "more"
// - "Show more": reveal tier === "more" items in that category
// - When a user selects:
//   - story word (kind === "storyWord") -> show story-word unpack immediately
//   - murky feeling (unpack.cardId present) -> show murky unpack immediately
//
// Note: `family` values are strings: "fear" | "anger" | "distress" | "confusion" | "shame" | "tiredness" | "shutdown"

export const feelingsData = {
	meta: {
		version: 4,
		defaultView: "simple",
		storyWordsCollapsedByDefault: true,

		clusterRules: {
			minSelections: 2,
			dominanceThreshold: 0.7,
			maxPromptsToOffer: 1,
		},

		// Copy + structure for immediate unpack cards for “murky feelings”
		unpackCards: {
			murky_angry: {
				title: "Unpack: angry",
				intro: "Anger often carries a clear 'no' or a boundary signal.",
				prompts: [
					{
						type: "text",
						question: "What felt not okay, or what line felt crossed?",
					},
					{
						type: "singleChoice",
						question: "Is this anger more like…",
						options: [
							"Hot and urgent",
							"Firm and clear",
							"Simmering / resentful",
							"Protective / defensive",
						],
					},
					{
						type: "text",
						question: "What are you protecting or standing up for here? (optional)",
					},
				],
			},

			murky_anxious: {
				title: "Unpack: anxious",
				intro: "This word often holds both a body sensation and a worried thought.",
				prompts: [
					{
						type: "singleChoice",
						question: "Which flavour fits most right now?",
						options: ["Nervous", "Worried", "Tense", "Scared", "Uneasy"],
					},
					{
						type: "text",
						question: "If there’s a worried prediction attached, what is it saying? (optional)",
						stem: "I’m afraid that…",
					},
					{
						type: "singleChoice",
						question: "Where do you feel it most in your body? (optional)",
						options: ["Chest", "Stomach", "Throat", "Jaw", "Whole body", "Not sure"],
					},
				],
			},

			murky_depressed: {
				title: "Unpack: depressed",
				intro: "This word can sometimes hold a bundle of experiences. Unpacking it can make the next step clearer.",
				prompts: [
					{
						type: "multiChoice",
						question: "Which parts are present right now?",
						options: [
							"Numb",
							"Hopeless",
							"Drained",
							"Lonely",
							"Overwhelmed",
							"Sad",
							"Disconnected",
							"Tired",
						],
					},
					{
						type: "singleChoice",
						question: "Is it more like…",
						options: ["Flat / shut down", "Heavy / grieving", "Agitated / overwhelmed", "Not sure"],
					},
					{
						type: "text",
						question: "If one small thing could shift 5%, what might that be? (optional)",
					},
				],
			},

			murky_ashamed: {
				title: "Unpack: ashamed",
				intro: "Shame often includes a tender story about belonging or worth.",
				prompts: [
					{
						type: "singleChoice",
						question: "Which feels closer?",
						options: ["I did something wrong", "There’s something wrong with me", "Both", "Not sure"],
					},
					{
						type: "text",
						question: "If there’s a harsh inner sentence attached, what is it saying? (optional)",
						stem: "The story is…",
					},
					{
						type: "text",
						question: "If you were met with kindness right now, what would you want understood about you?",
					},
				],
			},

			murky_guilty: {
				title: "Unpack: guilty",
				intro: "Guilt often carries an inner 'should' and a value you care about.",
				prompts: [
					{
						type: "text",
						question: "What’s the 'should' in you? (optional)",
						stem: "I should have…",
					},
					{
						type: "singleChoice",
						question: "Under the guilt, is there also…",
						options: ["Regret", "Sadness", "Fear", "Shame", "Not sure"],
					},
					{
						type: "text",
						question: "What value were you wishing to honour?",
					},
				],
			},
		},
	},

	"Feelings when needs are not met": {
		Afraid: [
			{
				item: "Afraid",
				problem: "Experiencing fear or anxiety",
				status: "",
				family: "fear",
				ui: { tier: "simple", quickPick: true },
			},
			{
				item: "Scared",
				problem: "Feeling unsafe or in danger",
				status: "",
				family: "fear",
				ui: { tier: "simple" },
			},
			{
				item: "Anxious",
				problem: "Worried or uneasy",
				status: "",
				family: "fear",
				ui: { tier: "simple" },
				unpack: { cardId: "murky_anxious" },
			},
			{
				item: "Worried",
				problem: "Troubled about potential problems",
				status: "",
				family: "fear",
				ui: { tier: "simple" },
			},
			{
				item: "Apprehensive",
				problem: "Uneasy or fearful about something",
				status: "",
				family: "fear",
				ui: { tier: "more" },
			},
			{
				item: "Nervous",
				problem: "Agitated or easily alarmed",
				status: "",
				family: "fear",
				ui: { tier: "simple" },
			},
			{
				item: "Tense",
				problem: "Body tight and braced, on high alert",
				status: "",
				family: "fear",
				ui: { tier: "simple" },
			},
			{
				item: "Fearful",
				problem: "Feeling afraid something bad will happen",
				status: "",
				family: "fear",
				ui: { tier: "more" },
			},
			{
				item: "Vulnerable",
				problem: "Exposed and unprotected",
				status: "",
				family: "fear",
				ui: { tier: "simple" },
			},
			{ item: "Trapped", problem: "No way out, cornered", status: "", family: "fear", ui: { tier: "simple" } },
			{ item: "Terrified", problem: "Extremely afraid", status: "", family: "fear", ui: { tier: "more" } },
		],

		Angry: [
			{
				item: "Angry",
				problem: "Strong feeling of displeasure or hostility",
				status: "",
				family: "anger",
				ui: { tier: "simple", quickPick: true },
				unpack: { cardId: "murky_angry" },
			},
			{
				item: "Frustrated",
				problem: "Upset because of inability to change or achieve something",
				status: "",
				family: "anger",
				ui: { tier: "simple" },
			},
			{
				item: "Irritated",
				problem: "Mildly angry or annoyed",
				status: "",
				family: "anger",
				ui: { tier: "simple" },
			},
			{ item: "Annoyed", problem: "Slightly angry", status: "", family: "anger", ui: { tier: "simple" } },
			{
				item: "Defensive",
				problem: "Guarded, braced, ready to protect yourself",
				status: "",
				family: "anger",
				ui: { tier: "simple" },
			},
			{
				item: "Resentful",
				problem: "Bitter about being treated unfairly",
				status: "",
				family: "anger",
				ui: { tier: "simple" },
			},
			{ item: "Enraged", problem: "Very angry or furious", status: "", family: "anger", ui: { tier: "more" } },
			{ item: "Furious", problem: "Extremely angry", status: "", family: "anger", ui: { tier: "more" } },
		],

		Sad: [
			{
				item: "Sad",
				problem: "Feeling sorrow or unhappiness",
				status: "",
				family: "distress",
				ui: { tier: "simple", quickPick: true },
			},
			{
				item: "Disappointed",
				problem: "Let down by unmet expectations",
				status: "",
				family: "distress",
				ui: { tier: "simple" },
			},
			{
				item: "Hurt",
				problem: "Emotionally pained",
				status: "",
				family: "distress",
				ui: { tier: "simple", quickPick: true },
			},
			{
				item: "Lonely",
				problem: "Feeling alone or disconnected",
				status: "",
				family: "distress",
				ui: { tier: "simple", quickPick: true },
			},
			{
				item: "Grieving",
				problem: "Experiencing sorrow due to loss",
				status: "",
				family: "distress",
				ui: { tier: "simple" },
			},
			{
				item: "Hopeless",
				problem: "Unable to see a way forward",
				status: "",
				family: "distress",
				ui: { tier: "simple" },
			},
			{
				item: "Discouraged",
				problem: "Losing confidence or hope",
				status: "",
				family: "distress",
				ui: { tier: "simple" },
			},
			{
				item: "Desperate",
				problem: "Frantic, grasping for any way out",
				status: "",
				family: "distress",
				ui: { tier: "more" },
			},
			{
				item: "Heartbroken",
				problem: "Devastated by emotional loss",
				status: "",
				family: "distress",
				ui: { tier: "more" },
			},
		],

		Confused: [
			{
				item: "Confused",
				problem: "Unable to think clearly or understand",
				status: "",
				family: "confusion",
				ui: { tier: "simple" },
			},
			{
				item: "Unclear",
				problem: "Lacking clarity or understanding",
				status: "",
				family: "confusion",
				ui: { tier: "simple" },
			},
			{
				item: "Bewildered",
				problem: "So confused you can’t make sense of what’s happening",
				status: "",
				family: "confusion",
				ui: { tier: "more" },
			},
			{ item: "Puzzled", problem: "Baffled or uncertain", status: "", family: "confusion", ui: { tier: "more" } },
			{ item: "Perplexed", problem: "Completely baffled", status: "", family: "confusion", ui: { tier: "more" } },
			{
				item: "Disoriented",
				problem: "Lost or confused about surroundings or thoughts",
				status: "",
				family: "confusion",
				ui: { tier: "more" },
			},
			{
				item: "Baffled",
				problem: "Totally confused or perplexed",
				status: "",
				family: "confusion",
				ui: { tier: "more" },
			},
			{
				item: "Overwhelmed",
				problem: "Overpowered by emotions or tasks",
				status: "",
				family: "confusion",
				ui: { tier: "simple", quickPick: true },
			},
		],

		Embarrassed: [
			{
				item: "Embarrassed",
				problem: "Feeling self-conscious or awkward",
				status: "",
				family: "shame",
				ui: { tier: "simple" },
			},
			{
				item: "Ashamed",
				problem: "Feeling guilt or disgrace",
				status: "",
				family: "shame",
				ui: { tier: "simple" },
				unpack: { cardId: "murky_ashamed" },
			},
			{
				item: "Guilty",
				problem: "Feeling responsible for wrongdoing",
				status: "",
				family: "shame",
				ui: { tier: "simple" },
				unpack: { cardId: "murky_guilty" },
			},
			{
				item: "Self-conscious",
				problem: "Uncomfortably aware of self",
				status: "",
				family: "shame",
				ui: { tier: "more" },
			},
			{
				item: "Humiliated",
				problem: "Deeply embarrassed or shamed",
				status: "",
				family: "shame",
				ui: { tier: "more" },
			},
			{
				item: "Insecure",
				problem: "Lacking confidence or assurance",
				status: "",
				family: "shame",
				ui: { tier: "simple" },
			},
		],

		Tired: [
			{
				item: "Tired",
				problem: "Needing rest",
				status: "",
				family: "tiredness",
				ui: { tier: "simple", quickPick: true },
			},
			{
				item: "Exhausted",
				problem: "Completely drained of energy",
				status: "",
				family: "tiredness",
				ui: { tier: "simple" },
			},
			{
				item: "Drained",
				problem: "Lacking energy or motivation",
				status: "",
				family: "tiredness",
				ui: { tier: "simple" },
			},
			{
				item: "Fatigued",
				problem: "Very tired and worn out",
				status: "",
				family: "tiredness",
				ui: { tier: "more" },
			},
			{
				item: "Weary",
				problem: "Tired from work or stress",
				status: "",
				family: "tiredness",
				ui: { tier: "more" },
			},
			{
				item: "Burned out",
				problem: "Emotionally exhausted due to prolonged stress",
				status: "",
				family: "tiredness",
				ui: { tier: "simple" },
			},
			{
				item: "Depleted",
				problem: "Used up or empty of energy",
				status: "",
				family: "tiredness",
				ui: { tier: "more" },
			},
		],

		Disconnected: [
			{
				item: "Disconnected",
				problem: "Emotionally detached",
				status: "",
				family: "shutdown",
				ui: { tier: "simple" },
			},
			{
				item: "Alienated",
				problem: "Feeling isolated from others",
				status: "",
				family: "shutdown",
				ui: { tier: "more" },
			},
			{ item: "Isolated", problem: "Cut off from others", status: "", family: "shutdown", ui: { tier: "more" } },
			{
				item: "Numb",
				problem: "Unable to feel or express emotions",
				status: "",
				family: "shutdown",
				ui: { tier: "simple", quickPick: true },
			},
			{
				item: "Powerless",
				problem: "No agency, unable to influence anything",
				status: "",
				family: "shutdown",
				ui: { tier: "simple" },
			},
			{
				item: "Unseen",
				problem: "Feeling invisible to others",
				status: "",
				family: "shutdown",
				ui: { tier: "simple" },
			},
			{
				item: "Ignored",
				problem: "Feeling neglected or dismissed",
				status: "",
				family: "shutdown",
				ui: { tier: "simple" },
			},
			{
				item: "Unheard",
				problem: "Not listened to or acknowledged",
				status: "",
				family: "shutdown",
				ui: { tier: "simple" },
			},

			// Added as a selectable “murky feeling” (kept in-category as requested)
			{
				item: "Depressed",
				problem: "A heavy, low, or flat state (often includes multiple feelings)",
				status: "",
				family: "shutdown",
				ui: { tier: "more" },
				unpack: { cardId: "murky_depressed" },
			},
		],
	},

	"Words that point to what happened": {
		"About what others did": [
			{
				item: "abandoned",
				kind: "storyWord",
				problem: "Points to what happened out there (someone leaving), rather than what you’re feeling inside",
				thought: "You're having the thought that someone left you when you really needed them",
				suggestedFeelings: ["Terrified", "Hurt", "Bewildered", "Sad", "Scared", "Lonely"],
				suggestedNeeds: [
					"Nurturing",
					"Connection",
					"Belonging",
					"Support",
					"Care",
					"Companionship",
					"Safety (emotional)",
				],
				status: "",
				ui: { tier: "simple" },
			},
			{
				item: "abused",
				kind: "storyWord",
				problem: "Describes an action, not a feeling — needs protection and care",
				thought: "You're having the thought that someone treated you in a cruel or violating way",
				suggestedFeelings: ["Fearful", "Confused", "Overwhelmed", "Hurt"],
				suggestedNeeds: [
					"Care",
					"Nurturing",
					"Support",
					"Safety (emotional)",
					"Physical Safety",
					"Consideration",
					"To matter",
					"Trusting",
				],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "attacked",
				kind: "storyWord",
				problem: "Assumes hostile intent, not just how you feel",
				thought: "You're having the thought that someone came at you with hostility or blame",
				suggestedFeelings: ["Scared", "Vulnerable", "Angry", "Defensive", "Tense"],
				suggestedNeeds: ["Safety (emotional)", "Respect", "Understanding", "Autonomy", "Space"],
				status: "",
				ui: { tier: "simple" },
			},
			{
				item: "belittled",
				kind: "storyWord",
				problem: "Judges someone else's action as putting you down",
				thought: "You're having the thought that someone is putting you down or making you feel small",
				suggestedFeelings: ["Hurt", "Tense", "Overwhelmed", "Ashamed", "Angry"],
				suggestedNeeds: [
					"Respect",
					"Autonomy",
					"To be heard, seen",
					"Understanding",
					"Acknowledgement",
					"Appreciation",
					"Dignity",
				],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "betrayed",
				kind: "storyWord",
				problem: "Focuses on someone else's broken promise or loyalty",
				thought: "You're having the thought that someone broke your trust or turned on you",
				suggestedFeelings: ["Hurt", "Scared", "Disappointed", "Heartbroken"],
				suggestedNeeds: [
					"Trusting",
					"Consistency",
					"Honesty",
					"Integrity",
					"Mutuality",
					"Clarity",
					"Safety (emotional)",
				],
				status: "",
				ui: { tier: "simple" },
			},
			{
				item: "blamed",
				kind: "storyWord",
				problem: "Points to being accused, rather than how you feel",
				thought: "You're having the thought that you're being unfairly accused or held responsible",
				suggestedFeelings: ["Scared", "Confused", "Bewildered", "Hurt", "Angry"],
				suggestedNeeds: ["Self-responsiblity", "Equality", "Clarity", "Understanding", "Trusting"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "bullied",
				kind: "storyWord",
				problem: "Describes being targeted or controlled by another",
				thought: "You're having the thought that someone is intimidating or trying to control you",
				suggestedFeelings: ["Scared", "Powerless", "Anxious", "Angry", "Hopeless"],
				suggestedNeeds: ["Autonomy", "Choice", "Safety (emotional)", "Consideration", "Respect", "Agency"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "cheated",
				kind: "storyWord",
				problem: "Judges unfair treatment by another",
				thought: "You're having the thought that someone took advantage of you or broke an agreement",
				suggestedFeelings: ["Hurt", "Angry", "Disappointed", "Resentful"],
				suggestedNeeds: ["Honesty", "Equality", "Trusting", "Consistency"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "coerced",
				kind: "storyWord",
				problem: "Assumes you were forced against your will",
				thought: "You're having the thought that someone pressured or forced you into something",
				suggestedFeelings: ["Scared", "Angry", "Trapped", "Resentful"],
				suggestedNeeds: ["Autonomy", "Choice", "Independence", "Respect", "Safety (emotional)"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "caged",
				kind: "storyWord",
				problem: "Evokes restriction without naming the feeling",
				thought: "You're having the thought that you're being trapped or restricted against your will",
				suggestedFeelings: ["Anxious", "Frustrated", "Trapped", "Desperate"],
				suggestedNeeds: ["Independence", "Space", "Autonomy", "Movement", "Choice"],
				status: "",
				ui: { tier: "more" },
			},
		],

		"Blame-ish phrases": [
			{
				item: "criticized",
				kind: "storyWord",
				problem: "Refers to what someone did, not how you felt",
				thought: "You're having the thought that someone is judging or finding fault with you",
				suggestedFeelings: ["Defensive", "Hurt", "Ashamed", "Angry"],
				suggestedNeeds: ["Understanding", "Acknowledgement", "Respect", "Appreciation", "Empathy"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "ignored",
				kind: "storyWord",
				problem: "Centers on others' behaviour, not your emotional state",
				thought: "You're having the thought that your presence or needs don't matter to someone",
				suggestedFeelings: ["Lonely", "Hurt", "Frustrated", "Sad", "Angry"],
				suggestedNeeds: ["Attention", "Connection", "Acknowledgement", "To matter", "Inclusion"],
				status: "",
				ui: { tier: "simple" },
			},
			{
				item: "manipulated",
				kind: "storyWord",
				problem: "Assumes bad intent, rather than expressing distrust or confusion",
				thought: "You're having the thought that someone is trying to control or deceive you",
				suggestedFeelings: ["Confused", "Scared", "Angry", "Powerless"],
				suggestedNeeds: ["Clarity", "Honesty", "Autonomy", "Respect", "Trusting", "Safety (emotional)"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "neglected",
				kind: "storyWord",
				problem: "Implies wrongdoing or failure by others",
				thought: "You're having the thought that someone failed to care for or attend to you",
				suggestedFeelings: ["Hurt", "Lonely", "Resentful", "Hopeless"],
				suggestedNeeds: ["Care", "Attention", "Support", "Nurturing", "Belonging", "To matter", "Consistency"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "rejected",
				kind: "storyWord",
				problem: "Focuses on what someone did, not your feeling",
				thought: "You're having the thought that you're being pushed away or excluded",
				suggestedFeelings: ["Sad", "Hurt", "Ashamed", "Insecure"],
				suggestedNeeds: ["Acceptance", "Belonging", "Connection", "Love", "Self-acceptance"],
				status: "",
				ui: { tier: "simple" },
			},
		],

		"Diagnosis / labels": [
			{
				item: "triggered",
				kind: "storyWord",
				problem: "Refers to a reaction, not the emotions it brings up",
				thought: "You're having the thought that something just set off a big emotional reaction",
				suggestedFeelings: ["Scared", "Ashamed", "Angry", "Overwhelmed"],
				suggestedNeeds: ["Safety (emotional)", "Healing", "Self-connection", "Support", "Stability"],
				status: "",
				ui: { tier: "simple" },
			},
			{
				item: "traumatized",
				kind: "storyWord",
				problem: "Describes a state, not a current feeling",
				thought: "You're having the thought that you're overwhelmed or re-experiencing a past wound",
				suggestedFeelings: ["Numb", "Terrified", "Disconnected", "Overwhelmed"],
				suggestedNeeds: ["Safety (emotional)", "Healing", "Care", "Trusting", "Support", "Stability"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "depressed",
				kind: "storyWord",
				problem: "Often used as a diagnosis — try describing the sensations or emotions instead",
				thought: "You're having the thought that you're stuck in a deep, dark place you can't get out of",
				suggestedFeelings: ["Numb", "Sad", "Hopeless", "Drained", "Disconnected", "Tired"],
				suggestedNeeds: [
					"Meaning",
					"Connection",
					"Purpose",
					"Rest / sleep",
					"Support",
					"Safety (emotional)",
					"Hope",
				],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "anxious",
				kind: "storyWord",
				problem: "Can be vague or clinical — try describing the underlying fear or tension",
				thought: "You're having the thought that something bad might happen and you won't be able to handle it",
				suggestedFeelings: ["Nervous", "Worried", "Fearful", "Tense", "Scared"],
				suggestedNeeds: ["Consistency", "Support", "Safety (emotional)", "Trusting", "Rest / sleep"],
				status: "",
				ui: { tier: "more" },
			},
		],

		"Self-judgments": [
			{
				item: "inadequate",
				kind: "storyWord",
				problem: "A self-judgment — look for feelings like ashamed or discouraged",
				thought: "You're having the thought that you're not good enough or falling short",
				suggestedFeelings: ["Ashamed", "Discouraged", "Insecure", "Guilty"],
				suggestedNeeds: [
					"Competence",
					"Growth",
					"Support",
					"Acknowledgement",
					"Mattering to myself",
					"Understanding",
				],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "unworthy",
				kind: "storyWord",
				problem: "A belief about your value, not a feeling",
				thought: "You're having the thought that you don't deserve love, care, or respect",
				suggestedFeelings: ["Heartbroken", "Ashamed", "Disconnected", "Numb"],
				suggestedNeeds: ["Self-acceptance", "Love", "Belonging", "To matter", "Contribution", "Communion"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "unlovable",
				kind: "storyWord",
				problem: "Judgment of self-worth, often masking grief or shame",
				thought: "You're having the thought that there's something about you that makes you impossible to love",
				suggestedFeelings: ["Ashamed", "Heartbroken", "Lonely", "Hopeless"],
				suggestedNeeds: ["Love", "Acceptance", "Connection", "Healing", "Mattering to myself", "Empathy"],
				status: "",
				ui: { tier: "more" },
			},
			{
				item: "incompetent",
				kind: "storyWord",
				problem: "Self-evaluation instead of naming fear, shame, or discouragement",
				thought: "You're having the thought that you're incapable or bound to mess things up",
				suggestedFeelings: ["Ashamed", "Embarrassed", "Frustrated", "Powerless"],
				suggestedNeeds: ["Competence", "Growth", "Support", "Kindness", "Acknowledgement"],
				status: "",
				ui: { tier: "more" },
			},
		],
	},

	"Feelings when needs are met": {
		Hopeful: [
			{ item: "Hopeful", problem: "Looking to the future with optimism", status: "", ui: { tier: "simple" } },
			{
				item: "Confident",
				problem: "Trusting in one's abilities or qualities",
				status: "",
				ui: { tier: "simple" },
			},
			{ item: "Grateful", problem: "Appreciative of benefits received", status: "", ui: { tier: "simple" } },
			{
				item: "Inspired",
				problem: "Mentally stimulated to do or feel something",
				status: "",
				ui: { tier: "more" },
			},
			{ item: "Optimistic", problem: "Expecting the best possible outcome", status: "", ui: { tier: "more" } },
			{
				item: "Trusting",
				problem: "Willing to rely on others or situations",
				status: "",
				ui: { tier: "simple" },
			},
		],

		Joyful: [
			{ item: "Joyful", problem: "Feeling great happiness", status: "", ui: { tier: "simple" } },
			{ item: "Excited", problem: "Eager and enthusiastic", status: "", ui: { tier: "simple" } },
			{ item: "Playful", problem: "Light-hearted and fun-loving", status: "", ui: { tier: "simple" } },
			{ item: "Happy", problem: "Generally content and pleased", status: "", ui: { tier: "simple" } },
			{ item: "Content", problem: "Satisfied and at peace", status: "", ui: { tier: "simple" } },
			{ item: "Cheerful", problem: "Noticeably happy and optimistic", status: "", ui: { tier: "more" } },
			{ item: "Delighted", problem: "Highly pleased", status: "", ui: { tier: "more" } },
			{ item: "Elated", problem: "Ecstatically happy", status: "", ui: { tier: "more" } },
		],

		Peaceful: [
			{ item: "Peaceful", problem: "Free from disturbance or conflict", status: "", ui: { tier: "simple" } },
			{ item: "Calm", problem: "Free from agitation or excitement", status: "", ui: { tier: "simple" } },
			{ item: "Serene", problem: "Peaceful and untroubled", status: "", ui: { tier: "more" } },
			{ item: "Relaxed", problem: "Free from tension or anxiety", status: "", ui: { tier: "simple" } },
			{ item: "At ease", problem: "Comfortable and untroubled", status: "", ui: { tier: "simple" } },
			{ item: "Centered", problem: "Balanced and grounded", status: "", ui: { tier: "more" } },
			{ item: "Relieved", problem: "Freed from distress or discomfort", status: "", ui: { tier: "simple" } },
		],

		Proud: [
			{
				item: "Proud",
				problem: "Feeling deep satisfaction with achievements",
				status: "",
				ui: { tier: "simple" },
			},
			{ item: "Empowered", problem: "Feeling capable and in control", status: "", ui: { tier: "simple" } },
			{ item: "Respected", problem: "Regarded with honor and esteem", status: "", ui: { tier: "more" } },
			{ item: "Valued", problem: "Recognized as important or worthwhile", status: "", ui: { tier: "simple" } },
			{ item: "Acknowledged", problem: "Noticed or affirmed", status: "", ui: { tier: "simple" } },
			{ item: "Appreciated", problem: "Seen and valued for contribution", status: "", ui: { tier: "simple" } },
			{ item: "Honoured", problem: "Treated with high respect", status: "", ui: { tier: "more" } },
		],

		Engaged: [
			{ item: "Engaged", problem: "Involved and absorbed in the moment", status: "", ui: { tier: "simple" } },
			{ item: "Interested", problem: "Mentally engaged and curious", status: "", ui: { tier: "simple" } },
			{ item: "Curious", problem: "Eager to know or learn", status: "", ui: { tier: "simple" } },
			{ item: "Absorbed", problem: "Deeply engaged or immersed", status: "", ui: { tier: "simple" } },
			{ item: "Stimulated", problem: "Mentally or emotionally aroused", status: "", ui: { tier: "more" } },
			{ item: "Intrigued", problem: "Fascinated and wanting to know more", status: "", ui: { tier: "more" } },
		],

		Loving: [
			{ item: "Loving", problem: "Full of love and affection", status: "", ui: { tier: "more" } },
			{ item: "Caring", problem: "Showing concern or kindness", status: "", ui: { tier: "simple" } },
			{ item: "Affectionate", problem: "Demonstrating fondness", status: "", ui: { tier: "simple" } },
			{
				item: "Compassionate",
				problem: "Feeling and showing sympathy and concern",
				status: "",
				ui: { tier: "simple" },
			},
			{ item: "Tender", problem: "Gentle and kind", status: "", ui: { tier: "simple" } },
			{ item: "Warm", problem: "Expressing affection and kindness", status: "", ui: { tier: "more" } },
			{
				item: "Connected",
				problem: "Feeling close to others or something meaningful",
				status: "",
				ui: { tier: "simple" },
			},
		],
	},
};

export default feelingsData;
