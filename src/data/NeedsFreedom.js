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
					//   and then unpack toward more specificity if helpful.
					item: "Freedom",
					meaning: "Room to choose, move, and be without constraint",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"When you say freedom, is it more about having options (choice), having room to be yourself (space), \
							or being able to move and act without constraint? And is the limitation coming mostly from someone else, \
							from circumstances, or from pressure inside you?",

							deeper_specific_optional:
								"If you had more freedom right now, what would you do first — even in a small way?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_LOAD_01",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Autonomy",
					meaning: "Make decisions without external control",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is someone making decisions for you, or is it more that you feel constrained even without anyone actively controlling you?",
							deeper_specific_optional: "What decision would you most like to make freely right now?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_LOAD_01",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Choice",
					meaning: "Freedom to decide",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about having options, or about feeling free to choose without pressure or guilt?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_LOAD_02",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Ease",
					meaning: "Freedom from strain or effort",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about physical ease, emotional ease, or just wanting things to be simpler for a while?",
						},
						promptKeys: {
							core_embodiment: "EMB_04",
							core_discrimination: "DISC_CONC_01",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
					},
				},
				{
					item: "Independence",
					meaning: "Self-reliance and agency",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about wanting to manage on your own, or about not wanting to depend on someone who isn't reliable?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_LOAD_01",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Agency",
					meaning: "Ability to influence",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about feeling powerless in a specific situation, or a wider sense that your actions don't make a difference?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_LOAD_01",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Self-responsiblity",
					meaning: "Owning my own choices",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about wanting to take more ownership of your life, or about others not taking responsibility for theirs?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_LOAD_01",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
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

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this physical space, emotional space, or time and space to think and be yourself?",
						},
						promptKeys: {
							core_embodiment: "EMB_04",
							core_discrimination: "DISC_CONC_01",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
					},
				},
				{
					item: "Spontaneity",
					meaning: "Freedom to act in the moment",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about wanting more freedom to follow impulses, or about feeling too constrained by plans and obligations?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_CONC_01",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
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

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about wanting more lightness in your life, or about missing someone specific you laugh with?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_CONC_01",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
					},
				},
				{
					item: "Joy",
					meaning: "Delight and happiness",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"When did you last feel genuine joy? What was happening, and what would bring that closer right now?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_CONC_01",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
					},
				},
				{
					item: "Play",
					meaning: "Fun, imagination and creativity",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What does play look like for you — games, silliness, creating something, or just doing something without a purpose?",
						},
						promptKeys: {
							core_embodiment: "EMB_04",
							core_discrimination: "DISC_CONC_02",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
					},
				},
				{
					item: "Pleasure",
					meaning: "Enjoyable sensations or experiences",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What kind of pleasure feels most needed — physical comfort, something delicious, a beautiful experience, or just relaxation?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_CONC_01",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
					},
				},
				{
					item: "Rejuvenation",
					meaning: "Feeling refreshed and renewed",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What would rejuvenate you — time off, time in nature, doing something you love, or simply having nothing to do?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_CONC_02",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
					},
				},
			],
		},
	},
};
export default NeedsFreedom;
