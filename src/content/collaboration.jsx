// Body copy and help content for the Conversations and Collaboration step.
// Wire up useContent() in ConversationsAndCollaboration.jsx to use these.

import React from "react";
import HelpLink from "../components/HelpLink";

export const collaborationContent = {
	navTitle: "Conversations",

	title: {
		default: "Conversations and Collaboration",
		tone: { sweary: "So... how do we actually fix this?" },
	},

	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default: "",
	},

	intro: {
		default:
			"Many people find that doing this process resolves a lot of their issues, and when it's done, it's done! But sometimes it's more complicated, and you want to figure out how to move forward with the other person.",
		tone: {
			sweary: "A lot of the time, just doing this stuff is enough. But sometimes you actually need to talk to them. Let's figure out how.",
		},
	},

	// ── Accordion section titles ─────────────────────────────────────────────

	sections: {
		despair: {
			title: { default: "First: despair about need ever being met" },
			percolate: {
				default: (
					<>
						You might like to read more about{" "}
						<HelpLink topic="mourning">connecting with, and mourning, unmet needs</HelpLink>.
					</>
				),
			},
		},
		whether: {
			title: { default: "Whether to have the conversation" },
		},
		request: {
			title: { default: "Make a simple request" },
			requestLabel: { default: "Is there a request you'd like to make?" },
			requestPlaceholder: { default: "e.g. Would you be willing to…" },
		},
		collaborate: {
			title: { default: "Collaborate" },
			intro1: {
				default:
					"If you'd like to talk this through with the other person, this can help you plan the conversation.",
			},
			intro2: {
				default: "There's no perfect way to do this — just something honest and human.",
			},
			introNote: {
				default: "Use these as prompts, not a script. Let it sound like you.",
			},
			saveHint: {
				default: "You can save or copy all this on the next page.",
			},
		},
	},

	// ── Conversation steps (inside the Collaborate accordion) ────────────────

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
			scriptDefault: {
				default: "I'd really like to understand what was going on for you earlier.",
			},
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
			hint: {
				default: "If they're not ready yet, that's okay — you can come back to this later.",
			},
			scriptDefault: {
				default: "Would you be open to hearing what was going on for me?",
			},
			extraHelp: {
				intro: {
					default: "If they say no, or seem defensive, it usually means they're not ready yet.",
				},
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
			scriptDefault: {
				default: "Could you tell me what you think I'm trying to say?",
			},
			extraHelp: {
				ifMissed: {
					default: "If they didn't quite get it, that's okay — you can try again more simply.",
				},
				youMightSay: { default: "You might say:" },
				example: { default: '"Not quite — what I meant was…"' },
				helps: {
					default: "This step helps reduce misunderstandings before moving forward.",
				},
			},
		},
		step6: {
			title: { default: "Find a way forward" },
			desc: { default: "Work together on what might help." },
			hint: {
				default: "It doesn't have to be perfect — just a step that feels okay for both of you.",
			},
			scriptDefault: {
				default: "What could we do next time that would work better for both of us?",
			},
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

	// ── Final "say it in your own words" section ──────────────────────────────

	finalScript: {
		title: { default: "Say it in your own words" },
		desc: {
			default: "Here's your whole script — edit it to make it sound more like you.",
		},
		hint: {
			default: "For heaven's sake, don't use these exact words! Too formal. Let it sound natural.",
		},
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
		checkWillingness: {
			default: "=== CHECK WILLINGNESS FOR CONVERSATION ===",
		},
		expressGuesses: {
			default: "=== EXPRESS GUESSES FOR THEM ===",
		},
		checkUnderstood: {
			default: "=== Need to check you've understood them? ===",
		},
		checkUnderstoodPrompt: {
			default: "Have I heard you correctly? Is this what you're saying?",
		},
		checkWillingnessHear: {
			default: "=== CHECK FOR WILLINGNESS TO HEAR YOU ===",
		},
		expressOwn: {
			default: "=== EXPRESS OWN FEELINGS AND NEEDS ===",
		},
		checkTheyUnderstood: {
			default: "=== Need to check they've understood you? ===",
		},
		mutualSolution: {
			default: "=== FIND A MUTUAL SOLUTION ===",
		},
	},

	// ── Help drawer text ──────────────────────────────────────────────────────

	help: {
		feelsHardHeading: { default: "When this feels hard" },
		feelsHard1: { default: "If this feels difficult, that's completely normal." },
		feelsHard2: {
			default:
				"When we're hurt or activated, our brain shifts into protection mode — it can feel urgent to explain, defend, or fix things quickly.",
		},
		feelsHard3: {
			default:
				"This process is about slowing things down just enough to understand what's really going on, so you have a better chance of being heard.",
		},
		whyStartHeading: { default: "Why start with them?" },
		whyStart1: {
			default: "When someone feels understood, their nervous system often settles.",
		},
		whyStart2: {
			default: "That makes it much more likely they'll be able to hear you in return.",
		},
		whyStart3: {
			default:
				'This doesn\'t mean their perspective is "right" — just that understanding comes before resolution.',
		},
		notReadyHeading: { default: "If they're not ready" },
		notReady1: {
			default: "Sometimes the other person isn't in a place where they can have this kind of conversation.",
		},
		notReady2: { default: "That might look like:" },
		notReadyItem1: { default: "Interrupting or arguing" },
		notReadyItem2: { default: "Shutting down" },
		notReadyItem3: { default: "Dismissing what you're saying" },
		notReady3: {
			default:
				"If that happens, it's often more effective to pause and come back later, rather than pushing through.",
		},
		dontHaveToHeading: { default: "You don't have to get this right" },
		dontHaveTo1: { default: "There's no perfect way to do this." },
		dontHaveTo2: {
			default: "What matters most is sincerity — being real about your experience, and open to theirs.",
		},
		dontHaveTo3: {
			default: "Even a messy, human version of this can shift things.",
		},
		practiceHeading: { default: "This is a practice" },
		practice1: { default: "This kind of conversation takes practice." },
		practice2: {
			default: "It's normal to forget steps, get tangled, or slip back into old patterns.",
		},
		practice3: {
			default: "Each time you try, you're building a new way of relating.",
		},
	},
};
