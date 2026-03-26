// Content for the ExploringWhatsChanged step.

export const exploringWhatsChangedContent = {
	navTitle: "Notice what's changed",

	title: {
		default: "Notice what's changed",
		tone: {
			sweary: "So... what's different now?",
		},
	},
	purpose: {
		default: (
			<>
				<p>Let’s take a moment to notice what’s changed inside you.</p>

				<p>
					This isn’t about finding solutions yet — it’s simply a chance to notice any shift, if there is one.
				</p>

				<p>Here we’re noticing what’s different, so that you can recognise the shift before moving on.</p>
			</>
		),
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
