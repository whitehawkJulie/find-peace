// Body copy and help content for the Needs step.
// Wire up useContent() in Needs.jsx to use these.

export const needsContent = {
	navTitle: "What matters to me?",

	title: {
		default: "What matters most to me?",
		tone: { sweary: "What actually matters here?" },
	},
	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default: "",
	},

	intro1: {
		default:
			"If we don't know what we're actually needing, everything we do misses the mark. This is the missing information in our lives.",
		tone: {
			sweary: "If we don't know what we're actually needing, everything we do misses the mark. Every. Single. Time.",
		},
	},

	intro2: {
		default:
			"Needs are what we're hoping to experience when things go well — and what we're longing for when they don't. They're the core of what matters to us, and our feelings directly point to what they are.",
		tone: {
			sweary: "Needs are what we're hoping to experience when things go well — and what we're gutted about when they don't. They're the real stuff underneath all the noise.",
		},
	},

	selectPrompt: {
		default:
			"Just notice what feels alive. Select all that feel relevant. Tap ? on any selected need to explore it more deeply.",
		tone: {
			sweary: "Just notice what feels alive. Grab everything that resonates. Hit ? on any of them to dig deeper.",
		},
	},

	// Help drawer text (structure mirrors the JSX in Needs.helpContent)
	help: {
		whatIsHeading: {
			default: "What Is a Need?",
		},
		whatIs1: {
			default:
				"Needs are qualities that all human beings long for — things that help us thrive, like safety, respect, understanding, choice, or connection.",
		},
		whatIs2: {
			default:
				"A need isn't a demand and it isn't a specific outcome. It's simply a word for what matters most to us.",
		},
		universal: {
			default: "Needs are universal. Strategies are personal.",
		},
		needLabel: {
			default: "Need:",
		},
		needExample: {
			default: "Respect",
		},
		strategyLabel: {
			default: "Strategy:",
		},
		strategyExample: {
			default: '"I want this particular person to act in this particular way."',
		},
		loosening: {
			default: "When we focus on the need instead of one strategy, many more possibilities open up.",
		},
		whyHeading: {
			default: "Why Naming Needs Helps",
		},
		why1: {
			default:
				"Feelings are signals that something important is happening. When we identify the need underneath, the intensity often softens — even before anything changes externally.",
		},
		why2: {
			default:
				"If the need isn't clear, we often reach for strategies that promise relief — arguing, withdrawing, blaming, or trying to control the situation.",
		},
		tragic: {
			default:
				"Marshall Rosenberg called these \"tragic strategies for unmet needs.\" They're tragic not because we're wrong, but because the strategy aims for relief while missing the real source of the pain.",
		},
		holdHeading: {
			default: "Hold Tightly to the Need, Loosely to the Strategy",
		},
		hold1: {
			default:
				"The need is what matters. Any specific strategy — a particular person acting in a particular way — is just one possible way to meet it.",
		},
		hold2: {
			default: "When we loosen our grip on one strategy, we open the door to many other ways forward.",
		},
	},
};
