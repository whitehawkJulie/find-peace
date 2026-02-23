const needsData = {
	"Subsistence and Security": {
		"Physical sustenance": [
			{
				item: "Air",
				meaning: "Clean air to breathe",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What does having enough clean air actually look like for you right now? Is it about your environment, or a feeling of being able to breathe freely?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Food",
				meaning: "Nourishing and satisfying meals",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about having enough food, or about the quality and nourishment of what you're eating? What would feel satisfying right now?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Health",
				meaning: "Physical well-being",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What aspect of your health feels most alive right now — is it about energy, pain, capacity, or something else?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_CONC_02",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Movement",
				meaning: "Freedom to move and be active",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What kind of movement is calling you? Is it about exercise, freedom to go somewhere, or just not feeling stuck?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Physical Safety",
				meaning: "Freedom from physical harm",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is there a specific physical threat you're aware of, or is it a more general sense of wanting to feel safe in your body and surroundings?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_02",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Rest / sleep",
				meaning: "Deep rest and renewal",
				status: "",
				unpackEnabled: true,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about literal sleep, or about a deeper kind of rest — permission to stop, to not be productive for a while?",
						deeper_specific_optional: "What would you need to let go of in order to truly rest?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_CONC_02",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Shelter",
				meaning: "Safe and secure housing",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about having a physical place to live, or about feeling at home and settled somewhere?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Touch",
				meaning: "Comforting physical contact",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What kind of touch are you longing for? A hug, a hand on your shoulder, or simply being physically close to someone?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Water",
				meaning: "Clean water for drinking and hygiene",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about literal access to water, or does it point to something about basic sustenance and having your fundamental needs met?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
		],
		Security: [
			{
				item: "Consistency",
				meaning: "Predictability and reliability",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What kind of consistency matters most here — in someone's behaviour, in your routine, or in how things are going?",
						deeper_specific_optional:
							"Is there a specific inconsistency that's making things hard right now?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Order/Structure",
				meaning: "Clarity and organization",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about wanting things around you to be organised, or about an inner sense of knowing what comes next?",
						deeper_specific_optional:
							"What would 'enough' structure look like — not rigid, but enough to feel settled?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_LOAD_02",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Peace (external)",
				meaning: "Safety from external conflict",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about wanting the conflict around you to stop, or about finding a way to feel less affected by it?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Peace of mind",
				meaning: "Freedom from internal turmoil",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What's currently disturbing your peace of mind? Is it worry about the future, regret about the past, or something unresolved right now?",
						deeper_specific_optional:
							"What would need to happen — even internally — for some of that noise to quiet?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Protection",
				meaning: "Being guarded from harm",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What are you wanting protection from? Is it a person, a situation, or your own feelings?",
						deeper_specific_optional:
							"Is this about someone stepping in for you, or about feeling stronger yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_LOAD_02",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Safety (emotional)",
				meaning: "Freedom to be emotionally vulnerable",
				status: "",
				unpackEnabled: true,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What would emotional safety look like here — being able to say what you feel without being judged, or knowing you won't be hurt for being open?",
						deeper_specific_optional:
							"Is there something specific you'd want to express if you felt safe enough?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Stability",
				meaning: "Steadiness in life circumstances",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What part of your life feels unsteady right now? Is it practical things, a relationship, or your own inner state?",
						deeper_specific_optional:
							"What would 'stable enough' feel like — even if everything isn't perfect?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_LOAD_03",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Trusting",
				meaning: "Confidence in people and systems",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about trusting a specific person, or about a more general sense that things will be okay?",
						deeper_specific_optional:
							"What would someone need to do — or stop doing — for trust to start rebuilding?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_LOAD_02",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
		],
	},

	Connection: {
		Affection: [
			{
				item: "Affection",
				meaning: "Expressions of emotional warmth and connection",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What kind of affection are you longing for — words, gestures, physical warmth, or simply knowing someone cares?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Appreciation",
				meaning: "Being seen and valued",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What would appreciation look like here? Is it about being thanked, being noticed, or having your effort acknowledged?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Attention",
				meaning: "Being genuinely noticed",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"When you say you need attention, is it about someone being present with you, or about feeling like you matter enough to be noticed?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Closeness",
				meaning: "Emotional and/or physical intimacy",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about physical closeness, emotional closeness, or both? What does being close actually look like for you?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Connection",
				meaning: "Feeling linked to others and to life",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this connection to a specific person, to a group, or to something bigger — life, nature, meaning?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Companionship",
				meaning: "Enjoying life with others",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about having someone to do things with, or about not feeling alone in your experience?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Harmony",
				meaning: "Cooperation and mutual support",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is the harmony you're wanting about people getting along, or about feeling at ease in your relationships?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Intimacy",
				meaning: "Mutual vulnerability and closeness",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What does intimacy mean for you here — emotional openness, physical closeness, or the feeling of being truly known?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Love",
				meaning: "Unconditional acceptance and care",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"When you notice this need for love, is it about receiving it, giving it, or knowing it's there even when it's not being said?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Nurturing",
				meaning: "Care that supports growth and healing",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Are you wanting to be nurtured by someone, or are you noticing a need to nurture yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Sexual expression",
				meaning: "Authentic physical intimacy",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about physical desire, about feeling wanted, or about a deeper sense of being fully alive with another person?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Support",
				meaning: "Practical or emotional backing",
				status: "",
				unpackEnabled: true,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What kind of support would help most — someone to listen, someone to help practically, or just knowing someone has your back?",
						deeper_specific_optional:
							"Is there something you've been carrying alone that you wish you didn't have to?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Tenderness",
				meaning: "Gentle, caring touch or tone",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What would tenderness look like here — a softer tone, a gentle gesture, or simply someone being careful with you?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Warmth",
				meaning: "A sense of friendliness and care",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is the warmth you're wanting from a specific person, or is it about the overall atmosphere around you?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
		],
		"To matter": [
			{
				item: "To matter",
				meaning: "To know that I am valued",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Who do you most want to matter to right now? And what would tell you that you do?",
						deeper_specific_optional:
							"Is this about mattering to others, or about remembering that you matter to yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Acceptance",
				meaning: "Welcomed just as I am",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What part of you is wanting acceptance right now — a decision you made, something you feel, or just who you are?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Care",
				meaning: "Concern for my well-being",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What would care look like in this situation — someone checking in, offering help, or just noticing you're struggling?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Compassion",
				meaning: "Understanding and warmth in response to suffering",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Are you wanting compassion from someone else, or noticing you need more compassion toward yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Consideration",
				meaning: "Having my needs factored in",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about someone thinking of you before acting, or about your needs being included in a decision?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Empathy",
				meaning: "Emotional resonance and understanding",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about someone feeling what you're feeling, or about them just showing they understand what it's like for you?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Respect",
				meaning: "Being valued and honored",
				status: "",
				unpackEnabled: true,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What would respect look like in this situation — being spoken to differently, having your boundaries honoured, or your perspective taken seriously?",
						deeper_specific_optional:
							"Is there a specific moment where you felt disrespected that's still with you?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Acknowledgement",
				meaning: "Having your experience or contribution recognised",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What would acknowledgement look like — someone saying they see what you did, what you went through, or what you're feeling?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "To be heard, seen",
				meaning: "Fully acknowledged in experience",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about someone listening without interrupting, or about them really getting what it's like to be you right now?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "To be known, understood",
				meaning: "Deep recognition of who I am",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about someone understanding you deeply over time, or about being understood in this particular moment?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "To be trusted",
				meaning: "Confidence placed in me",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about someone believing you're capable, believing you're honest, or giving you the benefit of the doubt?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Understanding others",
				meaning: "Being able to grasp others' experience",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about wanting to understand someone specific, or about a more general wish to connect by understanding?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Mutual Recognition",
				meaning: "Seeing and being seen by another",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about both of you seeing each other clearly, or about the absence of that — feeling invisible while the other person isn't really looking?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Kindness",
				meaning: "Gentle and benevolent care",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What would kindness look like right now — a gentle word, a thoughtful action, or simply the absence of harshness?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
		],
		Community: [
			{
				item: "Community",
				meaning: "Belonging to a group",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What kind of community are you longing for — people who share your interests, your values, or just a sense of being part of something?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Belonging",
				meaning: "Feeling part of something",
				status: "",
				unpackEnabled: true,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Where do you most want to belong right now — a family, a group, a place, or just with one person? What would tell you that you do belong?",
						deeper_specific_optional:
							"Is there something about yourself that you worry makes belonging harder?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Communication",
				meaning: "Sharing and receiving information",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about being able to express yourself, about being heard, or about wanting more open dialogue?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Cooperation",
				meaning: "Working together toward common goals",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about wanting others to work with you, or about feeling like you're pulling in the same direction?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Equality",
				meaning: "Equal worth and rights for all",
				status: "",
				unpackEnabled: true,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"When you notice this need for equality, is it about being treated as an equal in a specific relationship, or about fairness in a wider sense?",
						deeper_specific_optional:
							"Is there a power imbalance that's making this feel urgent right now?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Inclusion",
				meaning: "Being actively welcomed",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about being invited in, or about not being left out? What would inclusion actually look and feel like?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Mutuality",
				meaning: "Reciprocal give and take",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about wanting more balance in what you give and receive, or about the other person showing they're invested too?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Participation",
				meaning: "Being involved and engaged",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about wanting to be included in decisions, activities, or conversations — or about having a role that matters?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Partnership",
				meaning: "Collaborative and shared efforts",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about sharing the load with someone, making decisions together, or feeling like you're a team?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Self-expression",
				meaning: "Freedom to express who I am",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What part of yourself are you wanting to express — your feelings, your creativity, your opinions, or something you've been holding back?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Sharing",
				meaning: "Mutual giving and receiving",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about sharing experiences together, sharing resources, or sharing what's in your heart?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
		],
	},

	Meaning: {
		"Sense of self": [
			{
				item: "Authenticity",
				meaning: "Being true to myself",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is there something you're holding back or pretending about? What would it look like to be more yourself here?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Competence",
				meaning: "Feeling capable and skilled",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about wanting to feel capable, wanting others to see you as capable, or both?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Creativity",
				meaning: "Expressing imagination and originality",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What kind of creative expression is calling you — making something, solving a problem in a new way, or just having the space to imagine?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_CONC_02",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Dignity",
				meaning: "Inherent worth and self-respect",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Has something happened that felt undignified? What would restore your sense of worth here?",
						deeper_specific_optional:
							"Is this about how others treat you, or about how you're treating yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Growth",
				meaning: "Development and evolution",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What kind of growth are you wanting — learning something new, becoming more yourself, or moving past something that's been holding you back?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Healing",
				meaning: "Moving toward wholeness",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What are you wanting to heal from — something recent, something old, or something you can't quite name yet?",
						deeper_specific_optional:
							"What would a small step toward healing look like, even if the whole journey feels long?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Honesty",
				meaning: "Telling and facing the truth",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about wanting someone to be honest with you, or about wanting to be more honest yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Integrity",
				meaning: "Living in alignment with values",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is there something you've done that doesn't sit right with you, or is it about someone else acting out of alignment with what you expected?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Self-acceptance",
				meaning: "Welcoming all parts of myself",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What part of yourself are you struggling to accept right now? Is it something you did, something you feel, or something about who you are?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Self-care",
				meaning: "Tending to my own needs",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What kind of self-care feels most needed — rest, nourishment, time alone, or giving yourself permission to slow down?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_CONC_02",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Self-connection",
				meaning: "Awareness of inner experience",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Have you been disconnected from yourself lately — going through the motions, ignoring signals, or not knowing what you feel?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Self-knowledge",
				meaning: "Understanding myself",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is there something about yourself you're trying to understand — a pattern, a reaction, or something you keep doing that puzzles you?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Self-realization",
				meaning: "Becoming who I am meant to be",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is there something you feel you're meant to do or become that you haven't been able to move toward?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Mattering to myself",
				meaning: "Recognizing my own value",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Have you been putting yourself last? What would it look like to treat your own needs as worthy of attention?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
		],
		Understanding: [
			{
				item: "Understanding",
				meaning: "Grasp what something means",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What are you trying to understand — why something happened, how someone feels, or what's going on inside you?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Awareness",
				meaning: "Conscious presence",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this about wanting to be more present, or about wanting someone else to be more aware of what's happening?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_REL_02",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Clarity",
				meaning: "Clear thinking and perception",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What feels unclear right now — the situation, someone's intentions, or your own feelings about it?",
						deeper_specific_optional:
							"What would 'clear enough' look like, even if you don't have all the answers?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_LOAD_02",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Discovery",
				meaning: "Finding or uncovering something new",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about wanting to learn something new, or about uncovering something that's already there but hidden?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Learning",
				meaning: "Gaining knowledge or insight",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What are you wanting to learn — a skill, an understanding of someone, or something about yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_CONC_02",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Making sense of life",
				meaning: "Understanding the bigger picture",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is there something specific that doesn't make sense right now, or is it a wider feeling of confusion about where things are heading?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Stimulation",
				meaning: "Mental engagement and interest",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about boredom, or about wanting something that engages your mind and makes you feel alive?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
		],
		Meaning: [
			{
				item: "Meaning",
				meaning: "A sense that something matters",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about something specific feeling pointless, or a wider sense that you're searching for what matters?",
						deeper_specific_optional:
							"If meaning were present here, what would be different about how you spend your time or energy?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Challenge",
				meaning: "Opportunities to stretch and grow",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Are you feeling under-challenged and wanting more, or is there a specific challenge you're ready for?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Aliveness",
				meaning: "Feeling fully vibrant and present",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What helps you feel most alive — physical activity, deep conversation, creative work, or being in nature?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Consciousness",
				meaning: "Deep awareness of self and life",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about wanting to be more awake to your own experience, or about connecting to something larger than yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Contribution",
				meaning: "Making a difference",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What would contribution look like — helping someone specific, serving a cause, or simply knowing your work matters?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_03",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Effectiveness",
				meaning: "Capacity to bring about change",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about wanting your efforts to actually produce results, or about feeling stuck and powerless?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Exploration",
				meaning: "Willingness to investigate and try",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What are you wanting to explore — new experiences, new ideas, or new aspects of yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Integration",
				meaning: "Wholeness and coherence",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is there a part of your life or your experience that feels separate or fragmented? What would coming together look like?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Purpose",
				meaning: "Having meaningful direction",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about wanting a clearer sense of direction, or about the things you're doing not feeling purposeful enough?",
						deeper_specific_optional:
							"What's one thing that, if you spent more time on it, would feel like it matters?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
		],
		Transcendence: [
			{
				item: "Beauty",
				meaning: "Appreciating harmony and elegance",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What kind of beauty are you wanting more of — in nature, art, people, or your everyday surroundings?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Celebration of life",
				meaning: "Honoring what's precious",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"What feels worth celebrating right now — even something small? Or are you missing the feeling of being able to celebrate?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Communion",
				meaning: "Deep spiritual or emotional connection",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "relational",
					specificPrompts: {
						core_specific:
							"Is this communion you're wanting with another person, with nature, with something spiritual, or with yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_REL_01",
						deeper_unfolding: "UNF_REL_01",
						deeper_probing: "PROBE_REL_01",
						deeper_integration: "INT_REL_01",
					},
				},
			},
			{
				item: "Faith",
				meaning: "Trust in something greater",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about religious or spiritual faith, or about a more general trust that things will work out?",
						deeper_specific_optional: "Has something happened that's shaken your faith or trust?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Flow",
				meaning: "Being fully absorbed in the moment",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"When did you last feel in flow? What were you doing, and what would help you get back to that?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Hope",
				meaning: "Belief in possibilities",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about a specific situation you're hoping will improve, or a wider feeling that things could get better?",
						deeper_specific_optional: "What small sign of possibility would help you hold onto hope?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_03",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Inspiration",
				meaning: "Being uplifted into vision or action",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What inspires you when you find it — ideas, people, nature, art? What would help you reconnect with that?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Mourning",
				meaning: "Honoring loss with care",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What are you mourning — a person, a possibility, something that changed, or something that never was?",
						deeper_specific_optional:
							"Is there space in your life right now to grieve, or does it feel like you have to hold it together?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Peace (internal)",
				meaning: "Calm within",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"What's disturbing your inner peace — racing thoughts, unresolved feelings, or a situation that won't settle?",
						deeper_specific_optional: "What would inner peace feel like, even just a moment of it?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Presence",
				meaning: "Fully here and now",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about wanting to be more present yourself, or about wanting someone else to be more present with you?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
		],
	},

	Freedom: {
		Autonomy: [
			{
				// ADDED Freedom as a selectable need — previously only a category header.
				// WHY PROMOTED TO SELECTABLE NEED:
				// - Users often mean something experientially real when they say “freedom”
				//   that isn’t fully captured by Choice, Autonomy, or Space alone.
				// - "Choice" can feel too decision-specific.
				// - "Autonomy" can feel abstract or political.
				// - "Independence" can imply separation.
				// - "Space" can feel purely physical.
				// - "Freedom" names the felt global condition of having room to move,
				//   choose, and be oneself without constraint.
				// - Making it selectable allows users to start where they are,
				//   and then unpack toward more specificity if helpful.
				item: "Freedom",
				meaning: "Room to choose, move, and be without constraint",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"When you say freedom, is it more about having options (choice), having room to be yourself (space), \
							or being able to move and act without constraint? And is the limitation coming mostly from someone else, \
							from circumstances, or from pressure inside you?",

						deeper_specific_optional:
							"If you had more freedom right now, what would you do first — even in a small way?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Autonomy",
				meaning: "Make decisions without external control",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is someone making decisions for you, or is it more that you feel constrained even without anyone actively controlling you?",
						deeper_specific_optional: "What decision would you most like to make freely right now?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Choice",
				meaning: "Freedom to decide",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about having options, or about feeling free to choose without pressure or guilt?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_LOAD_02",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Ease",
				meaning: "Freedom from strain or effort",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about physical ease, emotional ease, or just wanting things to be simpler for a while?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Independence",
				meaning: "Self-reliance and agency",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about wanting to manage on your own, or about not wanting to depend on someone who isn't reliable?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Agency",
				meaning: "Ability to influence",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about feeling powerless in a specific situation, or a wider sense that your actions don't make a difference?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Self-responsiblity",
				meaning: "Owning my own choices",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "loaded",
					specificPrompts: {
						core_specific:
							"Is this about wanting to take more ownership of your life, or about others not taking responsibility for theirs?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_LOAD_01",
						deeper_unfolding: "UNF_LOAD_01",
						deeper_probing: "PROBE_LOAD_01",
						deeper_integration: "INT_LOAD_01",
					},
				},
			},
			{
				item: "Space",
				meaning: "Room to be and act",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this physical space, emotional space, or time and space to think and be yourself?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Spontaneity",
				meaning: "Freedom to act in the moment",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about wanting more freedom to follow impulses, or about feeling too constrained by plans and obligations?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
		],
		"Leisure/Relaxation": [
			{
				item: "Humour",
				meaning: "Lightness and laughter",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"Is this about wanting more lightness in your life, or about missing someone specific you laugh with?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Joy",
				meaning: "Delight and happiness",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"When did you last feel genuine joy? What was happening, and what would bring that closer right now?",
					},
					promptKeys: {
						core_embodiment: "EMB_02",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Play",
				meaning: "Fun, imagination and creativity",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What does play look like for you — games, silliness, creating something, or just doing something without a purpose?",
					},
					promptKeys: {
						core_embodiment: "EMB_04",
						core_discrimination: "DISC_CONC_02",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Pleasure",
				meaning: "Enjoyable sensations or experiences",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What kind of pleasure feels most needed — physical comfort, something delicious, a beautiful experience, or just relaxation?",
					},
					promptKeys: {
						core_embodiment: "EMB_03",
						core_discrimination: "DISC_CONC_01",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
			{
				item: "Rejuvenation",
				meaning: "Feeling refreshed and renewed",
				status: "",
				unpackEnabled: false,
				unpack: {
					category: "concrete",
					specificPrompts: {
						core_specific:
							"What would rejuvenate you — time off, time in nature, doing something you love, or simply having nothing to do?",
					},
					promptKeys: {
						core_embodiment: "EMB_01",
						core_discrimination: "DISC_CONC_02",
						deeper_unfolding: "UNF_CONC_01",
						deeper_probing: "PROBE_CONC_01",
						deeper_integration: "INT_CONC_01",
					},
				},
			},
		],
	},
};

export default needsData;
