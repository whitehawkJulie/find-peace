import React from "react";
import ObservationExample from "../components/ObservationExample";

// ── Page content ────────────────────────────────────────────────────────────

export const observationContent = {
	navTitle: "What was the moment?",

	title: {
		default: "What was the moment that upset you?",
		tone: { sweary: "What the hell just happened?" },
	},

	purpose: {
		// We’re doing [the task] , so that we can [psychological shift]
		default:
			"Here we’re separating what happened from the story, so that we can start to move out of reaction and into clearer understanding.",
	},

	intro: {
		default:
			"Let's slow down and look at the specific moment itself — just what someone could have seen or heard, before any interpretations, or assumptions about motives.",
	},

	// ── Jackal / raw-venting section ──────────────────────────────────────────
	jackalSection: {
		intro: {
			default:
				"Before we try to make sense of it, say it the raw way. This isn't about being fair or accurate — just letting the first wave out.",
			tone: {
				sweary: "Before we try to make sense of it — say it the raw, unfiltered way. This isn't about being fair or accurate. Just get it out.",
			},
		},
		prompt: {
			default: "If you said the uncensored version in one breath, what would it be?",
			tone: {
				sweary: "If you just blurted it all out right now, what would you say?",
			},
		},
		placeholder: {
			default: "They ALWAYS do this! I'm so over it...",
			tone: {
				sweary: "They ALWAYS do this! What the actual f**k...",
			},
		},
	},

	// ── Refined observation section ───────────────────────────────────────────
	refinedIntro: {
		default: "Now, if you were to remove all those parts, what would you write?",
		tone: {
			sweary: "OK, strip it back. What actually happened — just the facts. What could someone else in the room have seen or heard? No story, no 'because he always does this'.",
		},
	},

	refinedPlaceholder: {
		default:
			"Example:\nYesterday evening,\nwhile I was telling you about my day,\nyou looked at your phone and didn't respond.",
	},

	// ── Check panel ───────────────────────────────────────────────────────────
	checkPanel: {
		title: {
			default: "From threat mode to curiosity",
			tone: { sweary: "Let's look at what actually happened" },
		},
	},

	unpackButton: {
		default: "Help me unpack this",
	},
};

// ── Checks array ─────────────────────────────────────────────────────────────
// Exported as a plain array (not content nodes) since tone-sensitive check
// variants haven't been written yet. Upgrade to content nodes if needed.

export const observationChecks = [
	{
		icon: "⏳",
		heading: "One specific moment",
		description: "Choose a single instance — not the whole history.",
		extraInfo: (
			<>
				Words like "always," "never," or "every time" often signal that multiple events are bundled together.
				<br />
				Try narrowing to one moment: <em>"On Tuesday evening when…"</em> instead of{" "}
				<em>"Every time we talk about this…"</em>
			</>
		),
	},
	{
		icon: "🔎",
		heading: "Just what happened — not what it meant",
		description: `Are we describing what was actually said or done, rather than interpretations like "disrespectful," "uncaring," "manipulative"?`,
		extraInfo: (
			<>
				Try stripping out words that carry a judgment or meaning, and rewriting in terms of actions, words, and
				what was physically present. Instead of <em>"she was dismissive"</em>, try{" "}
				<em>"she looked at her phone while I was speaking."</em>
				<br />
				If it helps, imagine what someone else in the room might have noticed happening. What might they say
				they saw or heard?
			</>
		),
	},
	{
		icon: "🧠",
		heading: `Leave the "why" aside just for now`,
		description: `Have we removed any assumptions about motive? (e.g., "to control me," "to hurt me," "because he doesn't care")`,
		extraInfo: (
			<>
				Our minds fill in meaning very quickly — that's normal. Try leaving out the "because" for now. Just
				describe what happened. The question of why can come later.
			</>
		),
	},
];

// ── Help content ─────────────────────────────────────────────────────────────

export const observationHelpContent = (
	<>
		<h4>What is an observation?</h4>
		<>
			An observation is a description of a specific moment — something that could have been seen or heard by
			someone in the room. It avoids interpretation, judgment, motive-guessing, and time collapse.
		</>

		<h4>How to write one</h4>
		<ul>
			<li>
				<strong>Be specific</strong> — one moment, not "you always…"
			</li>
			<li>
				<strong>Stick to actions and words</strong> — what was said or done
			</li>
			<li>
				<strong>Leave out the "why"</strong> — motives can come later
			</li>
		</ul>

		<h4>Interactive Example</h4>
		<p>Click the buttons to see it change.</p>
		<ObservationExample />
	</>
);
