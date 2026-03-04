import { NEEDS } from "./NeedsConstants.js";

export const UNPACKING_TYPE = Object.freeze({
	PRACTICAL: "practical",
	RELATIONAL_FIELD: "relational_field",
	PROTECTIVE_SAFETY: "protective_safety",
	AGENCY_AUTONOMY: "agency_autonomy",
	EXISTENTIAL_EXPANSIVE: "existential_expansive",
	INTEGRITY_IDENTITY: "integrity_identity",
});

export const unpackingTypeData = {
	[UNPACKING_TYPE.PRACTICAL]: {
		meaning:
			"This need is usually straightforward and practical. It rarely masks something deeper and typically benefits from concrete clarification rather than layered probing.",
		phase0Focus: "Light check only — is this purely practical, or is there an emotional layer underneath?",
		questions: ["Is this mostly practical and straightforward — or is there also something emotional under it?"],
		needsGuesses: [], // usually none needed
	},

	[UNPACKING_TYPE.RELATIONAL_FIELD]: {
		meaning:
			"This need lives in the space between people. Under activation, it can tangle into protest, blame, or longing for reassurance rather than clear connection.",
		phase0Focus: "Looking for whether this is about connection, protection from disconnection, or reassurance.",
		questions: [
			"When you say {need}, is it more about connection — or protection from disconnection?",
			"Is it more about being understood — or getting agreement?",
			"Is there something you're longing to know about their care for you?",
		],
		needsGuesses: [
			NEEDS.CONNECTION,
			NEEDS.EMPATHY,
			NEEDS.TO_BE_HEARD,
			NEEDS.TO_BE_SEEN,
			NEEDS.MUTUALITY,
			NEEDS.CONSIDERATION,
			NEEDS.RELIABILITY,
			NEEDS.SUPPORT,
		],
	},

	[UNPACKING_TYPE.PROTECTIVE_SAFETY]: {
		meaning:
			"This need often activates when something feels threatened or unsafe. It can tighten around fear, bracing, or nervous-system protection.",
		phase0Focus: "Looking for what feels threatened, unsafe, or at risk beneath this.",
		questions: [
			"When you say {need}, what feels at risk or unsafe right now — even slightly?",
			"Is this mostly about the outside feeling steady, or your nervous system feeling steadier?",
			"If this need had a tender message, might it be: 'I want to feel safe / settled'?",
		],
		needsGuesses: [
			NEEDS.SAFETY_EMOTIONAL,
			NEEDS.PROTECTION,
			NEEDS.STABILITY,
			NEEDS.PEACE_OF_MIND,
			NEEDS.ORDER_STRUCTURE,
			NEEDS.TRUSTING,
		],
	},

	[UNPACKING_TYPE.AGENCY_AUTONOMY]: {
		meaning:
			"This need often arises when there is a sense of constraint, control, or loss of choice. It can tangle into protest or rigidity around independence.",
		phase0Focus: "Looking for where choice, permission, or boundaries may be restricted.",
		questions: [
			"When you say {need}, where do you feel constrained or controlled?",
			"Is this about having options — or having the right to say no?",
			"Is there a boundary or permission you're longing for here?",
		],
		needsGuesses: [
			NEEDS.AUTONOMY,
			NEEDS.CHOICE,
			NEEDS.AGENCY,
			NEEDS.SPACE,
			NEEDS.SELF_RESPONSIBLITY,
			NEEDS.DIGNITY,
			NEEDS.INDEPENDENCE,
		],
	},

	[UNPACKING_TYPE.EXISTENTIAL_EXPANSIVE]: {
		meaning:
			"This need is broad and existential. Under activation, it can become diffuse, abstract, or overwhelming. It usually benefits from grounding rather than probing for something underneath.",
		phase0Focus: "Grounding abstraction into lived experience rather than searching for a deeper layer.",
		questions: [
			"When you say {need}, what would be different in your lived experience if it were present?",
			"Is this about direction (purpose) — or about aliveness (feeling lit up)?",
			"Does this feel like emptiness — or like disconnection from what matters?",
		],
		needsGuesses: [
			NEEDS.MEANING,
			NEEDS.PURPOSE,
			NEEDS.ALIVENESS,
			NEEDS.HOPE,
			NEEDS.PRESENCE,
			NEEDS.MAKING_SENSE_OF_LIFE,
			NEEDS.INTEGRATION,
			NEEDS.FAITH,
		],
	},

	[UNPACKING_TYPE.INTEGRITY_IDENTITY]: {
		meaning:
			"This need relates to self-worth, alignment, and inner coherence. Under activation, it can tangle into shame, self-judgment, or identity contraction.",
		phase0Focus: "Looking for dignity, self-alignment, or unacknowledged grief underneath.",
		questions: [
			"When you say {need}, is there a part of you asking to be on your own side?",
			"Is this about staying aligned with what you value — or repairing something inside?",
			"Is there grief or tenderness under this that wants acknowledgement?",
		],
		needsGuesses: [
			NEEDS.DIGNITY,
			NEEDS.INTEGRITY,
			NEEDS.SELF_ACCEPTANCE,
			NEEDS.HEALING,
			NEEDS.MOURNING,
			NEEDS.MATTERING_TO_MYSELF,
			NEEDS.SELF_CONNECTION,
		],
	},
};

export default unpackingTypeData;
