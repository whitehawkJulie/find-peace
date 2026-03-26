import React, { useState } from "react";
import WhetherToConverse from "./WhetherToConverse";
import SimpleRequest from "./SimpleRequest";
import Collaborate from "./Collaborate";
import "./ConversationsAndCollaboration.css";

const SECTIONS = [
	{
		id: "whether",
		title: "Whether to have the conversation",
		subtitle: "For when you're unsure whether talking about this will help or make things harder",
		Component: WhetherToConverse,
	},
	{
		id: "request",
		title: "Make a simple request",
		subtitle: "For when you know what would help and want to ask for it clearly",
		Component: SimpleRequest,
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

ConversationsAndCollaboration.helpContent = (
	<>
		<h2>Need more support with having a conversation?</h2>

		<section>
			<h3>When this feels hard</h3>
			<p>If this feels difficult, that's completely normal.</p>
			<p>
				When we're hurt or activated, our brain shifts into protection mode — it can feel urgent to explain,
				defend, or fix things quickly.
			</p>
			<p>
				This process is about slowing things down just enough to understand what's really going on, so you have
				a better chance of being heard.
			</p>
		</section>

		<section>
			<h3>Why start with them?</h3>
			<p>When someone feels understood, their nervous system often settles.</p>
			<p>That makes it much more likely they'll be able to hear you in return.</p>
			<p>This doesn't mean their perspective is "right" — just that understanding comes before resolution.</p>
		</section>

		<section>
			<h3>If they're not ready</h3>
			<p>Sometimes the other person isn't in a place where they can have this kind of conversation.</p>
			<p>That might look like:</p>
			<ul>
				<li>Interrupting or arguing</li>
				<li>Shutting down</li>
				<li>Dismissing what you're saying</li>
			</ul>
			<p>If that happens, it's often more effective to pause and come back later, rather than pushing through.</p>
		</section>

		<section>
			<h3>You don't have to get this right</h3>
			<p>There's no perfect way to do this.</p>
			<p>What matters most is sincerity — being real about your experience, and open to theirs.</p>
			<p>Even a messy, human version of this can shift things.</p>
		</section>

		<section>
			<h3>This is a practice</h3>
			<p>This kind of conversation takes practice.</p>
			<p>It's normal to forget steps, get tangled, or slip back into old patterns.</p>
			<p>Each time you try, you're building a new way of relating.</p>
		</section>
	</>
);

export default ConversationsAndCollaboration;
