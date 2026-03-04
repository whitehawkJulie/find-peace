import { NEEDS, GROUPS } from "./NeedsConstants.js";
import { WHERE_MET } from "./whereMetData.js";
import { UNPACKING_TYPE } from "./unpackingTypeData.js";

const { IN_ME, BETWEEN_US, ENVIRONMENT, LIFE } = WHERE_MET;

export const NeedsMeaning = {
	ui: {
		heading: "Meaning Needs",
		helpText:
			"Meaning needs are about finding purpose and significance in life. They include needs for direction, values, contribution, and a sense of being part of something larger than yourself. When these needs are unmet, we may feel lost, confused, or empty.",
	},
	groups: {
		[GROUPS.SENSE_OF_SELF]: {
			ui: { heading: "Sense of self", order: 1 },
			unpackingType: [UNPACKING_TYPE.INTEGRITY_IDENTITY],
			whereMet: [IN_ME],
			items: [
				{
					item: NEEDS.AUTHENTICITY,
					meaning: "Being true to myself",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is there something you're holding back or pretending about? What would it look like to be more yourself here?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.COMPETENCE,
					meaning: "Feeling capable and skilled",
					whereMet: [IN_ME, ENVIRONMENT],
					unpackingType: [UNPACKING_TYPE.INTEGRITY_IDENTITY, UNPACKING_TYPE.PRACTICAL],
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting to feel capable, wanting others to see you as capable, or both?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.CREATIVITY,
					meaning: "Expressing imagination and originality",
					whereMet: [IN_ME, LIFE, ENVIRONMENT],
					unpackingType: [UNPACKING_TYPE.INTEGRITY_IDENTITY, UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of creative expression is calling you — making something, solving a problem in a new way, or just having the space to imagine?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.DIGNITY,
					meaning: "Inherent worth and self-respect",

					// Dignity has both an internal and relational expression.
					// Internally: a felt sense of inherent worth.
					// Relationally: being treated with respect and not demeaned.
					whereMet: [IN_ME, BETWEEN_US],

					metaClarifier: {
						question: "When you say \u201cDignity,\u201d do you mean\u2026",
						options: [
							{
								label: "My own sense of inherent worth and self-respect",
								setswhereMet: WHERE_MET.IN_ME,
							},
							{
								label: "Being treated with respect and not demeaned",
								setswhereMet: WHERE_MET.BETWEEN_US,
							},
						],
					},
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Has something happened that felt undignified? What would restore your sense of worth here?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "Is this about how others treat you, or about how you're treating yourself?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.GROWTH,
					meaning: "Development and evolution",
					whereMet: [IN_ME, LIFE, ENVIRONMENT],
					unpackingType: [UNPACKING_TYPE.INTEGRITY_IDENTITY, UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of growth are you wanting — learning something new, becoming more yourself, or moving past something that's been holding you back?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.HEALING,
					meaning: "Moving toward wholeness",
					whereMet: [IN_ME, ENVIRONMENT, BETWEEN_US],
					unpackingType: [UNPACKING_TYPE.INTEGRITY_IDENTITY, UNPACKING_TYPE.PROTECTIVE_SAFETY],
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What are you wanting to heal from — something recent, something old, or something you can't quite name yet?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"What would a small step toward healing look like, even if the whole journey feels long?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.HONESTY,
					meaning: "Telling and facing the truth",
					whereMet: [IN_ME, BETWEEN_US],
					unpackingType: [UNPACKING_TYPE.INTEGRITY_IDENTITY, UNPACKING_TYPE.RELATIONAL_FIELD],
					question: "When you say \u201cHonesty,\u201d do you mean\u2026",
					options: [
						{
							label: "Do you mean being honest yourself?",
							setswhereMet: WHERE_MET.IN_ME,
						},
						{
							label: "Or experiencing honesty in the relationship?",
							setswhereMet: WHERE_MET.BETWEEN_US,
						},
					],
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting someone to be honest with you, or about wanting to be more honest yourself?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.INTEGRITY,
					meaning: "Living in alignment with values",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is there something you've done that doesn't sit right with you, or is it about someone else acting out of alignment with what you expected?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.SELF_ACCEPTANCE,
					meaning: "Welcoming all parts of myself",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What part of yourself are you struggling to accept right now? Is it something you did, something you feel, or something about who you are?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.SELF_CARE,
					meaning: "Tending to my own needs",
					whereMet: [IN_ME, ENVIRONMENT],
					unpackingType: [UNPACKING_TYPE.PRACTICAL, UNPACKING_TYPE.INTEGRITY_IDENTITY],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of self-care feels most needed — rest, nourishment, time alone, or giving yourself permission to slow down?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.SELF_CONNECTION,
					meaning: "Awareness of inner experience",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Have you been disconnected from yourself lately — going through the motions, ignoring signals, or not knowing what you feel?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.SELF_KNOWLEDGE,
					meaning: "Understanding myself",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is there something about yourself you're trying to understand — a pattern, a reaction, or something you keep doing that puzzles you?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.SELF_REALIZATION,
					meaning: "Becoming who I am meant to be",
					whereMet: [IN_ME, LIFE],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.INTEGRITY_IDENTITY],
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is there something you feel you're meant to do or become that you haven't been able to move toward?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.MATTERING_TO_MYSELF,
					meaning: "Recognizing my own value",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Have you been putting yourself last? What would it look like to treat your own needs as worthy of attention?",
								tier: "core",
							},
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
		[GROUPS.UNDERSTANDING]: {
			ui: { heading: "Understanding", order: 2 },
			unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
			whereMet: [IN_ME, LIFE],
			items: [
				{
					item: NEEDS.UNDERSTANDING,
					meaning: "Grasp what something means",
					whereMet: [IN_ME, BETWEEN_US, LIFE],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.RELATIONAL_FIELD],
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What are you trying to understand — why something happened, how someone feels, or what's going on inside you?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.AWARENESS,
					meaning: "Conscious presence",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting to be more present, or about wanting someone else to be more aware of what's happening?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.CLARITY,
					meaning: "Clear thinking and perception",
					unpackingType: [UNPACKING_TYPE.PROTECTIVE_SAFETY, UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What feels unclear right now — the situation, someone's intentions, or your own feelings about it?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"What would 'clear enough' look like, even if you don't have all the answers?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.DISCOVERY,
					meaning: "Finding or uncovering something new",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting to learn something new, or about uncovering something that's already there but hidden?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.LEARNING,
					meaning: "Gaining knowledge or insight",
					whereMet: [IN_ME, ENVIRONMENT],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.PRACTICAL],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What are you wanting to learn — a skill, an understanding of someone, or something about yourself?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.MAKING_SENSE_OF_LIFE,
					meaning: "Understanding the bigger picture",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is there something specific that doesn't make sense right now, or is it a wider feeling of confusion about where things are heading?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.STIMULATION,
					meaning: "Mental engagement and interest",
					whereMet: [IN_ME, ENVIRONMENT],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.PRACTICAL],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about boredom, or about wanting something that engages your mind and makes you feel alive?",
								tier: "core",
							},
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
		[GROUPS.MEANING_CORE]: {
			ui: { heading: "Meaning", order: 3 },
			unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
			whereMet: [LIFE, IN_ME],
			items: [
				{
					item: NEEDS.MEANING,
					meaning: "A sense that something matters",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about something specific feeling pointless, or a wider sense that you're searching for what matters?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"If meaning were present here, what would be different about how you spend your time or energy?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.CHALLENGE,
					meaning: "Opportunities to stretch and grow",
					whereMet: [LIFE, ENVIRONMENT, IN_ME],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.AGENCY_AUTONOMY],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Are you feeling under-challenged and wanting more, or is there a specific challenge you're ready for?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.ALIVENESS,
					meaning: "Feeling fully vibrant and present",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What helps you feel most alive — physical activity, deep conversation, creative work, or being in nature?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.CONSCIOUSNESS,
					meaning: "Deep awareness of self and life",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting to be more awake to your own experience, or about connecting to something larger than yourself?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.CONTRIBUTION,
					meaning: "Making a difference",
					whereMet: [LIFE, BETWEEN_US, ENVIRONMENT],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.RELATIONAL_FIELD],
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What would contribution look like — helping someone specific, serving a cause, or simply knowing your work matters?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.EFFECTIVENESS,
					meaning: "Capacity to bring about change",
					whereMet: [ENVIRONMENT, IN_ME],
					unpackingType: [UNPACKING_TYPE.PRACTICAL, UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting your efforts to actually produce results, or about feeling stuck and powerless?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.EXPLORATION,
					meaning: "Willingness to investigate and try",
					whereMet: [LIFE, ENVIRONMENT, IN_ME],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.AGENCY_AUTONOMY],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What are you wanting to explore — new experiences, new ideas, or new aspects of yourself?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.INTEGRATION,
					meaning: "Wholeness and coherence",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is there a part of your life or your experience that feels separate or fragmented? What would coming together look like?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.PURPOSE,
					meaning: "Having meaningful direction",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting a clearer sense of direction, or about the things you're doing not feeling purposeful enough?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"What's one thing that, if you spent more time on it, would feel like it matters?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
			],
		},
		[GROUPS.TRANSCENDENCE]: {
			ui: { heading: "Transcendence", order: 4 },
			unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
			whereMet: [LIFE, IN_ME],
			items: [
				{
					item: NEEDS.BEAUTY,
					meaning: "Appreciating harmony and elegance",
					whereMet: [LIFE, ENVIRONMENT, IN_ME],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of beauty are you wanting more of — in nature, art, people, or your everyday surroundings?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.CELEBRATION_OF_LIFE,
					meaning: "Honoring what's precious",
					whereMet: [LIFE, BETWEEN_US, IN_ME],
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What feels worth celebrating right now — even something small? Or are you missing the feeling of being able to celebrate?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.COMMUNION,
					meaning: "Deep spiritual or emotional connection",
					// Communion can be experienced as:
					// - life/spirit: a sense of union with life, nature, spirit, or something larger than the self.
					// - Relational-field: a deep shared presence or felt oneness with another person.
					// Because the word is used in both senses, we dual-tag and clarify at runtime.
					whereMet: [LIFE, BETWEEN_US, IN_ME],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.RELATIONAL_FIELD],

					metaClarifier: {
						question: "When you say \u201cCommunion,\u201d do you mean\u2026",
						options: [
							{
								label: "A sense of connection with something larger than myself (life, nature, spirit)",
								setswhereMet: WHERE_MET.LIFE,
							},
							{
								label: "A deep shared presence or felt oneness with another person",
								setswhereMet: WHERE_MET.BETWEEN_US,
							},
						],
					},
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this communion you're wanting with another person, with nature, with something spiritual, or with yourself?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.FAITH,
					meaning: "Trust in something greater",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about religious or spiritual faith, or about a more general trust that things will work out?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "Has something happened that's shaken your faith or trust?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.FLOW,
					meaning: "Being fully absorbed in the moment",
					whereMet: [IN_ME, ENVIRONMENT, LIFE],
					unpackingType: [UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE, UNPACKING_TYPE.PRACTICAL],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"When did you last feel in flow? What were you doing, and what would help you get back to that?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.HOPE,
					meaning: "Belief in possibilities",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about a specific situation you're hoping will improve, or a wider feeling that things could get better?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_03", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "What small sign of possibility would help you hold onto hope?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.INSPIRATION,
					meaning: "Being uplifted into vision or action",
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What inspires you when you find it — ideas, people, nature, art? What would help you reconnect with that?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.MOURNING,
					meaning: "Honoring loss with care",
					whereMet: [LIFE, IN_ME, BETWEEN_US],
					unpackingType: [UNPACKING_TYPE.INTEGRITY_IDENTITY, UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What are you mourning — a person, a possibility, something that changed, or something that never was?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"Is there space in your life right now to grieve, or does it feel like you have to hold it together?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.PEACE_INTERNAL,
					meaning: "Calm within",
					whereMet: [IN_ME, LIFE],
					unpackingType: [UNPACKING_TYPE.PROTECTIVE_SAFETY, UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE],
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What's disturbing your inner peace — racing thoughts, unresolved feelings, or a situation that won't settle?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "What would inner peace feel like, even just a moment of it?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: NEEDS.PRESENCE,
					meaning: "Fully here and now",
					whereMet: [IN_ME, LIFE],
					clarify: {
						type: "needs-clarify",
						category: "concrete",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting to be more present yourself, or about wanting someone else to be more present with you?",
								tier: "core",
							},
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
