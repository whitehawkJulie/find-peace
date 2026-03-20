// ──────────────────────────────────────────────────────────────
// Story Words (formerly "faux feelings")
// These are words we often use that describe what happened,
// what it meant, or how someone treated us.
// They are not wrong — they often hold important emotional truth.
// Beneath them, there is usually an embodied feeling.
// ──────────────────────────────────────────────────────────────
// Ordering rule for suggestedFeelings arrays:
// 1) Put original list suggestions first (highest likelihood)
// 2) Then add nearby variants (same family / close synonyms)
// 3) Then add protest-layer words (if relevant)
// 4) Then add body-state cues (activation/somatic) last
// Comments group the variants; UI preserves array order.

export const StoryWords = {
	ui: {
		heading: "Story Words (optional)",
		helpText:
			"These words make sense — they often tell a story about what happened <em>out there</em>. And at the same time, there’s something happening <em>in here</em>, inside you, in response to that. Let’s pause and gently feel it.",
	},

	groups: {
		// ──────────────────────────────────────────────────────────
		// AUTONOMY RUPTURE
		// Theme: choice interference, control intrusion
		// Emotional arc: protest → frustration → sometimes fear

		// Shared themes:
		// - Agency rupture
		// - Boundary crossing
		// - Choice interference
		//
		// Flavour differences:
		// - Manipulated → deception/control blend
		// - Coerced → force/pressure
		// - Pressured → urgency / subtle force
		// - Cornered → no exit
		// - Controlled → dominance
		// ──────────────────────────────────────────────────────────

		autonomy: {
			ui: {
				heading: "When Choice or Control Felt Compromised",
				order: 10,
			},
			items: [
				{
					item: "Manipulated",
					type: "storyWord",
					ruptureType: "autonomy",

					storyHint:
						"This word often carries a sense that influence felt hidden or indirect — like your choice wasn’t fully transparent or respected.",

					empathyGuesses: [
						"That sounds unsettling… did something feel off or unclear?",
						"Is there anger here — the kind that shows up when autonomy feels compromised?",
						"Maybe frustration, if your influence felt blocked?",
						"Or hurt, if trust felt shaken?",
						"And possibly even some fear, if you didn’t feel steady in the interaction.",
						"Let’s slow it gently… what feeling feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (aligned to canonical list)
						"scared", // original
						"frustrated", // original

						// "powerless" removed — cognitive blend (collapse narrative rather than primary feeling)
						"helpless", // added (embodied equivalent)

						// "thwarted" removed — not in canonical feelings list; conceptually covered by frustration

						// ADDED — Protest layer (manipulation often triggers boundary anger)
						"angry",
						"resentful",
						"indignant",

						// ADDED — Trust rupture layer
						"hurt",
					],

					suggestedNeeds: [
						// ORIGINAL THEME — autonomy rupture
						"Autonomy", // original theme
						"Choice", // original theme ("free choice")
						"Agency", // maps from "empowerment"

						// ORIGINAL THEME — trust rupture
						"Trusting", // maps from "trust"
						// "connection" removed — too broad for this rupture

						// ORIGINAL THEME — dignity/integrity
						"Authenticity", // original
						// "equality" removed — redundant with respect dimension

						// ADDED — relational dignity
						"Respect",
					],
				},
				{
					item: "Coerced",
					type: "storyWord",
					ruptureType: "autonomy",

					storyHint:
						"This word often carries the sense that your ‘no’ didn’t have room — like pressure or force limited your real choice.",

					empathyGuesses: [
						"That sounds scary… did it feel like there wasn’t really space for your choice?",
						"Is there anger here, if your boundary was pushed past?",
						"Maybe frustration, if you tried to resist and couldn’t?",
						"Or helplessness, if protecting yourself didn’t feel possible?",
						"Let’s pause gently… what feeling is strongest right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (aligned)
						"frustrated", // original
						"scared", // original

						// "frightened" normalized to canonical equivalent
						"afraid", // canonical substitute for frightened

						// "thwarted" removed — not in canonical feelings list

						// ADDED — protest energy (common in coercion)
						"angry",
						"resentful",
						"indignant",

						// ADDED — collapse layer
						"helpless",

						// ADDED — somatic signal
						"tense",
					],

					suggestedNeeds: [
						// ORIGINAL THEME — autonomy
						"Choice", // original
						"Autonomy", // original
						"Freedom", // original

						// "act freely / choose freely" merged into Choice/Freedom

						// ADDED — safety dimension (coercion often includes threat layer)
						"Safety (emotional)",

						// ADDED — relational boundary dignity
						"Respect",
						"Space",
					],
				},

				{
					item: "Pressured",
					type: "storyWord",
					ruptureType: "autonomy",

					storyHint:
						"This word often carries a sense of compression — like there wasn’t enough room, time, or choice in the situation.",

					empathyGuesses: [
						"That sounds really uncomfortable… was it like you couldn’t slow it down?",
						"Did it feel urgent — like you were being pushed to decide or comply before you had the space you needed?",
						"There might be anxiety here, if it felt like something bad would happen if you didn’t go along.",
						"And maybe irritation too — a protective ‘please back off’ energy.",
						"Or overwhelm, if too much was coming at you at once.",
						"Sometimes pressure comes from outside… and sometimes it’s a voice inside pushing hard. Do you sense where this one is coming from?",
						"Let’s pause gently… what’s most alive right now: anxious, irritated, overwhelmed… or something else?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS
						"anxious", // original
						"overwhelmed", // original

						// ADDED — somatic/activation cues commonly present with pressure
						"tense",
						"restless",

						// ADDED — protest variants (if pressure feels like boundary push)
						"irritated",
						"frustrated",

						// ADDED — collapse variant (if pressure removes perceived options)
						"helpless",
					],

					suggestedNeeds: [
						// ORIGINAL THEME — compression relief
						"Space", // original

						// ORIGINAL THEME — cognitive steadiness
						"Clarity", // original

						// "Relaxation" is not a canonical need; mapped into:
						"Ease", // mapped from relaxation (nervous system softening)
						"Peace of mind", // mapped from relaxation (internal settling)

						// ORIGINAL THEME — relational pacing
						"Consideration", // original

						// ADDED — dignity/boundary layer (if pressure is interpersonal)
						"Respect",
					],
				},
				{
					item: "Cornered",
					type: "storyWord",
					ruptureType: "autonomy",

					storyHint:
						"This word often carries a sense of no exit — like your options suddenly narrowed and there wasn’t room to move.",

					empathyGuesses: [
						"That sounds intense… was there a feeling of being trapped or pinned?",
						"Did your body go into fear — like you needed to get out quickly?",
						"Or did anger rise up — a surge of ‘don’t box me in’ energy?",
						"Maybe there was a frozen feeling, like you couldn’t move at all.",
						"Sometimes being cornered brings panic. Sometimes it brings fight. Sometimes shutdown. Which direction did your system go?",
						"Let’s slow it gently… what’s most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS
						"scared", // original
						"anxious", // original

						// "thwarted" removed — not in canonical feelings list

						// ADDED — no-exit / confinement felt-sense (often central to “cornered”)
						"trapped",

						// ADDED — somatic/activation cues (fight/flight bracing)
						"tense",
						"restless",

						// ADDED — protest variants (fight response)
						"angry",
						"resentful",
						"indignant",

						// ADDED — collapse variants (freeze/shutdown)
						"helpless",
						"numb",
					],

					suggestedNeeds: [
						// ORIGINAL THEME — restore options / exit
						"Autonomy", // original
						"Freedom", // original
						"Choice", // added (options widening)
						"Space", // added (room to move)

						// ADDED — threat layer (cornered often activates threat circuitry)
						"Safety (emotional)",

						// ADDED — regulation
						"Ease",
						"Peace of mind",
					],
				},
				{
					item: "Controlled",
					type: "storyWord",
					ruptureType: "autonomy",

					// WHY THIS ITEM EXISTS (ADDED — not in original list)
					// - Overlaps with manipulated/coerced/pressured/cornered, but adds a distinct flavour:
					//   - Ongoing dominance / monitoring / restriction (pattern, not just a moment)
					//   - Chronic autonomy erosion (agency repeatedly overridden)
					//   - Dignity injury (being treated as incapable or owned)
					//   - Self-expression suppression (not being allowed to be oneself)
					// - “Controlled” often names a power-imbalance dynamic more directly than “Pressured”
					//   and more chronically than “Coerced.”

					storyHint:
						"This word often carries a sense of ongoing restriction — like someone else is steering, monitoring, or limiting your choices over time.",

					empathyGuesses: [
						"That sounds really constricting… like your space to be you was being narrowed.",
						"Is there anger here — a protective ‘don’t run my life’ energy?",
						"Or fear, if it felt risky to resist or say no?",
						"Sometimes it’s also exhausting… like you have to stay on alert or manage their reactions.",
						"And sometimes there’s a heavy, trapped feeling — like you can’t move freely.",
						"Let’s slow it gently… what’s most alive right now?",
					],

					suggestedFeelings: [
						// CORE protest
						"angry",
						"frustrated",

						// constriction / no-exit
						"trapped",
						"helpless",

						// anticipatory tension
						"anxious",
						"tense",

						// relational sting (optional but common)
						"hurt",
					],

					suggestedNeeds: [
						// CORE — restore self-direction
						"Autonomy",
						"Choice",
						"Agency",
						"Space",

						// RELATIONAL POWER BALANCE
						"Respect",
						"Equality",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// BELONGING RUPTURE
		// Theme: exclusion from social group
		// Emotional arc: sadness → loneliness → anxiety

		// Shared themes:
		// - Exclusion
		// - Loss of inclusion
		// - Social disconnection
		// - Threat to belonging
		//
		// Flavour differences:
		// - Excluded → overt exclusion from group
		// - Rejected → direct refusal or dismissal
		// - Left out → subtle exclusion
		// - Unwanted → sense of not being valued
		// ──────────────────────────────────────────────────────────

		belonging: {
			ui: {
				heading: "When Connection or Belonging Felt Broken",
				order: 20,
			},
			items: [
				{
					item: "Excluded",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint:
						"This word often points to feeling outside the circle — not included in something important.",

					empathyGuesses: [
						"That sounds painful… was it like being on the outside looking in?",
						"Did something in you soften or drop when you realised you weren’t included?",
						"Maybe there’s sadness here.",
						"Or anxiety — wondering what this means about your place.",
						"Sometimes there’s also anger if it felt unfair.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized to canonical unmet list)
						"sad", // original
						"lonely", // original
						"anxious", // original

						// ADDED — Vulnerability layer
						"hurt",
						"vulnerable",

						// ADDED — Collapse possibility
						"insecure",

						// ADDED — Protest possibility
						"angry",
						"resentful",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped to canonical list)
						"Inclusion",
						"Belonging",
						"Community",
						"Connection",

						// ADDED — Relational mattering layer
						"To be seen",
						"Acceptance",
						"Mutuality",

						// ADDED — Safety if exclusion felt threatening
						"Safety (emotional)",
					],
				},
				{
					item: "Rejected",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint: "This word often carries the sense of being refused, dismissed, or pushed away.",

					empathyGuesses: [
						"That can really sting… was it like something in you reached out and got turned away?",
						"Did it land as hurt?",
						"Maybe there’s sadness — a heaviness in the chest.",
						"Or fear, if it felt like your place wasn’t secure.",
						"Sometimes anger shows up too, especially if it felt unfair or abrupt.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized to canonical unmet list)
						"hurt", // original
						"scared", // original
						"sad", // original
						"disappointed", // original

						// ADDED — Vulnerability layer
						"insecure",
						"lonely",

						// ADDED — Protest layer (if rejection felt unjust)
						"angry",
						"resentful",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped to canonical list)
						"Belonging",
						"Inclusion",
						"Connection",
						"Trusting",

						// ADDED — Relational security layer
						"Closeness",
						"Acceptance",
						"To be seen",

						// ADDED — Emotional safety
						"Safety (emotional)",
					],
				},
				// next
				{
					item: "Left out",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint:
						"This word often points to a quieter form of exclusion — noticing others included while you were not.",

					empathyGuesses: [
						"That can feel tender… was it like watching something happen without you?",
						"Did it bring a quiet sadness?",
						"Maybe loneliness — a sense of being separate.",
						"Or anxiety, wondering what it means about your place.",
						"Sometimes there’s irritation too, if it felt careless or avoidable.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized to canonical unmet list)
						"sad", // original
						"lonely", // original
						"anxious", // original

						// ADDED — Vulnerability layer
						"hurt",
						"insecure",

						// ADDED — Protest layer (if exclusion felt dismissive)
						"annoyed",
						"resentful",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped to canonical list)
						"Inclusion",
						"Belonging",
						"Community",
						"Connection",

						// ADDED — Social recognition layer
						"To be seen",
						"Participation",
						"Mutuality",

						// ADDED — Emotional steadiness
						"Safety (emotional)",
					],
				},
				{
					item: "Unwanted",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint: "This word often carries a sense of not being desired, valued, or welcomed.",

					empathyGuesses: [
						"That sounds deeply tender… was it like not being wanted there?",
						"Did something in you sink or withdraw?",
						"Maybe there’s sadness — a heavy ache.",
						"Or anxiety, wondering whether you belong.",
						"There can also be anger underneath, especially if it felt unjust.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized to canonical unmet list)
						"sad", // original
						"anxious", // original
						"frustrated", // original

						// ADDED — Vulnerability layer
						"hurt",
						"lonely",
						"insecure",

						// ADDED — Protest layer
						"angry",
						"resentful",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped to canonical list)
						"Belonging",
						"Inclusion",
						"Care",

						// ADDED — Relational warmth layer
						"Affection",
						"Acceptance",
						"Connection",

						// ADDED — Mattering layer
						"To matter",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// RESPECT RUPTURE
		// Shared themes:
		// - Dignity impact
		// - Being diminished
		// - Social standing threatened
		// - Boundary violation

		// Emotional arc: embarrassment → hurt → anger
		//
		// Flavour differences:
		// - Belittled → made small or inferior
		// - Patronised → treated as incapable/childlike
		// - Insulted → direct verbal attack
		// ──────────────────────────────────────────────────────────

		respect: {
			ui: {
				heading: "When Respect or Dignity Felt Undermined",
				order: 30,
			},
			items: [
				{
					item: "Belittled",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint:
						"This word often carries the sense of being made small, diminished, or treated as less-than.",

					empathyGuesses: [
						"That sounds sharp… was it like something in you shrank?",
						"Did it land as hurt — like your dignity was touched?",
						"Maybe there’s anger too, a protective ‘that’s not okay.’",
						"Sometimes embarrassment shows up, especially if it happened publicly.",
						"And sometimes there’s sadness underneath, if it felt invalidating.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"hurt", // original
						"tense", // original (activation)
						"distressed", // original

						// ADDED — Protest layer
						"angry",
						"resentful",
						"indignant",

						// ADDED — Social exposure layer
						"embarrassed",
						"ashamed",

						// ADDED — Vulnerability
						"sad",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Respect",
						"Autonomy",
						"To be seen",
						"Acknowledgement",
						"Appreciation",

						// ADDED — Dignity / self-worth
						"Dignity",
						"Mutual Recognition",
						"Equality",

						// ADDED — Emotional steadiness
						"Safety (emotional)",
					],
				},
				{
					item: "Insulted",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint:
						"This word often points to a direct attack — something said or done that felt degrading or disrespectful.",

					empathyGuesses: [
						"That sounds sharp… did it land like a hit?",
						"Was there an immediate flare of anger?",
						"Maybe embarrassment too, especially if others were present.",
						"Or hurt — like something tender was touched.",
						"Sometimes shame can show up if the words got inside.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"embarrassed", // original
						"angry", // original

						// ADDED — Strong protest layer (very common in insults)
						"furious",
						"outraged",
						"indignant",
						"resentful",

						// ADDED — Vulnerability layer
						"hurt",
						"sad",

						// ADDED — Social exposure layer
						"ashamed",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Respect",
						"Consideration",
						"Acknowledgement",

						// ADDED — Dignity layer
						"Dignity",
						"Equality",
						"Mutual Recognition",

						// ADDED — Emotional safety if it felt threatening
						"Safety (emotional)",
					],
				},
				{
					item: "Criticised",
					type: "storyWord",
					ruptureType: "respect",

					storyHint:
						"This word often carries a sense that something about you or your actions was judged or diminished.",

					// ORIGINAL PRIMARY FEELINGS:
					// In pain, scared, anxious, frustrated, humiliated, embarrassed
					suggestedFeelings: [
						// Hurt layer
						"hurt", // normalized from "in pain"
						"embarrassed", // original
						"humiliated", // original

						// Fear layer
						"scared", // original
						"anxious", // original

						// Protest layer
						"frustrated", // original
						"angry",
					],

					suggestedNeeds: [
						"Respect",
						"Understanding",
						"Acknowledgement",
						"Recognition",
						"To be known/understood",
						"Compassion",
					],

					empathyGuesses: [
						"That sounds tender… did it feel like something about you was judged or picked apart?",
						"Maybe embarrassment, if it felt exposing.",
						"Or hurt, if your effort or intention wasn’t understood.",
						"And perhaps frustration, if you wished for more respect.",
						"What would have felt more dignifying there?",
					],
				},
				{
					item: "Provoked",
					type: "storyWord",
					ruptureType: "respect",

					storyHint:
						"This word often suggests you felt pushed or baited into a reaction that didn’t feel fair or respectful.",

					// ORIGINAL PRIMARY FEELINGS:
					// Frustrated, angry
					suggestedFeelings: [
						// Protest layer
						"frustrated", // original
						"angry", // original

						// Added — defensive activation
						"defensive",
						"irritated",

						// Added — possible shame layer
						"embarrassed",
					],

					suggestedNeeds: ["Respect", "Consideration", "Understanding", "Autonomy", "Space"],

					empathyGuesses: [
						"That sounds activating… did it feel like someone was pushing your buttons on purpose?",
						"Maybe anger, if you felt baited.",
						"Or frustration, if the interaction didn’t feel clean.",
						"Possibly defensiveness too — wanting to protect your dignity.",
						"What boundary might have made it feel steadier?",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// TRUST RUPTURE
		// Theme: deception or reliability break
		// Emotional arc: hurt → fear → anger

		// Shared themes:
		// - Broken agreement
		// - Deception or dishonesty
		// - Reliability fracture
		// - Expectation collapse
		//
		// Flavour differences:
		// - Betrayed → relational bond rupture
		// - Tricked → deception emphasis
		// - Cheated → fairness violation
		// ──────────────────────────────────────────────────────────

		trust: {
			ui: {
				heading: "When Trust Felt Broken",
				order: 40,
			},
			items: [
				{
					item: "Betrayed",
					type: "storyWord",
					ruptureType: "trust",

					storyHint:
						"This word often carries the sense that a bond or agreement was broken in a deeply personal way.",

					empathyGuesses: [
						"That sounds painful… did something important feel broken?",
						"Was there hurt — like trust cracked open?",
						"Maybe anger too, especially if it felt deliberate.",
						"Sometimes there’s disappointment — an expectation collapsing.",
						"And sometimes fear, if it shook your sense of safety.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"hurt", // original
						"scared", // original
						"disappointed", // original

						// ADDED — Protest layer
						"angry",
						"resentful",
						"outraged",

						// ADDED — Shock/confusion layer
						"shocked",
						"confused",

						// ADDED — Grief layer
						"sad",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Trusting",
						"Honesty",
						"Commitment",
						"Clarity",

						// ADDED — Bond layer
						"Connection",
						"Mutuality",

						// ADDED — Stability layer
						"Consistency",
						"Safety (emotional)",
					],
				},
				{
					item: "Tricked",
					type: "storyWord",
					ruptureType: "trust",

					storyHint:
						"This word often points to discovering that something wasn’t as it seemed — a sense of being misled.",

					empathyGuesses: [
						"That sounds disorienting… was it like the ground shifted under you?",
						"Did you feel embarrassed, like you’d been made a fool of?",
						"Maybe anger too — a protective ‘that’s not okay.’",
						"Sometimes there’s hurt if trust was assumed.",
						"And sometimes resentment lingers if it feels intentional.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"embarrassed", // original
						"resentful", // original

						// ADDED — Protest layer
						"angry",
						"indignant",

						// ADDED — Hurt layer
						"hurt",
						"sad",

						// ADDED — Disorientation layer
						"confused",
						"shocked",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Integrity",
						"Trusting",
						"Honesty",

						// ADDED — Cognitive steadiness
						"Clarity",

						// ADDED — Dignity / fairness layer
						"Respect",

						// ADDED — Emotional steadiness
						"Safety (emotional)",
					],
				},
				{
					item: "Cheated",
					type: "storyWord",
					ruptureType: "trust",

					storyHint:
						"This word often points to feeling unfairly treated — like something you were entitled to wasn’t honoured.",

					empathyGuesses: [
						"That sounds unfair… was it like something was taken from you?",
						"Did anger flare up — a strong sense of ‘this isn’t right’?",
						"Maybe disappointment too, especially if you expected fairness.",
						"There can also be hurt if trust was assumed.",
						"And sometimes resentment lingers if it feels intentional.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"hurt", // original

						// ADDED — Protest layer (very central here)
						"angry",
						"resentful",
						"outraged",
						"indignant",

						// ADDED — Disappointment layer
						"disappointed",

						// ADDED — Vulnerability layer
						"sad",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Honesty",
						// "Fairness", - not a canonical need; conceptually covered by justice/equity
						"Equality",
						"Trusting",
						// "Reliability", - not canonical, covered by Consistency

						// ADDED — Stability layer
						"Consistency",

						// ADDED — Respect layer
						"Respect",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// INVISIBILITY RUPTURE
		// 		Theme: not seen/heard/acknowledged
		// Emotional arc: sadness → frustration
		// Shared themes:
		// - Not being acknowledged
		// - Not being seen or heard
		// - Social erasure
		// - Disconnection from mutual recognition
		//
		// Flavour differences:
		// - Ignored → active lack of response
		// - Unseen → not recognised or noticed
		// - Unheard → not listened to or understood
		// ──────────────────────────────────────────────────────────

		invisibility: {
			ui: {
				heading: "When You Felt Unseen or Unheard",
				order: 50,
			},
			items: [
				{
					item: "Ignored",
					type: "storyWord",
					ruptureType: "invisibility",

					storyHint: "This word often points to reaching out and not receiving a response.",

					empathyGuesses: [
						"That sounds lonely… was it like you reached out and nothing came back?",
						"Did it feel quiet and heavy inside?",
						"Maybe there’s sadness here.",
						"Or anxiety, wondering whether you matter.",
						"Sometimes irritation shows up too, especially if it felt dismissive.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"lonely", // original
						"scared", // original
						"hurt", // original
						"sad", // original
						"embarrassed", // original

						// ADDED — Vulnerability layer
						"insecure",

						// ADDED — Protest layer (secondary)
						"frustrated",
						"resentful",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Connection",
						"Belonging",
						"Inclusion",
						"Community",
						"Communication",
						"To be heard",

						// ADDED — Recognition layer
						"Acknowledgement",
						"Mutual Recognition",

						// ADDED — Emotional steadiness
						"Safety (emotional)",
					],
				},

				{
					item: "Unseen",
					type: "storyWord",
					ruptureType: "invisibility",

					storyHint:
						"This word often carries the sense of not being recognised or acknowledged for who you are.",

					empathyGuesses: [
						"That sounds tender… was it like parts of you weren’t noticed?",
						"Did something in you withdraw or soften?",
						"Maybe there’s sadness — a quiet ache.",
						"Or anxiety about whether you’re valued.",
						"Sometimes frustration shows up too, especially if you tried to be clear.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"sad", // original
						"anxious", // original
						"frustrated", // original

						// ADDED — Vulnerability layer
						"lonely",
						"hurt",
						"insecure",

						// ADDED — Protest layer (secondary)
						"resentful",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Acknowledgement",
						"Appreciation",
						// "Visibility", // not canonical need; conceptually covered by recognition/acknowledgement
						"Empathy",
						"Understanding",

						// Canonical adjustments:
						"To be seen",
						"Connection",

						// ADDED — Identity layer
						"Authenticity",
					],
				},

				{
					item: "Unheard",
					type: "storyWord",
					ruptureType: "invisibility",

					storyHint:
						"This word often points to speaking or expressing something and not feeling listened to or understood.",

					empathyGuesses: [
						"That can feel frustrating… was it like your words didn’t land?",
						"Did something in you feel invisible or dismissed?",
						"Maybe there’s sadness — wanting to be understood.",
						"Or frustration if you tried to explain and weren’t met.",
						"Sometimes anger shows up if it felt repeated.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"sad", // original
						"frustrated", // original

						// ADDED — Vulnerability layer
						"hurt",
						"lonely",
						"insecure",

						// ADDED — Protest layer
						"angry",
						"resentful",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Understanding",
						"Consideration",
						"Empathy",

						// ADDED — Communication layer
						"Communication",
						"To be heard",
						"Acknowledgement",

						// ADDED — Connection layer
						"Connection",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// JUSTICE RUPTURE
		// 		Theme: fairness imbalance, moral positioning
		// Emotional arc: anger → hurt → indignation
		// Shared themes:
		// - Fairness violation
		// - Rights infringement
		// - Harm or exploitation
		// - Power imbalance
		//
		// Flavour differences:
		// - Wronged → moral unfairness
		// - Ripped off → material or effort imbalance
		// - Victimised → power imbalance / harm emphasis
		// ──────────────────────────────────────────────────────────

		justice: {
			ui: {
				heading: "When Something Felt Unfair or Harmful",
				order: 70,
			},
			items: [
				{
					item: "Wronged",
					type: "storyWord",
					ruptureType: "justice",

					storyHint: "This word often carries the sense that something unjust or unfair happened to you.",

					empathyGuesses: [
						"That sounds upsetting… did something feel morally off?",
						"Was there anger — a strong sense of ‘that’s not right’?",
						"Maybe hurt too, especially if trust was assumed.",
						"Sometimes resentment lingers when fairness feels violated.",
						"And sometimes sadness, if something important felt damaged.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"hurt", // original
						"irritated", // original
						"resentful", // original

						// ADDED — Strong protest layer
						"angry",
						"indignant",
						"outraged",

						// ADDED — Vulnerability layer
						"sad",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Respect",
						"Equality",
						"Trusting",
						"Safety (emotional)",
						// "Fairness", - not a canonical need; conceptually covered by justice/equity

						// ADDED — Integrity layer
						"Integrity",
					],
				},

				{
					item: "Ripped off",
					type: "storyWord",
					ruptureType: "justice",

					storyHint:
						"This word often points to feeling taken advantage of — especially regarding time, money, or effort.",

					empathyGuesses: [
						"That sounds infuriating… was it like something was taken from you?",
						"Did anger come up quickly?",
						"Maybe disappointment too, especially if you expected fairness.",
						"Sometimes there’s hurt underneath if trust was assumed.",
						"And sometimes resentment lingers if it feels intentional.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"disappointed", // original
						"angry", // original

						// ADDED — Strong protest layer
						"resentful",
						"outraged",
						"indignant",

						// ADDED — Vulnerability layer
						"hurt",
						"sad",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						"Consideration",
						"Equality",
						// "Fairness", - not a canonical need; conceptually covered by justice/equity
						"Acknowledgement",

						// ADDED — Respect layer
						"Respect",
					],
				},

				{
					item: "Victimised",
					type: "storyWord",
					ruptureType: "justice",

					storyHint:
						"This word often carries the sense of being harmed or targeted from a position of less power.",

					empathyGuesses: [
						"That sounds heavy… did it feel like you didn’t have power in that moment?",
						"Was there fear, if it felt unsafe?",
						"Maybe helplessness — like you couldn’t stop it.",
						"Or anger, especially if it felt unjust.",
						"Sometimes sadness follows, especially if it felt isolating.",
						"Let’s pause gently… what feels most alive right now?",
					],

					suggestedFeelings: [
						// ORIGINAL SUGGESTIONS (normalized)
						"frightened", // original (maps to scared)
						"helpless", // original

						// ADDED — Threat layer
						"scared",
						"anxious",

						// ADDED — Protest layer
						"angry",
						"resentful",

						// ADDED — Vulnerability layer
						"sad",
						"hurt",
					],

					suggestedNeeds: [
						// ORIGINAL THEMES (mapped)
						// "Empowerment", - replaced by Agency
						"Mutuality",
						"Safety (emotional)",

						// ADDED — Equality layer
						"Equality",

						// ADDED — Agency restoration
						"Agency", // maps from "empowerment"

						"Autonomy",
					],
				},
				{
					item: "Blamed",
					type: "storyWord",
					ruptureType: "justice",

					storyHint:
						"This word often carries a sense that responsibility was placed on you in a way that felt unfair or inaccurate.",

					// ORIGINAL PRIMARY FEELINGS:
					// Scared, confused, bewildered, hurt
					suggestedFeelings: [
						// Fear layer
						"scared", // original

						// Cognitive shock layer
						"confused", // original
						"bewildered", // original

						// Hurt layer
						"hurt", // original

						// Added — protest layer
						"angry",
						"resentful",
					],

					suggestedNeeds: ["Fairness", "Justice", "Understanding", "Clarity", "Respect", "Trust"],

					empathyGuesses: [
						"That sounds unfair… did it feel like something was placed on you that didn’t really belong to you?",
						"Maybe confusion, if the story didn’t match your experience.",
						"Or hurt, if your intentions weren’t seen.",
						"And possibly anger, if something felt unjust.",
						"What feels most alive as you sit with it now?",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// SAFETY RUPTURE
		// Theme: danger, harm, violation
		// Emotional arc: fear → shock → collapse

		// Theme:
		// - Threat activation
		// - Harm or violation
		// - Nervous system danger response
		//
		// Distinct from Autonomy rupture:
		// Autonomy = control interference
		// Safety = danger / harm signal
		//
		// Words here often activate fear first, then anger or collapse.
		// ──────────────────────────────────────────────────────────

		safety: {
			ui: {
				heading: "When Safety or Protection Felt Threatened",
				order: 80,
			},
			items: [
				{
					item: "Abused",
					type: "storyWord",
					ruptureType: "safety",

					storyHint:
						"This word often points to harm — emotional or physical — that felt unsafe or violating.",

					// ORIGINAL PRIMARY FEELINGS:
					// Frightened, confused
					suggestedFeelings: [
						// Fear layer (original emphasis)
						"scared", // original (Frightened normalized)
						"confused", // original

						// Added — body shock layer
						"shocked",
						"distressed",

						// Added — collapse layer
						"helpless",
					],

					suggestedNeeds: [
						// Core safety needs
						"Physical safety",
						"Safety (emotional)",
						"Protection",

						// Care restoration
						"Caring",
						"Support",

						// Boundary restoration
						"Respect",
						"Space",
					],

					empathyGuesses: [
						"That sounds deeply unsafe… did something feel violating or harmful?",
						"Is there fear here — the kind that shows up when your body didn’t feel protected?",
						"Maybe shock or confusion, if it happened suddenly or didn’t make sense.",
						"Or helplessness, if you felt you had no power to stop it.",
						"Let’s go gently… what feels most true right now?",
					],
				},

				{
					item: "Attacked",
					type: "storyWord",
					ruptureType: "safety",

					storyHint:
						"This word often carries a sense of being targeted or harmed — verbally, emotionally, or physically.",

					// ORIGINAL:
					// Scared
					suggestedFeelings: [
						// Fear layer
						"scared", // original

						// Added — protective protest
						"angry",
						"defensive",

						// Added — activation
						"tense",
					],

					suggestedNeeds: [
						"Physical safety",
						"Safety (emotional)",
						"Protection",
						"Respect",
						"Peace (external)",
					],

					empathyGuesses: [
						"That sounds frightening… did it feel like you were under threat?",
						"Was there a surge of anger — the kind that protects you?",
						"Maybe tension in your body, like you needed to brace.",
						"Let’s pause… what does your body remember about that moment?",
					],
				},

				{
					item: "Harassed",
					type: "storyWord",
					ruptureType: "safety",

					storyHint: "This word often points to repeated intrusion or unwanted pressure that felt unsafe.",

					// ORIGINAL:
					// Angry, frustrated, frightened, anxious
					suggestedFeelings: [
						// Fear layer
						"scared", // original (Frightened normalized)
						"anxious", // original

						// Protest layer
						"angry", // original
						"frustrated", // original

						// Added — overwhelm
						"overwhelmed",
					],

					suggestedNeeds: ["Safety (emotional)", "Physical safety", "Space", "Respect", "Peace (external)"],

					empathyGuesses: [
						"That sounds wearing and unsafe… was it persistent or hard to escape?",
						"Maybe anxiety, if it felt like it could happen again.",
						"And anger too — a clear ‘this isn’t okay.’",
						"Perhaps overwhelm, if it kept coming at you.",
						"What feels strongest right now?",
					],
				},

				{
					item: "Threatened",
					type: "storyWord",
					ruptureType: "safety",

					storyHint:
						"This word often signals a sense of possible harm or loss — even if nothing physical happened.",

					// ORIGINAL:
					// Scared, frightened, alarmed, agitated, anxious
					suggestedFeelings: [
						// Fear spectrum
						"scared", // original
						"anxious", // original
						"alarmed", // original
						"agitated", // original

						// Added — activation
						"tense",
					],

					suggestedNeeds: [
						"Physical safety",
						"Safety (emotional)",
						"Protection",
						"Peace of mind",
						"Stability",
					],

					empathyGuesses: [
						"That sounds scary… was there a sense something bad could happen?",
						"Maybe agitation, if your system was on high alert.",
						"Or tension, like you needed to prepare.",
						"Let’s breathe gently… what does your body say about it now?",
					],
				},

				{
					item: "Violated",
					type: "storyWord",
					ruptureType: "safety",

					storyHint:
						"This word often carries a sense that a boundary — physical, emotional, or relational — was crossed.",

					// ORIGINAL:
					// Sad, agitated, anxiety
					suggestedFeelings: [
						// Fear layer
						"anxious", // original
						"agitated", // original

						// Hurt layer
						"sad", // original
						"hurt",

						// Collapse
						"helpless",
					],

					suggestedNeeds: [
						"Safety (emotional)",
						"Physical safety",
						"Respect",
						"Space",
						"Trust",
						"Protection",
					],

					empathyGuesses: [
						"That sounds like something crossed a line… did it feel invasive?",
						"Maybe agitation or anxiety, if your body felt exposed.",
						"And possibly sadness, if something precious felt disrespected.",
						"Or helplessness, if you couldn’t stop it.",
						"Let’s move gently here… what feels most alive?",
					],
				},
			],
		},
		// ──────────────────────────────────────────────────────────
		// CARE RUPTURE
		// Theme: attachment injury, absence of nurture
		// Emotional arc: panic → sadness → longing

		// Theme:
		// - Attachment injury
		// - Lack of protection, nurture, or dependable support
		// - Bond rupture rather than exclusion
		//
		// Distinct from Belonging rupture:
		// Belonging = social exclusion
		// Care = absence of attuned protection or nurturing
		//
		// Often activates attachment fear first (panic, loneliness),
		// then sadness or collapse.
		// ──────────────────────────────────────────────────────────

		care: {
			ui: {
				heading: "When Care or Support Felt Missing",
				order: 90,
			},
			items: [
				{
					item: "Abandoned",
					type: "storyWord",
					ruptureType: "care",

					storyHint:
						"This word often carries a sense of being left without protection, connection, or reassurance.",

					// ORIGINAL PRIMARY FEELINGS:
					// Terrified, hurt, bewildered, sad, frightened, lonely
					suggestedFeelings: [
						// Fear layer
						"scared", // original (terrified/frightened normalized)

						// Sadness layer
						"sad", // original
						"hurt", // original
						"lonely", // original

						// Cognitive shock layer
						"bewildered", // original

						// Collapse layer
						"helpless",
					],

					suggestedNeeds: [
						"Connection",
						"Belonging",
						"Support",
						"Caring",
						"Nurturing",
						"Warmth",
						"Protection",
						"Trusting",
					],

					empathyGuesses: [
						"That sounds incredibly vulnerable… did it feel like you were left alone when you needed someone?",
						"Maybe fear, if it felt unsafe to be without support.",
						"And sadness or hurt, if something precious felt lost.",
						"Possibly loneliness too — that ache of disconnection.",
						"Let’s go gently… what feels closest right now?",
					],
				},

				{
					item: "Neglected",
					type: "storyWord",
					ruptureType: "care",

					storyHint:
						"This word often carries a sense of being overlooked or not tended to when care was needed.",

					// ORIGINAL:
					// Lonely, scared, anxious
					suggestedFeelings: [
						// Fear layer
						"scared", // original
						"anxious", // original

						// Sadness layer
						"lonely", // original
						"sad",

						// Added — quiet hurt
						"hurt",
					],

					suggestedNeeds: ["Connection", "Belonging", "Care", "Consideration", "Support", "Participation"],

					empathyGuesses: [
						"That sounds painful… did it feel like your needs weren’t being noticed?",
						"Maybe loneliness, if you felt unseen or unattended.",
						"Perhaps anxiety too — wondering if support would come.",
						"And hurt, if something in you longed to be cared for.",
						"What feels most alive in you as you think about it?",
					],
				},

				{
					item: "Unsupported",
					type: "storyWord",
					ruptureType: "care",

					storyHint:
						"This word often points to carrying something alone that felt too heavy to hold by yourself.",

					// ORIGINAL:
					// Sad, hurt
					suggestedFeelings: [
						// Sadness layer
						"sad", // original
						"hurt", // original

						// Added — overwhelm
						"overwhelmed",

						// Added — helpless
						"helpless",
					],

					suggestedNeeds: ["Support", "Cooperation", "Understanding", "Companionship", "Care"],

					empathyGuesses: [
						"That sounds heavy… was it like you were carrying something alone?",
						"Maybe sadness, if you longed for someone beside you.",
						"Or overwhelm, if it felt like too much without help.",
						"And possibly helplessness, if relief didn’t seem available.",
						"What would have made it feel lighter?",
					],
				},

				{
					item: "Unloved",
					type: "storyWord",
					ruptureType: "care",

					storyHint: "This word often holds a tender longing to feel cherished or valued at a deep level.",

					// ORIGINAL:
					// Bewildered, sad, frustrated
					suggestedFeelings: [
						// Sadness layer
						"sad", // original

						// Confusion layer
						"bewildered", // original

						// Protest layer
						"frustrated", // original

						// Added — hurt
						"hurt",

						// Added — lonely
						"lonely",
					],

					suggestedNeeds: ["Love", "Affection", "Warmth", "Connection", "Empathy", "Appreciation"],

					empathyGuesses: [
						"That feels tender… was there a longing to feel cherished or held close?",
						"Maybe sadness, if something in you wanted warmth.",
						"Or confusion — wondering why connection didn’t land.",
						"And possibly frustration, if you reached and didn’t feel met.",
						"What does your heart most wish for here?",
					],
				},
			],
		},
		// ──────────────────────────────────────────────────────────
		// OVERLOAD / BURDEN RUPTURE
		// Theme: capacity exceeded
		// Emotional arc: frustration → overwhelm → exhaustion

		// Theme:
		// - Excess demand
		// - Capacity exceeded
		// - Nervous system strain
		// - Unfair load or pressure
		//
		// Distinct from Justice rupture:
		// Justice = fairness violation
		// Overload = depletion + overwhelm
		//
		// Often activates frustration + overwhelm first,
		// then exhaustion or shutdown.
		// ──────────────────────────────────────────────────────────

		overload: {
			ui: {
				heading: "When Too Much Was Expected or Placed On You",
				order: 100,
			},
			items: [
				{
					item: "Dumped on",
					type: "storyWord",
					ruptureType: "overload",

					storyHint:
						"This word often carries a sense of being given responsibility or emotional weight that didn’t feel fair or manageable.",

					// ORIGINAL:
					// Angry, overwhelmed
					suggestedFeelings: [
						// Protest layer
						"angry", // original
						"frustrated",

						// Capacity layer
						"overwhelmed", // original

						// Collapse layer
						"exhausted",
					],

					suggestedNeeds: [
						"Consideration",
						"Cooperation",
						"Support",
						"Fairness",
						"Space",
						"Ease",
						"Rest/sleep",
					],

					empathyGuesses: [
						"That sounds heavy… was it like too much landed on you at once?",
						"Maybe anger, if it didn’t feel fair.",
						"And overwhelm, if your capacity felt stretched.",
						"Possibly exhaustion too — when the load keeps growing.",
						"What would have made it feel shared instead?",
					],
				},

				{
					item: "Hassled",
					type: "storyWord",
					ruptureType: "overload",

					storyHint:
						"This word often reflects repeated interruptions or demands that disrupt your pace or calm.",

					// ORIGINAL:
					// Irritated, distressed, angry, frustrated
					suggestedFeelings: [
						// Protest layer
						"irritated", // original
						"angry", // original
						"frustrated", // original

						// Activation layer
						"distressed", // original
						"tense",
					],

					suggestedNeeds: ["Space", "Ease", "Peace (external)", "Consideration", "Autonomy"],

					empathyGuesses: [
						"That sounds wearing… was it like you couldn’t settle or focus?",
						"Maybe irritation — a ‘please stop’ signal.",
						"Or tension, if your system couldn’t relax.",
						"Perhaps frustration, if your pace wasn’t respected.",
						"What would have helped you breathe more easily?",
					],
				},

				{
					item: "Overworked",
					type: "storyWord",
					ruptureType: "overload",

					storyHint: "This word often signals prolonged strain — more demand than rest or recovery.",

					// ORIGINAL:
					// Tired, frustrated, exhausted
					suggestedFeelings: [
						// Capacity layer
						"tired", // original
						"exhausted", // original

						// Protest layer
						"frustrated", // original

						// Added — depletion sadness
						"drained",
					],

					suggestedNeeds: ["Rest/sleep", "Rejuvenation", "Ease", "Consideration", "Support", "Balance"],

					empathyGuesses: [
						"That sounds draining… was it more than your system could sustain?",
						"Maybe exhaustion, if rest never caught up.",
						"Or frustration, if your limits weren’t recognised.",
						"What would real recovery look like for you?",
					],
				},

				{
					item: "Trampled",
					type: "storyWord",
					ruptureType: "overload",

					storyHint:
						"This word often carries both disrespect and overwhelm — as if your needs were pushed past.",

					// ORIGINAL:
					// Frustrated, overwhelmed
					suggestedFeelings: [
						// Protest layer
						"frustrated", // original
						"angry",

						// Capacity layer
						"overwhelmed", // original

						// Hurt layer
						"hurt",
					],

					suggestedNeeds: ["Respect", "Consideration", "Space", "Autonomy", "Support"],

					empathyGuesses: [
						"That sounds like your limits weren’t honoured… did it feel like your needs were pushed aside?",
						"Maybe frustration or anger, if you felt overrun.",
						"And overwhelm, if it was too much too fast.",
						"Possibly hurt too — if something important felt disregarded.",
						"What boundary would have protected you there?",
					],
				},
			],
		},
	},
};

export default StoryWords;
