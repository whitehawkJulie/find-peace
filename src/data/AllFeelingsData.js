import Feelings from "./Feelings.js";
import FeelingsMet from "./FeelingsMet.js";

import StoryWords from "./StoryWords.js";

// regulationMeta is a lightweight nervous-system lens over feeling words.
// It’s a heuristic (not a claim about “what this feeling really is”).
//
// Intended uses (optional):
// 1) Adaptive pacing / support prompts:
//    - Activated → help slow, narrow, stabilise, reduce urgency.
//    - Contracted → soften shame/freeze, increase safety/belonging cues.
//    - Collapsed → micro-agency, warmth, reduce effort load.
//    - Settled → integration, clarity, choiceful next steps.
//    - Cognitive → disentangle interpretation from sensation; clarify.
// 2) Alternate display grouping for experimentation (not required).
//
// Notes:
// - Mixed states are normal. Use as “offer”, not “verdict”.
// - Prefer dominant pattern across selected feelings, or the most intense item.
// - Never hide or invalidate a feeling because of its regulation tag.
export const regulationMeta = {
	// Palette notes:
	// - These are intentionally *very* low-saturation backgrounds so they don’t hijack attention.
	// - Use them as an optional overlay (toggle), not the default view.
	// - Recommend applying as: subtle background + slightly stronger border (optional).
	//
	// Suggested UI usage:
	// - pill background: bg
	// - pill border (optional): border
	// - tiny dot (optional): dot

	activated: {
		label: "Mobilised",
		description: "Energy is rising. Something in you is ready to act or respond.",

		// Subtle warm/energised tint
		colors: {
			bg: "#FFF6E8", // very pale apricot
			border: "#F2C99A",
			dot: "#D9822B",
		},

		help: {
			title: "Mobilised (Activated)",
			whatItMeans:
				"Your nervous system has energy online for action — fight, push, argue, fix, escape, protect, do.",
			commonFeelsLike: "Urgency, heat, charge, ‘I have to do something’, strong edges, intensity.",
			howToUse:
				"If this is high, it can help to slow down and name what matters before problem-solving. Sometimes ‘activated’ feelings are protective.",
			gentleNote: "Seeing this tag doesn’t mean anything is wrong — it’s just a map of state.",
		},
	},

	threat: {
		label: "On Alert",
		description: "Your system is scanning for safety. Something feels uncertain or risky.",

		// Subtle bright-yet-soft yellow tint (attention/orienting)
		colors: {
			bg: "#FFFBE6", // very pale butter
			border: "#E8D37A",
			dot: "#B08900",
		},

		help: {
			title: "On Alert (Threat)",
			whatItMeans:
				"Your system is tracking risk. Even without panic, there can be a ‘watching / bracing’ quality.",
			commonFeelsLike: "Hypervigilance, startle, tension, scanning, worry, ‘is this safe?’.",
			howToUse:
				"If threat is present, you may get more clarity by finding what would increase safety (internally or externally) before going deeper.",
			gentleNote: "Threat tagging can be subtle — it often shows up as tightness or watchfulness.",
		},
	},

	contracted: {
		label: "Protecting",
		description: "Part of you is guarding something important.",

		// Subtle muted lavender/rose tint (protective contraction without ‘alarm’)
		colors: {
			bg: "#F6F0FF", // very pale lavender
			border: "#CDB7F2",
			dot: "#6E56CF",
		},

		help: {
			title: "Protecting (Contracted)",
			whatItMeans:
				"Energy narrows to protect: withdrawing, bracing, holding in, guarding dignity, avoiding exposure.",
			commonFeelsLike: "Constriction, guardedness, ‘don’t touch that’, self-protection, carefulness.",
			howToUse:
				"Contracted states often soften with warmth, consent, and small steps. You might first name what feels tender or at risk.",
			gentleNote: "Protection is intelligent. We can respect it while still finding what’s true underneath.",
		},
	},

	collapsed: {
		label: "Shut Down",
		description: "Energy has dropped. Your system may be pulling back to cope.",

		// Subtle cool blue-grey tint (low energy / shut down)
		colors: {
			bg: "#EEF3F7", // very pale blue-grey
			border: "#B7C6D3",
			dot: "#4C6A86",
		},

		help: {
			title: "Shut Down (Collapsed)",
			whatItMeans:
				"Your system may be conserving energy: disengaging, going flat, going numb, or feeling ‘I can’t’.",
			commonFeelsLike: "Heaviness, blankness, numbness, hopelessness, very low drive or clarity.",
			howToUse:
				"If collapse is strong, the kindest next step is usually gentle support and regulation — not demanding insight. Tiny choices can restore agency.",
			gentleNote: "This tag can also show up after long stress — it’s a coping response, not a failure.",
		},
	},

	cognitive: {
		label: "Seeking Clarity",
		description: "Something feels unclear or unsettled. Your mind is trying to make sense of it.",

		// Subtle mint tint (cognitive ‘searching’ without strong emotion)
		colors: {
			bg: "#EAF8F2", // very pale mint
			border: "#8FD3B8",
			dot: "#1F7A5A",
		},

		help: {
			title: "Seeking Clarity (Cognitive Blend)",
			whatItMeans:
				"This usually indicates a thought-feeling blend: some emotional distress plus ‘I don’t understand / I’m not sure / what does this mean?’",
			commonFeelsLike:
				"Confusion, mental churn, analysis loops, ‘trying to work it out’, unease with uncertainty.",
			howToUse:
				"Sometimes naming the underlying emotion (fear / hurt / sadness) helps the mind settle. Sometimes a simple fact-check or specificity helps.",
			gentleNote:
				"Cognitive tags aren’t ‘not feelings’ — they’re often feelings with an attached interpretation.",
		},
	},

	settled: {
		label: "Settled",
		description: "You feel calm and grounded.",

		// Subtle green tint (grounded)
		colors: {
			bg: "#ECF8EE", // very pale green
			border: "#9ED0A5",
			dot: "#2F7D3A",
		},

		help: {
			title: "Settled",
			whatItMeans: "Your system feels resourced enough to reflect, connect, and choose deliberately.",
			commonFeelsLike: "Steady, present, clear, open, connected, able to feel without being flooded.",
			howToUse: "This can be a good window for needs clarity, strategy generation, and relational repair.",
			gentleNote: "Settled doesn’t mean ‘no feelings’ — it means enough safety to stay with them.",
		},
	},

	// Drawer-level UI copy (optional place to centralize the help content)
	uiHelpDrawer: {
		title: "Nervous System Overlay",
		intro: "This overlay lightly colour-maps feeling words by nervous system state. It’s not a diagnosis \
		— just a way to notice patterns. And it's just a guess - it might be slightly different for you.",
		why: "Sometimes the most useful next step depends on state. For example: high activation may benefit from slowing; threat may benefit from safety; collapse may benefit from gentleness and support.",
		howToUse: [
			"Use it as a *pattern lens*, not a sorting rule.",
			"Keep scanning the whole list — surprises often come from outside your expected ‘band’.",
			"If the colours feel too much, turn the overlay off.",
		],
		toggleLabel: "Show nervous system map",
		caution: "Colours can bias attention. That’s why this is optional and intentionally subtle.",
	},
};

// THREAT + THOUGHT OVERLAY
// regulationType: ["activated", "cognitive"] – anxious, worried, suspicious, mistrustful, wary, upset, jealous, envious

// CONFUSION + ACTIVATION
// regulationType: ["cognitive", "activated"] – confused, bewildered, baffled, perplexed, puzzled, torn, ambivalent, hesitant, lost

// OVERLOAD / FLOODING BLENDS
// regulationType: ["activated", "collapsed"] – overwhelmed

// ACTIVATION + SOCIAL PAIN
// regulationType: ["activated", "contracted"] – distressed, distraught

// SHAME + INNER STORY
// regulationType: ["contracted", "cognitive"] – ashamed, guilty, embarrassed, self-conscious, disappointed, regretful, remorseful, wistful

// NO-EXIT / SHUTDOWN BLENDS (pain + collapse)
// regulationType: ["collapsed", "contracted"] – hopeless, despairing, miserable, devastated

// SETTLED + REFLECTIVE (gentle meaning tone)
// regulationType: ["settled", "cognitive"] – nostalgic

export const AllFeelingsData = {
	ui: {
		heading: "Feelings",
		helpText: "",
	},
	sections: {
		feelings: Feelings,
		story: StoryWords,
		feelingsMet: FeelingsMet,
	},
};
export default AllFeelingsData;
