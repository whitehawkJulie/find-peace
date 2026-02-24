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

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is there something you're holding back or pretending about? What would it look like to be more yourself here?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_REL_02",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Competence",
					meaning: "Feeling capable and skilled",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is this about wanting to feel capable, wanting others to see you as capable, or both?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_REL_03",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Creativity",
					meaning: "Expressing imagination and originality",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What kind of creative expression is calling you — making something, solving a problem in a new way, or just having the space to imagine?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_CONC_02",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
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

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Has something happened that felt undignified? What would restore your sense of worth here?",
							deeper_specific_optional:
								"Is this about how others treat you, or about how you're treating yourself?",
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
					item: "Growth",
					meaning: "Development and evolution",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"What kind of growth are you wanting — learning something new, becoming more yourself, or moving past something that's been holding you back?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_REL_02",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Healing",
					meaning: "Moving toward wholeness",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"What are you wanting to heal from — something recent, something old, or something you can't quite name yet?",
							deeper_specific_optional:
								"What would a small step toward healing look like, even if the whole journey feels long?",
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

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is this about wanting someone to be honest with you, or about wanting to be more honest yourself?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_REL_02",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Integrity",
					meaning: "Living in alignment with values",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is there something you've done that doesn't sit right with you, or is it about someone else acting out of alignment with what you expected?",
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
					item: "Self-acceptance",
					meaning: "Welcoming all parts of myself",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"What part of yourself are you struggling to accept right now? Is it something you did, something you feel, or something about who you are?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_REL_02",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Self-care",
					meaning: "Tending to my own needs",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What kind of self-care feels most needed — rest, nourishment, time alone, or giving yourself permission to slow down?",
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
					item: "Self-connection",
					meaning: "Awareness of inner experience",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Have you been disconnected from yourself lately — going through the motions, ignoring signals, or not knowing what you feel?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_REL_01",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Self-knowledge",
					meaning: "Understanding myself",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is there something about yourself you're trying to understand — a pattern, a reaction, or something you keep doing that puzzles you?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_REL_02",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Self-realization",
					meaning: "Becoming who I am meant to be",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is there something you feel you're meant to do or become that you haven't been able to move toward?",
						},
						promptKeys: {
							core_embodiment: "EMB_04",
							core_discrimination: "DISC_REL_02",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Mattering to myself",
					meaning: "Recognizing my own value",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Have you been putting yourself last? What would it look like to treat your own needs as worthy of attention?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_REL_01",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
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

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"What are you trying to understand — why something happened, how someone feels, or what's going on inside you?",
						},
						promptKeys: {
							core_embodiment: "EMB_01",
							core_discrimination: "DISC_REL_02",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Awareness",
					meaning: "Conscious presence",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is this about wanting to be more present, or about wanting someone else to be more aware of what's happening?",
						},
						promptKeys: {
							core_embodiment: "EMB_03",
							core_discrimination: "DISC_REL_02",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Clarity",
					meaning: "Clear thinking and perception",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"What feels unclear right now — the situation, someone's intentions, or your own feelings about it?",
							deeper_specific_optional:
								"What would 'clear enough' look like, even if you don't have all the answers?",
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
					item: "Discovery",
					meaning: "Finding or uncovering something new",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about wanting to learn something new, or about uncovering something that's already there but hidden?",
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
					item: "Learning",
					meaning: "Gaining knowledge or insight",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What are you wanting to learn — a skill, an understanding of someone, or something about yourself?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_CONC_02",
							deeper_unfolding: "UNF_CONC_01",
							deeper_probing: "PROBE_CONC_01",
							deeper_integration: "INT_CONC_01",
						},
					},
				},
				{
					item: "Making sense of life",
					meaning: "Understanding the bigger picture",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is there something specific that doesn't make sense right now, or is it a wider feeling of confusion about where things are heading?",
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
					item: "Stimulation",
					meaning: "Mental engagement and interest",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about boredom, or about wanting something that engages your mind and makes you feel alive?",
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
			],
		},
		Meaning: {
			ui: { heading: "Meaning", order: 3 },
			metaType: "existential",
			items: [
				{
					item: "Meaning",
					meaning: "A sense that something matters",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about something specific feeling pointless, or a wider sense that you're searching for what matters?",
							deeper_specific_optional:
								"If meaning were present here, what would be different about how you spend your time or energy?",
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
					item: "Challenge",
					meaning: "Opportunities to stretch and grow",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Are you feeling under-challenged and wanting more, or is there a specific challenge you're ready for?",
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
					item: "Aliveness",
					meaning: "Feeling fully vibrant and present",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What helps you feel most alive — physical activity, deep conversation, creative work, or being in nature?",
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
					item: "Consciousness",
					meaning: "Deep awareness of self and life",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about wanting to be more awake to your own experience, or about connecting to something larger than yourself?",
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
					item: "Contribution",
					meaning: "Making a difference",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"What would contribution look like — helping someone specific, serving a cause, or simply knowing your work matters?",
						},
						promptKeys: {
							core_embodiment: "EMB_04",
							core_discrimination: "DISC_REL_03",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Effectiveness",
					meaning: "Capacity to bring about change",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about wanting your efforts to actually produce results, or about feeling stuck and powerless?",
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
					item: "Exploration",
					meaning: "Willingness to investigate and try",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What are you wanting to explore — new experiences, new ideas, or new aspects of yourself?",
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
					item: "Integration",
					meaning: "Wholeness and coherence",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is there a part of your life or your experience that feels separate or fragmented? What would coming together look like?",
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
					item: "Purpose",
					meaning: "Having meaningful direction",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about wanting a clearer sense of direction, or about the things you're doing not feeling purposeful enough?",
							deeper_specific_optional:
								"What's one thing that, if you spent more time on it, would feel like it matters?",
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
			],
		},
		Transcendence: {
			ui: { heading: "Transcendence", order: 4 },
			metaType: "existential",
			items: [
				{
					item: "Beauty",
					meaning: "Appreciating harmony and elegance",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What kind of beauty are you wanting more of — in nature, art, people, or your everyday surroundings?",
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
					item: "Celebration of life",
					meaning: "Honoring what's precious",

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"What feels worth celebrating right now — even something small? Or are you missing the feeling of being able to celebrate?",
						},
						promptKeys: {
							core_embodiment: "EMB_04",
							core_discrimination: "DISC_REL_01",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
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

					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is this communion you're wanting with another person, with nature, with something spiritual, or with yourself?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_REL_01",
							deeper_unfolding: "UNF_REL_01",
							deeper_probing: "PROBE_REL_01",
							deeper_integration: "INT_REL_01",
						},
					},
				},
				{
					item: "Faith",
					meaning: "Trust in something greater",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about religious or spiritual faith, or about a more general trust that things will work out?",
							deeper_specific_optional: "Has something happened that's shaken your faith or trust?",
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
					item: "Flow",
					meaning: "Being fully absorbed in the moment",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"When did you last feel in flow? What were you doing, and what would help you get back to that?",
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
					item: "Hope",
					meaning: "Belief in possibilities",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"Is this about a specific situation you're hoping will improve, or a wider feeling that things could get better?",
							deeper_specific_optional: "What small sign of possibility would help you hold onto hope?",
						},
						promptKeys: {
							core_embodiment: "EMB_02",
							core_discrimination: "DISC_LOAD_03",
							deeper_unfolding: "UNF_LOAD_01",
							deeper_probing: "PROBE_LOAD_01",
							deeper_integration: "INT_LOAD_01",
						},
					},
				},
				{
					item: "Inspiration",
					meaning: "Being uplifted into vision or action",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"What inspires you when you find it — ideas, people, nature, art? What would help you reconnect with that?",
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
					item: "Mourning",
					meaning: "Honoring loss with care",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"What are you mourning — a person, a possibility, something that changed, or something that never was?",
							deeper_specific_optional:
								"Is there space in your life right now to grieve, or does it feel like you have to hold it together?",
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
					item: "Peace (internal)",
					meaning: "Calm within",

					unpackEnabled: true,
					unpack: {
						category: "loaded",
						specificPrompts: {
							core_specific:
								"What's disturbing your inner peace — racing thoughts, unresolved feelings, or a situation that won't settle?",
							deeper_specific_optional: "What would inner peace feel like, even just a moment of it?",
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
					item: "Presence",
					meaning: "Fully here and now",

					unpackEnabled: true,
					unpack: {
						category: "concrete",
						specificPrompts: {
							core_specific:
								"Is this about wanting to be more present yourself, or about wanting someone else to be more present with you?",
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
	},
};
export default NeedsMeaning;
