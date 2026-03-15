/**
 * AllNeedsFlat.js
 * ─────────────────────────────────────────────────────────────────
 * Flat list of all needs, one object per need.
 *
 * Schema per need:
 *   id                   – snake_case identifier
 *   label                – display string (must match NEEDS constants exactly)
 *   family               – top-level category: "Subsistence" | "Connection" | "Meaning" | "Freedom"
 *   category             – group heading (e.g. "Affection", "To matter")
 *   tags.whereMet        – WHERE_MET string values (see whereMetData.js)
 *   tags.themes          – UNPACKING_TYPE string values (see unpackingTypeData.js)
 *   coreQuestion         – main clarifying question shown in NeedUnpacking (editable)
 *   differentiationQuestions – array of 0‑2 follow-up questions (editable)
 *   helpText             – short phrase shown in the need picker
 */

// ─── WHERE_MET VALUES ────────────────────────────────────────────
const IN_ME = "inMe";
const BETWEEN_US = "betweenUs";
const ENV = "environment";
const LIFE = "life";

// ─── THEME VALUES ────────────────────────────────────────────────
// const PRACTICAL = "practical";          // (not used in diff-Q logic)
// const RELATIONAL = "relational_field";
// const SAFETY = "protective_safety";
// const AGENCY = "agency_autonomy";
// const EXISTENTIAL = "existential_expansive";
// const IDENTITY = "integrity_identity";

export const allNeeds = [
	// ═══════════════════════════════════════════════════════════
	// SUBSISTENCE — Physical sustenance
	// ═══════════════════════════════════════════════════════════
	{
		id: "air",
		label: "Air",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [ENV], themes: ["practical"] },
		coreQuestion: "Is this about the air around you, or about the feeling of being able to breathe easily?",
		helpText: "Clean air to breathe",
	},
	{
		id: "food",
		label: "Food",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [ENV], themes: ["practical"] },
		coreQuestion: "Is this about having enough food, or about the quality and nourishment of what you're eating?",
		helpText: "Nourishing and satisfying meals",
	},
	{
		id: "health",
		label: "Health",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [IN_ME, ENV], themes: ["practical"] },
		coreQuestion:
			"What aspect of your health feels most present right now — energy, pain, physical capacity, or something else?",
		directionPrompts: {
			[IN_ME]:
				"You might notice what your body is most needing from you right now — care, gentleness, rest, or attention.",
			[ENV]: "You might explore what practical conditions, resources, or support would most help your health right now.",
		},
		helpText: "Physical well-being",
	},
	{
		id: "movement",
		label: "Movement",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [IN_ME, ENV], themes: ["practical", "agency_autonomy"] },
		coreQuestion:
			"What kind of movement is calling you — exercise, freedom to go somewhere, or simply not feeling stuck?",
		directionPrompts: {
			[IN_ME]:
				"You might notice what kind of movement your body wants right now — stretching, walking, shifting position, or something else.",
			[ENV]: "You might explore what practical changes would give you more freedom or room to move.",
		},
		helpText: "Freedom to move and be active",
	},
	{
		id: "physical_safety",
		label: "Physical Safety",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [ENV], themes: ["protective_safety"] },
		coreQuestion:
			"Is there a specific physical threat, or more of a general need to feel safe in your body and surroundings?",
		helpText: "Freedom from physical harm",
	},
	{
		id: "rest_sleep",
		label: "Rest / sleep",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [IN_ME, ENV], themes: ["practical"] },
		coreQuestion:
			"Is this about literal sleep, or about a deeper kind of rest — permission to stop and not be productive for a while?",
		directionPrompts: {
			[IN_ME]:
				"You might notice whether what’s most needed is sleep, stillness, permission to stop, or relief from inner pressure.",
			[ENV]: "You might explore what practical conditions would make rest more possible right now.",
		},
		helpText: "Deep rest and renewal",
	},
	{
		id: "shelter",
		label: "Shelter",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [ENV], themes: ["practical"] },
		coreQuestion: "Is this about having a physical place to live, or about feeling at home and settled somewhere?",
		helpText: "Safe and secure housing",
	},
	{
		id: "touch",
		label: "Touch",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field"] },
		coreQuestion:
			"What kind of touch are you longing for — a hug, a hand on your shoulder, or simply being physically close to someone?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you’re longing for comfort, closeness, reassurance, or simple physical presence from someone.",
			[IN_ME]: "You might explore whether there’s a way to bring your body some comfort or soothing right now.",
		},
		helpText: "Comforting physical contact",
	},
	{
		id: "water",
		label: "Water",
		family: "Subsistence",
		category: "Physical sustenance",
		tags: { whereMet: [ENV], themes: ["practical"] },
		coreQuestion: "Is this about literal access to water, or about your basic needs not being met?",
		helpText: "Clean water for drinking and hygiene",
	},

	// ═══════════════════════════════════════════════════════════
	// SUBSISTENCE — Security
	// ═══════════════════════════════════════════════════════════
	{
		id: "order_structure",
		label: "Order/Structure",
		family: "Subsistence",
		category: "Security",
		tags: { whereMet: [ENV, IN_ME], themes: ["protective_safety"] },
		coreQuestion:
			"Is this about wanting things around you to be organised, or about an inner sense of knowing what comes next?",
		directionPrompts: {
			[ENV]: "You might explore what practical structure, order, or support would help things feel more manageable.",
			[IN_ME]:
				"You might notice whether what’s most needed is inner steadiness, predictability, or a clearer sense of what comes next.",
		},
		helpText: "Clarity and organization",
	},
	{
		id: "peace_external",
		label: "Peace (external)",
		family: "Subsistence",
		category: "Security",
		tags: { whereMet: [ENV], themes: ["protective_safety"] },
		coreQuestion:
			"Is this about wanting the conflict around you to stop, or about finding a way to feel less affected by it?",
		helpText: "Safety from external conflict",
	},
	{
		id: "peace_of_mind",
		label: "Peace of mind",
		family: "Subsistence",
		category: "Security",
		tags: { whereMet: [IN_ME], themes: ["protective_safety"] },
		coreQuestion:
			"What’s disturbing your peace of mind right now — worry about the future, regret about the past, or something unresolved?",
		helpText: "Freedom from internal turmoil",
	},
	{
		id: "protection",
		label: "Protection",
		family: "Subsistence",
		category: "Security",
		tags: { whereMet: [ENV], themes: ["protective_safety"] },
		coreQuestion: "What are you wanting protection from — a person, a situation, or your own feelings?",
		helpText: "Being guarded from harm",
	},
	{
		id: "safety_emotional",
		label: "Safety (emotional)",
		family: "Subsistence",
		category: "Security",
		tags: { whereMet: [IN_ME, BETWEEN_US], themes: ["protective_safety"] },
		coreQuestion:
			"What would emotional safety look like here — being able to say what you feel without being judged, or knowing you won’t be hurt for being open?",
		directionPrompts: {
			[IN_ME]:
				"You might notice what would help you feel safer inside yourself right now — self-trust, steadiness, gentleness, or permission.",
			[BETWEEN_US]:
				"You might explore what would help this relationship feel safer — more care, less judgment, clearer boundaries, or more openness.",
		},
		helpText: "Freedom to be emotionally vulnerable",
	},
	{
		id: "stability",
		label: "Stability",
		family: "Subsistence",
		category: "Security",
		tags: {
			whereMet: [ENV, IN_ME, BETWEEN_US],
			themes: ["protective_safety", "relational_field", "practical"],
		},
		coreQuestion:
			"What part of your life feels unsteady right now — practical things, a relationship, or your own inner state?",
		differentiationQuestions: [
			"Is the instability mainly in practical circumstances, in a relationship, or in your inner state?",
		],
		directionPrompts: {
			[ENV]: "You might explore what practical support or steadier conditions would help life feel more stable.",
			[IN_ME]:
				"You might notice what would help you feel more settled inside — grounding, reassurance, rhythm, or rest.",
			[BETWEEN_US]: "You might explore what would make this relationship feel more steady or dependable.",
		},
		helpText: "Steadiness in life circumstances",
	},
	{
		id: "trusting",
		label: "Trusting",
		family: "Subsistence",
		category: "Security",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["protective_safety", "relational_field"] },
		coreQuestion:
			"Is this about trusting a specific person, or about a more general sense that things will be okay?",
		differentiationQuestions: [
			"Is this about trusting this person, or about trusting that things will be okay overall?",
		],
		directionPrompts: {
			[BETWEEN_US]:
				"You might explore what would help this person feel more trustworthy — consistency, honesty, care, or follow-through.",
			[IN_ME]: "You might notice what would help you feel more able to trust yourself or life right now.",
		},
		helpText: "Confidence in people and systems",
	},

	// ═══════════════════════════════════════════════════════════
	// CONNECTION — Affection
	// ═══════════════════════════════════════════════════════════
	{
		id: "affection",
		label: "Affection",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"What kind of affection are you longing for — words, gestures, physical warmth, or simply knowing someone cares?",
		helpText: "Expressions of emotional warmth and connection",
	},
	{
		id: "appreciation",
		label: "Appreciation",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field", "integrity_identity"] },
		coreQuestion:
			"What would appreciation look like here — being thanked, being noticed, or having your effort acknowledged?",
		differentiationQuestions: [
			"Is this more about being appreciated by someone else, or about recognising your own worth?",
		],
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you're longing for recognition, gratitude, or acknowledgment from someone.",
			[IN_ME]: "You might explore whether there's a way to recognise your own effort or value here.",
		},
		helpText: "Being seen and valued",
	},
	{
		id: "attention",
		label: "Attention",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"When you say you need attention, is it about someone being present with you, or about feeling like you matter enough to be noticed?",
		helpText: "Being genuinely noticed",
	},
	{
		id: "closeness",
		label: "Closeness",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion: "Is this about physical closeness, emotional closeness, or both?",
		helpText: "Emotional and/or physical intimacy",
	},
	{
		id: "connection",
		label: "Connection",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is this connection to a specific person, to a group, or to something bigger — life, nature, or meaning?",
		helpText: "Feeling linked to others and to life",
	},
	{
		id: "companionship",
		label: "Companionship",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion: "Is this about having someone to do things with, or about not feeling alone in your experience?",
		helpText: "Enjoying life with others",
	},
	{
		id: "harmony",
		label: "Harmony",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field", "protective_safety"] },
		coreQuestion:
			"Is the harmony you're wanting about people getting along, or about feeling at ease in your relationships?",
		directionPrompts: {
			[BETWEEN_US]: "You might explore what would help this relationship feel more cooperative or peaceful.",
			[IN_ME]: "You might notice what would help you feel more at ease or settled in this relationship.",
		},
		helpText: "Cooperation and mutual support",
	},
	{
		id: "intimacy",
		label: "Intimacy",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"What does intimacy mean for you here — emotional openness, physical closeness, or the feeling of being truly known?",
		helpText: "Mutual vulnerability and closeness",
	},
	{
		id: "love",
		label: "Love",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field"] },
		coreQuestion:
			"When you notice this need for love, is it about receiving it, giving it, or knowing it’s there even when it isn’t being said?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you're longing to receive love, express love, or feel reassured that it’s there.",
			[IN_ME]:
				"You might explore whether there’s a way to bring more kindness or care toward yourself right now.",
		},
		helpText: "Unconditional acceptance and care",
	},
	{
		id: "nurturing",
		label: "Nurturing",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field"] },
		coreQuestion: "Are you wanting to be nurtured by someone, or noticing a need to nurture yourself?",
		directionPrompts: {
			[BETWEEN_US]: "You might notice what kind of care or gentleness you’re hoping to receive from someone.",
			[IN_ME]: "You might explore whether there’s a way to bring yourself some care or gentleness right now.",
		},
		helpText: "Care that supports growth and healing",
	},
	{
		id: "sexual_expression",
		label: "Sexual expression",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is this about physical desire, about feeling wanted, or about a deeper sense of aliveness with another person?",
		helpText: "Authentic physical intimacy",
	},
	{
		id: "support",
		label: "Support",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US, ENV, IN_ME], themes: ["relational_field", "practical"] },
		coreQuestion:
			"What kind of support would help most — someone to listen, practical help, or simply knowing someone has your back?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you're longing for emotional support, understanding, or someone simply being there with you.",
			[ENV]: "You might explore what practical help, resources, or changes would make things easier.",
			[IN_ME]:
				"You might notice whether there's a way to support yourself with encouragement, kindness, or clarity.",
		},
		helpText: "Practical or emotional backing",
	},
	{
		id: "tenderness",
		label: "Tenderness",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"What would tenderness look like here — a softer tone, a gentle gesture, or someone being especially careful with you?",
		helpText: "Gentle, caring touch or tone",
	},
	{
		id: "warmth",
		label: "Warmth",
		family: "Connection",
		category: "Affection",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is the warmth you're wanting from a specific person, or about the overall atmosphere around you?",
		helpText: "A sense of friendliness and care",
	},

	// ═══════════════════════════════════════════════════════════
	// CONNECTION — To matter
	// ═══════════════════════════════════════════════════════════
	{
		id: "to_matter",
		label: "To matter",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["integrity_identity", "relational_field"] },
		coreQuestion: "Who do you most want to matter to right now — someone else, or yourself?",
		directionPrompts: {
			[BETWEEN_US]: "You might notice what would help you feel valued or important to this person.",
			[IN_ME]: "You might explore what would help you recognise your own worth or significance here.",
		},
		helpText: "To know that I am valued",
	},
	{
		id: "acceptance",
		label: "Acceptance",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["integrity_identity", "relational_field"] },
		coreQuestion:
			"What part of you is wanting acceptance right now — a decision you made, something you feel, or simply who you are?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you're longing for someone to accept a part of you that feels vulnerable or exposed.",
			[IN_ME]: "You might explore whether there's a way to bring more acceptance toward yourself right now.",
		},
		helpText: "Welcomed just as I am",
	},
	{
		id: "care",
		label: "Care",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"What would care look like in this situation — someone checking in, offering help, or simply noticing that you're struggling?",
		helpText: "Concern for my well-being",
	},
	{
		id: "compassion",
		label: "Compassion",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field"] },
		coreQuestion:
			"Are you wanting compassion from someone else, or noticing you need more compassion toward yourself?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you're longing for someone to respond with understanding and warmth toward your pain.",
			[IN_ME]:
				"You might explore whether there's a way to bring yourself some gentleness or understanding right now.",
		},
		helpText: "Understanding and warmth in response to suffering",
	},
	{
		id: "consideration",
		label: "Consideration",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is this about someone thinking of you before acting, or about your needs being included in a decision?",
		helpText: "Having my needs factored in",
	},
	{
		id: "empathy",
		label: "Empathy",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is this about someone understanding what it's like for you, or about them feeling emotionally with you?",
		helpText: "Emotional resonance and understanding",
	},
	{
		id: "respect",
		label: "Respect",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field", "integrity_identity"] },
		coreQuestion:
			"What would respect look like here — being spoken to differently, having your boundaries honoured, or your perspective taken seriously?",
		directionPrompts: {
			[BETWEEN_US]: "You might notice what behaviour from this person would signal respect to you.",
			[IN_ME]: "You might explore how you could honour your own boundaries or values here.",
		},
		helpText: "Being valued and honored",
	},
	{
		id: "acknowledgement",
		label: "Acknowledgement",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field", "integrity_identity"] },
		coreQuestion:
			"What would acknowledgement look like — someone recognising what you did, what you went through, or what you're feeling?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you're longing for someone to recognise your effort, experience, or feelings.",
			[IN_ME]: "You might explore whether there’s a way to acknowledge your own experience or effort.",
		},
		helpText: "Having your experience or contribution recognised",
	},
	{
		id: "to_be_heard",
		label: "To be heard",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is this about someone listening all the way through, or about knowing your words are actually landing and influencing what happens next?",
		helpText: "To know my words are received and taken in",
	},
	{
		id: "to_be_seen",
		label: "To be seen",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field", "integrity_identity"] },
		coreQuestion:
			"Is this about being noticed and recognised, or about someone really understanding what it's like to be you right now?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you're longing for someone to recognise your experience or presence.",
			[IN_ME]: "You might explore whether there's a way to recognise and honour your own experience.",
		},
		helpText: "To have my experience and presence acknowledged",
	},
	{
		id: "to_be_known_understood",
		label: "To be known & understood",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is this about being understood in this moment, or about someone understanding you deeply over time?",
		helpText: "Deep recognition of who I am",
	},
	{
		id: "to_be_trusted",
		label: "To be trusted",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field", "protective_safety"] },
		coreQuestion:
			"Is this about someone believing in your honesty or capability, or about feeling able to trust yourself?",
		directionPrompts: {
			[BETWEEN_US]: "You might notice what behaviour from this person would signal trust in you.",
			[IN_ME]: "You might explore whether there's a way to trust your own judgment or intentions more here.",
		},
		helpText: "Confidence placed in me",
	},
	{
		id: "understanding_others",
		label: "Understanding others",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field"] },
		coreQuestion:
			"Is this about understanding a specific person, or about a more general wish to connect through understanding?",
		directionPrompts: {
			[BETWEEN_US]: "You might explore what might help you understand this person's experience more clearly.",
			[IN_ME]: "You might notice what would support your own openness or curiosity here.",
		},
		helpText: "Being able to grasp others' experience",
	},
	{
		id: "mutual_recognition",
		label: "Mutual Recognition",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field", "integrity_identity"] },
		coreQuestion:
			"Is this about both of you seeing each other clearly, or about the absence of that — feeling invisible while the other person isn’t really looking?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might explore what would help both of you recognise and understand each other more clearly.",
			[IN_ME]:
				"You might notice whether there's a way to hold onto your own sense of self even if the other person doesn't see you clearly.",
		},
		helpText: "Seeing and being seen by another",
	},
	{
		id: "kindness",
		label: "Kindness",
		family: "Connection",
		category: "To matter",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field"] },
		coreQuestion:
			"What would kindness look like right now — a gentle word, a thoughtful action, or simply the absence of harshness?",
		directionPrompts: {
			[BETWEEN_US]: "You might notice what behaviour from this person would feel kind or considerate to you.",
			[IN_ME]: "You might explore whether there's a way to bring more gentleness toward yourself in this moment.",
		},
		helpText: "Gentle and benevolent care",
	},

	// ═══════════════════════════════════════════════════════════
	// CONNECTION — Community
	// ═══════════════════════════════════════════════════════════
	{
		id: "community",
		label: "Community",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"What kind of community are you longing for — people who share your interests, your values, or simply a sense of being part of something?",
		helpText: "Belonging to a group",
	},
	{
		id: "belonging",
		label: "Belonging",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["relational_field", "protective_safety"] },
		coreQuestion: "Where do you most want to belong right now — a group, a place, or with a particular person?",
		directionPrompts: {
			[BETWEEN_US]: "You might notice what would help you feel welcomed or included with these people.",
			[IN_ME]: "You might explore what would help you feel more at home or secure within yourself.",
		},
		helpText: "Feeling part of something",
	},
	{
		id: "reliability",
		label: "Reliability",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US, ENV], themes: ["relational_field", "protective_safety"] },
		coreQuestion:
			"Is this about wanting someone to follow through consistently, or about needing systems or conditions you can depend on?",
		differentiationQuestions: [
			"Is this mainly about a person’s follow-through, or about needing more dependable systems or conditions?",
		],
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice what kind of follow-through or consistency you are hoping for from this person.",
			[ENV]: "You might explore what structures or systems would make things feel more dependable.",
		},
		helpText: "Steady, predictable follow-through over time",
	},
	{
		id: "communication",
		label: "Communication",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion: "Is this about expressing yourself clearly, being heard, or wanting more open dialogue?",
		helpText: "Sharing and receiving information",
	},
	{
		id: "cooperation",
		label: "Cooperation",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field", "practical"] },
		coreQuestion:
			"Is this about wanting others to work with you, or about feeling like you're pulling in the same direction?",
		helpText: "Working together toward common goals",
	},
	{
		id: "equality",
		label: "Equality",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US, ENV], themes: ["relational_field", "integrity_identity"] },
		coreQuestion:
			"Is this about being treated as an equal in a specific relationship, or about fairness in a wider sense?",
		directionPrompts: {
			[BETWEEN_US]: "You might notice what would help this relationship feel more balanced or respectful.",
			[ENV]: "You might explore what fairness or equality would look like in the wider situation.",
		},
		helpText: "Equal worth and rights for all",
	},
	{
		id: "inclusion",
		label: "Inclusion",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US, ENV], themes: ["relational_field"] },
		coreQuestion: "Is this about being actively invited in, or about not being left out?",
		differentiationQuestions: [
			"Is this more about inclusion with particular people, or about wider conditions making participation harder?",
		],
		directionPrompts: {
			[BETWEEN_US]: "You might notice what would help you feel welcomed or included with these people.",
			[ENV]: "You might explore what changes in the wider environment would allow you to participate more fully.",
		},
		helpText: "Being actively welcomed",
	},
	{
		id: "mutuality",
		label: "Mutuality",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is this about wanting more balance in what you give and receive, or about the other person showing they're invested too?",
		helpText: "Reciprocal give and take",
	},
	{
		id: "participation",
		label: "Participation",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US, ENV], themes: ["relational_field"] },
		coreQuestion:
			"Is this about wanting to be included in activities or decisions, or about having a role that matters?",
		differentiationQuestions: [
			"Is this mainly about participation with particular people, or about wider conditions that affect whether you can join in?",
		],
		directionPrompts: {
			[BETWEEN_US]: "You might notice what would help you feel more included or involved with these people.",
			[ENV]: "You might explore what changes would allow you to participate more fully.",
		},
		helpText: "Being involved and engaged",
	},
	{
		id: "partnership",
		label: "Partnership",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion:
			"Is this about sharing the load with someone, making decisions together, or feeling like you're a team?",
		helpText: "Collaborative and shared efforts",
	},
	{
		id: "self_expression",
		label: "Self-expression",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [IN_ME, BETWEEN_US], themes: ["integrity_identity", "relational_field"] },
		coreQuestion:
			"What part of yourself are you wanting to express — your feelings, your creativity, your opinions, or something you've been holding back?",
		directionPrompts: {
			[IN_ME]: "You might notice what would help you feel more free or confident expressing yourself.",
			[BETWEEN_US]: "You might explore what would make it safer or easier to express yourself with these people.",
		},
		helpText: "Freedom to express who I am",
	},
	{
		id: "sharing",
		label: "Sharing",
		family: "Connection",
		category: "Community",
		tags: { whereMet: [BETWEEN_US], themes: ["relational_field"] },
		coreQuestion: "Is this about sharing experiences together, sharing resources, or sharing what's in your heart?",
		helpText: "Mutual giving and receiving",
	},

	// ═══════════════════════════════════════════════════════════
	// MEANING — Sense of self
	// ═══════════════════════════════════════════════════════════
	{
		id: "authenticity",
		label: "Authenticity",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME], themes: ["integrity_identity"] },
		coreQuestion:
			"Is there something you're holding back or pretending about? What would it look like to be more yourself here?",
		helpText: "Being true to myself",
	},
	{
		id: "competence",
		label: "Competence",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME, ENV], themes: ["integrity_identity", "practical"] },
		coreQuestion:
			"Is this about wanting to feel capable, or about having the conditions and support to act capably?",
		directionPrompts: {
			[IN_ME]: "You might notice what would help you feel more confident or able in yourself right now.",
			[ENV]: "You might explore what support, tools, or conditions would help your competence come through more easily.",
		},
		helpText: "Feeling capable and skilled",
	},
	{
		id: "creativity",
		label: "Creativity",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME, LIFE, ENV], themes: ["integrity_identity", "existential_expansive"] },
		coreQuestion:
			"What kind of creativity is calling you — making something, solving a problem in a new way, or simply having space to imagine?",
		directionPrompts: {
			[IN_ME]: "You might notice what wants to be expressed or explored in you right now.",
			[LIFE]: "You might explore how creativity connects to aliveness, meaning, or the wider shape of your life.",
			[ENV]: "You might notice what time, space, tools, or freedom would support your creativity.",
		},
		helpText: "Expressing imagination and originality",
	},
	{
		id: "dignity",
		label: "Dignity",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME, BETWEEN_US], themes: ["integrity_identity"] },
		coreQuestion: "Has something happened that felt undignified? What would help restore your sense of worth here?",
		directionPrompts: {
			[IN_ME]: "You might notice what would help you reconnect with your own worth or self-respect.",
			[BETWEEN_US]:
				"You might explore what response or behaviour from this person would help restore dignity here.",
		},
		helpText: "Inherent worth and self-respect",
	},
	{
		id: "growth",
		label: "Growth",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME, LIFE, ENV], themes: ["integrity_identity", "existential_expansive"] },
		coreQuestion:
			"What kind of growth are you wanting — learning something new, becoming more yourself, or moving past something that’s been holding you back?",
		directionPrompts: {
			[IN_ME]: "You might notice what inner shift, learning, or courage is wanting to emerge in you.",
			[LIFE]: "You might explore how this growth connects to the wider direction or unfolding of your life.",
			[ENV]: "You might notice what support, structure, or opportunity would make growth more possible.",
		},
		helpText: "Development and evolution",
	},
	{
		id: "healing",
		label: "Healing",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME, ENV, BETWEEN_US], themes: ["integrity_identity", "protective_safety"] },
		coreQuestion:
			"What are you wanting to heal from — something recent, something old, or something you can't quite name yet?",
		directionPrompts: {
			[IN_ME]:
				"You might notice what kind of inner healing feels most needed — gentleness, grieving, self-understanding, or time.",
			[ENV]: "You might explore what support, care, or practical conditions would help healing happen.",
			[BETWEEN_US]:
				"You might notice whether healing here involves repair, care, or a different kind of relationship with this person.",
		},
		helpText: "Moving toward wholeness",
	},
	{
		id: "honesty",
		label: "Honesty",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME, BETWEEN_US], themes: ["integrity_identity", "relational_field"] },
		coreQuestion:
			"Is this about wanting someone to be honest with you, or about wanting to be more honest yourself?",
		directionPrompts: {
			[IN_ME]: "You might notice what truth in you wants to be faced or spoken more clearly.",
			[BETWEEN_US]: "You might explore what kind of honesty or openness you’re hoping for from this person.",
		},
		helpText: "Telling and facing the truth",
	},
	{
		id: "integrity",
		label: "Integrity",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME], themes: ["integrity_identity"] },
		coreQuestion:
			"Is there something about this situation that doesn't sit right with you? What would being more in alignment look like here?",
		helpText: "Living in alignment with values",
	},
	{
		id: "self_acceptance",
		label: "Self-acceptance",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME], themes: ["integrity_identity"] },
		coreQuestion:
			"What part of yourself are you struggling to accept right now — something you did, something you feel, or something about who you are?",
		helpText: "Welcoming all parts of myself",
	},
	{
		id: "self_care",
		label: "Self-care",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME, ENV], themes: ["practical", "integrity_identity"] },
		coreQuestion:
			"What kind of self-care feels most needed — rest, nourishment, time alone, or giving yourself permission to slow down?",
		directionPrompts: {
			[IN_ME]: "You might notice what care you most need to offer yourself right now.",
			[ENV]: "You might explore what practical support, time, or conditions would make self-care more possible.",
		},
		helpText: "Tending to my own needs",
	},
	{
		id: "self_connection",
		label: "Self-connection",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME], themes: ["integrity_identity"] },
		coreQuestion:
			"Have you been disconnected from yourself lately — going through the motions, ignoring signals, or not knowing what you feel?",
		helpText: "Awareness of inner experience",
	},
	{
		id: "self_knowledge",
		label: "Self-knowledge",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME], themes: ["integrity_identity"] },
		coreQuestion:
			"Is there something about yourself you're trying to understand — a pattern, a reaction, or something you keep doing that puzzles you?",
		helpText: "Understanding myself",
	},
	{
		id: "self_realization",
		label: "Self-realization",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME, LIFE], themes: ["existential_expansive", "integrity_identity"] },
		coreQuestion: "Is there something you feel called to do or become that you haven't been able to move toward?",
		differentiationQuestions: [
			"Is this mainly about becoming more fully yourself, or about the wider direction and purpose of your life?",
		],
		directionPrompts: {
			[IN_ME]: "You might notice what in you is wanting to unfold, develop, or come more fully alive.",
			[LIFE]: "You might explore how this connects to direction, calling, or the wider arc of your life.",
		},
		helpText: "Becoming who I am meant to be",
	},
	{
		id: "mattering_to_myself",
		label: "Mattering to myself",
		family: "Meaning",
		category: "Sense of self",
		tags: { whereMet: [IN_ME], themes: ["integrity_identity"] },
		coreQuestion:
			"Have you been putting yourself last? What would it look like to treat your own needs as worthy of attention?",
		helpText: "Recognizing my own value",
	},

	// ═══════════════════════════════════════════════════════════
	// MEANING — Understanding
	// ═══════════════════════════════════════════════════════════
	{
		id: "understanding",
		label: "Understanding",
		family: "Meaning",
		category: "Understanding",
		tags: { whereMet: [IN_ME, BETWEEN_US, LIFE], themes: ["existential_expansive", "relational_field"] },
		coreQuestion: "What are you wanting to understand — yourself, another person, or why something happened?",
		directionPrompts: {
			[IN_ME]:
				"You might notice what inside you is wanting to make more sense — a feeling, reaction, or pattern.",
			[BETWEEN_US]: "You might explore what you most want to understand about this person or relationship.",
			[LIFE]: "You might notice whether you're trying to understand the bigger meaning or context of what happened.",
		},
		helpText: "Grasping what something means",
	},
	{
		id: "awareness",
		label: "Awareness",
		family: "Meaning",
		category: "Understanding",
		tags: { whereMet: [IN_ME, LIFE], themes: ["existential_expansive"] },
		coreQuestion:
			"Is this about being more aware of your own inner experience, or more aware of life as it unfolds around you?",
		directionPrompts: {
			[IN_ME]: "You might notice what in your inner experience wants more attention or presence.",
			[LIFE]: "You might explore whether you're longing to feel more awake to life, reality, or the bigger picture.",
		},
		helpText: "Conscious presence",
	},
	{
		id: "clarity",
		label: "Clarity",
		family: "Meaning",
		category: "Understanding",
		tags: { whereMet: [IN_ME, LIFE], themes: ["protective_safety", "existential_expansive"] },
		coreQuestion:
			"What feels unclear right now — the situation, someone’s intentions, or your own feelings about it?",
		directionPrompts: {
			[IN_ME]: "You might notice what in you wants more inner clarity — feelings, priorities, or next steps.",
			[LIFE]: "You might explore what part of the wider situation feels confusing or hard to make sense of.",
		},
		helpText: "Clear thinking and perception",
	},
	{
		id: "discovery",
		label: "Discovery",
		family: "Meaning",
		category: "Understanding",
		tags: { whereMet: [IN_ME, LIFE], themes: ["existential_expansive"] },
		coreQuestion:
			"Is this about learning something new, or uncovering something that was already there but hidden?",
		directionPrompts: {
			[IN_ME]: "You might notice what in you is waiting to be uncovered, understood, or brought into awareness.",
			[LIFE]: "You might explore what new experience, perspective, or truth you are being drawn toward.",
		},
		helpText: "Finding or uncovering something new",
	},
	{
		id: "learning",
		label: "Learning",
		family: "Meaning",
		category: "Understanding",
		tags: { whereMet: [IN_ME, ENV], themes: ["existential_expansive", "practical"] },
		coreQuestion:
			"What are you wanting to learn — a skill, something about yourself, or a better understanding of someone or something?",
		directionPrompts: {
			[IN_ME]: "You might notice what kind of understanding or growth is wanting to happen in you.",
			[ENV]: "You might explore what resources, teaching, practice, or support would help this learning happen.",
		},
		helpText: "Gaining knowledge or insight",
	},
	{
		id: "making_sense_of_life",
		label: "Making sense of life",
		family: "Meaning",
		category: "Understanding",
		tags: { whereMet: [IN_ME, LIFE], themes: ["existential_expansive"] },
		coreQuestion:
			"Is there something specific that doesn’t make sense right now, or a wider feeling of confusion about where life is heading?",
		directionPrompts: {
			[IN_ME]: "You might notice what in you wants a clearer inner story or understanding.",
			[LIFE]: "You might explore what larger pattern, direction, or meaning feels hard to grasp right now.",
		},
		helpText: "Understanding the bigger picture",
	},
	{
		id: "stimulation",
		label: "Stimulation",
		family: "Meaning",
		category: "Understanding",
		tags: { whereMet: [IN_ME, ENV], themes: ["existential_expansive", "practical"] },
		coreQuestion:
			"Is this about boredom, or about wanting something that engages your mind and brings more aliveness?",
		directionPrompts: {
			[IN_ME]: "You might notice what kind of interest, novelty, or mental spark you're longing for.",
			[ENV]: "You might explore what activities, inputs, or surroundings would feel more engaging.",
		},
		helpText: "Mental engagement and interest",
	},

	// ═══════════════════════════════════════════════════════════
	// MEANING — Meaning
	// ═══════════════════════════════════════════════════════════
	{
		id: "meaning",
		label: "Meaning",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [LIFE, IN_ME], themes: ["existential_expansive"] },
		coreQuestion: "Is this about something specific feeling pointless, or a wider search for what really matters?",
		directionPrompts: {
			[LIFE]: "You might explore what part of life is feeling empty, disconnected, or in need of deeper significance.",
			[IN_ME]: "You might notice what feels meaningful to you underneath the noise or confusion.",
		},
		helpText: "A sense that something matters",
	},
	{
		id: "challenge",
		label: "Challenge",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [LIFE, ENV, IN_ME], themes: ["existential_expansive", "agency_autonomy"] },
		coreQuestion:
			"Are you feeling under-challenged and wanting more stretch, or facing a challenge you want support to meet?",
		directionPrompts: {
			[LIFE]: "You might explore what kind of challenge would help life feel fuller or more alive.",
			[ENV]: "You might notice what support, structure, or opportunity would help you meet this challenge.",
			[IN_ME]: "You might explore what inner courage, energy, or willingness is wanting to come forward.",
		},
		helpText: "Opportunities to stretch and grow",
	},
	{
		id: "aliveness",
		label: "Aliveness",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [LIFE, IN_ME], themes: ["existential_expansive"] },
		coreQuestion:
			"What tends to help you feel most alive — movement, connection, creativity, nature, or something else?",
		directionPrompts: {
			[LIFE]: "You might explore what kinds of experiences or contexts bring more vitality into your life.",
			[IN_ME]: "You might notice what inside you is longing to feel more awake, engaged, or vibrant.",
		},
		helpText: "Feeling fully vibrant and present",
	},
	{
		id: "consciousness",
		label: "Consciousness",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [LIFE, IN_ME], themes: ["existential_expansive"] },
		coreQuestion:
			"Is this about becoming more awake to your own experience, or about connecting to something larger than yourself?",
		directionPrompts: {
			[IN_ME]: "You might notice what in your inner world wants more awareness or wakefulness.",
			[LIFE]: "You might explore whether you're longing for a deeper sense of connection with life, reality, or something larger.",
		},
		helpText: "Deep awareness of self and life",
	},
	{
		id: "contribution",
		label: "Contribution",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [LIFE, BETWEEN_US, ENV], themes: ["existential_expansive", "relational_field"] },
		coreQuestion:
			"What would contribution look like here — helping someone specific, serving something larger, or knowing that what you do matters?",
		directionPrompts: {
			[LIFE]: "You might explore how contribution connects to purpose, service, or meaning in your life.",
			[BETWEEN_US]:
				"You might notice whether you're longing to make a difference to this person or relationship.",
			[ENV]: "You might explore what role, action, or practical avenue would let you contribute more meaningfully.",
		},
		helpText: "Making a difference",
	},
	{
		id: "effectiveness",
		label: "Effectiveness",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [ENV, IN_ME], themes: ["practical", "existential_expansive"] },
		coreQuestion:
			"Is this about wanting your efforts to produce results, or about feeling stuck and unable to make an impact?",
		directionPrompts: {
			[ENV]: "You might explore what tools, support, or conditions would help your efforts work better.",
			[IN_ME]: "You might notice what would help you feel more able to act, influence, or follow through.",
		},
		helpText: "Capacity to bring about change",
	},
	{
		id: "exploration",
		label: "Exploration",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [LIFE, ENV, IN_ME], themes: ["existential_expansive", "agency_autonomy"] },
		coreQuestion: "What are you wanting to explore — new experiences, new ideas, or new parts of yourself?",
		directionPrompts: {
			[LIFE]: "You might explore what new territory in life is calling for your curiosity or engagement.",
			[ENV]: "You might notice what opportunities, resources, or freedom would support exploration.",
			[IN_ME]: "You might explore what in you is curious, restless, or ready to discover something new.",
		},
		helpText: "Willingness to investigate and try",
	},
	{
		id: "integration",
		label: "Integration",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [LIFE, IN_ME], themes: ["existential_expansive"] },
		coreQuestion:
			"Is there a part of your life or experience that feels separate or fragmented? What would more wholeness look like?",
		directionPrompts: {
			[LIFE]: "You might explore what in your life feels disconnected and wants to come together.",
			[IN_ME]: "You might notice what parts of you or your experience want more coherence or wholeness.",
		},
		helpText: "Wholeness and coherence",
	},
	{
		id: "purpose",
		label: "Purpose",
		family: "Meaning",
		category: "Meaning",
		tags: { whereMet: [LIFE, IN_ME], themes: ["existential_expansive"] },
		coreQuestion:
			"Is this about wanting a clearer sense of direction, or about what you're doing not feeling purposeful enough?",
		directionPrompts: {
			[LIFE]: "You might explore what direction, calling, or larger aim is wanting to emerge in your life.",
			[IN_ME]: "You might notice what feels deeply worth giving yourself to right now.",
		},
		helpText: "Having meaningful direction",
	},

	// ═══════════════════════════════════════════════════════════
	// MEANING — Transcendence
	// ═══════════════════════════════════════════════════════════
	{
		id: "beauty",
		label: "Beauty",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [LIFE, ENV, IN_ME], themes: ["existential_expansive"] },
		coreQuestion: "What kind of beauty are you longing for — in nature, art, people, or the world around you?",
		directionPrompts: {
			[LIFE]: "You might explore how beauty connects to your experience of life as a whole.",
			[ENV]: "You might notice what surroundings, art, or sensory experiences would bring in more beauty.",
			[IN_ME]:
				"You might explore whether a deeper appreciation or openness to beauty is wanting to awaken in you.",
		},
		helpText: "Appreciating harmony and elegance",
	},
	{
		id: "celebration_of_life",
		label: "Celebration of life",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [LIFE, BETWEEN_US, IN_ME], themes: ["existential_expansive"] },
		coreQuestion:
			"What feels worth celebrating right now — even something small? Or are you missing the feeling of being able to celebrate at all?",
		directionPrompts: {
			[LIFE]: "You might explore what in life feels precious, meaningful, or worthy of being honoured.",
			[BETWEEN_US]: "You might notice whether you’re longing to share celebration or joy with someone.",
			[IN_ME]: "You might explore what would help you reconnect with gratitude, delight, or reverence.",
		},
		helpText: "Honoring what's precious",
	},
	{
		id: "communion",
		label: "Communion",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [LIFE, BETWEEN_US, IN_ME], themes: ["existential_expansive", "relational_field"] },
		coreQuestion:
			"Is this communion you're wanting with another person, with life or nature, with something spiritual, or with yourself?",
		directionPrompts: {
			[LIFE]: "You might explore whether you're longing for deeper connection with life, nature, or something spiritual.",
			[BETWEEN_US]:
				"You might notice whether you're wanting a deep sense of shared presence or union with someone.",
			[IN_ME]: "You might explore whether a deeper connection with yourself is what's most needed.",
		},
		helpText: "Deep spiritual or emotional connection",
	},
	{
		id: "faith",
		label: "Faith",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [LIFE, IN_ME], themes: ["existential_expansive"] },
		coreQuestion:
			"Is this about spiritual or religious faith, or about a more general trust that things can work out?",
		directionPrompts: {
			[LIFE]: "You might explore whether you're longing for trust in life, reality, or something larger than yourself.",
			[IN_ME]: "You might notice what would help you feel more trusting, steady, or anchored inside.",
		},
		helpText: "Trust in something greater",
	},
	{
		id: "flow",
		label: "Flow",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [IN_ME, ENV, LIFE], themes: ["existential_expansive", "practical"] },
		coreQuestion:
			"When did you last feel in flow? What were you doing, and what seems to support that state for you?",
		directionPrompts: {
			[IN_ME]: "You might notice what inner state helps you feel absorbed, focused, or carried along.",
			[ENV]: "You might explore what conditions, structure, or environment make flow more possible.",
			[LIFE]: "You might notice how flow connects to the way you want to live or move through life.",
		},
		helpText: "Being fully absorbed in the moment",
	},
	{
		id: "hope",
		label: "Hope",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [LIFE, IN_ME], themes: ["existential_expansive"] },
		coreQuestion:
			"Is this about hope for a specific situation, or a wider sense that life could still open in a better direction?",
		directionPrompts: {
			[LIFE]: "You might explore what possibility or future direction you most want to believe in.",
			[IN_ME]: "You might notice what would help hope feel more alive inside you right now.",
		},
		helpText: "Belief in possibilities",
	},
	{
		id: "inspiration",
		label: "Inspiration",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [LIFE, IN_ME], themes: ["existential_expansive"] },
		coreQuestion:
			"What tends to inspire you — ideas, people, nature, art, or something else? What would help you reconnect with that?",
		directionPrompts: {
			[LIFE]: "You might explore what in the world tends to lift, stir, or call you forward.",
			[IN_ME]: "You might notice what inner spark wants reawakening right now.",
		},
		helpText: "Being uplifted into vision or action",
	},
	{
		id: "mourning",
		label: "Mourning",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [LIFE, IN_ME, BETWEEN_US], themes: ["integrity_identity", "existential_expansive"] },
		coreQuestion:
			"What are you mourning — a person, a possibility, something that changed, or something that never was?",
		directionPrompts: {
			[LIFE]: "You might explore how this loss touches the larger shape or meaning of your life.",
			[IN_ME]: "You might notice what in you needs space, tenderness, or acknowledgment in grieving.",
			[BETWEEN_US]:
				"You might explore whether this mourning is connected to what happened between you and someone else.",
		},
		helpText: "Honoring loss with care",
	},
	{
		id: "peace_internal",
		label: "Peace (internal)",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [IN_ME, LIFE], themes: ["protective_safety", "existential_expansive"] },
		coreQuestion:
			"What’s disturbing your inner peace — racing thoughts, unresolved feelings, or something in life that won’t settle?",
		directionPrompts: {
			[IN_ME]: "You might notice what would help you feel calmer, quieter, or more settled inside.",
			[LIFE]: "You might explore whether something in the larger shape of life feels unresolved or out of harmony.",
		},
		helpText: "Calm within",
	},
	{
		id: "presence",
		label: "Presence",
		family: "Meaning",
		category: "Transcendence",
		tags: { whereMet: [IN_ME, LIFE], themes: ["existential_expansive"] },
		coreQuestion:
			"Is this about wanting to be more fully here yourself, or about wanting to feel more connected with life as it is happening?",
		directionPrompts: {
			[IN_ME]: "You might notice what would help you come back into this moment more fully.",
			[LIFE]: "You might explore whether you're longing for a deeper sense of participation in life itself.",
		},
		helpText: "Fully here and now",
	},

	// ═══════════════════════════════════════════════════════════
	// FREEDOM — Autonomy & Agency
	// ═══════════════════════════════════════════════════════════
	{
		id: "freedom",
		label: "Freedom",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME, ENV, BETWEEN_US], themes: ["agency_autonomy"] },
		coreQuestion:
			"When you say freedom, is it more about having options, having room to be yourself, or being able to move and act without constraint?",
		differentiationQuestions: [
			"Where does the limitation feel strongest — inside you, in your circumstances, or in a relationship?",
		],
		directionPrompts: {
			[IN_ME]:
				"You might notice what inner pressure, fear, or restriction is getting in the way of feeling free.",
			[ENV]: "You might explore what practical conditions, resources, or changes would give you more freedom.",
			[BETWEEN_US]:
				"You might notice what in this relationship feels constraining, and what would create more room for choice or self-expression.",
		},
		helpText: "Room to choose, move, and be without constraint",
	},
	{
		id: "autonomy",
		label: "Autonomy",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME, BETWEEN_US], themes: ["agency_autonomy"] },
		coreQuestion:
			"Is this about someone making decisions for you, or about feeling constrained even without anyone actively controlling you?",
		directionPrompts: {
			[IN_ME]: "You might notice what would help you feel more self-directed or able to choose for yourself.",
			[BETWEEN_US]:
				"You might explore what would create more room for your choices or voice in this relationship.",
		},
		helpText: "Make decisions without external control",
	},
	{
		id: "choice",
		label: "Choice",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME, ENV, BETWEEN_US], themes: ["agency_autonomy"] },
		coreQuestion: "Is this about having options, or about feeling free to choose without pressure or guilt?",
		directionPrompts: {
			[IN_ME]: "You might notice what inner permission or confidence would help you choose more freely.",
			[ENV]: "You might explore what practical options or conditions would give you more real choice.",
			[BETWEEN_US]:
				"You might notice whether pressure, expectation, or guilt in this relationship is making choice harder.",
		},
		helpText: "Freedom to decide",
	},
	{
		id: "ease",
		label: "Ease",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME, ENV], themes: ["practical", "agency_autonomy"] },
		coreQuestion:
			"Is this about physical ease, emotional ease, or simply wanting things to be less effortful for a while?",
		directionPrompts: {
			[IN_ME]: "You might notice what would help you feel less strained, pressured, or effortful inside.",
			[ENV]: "You might explore what support, simplification, or practical changes would make things easier.",
		},
		helpText: "Freedom from strain or effort",
	},
	{
		id: "independence",
		label: "Independence",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME, BETWEEN_US], themes: ["agency_autonomy"] },
		coreQuestion:
			"Is this about wanting to manage on your own, or about not wanting to depend on someone who isn't reliable?",
		directionPrompts: {
			[IN_ME]: "You might notice what would help you feel more self-reliant or capable on your own.",
			[BETWEEN_US]:
				"You might explore whether dependence in this relationship is feeling unsafe, burdensome, or limiting.",
		},
		helpText: "Self-reliance and agency",
	},
	{
		id: "agency",
		label: "Agency",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME], themes: ["agency_autonomy"] },
		coreQuestion:
			"Is this about feeling powerless in a specific situation, or a wider sense that your actions don’t make a difference?",
		helpText: "Ability to influence",
	},
	{
		id: "self_responsibility",
		label: "Self-responsibility",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME], themes: ["agency_autonomy", "integrity_identity"] },
		coreQuestion:
			"Is this about wanting to take more ownership of your life, or about others not taking responsibility for theirs?",
		helpText: "Owning my own choices",
	},
	{
		id: "space",
		label: "Space",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME, ENV, BETWEEN_US], themes: ["agency_autonomy", "practical"] },
		coreQuestion: "Is this physical space, emotional space, or time and room to think and be yourself?",
		directionPrompts: {
			[IN_ME]: "You might notice what inner spaciousness or breathing room is most needed right now.",
			[ENV]: "You might explore what physical space, time, or practical conditions would give you more room.",
			[BETWEEN_US]: "You might notice whether this relationship needs more room, boundaries, or less pressure.",
		},
		helpText: "Room to be and act",
	},
	{
		id: "spontaneity",
		label: "Spontaneity",
		family: "Freedom",
		category: "Autonomy & Agency",
		tags: { whereMet: [IN_ME, ENV], themes: ["agency_autonomy", "practical"] },
		coreQuestion:
			"Is this about wanting more freedom to follow impulses, or about feeling too constrained by plans and obligations?",
		directionPrompts: {
			[IN_ME]: "You might notice what in you wants more freedom, playfulness, or room to respond in the moment.",
			[ENV]: "You might explore what plans, structures, or obligations are crowding out spontaneity.",
		},
		helpText: "Freedom to act in the moment",
	},

	// ═══════════════════════════════════════════════════════════
	// FREEDOM — Leisure & Relaxation
	// ═══════════════════════════════════════════════════════════
	{
		id: "humour",
		label: "Humour",
		family: "Freedom",
		category: "Leisure & Relaxation",
		tags: { whereMet: [BETWEEN_US, IN_ME], themes: ["practical", "relational_field"] },
		coreQuestion:
			"Is this about wanting more lightness in your life, or about missing someone specific you laugh with?",
		directionPrompts: {
			[BETWEEN_US]:
				"You might notice whether you're longing for shared laughter, ease, or a lighter connection with someone.",
			[IN_ME]: "You might explore what would help you reconnect with lightness or amusement inside yourself.",
		},
		helpText: "Lightness and laughter",
	},
	{
		id: "joy",
		label: "Joy",
		family: "Freedom",
		category: "Leisure & Relaxation",
		tags: { whereMet: [IN_ME, LIFE, BETWEEN_US], themes: ["practical", "existential_expansive"] },
		coreQuestion:
			"When did you last feel genuine joy? What was happening, and what seems closest to that right now?",
		directionPrompts: {
			[IN_ME]:
				"You might notice what helps joy feel alive in you — ease, delight, play, gratitude, or something else.",
			[LIFE]: "You might explore what kinds of experiences or rhythms in life bring you more joy.",
			[BETWEEN_US]:
				"You might notice whether joy here feels connected to shared moments, closeness, or being with someone.",
		},
		helpText: "Delight and happiness",
	},
	{
		id: "play",
		label: "Play",
		family: "Freedom",
		category: "Leisure & Relaxation",
		tags: { whereMet: [IN_ME, BETWEEN_US, ENV], themes: ["practical", "relational_field"] },
		coreQuestion:
			"What does play look like for you — silliness, games, creating something, or doing something just for the fun of it?",
		directionPrompts: {
			[IN_ME]: "You might notice what kind of playfulness or freedom wants to come alive in you.",
			[BETWEEN_US]: "You might explore whether you're longing for shared play, silliness, or fun with someone.",
			[ENV]: "You might notice what time, space, materials, or conditions would support play.",
		},
		helpText: "Fun, imagination and creativity",
	},
	{
		id: "pleasure",
		label: "Pleasure",
		family: "Freedom",
		category: "Leisure & Relaxation",
		tags: { whereMet: [IN_ME, ENV], themes: ["practical"] },
		coreQuestion:
			"What kind of pleasure feels most needed — physical comfort, something delicious, a beautiful experience, or simply relaxation?",
		directionPrompts: {
			[IN_ME]:
				"You might notice what kind of enjoyment, comfort, or sensory nourishment your body is asking for.",
			[ENV]: "You might explore what surroundings, activities, or resources would bring in more pleasure.",
		},
		helpText: "Enjoyable sensations or experiences",
	},
	{
		id: "rejuvenation",
		label: "Rejuvenation",
		family: "Freedom",
		category: "Leisure & Relaxation",
		tags: { whereMet: [IN_ME, ENV], themes: ["practical"] },
		coreQuestion:
			"What would help you feel renewed — time off, time in nature, doing something you love, or simply having nothing to do?",
		directionPrompts: {
			[IN_ME]: "You might notice what kind of restoration your body or spirit is most longing for.",
			[ENV]: "You might explore what time, space, or practical conditions would help you feel refreshed.",
		},
		helpText: "Feeling refreshed and renewed",
	},
];

export default allNeeds;
