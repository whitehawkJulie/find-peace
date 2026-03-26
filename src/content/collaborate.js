// Content for the "Collaborate" accordion section — conversation planner steps.

export const collaborateContent = {
	title: { default: "Collaborate" },

	subtitle: {
		default: "For when you want to work through this together and find a way forward that works for both of you",
	},

	purpose: {
		default:
			"Here we're bringing it all together, so that you can have a conversation that builds understanding and supports a workable way forward.",
	},

	intro1: {
		default:
			"If you'd like to talk this through with the other person, this can help you plan the conversation.",
	},

	intro2: { default: "There's no perfect way to do this — just something honest and human." },

	introNote: { default: "Use these as prompts, not a script. Let it sound like you." },

	saveHint: { default: "You can save or copy all this on the next page." },

	// ── Conversation steps ───────────────────────────────────────────────────

	steps: {
		step1: {
			title: { default: "Start with permission" },
			desc: { default: "Gently check if they're open." },
			hint: { default: "This helps both of you feel safer before you begin." },
			scriptDefault: { default: "Hey, is now a good time to talk about something?" },
		},
		step2: {
			title: { default: "Understand them first" },
			desc: { default: "Let them know you want to understand their side." },
			hint: { default: "When people feel understood, things often soften." },
			scriptDefault: { default: "I'd really like to understand what was going on for you earlier." },
			extraHelp: {
				intro: {
					default:
						"This might take a bit of listening. You don't have to agree with them — just focus on understanding what it was like for them.",
				},
				ifNotSure: { default: "If you're not sure, you can gently guess:" },
				guess1: { default: '"Were you feeling…?"' },
				guess2: { default: '"Was it because you were needing…?"' },
				ifWrong: {
					default:
						"If your guess is off, that's okay — they'll usually correct you, and that helps you get closer.",
				},
			},
		},
		step3: {
			title: { default: "Check they're open to hearing you" },
			desc: { default: "Before sharing, make sure they're willing to listen." },
			hint: { default: "If they're not ready yet, that's okay — you can come back to this later." },
			scriptDefault: { default: "Would you be open to hearing what was going on for me?" },
			extraHelp: {
				intro: { default: "If they say no, or seem defensive, it usually means they're not ready yet." },
				youMight: { default: "You might:" },
				option1: { default: "Come back to listening to them a bit more" },
				option2: { default: "Take a break and return later" },
				note: { default: "This isn't failure — it's pacing." },
			},
		},
		step4: {
			title: { default: "Share your experience" },
			desc: { default: "Keep it simple and grounded in your experience." },
			hint: { default: "You don't have to get this exactly right." },
			scriptDefault: {
				default: "When [what happened], I felt [feeling], because I was needing [need].",
			},
			extraHelp: {
				tryTo: { default: "Try to stay with:" },
				item1: { default: "What actually happened (not interpretations)" },
				item2: { default: "How you felt" },
				item3: { default: "What you were needing" },
				blame: {
					default:
						'If you notice blame or "you always / you never" creeping in, gently come back to talking about your own internal experience, rather than your thoughts about them.',
				},
			},
		},
		step5: {
			title: { default: "Check they got it" },
			desc: { default: "Invite them to reflect back what they heard." },
			hint: { default: "This isn't a test — it just helps you both feel clearer." },
			scriptDefault: { default: "Could you tell me what you think I'm trying to say?" },
			extraHelp: {
				ifMissed: {
					default: "If they didn't quite get it, that's okay — you can try again more simply.",
				},
				youMightSay: { default: "You might say:" },
				example: { default: '"Not quite — what I meant was…"' },
				helps: { default: "This step helps reduce misunderstandings before moving forward." },
			},
		},
		step6: {
			title: { default: "Find a way forward" },
			desc: { default: "Work together on what might help." },
			hint: { default: "It doesn't have to be perfect — just a step that feels okay for both of you." },
			scriptDefault: { default: "What could we do next time that would work better for both of us?" },
			extraHelp: {
				lookingFor: {
					default:
						'You\'re looking for something that works for both of you — not just one person "winning".',
				},
				keepIt: { default: "It can help to keep it:" },
				item1: { default: "Specific" },
				item2: { default: "Doable" },
				item3: { default: "Open to adjustment" },
			},
		},
	},

	// ── Final "say it in your own words" section ─────────────────────────────

	finalScript: {
		title: { default: "Say it in your own words" },
		desc: { default: "Here's your whole script — edit it to make it sound more like you." },
		hint: { default: "For heaven's sake, don't use these exact words! Too formal. Let it sound natural." },
		placeholder: { default: "Your conversation script will appear here…" },
		regenerateButton: { default: "↺ Regenerate from fields above" },
	},

	// ── Extra help toggle labels ──────────────────────────────────────────────

	stepHelpToggle: {
		show: { default: "Need a bit more help with this step?" },
		hide: { default: "▲ Hide extra help" },
	},

	// ── Script section headings (used in buildFinalScript) ───────────────────

	scriptHeadings: {
		checkWillingness: { default: "=== CHECK WILLINGNESS FOR CONVERSATION ===" },
		expressGuesses: { default: "=== EXPRESS GUESSES FOR THEM ===" },
		checkUnderstood: { default: "=== Need to check you've understood them? ===" },
		checkUnderstoodPrompt: { default: "Have I heard you correctly? Is this what you're saying?" },
		checkWillingnessHear: { default: "=== CHECK FOR WILLINGNESS TO HEAR YOU ===" },
		expressOwn: { default: "=== EXPRESS OWN FEELINGS AND NEEDS ===" },
		checkTheyUnderstood: { default: "=== Need to check they've understood you? ===" },
		mutualSolution: { default: "=== FIND A MUTUAL SOLUTION ===" },
	},
};
