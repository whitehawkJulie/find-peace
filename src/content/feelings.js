// Body copy and help content for the Feelings step.
// Wire up useContent() in Feelings.jsx to use these.

export const feelingsContent = {
	navTitle: "What am I feeling?",

	title: {
		default: "What am I feeling?",
		tone: { sweary: "Fuck them, what's going on in ME?" },
	},
	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default:
			"Here we’re tuning into what you’re feeling, so that we can reconnect with what your body is trying to tell you about what matters. (Our bodies contain wisdom that we've been taught to ignore.)",
	},

	intro1: {
		default:
			"Feelings exist to tell us what we want and need. Sadly, we've been taught to ignore them, and then we lose all the information that they're trying to give us about how to feel better. We have to feel, before we feel better. Naming them specifically is crucial.",
		tone: {
			sweary: "Feelings exist to tell us what WE actually want and need. You actually have to feel it (sorry) before you can move through it. Naming them specifically is where the magic happens.",
		},
	},

	returnToMoment: {
		default: "Now take a moment and return to that situation:",
	},

	bodyPrompt: {
		default: "When you remember that moment, what happens inside you?",
		tone: {
			sweary: "When you remember that moment, what actually happens in your body?",
		},
	},

	bodySensationPrompt: {
		default: "You might notice where it shows up in your body. Where do you feel it?",
	},

	bodySensationButton: {
		default: "Want some help? →",
	},

	feelingsPrompt: {
		default:
			"And as you stay with that moment, what feelings begin to emerge? Was there a particular feeling there before the threat circuit fully kicked in?",
		tone: {
			sweary: "And as you sit with that — what feelings are actually alive in you right now? What was there before the threat response took over?",
		},
	},

	// Story Words drawer
	storyWords: {
		drawerTitle: {
			default: "About Story Words",
		},
		intro: {
			default:
				'Some words sound like feelings but actually point to what happened or what someone else did. These are what we call Story Words. (Traditional NVC calls them "Faux Feelings.")',
		},
		examples: {
			default:
				"For example, words like ignored, rejected, or attacked carry an interpretation about another person's behaviour.",
		},
		normal: {
			default:
				"There's nothing wrong with using these words — it's how most of us were taught to speak. Story Words often show up more strongly when we're activated or hurt, because our system is trying to make sense of what happened.",
		},
		whatHappensHeading: {
			default: "What Happens If You Select One?",
		},
		popupIntro: {
			default:
				"If you choose a Story Word, you'll be gently guided to look underneath it. We'll help you translate from the story about what happened to the clearer feelings living in your body.",
		},
		notAboutCorrect: {
			default:
				"This isn't about being more \"correct.\" It's about getting closer to your own experience — the sensations, emotions, and needs that are present when the story falls away.",
		},
		result: {
			default:
				"When the story softens, what remains is usually something more vulnerable, more precise, and more useful for understanding what you need.",
		},
	},

	// Help drawer text (structure mirrors the JSX in Feelings.helpContent)
	help: {
		intro: {
			default:
				"Feelings live in your body - they are part of your body's signal system. They let you know whether something important is happening — often connected to your needs being met or unmet.",
		},
		sarahPeyton: {
			default:
				"Sarah Peyton says that our body's job is to signal what's happening inside us. When we ignore those signals, the body can't fully relax — it's still trying to deliver the message. But when we notice and acknowledge what it's telling us, it's as if the body says, \"Message delivered!\", and it can finally relax.",
		},
		naming: {
			default:
				"When you can name what you're actually feeling, intensity often shifts. Clarity opens the doorway to understanding what you need.",
		},
		scanHint: {
			default:
				"It's really useful to look through the entire feelings list, checking for every feeling inside yourself, rather than just scanning the list looking for words for feelings you already know. The surprising ones hold a LOT of power to shift your experience.",
		},
		contradictory: {
			default:
				"It's completely normal to feel lots of different things at once, some of them contradictory! Select any feelings in the list that jump out at you.",
		},
		storyWordsHeading: {
			default: "Story Words",
		},
		storyWordsIntro: {
			default:
				'Many of the words we use as "feelings" actually contain a story about what someone else did. We call these Story Words. This isn\'t wrong — it\'s just how we\'re taught to speak. (Traditional NVC called these "Faux Feelings.")',
		},
		storyWordsExampleIntro: {
			default: "For example:",
		},
		storyWordsExample1: {
			default: '"I feel ignored" — carries a story that someone ignored you.',
		},
		storyWordsExample2: {
			default: '"I feel rejected" — carries a story that someone rejected you.',
		},
		storyWordsExample3: {
			default: '"I feel attacked" — carries a story that someone attacked you.',
		},
		storyWordsUnderneath: {
			default:
				"Underneath these words are usually clearer body-feelings — lonely, hurt, scared, angry, sad, unsettled.",
		},
		storyWordsWhy: {
			default:
				"When we speak in story words, we often stay focused on what the other person did. When we name the underlying feeling, we move closer to ourselves. Clear feelings point more directly to clear needs.",
		},
		storyWordsSelect: {
			default:
				"If you select a Story Word, you'll be gently guided to unpack it. There's no pressure to get it perfect.",
		},
	},
};
