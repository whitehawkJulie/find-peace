// Content for the Grief step (was the "Despair" section inside ConversationsAndCollaboration).
import React from "react";
import HelpLink from "../components/HelpLink";

export const griefContent = {
	navTitle: { default: "Grief" },

	title: {
		default: "Grief and Mourning",
		tone: { sweary: "When it just feels shit" },
	},

	subtitle: {
		// not being used right now
		default: "For when you realise this need hasn't really been met, and there's grief around that",
	},

	purpose: {
		default:
			"Here we're making space for that grief, so that it can be felt and begin to settle before coming back to what's possible now.",
	},

	stuck: {
		default:
			"It's very common in this process that people become aware of one or more needs that have not been met in a long time, if ever, and there's grief around that. If that's the case, this page is for you (otherwise, skip it).",
	},

	firstQuestion: { default: "The first question to ask yourself is:" },

	firstQuestionBody: {
		default: (
			<>
				<strong>Am I stuck on one particular strategy?</strong>
				<br />
				Am I believing there is only <em>one</em> way for this need to be met?
				<br />
				Do I need to loosen my grip on my preferred strategy and become willing to explore other possibilities?
			</>
		),
	},

	onceYouStop: {
		default:
			"Sometimes that is enough. Once you stop treating one strategy as the only path, other options begin to appear.",
	},

	deeper: {
		default:
			"Very occasionally, though, something deeper surfaces: this need feels unmet not just here, but more broadly — and you genuinely have no idea how to change that. When that happens, there are usually two helpful approaches.",
	},

	percolateHeading: { default: "1. Let it percolate" },

	percolate1: {
		default:
			"Are you willing to sit with the unmet need for a few days and give it time? Let yourself wonder what this need really means to you, and what would actually help you feel it had been met. Put it on the back burner for a while and let it unfold.",
	},

	percolate2: {
		default: (
			<>
				You might like to read more about{" "}
				<HelpLink topic="mourning">connecting with, and mourning, unmet needs</HelpLink>.
			</>
		),
	},

	giveHeading: { default: "2. Try giving it" },

	give1: {
		default:
			"This can feel counter-intuitive, but sometimes, when you feel desperate and lost, stopping trying to get the need met for yourself and instead looking for a way to offer it to someone else can be surprisingly powerful.",
	},

	give2: {
		default: (
			<>
				For example, if the need is <strong>love</strong>, you might look for someone even more starved of love
				and find a way to offer them some. Strangely, this can teach you a lot about the need itself — what it
				really is, what it looks like in practice, and sometimes even what might help meet it in your own life.
			</>
		),
	},

	stillStuck: {
		default: "And finally, if you're still completely stuck, it can help to remember this:",
	},

	cantSeeStrong: {
		default: "Even if you can't see how this need could be met right now, you do not know what the future holds.",
	},

	honour: {
		default:
			"You can still honour the need. Hold it gently, value it, and let it matter — even before you know what to do about it.",
	},
};
