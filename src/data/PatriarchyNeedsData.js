// Based on Miki Kashtan's "Needs Constructed by Patriarchy" list
// from "Social Structures and Socialization" (The Fearless Heart, 2021)
//
// Each entry maps a "patriarchal need" (a strategy masquerading as a need)
// to genuine universal needs that may be underneath it.
// The `genuineNeeds` array contains item names that match NeedsData.js exactly.

const patriarchyNeedsData = [
	{
		item: "Agreement",
		genuineNeeds: ["Understanding", "Connection"],
		description:
			"When disagreement feels like a threat to togetherness, agreement becomes a substitute for genuine understanding.",
	},
	{
		item: "Approval",
		genuineNeeds: ["Belonging", "Self-acceptance", "Flow"],
		description:
			"When we're trained to look outward for guidance instead of inward, others' positive opinion replaces true belonging.",
	},
	{
		item: "Authority",
		genuineNeeds: ["Faith", "Trusting"],
		description:
			"Without a direct relationship with the depth of life's flow, relying on authority replaces reverence for life.",
	},
	{
		item: "Boundaries",
		genuineNeeds: ["Self-care", "Safety (emotional)"],
		description:
			"When relationships are adversarial, we can only care for ourselves by putting up walls to prevent intrusion.",
	},
	{
		item: "Certainty",
		genuineNeeds: ["Trusting"],
		description: "Without trust in life, the desire for certainty is a way to reduce anxiety.",
	},
	{
		item: "Compartmentalization",
		genuineNeeds: ["Contribution", "Purpose"],
		description:
			"Under pressure to do more than we can and ignore our feelings, compartmentalizing becomes a way to function.",
	},
	{
		item: "Control",
		genuineNeeds: ["Agency", "Trusting"],
		description:
			"Control is the master patriarchal strategy — the fundamental pathway we choose when we don't trust life.",
	},
	{
		item: "Convenience",
		genuineNeeds: ["Joy"],
		description:
			"Having given up on the possibility of joy, convenience becomes an addictive substitute.",
	},
	{
		item: "Discipline",
		genuineNeeds: ["Learning"],
		description:
			"When we don't trust that useful learning can happen from intrinsic motivation, we imagine discipline is needed.",
	},
	{
		item: "Earning",
		genuineNeeds: ["To matter", "Trusting"],
		description:
			"When needs alone don't bring resources to them, the idea of earning emerges as a substitute for being cared for.",
	},
	{
		item: "Equality",
		genuineNeeds: ["Care", "Trusting", "Compassion"],
		description:
			"Without trust in our collective capacity to care for all, equality becomes the most caring distribution we can imagine — but it's based in scarcity.",
	},
	{
		item: "Fairness",
		genuineNeeds: ["Care", "Trusting"],
		description:
			"Fairness is a more general version of equality — a strategy for distributing care when trust in collective capacity is absent.",
	},
	{
		item: "Inclusion",
		genuineNeeds: ["To matter", "Belonging", "Creativity", "Care"],
		description:
			"A strategy to counter oppression without seeing creative options that don't necessarily bring everyone together in the same way.",
	},
	{
		item: "Justice",
		genuineNeeds: ["Care", "Trusting", "Learning", "Healing"],
		description:
			"Without trust, no pathway is seen for restoring trust, learning, or transformation after harm.",
	},
	{
		item: "Knowing (that)",
		genuineNeeds: ["Peace of mind"],
		description:
			"Wanting to know that something is a particular way — rather than being open and curious — is a form of control.",
	},
	{
		item: "Money",
		genuineNeeds: ["Autonomy", "Choice"],
		description:
			"In capitalist societies, money becomes the universal strategy for attending to needs — a master pathway for access and freedom.",
	},
	{
		item: "Ownership",
		genuineNeeds: ["Choice"],
		description:
			"Deep scarcity and separation pit us against each other, leading us to protect what is 'ours' rather than trust collaborative ways.",
	},
	{
		item: "Performance",
		genuineNeeds: ["Competence"],
		description:
			"Performance is an external way to measure how we're doing, with validation from outside rather than inner mastery.",
	},
	{
		item: "Permanence",
		genuineNeeds: ["Flow", "Presence"],
		description:
			"From deep trauma around change and disruption, permanence becomes a longing for anything to counter fundamental anxiety.",
	},
	{
		item: "Power-over",
		genuineNeeds: ["Effectiveness", "To matter"],
		description:
			"The immense powerlessness woven through patriarchy leads to a huge longing to just make things happen.",
	},
	{
		item: "Predictability",
		genuineNeeds: ["Flow"],
		description:
			"When we're discouraged from being with flow and letting things unfold, predictability settles ongoing anxiety.",
	},
	{
		item: "Privacy",
		genuineNeeds: ["Autonomy", "Self-expression"],
		description:
			"In the age of scrutiny and judgement, privacy becomes a strategy for relaxing and creating conditions for inner flourishing.",
	},
	{
		item: "Productivity",
		genuineNeeds: ["Contribution"],
		description:
			"When it's hard to have a direct sense of contribution to life, we substitute productivity for the deeper need.",
	},
	{
		item: "Professionalism",
		genuineNeeds: ["Belonging", "Choice"],
		description:
			"Knowing how to appear professional opens doors, but also constrains — this strategy gets internalized as important to the self.",
	},
	{
		item: "Prosperity",
		genuineNeeds: ["Trusting"],
		description:
			"With the loss of trust in natural abundance and the fear of scarcity, we develop a 'need' to have more than enough.",
	},
	{
		item: "Protection",
		genuineNeeds: ["Flow", "Care", "Trusting"],
		description:
			"Once togetherness is gone and surrender to life feels dangerous, patriarchy makes itself appealing by offering protection.",
	},
	{
		item: "Respect",
		genuineNeeds: ["Care", "To matter"],
		description:
			"Respect is a substitute for care in a world where we are positioned in adversarial relationships to each other.",
	},
	{
		item: "Revenge",
		genuineNeeds: ["Healing", "Trusting"],
		description:
			"With no paths for healing or restoration after harm, we've been trained to believe that harming the harmer brings closure.",
	},
	{
		item: "Being right",
		genuineNeeds: ["Self-acceptance", "To matter"],
		description:
			"When everything is channelled through right/wrong frames, being right becomes a deep groove of satisfaction.",
	},
	{
		item: "Safety",
		genuineNeeds: ["Physical Safety"],
		description:
			"Safety is an illusion that bleeds from material to emotional, keeping us tethered to the status quo. The genuine need is for survival itself.",
	},
	{
		item: "Security",
		genuineNeeds: ["Community", "Trusting"],
		description:
			"As community disintegrates under capitalism, the needs it met become individualised, and we seek security in its place.",
	},
	{
		item: "Self-sufficiency",
		genuineNeeds: ["Mutuality", "Community"],
		description:
			"With the destruction of community and scarcity mindset, we lose trust in collective capacity and try to attend to needs alone.",
	},
	{
		item: "Space",
		genuineNeeds: ["Flow"],
		description:
			"Without capacity for the needs dance with others, many of us can only fully relax when alone.",
	},
	{
		item: "Status",
		genuineNeeds: ["To matter"],
		description:
			"Without interdependent communities where needs are met by existing, we vie for status to command resources.",
	},
	{
		item: "Success",
		genuineNeeds: ["Purpose", "Meaning"],
		description:
			"When alienated work strips away meaning and purpose, success on capitalism's terms becomes the only alternative.",
	},
	{
		item: "Time",
		genuineNeeds: ["Meaning", "Pleasure", "Contribution", "Autonomy"],
		description:
			"Separated from natural cycles, we've lost capacity to surrender to life's limits and hope to pack more into each day.",
	},
	{
		item: "Winning",
		genuineNeeds: ["To matter", "Aliveness"],
		description:
			"Confronting scarcity and separation, we adopt a willingness to compete and fight to get our needs met even if others don't.",
	},
];

export default patriarchyNeedsData;
