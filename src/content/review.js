// Body copy for the Review step.
// Wire up useContent() in Review.jsx to use these.

export const reviewContent = {
	navTitle: "Review",

	title: {
		default: "Review",
	},

	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default: "",
	},

	intro: {
		default:
			"This page gathers together what you explored. You might like to read it through and notice what stands out. What feels most important or surprising?",
		tone: {
			sweary: "Here's everything you've been through. Take a moment to look it over. What actually stands out?",
		},
	},

	// ── Accordion ─────────────────────────────────────────────────────────────

	accordionTitle: {
		default: "What emerged?",
	},

	noData: {
		default: "No data entered yet.",
	},

	// ── Review section headings ───────────────────────────────────────────────

	sections: {
		lettingItOut: { default: "Letting it all out" },
		observation: { default: "Observation" },
		feelings: { default: "Feelings" },
		feelingExploration: { default: "Feeling exploration" },
		bodySensations: { default: "Body sensations" },
		unmetNeeds: { default: "Unmet needs" },
		metNeeds: { default: "Met needs" },
		needExplorations: { default: "Need explorations" },
		strategies: { default: "Strategies" },
		otherPerspective: { default: "Your guesses for the other person" },
		whatsChanged: { default: "Exploring what's changed" },
		requests: { default: "What you might like to do next" },
		conversationGuide: { default: "Conversation guide" },
	},

	// ── Inline labels ─────────────────────────────────────────────────────────

	labels: {
		theyMightHaveObserved: { default: "They might have observed:" },
		theyMightBeFeeling: { default: "They might be feeling:" },
		theirNeedsMight: { default: "Their needs might include:" },
		beforeProcess: { default: "Before this process:" },
		whatsDifferentNow: { default: "What's different now:" },
		request: { default: "Request:" },
		ofMyself: { default: "Of myself:" },
		ofThem: { default: "Of them:" },
		aboutThisNeed: { default: "About this need:" },
		whichFlavour: { default: "Which flavour:" },
		whereToFind: { default: "Where to find it:" },
		whenNotMet: { default: "When it's not met:" },
		whenMet: { default: "When it is met:" },
		whatHelped: { default: "What helped:" },
		oftenUnmet: { default: "Often unmet / topping up:" },
		whereToGetMet: { default: "Where to get it met:" },
	},

	// ── Reflection ────────────────────────────────────────────────────────────

	reflectionPrompt: {
		default: "What feels most important or surprising here?",
		tone: { sweary: "What actually hit you? What feels most real?" },
	},

	// ── Action buttons ────────────────────────────────────────────────────────

	copyButton: { default: "Copy to Clipboard" },
	copiedButton: { default: "Copied!" },
	saveButton: { default: "Save to Journal" },
	savedButton: { default: "Saved to Journal" },
	copyConvoButton: { default: "Copy conversation guide" },

	// ── Session end ───────────────────────────────────────────────────────────

	whenReady: { default: "When you're ready:" },
	closeButton: { default: "Close" },
	restartButton: { default: "↺ Start a new session" },
	confirmRestartPrompt: { default: "Clear all your answers and start fresh?" },
	confirmYes: { default: "Yes, start over" },
	confirmCancel: { default: "Cancel" },
	closeHint: {
		default: "If Close doesn't work in your browser, you can simply close this tab or window.",
	},

	// ── Privacy / notices ─────────────────────────────────────────────────────

	privacyNote: {
		default:
			"🔒 Your data stays on this device and is never sent to any server. Saving or copying shares your feelings and needs word selections anonymously to help improve this tool. Manage your data in ☰ Menu → ⚙ Settings.",
	},

	savedNotice: {
		default: "✓ Saved to your browser. To reload it later, tap ☰ Menu → ⚙ Settings.",
	},

	// ── Summary text headings (used in generateSummaryText) ──────────────────

	summaryHeadings: {
		whatWasHappening: { default: "What was happening for you?" },
		feelings: { default: "Feelings" },
		needs: { default: "Needs" },
		otherPerspective: { default: "The Other Person's Perspective" },
		whatsChanged: { default: "Exploring what's changed" },
		requests: { default: "Requests" },
		conversationGuide: { default: "Conversation guide" },
	},

	// ── Summary text labels ───────────────────────────────────────────────────

	summaryLabels: {
		lettingItOut: { default: "Letting it all out:" },
		observation: { default: "Observation:" },
		bodySensations: { default: "Body sensations:" },
		feelings: { default: "Feelings:" },
		feelingExploration: { default: "Feeling exploration:" },
		unmetNeeds: { default: "Unmet needs:" },
		metNeeds: { default: "Met needs:" },
		needExplorations: { default: "Need explorations:" },
		strategies: { default: "Strategies:" },
		theyMightHaveObserved: { default: "They might have observed:" },
		theyMightBeFeeling: { default: "They might be feeling:" },
		theirNeedsMight: { default: "Their needs might include:" },
		before: { default: "Before:" },
		whatsDifferentNow: { default: "What's different now:" },
		request: { default: "Request:" },
		ofMyself: { default: "Of myself:" },
		ofThem: { default: "Of them:" },
		somethingStandsOut: { default: "Something that stands out to me:" },
	},
};
