import { NEEDS, GROUPS } from "./NeedsConstants.js";
import { WHERE_MET } from "./whereMetData.js";
import { UNPACKING_TYPE } from "./unpackingTypeData.js";

const { IN_ME, BETWEEN_US, ENVIRONMENT } = WHERE_MET;

export const NeedsSubsistence = {
	ui: {
		heading: "Subsistence Needs",
		helpText:
			"Subsistence needs are the basic requirements for survival and physical well-being. They include needs for food, water, shelter, clothing, and safety. When these needs are unmet, we may feel hungry, cold, unsafe, or vulnerable.",
	},
	groups: {
		[GROUPS.PHYSICAL]: {
			ui: { heading: "Physical sustenance", order: 1 },
			unpackingType: [UNPACKING_TYPE.PRACTICAL],
			whereMet: [ENVIRONMENT],
			items: [
				{
					item: NEEDS.AIR,
					meaning: "Clean air to breathe",
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What does having enough clean air actually look like for you right now? Is it about your environment, or a feeling of being able to breathe freely?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.FOOD,
					meaning: "Nourishing and satisfying meals",
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about having enough food, or about the quality and nourishment of what you're eating? What would feel satisfying right now?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.HEALTH,
					meaning: "Physical well-being",
					whereMet: [IN_ME, ENVIRONMENT], // body + access/resources
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What aspect of your health feels most alive right now — is it about energy, pain, capacity, or something else?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.MOVEMENT,
					meaning: "Freedom to move and be active",
					unpackingType: [UNPACKING_TYPE.PRACTICAL, UNPACKING_TYPE.AGENCY_AUTONOMY],
					whereMet: [IN_ME, ENVIRONMENT],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of movement is calling you? Is it about exercise, freedom to go somewhere, or just not feeling stuck?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.PHYSICAL_SAFETY,
					meaning: "Freedom from physical harm",
					unpackingType: [UNPACKING_TYPE.PROTECTIVE_SAFETY],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is there a specific physical threat you're aware of, or is it a more general sense of wanting to feel safe in your body and surroundings?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.REST_SLEEP,
					meaning: "Deep rest and renewal",
					whereMet: [IN_ME, ENVIRONMENT],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about literal sleep, or about a deeper kind of rest — permission to stop, to not be productive for a while?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_02", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "What would you need to let go of in order to truly rest?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.SHELTER,
					meaning: "Safe and secure housing",
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about having a physical place to live, or about feeling at home and settled somewhere?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.TOUCH,
					meaning: "Comforting physical contact",
					unpackingType: [UNPACKING_TYPE.RELATIONAL_FIELD],
					whereMet: [BETWEEN_US, IN_ME],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of touch are you longing for? A hug, a hand on your shoulder, or simply being physically close to someone?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.WATER,
					meaning: "Clean water for drinking and hygiene",
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about literal access to water, or does it point to something about basic sustenance and having your fundamental needs met?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_CONC_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_CONC_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_CONC_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_CONC_01", tier: "deeper" }, */
							},
						],
					},
				},
			],
		},
		[GROUPS.SECURITY]: {
			ui: { heading: "Security", order: 2 },
			// Security is often a mix: inner steadiness + external steadiness + relational steadiness
			// Default: treat as "inMe + environment" unless clearly relational.
			whereMet: [IN_ME, ENVIRONMENT],
			unpackingType: [UNPACKING_TYPE.PROTECTIVE_SAFETY],
			items: [
				{
					item: NEEDS.ORDER_STRUCTURE,
					meaning: "Clarity and organization",
					whereMet: [ENVIRONMENT, IN_ME],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting things around you to be organised, or about an inner sense of knowing what comes next?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"What would 'enough' structure look like — not rigid, but enough to feel settled?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.PEACE_EXTERNAL,
					meaning: "Safety from external conflict",
					whereMet: [ENVIRONMENT],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting the conflict around you to stop, or about finding a way to feel less affected by it?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.PEACE_OF_MIND,
					whereMet: [IN_ME],
					meaning: "Freedom from internal turmoil",
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What's currently disturbing your peace of mind? Is it worry about the future, regret about the past, or something unresolved right now?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"What would need to happen — even internally — for some of that noise to quiet?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.PROTECTION,
					meaning: "Being guarded from harm",
					whereMet: [ENVIRONMENT],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What are you wanting protection from? Is it a person, a situation, or your own feelings?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"Is this about someone stepping in for you, or about feeling stronger yourself?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.SAFETY_EMOTIONAL,
					meaning: "Freedom to be emotionally vulnerable",
					whereMet: [IN_ME, BETWEEN_US],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What would emotional safety look like here — being able to say what you feel without being judged, or knowing you won't be hurt for being open?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "Is there something specific you'd want to express if you felt safe enough?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.STABILITY,
					meaning: "Steadiness in life circumstances",
					whereMet: [ENVIRONMENT, IN_ME, BETWEEN_US],
					unpackingType: [
						UNPACKING_TYPE.PROTECTIVE_SAFETY,
						UNPACKING_TYPE.RELATIONAL_FIELD,
						UNPACKING_TYPE.PRACTICAL,
					],
					metaClarifier: {
						question: "When you say \u201cStability,\u201d which do you mean?",
						options: [
							{
								label: "The environment or relationship feeling steady",
								setswhereMet: WHERE_MET.BETWEEN_US,
							},
							{
								label: "Your internal state feeling steady",
								setswhereMet: WHERE_MET.IN_ME,
							},
						],
					},
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What part of your life feels unsteady right now? Is it practical things, a relationship, or your own inner state?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_03", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "What would 'stable enough' feel like — even if everything isn't perfect?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" }, */
							},
						],
					},
				},
				{
					item: NEEDS.TRUSTING,
					meaning: "Confidence in people and systems",
					unpackingType: [UNPACKING_TYPE.PROTECTIVE_SAFETY, UNPACKING_TYPE.RELATIONAL_FIELD],
					whereMet: [BETWEEN_US, IN_ME],
					clarify: {
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about trusting a specific person, or about a more general sense that things will be okay?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_02", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"What would someone need to do — or stop doing — for trust to start rebuilding?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{
								/* 							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" }, */
							},
						],
					},
				},
			],
		},
	},
};
export default NeedsSubsistence;
