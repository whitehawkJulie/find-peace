import { NEEDS, GROUPS } from "./NeedsConstants.js";

export const WHERE_MET = Object.freeze({
	IN_ME: "inMe",
	BETWEEN_US: "betweenUs",
	ENVIRONMENT: "environment",
	LIFE: "life",
});

const { IN_ME, BETWEEN_US, ENVIRONMENT, LIFE } = WHERE_MET;

export const needWhereMetStructure = {
	subsistence: {
		[GROUPS.PHYSICAL]: {
			// Mostly met via conditions/resources in the world
			whereMet: [ENVIRONMENT],

			needs: {
				[NEEDS.AIR]: {},
				[NEEDS.FOOD]: {},
				[NEEDS.HEALTH]: { whereMet: [IN_ME, ENVIRONMENT] }, // body + access/resources
				[NEEDS.MOVEMENT]: { whereMet: [IN_ME, ENVIRONMENT] }, // body + opportunity/access
				[NEEDS.PHYSICAL_SAFETY]: { whereMet: [ENVIRONMENT] },
				[NEEDS.REST_SLEEP]: { whereMet: [IN_ME, ENVIRONMENT] }, // nervous system + conditions
				[NEEDS.SHELTER]: {},
				[NEEDS.TOUCH]: { whereMet: [BETWEEN_US, IN_ME] }, // relational + nervous system
				[NEEDS.WATER]: {},
			},
		},

		[GROUPS.SECURITY]: {
			// Security is often a mix: inner steadiness + external steadiness + relational steadiness
			// Default: treat as "inMe + environment" unless clearly relational.
			whereMet: [IN_ME, ENVIRONMENT],

			needs: {
				[NEEDS.ORDER_STRUCTURE]: { whereMet: [ENVIRONMENT, IN_ME] }, // systems + inner settling
				[NEEDS.PEACE_EXTERNAL]: { whereMet: [ENVIRONMENT] },
				[NEEDS.PEACE_OF_MIND]: { whereMet: [IN_ME] },
				[NEEDS.PROTECTION]: { whereMet: [ENVIRONMENT] },
				[NEEDS.SAFETY_EMOTIONAL]: { whereMet: [IN_ME, BETWEEN_US] }, // nervous system + relational safety
				[NEEDS.STABILITY]: { whereMet: [ENVIRONMENT, IN_ME, BETWEEN_US] }, // classic multi-domain
				[NEEDS.TRUSTING]: { whereMet: [BETWEEN_US, IN_ME] }, // relational trust + inner capacity to trust
			},
		},
	},

	connection: {
		[GROUPS.AFFECTION]: {
			// Connection/affection are primarily relational
			whereMet: [BETWEEN_US],

			needs: {
				[NEEDS.AFFECTION]: {},
				[NEEDS.APPRECIATION]: { whereMet: [BETWEEN_US, IN_ME] }, // received + internal taking-in
				[NEEDS.ATTENTION]: {},
				[NEEDS.CLOSENESS]: {},
				[NEEDS.CONNECTION]: {},
				[NEEDS.COMPANIONSHIP]: {},
				[NEEDS.HARMONY]: { whereMet: [BETWEEN_US, IN_ME] }, // relational field + internal settling
				[NEEDS.INTIMACY]: {},
				[NEEDS.LOVE]: { whereMet: [BETWEEN_US, IN_ME] }, // giving/receiving + inner connection
				[NEEDS.NURTURING]: { whereMet: [BETWEEN_US, IN_ME] },
				[NEEDS.SEXUAL_EXPRESSION]: {},
				[NEEDS.SUPPORT]: { whereMet: [BETWEEN_US, ENVIRONMENT, IN_ME] }, // people + resources + self-support
				[NEEDS.TENDERNESS]: {},
				[NEEDS.WARMTH]: {},
			},
		},

		[GROUPS.MATTERING]: {
			// Mattering often includes both relational recognition and internal self-mattering
			whereMet: [BETWEEN_US, IN_ME],

			needs: {
				[NEEDS.TO_MATTER]: {},
				[NEEDS.ACCEPTANCE]: {},
				[NEEDS.CARE]: { whereMet: [BETWEEN_US] },
				[NEEDS.COMPASSION]: { whereMet: [BETWEEN_US, IN_ME] }, // compassion from others + self-compassion
				[NEEDS.CONSIDERATION]: { whereMet: [BETWEEN_US] },
				[NEEDS.EMPATHY]: { whereMet: [BETWEEN_US] },
				[NEEDS.RESPECT]: { whereMet: [BETWEEN_US, IN_ME] },
				[NEEDS.ACKNOWLEDGEMENT]: { whereMet: [BETWEEN_US, IN_ME] },
				[NEEDS.TO_BE_HEARD]: { whereMet: [BETWEEN_US] },
				[NEEDS.TO_BE_SEEN]: { whereMet: [BETWEEN_US, IN_ME] },
				[NEEDS.TO_BE_KNOWN_UNDERSTOOD]: { whereMet: [BETWEEN_US] },
				[NEEDS.TO_BE_TRUSTED]: { whereMet: [BETWEEN_US, IN_ME] },
				[NEEDS.UNDERSTANDING_OTHERS]: { whereMet: [BETWEEN_US, IN_ME] }, // relationship + inner stance
				[NEEDS.MUTUAL_RECOGNITION]: { whereMet: [BETWEEN_US, IN_ME] },
				[NEEDS.KINDNESS]: { whereMet: [BETWEEN_US, IN_ME] },
			},
		},

		[GROUPS.COMMUNITY]: {
			whereMet: [BETWEEN_US],

			needs: {
				[NEEDS.COMMUNITY]: {},
				[NEEDS.BELONGING]: { whereMet: [BETWEEN_US, IN_ME] }, // membership + internal felt belonging
				[NEEDS.RELIABILITY]: { whereMet: [BETWEEN_US, ENVIRONMENT] }, // people + systems
				[NEEDS.COMMUNICATION]: { whereMet: [BETWEEN_US] },
				[NEEDS.COOPERATION]: { whereMet: [BETWEEN_US] },
				[NEEDS.EQUALITY]: { whereMet: [BETWEEN_US, ENVIRONMENT] }, // interpersonal + social structures
				[NEEDS.INCLUSION]: { whereMet: [BETWEEN_US, ENVIRONMENT] }, // group + structures
				[NEEDS.MUTUALITY]: { whereMet: [BETWEEN_US] },
				[NEEDS.PARTICIPATION]: { whereMet: [BETWEEN_US, ENVIRONMENT] }, // group + access
				[NEEDS.PARTNERSHIP]: { whereMet: [BETWEEN_US] },
				[NEEDS.SELF_EXPRESSION]: { whereMet: [IN_ME, BETWEEN_US] }, // inner truth + relational reception
				[NEEDS.SHARING]: { whereMet: [BETWEEN_US] },
			},
		},
	},

	meaning: {
		[GROUPS.SENSE_OF_SELF]: {
			whereMet: [IN_ME],

			needs: {
				[NEEDS.AUTHENTICITY]: {},
				[NEEDS.COMPETENCE]: { whereMet: [IN_ME, ENVIRONMENT] }, // inner capacity + opportunities/learning
				[NEEDS.CREATIVITY]: { whereMet: [IN_ME, LIFE, ENVIRONMENT] }, // inner + existential + materials/time
				[NEEDS.DIGNITY]: { whereMet: [IN_ME, BETWEEN_US] }, // self-regard + being treated with dignity
				[NEEDS.GROWTH]: { whereMet: [IN_ME, LIFE, ENVIRONMENT] }, // inner + life direction + opportunities
				[NEEDS.HEALING]: { whereMet: [IN_ME, ENVIRONMENT, BETWEEN_US] }, // body/nervous system + supports + relational repair
				[NEEDS.HONESTY]: { whereMet: [IN_ME, BETWEEN_US] }, // inner truth + relational truthfulness
				[NEEDS.INTEGRITY]: { whereMet: [IN_ME] },
				[NEEDS.SELF_ACCEPTANCE]: { whereMet: [IN_ME] },
				[NEEDS.SELF_CARE]: { whereMet: [IN_ME, ENVIRONMENT] }, // inner stance + practical conditions
				[NEEDS.SELF_CONNECTION]: { whereMet: [IN_ME] },
				[NEEDS.SELF_KNOWLEDGE]: { whereMet: [IN_ME] },
				[NEEDS.SELF_REALIZATION]: { whereMet: [IN_ME, LIFE] },
				[NEEDS.MATTERING_TO_MYSELF]: { whereMet: [IN_ME] },
			},
		},

		[GROUPS.UNDERSTANDING]: {
			// Understanding cluster is often inner + life; sometimes depends on learning/resources
			whereMet: [IN_ME, LIFE],

			needs: {
				[NEEDS.UNDERSTANDING]: { whereMet: [IN_ME, BETWEEN_US, LIFE] }, // understanding self/other/life
				[NEEDS.AWARENESS]: { whereMet: [IN_ME, LIFE] },
				[NEEDS.CLARITY]: { whereMet: [IN_ME, LIFE] }, // can be situational but typically internal coherence
				[NEEDS.DISCOVERY]: { whereMet: [IN_ME, LIFE] },
				[NEEDS.LEARNING]: { whereMet: [IN_ME, ENVIRONMENT] }, // inner + access to info/teachers
				[NEEDS.MAKING_SENSE_OF_LIFE]: { whereMet: [LIFE, IN_ME] },
				[NEEDS.STIMULATION]: { whereMet: [IN_ME, ENVIRONMENT] }, // inner + environment/input
			},
		},

		[GROUPS.MEANING_CORE]: {
			whereMet: [LIFE, IN_ME],

			needs: {
				[NEEDS.MEANING]: { whereMet: [LIFE, IN_ME] },
				[NEEDS.CHALLENGE]: { whereMet: [LIFE, ENVIRONMENT, IN_ME] }, // life direction + opportunities + inner stretch
				[NEEDS.ALIVENESS]: { whereMet: [LIFE, IN_ME] },
				[NEEDS.CONSCIOUSNESS]: { whereMet: [LIFE, IN_ME] },
				[NEEDS.CONTRIBUTION]: { whereMet: [LIFE, BETWEEN_US, ENVIRONMENT] }, // purpose + people + structures
				[NEEDS.EFFECTIVENESS]: { whereMet: [ENVIRONMENT, IN_ME] }, // doing + capability
				[NEEDS.EXPLORATION]: { whereMet: [LIFE, ENVIRONMENT, IN_ME] },
				[NEEDS.INTEGRATION]: { whereMet: [LIFE, IN_ME] },
				[NEEDS.PURPOSE]: { whereMet: [LIFE, IN_ME] },
			},
		},

		[GROUPS.TRANSCENDENCE]: {
			whereMet: [LIFE, IN_ME],

			needs: {
				[NEEDS.BEAUTY]: { whereMet: [LIFE, ENVIRONMENT, IN_ME] }, // nature/art (environment) + inner receiving
				[NEEDS.CELEBRATION_OF_LIFE]: { whereMet: [LIFE, BETWEEN_US, IN_ME] },
				[NEEDS.COMMUNION]: { whereMet: [LIFE, BETWEEN_US, IN_ME] },
				[NEEDS.FAITH]: { whereMet: [LIFE, IN_ME] },
				[NEEDS.FLOW]: { whereMet: [IN_ME, ENVIRONMENT, LIFE] }, // state + conditions + meaning
				[NEEDS.HOPE]: { whereMet: [LIFE, IN_ME] },
				[NEEDS.MOURNING]: { whereMet: [LIFE, IN_ME, BETWEEN_US] }, // grief process + shared loss
				[NEEDS.PEACE_INTERNAL]: { whereMet: [IN_ME, LIFE] },
				[NEEDS.PRESENCE]: { whereMet: [IN_ME, LIFE] },
			},
		},
	},

	freedom: {
		[GROUPS.AUTONOMY]: {
			whereMet: [IN_ME],

			needs: {
				[NEEDS.FREEDOM]: { whereMet: [IN_ME, ENVIRONMENT, BETWEEN_US] }, // inner agency + constraints + others
				[NEEDS.AUTONOMY]: { whereMet: [IN_ME, BETWEEN_US] },
				[NEEDS.CHOICE]: { whereMet: [IN_ME, ENVIRONMENT, BETWEEN_US] },
				[NEEDS.EASE]: { whereMet: [IN_ME, ENVIRONMENT] },
				[NEEDS.INDEPENDENCE]: { whereMet: [IN_ME, BETWEEN_US] },
				[NEEDS.AGENCY]: { whereMet: [IN_ME] },
				[NEEDS.SELF_RESPONSIBLITY]: { whereMet: [IN_ME] },
				[NEEDS.SPACE]: { whereMet: [IN_ME, ENVIRONMENT, BETWEEN_US] },
				[NEEDS.SPONTANEITY]: { whereMet: [IN_ME, ENVIRONMENT] },
			},
		},

		[GROUPS.LEISURE]: {
			whereMet: [IN_ME, ENVIRONMENT],

			needs: {
				[NEEDS.HUMOUR]: { whereMet: [BETWEEN_US, IN_ME] },
				[NEEDS.JOY]: { whereMet: [IN_ME, LIFE, BETWEEN_US] },
				[NEEDS.PLAY]: { whereMet: [IN_ME, BETWEEN_US, ENVIRONMENT] },
				[NEEDS.PLEASURE]: { whereMet: [IN_ME, ENVIRONMENT] },
				[NEEDS.REJUVENATION]: { whereMet: [IN_ME, ENVIRONMENT] },
			},
		},
	},
};
