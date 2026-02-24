export const FeelingsUnmet = {
	ui: {
		heading: "Things we might feel when our needs are not met",
		helpText: "",
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
		// Within each family, words are also ordered intentionally
		// (e.g., somatic-first, intensity gradient, or cognitive overlays last).
		//
		// This structure supports regulation, embodiment,
		// and gradual deepening rather than escalation or overwhelm.
		// ============================================================

		Afraid: {
			ui: { heading: "Afraid", order: 10 },
			items: [
				// ORDERING NOTE:
				// We're ordering by somatic experience first, cognitive interpretations later.
				// This supports regulation-first navigation: body states → core fear → escalation → story-based interpretations.

				// --- Somatic / embodied fear (felt in the body first) ---
				{
					item: "trapped",
					description: "Feeling confined or unable to move or change your situation",
					type: "primary",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "petrified",
					description: "frozen with fear",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "panicked",
					description: "overwhelmed by fear",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "terrified",
					description: "extremely afraid",
					type: "emotion",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "frightened",
					description: "suddenly scared",
					type: "emotion",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "scared",
					description: "feeling threatened",
					type: "emotion",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "afraid",
					description: "feeling fear",
					type: "emotion",
					family: "fear",
					ui: { tier: "simple" },
				},

				// --- Lower-intensity embodied vigilance ---
				{
					item: "wary",
					description: "cautious and alert",
					type: "emotion",
					family: "fear",
					ui: { tier: "more" },
				},

				// --- Anticipatory / cognitive fear ---
				{
					item: "apprehensive",
					description: "uneasy about what’s coming",
					type: "emotion",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "worried",
					description: "concerned about outcome",
					type: "cognitive",
					family: "fear",
					interpretationHint: "Often connected to thoughts like: 'Something might go wrong.'",
					ui: { tier: "more" },
				},
				{
					item: "dread",
					description: "anticipating something bad",
					type: "emotion",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "foreboding",
					description: "sense trouble is coming",
					type: "emotion",
					family: "fear",
					ui: { tier: "simple" },
				},

				// --- Story-based distrust interpretations (fear filtered through cognition) ---
				{
					item: "mistrustful",
					description: "finding it hard to trust",
					type: "cognitive",
					family: "fear",
					interpretationHint: "Often connected to thoughts like: 'It doesn’t feel safe to rely.'",
					ui: { tier: "more" },
				},
				{
					item: "suspicious",
					description: "doubting intentions",
					type: "cognitive",
					family: "fear",
					interpretationHint: "Often connected to thoughts like: 'I don’t believe their intent.'",
					ui: { tier: "more" },
				},
			],
		},

		Tense: {
			ui: { heading: "Tense", order: 20 },
			items: [
				// ORDERING NOTE:
				// We're ordering by somatic experience first, cognitive interpretations later.
				// This keeps body-based activation states visible before anxiety-story language.

				// --- Immediate body tension / activation ---
				{
					item: "tense",
					description: "body tight and braced",
					type: "activation",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "restless",
					description: "unable to settle",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "fidgety",
					description: "restless movement",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "jittery",
					description: "nervous energy",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "edgy",
					description: "on edge",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},

				// --- Escalated overwhelm / stress activation ---
				{
					item: "overwhelmed",
					description: "too much at once",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "stressed out",
					description: "under heavy pressure",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "frazzled",
					description: "overloaded and stressed",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "distressed",
					description: "emotionally strained",
					type: "activation",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "distraught",
					description: "deeply upset",
					type: "activation",
					family: "fear",
					ui: { tier: "simple" },
				},

				// --- Irritable crossover states (tension tipping toward anger) ---
				{
					item: "cranky",
					description: "irritable + tired",
					type: "activation",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "irritable",
					description: "easily annoyed",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},

				// --- Anxiety as cognitive interpretation layered on body activation ---
				{
					item: "nervous",
					description: "uneasy, slight fear",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "anxious",
					description: "worried and uneasy",
					type: "cognitive",
					family: "fear",
					interpretationHint: "Often connected to thoughts like: 'Something bad might happen.'",
					ui: { tier: "simple" },
					unpack: {
						type: "murky",
						title: "Unpack: anxious",
						intro: "This word often holds both a body sensation and a worried thought.",
						prompts: [
							{
								type: "singleChoice",
								question: "Which flavour fits most right now?",
								options: ["Nervous", "Worried", "Tense", "Scared", "Uneasy"],
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
			items: [
				// ORDERING NOTE:
				// Disquiet family ordered by:
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
					type: "activation",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "uncomfortable",
					description: "not at ease",
					type: "activation",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "troubled",
					description: "quietly concerned",
					type: "primary",
					family: "fear",
					ui: { tier: "more" },
				},

				// --- Activated disturbance ---
				{
					item: "upset",
					description: "emotionally unsettled",
					type: "primary",
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "perturbed",
					description: "disturbed or agitated",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "restless",
					description: "unable to settle",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "rattled",
					description: "shaken and unsettled",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},

				// --- Alarm / nervous system spike ---
				{
					item: "alarmed",
					description: "suddenly afraid or concerned",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "startled",
					description: "suddenly shocked",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "shocked",
					description: "deeply startled",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},

				// --- Cognitive overlay / interpretive disturbance ---
				{
					item: "disconcerted",
					description: "thrown off by something unexpected",
					type: "cognitive",
					family: "fear",
					interpretationHint: "Often connected to thoughts like: 'This isn’t what I expected.'",
					ui: { tier: "more" },
				},
				{
					item: "disturbed",
					description: "emotionally unsettled by something",
					type: "cognitive",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "discombobulated",
					description: "confused and unsettled",
					type: "cognitive",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "turmoil",
					description: "inner chaos or disturbance",
					type: "primary",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "turbulent",
					description: "emotionally stormy",
					type: "primary",
					family: "fear",
					ui: { tier: "more" },
				},
			],
		},

		Annoyed: {
			ui: { heading: "Annoyed", order: 40 },
			items: [
				// ORDERING NOTE:
				// Annoyed family ordered by:
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
					family: "anger",
					ui: { tier: "simple" },
				},
				{
					item: "irked",
					description: "slightly bothered",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "displeased",
					description: "not satisfied",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},

				// --- Sustained frustration (blocked movement energy) ---
				{
					item: "frustrated",
					description: "blocked from what one wants",
					type: "primary",
					family: "anger",
					ui: { tier: "simple" },
				},
				{
					item: "impatient",
					description: "wanting things to move faster",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "dismayed",
					description: "disturbed or disappointed",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},

				// --- Sharper aggravation ---
				{
					item: "aggravated",
					description: "strongly irritated",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "irritated",
					description: "bothered and reactive",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},

				// --- Escalation tipping point ---
				{
					item: "exasperated",
					description: "intensely frustrated",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
			],
		},

		Angry: {
			ui: { heading: "Angry", order: 50 },
			items: [
				// ORDERING NOTE:
				// Angry family ordered by:
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
					family: "anger",
					ui: { tier: "simple" },
					unpack: {
						type: "murky",
						title: "Unpack: angry",
						intro: "Anger often carries a clear 'no' or a boundary signal.",
						prompts: [
							{
								type: "text",
								question: "What felt not okay, or what line felt crossed?",
							},
							{
								type: "singleChoice",
								question: "Is this anger more like…",
								options: [
									"Hot and urgent",
									"Firm and clear",
									"Simmering / resentful",
									"Protective / defensive",
								],
							},
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
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "furious",
					description: "very strong anger",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "enraged",
					description: "overcome with anger",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "livid",
					description: "intensely furious",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},

				// --- Moral outrage layer ---
				{
					item: "indignant",
					description: "angry about perceived injustice",
					type: "cognitive",
					family: "anger",
					interpretationHint: "Often connected to thoughts like: 'This isn’t fair.'",
					ui: { tier: "more" },
				},
				{
					item: "outraged",
					description: "shocked and angry at injustice",
					type: "cognitive",
					family: "anger",
					ui: { tier: "more" },
				},

				// --- Hardened / enduring anger ---
				{
					item: "resentful",
					description: "holding onto anger over time",
					type: "cognitive",
					family: "anger",
					ui: { tier: "simple" },
				},
			],
		},

		Aversion: {
			ui: { heading: "Aversion", order: 60 },
			items: [
				// ORDERING NOTE:
				// Aversion family ordered by:
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
					family: "anger",
					ui: { tier: "simple" },
				},
				{
					item: "aversion",
					description: "strong reluctance or resistance",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},

				// --- Visceral revulsion ---
				{
					item: "disgusted",
					description: "feeling revulsion",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "repulsed",
					description: "strongly disgusted",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "appalled",
					description: "shocked and dismayed",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},
				{
					item: "horrified",
					description: "deeply shocked or disgusted",
					type: "primary",
					family: "anger",
					ui: { tier: "more" },
				},

				// --- Relational hardening ---
				{
					item: "hostile",
					description: "actively unfriendly or antagonistic",
					type: "cognitive",
					family: "anger",
					ui: { tier: "more" },
				},

				// --- Dehumanising overlays ---
				{
					item: "contempt",
					description: "seeing someone as beneath respect",
					type: "cognitive",
					family: "anger",
					interpretationHint: "Often connected to thoughts like: 'You are beneath me.'",
					ui: { tier: "more" },
				},
				{
					item: "hate",
					description: "intense and enduring aversion",
					type: "cognitive",
					family: "anger",
					ui: { tier: "simple" },
				},
			],
		},

		Vulnerable: {
			ui: { heading: "Vulnerable", order: 70 },
			items: [
				// ORDERING NOTE:
				// Vulnerable family ordered by:
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
					family: "fear",
					ui: { tier: "simple" },
				},
				{
					item: "sensitive",
					description: "easily affected",
					type: "primary",
					family: "fear",
					ui: { tier: "more" },
				},

				// --- Fragility / instability ---
				{
					item: "fragile",
					description: "easily hurt",
					type: "primary",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "shaky",
					description: "unsteady inside",
					type: "activation",
					family: "fear",
					ui: { tier: "more" },
				},

				// --- Insecurity / collapse edge ---
				{
					item: "insecure",
					description: "uncertain of worth or safety",
					type: "cognitive",
					family: "fear",
					interpretationHint: "Often connected to thoughts like: 'Am I enough?' or 'Am I safe here?'",
					ui: { tier: "simple" },
				},
				{
					item: "helpless",
					description: "without power to change things",
					type: "primary",
					family: "fear",
					ui: { tier: "simple" },
				},

				// --- Protective adaptation layered over vulnerability ---
				{
					item: "guarded",
					description: "holding back to protect oneself",
					type: "cognitive",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "reserved",
					description: "emotionally restrained",
					type: "cognitive",
					family: "fear",
					ui: { tier: "more" },
				},
				{
					item: "leery",
					description: "cautious and wary",
					type: "cognitive",
					family: "fear",
					ui: { tier: "more" },
				},
			],
		},

		Embarrassed: {
			ui: { heading: "Embarrassed", order: 80 },
			items: [
				// ORDERING NOTE:
				// Embarrassed family ordered by:
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
					family: "shame",
					ui: { tier: "more" },
				},
				{
					item: "self-conscious",
					description: "aware of how one appears to others",
					type: "cognitive",
					family: "shame",
					ui: { tier: "more" },
				},

				// --- Core embarrassment ---
				{
					item: "embarrassed",
					description: "uncomfortable about how one is seen",
					type: "primary",
					family: "shame",
					ui: { tier: "simple" },
				},
				{
					item: "chagrined",
					description: "embarrassed with mild regret",
					type: "primary",
					family: "shame",
					ui: { tier: "more" },
				},

				// --- Moral/self-evaluative layer ---
				{
					item: "ashamed",
					description: "believing something is wrong with oneself",
					type: "cognitive",
					family: "shame",
					interpretationHint: "Often connected to thoughts like: 'There’s something wrong with me.'",
					ui: { tier: "simple" },
					unpack: {
						type: "murky",
						title: "Unpack: ashamed",
						intro: "Shame often includes a tender story about belonging or worth.",
						prompts: [
							{
								type: "singleChoice",
								question: "Which feels closer?",
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
								type: "text",
								question:
									"If you were met with kindness right now, what would you want understood about you?",
							},
						],
					},
				},
				{
					item: "guilty",
					description: "believing one has done something wrong",
					type: "cognitive",
					family: "shame",
					interpretationHint: "Often connected to thoughts like: 'I shouldn’t have done that.'",
					ui: { tier: "simple" },
					unpack: {
						type: "murky",
						title: "Unpack: guilty",
						intro: "Guilt often carries an inner 'should' and a value you care about.",
						prompts: [
							{
								type: "text",
								question: "What’s the 'should' in you? (optional)",
								stem: "I should have…",
							},
							{
								type: "singleChoice",
								question: "Under the guilt, is there also…",
								options: ["Regret", "Sadness", "Fear", "Shame", "Not sure"],
							},
							{
								type: "text",
								question: "What value were you wishing to honour?",
							},
						],
					},
				},

				// --- Intensity escalation ---
				{
					item: "mortified",
					description: "deeply humiliated",
					type: "primary",
					family: "shame",
					ui: { tier: "more" },
				},
			],
		},

		Sad: {
			ui: { heading: "Sad", order: 90 },
			items: [
				// ORDERING NOTE:
				// Sad family ordered by:
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
					family: "distress",
					ui: { tier: "simple" },
				},
				{
					item: "unhappy",
					description: "not feeling joy",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "gloomy",
					description: "low in mood",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "melancholy",
					description: "deep, reflective sadness",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},

				// --- Disappointment / loss of expectation ---
				{
					item: "disappointed",
					description: "sad that expectations weren’t met",
					type: "cognitive",
					family: "distress",
					ui: { tier: "simple" },
				},
				{
					item: "discouraged",
					description: "losing hope or confidence",
					type: "cognitive",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "disheartened",
					description: "losing motivation",
					type: "cognitive",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "dejected",
					description: "low-spirited",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},

				// --- Collapse overlays ---
				{
					item: "forlorn",
					description: "feeling abandoned and sad",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "heavy hearted",
					description: "weighed down by sadness",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "wretched",
					description: "deeply unhappy",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "despondent",
					description: "in low spirits from loss of hope",
					type: "cognitive",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "despair",
					description: "complete loss of hope",
					type: "cognitive",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "hopeless",
					description: "believing nothing will improve",
					type: "cognitive",
					family: "distress",
					interpretationHint: "Often connected to thoughts like: 'There’s no point.'",
					ui: { tier: "simple" },
				},
				{
					item: "depressed",
					description: "persistent low mood",
					type: "cognitive",
					family: "distress",
					interpretationHint: "Often connected to thoughts like: 'I can’t feel anything will change.'",
					ui: { tier: "simple" },
					unpack: {
						type: "murky",
						title: "Unpack: depressed",
						intro: "This word can sometimes hold a bundle of experiences. Unpacking it can make the next step clearer.",
						prompts: [
							{
								type: "multiChoice",
								question: "Which parts are present right now?",
								options: [
									"Numb",
									"Hopeless",
									"Drained",
									"Lonely",
									"Overwhelmed",
									"Sad",
									"Disconnected",
									"Tired",
								],
							},
							{
								type: "singleChoice",
								question: "Is it more like…",
								options: ["Flat / shut down", "Heavy / grieving", "Agitated / overwhelmed", "Not sure"],
							},
							{
								type: "text",
								question: "If one small thing could shift 5%, what might that be? (optional)",
							},
						],
					},
				},
			],
		},

		Pain: {
			ui: { heading: "Pain", order: 100 },
			items: [
				// ORDERING NOTE:
				// Pain family ordered by:
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
					description: "emotionally wounded",
					type: "primary",
					family: "distress",
					ui: { tier: "simple" },
				},

				// --- Relational ache ---
				{
					item: "lonely",
					description: "feeling alone or isolated",
					type: "primary",
					family: "distress",
					ui: { tier: "simple" },
				},
				{
					item: "heartbroken",
					description: "deep emotional pain from loss",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},

				// --- Grief recognition ---
				{
					item: "grief",
					description: "deep sorrow over loss",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "bereaved",
					description: "mourning a loss",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "anguished",
					description: "experiencing intense sorrow",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},

				// --- Cognitive overlay (self-evaluative pain) ---
				{
					item: "regretful",
					description: "wishing something had been different",
					type: "cognitive",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "remorseful",
					description: "deep regret for causing harm",
					type: "cognitive",
					family: "distress",
					ui: { tier: "more" },
				},

				// --- Intensity escalation ---
				{
					item: "devastated",
					description: "overwhelmed by grief",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "agony",
					description: "extreme emotional suffering",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
			],
		},
		Disconnected: {
			ui: { heading: "Disconnected", order: 110 },
			items: [
				// ORDERING NOTE:
				// Disconnected family ordered by:
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
					family: "shutdown",
					ui: { tier: "simple" },
				},
				{
					item: "detached",
					description: "separated emotionally",
					type: "primary",
					family: "shutdown",
					ui: { tier: "simple" },
				},
				{
					item: "aloof",
					description: "keeping emotional distance",
					type: "cognitive",
					family: "shutdown",
					ui: { tier: "more" },
				},

				// --- Withdrawal ---
				{
					item: "withdrawn",
					description: "pulling away socially",
					type: "primary",
					family: "shutdown",
					ui: { tier: "more" },
				},
				{
					item: "removed",
					description: "not emotionally present",
					type: "primary",
					family: "shutdown",
					ui: { tier: "more" },
				},
				{
					item: "distracted",
					description: "mentally elsewhere",
					type: "cognitive",
					family: "shutdown",
					ui: { tier: "more" },
				},

				// --- Numbness ---
				{
					item: "numb",
					description: "without emotional feeling",
					type: "activation",
					family: "shutdown",
					ui: { tier: "simple" },
				},
				{
					item: "cold",
					description: "emotionally closed",
					type: "cognitive",
					family: "shutdown",
					ui: { tier: "more" },
				},

				// --- Collapse overlays ---
				{
					item: "uninterested",
					description: "lacking engagement",
					type: "cognitive",
					family: "shutdown",
					ui: { tier: "more" },
				},
				{
					item: "indifferent",
					description: "not caring either way",
					type: "cognitive",
					family: "shutdown",
					ui: { tier: "more" },
				},
				{
					item: "apathetic",
					description: "lacking motivation or feeling",
					type: "cognitive",
					family: "shutdown",
					ui: { tier: "more" },
				},
			],
		},
		Fatigue: {
			ui: { heading: "Fatigue", order: 120 },
			items: [
				// ORDERING NOTE:
				// Fatigue family ordered by:
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
					family: "tiredness",
					ui: { tier: "simple" },
				},
				{
					item: "sleepy",
					description: "ready for sleep",
					type: "activation",
					family: "tiredness",
					ui: { tier: "more" },
				},
				{
					item: "weary",
					description: "physically or emotionally tired",
					type: "primary",
					family: "tiredness",
					ui: { tier: "more" },
				},

				// --- Physical depletion ---
				{
					item: "listless",
					description: "lacking energy",
					type: "activation",
					family: "tiredness",
					ui: { tier: "more" },
				},
				{
					item: "lethargic",
					description: "sluggish and low-energy",
					type: "activation",
					family: "tiredness",
					ui: { tier: "more" },
				},
				{
					item: "worn out",
					description: "physically drained",
					type: "primary",
					family: "tiredness",
					ui: { tier: "more" },
				},
				{
					item: "beat",
					description: "extremely tired",
					type: "primary",
					family: "tiredness",
					ui: { tier: "more" },
				},

				// --- Full exhaustion ---
				{
					item: "exhausted",
					description: "completely drained",
					type: "primary",
					family: "tiredness",
					ui: { tier: "simple" },
				},
				{
					item: "depleted",
					description: "used up emotionally or physically",
					type: "primary",
					family: "tiredness",
					ui: { tier: "more" },
				},

				// --- Burnout overlay ---
				{
					item: "burnt out",
					description: "long-term exhaustion and overwhelm",
					type: "cognitive",
					family: "tiredness",
					ui: { tier: "more" },
				},
			],
		},
		Confused: {
			ui: { heading: "Confused", order: 130 },
			items: [
				// ORDERING NOTE:
				// Confused family ordered by:
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
					family: "confused",
					ui: { tier: "simple" },
				},
				{
					item: "hesitant",
					description: "unsure about moving forward",
					type: "cognitive",
					family: "confused",
					ui: { tier: "more" },
				},

				// --- Internal split / ambivalence ---
				{
					item: "torn",
					description: "pulled in different directions",
					type: "cognitive",
					family: "confused",
					ui: { tier: "simple" },
				},
				{
					item: "ambivalent",
					description: "holding mixed feelings",
					type: "cognitive",
					family: "confused",
					ui: { tier: "more" },
				},

				// --- Core confusion ---
				{
					item: "confused",
					description: "unclear about what is happening",
					type: "cognitive",
					family: "confused",
					ui: { tier: "simple" },
				},
				{
					item: "perplexed",
					description: "unable to understand something",
					type: "cognitive",
					family: "confused",
					ui: { tier: "more" },
				},
				{
					item: "baffled",
					description: "deeply confused",
					type: "cognitive",
					family: "confused",
					ui: { tier: "more" },
				},

				// --- Disorientation with emotional charge ---
				{
					item: "lost",
					description: "without direction or clarity",
					type: "cognitive",
					family: "confused",
					ui: { tier: "simple" },
				},
				{
					item: "mystified",
					description: "unable to make sense of something",
					type: "cognitive",
					family: "confused",
					ui: { tier: "more" },
				},
				{
					item: "dazed",
					description: "mentally stunned or unfocused",
					type: "activation",
					family: "confused",
					ui: { tier: "more" },
				},
				{
					item: "bewildered",
					description: "confused and distressed",
					type: "cognitive",
					family: "confused",
					interpretationHint: "Often connected to thoughts like: 'I don’t understand what’s happening.'",
					ui: { tier: "more" },
				},
			],
		},
		Yearning: {
			ui: { heading: "Yearning", order: 140 },
			items: [
				// ORDERING NOTE:
				// Yearning family ordered by:
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
					family: "distress",
					ui: { tier: "simple" },
				},
				{
					item: "longing",
					description: "strong desire",
					type: "primary",
					family: "distress",
					ui: { tier: "simple" },
				},

				// --- Softer reflective longing ---
				{
					item: "wistful",
					description: "gentle sadness for something desired",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "pining",
					description: "aching with desire",
					type: "primary",
					family: "distress",
					ui: { tier: "more" },
				},

				// --- Reflective comparison with the past ---
				{
					item: "nostalgic",
					description: "longing for the past",
					type: "cognitive",
					family: "distress",
					ui: { tier: "more" },
				},

				// --- Comparison overlays ---
				{
					item: "envious",
					description: "wanting what someone else has",
					type: "cognitive",
					family: "distress",
					ui: { tier: "more" },
				},
				{
					item: "jealous",
					description: "fear of losing something valued",
					type: "cognitive",
					family: "distress",
					ui: { tier: "simple" },
				},
			],
		},
	},
};

export default FeelingsUnmet;
