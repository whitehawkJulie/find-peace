import React from "react";

// Standalone help topics — not tied to any specific step/page.
// Each entry: { id, title, content (JSX) }
// Link to one from anywhere with: openHelpTopic("topic-id")
// or: <HelpLink topic="topic-id">link text</HelpLink>

const StandaloneHelpTopics = [
	{
		id: "mourning",
		title: "Mourning",
		content: (
			<>
				<p>
					Mourning in NVC means consciously feeling the grief, sadness, or regret that arises when
					a need wasn't met — whether by our own actions or someone else's.
				</p>
				<p>
					It's distinct from guilt (which focuses on blame) or self-criticism (which focuses on
					what's wrong with us). Mourning stays with the feeling and the unmet need.
				</p>
				<p>
					The purpose of mourning is to honour what mattered. When we let ourselves feel the loss,
					we can move forward with more clarity and self-compassion — and from there, make a new
					choice.
				</p>
			</>
		),
	},
	// Add more topics here as needed. Example:
	// {
	// 	id: "empathy",
	// 	title: "Empathy",
	// 	content: <p>...</p>,
	// },
];

export default StandaloneHelpTopics;
