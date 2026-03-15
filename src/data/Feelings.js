export const Feelings = {
	ui: {
		heading: "Feelings",
		helpText: "Feelings are part of your guidance system. They can help you discover what matters most right now.",
	},

	groups: {
		// ============================================================
		// UNMET FEELINGS — REGULATION-INFORMED ORDERING
		// ============================================================
		//
		// These categories are intentionally NOT alphabetical.
		//
		// They are ordered according to a nervous-system and emotional arc:
		// threat → activation → irritation → anger → hardening
		// → exposure → shame → sadness → grief
		// → shutdown → depletion → cognitive disruption
		// → wanting energy
		//
		// Category Order:
		//
		// 1. Afraid
		// 2. Tense
		// 3. Disquiet
		// 4. Annoyed
		// 5. Angry
		// 6. Aversion
		// 7. Vulnerable
		// 8. Embarrassed
		// 9. Sad
		// 10. Pain
		// 11. Disconnected
		// 12. Fatigue
		// 13. Confused
		// 14. Yearning
		//
		// Rationale:
		// - We begin with threat and nervous-system activation.
		// - We then move through protest energy (irritation → anger → aversion).
		// - Next comes exposure and social vulnerability.
		// - Then loss and grief.
		// - Then collapse and depletion states.
		// - Then cognitive disorientation.
		// - Finally, we end with longing — which points toward life and forward movement.
		//
		// Within each group, words are also ordered intentionally
		// (e.g., somatic-first, intensity gradient, or cognitive overlays last).
		//
		// This structure supports regulation, embodiment,
		// and gradual deepening rather than escalation or overwhelm.
		// ============================================================

		Afraid: {
			ui: { heading: "Afraid", order: 10 },
			regulationType: "threat",

			items: [
				// ORDERING NOTE:
				// We're ordering by somatic experience first, cognitive interpretations later.
				// This supports regulation-first navigation: body states → core fear → escalation → story-based interpretations.

				// --- Somatic / embodied fear (felt in the body first) ---
				{
					item: "trapped",
					description: "Feeling confined or unable to move or change your situation",
					type: "primary",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "petrified",
					description: "frozen with fear",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "panicked",
					description: "overwhelmed by fear",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "terrified",
					description: "extremely afraid",
					type: "emotion",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "frightened",
					description: "suddenly scared",
					type: "emotion",
					feelingType: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "scared",
					description: "feeling threatened",
					type: "emotion",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "afraid",
					description: "feeling fear",
					type: "emotion",
					feelingType: "fear",
					ui: { tier: "simple", quickPick: true },
				},

				// --- Lower-intensity embodied vigilance ---
				{
					item: "wary",
					regulationType: ["threat", "cognitive"],
					description: "cautious and alert",
					type: "emotion",
					feelingType: "fear",
					ui: { tier: "more" },
				},

				// --- Anticipatory / cognitive fear ---
				{
					item: "apprehensive",
					description: "uneasy about what’s coming",
					type: "emotion",
					feelingType: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "worried",
					regulationType: ["threat", "cognitive"],
					description: "concerned about outcome",
					type: "cognitive",
					feelingType: "fear",
					interpretationHint: "Often connected to thoughts like: 'Something might go wrong.'",
					ui: { tier: "more" },
				},
				{
					item: "dread",
					description: "anticipating something bad",
					type: "emotion",
					feelingType: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "foreboding",
					description: "sense trouble is coming",
					type: "emotion",
					feelingType: "fear",
					ui: { tier: "simple" },
				},

				// --- Story-based distrust interpretations (fear filtered through cognition) ---
				{
					item: "mistrustful",
					regulationType: ["threat", "cognitive"],
					description: "finding it hard to trust",
					type: "cognitive",
					feelingType: "fear",
					interpretationHint: "Often connected to thoughts like: 'It doesn’t feel safe to rely.'",
					ui: { tier: "more" },
				},
				{
					item: "suspicious",
					regulationType: ["threat", "cognitive"],
					description: "doubting intentions",
					type: "cognitive",
					feelingType: "fear",
					interpretationHint: "Often connected to thoughts like: 'I don’t believe their intent.'",
					ui: { tier: "more" },
				},
			],
		},
		Tense: {
			ui: { heading: "Tense", order: 20 },
			regulationType: "activated",

			items: [
				// ORDERING NOTE:
				// We're ordering by somatic experience first, cognitive interpretations later.
				// This keeps body-based activation states visible before anxiety-story language.

				// --- Immediate body tension / activation ---
				{
					item: "tense",
					description: "body tight and braced",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "restless",
					description: "unable to settle",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "fidgety",
					description: "restless movement",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "jittery",
					description: "nervous energy",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "edgy",
					description: "on edge",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},

				// --- Escalated overwhelm / stress activation ---
				{
					item: "overwhelmed",
					regulationType: ["threat", "collapsed"],

					description: "too much at once",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "stressed out",
					description: "under heavy pressure",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "frazzled",
					description: "overloaded and stressed",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "distressed",
					regulationType: ["threat", "contracted"],

					description: "emotionally strained",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "distraught",
					regulationType: ["threat", "contracted"],
					description: "deeply upset",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "simple" },
				},

				// --- Irritable crossover states (tension tipping toward anger) ---
				{
					item: "cranky",
					regulationType: ["activated", "collapsed"],
					description: "irritable + tired",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "irritable",
					description: "easily annoyed",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},

				// --- Anxiety as cognitive interpretation layered on body activation ---
				{
					item: "nervous",
					description: "uneasy, slight fear",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "anxious",
					regulationType: ["threat", "cognitive"],
					description: "worried and uneasy",
					type: "cognitive",
					feelingType: "fear",
					interpretationHint: "Often connected to thoughts like: 'Something bad might happen.'",
					ui: { tier: "simple" },
					clarify: {
						type: "murky",
						title: "Clarify: anxious",

						attunement: [
							"Ahh… that restless edge can be hard to sit with.",
							"Yeah… anxiety can make everything feel a bit buzzy or tight.",
							"That keyed-up feeling makes sense. Something feels uncertain or at risk.",
						], // choose one to display

						normalization:
							"Anxiety often mixes body sensation with a story about what might happen. Let’s gently separate those pieces.",

						prompts: [
							{
								type: "multiChoice",
								question: "Which flavour fits most right now?",
								options: ["scared", "worried", "tense", "uneasy", "overwhelmed"],
								selectsFeeling: true,
							},

							{
								type: "text",
								question: "If there’s a worried prediction attached, what is it saying? (optional)",
								stem: "I’m afraid that…",
							},

							{
								type: "singleChoice",
								question: "Where do you feel it most in your body? (optional)",
								options: ["Chest", "Stomach", "Throat", "Jaw", "Whole body", "Not sure"],
							},
						],
					},
				},
			],
		},
		Disquiet: {
			ui: { heading: "Disquiet", order: 30 },
			regulationType: ["threat", "activated", "cognitive"],
			items: [
				// ORDERING NOTE:
				// Disquiet group ordered by:
				// mild perturbation → unsettled activation → alarm/startle → narrative disturbance
				//
				// Rationale:
				// We begin with subtle unease — states that feel like something is "off."
				// We then move toward more activated disturbance.
				// We place shock/startle later, as they are sharper nervous system spikes.
				// Finally, we place cognitively interpreted disturbance (e.g., "disconcerted")
				// at the end, because these involve meaning-making layered over activation.
				//
				// This allows users to first locate simple unease before escalating into
				// more intense or story-laden states.

				// --- Mild unease / subtle disturbance ---
				{
					item: "uneasy",
					description: "slightly unsettled",
					regulationType: ["threat"],
					type: "activation",
					feelingType: "fear",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "uncomfortable",
					regulationType: ["threat"],
					description: "not at ease",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "troubled",
					description: "quietly concerned",
					regulationType: ["threat", "cognitive"],

					type: "primary",
					feelingType: "fear",
					ui: { tier: "more" },
				},

				// --- Activated disturbance ---
				{
					item: "upset",
					regulationType: ["activated", "cognitive"],
					description: "emotionally unsettled",
					type: "primary",
					feelingType: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "perturbed",
					regulationType: ["activated"],
					description: "disturbed or agitated",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "restless",
					regulationType: ["activated"],
					description: "unable to settle",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "rattled",
					regulationType: ["activated", "threat"],
					description: "shaken and unsettled",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},

				// --- Alarm / nervous system spike ---
				{
					item: "alarmed",
					regulationType: ["threat", "activated"],
					description: "suddenly afraid or concerned",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "startled",
					regulationType: ["threat", "activated"],
					description: "suddenly shocked",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "shocked",
					regulationType: ["threat", "activated"],
					description: "deeply startled",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},

				// --- Cognitive overlay / interpretive disturbance ---
				{
					item: "disconcerted",
					regulationType: ["cognitive", "threat"],
					description: "thrown off by something unexpected",
					type: "cognitive",
					feelingType: "fear",
					interpretationHint: "Often connected to thoughts like: 'This isn’t what I expected.'",
					ui: { tier: "more" },
				},
				{
					item: "disturbed",
					regulationType: ["threat", "activated"],
					description: "emotionally unsettled by something",
					type: "cognitive",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "discombobulated",
					regulationType: "cognitive",
					description: "confused and unsettled",
					type: "cognitive",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "turmoil",
					regulationType: ["activated", "threat"],
					description: "inner chaos or disturbance",
					type: "primary",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "turbulent",
					regulationType: ["activated"],
					description: "emotionally stormy",
					type: "primary",
					feelingType: "fear",
					ui: { tier: "more" },
				},
			],
		},
		Annoyed: {
			ui: { heading: "Annoyed", order: 40 },
			regulationType: "activated",

			items: [
				// ORDERING NOTE:
				// Annoyed group ordered by:
				// mild irritation → sustained frustration → sharper aggravation → reactivity
				//
				// Rationale:
				// We begin with light, everyday irritation states that are easy to own.
				// We then move toward frustration, which signals blocked movement.
				// After that come sharper, more reactive states.
				// We place exasperated last because it represents prolonged irritation
				// tipping toward escalation.
				//
				// This supports regulation by letting users first identify mild annoyance
				// before encountering higher charge states.

				// --- Mild irritation ---
				{
					item: "annoyed",
					description: "mildly irritated",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "irked",
					description: "slightly bothered",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "displeased",
					description: "not satisfied",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},

				// --- Sustained frustration (blocked movement energy) ---
				{
					item: "frustrated",
					description: "blocked from what one wants",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "simple" },
				},
				{
					item: "impatient",
					description: "wanting things to move faster",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "dismayed",
					description: "disturbed or disappointed",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},

				// --- Sharper aggravation ---
				{
					item: "aggravated",
					description: "strongly irritated",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "irritated",
					description: "bothered and reactive",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},

				// --- Escalation tipping point ---
				{
					item: "exasperated",
					description: "intensely frustrated",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
			],
		},
		Angry: {
			ui: { heading: "Angry", order: 50 },
			regulationType: "activated",
			items: [
				// ORDERING NOTE:
				// Angry group ordered by:
				// clean anger → protective anger → moral outrage → hardened resentment
				//
				// Rationale:
				// We begin with simple, direct anger ("angry") — the most usable form.
				// We then move toward stronger protective escalation.
				// After that come moralized anger states (indignant, outraged).
				// Finally, we place resentment last because it carries story,
				// duration, and relational hardening.
				//
				// This ordering supports regulation by keeping anger accessible
				// before it becomes moral narrative or entrenched grievance.

				// --- Clean anger ---
				{
					item: "angry",
					description: "strong displeasure or protest",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "simple", quickPick: true },
					clarify: {
						type: "murky",
						title: "Clarify: angry",

						// Attune first — herd energy, without escalation.
						attunement: [
							"Ohhh. That surge makes sense. Something in you is really saying no.",
							"Yeah… anger can come in strong when something doesn’t feel okay.",
							"Of course something’s fired up. Anger usually means something matters.",
						], // UI to randomly select one of these attunement statements to normalize the experience.

						// Normalize protective function.
						normalization:
							"Anger often shows up to protect something important — a boundary, a value, or something tender underneath.",

						prompts: [
							// Differentiate flavour — reduces global activation.
							{
								type: "singleChoice",
								question: "If you feel into it, what kind of anger does this feel like right now?",
								options: [
									"Hot and urgent",
									"Firm and clear",
									"Simmering / resentful",
									"Protective / defensive",
									"Not sure",
								],
							},

							// Structured pivot to underlying layer.
							{
								type: "multiChoice",
								question:
									"If you slow it down just a little… can you see what the anger might be protecting here?",
								options: ["hurt", "scared", "overwhelmed"],
								selectsFeeling: true,
							},

							// Bridge toward needs.
							{
								type: "text",
								question: "What are you protecting or standing up for here? (optional)",
							},
						],
					},
				},

				// --- Protective escalation ---
				{
					item: "irate",
					description: "intensely angry",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "furious",
					description: "very strong anger",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "enraged",
					description: "overcome with anger",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "livid",
					description: "intensely furious",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},

				// --- Moral outrage layer ---
				{
					item: "indignant",
					description: "angry about perceived injustice",
					type: "cognitive",
					feelingType: "anger",
					interpretationHint: "Often connected to thoughts like: 'This isn’t fair.'",
					ui: { tier: "more" },
				},
				{
					item: "outraged",
					description: "shocked and angry at injustice",
					type: "cognitive",
					feelingType: "anger",
					ui: { tier: "more" },
				},

				// --- Hardened / enduring anger ---
				{
					item: "resentful",
					description: "holding onto anger over time",
					type: "cognitive",
					feelingType: "anger",
					ui: { tier: "simple" },
				},
			],
		},
		Aversion: {
			ui: { heading: "Aversion", order: 60 },
			regulationType: "activated",

			items: [
				// ORDERING NOTE:
				// Aversion group ordered by:
				// mild push-away → revulsion → hostility → contempt/hate
				//
				// Rationale:
				// We begin with softer distancing states ("dislike", "aversion").
				// We then move into visceral repulsion.
				// After that come relational hardening states (hostile).
				// Finally, we place contempt and hate last because they are
				// heavily story-laden and dehumanising overlays.
				//
				// This ordering supports regulation by allowing users to recognise
				// early distancing before encountering hardened relational rupture.

				// --- Mild distancing / push-away ---
				{
					item: "dislike",
					description: "not enjoying or approving",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "simple" },
				},
				{
					item: "aversion",
					description: "strong reluctance or resistance",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more", quickPick: true },
				},

				// --- Visceral revulsion ---
				{
					item: "disgusted",
					description: "feeling revulsion",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "repulsed",
					description: "strongly disgusted",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "appalled",
					description: "shocked and dismayed",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},
				{
					item: "horrified",
					description: "deeply shocked or disgusted",
					type: "primary",
					feelingType: "anger",
					ui: { tier: "more" },
				},

				// --- Relational hardening ---
				{
					item: "hostile",
					description: "actively unfriendly or antagonistic",
					type: "cognitive",
					feelingType: "anger",
					ui: { tier: "more" },
				},

				// --- Dehumanising overlays ---
				{
					item: "contempt",
					description: "seeing someone as beneath respect",
					type: "cognitive",
					feelingType: "anger",
					interpretationHint: "Often connected to thoughts like: 'You are beneath me.'",
					ui: { tier: "more" },
				},
				{
					item: "hate",
					description: "intense and enduring aversion",
					type: "cognitive",
					feelingType: "anger",
					ui: { tier: "simple" },
				},
			],
		},
		Vulnerable: {
			ui: { heading: "Vulnerable", order: 70 },
			regulationType: "contracted",

			items: [
				// ORDERING NOTE:
				// Vulnerable group ordered by:
				// open exposure → fragility → insecurity → guarded protection
				//
				// Rationale:
				// We begin with accessible, clean vulnerability (soft openness).
				// We then move toward feelings of fragility and instability.
				// We place insecurity and helplessness after that, as they begin to
				// carry collapse energy.
				// Finally, we place guarded/reserved later, because they reflect
				// protective adaptations layered over vulnerability.
				//
				// This supports regulation by allowing the user to first recognise
				// simple exposure before encountering defensive or collapse states.

				// --- Open exposure / soft vulnerability ---
				{
					item: "vulnerable",
					description: "emotionally exposed",
					type: "primary",
					feelingType: "fear",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "sensitive",
					description: "easily affected",
					type: "primary",
					feelingType: "fear",
					ui: { tier: "more" },
				},

				// --- Fragility / instability ---
				{
					item: "fragile",
					description: "easily hurt",
					type: "primary",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "shaky",
					description: "unsteady inside",
					type: "activation",
					feelingType: "fear",
					ui: { tier: "more" },
				},

				// --- Insecurity / collapse edge ---
				{
					item: "insecure",
					description: "uncertain of worth or safety",
					type: "cognitive",
					feelingType: "fear",
					interpretationHint: "Often connected to thoughts like: 'Am I enough?' or 'Am I safe here?'",
					ui: { tier: "simple" },
				},
				{
					item: "helpless",
					description: "without power to change things",
					type: "primary",
					feelingType: "fear",
					ui: { tier: "simple" },
				},

				// --- Protective adaptation layered over vulnerability ---
				{
					item: "guarded",
					description: "holding back to protect oneself",
					type: "cognitive",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "reserved",
					description: "emotionally restrained",
					type: "cognitive",
					feelingType: "fear",
					ui: { tier: "more" },
				},
				{
					item: "leery",
					description: "cautious and wary",
					type: "cognitive",
					feelingType: "fear",
					ui: { tier: "more" },
				},
			],
		},
		Embarrassed: {
			ui: { heading: "Embarrassed", order: 80 },
			regulationType: ["contracted", "cognitive"],

			items: [
				// ORDERING NOTE:
				// Embarrassed group ordered by:
				// awkward self-consciousness → embarrassment → shame/guilt → mortification
				//
				// Rationale:
				// We begin with lighter, socially awkward exposure states.
				// We then move into embarrassment proper.
				// We place shame and guilt later because they carry heavier
				// self-evaluation and moral overlay.
				// "Mortified" is placed last because it represents intensity escalation.
				//
				// This ordering supports regulation by allowing users to first
				// identify workable social discomfort before encountering collapse-heavy
				// or morally loaded states.

				// --- Mild social awkwardness ---
				{
					item: "flustered",
					description: "thrown off balance socially",
					type: "activation",
					feelingType: "shame",
					ui: { tier: "more" },
				},
				{
					item: "self-conscious",
					regulationType: ["contracted", "cognitive"],
					description: "aware of how one appears to others",
					type: "cognitive",
					feelingType: "shame",
					ui: { tier: "more" },
				},

				// --- Core embarrassment ---
				{
					item: "embarrassed",
					description: "uncomfortable about how one is seen",
					type: "primary",
					feelingType: "shame",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "chagrined",
					description: "embarrassed with mild regret",
					type: "primary",
					feelingType: "shame",
					ui: { tier: "more" },
				},

				// --- Moral/self-evaluative layer ---
				{
					item: "ashamed",
					regulationType: ["contracted", "cognitive"],
					description: "believing something is wrong with oneself",
					type: "cognitive",
					feelingType: "shame",
					interpretationHint: "Often connected to thoughts like: 'There’s something wrong with me.'",
					ui: { tier: "simple" },
					clarify: {
						type: "murky",
						title: "Clarify: ashamed",

						attunement: [
							"Oof… shame can feel really tender.",
							"That one can land heavy. You don’t have to face it alone here.",
							"Yeah… shame has a way of shrinking us. Let’s go gently.",
						], // display ONE of these, randomly

						normalization:
							"Shame often carries a story about belonging, worth, or whether we’re still okay in the eyes of others — or ourselves. \
							And feeling shame doesn't mean you're BAD or broken. It often means you care about something deeply, and that something feels at risk.",

						prompts: [
							{
								type: "singleChoice",
								question: "Which feels closer right now?",
								options: [
									"I did something wrong",
									"There’s something wrong with me",
									"Both",
									"Not sure",
								],
							},

							{
								type: "text",
								question: "If there’s a harsh inner sentence attached, what is it saying? (optional)",
								stem: "The story is…",
							},
							{
								type: "multiChoice",
								question: "Under the shame, is there also something else present?",
								options: ["scared", "hurt", "sad", "lonely", "disappointed", "guilty"],
								selectsFeeling: true,
							},
							{
								type: "text",
								question:
									"If you were met with real kindness right now, what would you want understood about you?",
							},
						],
					},
				},
				{
					item: "guilty",
					description: "believing one has done something wrong",
					regulationType: ["contracted", "cognitive"],
					type: "cognitive",
					feelingType: "shame",
					interpretationHint: "Often connected to thoughts like: 'I shouldn’t have done that.'",
					ui: { tier: "simple", quickPick: true },
					clarify: {
						type: "murky",
						title: "Clarify: guilty",

						attunement: [
							"Ah… that tight, sinking feeling.",
							"Guilt can feel really uncomfortable — like an inner ‘should’ pressing in.",
							"Yeah… that sense of having missed something important.",
						],

						normalization:
							"Guilt often carries a value you care about. Let’s gently look at what’s underneath.",

						prompts: [
							{
								type: "text",
								question: "What’s the ‘should’ voice saying? (optional)",
								stem: "I should have…",
							},

							{
								type: "multiChoice",
								question: "Under the guilt, is there also…",
								options: ["regret", "sad", "scared", "ashamed"],
								selectsFeeling: true,
							},

							{
								type: "text",
								question: "What value were you wanting to honour?",
							},
						],
					},
				},

				// --- Intensity escalation ---
				{
					item: "mortified",
					description: "deeply humiliated",
					type: "primary",
					feelingType: "shame",
					ui: { tier: "more" },
				},
			],
		},
		Sad: {
			ui: { heading: "Sad", order: 90 },
			regulationType: "collapsed",

			items: [
				// ORDERING NOTE:
				// Sad group ordered by:
				// simple sadness → disappointment → discouragement → despair/depression overlays
				//
				// Rationale:
				// We begin with clean, accessible sadness ("sad", "unhappy").
				// We then move toward disappointment and discouragement,
				// which signal loss of expectation or momentum.
				// Finally, we place despair and depression-related states later,
				// because they carry collapse and cognitive overlay.
				//
				// This supports regulation by allowing users to recognise
				// workable sadness before encountering heavier shutdown states.

				// --- Clean sadness ---
				{
					item: "sad",
					description: "feeling sorrow",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "unhappy",
					description: "not feeling joy",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "gloomy",
					description: "low in mood",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "melancholy",
					description: "deep, reflective sadness",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},

				// --- Disappointment / loss of expectation ---
				{
					item: "disappointed",
					regulationType: ["contracted", "cognitive"],

					description: "sad that expectations weren’t met",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "simple" },
				},
				{
					item: "discouraged",
					description: "losing hope or confidence",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "disheartened",
					description: "losing motivation",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "dejected",
					description: "low-spirited",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},

				// --- Collapse overlays ---
				{
					item: "forlorn",
					description: "feeling abandoned and sad",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "heavy hearted",
					description: "weighed down by sadness",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},

				{
					item: "miserable",
					regulationType: ["collapsed", "contracted"],
					description: "deeply unhappy",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "despondent",
					description: "in low spirits from loss of hope",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "despair",
					regulationType: ["collapsed", "contracted"],
					description: "complete loss of hope",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "hopeless",
					regulationType: ["collapsed", "contracted"],
					description: "believing nothing will improve",
					type: "cognitive",
					feelingType: "distress",
					interpretationHint: "Often connected to thoughts like: 'There’s no point.'",
					ui: { tier: "simple" },
				},
				{
					item: "depressed",
					regulationType: ["collapsed", "cognitive"],
					description: "persistent low mood",
					type: "cognitive",
					feelingType: "distress",
					interpretationHint: "Often connected to thoughts like: 'I can’t feel anything will change.'",
					ui: { tier: "simple" },
					clarify: {
						type: "murky",
						title: "Clarify: depressed",

						attunement: ["Depression is so cruel. Me too. Me too. You're not alone."],

						normalization:
							"‘Depressed’ is such a bundle of pain. What other feelings can you identify as being part of it?",

						prompts: [
							{
								type: "multiChoice",
								question: "Which parts are present right now?",
								options: ["sad", "hopeless", "lonely", "overwhelmed", "tired", "numb", "disconnected"],
								selectsFeeling: true,
							},
						],
					},
				},
			],
		},
		Pain: {
			ui: { heading: "Pain", order: 100 },
			regulationType: "contracted",

			items: [
				// ORDERING NOTE:
				// Pain group ordered by:
				// hurt/ache → loneliness → heartbreak → grief/loss → devastation
				//
				// Rationale:
				// We begin with accessible hurt — the most relatable entry point.
				// We then move into relational pain (lonely, heartbroken).
				// After that comes grief and bereavement (loss recognition).
				// Finally, we place devastation and agony last because they represent
				// intensity escalation and emotional overwhelm.
				//
				// Regret and remorse are placed later because they contain
				// cognitive self-evaluation layered onto pain.
				//
				// This supports regulation by allowing gentle entry into grief
				// before encountering overwhelming states.

				// --- Accessible hurt ---
				{
					item: "hurt",
					regulationType: "contracted",

					description: "emotionally wounded",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "simple", quickPick: true },
				},

				// --- Relational ache ---
				{
					item: "lonely",
					regulationType: "contracted",

					description: "feeling alone or isolated",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "simple" },
				},
				{
					item: "heartbroken",
					description: "deep emotional pain from loss",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},

				// --- Grief recognition ---
				{
					item: "grief",
					description: "deep sorrow over loss",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "bereaved",
					description: "mourning a loss",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "anguished",
					description: "experiencing intense sorrow",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},

				// --- Cognitive overlay (self-evaluative pain) ---
				{
					item: "regretful",
					regulationType: ["contracted", "cognitive"],
					description: "wishing something had been different",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "remorseful",
					regulationType: ["contracted", "cognitive"],
					description: "deep regret for causing harm",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "more" },
				},

				// --- Intensity escalation ---
				{
					item: "devastated",
					regulationType: ["collapsed", "contracted"],
					description: "overwhelmed by grief",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "agony",
					description: "extreme emotional suffering",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
			],
		},
		Disconnected: {
			ui: { heading: "Disconnected", order: 110 },
			regulationType: "collapsed",

			items: [
				// ORDERING NOTE:
				// Disconnected group ordered by:
				// mild distance → withdrawal → numbness → apathy/collapse overlays
				//
				// Rationale:
				// We begin with simple emotional distance — states that still contain awareness.
				// We then move toward social withdrawal.
				// After that comes numbness — reduced emotional access.
				// Finally, we place apathy and indifference last because they represent
				// deeper shutdown and reduced vitality.
				//
				// This supports regulation by allowing users to first recognise
				// subtle disconnection before encountering collapse-heavy states.

				// --- Mild distance ---
				{
					item: "distant",
					description: "not feeling close",
					type: "primary",
					feelingType: "shutdown",
					ui: { tier: "simple" },
				},
				{
					item: "detached",
					description: "separated emotionally",
					type: "primary",
					feelingType: "shutdown",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "aloof",
					description: "keeping emotional distance",
					type: "cognitive",
					feelingType: "shutdown",
					ui: { tier: "more" },
				},

				// --- Withdrawal ---
				{
					item: "withdrawn",
					description: "pulling away socially",
					type: "primary",
					feelingType: "shutdown",
					ui: { tier: "more" },
				},
				{
					item: "removed",
					description: "not emotionally present",
					type: "primary",
					feelingType: "shutdown",
					ui: { tier: "more" },
				},
				{
					item: "distracted",
					description: "mentally elsewhere",
					type: "cognitive",
					feelingType: "shutdown",
					ui: { tier: "more" },
				},

				// --- Numbness ---
				{
					item: "numb",
					description: "without emotional feeling",
					type: "activation",
					feelingType: "shutdown",
					ui: { tier: "simple" },
				},
				{
					item: "cold",
					description: "emotionally closed",
					type: "cognitive",
					feelingType: "shutdown",
					ui: { tier: "more" },
				},

				// --- Collapse overlays ---
				{
					item: "uninterested",
					description: "lacking engagement",
					type: "cognitive",
					feelingType: "shutdown",
					ui: { tier: "more" },
				},
				{
					item: "indifferent",
					description: "not caring either way",
					type: "cognitive",
					feelingType: "shutdown",
					ui: { tier: "more" },
				},
				{
					item: "apathetic",
					description: "lacking motivation or feeling",
					type: "cognitive",
					feelingType: "shutdown",
					ui: { tier: "more" },
				},
			],
		},
		Fatigue: {
			ui: { heading: "Fatigue", order: 120 },
			regulationType: "collapsed",

			items: [
				// ORDERING NOTE:
				// Fatigue group ordered by:
				// simple tiredness → physical depletion → exhaustion → burnout overlay
				//
				// Rationale:
				// We begin with everyday tired states that are easy to recognise.
				// We then move toward stronger physical depletion.
				// After that comes full exhaustion.
				// Finally, we place "burnt out" last because it carries
				// narrative meaning (long-term overwhelm, systemic depletion).
				//
				// This supports regulation by allowing users to first identify
				// simple tiredness before encountering identity-level depletion.

				// --- Everyday tiredness ---
				{
					item: "tired",
					description: "needing rest",
					type: "activation",
					feelingType: "tiredness",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "sleepy",
					description: "ready for sleep",
					type: "activation",
					feelingType: "tiredness",
					ui: { tier: "more" },
				},
				{
					item: "weary",
					description: "physically or emotionally tired",
					type: "primary",
					feelingType: "tiredness",
					ui: { tier: "more" },
				},

				// --- Physical depletion ---
				{
					item: "listless",
					description: "lacking energy",
					type: "activation",
					feelingType: "tiredness",
					ui: { tier: "more" },
				},
				{
					item: "lethargic",
					description: "sluggish and low-energy",
					type: "activation",
					feelingType: "tiredness",
					ui: { tier: "more" },
				},
				{
					item: "worn out",
					description: "physically drained",
					type: "primary",
					feelingType: "tiredness",
					ui: { tier: "more" },
				},
				{
					item: "beat",
					description: "extremely tired",
					type: "primary",
					feelingType: "tiredness",
					ui: { tier: "more" },
				},

				// --- Full exhaustion ---
				{
					item: "exhausted",
					description: "completely drained",
					type: "primary",
					feelingType: "tiredness",
					ui: { tier: "simple" },
				},
				{
					item: "depleted",
					description: "used up emotionally or physically",
					type: "primary",
					feelingType: "tiredness",
					ui: { tier: "more" },
				},

				// --- Burnout overlay ---
				{
					item: "burnt out",
					description: "long-term exhaustion and overwhelm",
					type: "cognitive",
					feelingType: "tiredness",
					ui: { tier: "more" },
				},
			],
		},
		Confused: {
			ui: { heading: "Confused", order: 130 },
			regulationType: ["cognitive", "activated"],

			items: [
				// ORDERING NOTE:
				// Confused group ordered by:
				// mild uncertainty → ambivalence → disorientation → distressed confusion
				//
				// Rationale:
				// We begin with light uncertainty that still feels workable.
				// We then move toward internal split or indecision.
				// After that comes deeper disorientation.
				// Finally, we place bewildered/dazed later because they combine
				// cognitive disruption with emotional distress.
				//
				// This supports regulation by allowing users to first recognise
				// simple uncertainty before encountering destabilising confusion.

				// --- Mild uncertainty ---
				{
					item: "puzzled",
					description: "not fully understanding",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "simple" },
				},
				{
					item: "hesitant",
					description: "unsure about moving forward",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "more" },
				},

				// --- Internal split / ambivalence ---
				{
					item: "torn",
					description: "pulled in different directions",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "simple" },
				},
				{
					item: "ambivalent",
					description: "holding mixed feelings",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "more" },
				},

				// --- Core confusion ---
				{
					item: "confused",
					description: "unclear about what is happening",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "perplexed",
					description: "unable to understand something",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "more" },
				},
				{
					item: "baffled",
					description: "deeply confused",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "more" },
				},

				// --- Disorientation with emotional charge ---
				{
					item: "lost",
					description: "without direction or clarity",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "simple" },
				},
				{
					item: "mystified",
					description: "unable to make sense of something",
					type: "cognitive",
					feelingType: "confused",
					ui: { tier: "more" },
				},
				{
					item: "dazed",
					description: "mentally stunned or unfocused",
					type: "activation",
					feelingType: "confused",
					ui: { tier: "more" },
				},
				{
					item: "bewildered",
					description: "confused and distressed",
					type: "cognitive",
					feelingType: "confused",
					interpretationHint: "Often connected to thoughts like: 'I don’t understand what’s happening.'",
					ui: { tier: "more" },
				},
			],
		},
		Yearning: {
			ui: { heading: "Yearning", order: 140 },
			regulationType: "contracted",

			items: [
				// ORDERING NOTE:
				// Yearning group ordered by:
				// longing/yearning → wistful/pining → nostalgic → jealous/envious
				//
				// Rationale:
				// We begin with clean desire — simple wanting energy.
				// We then move into wistfulness and softer longing.
				// Nostalgia follows, as it contains reflective comparison with the past.
				// Finally, we place jealousy and envy last because they are
				// comparison-based overlays that often include story and self-evaluation.
				//
				// This supports regulation by keeping pure desire visible
				// before narrative comparison enters.

				// --- Clean wanting energy ---
				{
					item: "yearning",
					description: "deep desire for something",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "simple", quickPick: true },
				},
				{
					item: "longing",
					description: "strong desire",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "simple" },
				},

				// --- Softer reflective longing ---
				{
					item: "wistful",
					regulationType: ["contracted", "cognitive"],
					description: "gentle sadness for something desired",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "pining",
					description: "aching with desire",
					type: "primary",
					feelingType: "distress",
					ui: { tier: "more" },
				},

				// --- Reflective comparison with the past ---
				{
					item: "nostalgic",
					regulationType: ["settled", "cognitive"],
					description: "longing for the past",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "more" },
				},

				// --- Comparison overlays ---
				{
					item: "envious",
					regulationType: ["activated", "cognitive"],
					description: "wanting what someone else has",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "more" },
				},
				{
					item: "jealous",
					regulationType: ["activated", "cognitive"],
					description: "fear of losing something valued",
					type: "cognitive",
					feelingType: "distress",
					ui: { tier: "simple" },
				},
			],
		},
	},
};

export default Feelings;
