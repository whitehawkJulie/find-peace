export const NeedsConnection = {
	ui: {
		heading: "Connection Needs",
		helpText:
			"Connection needs are about relating to others and feeling a sense of belonging. They include needs for love, acceptance, understanding, support, and intimacy. When these needs are unmet, we may feel lonely, isolated, or disconnected.",
	},
	metaType: "relationalField",
	groups: {
		Affection: {
			ui: { heading: "Affection", order: 1 },
			items: [
				{
					item: "Affection",
					meaning: "Expressions of emotional warmth and connection",
					status: "",
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
		},
		Mattering: {
			ui: { heading: "To matter", order: 2 },
			items: [
				{
					item: "To matter",
					meaning: "To know that I am valued",
					status: "",
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
				// Split from: "To be heard, seen"

				{
					item: "To be heard",
					meaning: "To know my words are received and taken in",
					status: "",
					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is this about someone listening all the way through (no interrupting / defending), or about knowing your words are actually landing and influencing what happens next?",
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
					item: "To be seen",
					meaning: "To have my experience and presence acknowledged",
					status: "",
					unpackEnabled: true,
					unpack: {
						category: "relational",
						specificPrompts: {
							core_specific:
								"Is this about being noticed and recognised (your experience matters), or about someone really getting what it’s like to be you right now?",
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
		},
		Community: {
			ui: { heading: "Community", order: 3 },
			items: [
				{
					item: "Community",
					meaning: "Belonging to a group",
					status: "",
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
					unpackEnabled: true,
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
	},
};

export default NeedsConnection;
