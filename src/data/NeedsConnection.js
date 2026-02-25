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
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of affection are you longing for — words, gestures, physical warmth, or simply knowing someone cares?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Appreciation",
					meaning: "Being seen and valued",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What would appreciation look like here? Is it about being thanked, being noticed, or having your effort acknowledged?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Attention",
					meaning: "Being genuinely noticed",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"When you say you need attention, is it about someone being present with you, or about feeling like you matter enough to be noticed?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Closeness",
					meaning: "Emotional and/or physical intimacy",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about physical closeness, emotional closeness, or both? What does being close actually look like for you?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Connection",
					meaning: "Feeling linked to others and to life",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this connection to a specific person, to a group, or to something bigger — life, nature, meaning?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Companionship",
					meaning: "Enjoying life with others",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about having someone to do things with, or about not feeling alone in your experience?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Harmony",
					meaning: "Cooperation and mutual support",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is the harmony you're wanting about people getting along, or about feeling at ease in your relationships?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Intimacy",
					meaning: "Mutual vulnerability and closeness",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What does intimacy mean for you here — emotional openness, physical closeness, or the feeling of being truly known?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Love",
					meaning: "Unconditional acceptance and care",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"When you notice this need for love, is it about receiving it, giving it, or knowing it's there even when it's not being said?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Nurturing",
					meaning: "Care that supports growth and healing",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Are you wanting to be nurtured by someone, or are you noticing a need to nurture yourself?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Sexual expression",
					meaning: "Authentic physical intimacy",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about physical desire, about feeling wanted, or about a deeper sense of being fully alive with another person?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Support",
					meaning: "Practical or emotional backing",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of support would help most — someone to listen, someone to help practically, or just knowing someone has your back?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"Is there something you've been carrying alone that you wish you didn't have to?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Tenderness",
					meaning: "Gentle, caring touch or tone",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What would tenderness look like here — a softer tone, a gentle gesture, or simply someone being careful with you?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Warmth",
					meaning: "A sense of friendliness and care",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is the warmth you're wanting from a specific person, or is it about the overall atmosphere around you?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
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
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Who do you most want to matter to right now? And what would tell you that you do?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"Is this about mattering to others, or about remembering that you matter to yourself?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Acceptance",
					meaning: "Welcomed just as I am",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What part of you is wanting acceptance right now — a decision you made, something you feel, or just who you are?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Care",
					meaning: "Concern for my well-being",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What would care look like in this situation — someone checking in, offering help, or just noticing you're struggling?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Compassion",
					meaning: "Understanding and warmth in response to suffering",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Are you wanting compassion from someone else, or noticing you need more compassion toward yourself?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Consideration",
					meaning: "Having my needs factored in",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about someone thinking of you before acting, or about your needs being included in a decision?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Empathy",
					meaning: "Emotional resonance and understanding",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about someone feeling what you're feeling, or about them just showing they understand what it's like for you?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Respect",
					meaning: "Being valued and honored",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What would respect look like in this situation — being spoken to differently, having your boundaries honoured, or your perspective taken seriously?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question:
									"Is there a specific moment where you felt disrespected that's still with you?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Acknowledgement",
					meaning: "Having your experience or contribution recognised",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What would acknowledgement look like — someone saying they see what you did, what you went through, or what you're feeling?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				// Split from: "To be heard, seen"

				{
					item: "To be heard",
					meaning: "To know my words are received and taken in",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about someone listening all the way through (no interrupting / defending), or about knowing your words are actually landing and influencing what happens next?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "To be seen",
					meaning: "To have my experience and presence acknowledged",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about being noticed and recognised (your experience matters), or about someone really getting what it’s like to be you right now?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "To be known, understood",
					meaning: "Deep recognition of who I am",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about someone understanding you deeply over time, or about being understood in this particular moment?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "To be trusted",
					meaning: "Confidence placed in me",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about someone believing you're capable, believing you're honest, or giving you the benefit of the doubt?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Understanding others",
					meaning: "Being able to grasp others' experience",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting to understand someone specific, or about a more general wish to connect by understanding?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Mutual Recognition",
					meaning: "Seeing and being seen by another",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about both of you seeing each other clearly, or about the absence of that — feeling invisible while the other person isn't really looking?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Kindness",
					meaning: "Gentle and benevolent care",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What would kindness look like right now — a gentle word, a thoughtful action, or simply the absence of harshness?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
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
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What kind of community are you longing for — people who share your interests, your values, or just a sense of being part of something?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Belonging",
					meaning: "Feeling part of something",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Where do you most want to belong right now — a family, a group, a place, or just with one person? What would tell you that you do belong?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "Is there something about yourself that you worry makes belonging harder?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					// ────────────────────── ADDING NEED! ────────────────────────────────────
					//
					// WHY THIS NEED EXISTS
					//
					// Reliability is distinct from:
					// - Honesty (truthfulness)
					// - Integrity (internal moral coherence)
					// - Trusting (willingness to lean in vulnerably)
					//
					// It refers specifically to:
					// - Predictable behavioural follow-through across time
					// - Dependability in agreements
					// - Stability of relational response patterns
					//
					// Many earlier NVC-style needs lists implicitly folded this
					// into "trust" or "integrity", but attachment theory and
					// nervous system research suggest reliability is a distinct
					// relational stabilising need.
					//
					// We are including it explicitly to:
					// - Increase conceptual precision
					// - Avoid collapsing time-based stability into moral framing
					// - More accurately model betrayal and broken-agreement ruptures
					//
					// This is not about entitlement.
					// It reflects nervous-system design around attachment stability.
					// ──────────────────────────────────────────────────────────
					item: "Reliability",
					meaning:
						"Steady, predictable follow-through over time; being able to depend on consistency in behaviour or agreement.",

					status: "",

					metaType: "relationalField",

					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting someone to follow through consistently over time — not just once, but in a way you can depend on?",
								tier: "core",
							},
							{
								key: "core_embodiment",
								label: "In your body",
								ref: "EMB_REL_01",
								tier: "core",
							},
							{
								key: "core_discrimination",
								label: "Getting clearer",
								ref: "DISC_REL_01",
								tier: "core",
							},
							{
								key: "deeper_unfolding",
								label: "Unfolding",
								ref: "UNF_REL_01",
								tier: "deeper",
							},
							{
								key: "deeper_probing",
								label: "Underneath",
								ref: "PROBE_REL_01",
								tier: "deeper",
							},
							{
								key: "deeper_integration",
								label: "Next step",
								ref: "INT_REL_01",
								tier: "deeper",
							},
						],
					},
				},
				{
					item: "Communication",
					meaning: "Sharing and receiving information",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about being able to express yourself, about being heard, or about wanting more open dialogue?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Cooperation",
					meaning: "Working together toward common goals",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting others to work with you, or about feeling like you're pulling in the same direction?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Equality",
					meaning: "Equal worth and rights for all",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "loaded",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"When you notice this need for equality, is it about being treated as an equal in a specific relationship, or about fairness in a wider sense?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_LOAD_01", tier: "core" },
							{
								key: "deeper_specific",
								label: "A little further",
								question: "Is there a power imbalance that's making this feel urgent right now?",
								tier: "deeper",
							},
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_LOAD_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_LOAD_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_LOAD_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Inclusion",
					meaning: "Being actively welcomed",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about being invited in, or about not being left out? What would inclusion actually look and feel like?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Mutuality",
					meaning: "Reciprocal give and take",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting more balance in what you give and receive, or about the other person showing they're invested too?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Participation",
					meaning: "Being involved and engaged",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about wanting to be included in decisions, activities, or conversations — or about having a role that matters?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_04", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_03", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Partnership",
					meaning: "Collaborative and shared efforts",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about sharing the load with someone, making decisions together, or feeling like you're a team?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_02", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Self-expression",
					meaning: "Freedom to express who I am",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"What part of yourself are you wanting to express — your feelings, your creativity, your opinions, or something you've been holding back?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_01", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_02", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
				{
					item: "Sharing",
					meaning: "Mutual giving and receiving",
					status: "",
					clarify: {
						type: "needs-clarify",
						category: "relational",
						prompts: [
							{
								key: "core_specific",
								label: "What this means for you",
								question:
									"Is this about sharing experiences together, sharing resources, or sharing what's in your heart?",
								tier: "core",
							},
							{ key: "core_embodiment", label: "In your body", ref: "EMB_03", tier: "core" },
							{ key: "core_discrimination", label: "Getting clearer", ref: "DISC_REL_01", tier: "core" },
							{ key: "deeper_unfolding", label: "Unfolding", ref: "UNF_REL_01", tier: "deeper" },
							{ key: "deeper_probing", label: "Underneath", ref: "PROBE_REL_01", tier: "deeper" },
							{ key: "deeper_integration", label: "Next step", ref: "INT_REL_01", tier: "deeper" },
						],
					},
				},
			],
		},
	},
};

export default NeedsConnection;
