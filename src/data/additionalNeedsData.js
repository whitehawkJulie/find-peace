// this file brings in ideas like
// - some needs, when chosen, are likely to be signals of dysregulation rather than specific needs
// - some needs, when chosen, are likely to be about blocked agency rather than unmet needs
// - for certain needs, there are common guesses about what might be underneath

import { NEEDS } from "./needsData";

export const needsMeta = {
	respect: {
		// Often framed in blame or moral judgment; usually summarises several relational experiences
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["acknowledgement", "to be heard", "dignity", "competence", "to be trusted", "equality"],
	},

	understanding: {
		// Can mean emotional empathy or intellectual clarity; often hides several experiences
		dysregulationSignal: true,
		agencyBlocked: false,
		needsGuesses: ["empathy", "clarity", "to be heard", "to be known", "learning"],
	},

	connection: {
		// Broad relational umbrella; often selected when relational safety feels threatened
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["closeness", "companionship", "intimacy", "belonging", "communication"],
	},

	support: {
		// Can mean emotional care or practical assistance; often chosen when someone feels overwhelmed
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["care", "empathy", "companionship", "practical help", "encouragement"],
	},

	safety_emotional: {
		// Signals nervous system threat; often about reassurance, trust, or predictability
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["trusting", "stability", "protection", "acceptance", "reassurance"],
	},

	peace_of_mind: {
		// Often reflects anxiety or rumination rather than a concrete need
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["clarity", "predictability", "stability", "trusting"],
	},

	stability: {
		// Usually about predictability and reliability in environment or relationships
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["reliability", "order_structure", "trusting", "safety_emotional"],
	},

	harmony: {
		// Often means wanting conflict to stop; can hide needs for understanding or acceptance
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["understanding", "acceptance", "cooperation", "communication"],
	},

	belonging: {
		// Strong social safety signal; often activated when exclusion is feared
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["acceptance", "inclusion", "community", "mutuality"],
	},

	love: {
		// Emotionally powerful umbrella word that can hide many relational needs
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["affection", "care", "warmth", "closeness", "tenderness"],
	},

	trusting: {
		// Often signals relational fear or uncertainty
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["honesty", "reliability", "transparency", "stability"],
	},

	freedom: {
		// Very broad umbrella; often means autonomy or choice
		dysregulationSignal: false,
		agencyBlocked: false,
		needsGuesses: ["autonomy", "choice", "space", "agency"],
	},

	meaning: {
		// Philosophical umbrella; usually resolves into purpose or contribution
		dysregulationSignal: false,
		agencyBlocked: true,
		needsGuesses: ["purpose", "contribution", "integration", "making_sense_of_life"],
	},

	purpose: {
		// Often tied to direction or impact in life
		dysregulationSignal: false,
		agencyBlocked: false,
		needsGuesses: ["contribution", "effectiveness", "meaning"],
	},

	community: {
		// Social structure umbrella rather than a specific experience
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["belonging", "participation", "mutuality", "cooperation"],
	},

	to_matter: {
		// Signals desire for recognition and significance
		dysregulationSignal: true,
		agencyBlocked: true,
		needsGuesses: ["acknowledgement", "appreciation", "to_be_seen", "to_be_heard"],
	},
};
