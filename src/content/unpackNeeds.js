// Content for the UnpackNeeds step (formerly NeedUnpacking).
// Wire up useContent() in UnpackNeeds.jsx — already done.

export const unpackNeedsContent = {
	navTitle: "Explore what matters",

	title: {
		default: "Explore what matters",
	},
	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default: "",
	},

	// ── Step 0 — Need picker ──────────────────────────────────────────────────

	intro: {
		default:
			"Knowing your needs at a head level is one thing ... what makes the absolute difference is actually connecting to them, truly getting to know how they live in you. This page helps you do just that.",
		tone: {
			sweary: "Knowing your needs at a head level is one thing. What actually shifts things is getting properly connected to them — feeling them in your body, understanding how they move in you. That's what this page is for.",
		},
	},

	meditationTitle: "The beauty of a need",
	meditationDescription: "A short guided meditation to connect with what matters most.",

	clickPrompt: {
		default: "Click on a need to explore more deeply, starting with the one that's loudest for you.",
		tone: {
			sweary: "Click a need to dig in. Start with whichever one is screaming loudest.",
		},
	},

	exploredLabel: "Already explored:",

	// ── Popup — Stage 1 (deeper need) ────────────────────────────────────────

	stage1Intro: {
		default:
			"First, let's make sure we're with what matters most. Sometimes the first need we find is just the surface — something deeper may be calling.",
		tone: {
			sweary: "First, let's make sure we've got the right one. Sometimes the first need we land on is just the top layer — there might be something deeper underneath.",
		},
	},

	stage1Toggle: {
		default: "Might there be a deeper need underneath this?",
	},

	stage1GuessesLabel: {
		default: "Are any of these up for you as well?",
	},

	// ── Popup — Stage 2 (connect with the need) ──────────────────────────────

	stage2Intro: {
		default:
			"Next, we'll explore how this need shows up and how it wants to be met. This is where the real shift happens — the more you connect with the lived experience of the need, the more power you have to meet it in ways that truly satisfy you.",
		tone: {
			sweary: "Now let's get into how this need actually lives in you and what it's asking for. This is where things shift — the more real you can make it, the more you can actually do something about it.",
		},
	},

	stage2Toggle: {
		default: "Get to know the need",
	},

	// ── Popup — Stage 2 prompts ───────────────────────────────────────────────

	unmetPrompt: {
		default:
			"Notice in your body how it feels when the need isn't met — what happens when you focus on the un-met-ness of the need?",
	},

	metPrompt: {
		default:
			"Now remember when the need was most met for you — even if that was just a little — and how that felt.",
	},

	metCircumstancesPrompt: {
		default:
			"If you were able to remember or imagine the need being met, what was present that helped it be met? What would it have to look like for this need to feel fulfilled for you?",
	},

	oftenUnmetPrompt: {
		default:
			"Is this a need that often goes unmet in your life? Are there small ways you could move towards it, top up the tank, even a little?",
	},

	whereToMeetPrompt: {
		default:
			"Back to the issue at hand: could this need be met in the current situation? Is the other person capable of meeting it — or is there a better place to get it met?",
	},
};
