export const NeedsMeaning = {
	ui: {
		heading: "Meaning Needs",
		helpText:
			"Meaning needs are about finding purpose and significance in life. They include needs for direction, values, contribution, and a sense of being part of something larger than yourself. When these needs are unmet, we may feel lost, confused, or empty.",
	},
	metaType: "intrapersonal",
	groups: {
		SenseOfSelf: {
			ui: { heading: "Sense of self", order: 1 },
			items: [
				{
					item: "Authenticity",
					meaning: "Being true to myself",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is there something you're holding back or pretending about? What would it look like to be more yourself here?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Competence",
					meaning: "Feeling capable and skilled",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting to feel capable, wanting others to see you as capable, or both?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Creativity",
					meaning: "Expressing imagination and originality",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What kind of creative expression is calling you — making something, solving a problem in a new way, or just having the space to imagine?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Dignity",
					meaning: "Inherent worth and self-respect",

					// Dignity has both an internal and relational expression.
					// Internally: a felt sense of inherent worth.
					// Relationally: being treated with respect and not demeaned.
					metaType: ["intrapersonal", "relationalField"],

					metaClarifier: {
						question: "When you say “Dignity,” do you mean…",
						options: [
							{
								label: "My own sense of inherent worth and self-respect",
								setsMetaType: "intrapersonal",
							},
							{
								label: "Being treated with respect and not demeaned",
								setsMetaType: "relationalField",
							},
						],
					},
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Has something happened that felt undignified? What would restore your sense of worth here?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "Is this about how others treat you, or about how you're treating yourself?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Growth",
					meaning: "Development and evolution",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What kind of growth are you wanting — learning something new, becoming more yourself, or moving past something that's been holding you back?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Healing",
					meaning: "Moving toward wholeness",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What are you wanting to heal from — something recent, something old, or something you can't quite name yet?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What would a small step toward healing look like, even if the whole journey feels long?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Honesty",
					meaning: "Telling and facing the truth",
					metaType: ["intrapersonal", "relationalField"],
					question: "When you say “Honesty,” do you mean…",
					options: [
						{
							label: "Do you mean being honest yourself?",
							setsMetaType: "intrapersonal",
						},
						{
							label: "Or experiencing honesty in the relationship?",
							setsMetaType: "relationalField",
						},
					],
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting someone to be honest with you, or about wanting to be more honest yourself?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Integrity",
					meaning: "Living in alignment with values",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is there something you've done that doesn't sit right with you, or is it about someone else acting out of alignment with what you expected?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Self-acceptance",
					meaning: "Welcoming all parts of myself",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What part of yourself are you struggling to accept right now? Is it something you did, something you feel, or something about who you are?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Self-care",
					meaning: "Tending to my own needs",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What kind of self-care feels most needed — rest, nourishment, time alone, or giving yourself permission to slow down?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Self-connection",
					meaning: "Awareness of inner experience",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Have you been disconnected from yourself lately — going through the motions, ignoring signals, or not knowing what you feel?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Self-knowledge",
					meaning: "Understanding myself",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is there something about yourself you're trying to understand — a pattern, a reaction, or something you keep doing that puzzles you?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Self-realization",
					meaning: "Becoming who I am meant to be",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is there something you feel you're meant to do or become that you haven't been able to move toward?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Mattering to myself",
					meaning: "Recognizing my own value",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Have you been putting yourself last? What would it look like to treat your own needs as worthy of attention?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
			],
		},
		Understanding: {
			ui: { heading: "Understanding", order: 2 },
			items: [
				{
					item: "Understanding",
					meaning: "Grasp what something means",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What are you trying to understand — why something happened, how someone feels, or what's going on inside you?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Awareness",
					meaning: "Conscious presence",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting to be more present, or about wanting someone else to be more aware of what's happening?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Clarity",
					meaning: "Clear thinking and perception",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What feels unclear right now — the situation, someone's intentions, or your own feelings about it?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What would 'clear enough' look like, even if you don't have all the answers?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Discovery",
					meaning: "Finding or uncovering something new",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting to learn something new, or about uncovering something that's already there but hidden?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Learning",
					meaning: "Gaining knowledge or insight",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What are you wanting to learn — a skill, an understanding of someone, or something about yourself?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Making sense of life",
					meaning: "Understanding the bigger picture",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is there something specific that doesn't make sense right now, or is it a wider feeling of confusion about where things are heading?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Stimulation",
					meaning: "Mental engagement and interest",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about boredom, or about wanting something that engages your mind and makes you feel alive?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
			],
		},
		Meaning: {
			ui: { heading: "Meaning", order: 3 },
			metaType: "existential",
			items: [
				{
					item: "Meaning",
					meaning: "A sense that something matters",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about something specific feeling pointless, or a wider sense that you're searching for what matters?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "If meaning were present here, what would be different about how you spend your time or energy?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Challenge",
					meaning: "Opportunities to stretch and grow",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Are you feeling under-challenged and wanting more, or is there a specific challenge you're ready for?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Aliveness",
					meaning: "Feeling fully vibrant and present",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What helps you feel most alive — physical activity, deep conversation, creative work, or being in nature?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Consciousness",
					meaning: "Deep awareness of self and life",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting to be more awake to your own experience, or about connecting to something larger than yourself?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Contribution",
					meaning: "Making a difference",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What would contribution look like — helping someone specific, serving a cause, or simply knowing your work matters?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Effectiveness",
					meaning: "Capacity to bring about change",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting your efforts to actually produce results, or about feeling stuck and powerless?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Exploration",
					meaning: "Willingness to investigate and try",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What are you wanting to explore — new experiences, new ideas, or new aspects of yourself?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Integration",
					meaning: "Wholeness and coherence",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is there a part of your life or your experience that feels separate or fragmented? What would coming together look like?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Purpose",
					meaning: "Having meaningful direction",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting a clearer sense of direction, or about the things you're doing not feeling purposeful enough?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What's one thing that, if you spent more time on it, would feel like it matters?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
			],
		},
		Transcendence: {
			ui: { heading: "Transcendence", order: 4 },
			metaType: "existential",
			items: [
				{
					item: "Beauty",
					meaning: "Appreciating harmony and elegance",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What kind of beauty are you wanting more of — in nature, art, people, or your everyday surroundings?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Celebration of life",
					meaning: "Honoring what's precious",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What feels worth celebrating right now — even something small? Or are you missing the feeling of being able to celebrate?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Communion",
					meaning: "Deep spiritual or emotional connection",
					// Communion can be experienced as:
					// - Existential: a sense of union with life, nature, spirit, or something larger than the self.
					// - Relational-field: a deep shared presence or felt oneness with another person.
					// Because the word is used in both senses, we dual-tag and clarify at runtime.
					metaType: ["existential", "relationalField"],

					metaClarifier: {
						question: "When you say “Communion,” do you mean…",
						options: [
							{
								label: "A sense of connection with something larger than myself (life, nature, spirit)",
								setsMetaType: "existential",
							},
							{
								label: "A deep shared presence or felt oneness with another person",
								setsMetaType: "relationalField",
							},
						],
					},
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this communion you're wanting with another person, with nature, with something spiritual, or with yourself?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Faith",
					meaning: "Trust in something greater",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about religious or spiritual faith, or about a more general trust that things will work out?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "Has something happened that's shaken your faith or trust?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Flow",
					meaning: "Being fully absorbed in the moment",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "When did you last feel in flow? What were you doing, and what would help you get back to that?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Hope",
					meaning: "Belief in possibilities",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about a specific situation you're hoping will improve, or a wider feeling that things could get better?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_03", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What small sign of possibility would help you hold onto hope?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Inspiration",
					meaning: "Being uplifted into vision or action",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What inspires you when you find it — ideas, people, nature, art? What would help you reconnect with that?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Mourning",
					meaning: "Honoring loss with care",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What are you mourning — a person, a possibility, something that changed, or something that never was?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "Is there space in your life right now to grieve, or does it feel like you have to hold it together?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Peace (internal)",
					meaning: "Calm within",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "What's disturbing your inner peace — racing thoughts, unresolved feelings, or a situation that won't settle?", tier: "core" },
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_specific", label: "A little further", question: "What would inner peace feel like, even just a moment of it?", tier: "deeper" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Presence",
					meaning: "Fully here and now",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{ key: "core_specific", label: "What this means for you", question: "Is this about wanting to be more present yourself, or about wanting someone else to be more present with you?", tier: "core" },
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
	},
};
export default NeedsMeaning;
