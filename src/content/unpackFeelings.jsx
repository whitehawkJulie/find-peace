// Content for the UnpackFeelings step (formerly FeelingsExploreCard).
// Wire up useContent() in UnpackFeelings.jsx — already done.
import HelpLink from "../components/HelpLink";

export const unpackFeelingsContent = {
	navTitle: "Explore Feelings",

	title: {
		default: "Explore Feelings",
	},
	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default:
			"Here we’re staying with what you’re feeling, so that it can soften and show you more about what matters to you.",
	},

	beWith: {
		default: (
			<p>
				There’s nothing to solve here — just notice what happens when you choose one of these feelings and just{" "}
				<HelpLink topic="stay-with-it">stay with it for a moment</HelpLink>, without digging or forcing. Is
				there something it wants to tell you? Can you pause long enough to hear the answer from your body,
				rather than your mind?
			</p>
		),
	},

	intro: {
		default:
			'We often feel something vulnerable first, quickly followed by more defended feelings. Can you distinguish the early feelings, from the "thought-feelings" that came in response to those?',
		tone: {
			sweary: 'We often feel something raw and vulnerable first — then quickly slap something more defended on top. Can you pick apart the original feeling from the "thought-feelings" that came rushing in after?',
		},
	},

	categoriesIntro: {
		default:
			"You've chosen feelings in these categories. Would you like to have a deeper look? Start with the one that's loudest.",
		tone: {
			sweary: "You've got feelings in these categories. Want to dig in? Start with whichever one is shouting loudest.",
		},
	},
};
