// ── Page content ──────────────────────────────────────────────────────────────

export const makingGuessesContent = {
	navTitle: "Their View",

	title: {
		default: "What might have been happening for them?",
		tone: { sweary: "Where the hell were they coming from?" },
	},

	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default:
			"Here we’re getting curious about what might be going on for them, so that we can open the door to understanding and connection.",
	},

	intro: {
		default:
			"When you’re ready, we can gently turn toward the other person — not to agree, just to widen the view. As we imagine what they might be feeling or needing, we often begin to see more of what’s happening. Sometimes that brings a little more space inside you, and it can feel less like a verdict about you.",
	},

	reminder: {
		default: "Remember: The point isn't to guess correctly. It's simply to widen the frame.",
		tone: {
			sweary: "They might still be an asshole. We're just exploring, OK?",
		},
	},

	sections: {
		observation: {
			heading: {
				default: "What might they have observed?",
			},
			description: {
				default: "What do you think the other person saw or heard? Just the facts, from their point of view.",
			},
			placeholder: {
				default: "They might have seen/heard...",
			},
		},
		feelings: {
			heading: {
				default: "How might they be feeling?",
			},
			description: {
				default:
					"What emotions might be alive in them? Select any that seem possible, even if they seem to conflict with each other.",
			},
		},
		needs: {
			heading: {
				default: "What might they be needing?",
			},
			description: {
				default: "What needs of theirs might not be met in this situation?",
			},
		},
	},
};
