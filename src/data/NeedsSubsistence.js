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
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What does having enough clean air actually look like for you right now? Is it about your environment, or a feeling of being able to breathe freely?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Food",
					meaning: "Nourishing and satisfying meals",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about having enough food, or about the quality and nourishment of what you're eating? What would feel satisfying right now?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Health",
					meaning: "Physical well-being",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What aspect of your health feels most alive right now — is it about energy, pain, capacity, or something else?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Movement",
					meaning: "Freedom to move and be active",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What kind of movement is calling you? Is it about exercise, freedom to go somewhere, or just not feeling stuck?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Physical Safety",
					meaning: "Freedom from physical harm",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is there a specific physical threat you're aware of, or is it a more general sense of wanting to feel safe in your body and surroundings?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Rest / sleep",
					meaning: "Deep rest and renewal",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about literal sleep, or about a deeper kind of rest — permission to stop, to not be productive for a while?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What would you need to let go of in order to truly rest?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Shelter",
					meaning: "Safe and secure housing",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about having a physical place to live, or about feeling at home and settled somewhere?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Touch",
					meaning: "Comforting physical contact",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What kind of touch are you longing for? A hug, a hand on your shoulder, or simply being physically close to someone?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Water",
					meaning: "Clean water for drinking and hygiene",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about literal access to water, or does it point to something about basic sustenance and having your fundamental needs met?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
			],
		},
		Security: {
			ui: { heading: "Security", order: 2 },
			metaType: "relationalField",
			items: [
				{
					item: "Order/Structure",
					meaning: "Clarity and organization",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting things around you to be organised, or about an inner sense of knowing what comes next?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What would 'enough' structure look like — not rigid, but enough to feel settled?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Peace (external)",
					meaning: "Safety from external conflict",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting the conflict around you to stop, or about finding a way to feel less affected by it?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Peace of mind",
					metatype: "intrapersonal",
					meaning: "Freedom from internal turmoil",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What's currently disturbing your peace of mind? Is it worry about the future, regret about the past, or something unresolved right now?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What would need to happen — even internally — for some of that noise to quiet?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Protection",
					meaning: "Being guarded from harm",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What are you wanting protection from? Is it a person, a situation, or your own feelings?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "Is this about someone stepping in for you, or about feeling stronger yourself?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Safety (emotional)",
					meaning: "Freedom to be emotionally vulnerable",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What would emotional safety look like here — being able to say what you feel without being judged, or knowing you won't be hurt for being open?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "Is there something specific you'd want to express if you felt safe enough?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
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
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What part of your life feels unsteady right now? Is it practical things, a relationship, or your own inner state?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_03", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What would 'stable enough' feel like — even if everything isn't perfect?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Trusting",
					meaning: "Confidence in people and systems",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about trusting a specific person, or about a more general sense that things will be okay?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What would someone need to do — or stop doing — for trust to start rebuilding?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
			],
		},
	},
};
export default NeedsSubsistence;
