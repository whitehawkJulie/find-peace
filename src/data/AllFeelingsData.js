import Feelings from "./Feelings.js";
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
	activated: {
		label: "Mobilised",
		description: "Energy is rising. Something in you is ready to act or respond.",
	},

	threat: {
		label: "On Alert",
		description: "Your system is scanning for safety. Something feels uncertain or risky.",
	},

	contracted: {
		label: "Protecting",
		description: "Part of you is guarding something important.",
	},

	collapsed: {
		label: "Shut Down",
		description: "Energy has dropped. Your system may be pulling back to cope.",
	},

	cognitive: {
		label: "Seeking Clarity",
		description: "Something feels unclear or unsettled. Your mind is trying to make sense of it.",
	},
	settled: {
		label: "Settled",
		description: "You feel calm and grounded.",
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
	},
};
export default AllFeelingsData;
