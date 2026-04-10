import React, { useState } from "react";
import WhetherToConverse from "./WhetherToConverse";
import SimpleRequest from "./SimpleRequest";
import Collaborate from "./Collaborate";
import "./ConversationsAndCollaboration.css";

const SECTIONS = [
	{
		id: "request",
		title: "Make a simple request",
		subtitle: "For when you know what would help and want to ask for it clearly",
		Component: SimpleRequest,
	},
	{
		id: "whether",
		title: "Whether to have a longer conversation",
		subtitle: "For when you're unsure whether talking about this will help or make things harder",
		Component: WhetherToConverse,
	},
	{
		id: "collaborate",
		title: "Collaborate",
		subtitle: "For when you want to work through this together and find a way forward that works for both of you",
		Component: Collaborate,
	},
];

const ConversationsAndCollaboration = () => {
	const [expanded, setExpanded] = useState(new Set());

	const toggle = (id) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	return (
		<div className="step-collab step-container">
			<p>
				Many people find that doing this process resolves a lot of their issues, and when it's done, it's done!
				But sometimes it's more complicated, and you want to figure out how to move forward with the other
				person.
			</p>
			<p>
				This could look like making a simple request of them, if it's already clear to you what you'd like to
				ask for. Alternately, we might want to have a longer conversation, using all the information we've
				uncovered, to figure out together how to move forward. The "Collaborate" section will help you build
				what that might look like, using the data you've already entered.
			</p>
			<div className="collab-accordion">
				{SECTIONS.map(({ id, title, subtitle, Component }) => {
					const isOpen = expanded.has(id);
					return (
						<div key={id} className={`collab-section ${isOpen ? "open" : ""}`}>
							<button className="collab-section-toggle" onClick={() => toggle(id)}>
								<span className="collab-section-header">
									<span className="collab-section-title">{title}</span>
									<span className="collab-section-subtitle">{subtitle}</span>
								</span>
								<span className="collab-section-chevron">{isOpen ? "▲" : "▼"}</span>
							</button>
							{isOpen && (
								<div className="collab-section-content">
									<Component />
								</div>
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
};

ConversationsAndCollaboration.title = "Conversations and Collaboration";
ConversationsAndCollaboration.titleSweary = "So... how do we actually fix this?";
ConversationsAndCollaboration.navTitle = "Conversations";

export default ConversationsAndCollaboration;
