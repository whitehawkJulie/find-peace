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
//
// empathyGuesses format: Array<{ text?, feelings?, needs? }>
// - First entry is the orienting question (text only, no pills)
// - Subsequent entries pair question text with feeling/need pills
// - An entry with only feelings/needs and no text = catch-all row
// suggestedFeelings + suggestedNeeds flat arrays are kept for
// analytics and the "replace with feelings" checkbox.

export const StoryWords = {
	ui: {
		heading: "Story Words (optional)",
		helpText:
			"These words make sense — they often tell a story about what happened <em>out there</em>. And at the same time, there's something happening <em>in here</em>, inside you, in response to that. Let's pause and gently feel it.",
	},

	groups: {
		// ──────────────────────────────────────────────────────────
		// AUTONOMY RUPTURE
		// Theme: choice interference, control intrusion
		// Emotional arc: protest → frustration → sometimes fear
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
						"This word often carries a sense that influence felt hidden or indirect — like your choice wasn't fully transparent or respected.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds unsettling… did something feel off or unclear?" },
						{ text: "Is there anger here — the kind that shows up when autonomy feels compromised?", feelings: ["angry", "resentful", "indignant"], needs: ["Autonomy", "Choice", "Agency"] },
						{ text: "Maybe frustration, if your influence felt blocked?", feelings: ["frustrated"] },
						{ text: "Or hurt, if trust felt shaken?", feelings: ["hurt"], needs: ["Trusting"] },
						{ text: "And possibly even some fear, if you didn't feel steady in the interaction.", feelings: ["scared"] },
						{ text: "ADD QUESTION HERE", feelings: ["helpless"], needs: ["Authenticity", "Respect"] },
					],

					suggestedFeelings: [
						"scared",
						"frustrated",
						"helpless",
						"angry",
						"resentful",
						"indignant",
						"hurt",
					],

					suggestedNeeds: [
						"Autonomy",
						"Choice",
						"Agency",
						"Trusting",
						"Authenticity",
						"Respect",
					],
				},
				{
					item: "Coerced",
					type: "storyWord",
					ruptureType: "autonomy",

					storyHint:
						"This word often carries the sense that your 'no' didn't have room — like pressure or force limited your real choice.",

					empathyGuesses: [
						{ text: "Let's pause gently… what feeling is strongest right now?" },
						{ text: "That sounds scary… did it feel like there wasn't really space for your choice?", feelings: ["scared", "afraid"], needs: ["Choice", "Autonomy", "Freedom"] },
						{ text: "Is there anger here, if your boundary was pushed past?", feelings: ["angry", "resentful", "indignant"], needs: ["Respect"] },
						{ text: "Maybe frustration, if you tried to resist and couldn't?", feelings: ["frustrated"] },
						{ text: "Or helplessness, if protecting yourself didn't feel possible?", feelings: ["helpless"] },
						{ text: "ADD QUESTION HERE", feelings: ["tense"], needs: ["Safety (emotional)", "Space"] },
					],

					suggestedFeelings: [
						"frustrated",
						"scared",
						"afraid",
						"angry",
						"resentful",
						"indignant",
						"helpless",
						"tense",
					],

					suggestedNeeds: [
						"Choice",
						"Autonomy",
						"Freedom",
						"Safety (emotional)",
						"Respect",
						"Space",
					],
				},

				{
					item: "Pressured",
					type: "storyWord",
					ruptureType: "autonomy",

					storyHint:
						"This word often carries a sense of compression — like there wasn't enough room, time, or choice in the situation.",

					empathyGuesses: [
						{ text: "Let's pause gently… what's most alive right now?" },
						{ text: "That sounds really uncomfortable… was it like you couldn't slow it down?" },
						{ text: "There might be anxiety here, if it felt like something bad would happen if you didn't go along.", feelings: ["anxious", "restless"] },
						{ text: "And maybe irritation — a protective 'please back off' energy.", feelings: ["irritated", "frustrated"], needs: ["Space", "Consideration", "Respect"] },
						{ text: "Or overwhelm, if too much was coming at you at once.", feelings: ["overwhelmed"], needs: ["Ease", "Peace of mind"] },
						{ text: "ADD QUESTION HERE", feelings: ["tense", "helpless"], needs: ["Clarity"] },
					],

					suggestedFeelings: [
						"anxious",
						"overwhelmed",
						"tense",
						"restless",
						"irritated",
						"frustrated",
						"helpless",
					],

					suggestedNeeds: [
						"Space",
						"Clarity",
						"Ease",
						"Peace of mind",
						"Consideration",
						"Respect",
					],
				},
				{
					item: "Cornered",
					type: "storyWord",
					ruptureType: "autonomy",

					storyHint:
						"This word often carries a sense of no exit — like your options suddenly narrowed and there wasn't room to move.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what's most alive right now?" },
						{ text: "That sounds intense… was there a feeling of being trapped or pinned?", feelings: ["trapped"] },
						{ text: "Did your body go into fear — like you needed to get out quickly?", feelings: ["scared", "anxious", "tense", "restless"], needs: ["Safety (emotional)"] },
						{ text: "Or did anger rise up — a surge of 'don't box me in' energy?", feelings: ["angry", "resentful", "indignant"], needs: ["Autonomy", "Freedom", "Choice", "Space"] },
						{ text: "Maybe there was a frozen feeling, like you couldn't move at all.", feelings: ["helpless", "numb"] },
						{ text: "ADD QUESTION HERE", needs: ["Ease", "Peace of mind"] },
					],

					suggestedFeelings: [
						"scared",
						"anxious",
						"trapped",
						"tense",
						"restless",
						"angry",
						"resentful",
						"indignant",
						"helpless",
						"numb",
					],

					suggestedNeeds: [
						"Autonomy",
						"Freedom",
						"Choice",
						"Space",
						"Safety (emotional)",
						"Ease",
						"Peace of mind",
					],
				},
				{
					item: "Controlled",
					type: "storyWord",
					ruptureType: "autonomy",

					storyHint:
						"This word often carries a sense of ongoing restriction — like someone else is steering, monitoring, or limiting your choices over time.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what's most alive right now?" },
						{ text: "That sounds really constricting… like your space to be you was being narrowed.", needs: ["Space", "Autonomy"] },
						{ text: "Is there anger here — a protective 'don't run my life' energy?", feelings: ["angry", "frustrated"], needs: ["Choice", "Agency", "Respect", "Equality"] },
						{ text: "Or fear, if it felt risky to resist or say no?", feelings: ["anxious", "tense"] },
						{ text: "And sometimes there's a heavy, trapped feeling — like you can't move freely.", feelings: ["trapped", "helpless", "hurt"] },
					],

					suggestedFeelings: [
						"angry",
						"frustrated",
						"trapped",
						"helpless",
						"anxious",
						"tense",
						"hurt",
					],

					suggestedNeeds: [
						"Autonomy",
						"Choice",
						"Agency",
						"Space",
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds painful… was it like being on the outside looking in?" },
						{ text: "Maybe there's sadness here — a quiet ache of not being included.", feelings: ["sad", "lonely"], needs: ["Belonging", "Community", "Connection"] },
						{ text: "Or anxiety — wondering what this means about your place.", feelings: ["anxious", "insecure"], needs: ["Safety (emotional)"] },
						{ text: "And possibly hurt or vulnerability, if it touched something tender.", feelings: ["hurt", "vulnerable"], needs: ["To be seen", "Acceptance", "Mutuality"] },
						{ text: "Sometimes there's also anger if it felt unfair.", feelings: ["angry", "resentful"], needs: ["Inclusion"] },
					],

					suggestedFeelings: [
						"sad",
						"lonely",
						"anxious",
						"hurt",
						"vulnerable",
						"insecure",
						"angry",
						"resentful",
					],

					suggestedNeeds: [
						"Inclusion",
						"Belonging",
						"Community",
						"Connection",
						"To be seen",
						"Acceptance",
						"Mutuality",
						"Safety (emotional)",
					],
				},
				{
					item: "Rejected",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint: "This word often carries the sense of being refused, dismissed, or pushed away.",

					empathyGuesses: [
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That can really sting… was it like something in you reached out and got turned away?" },
						{ text: "Did it land as hurt?", feelings: ["hurt"], needs: ["Belonging", "Acceptance", "Closeness"] },
						{ text: "Maybe there's sadness — a heaviness in the chest.", feelings: ["sad", "lonely"], needs: ["Connection", "To be seen"] },
						{ text: "Or fear, if it felt like your place wasn't secure.", feelings: ["scared", "insecure"], needs: ["Trusting", "Safety (emotional)"] },
						{ text: "Sometimes anger shows up too, especially if it felt unfair or abrupt.", feelings: ["angry", "resentful"] },
						{ text: "ADD QUESTION HERE", feelings: ["disappointed"], needs: ["Inclusion"] },
					],

					suggestedFeelings: [
						"hurt",
						"scared",
						"sad",
						"disappointed",
						"insecure",
						"lonely",
						"angry",
						"resentful",
					],

					suggestedNeeds: [
						"Belonging",
						"Inclusion",
						"Connection",
						"Trusting",
						"Closeness",
						"Acceptance",
						"To be seen",
						"Safety (emotional)",
					],
				},
				{
					item: "Left out",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint:
						"This word often points to a quieter form of exclusion — noticing others included while you were not.",

					empathyGuesses: [
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That can feel tender… was it like watching something happen without you?" },
						{ text: "Did it bring a quiet sadness?", feelings: ["sad", "lonely"], needs: ["Belonging", "Community", "Connection"] },
						{ text: "Maybe wondering what it means about your place.", feelings: ["anxious", "hurt", "insecure"], needs: ["To be seen", "Mutuality"] },
						{ text: "Or anxiety about where you stand.", needs: ["Safety (emotional)", "Inclusion"] },
						{ text: "Sometimes there's irritation too, if it felt careless or avoidable.", feelings: ["annoyed", "resentful"], needs: ["Participation"] },
					],

					suggestedFeelings: [
						"sad",
						"lonely",
						"anxious",
						"hurt",
						"insecure",
						"annoyed",
						"resentful",
					],

					suggestedNeeds: [
						"Inclusion",
						"Belonging",
						"Community",
						"Connection",
						"To be seen",
						"Participation",
						"Mutuality",
						"Safety (emotional)",
					],
				},
				{
					item: "Unwanted",
					type: "storyWord",
					ruptureType: "belonging",

					storyHint: "This word often carries a sense of not being desired, valued, or welcomed.",

					empathyGuesses: [
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds deeply tender… was it like not being desired or welcomed?" },
						{ text: "Did something in you sink or withdraw?", feelings: ["sad", "lonely", "hurt"], needs: ["Belonging", "Connection", "Affection"] },
						{ text: "Maybe anxiety, wondering whether you belong.", feelings: ["anxious", "insecure"], needs: ["Acceptance"] },
						{ text: "There can also be anger underneath, especially if it felt unjust.", feelings: ["angry", "resentful", "frustrated"], needs: ["To matter", "Care"] },
					],

					suggestedFeelings: [
						"sad",
						"anxious",
						"frustrated",
						"hurt",
						"lonely",
						"insecure",
						"angry",
						"resentful",
					],

					suggestedNeeds: [
						"Belonging",
						"Inclusion",
						"Care",
						"Affection",
						"Acceptance",
						"Connection",
						"To matter",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// RESPECT RUPTURE
		// Emotional arc: embarrassment → hurt → anger
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds sharp… was it like something in you shrank?" },
						{ text: "Did it land as hurt — like your dignity was touched?", feelings: ["hurt"], needs: ["Dignity", "Respect"] },
						{ text: "Maybe there's anger too, a protective 'that's not okay.'", feelings: ["angry", "resentful", "indignant"], needs: ["Equality", "Mutual Recognition", "Acknowledgement"] },
						{ text: "Sometimes embarrassment shows up, especially if it happened publicly.", feelings: ["embarrassed", "ashamed"], needs: ["Safety (emotional)"] },
						{ text: "And sometimes there's sadness underneath, if it felt invalidating.", feelings: ["sad", "distressed", "tense"], needs: ["To be seen", "Appreciation", "Autonomy"] },
					],

					suggestedFeelings: [
						"hurt",
						"tense",
						"distressed",
						"angry",
						"resentful",
						"indignant",
						"embarrassed",
						"ashamed",
						"sad",
					],

					suggestedNeeds: [
						"Respect",
						"Autonomy",
						"To be seen",
						"Acknowledgement",
						"Appreciation",
						"Dignity",
						"Mutual Recognition",
						"Equality",
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds sharp… did it land like a hit?" },
						{ text: "Was there an immediate flare of anger?", feelings: ["angry", "furious", "outraged", "indignant", "resentful"], needs: ["Respect", "Dignity", "Equality"] },
						{ text: "Maybe embarrassment too, especially if others were present.", feelings: ["embarrassed", "ashamed"], needs: ["Safety (emotional)"] },
						{ text: "Or hurt — like something tender was touched.", feelings: ["hurt", "sad"], needs: ["Consideration", "Acknowledgement", "Mutual Recognition"] },
					],

					suggestedFeelings: [
						"embarrassed",
						"angry",
						"furious",
						"outraged",
						"indignant",
						"resentful",
						"hurt",
						"sad",
						"ashamed",
					],

					suggestedNeeds: [
						"Respect",
						"Consideration",
						"Acknowledgement",
						"Dignity",
						"Equality",
						"Mutual Recognition",
						"Safety (emotional)",
					],
				},
				{
					item: "Criticised",
					type: "storyWord",
					ruptureType: "respect",

					storyHint:
						"This word often carries a sense that something about you or your actions was judged or diminished.",

					empathyGuesses: [
						{ text: "What would have felt more dignifying there?" },
						{ text: "That sounds tender… did it feel like something about you was judged or picked apart?" },
						{ text: "Maybe embarrassment, if it felt exposing.", feelings: ["embarrassed", "humiliated"], needs: ["Respect", "Understanding"] },
						{ text: "Or hurt, if your effort or intention wasn't understood.", feelings: ["hurt"], needs: ["To be known/understood", "Acknowledgement", "Compassion"] },
						{ text: "And perhaps frustration or fear, if you wished for more care.", feelings: ["frustrated", "angry", "scared", "anxious"], needs: ["Recognition"] },
					],

					suggestedFeelings: [
						"hurt",
						"embarrassed",
						"humiliated",
						"scared",
						"anxious",
						"frustrated",
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
				},
				{
					item: "Provoked",
					type: "storyWord",
					ruptureType: "respect",

					storyHint:
						"This word often suggests you felt pushed or baited into a reaction that didn't feel fair or respectful.",

					empathyGuesses: [
						{ text: "What boundary might have made it feel steadier?" },
						{ text: "That sounds activating… did it feel like someone was pushing your buttons on purpose?" },
						{ text: "Maybe anger, if you felt baited.", feelings: ["angry"], needs: ["Respect", "Autonomy"] },
						{ text: "Or frustration, if the interaction didn't feel clean.", feelings: ["frustrated", "irritated"], needs: ["Consideration", "Understanding", "Space"] },
						{ text: "Possibly defensiveness too — wanting to protect your dignity.", feelings: ["defensive", "embarrassed"] },
					],

					suggestedFeelings: [
						"frustrated",
						"angry",
						"defensive",
						"irritated",
						"embarrassed",
					],

					suggestedNeeds: ["Respect", "Consideration", "Understanding", "Autonomy", "Space"],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// TRUST RUPTURE
		// Theme: deception or reliability break
		// Emotional arc: hurt → fear → anger
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds painful… did something important feel broken?" },
						{ text: "Was there hurt — like trust cracked open?", feelings: ["hurt", "sad"], needs: ["Trusting", "Connection", "Mutuality"] },
						{ text: "Maybe anger too, especially if it felt deliberate.", feelings: ["angry", "resentful", "outraged"], needs: ["Honesty", "Commitment"] },
						{ text: "Sometimes there's disappointment — an expectation collapsing.", feelings: ["disappointed"] },
						{ text: "And sometimes fear, if it shook your sense of safety.", feelings: ["scared", "shocked", "confused"], needs: ["Safety (emotional)", "Consistency", "Clarity"] },
					],

					suggestedFeelings: [
						"hurt",
						"scared",
						"disappointed",
						"angry",
						"resentful",
						"outraged",
						"shocked",
						"confused",
						"sad",
					],

					suggestedNeeds: [
						"Trusting",
						"Honesty",
						"Commitment",
						"Clarity",
						"Connection",
						"Mutuality",
						"Consistency",
						"Safety (emotional)",
					],
				},
				{
					item: "Tricked",
					type: "storyWord",
					ruptureType: "trust",

					storyHint:
						"This word often points to discovering that something wasn't as it seemed — a sense of being misled.",

					empathyGuesses: [
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds disorienting… was it like the ground shifted under you?", feelings: ["confused", "shocked"], needs: ["Clarity"] },
						{ text: "Did you feel embarrassed, like you'd been made a fool of?", feelings: ["embarrassed"], needs: ["Respect"] },
						{ text: "Maybe anger too — a protective 'that's not okay.'", feelings: ["angry", "indignant"], needs: ["Integrity", "Honesty", "Trusting"] },
						{ text: "Sometimes there's hurt if trust was assumed.", feelings: ["hurt", "sad"] },
						{ text: "And sometimes resentment lingers if it feels intentional.", feelings: ["resentful"], needs: ["Safety (emotional)"] },
					],

					suggestedFeelings: [
						"embarrassed",
						"resentful",
						"angry",
						"indignant",
						"hurt",
						"sad",
						"confused",
						"shocked",
					],

					suggestedNeeds: [
						"Integrity",
						"Trusting",
						"Honesty",
						"Clarity",
						"Respect",
						"Safety (emotional)",
					],
				},
				{
					item: "Cheated",
					type: "storyWord",
					ruptureType: "trust",

					storyHint:
						"This word often points to feeling unfairly treated — like something you were entitled to wasn't honoured.",

					empathyGuesses: [
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds unfair… was it like something was taken from you?" },
						{ text: "Did anger flare up — a strong sense of 'this isn't right'?", feelings: ["angry", "resentful", "outraged", "indignant"], needs: ["Equality", "Respect"] },
						{ text: "Maybe disappointment too, especially if you expected fairness.", feelings: ["disappointed"] },
						{ text: "There can also be hurt if trust was assumed.", feelings: ["hurt", "sad"], needs: ["Honesty", "Trusting", "Consistency"] },
					],

					suggestedFeelings: [
						"hurt",
						"angry",
						"resentful",
						"outraged",
						"indignant",
						"disappointed",
						"sad",
					],

					suggestedNeeds: [
						"Honesty",
						"Equality",
						"Trusting",
						"Consistency",
						"Respect",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// INVISIBILITY RUPTURE
		// Theme: not seen/heard/acknowledged
		// Emotional arc: sadness → frustration
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds lonely… was it like you reached out and nothing came back?", feelings: ["lonely"], needs: ["Connection", "To be heard"] },
						{ text: "Did it feel quiet and heavy inside?", feelings: ["sad", "hurt"], needs: ["Belonging", "Acknowledgement"] },
						{ text: "Maybe there's anxiety, wondering whether you matter.", feelings: ["anxious", "insecure", "scared"], needs: ["Mutual Recognition", "Safety (emotional)"] },
						{ text: "Sometimes irritation shows up too, especially if it felt dismissive.", feelings: ["frustrated", "resentful", "embarrassed"], needs: ["Communication", "Inclusion"] },
					],

					suggestedFeelings: [
						"lonely",
						"scared",
						"hurt",
						"sad",
						"embarrassed",
						"insecure",
						"frustrated",
						"resentful",
						"anxious",
					],

					suggestedNeeds: [
						"Connection",
						"Belonging",
						"Inclusion",
						"Community",
						"Communication",
						"To be heard",
						"Acknowledgement",
						"Mutual Recognition",
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds tender… was it like parts of you weren't noticed?", feelings: ["sad", "lonely", "hurt"] },
						{ text: "Maybe there's anxiety about whether you're valued.", feelings: ["anxious", "insecure"], needs: ["To be seen", "Acknowledgement"] },
						{ text: "Sometimes frustration shows up too, especially if you tried to be clear.", feelings: ["frustrated", "resentful"], needs: ["Appreciation", "Empathy", "Understanding"] },
						{ text: "ADD QUESTION HERE", needs: ["Connection", "Authenticity"] },
					],

					suggestedFeelings: [
						"sad",
						"anxious",
						"frustrated",
						"lonely",
						"hurt",
						"insecure",
						"resentful",
					],

					suggestedNeeds: [
						"Acknowledgement",
						"Appreciation",
						"Empathy",
						"Understanding",
						"To be seen",
						"Connection",
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That can feel frustrating… was it like your words didn't land?", feelings: ["frustrated", "angry", "resentful"], needs: ["To be heard", "Communication"] },
						{ text: "Did something in you feel invisible or dismissed?", feelings: ["sad", "lonely", "hurt", "insecure"], needs: ["Understanding", "Empathy"] },
						{ text: "ADD QUESTION HERE", needs: ["Consideration", "Acknowledgement", "Connection"] },
					],

					suggestedFeelings: [
						"sad",
						"frustrated",
						"hurt",
						"lonely",
						"insecure",
						"angry",
						"resentful",
					],

					suggestedNeeds: [
						"Understanding",
						"Consideration",
						"Empathy",
						"Communication",
						"To be heard",
						"Acknowledgement",
						"Connection",
					],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// JUSTICE RUPTURE
		// Theme: fairness imbalance, moral positioning
		// Emotional arc: anger → hurt → indignation
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds upsetting… did something feel morally off?" },
						{ text: "Was there anger — a strong sense of 'that's not right'?", feelings: ["angry", "indignant", "outraged", "resentful"], needs: ["Respect", "Equality", "Integrity"] },
						{ text: "Maybe hurt too, especially if trust was assumed.", feelings: ["hurt", "irritated"] },
						{ text: "And sometimes sadness, if something important felt damaged.", feelings: ["sad"], needs: ["Trusting", "Safety (emotional)"] },
					],

					suggestedFeelings: [
						"hurt",
						"irritated",
						"resentful",
						"angry",
						"indignant",
						"outraged",
						"sad",
					],

					suggestedNeeds: [
						"Respect",
						"Equality",
						"Trusting",
						"Safety (emotional)",
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds infuriating… was it like something was taken from you?" },
						{ text: "Did anger come up quickly?", feelings: ["angry", "resentful", "outraged", "indignant"], needs: ["Equality", "Respect"] },
						{ text: "Maybe disappointment too, especially if you expected fairness.", feelings: ["disappointed"], needs: ["Consideration", "Acknowledgement"] },
						{ text: "Sometimes there's hurt underneath if trust was assumed.", feelings: ["hurt", "sad"] },
					],

					suggestedFeelings: [
						"disappointed",
						"angry",
						"resentful",
						"outraged",
						"indignant",
						"hurt",
						"sad",
					],

					suggestedNeeds: [
						"Consideration",
						"Equality",
						"Acknowledgement",
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
						{ text: "Let's pause gently… what feels most alive right now?" },
						{ text: "That sounds heavy… did it feel like you didn't have power in that moment?" },
						{ text: "Was there fear, if it felt unsafe?", feelings: ["scared", "anxious"], needs: ["Safety (emotional)", "Mutuality"] },
						{ text: "Maybe helplessness — like you couldn't stop it.", feelings: ["helpless", "frightened"], needs: ["Agency", "Autonomy"] },
						{ text: "Or anger, especially if it felt unjust.", feelings: ["angry", "resentful"], needs: ["Equality"] },
						{ text: "Sometimes sadness follows, especially if it felt isolating.", feelings: ["sad", "hurt"] },
					],

					suggestedFeelings: [
						"frightened",
						"helpless",
						"scared",
						"anxious",
						"angry",
						"resentful",
						"sad",
						"hurt",
					],

					suggestedNeeds: [
						"Mutuality",
						"Safety (emotional)",
						"Equality",
						"Agency",
						"Autonomy",
					],
				},
				{
					item: "Blamed",
					type: "storyWord",
					ruptureType: "justice",

					storyHint:
						"This word often carries a sense that responsibility was placed on you in a way that felt unfair or inaccurate.",

					empathyGuesses: [
						{ text: "What feels most alive as you sit with it now?" },
						{ text: "That sounds unfair… did it feel like something was placed on you that didn't really belong to you?" },
						{ text: "Maybe confusion, if the story didn't match your experience.", feelings: ["confused", "bewildered"], needs: ["Clarity", "Understanding"] },
						{ text: "Or hurt, if your intentions weren't seen.", feelings: ["hurt", "scared"], needs: ["Respect"] },
						{ text: "And possibly anger, if something felt unjust.", feelings: ["angry", "resentful"], needs: ["Fairness", "Justice", "Trust"] },
					],

					suggestedFeelings: [
						"scared",
						"confused",
						"bewildered",
						"hurt",
						"angry",
						"resentful",
					],

					suggestedNeeds: ["Fairness", "Justice", "Understanding", "Clarity", "Respect", "Trust"],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// SAFETY RUPTURE
		// Theme: danger, harm, violation
		// Emotional arc: fear → shock → collapse
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

					empathyGuesses: [
						{ text: "Let's go gently… what feels most true right now?" },
						{ text: "That sounds deeply unsafe… did something feel violating or harmful?", needs: ["Physical safety", "Safety (emotional)", "Protection"] },
						{ text: "Is there fear here — the kind that shows up when your body didn't feel protected?", feelings: ["scared", "confused"] },
						{ text: "Maybe shock, if it happened suddenly or didn't make sense.", feelings: ["shocked", "distressed"] },
						{ text: "Or helplessness, if you felt you had no power to stop it.", feelings: ["helpless"], needs: ["Caring", "Support", "Respect", "Space"] },
					],

					suggestedFeelings: [
						"scared",
						"confused",
						"shocked",
						"distressed",
						"helpless",
					],

					suggestedNeeds: [
						"Physical safety",
						"Safety (emotional)",
						"Protection",
						"Caring",
						"Support",
						"Respect",
						"Space",
					],
				},

				{
					item: "Attacked",
					type: "storyWord",
					ruptureType: "safety",

					storyHint:
						"This word often carries a sense of being targeted or harmed — verbally, emotionally, or physically.",

					empathyGuesses: [
						{ text: "Let's pause… what does your body remember about that moment?" },
						{ text: "That sounds frightening… did it feel like you were under threat?", feelings: ["scared"], needs: ["Physical safety", "Safety (emotional)", "Protection"] },
						{ text: "Was there a surge of anger — the kind that protects you?", feelings: ["angry", "defensive"], needs: ["Respect", "Peace (external)"] },
						{ text: "Maybe tension in your body, like you needed to brace.", feelings: ["tense"] },
					],

					suggestedFeelings: [
						"scared",
						"angry",
						"defensive",
						"tense",
					],

					suggestedNeeds: [
						"Physical safety",
						"Safety (emotional)",
						"Protection",
						"Respect",
						"Peace (external)",
					],
				},

				{
					item: "Harassed",
					type: "storyWord",
					ruptureType: "safety",

					storyHint: "This word often points to repeated intrusion or unwanted pressure that felt unsafe.",

					empathyGuesses: [
						{ text: "What feels strongest right now?" },
						{ text: "That sounds wearing and unsafe… was it persistent or hard to escape?", needs: ["Safety (emotional)", "Physical safety", "Space"] },
						{ text: "Maybe anxiety, if it felt like it could happen again.", feelings: ["anxious", "scared"] },
						{ text: "And anger too — a clear 'this isn't okay.'", feelings: ["angry", "frustrated"], needs: ["Respect", "Peace (external)"] },
						{ text: "Perhaps overwhelm, if it kept coming at you.", feelings: ["overwhelmed"] },
					],

					suggestedFeelings: [
						"scared",
						"anxious",
						"angry",
						"frustrated",
						"overwhelmed",
					],

					suggestedNeeds: ["Safety (emotional)", "Physical safety", "Space", "Respect", "Peace (external)"],
				},

				{
					item: "Threatened",
					type: "storyWord",
					ruptureType: "safety",

					storyHint:
						"This word often signals a sense of possible harm or loss — even if nothing physical happened.",

					empathyGuesses: [
						{ text: "Let's breathe gently… what does your body say about it now?" },
						{ text: "That sounds scary… was there a sense something bad could happen?", feelings: ["scared", "alarmed"], needs: ["Physical safety", "Safety (emotional)", "Protection"] },
						{ text: "Maybe agitation, if your system was on high alert.", feelings: ["anxious", "agitated", "tense"], needs: ["Peace of mind", "Stability"] },
					],

					suggestedFeelings: [
						"scared",
						"anxious",
						"alarmed",
						"agitated",
						"tense",
					],

					suggestedNeeds: [
						"Physical safety",
						"Safety (emotional)",
						"Protection",
						"Peace of mind",
						"Stability",
					],
				},

				{
					item: "Violated",
					type: "storyWord",
					ruptureType: "safety",

					storyHint:
						"This word often carries a sense that a boundary — physical, emotional, or relational — was crossed.",

					empathyGuesses: [
						{ text: "Let's move gently here… what feels most alive?" },
						{ text: "That sounds like something crossed a line… did it feel invasive?", needs: ["Safety (emotional)", "Physical safety", "Respect", "Space"] },
						{ text: "Maybe agitation or anxiety, if your body felt exposed.", feelings: ["anxious", "agitated", "helpless"] },
						{ text: "And possibly sadness, if something precious felt disrespected.", feelings: ["sad", "hurt"], needs: ["Trust", "Protection"] },
					],

					suggestedFeelings: [
						"anxious",
						"agitated",
						"sad",
						"hurt",
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
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// CARE RUPTURE
		// Theme: attachment injury, absence of nurture
		// Emotional arc: panic → sadness → longing
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

					empathyGuesses: [
						{ text: "Let's go gently… what feels closest right now?" },
						{ text: "That sounds incredibly vulnerable… did it feel like you were left alone when you needed someone?" },
						{ text: "Maybe fear, if it felt unsafe to be without support.", feelings: ["scared"], needs: ["Protection", "Trusting", "Connection"] },
						{ text: "And sadness or hurt, if something precious felt lost.", feelings: ["sad", "hurt", "lonely"], needs: ["Support", "Caring", "Nurturing", "Warmth"] },
						{ text: "Possibly bewilderment too — a 'how did this happen?' feeling.", feelings: ["bewildered", "helpless"], needs: ["Belonging"] },
					],

					suggestedFeelings: [
						"scared",
						"sad",
						"hurt",
						"lonely",
						"bewildered",
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
				},

				{
					item: "Neglected",
					type: "storyWord",
					ruptureType: "care",

					storyHint:
						"This word often carries a sense of being overlooked or not tended to when care was needed.",

					empathyGuesses: [
						{ text: "What feels most alive in you as you think about it?" },
						{ text: "That sounds painful… did it feel like your needs weren't being noticed?", needs: ["Care", "Consideration"] },
						{ text: "Maybe loneliness, if you felt unseen or unattended.", feelings: ["lonely", "sad"], needs: ["Connection", "Belonging"] },
						{ text: "Perhaps anxiety too — wondering if support would come.", feelings: ["anxious", "scared"], needs: ["Support", "Participation"] },
						{ text: "And hurt, if something in you longed to be cared for.", feelings: ["hurt"] },
					],

					suggestedFeelings: [
						"lonely",
						"scared",
						"anxious",
						"sad",
						"hurt",
					],

					suggestedNeeds: ["Connection", "Belonging", "Care", "Consideration", "Support", "Participation"],
				},

				{
					item: "Unsupported",
					type: "storyWord",
					ruptureType: "care",

					storyHint:
						"This word often points to carrying something alone that felt too heavy to hold by yourself.",

					empathyGuesses: [
						{ text: "What would have made it feel lighter?" },
						{ text: "That sounds heavy… was it like you were carrying something alone?", needs: ["Support", "Cooperation"] },
						{ text: "Maybe sadness, if you longed for someone beside you.", feelings: ["sad", "hurt"], needs: ["Understanding", "Companionship", "Care"] },
						{ text: "Or overwhelm, if it felt like too much without help.", feelings: ["overwhelmed"] },
						{ text: "And possibly helplessness, if relief didn't seem available.", feelings: ["helpless"] },
					],

					suggestedFeelings: [
						"sad",
						"hurt",
						"overwhelmed",
						"helpless",
					],

					suggestedNeeds: ["Support", "Cooperation", "Understanding", "Companionship", "Care"],
				},

				{
					item: "Unloved",
					type: "storyWord",
					ruptureType: "care",

					storyHint: "This word often holds a tender longing to feel cherished or valued at a deep level.",

					empathyGuesses: [
						{ text: "What does your heart most wish for here?" },
						{ text: "That feels tender… was there a longing to feel cherished or held close?", needs: ["Love", "Affection", "Warmth"] },
						{ text: "Maybe sadness, if something in you wanted warmth.", feelings: ["sad", "hurt"] },
						{ text: "Or confusion — wondering why connection didn't land.", feelings: ["bewildered", "frustrated"], needs: ["Connection", "Empathy"] },
						{ text: "And possibly loneliness, if you reached and didn't feel met.", feelings: ["lonely"], needs: ["Appreciation"] },
					],

					suggestedFeelings: [
						"sad",
						"bewildered",
						"frustrated",
						"hurt",
						"lonely",
					],

					suggestedNeeds: ["Love", "Affection", "Warmth", "Connection", "Empathy", "Appreciation"],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// OVERLOAD / BURDEN RUPTURE
		// Theme: capacity exceeded
		// Emotional arc: frustration → overwhelm → exhaustion
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
						"This word often carries a sense of being given responsibility or emotional weight that didn't feel fair or manageable.",

					empathyGuesses: [
						{ text: "What would have made it feel shared instead?" },
						{ text: "That sounds heavy… was it like too much landed on you at once?" },
						{ text: "Maybe anger, if it didn't feel fair.", feelings: ["angry", "frustrated"], needs: ["Consideration", "Fairness"] },
						{ text: "And overwhelm, if your capacity felt stretched.", feelings: ["overwhelmed"], needs: ["Support", "Cooperation", "Ease"] },
						{ text: "Possibly exhaustion too — when the load keeps growing.", feelings: ["exhausted"], needs: ["Space", "Rest/sleep"] },
					],

					suggestedFeelings: [
						"angry",
						"frustrated",
						"overwhelmed",
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
				},

				{
					item: "Hassled",
					type: "storyWord",
					ruptureType: "overload",

					storyHint:
						"This word often reflects repeated interruptions or demands that disrupt your pace or calm.",

					empathyGuesses: [
						{ text: "What would have helped you breathe more easily?" },
						{ text: "That sounds wearing… was it like you couldn't settle or focus?", needs: ["Space", "Ease", "Peace (external)"] },
						{ text: "Maybe irritation — a 'please stop' signal.", feelings: ["irritated", "angry"], needs: ["Autonomy"] },
						{ text: "Or tension, if your system couldn't relax.", feelings: ["tense", "distressed"] },
						{ text: "Perhaps frustration, if your pace wasn't respected.", feelings: ["frustrated"], needs: ["Consideration"] },
					],

					suggestedFeelings: [
						"irritated",
						"angry",
						"frustrated",
						"distressed",
						"tense",
					],

					suggestedNeeds: ["Space", "Ease", "Peace (external)", "Consideration", "Autonomy"],
				},

				{
					item: "Overworked",
					type: "storyWord",
					ruptureType: "overload",

					storyHint: "This word often signals prolonged strain — more demand than rest or recovery.",

					empathyGuesses: [
						{ text: "What would real recovery look like for you?" },
						{ text: "That sounds draining… was it more than your system could sustain?", needs: ["Rest/sleep", "Rejuvenation", "Balance"] },
						{ text: "Maybe exhaustion, if rest never caught up.", feelings: ["exhausted", "tired", "drained"], needs: ["Ease"] },
						{ text: "Or frustration, if your limits weren't recognised.", feelings: ["frustrated"], needs: ["Consideration", "Support"] },
					],

					suggestedFeelings: [
						"tired",
						"exhausted",
						"frustrated",
						"drained",
					],

					suggestedNeeds: ["Rest/sleep", "Rejuvenation", "Ease", "Consideration", "Support", "Balance"],
				},

				{
					item: "Trampled",
					type: "storyWord",
					ruptureType: "overload",

					storyHint:
						"This word often carries both disrespect and overwhelm — as if your needs were pushed past.",

					empathyGuesses: [
						{ text: "What boundary would have protected you there?" },
						{ text: "That sounds like your limits weren't honoured… did it feel like your needs were pushed aside?", needs: ["Respect", "Consideration"] },
						{ text: "Maybe frustration or anger, if you felt overrun.", feelings: ["frustrated", "angry"], needs: ["Space", "Autonomy"] },
						{ text: "And overwhelm, if it was too much too fast.", feelings: ["overwhelmed"] },
						{ text: "Possibly hurt too — if something important felt disregarded.", feelings: ["hurt"], needs: ["Support"] },
					],

					suggestedFeelings: [
						"frustrated",
						"angry",
						"overwhelmed",
						"hurt",
					],

					suggestedNeeds: ["Respect", "Consideration", "Space", "Autonomy", "Support"],
				},
			],
		},

		// ──────────────────────────────────────────────────────────
		// SELF-JUDGEMENT
		// Theme: self-critical words — turned inward
		// Emotional arc: shame → sadness → sometimes fear or despair
		// ──────────────────────────────────────────────────────────

		selfJudgement: {
			ui: {
				heading: "When You're Being Hard on Yourself",
				order: 110,
			},
			items: [
				{
					item: "Worthless",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries a painful story that your presence or needs don't matter — like your worth has disappeared or can't be felt right now.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds so heavy… is there sadness here?", feelings: ["sad", "heavy"], needs: ["To matter", "Mattering to myself"] },
						{ text: "Maybe shame or despair, if something in you is saying you should be different?", feelings: ["numb", "despairing"], needs: ["Self-acceptance", "Appreciation"] },
					],

					suggestedFeelings: ["sad", "heavy", "numb", "despairing"],

					suggestedNeeds: ["To matter", "Mattering to myself", "Self-acceptance", "Appreciation"],
				},

				{
					item: "Inadequate / not good enough",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries a sense that you're falling short — like something about you isn't measuring up.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds uncomfortable… is there anxiety here?", feelings: ["anxious"], needs: ["Competence", "Growth"] },
						{ text: "Maybe shame, if part of you feels like you should be better?", feelings: ["ashamed"], needs: ["Self-acceptance"] },
						{ text: "Or discouragement, if it feels hard to meet expectations?", feelings: ["discouraged"], needs: ["Support"] },
					],

					suggestedFeelings: ["anxious", "ashamed", "discouraged"],

					suggestedNeeds: ["Competence", "Growth", "Self-acceptance", "Support"],
				},

				{
					item: "Broken",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries a sense that something in you is damaged or beyond repair — like healing feels far away.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds really painful… is there despair here?", feelings: ["despairing", "hopeless"], needs: ["Healing", "Hope"] },
						{ text: "Maybe shame, if you're judging yourself for struggling?", feelings: ["ashamed"] },
						{ text: "Is there a longing for healing or gentleness?", needs: ["Self-acceptance", "Self-connection"] },
					],

					suggestedFeelings: ["despairing", "ashamed", "hopeless"],

					suggestedNeeds: ["Healing", "Self-acceptance", "Self-connection", "Hope"],
				},

				{
					item: "A failure",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries a sense that your efforts haven't led to the outcome you hoped for — and that that means something about you.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds discouraging… is there disappointment here?", feelings: ["disappointed"], needs: ["Contribution", "Effectiveness"] },
						{ text: "Maybe shame, if you're judging yourself for the outcome?", feelings: ["ashamed"] },
						{ text: "Or discouragement, if something important didn't work out?", feelings: ["discouraged"], needs: ["Appreciation", "Growth"] },
					],

					suggestedFeelings: ["disappointed", "ashamed", "discouraged"],

					suggestedNeeds: ["Contribution", "Effectiveness", "Appreciation", "Growth"],
				},

				{
					item: "Unlovable",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries a fear that love or acceptance isn't available to you — like connection might not be safe or possible.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds really tender… is there sadness here?", feelings: ["sad", "lonely"], needs: ["Love", "Connection"] },
						{ text: "Maybe fear, if connection doesn't feel secure?", feelings: ["afraid"], needs: ["Acceptance", "Belonging"] },
					],

					suggestedFeelings: ["sad", "afraid", "lonely"],

					suggestedNeeds: ["Love", "Acceptance", "Belonging", "Connection"],
				},

				{
					item: "Too much",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries a fear that your needs, feelings, or intensity are more than others can welcome.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds exposed… is there anxiety here?", feelings: ["anxious"], needs: ["Acceptance", "Safety (emotional)"] },
						{ text: "Maybe shame, if part of you feels you should take up less space?", feelings: ["ashamed"], needs: ["Belonging", "To be seen"] },
					],

					suggestedFeelings: ["anxious", "ashamed"],

					suggestedNeeds: ["Acceptance", "Belonging", "Safety (emotional)", "To be seen"],
				},

				{
					item: "Lazy",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries self-blame around capacity — like part of you thinks you should be able to do more than you can right now.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds harsh inside… is there discouragement here?", feelings: ["discouraged"], needs: ["Support", "Aliveness"] },
						{ text: "Maybe overwhelm, if things feel harder than they 'should'?", feelings: ["overwhelmed"], needs: ["Rest / sleep", "Ease"] },
					],

					suggestedFeelings: ["discouraged", "overwhelmed"],

					suggestedNeeds: ["Rest / sleep", "Ease", "Support", "Aliveness"],
				},

				{
					item: "Invisible",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries a sense that you're not being noticed or recognised — like your presence isn't landing with others.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds lonely… is there hurt here?", feelings: ["lonely", "hurt"], needs: ["To be seen", "To matter", "Connection", "Acknowledgement"] },
					],

					suggestedFeelings: ["lonely", "hurt"],

					suggestedNeeds: ["To be seen", "To matter", "Connection", "Acknowledgement"],
				},

				{
					item: "Replaceable",
					type: "storyWord",
					ruptureType: "selfJudgement",

					storyHint:
						"This word often carries a fear that your presence isn't unique or valued — like you could easily be swapped out.",

					empathyGuesses: [
						{ text: "Let's slow it gently… what feeling feels most alive right now?" },
						{ text: "That sounds unsettling… is there insecurity here?", feelings: ["insecure", "sad"], needs: ["To matter", "Appreciation", "Contribution", "Belonging"] },
					],

					suggestedFeelings: ["insecure", "sad"],

					suggestedNeeds: ["To matter", "Appreciation", "Contribution", "Belonging"],
				},
			],
		},
	},
};

export const storyWordSet = new Set(
	Object.values(StoryWords.groups).flatMap((g) => g.items.map((i) => i.item)),
);

export const storyWordDataByName = Object.fromEntries(
	Object.values(StoryWords.groups).flatMap((g) => g.items.map((i) => [i.item, i])),
);

export default StoryWords;
