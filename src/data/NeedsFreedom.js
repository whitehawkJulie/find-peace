export const NeedsFreedom = {
	ui: {
		heading: "Freedom Needs",
		helpText:
			"Freedom needs are about having space to be yourself, make choices, and live according to your values. When these needs are unmet, we may feel constrained, restricted, or controlled.",
	},
	metaType: "intrapersonal",
	groups: {
		Autonomy: {
			ui: { heading: "Autonomy & Agency", order: 1 },
			metaType: "intrapersonal",
			items: [
				{
					// ADDED Freedom as a selectable need — previously only a category header.
					// WHY PROMOTED TO SELECTABLE NEED:
					// - Users often mean something experientially real when they say “freedom”
					//   that isn’t fully captured by Choice, Autonomy, or Space alone.
					// - "Choice" can feel too decision-specific.
					// - "Autonomy" can feel abstract or political.
					// - "Independence" can imply separation.
					// - "Space" can feel purely physical.
					// - "Freedom" names the felt global condition of having room to move,
					//   choose, and be oneself without constraint.
					// - Making it selectable allows users to start where they are,
					//   and then clarify toward more specificity if helpful.
					item: "Freedom",
					meaning: "Room to choose, move, and be without constraint",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "When you say freedom, is it more about having options (choice), having room to be yourself (space), \
							or being able to move and act without constraint? And is the limitation coming mostly from someone else, \
							from circumstances, or from pressure inside you?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "If you had more freedom right now, what would you do first — even in a small way?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Autonomy",
					meaning: "Make decisions without external control",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is someone making decisions for you, or is it more that you feel constrained even without anyone actively controlling you?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What decision would you most like to make freely right now?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Choice",
					meaning: "Freedom to decide",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about having options, or about feeling free to choose without pressure or guilt?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Ease",
					meaning: "Freedom from strain or effort",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about physical ease, emotional ease, or just wanting things to be simpler for a while?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Independence",
					meaning: "Self-reliance and agency",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting to manage on your own, or about not wanting to depend on someone who isn't reliable?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Agency",
					meaning: "Ability to influence",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about feeling powerless in a specific situation, or a wider sense that your actions don't make a difference?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Self-responsiblity",
					meaning: "Owning my own choices",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting to take more ownership of your life, or about others not taking responsibility for theirs?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Space",
					meaning: "Room to be and act",
					metaType: ["intrapersonal", "relationalField"],
					metaClarifier: {
						question: "When you say “Space,” do you mean…",
						options: [
							{
								label: "Room internally to think, feel, or decide freely",
								setsMetaType: "intrapersonal",
							},
							{
								label: "Distance or room in a relationship or interaction",
								setsMetaType: "relationalField",
							},
						],
					},
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this physical space, emotional space, or time and space to think and be yourself?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Spontaneity",
					meaning: "Freedom to act in the moment",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting more freedom to follow impulses, or about feeling too constrained by plans and obligations?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
			],
		},
		Leisure: {
			ui: { heading: "Leisure & Relaxation", order: 2 },
			metaType: "intrapersonal",
			items: [
				{
					item: "Humour",
					meaning: "Lightness and laughter",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting more lightness in your life, or about missing someone specific you laugh with?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Joy",
					meaning: "Delight and happiness",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "When did you last feel genuine joy? What was happening, and what would bring that closer right now?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Play",
					meaning: "Fun, imagination and creativity",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What does play look like for you — games, silliness, creating something, or just doing something without a purpose?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Pleasure",
					meaning: "Enjoyable sensations or experiences",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What kind of pleasure feels most needed — physical comfort, something delicious, a beautiful experience, or just relaxation?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Rejuvenation",
					meaning: "Feeling refreshed and renewed",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What would rejuvenate you — time off, time in nature, doing something you love, or simply having nothing to do?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
			],
		},
	},
};
export default NeedsFreedom;
