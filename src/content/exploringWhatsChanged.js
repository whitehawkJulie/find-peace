// Content for the ExploringWhatsChanged step.
// Wire up useContent() in ExploringWhatsChanged.jsx — already done.

export const exploringWhatsChangedContent = {
	navTitle: "Notice what's changed",

	title: {
		default: "Notice what's changed",
		tone: {
			sweary: "So... what's different now?",
		},
	},
	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default: "",
	},

	intro1: {
		default: "Let's take a moment to see what's changed inside you.",
		tone: {
			sweary: "Let's see what's actually shifted in you.",
		},
	},

	intro2: {
		default:
			"This page isn't about finding solutions we plan to use, yet — it's just about noticing the shift, if any.",
		tone: {
			sweary: "We're not planning anything yet — just checking in on what's moved.",
		},
	},

	beforePrompt: {
		default:
			"How might you have handled this situation before doing this process? If you approached the person from the place you were in at the beginning… what would likely happen?",
		tone: {
			sweary: "If you'd gone in before doing any of this — from that first reaction — how would it have gone? Be honest.",
		},
	},

	differentlyPrompt: {
		default:
			"What might you want to do differently now? If you approached from where you are now… what might be different? What's changed?",
		tone: {
			sweary: "And now? From where you're sitting right now — what would you do differently? What's actually changed?",
		},
	},
};
