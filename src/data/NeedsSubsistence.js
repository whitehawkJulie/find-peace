export const NeedsSubsistence = {
	ui: {
		heading: "Subsistence Needs",
		helpText:
			"Subsistence needs are the basic requirements for survival and physical well-being. They include needs for food, water, shelter, clothing, and safety. When these needs are unmet, we may feel hungry, cold, unsafe, or vulnerable.",
	},
	groups: {
		Physical: {
			ui: { heading: "Physical sustenance", order: 1 },
			items: [
				{
					item: "Air",
					meaning: "Clean air to breathe",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What does having enough clean air actually look like for you right now? Is it about your environment, or a feeling of being able to breathe freely?",
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
					item: "Food",
					meaning: "Nourishing and satisfying meals",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about having enough food, or about the quality and nourishment of what you're eating? What would feel satisfying right now?",
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
					item: "Health",
					meaning: "Physical well-being",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What aspect of your health feels most alive right now — is it about energy, pain, capacity, or something else?",
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
					item: "Movement",
					meaning: "Freedom to move and be active",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What kind of movement is calling you? Is it about exercise, freedom to go somewhere, or just not feeling stuck?",
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
					item: "Physical Safety",
					meaning: "Freedom from physical harm",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is there a specific physical threat you're aware of, or is it a more general sense of wanting to feel safe in your body and surroundings?",
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
				{
					item: "Rest / sleep",
					meaning: "Deep rest and renewal",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about literal sleep, or about a deeper kind of rest — permission to stop, to not be productive for a while?",
							deeper_specific_optional: "What would you need to let go of in order to truly rest?",
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
					item: "Shelter",
					meaning: "Safe and secure housing",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about having a physical place to live, or about feeling at home and settled somewhere?",
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
					item: "Touch",
					meaning: "Comforting physical contact",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What kind of touch are you longing for? A hug, a hand on your shoulder, or simply being physically close to someone?",
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
					item: "Water",
					meaning: "Clean water for drinking and hygiene",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about literal access to water, or does it point to something about basic sustenance and having your fundamental needs met?",
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
			],
		},
		Security: {
			ui: { heading: "Security", order: 2 },
			metaType: relationalField,
			items: [
				{
					item: "Order/Structure",
					meaning: "Clarity and organization",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about wanting things around you to be organised, or about an inner sense of knowing what comes next?",
							deeper_specific_optional:
								"What would 'enough' structure look like — not rigid, but enough to feel settled?",
						},
						promptKeys: {
							core_embodiment: "EMB_04",
							core_discrimination: "DISC_LOAD_02",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Peace (external)",
					meaning: "Safety from external conflict",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about wanting the conflict around you to stop, or about finding a way to feel less affected by it?",
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
					item: "Peace of mind",
					metatype: intrapersonal,
					meaning: "Freedom from internal turmoil",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"What's currently disturbing your peace of mind? Is it worry about the future, regret about the past, or something unresolved right now?",
							deeper_specific_optional:
								"What would need to happen — even internally — for some of that noise to quiet?",
						},
						promptKeys: {
							core_embodiment: "EMB_04",
							core_discrimination: "DISC_LOAD_01",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Protection",
					meaning: "Being guarded from harm",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"What are you wanting protection from? Is it a person, a situation, or your own feelings?",
							deeper_specific_optional:
								"Is this about someone stepping in for you, or about feeling stronger yourself?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_LOAD_02",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Safety (emotional)",
					meaning: "Freedom to be emotionally vulnerable",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"What would emotional safety look like here — being able to say what you feel without being judged, or knowing you won't be hurt for being open?",
							deeper_specific_optional:
								"Is there something specific you'd want to express if you felt safe enough?",
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
					item: "Stability",
					meaning: "Steadiness in life circumstances",
					metaType: ["relationalField", "intrapersonal"],
					metaClarifier: {
						question: "When you say “Stability,” which do you mean?",
						options: [
							{
								label: "The environment or relationship feeling steady",
								setsMetaType: "relationalField",
							},
							{
								label: "Your internal state feeling steady",
								setsMetaType: "intrapersonal",
							},
						],
					},

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"What part of your life feels unsteady right now? Is it practical things, a relationship, or your own inner state?",
							deeper_specific_optional:
								"What would 'stable enough' feel like — even if everything isn't perfect?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_LOAD_03",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Trusting",
					meaning: "Confidence in people and systems",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about trusting a specific person, or about a more general sense that things will be okay?",
							deeper_specific_optional:
								"What would someone need to do — or stop doing — for trust to start rebuilding?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_LOAD_02",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
			],
		},
	},
};
export default NeedsSubsistence;
