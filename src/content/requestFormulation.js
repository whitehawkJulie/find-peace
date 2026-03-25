// Body copy and help content for the Request Formulation step.
// Wire up useContent() in RequestFormulation.jsx to use these.

export const requestFormulationContent = {
	navTitle: "Making Requests",

	title: {
		default: "Making Requests",
	},
	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default: "",
	},

	wipNote: {
		default:
			"This tool is a work in progress. There will be more to come about relational repair: how to use what you've just unpacked to have a connection-building conversation with the other person, and find solutions. For now, just take a moment to write down any requests that come up for you as you reflect on the other steps.",
	},

	intro: {
		default:
			"Now that you've connected with your feelings and needs, and considered the other person's perspective, you're in a much better place to think about what you'd actually like to happen next.",
		tone: {
			sweary: "Now that you've actually felt your feelings and figured out what you need — and taken a look at their side too — you're in a way better place to figure out what you actually want to do next.",
		},
	},

	selfRequestHeading: {
		default: "A request of yourself",
	},

	selfRequestPrompt: {
		default:
			"Based on what you've discovered, is there something you'd like to commit to? Something you could do differently, or something kind you could do for yourself?",
		tone: {
			sweary: "Is there something you want to do for yourself here? Something you could actually commit to?",
		},
	},

	selfRequestPlaceholder: {
		default: "Might I be willing to...",
	},

	otherRequestHeading: {
		default: "A request of the other person",
	},

	otherRequestPrompt: {
		default:
			"Is there something specific you'd like to ask of them? Remember, a true request allows them to say no — and is easy to do when you're really clear that there are MANY ways to meet your needs, and what you're requesting is just ONE of them. Try starting with \"Would you be willing to...\"",
		tone: {
			sweary: "Is there something you want to ask them? Keep it real — a genuine request means they can actually say no. There are plenty of ways to get your needs met; this is just one option.",
		},
	},

	otherRequestPlaceholder: {
		default: "Would you be willing to...",
	},

	// Help drawer text (structure mirrors the JSX in RequestFormulation.helpContent)
	help: {
		requestsVsDemandsHeading: {
			default: "Requests vs. demands",
		},
		requestsVsDemands: {
			default:
				'The key test: if the other person says "no," how do you feel? If you\'d be angry or punish them, it was a demand. If you can genuinely accept "no" and look for another strategy — that\'s a request.',
		},
		threeTypesHeading: {
			default: "Three types of request",
		},
		connectionRequest: {
			default:
				'Connection request — asking the other person to reflect back what they heard, or how they feel hearing this. E.g. "Would you be willing to tell me what you heard me say?" This is often the most important first step.',
		},
		actionRequest: {
			default:
				'Action request — asking for a specific, doable action. E.g. "Would you be willing to text me if you\'re going to be more than 15 minutes late?"',
		},
		selfRequest: {
			default:
				'Self-request — a commitment to yourself. E.g. "I\'d like to pause and breathe before responding next time I feel triggered."',
		},
		goodRequestHeading: {
			default: "A good request is:",
		},
		goodSpecific: {
			default: 'Specific — not "be nicer" but "would you greet me when I come home?"',
		},
		goodDoable: {
			default: "Doable — something the person can actually say yes or no to",
		},
		goodPositive: {
			default: "Positive — what you DO want, not what you don't want",
		},
		goodPresentTense: {
			default: "Present-tense — about now or the near future, not forever",
		},
		pitfallsHeading: {
			default: "Common pitfalls",
		},
		pitfall1: {
			default:
				'"I want you to understand me" — too vague. Try: "Would you be willing to tell me what you\'re hearing?"',
		},
		pitfall2: {
			default:
				'"Stop being so critical" — negative and vague. Try: "When you notice something I could do differently, would you be willing to start with what I did well?"',
		},
		pitfall3: {
			default:
				'"You need to change" — that\'s a demand about who they are. Focus on a specific, observable action.',
		},
	},
};
