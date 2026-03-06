// these questions are used for unpacking needs

export const clarifyNeedsPrompts = {
	// EMBODIMENT (rotating across all categories) - All have label: "In your body"
	EMB_01: "If this were present, what would shift in your body — even 5%?",
	EMB_02: "What would soften in you if this were here?",
	EMB_03: "Where do you feel this need most in your body right now?",
	EMB_04: "If this need were met right now, what would your breath or shoulders do differently?",

	// DISCRIMINATION — RELATIONAL - ALL have label: "Getting clearer"
	DISC_REL_01: "Is this about wanting connection — or about preventing disconnection?",
	DISC_REL_02:
		"Are you wanting to be understood without having to explain — or are you clear about what you’d want to express?",
	DISC_REL_03: "Is this about agreement — or about being understood and valued?",

	// DISCRIMINATION — LOADED - ALL have label: "Getting clearer"
	DISC_LOAD_01: "Is this about your internal experience — or about changing something external?",
	DISC_LOAD_02: "Are you needing reassurance, clarity, or a boundary?",
	DISC_LOAD_03: "What would feel 'good enough' here, rather than total?",

	// DISCRIMINATION — CONCRETE - ALL have label: "Getting clearer"
	DISC_CONC_01: "Is this something practical that could shift today?",
	DISC_CONC_02: "Is this need mainly for support, for permission/space, or for practical help?",

	// DEEPER — RELATIONAL
	UNF_REL_01: "If this were fully present, would anything else soften or open up — if anything?", // Unfolding
	PROBE_REL_01: "Is there something more tender underneath this?", // Underneath
	INT_REL_01: "What clear, doable request might move this 10% forward?", // Next step

	// DEEPER — LOADED
	UNF_LOAD_01: "If this were fully present, what else might naturally come with it — if anything?", // Unfolding
	PROBE_LOAD_01: "Is there a more specific need underneath this (for example, trust, clarity, belonging, rest)?", // Underneath
	INT_LOAD_01: "What would 'good enough' look like instead of total?", // Next step

	// DEEPER — CONCRETE
	UNF_CONC_01: "If this were fully met, what practical strain would ease?", // Unfolding
	PROBE_CONC_01: "What's currently getting in the way of meeting this?", // Underneath
	INT_CONC_01: "What small step could move this 10% today?", // Next step
};

export default clarifyNeedsPrompts;
