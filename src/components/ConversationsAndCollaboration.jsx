import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import "./ConversationsAndCollaboration.css";

export const COLLABORATE_TIPS_TEXT = `Tips for starting a conversation:

1. Get permission first
   Ask before diving in: "Would you be willing to talk about something that came up for me?"

2. Begin with your guesses about them
   When people feel understood, their nervous system settles. Try: "I'm wondering if when that happened you might have been needing…"

3. Wait for their genuine willingness
   If they're not ready, wait. Pushing usually makes things harder.

4. Check you're both being heard
   "Have I heard you correctly? Is that what you meant?"
   "Would you be willing to tell me what you're hearing me say?"

5. Co-create a solution after both of you have been heard
   When everyone's needs are visible, it's much easier to find strategies that work for both of you.`;

const ConversationsAndCollaboration = () => {
	const { simpleRequest, setSimpleRequest, wantsConversation, setWantsConversation } = useWizard();
	const [expanded, setExpanded] = useState(new Set());

	const toggle = (id) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const SECTIONS = [
		{
			id: "whether",
			title: "Whether to have the conversation",
			content: (
				<>
					<p>I'm likely to have the conversation if:</p>
					<ul>
						<li>I have ongoing contact with this person</li>
						<li>AND this is an appropriate place for me to try having this need met</li>
						<li>AND this is a need that they are potentially capable of meeting</li>
						<li>AND I have enough clarity at this point to find a way to express myself clearly enough</li>
						<li>AND they're willing to have the conversation!</li>
					</ul>
					<p>
						If this person isn't capable of meeting this need, I don't give up on it — I find ways to meet
						it elsewhere. Hold tightly to your needs, and loosely to your strategies.
					</p>
				</>
			),
		},
		{
			id: "request",
			title: "Make a simple request",
			content: (
				<>
					<p>
						If this is a fairly simple situation, there may be a request you'd like to make of the other
						person. A request is basically asking whether someone would be willing to take an action that
						might help meet one or more of your needs.
					</p>

					<p>
						It helps to stay aware that no-one has to meet our needs. We're asking for willingness, not
						demanding compliance. In fact, we usually don't want people to do something unwillingly — that
						tends to create resentment and disconnect rather than genuine care.
					</p>

					<p>A few things tend to make requests work better:</p>

					<ul>
						<li>
							<strong>Be clear and specific.</strong> A request needs to describe something the other
							person could actually do or say. "Be nicer to me" isn't very clear, because the other person
							has no idea what that would look like for you.
						</li>

						<li>
							<strong>Describe the action you're asking for.</strong> For example: "Would you be willing
							to ask me how my day was when I get home, for the next week?"
						</li>

						<li>
							<strong>Keep it doable.</strong> Requests work best when they are concrete and realistic.
							Specific actions and timeframes make it easier for the other person to respond honestly.
						</li>

						<li>
							<strong>Be willing to hear "no".</strong> A request only stays a request if the other person
							can freely say no. If they say no, it doesn't mean your needs don't matter — it usually
							means they have needs of their own that are also important.
						</li>

						<li>
							<strong>Listen for the "yes" to their own needs.</strong> When someone says no, they are
							often protecting something important to them — perhaps their time, energy, safety, or
							priorities. Hearing that can open the door to finding another strategy that might work for
							both of you.
						</li>
					</ul>

					<p>
						When both people's needs are visible, it becomes much easier to look for solutions that everyone
						can willingly support.
					</p>

					<div className="collab-input-group">
						<label className="collab-input-label">Is there a request you'd like to make?</label>
						<textarea
							className="collab-textarea"
							placeholder="e.g. Would you be willing to…"
							value={simpleRequest}
							onChange={(e) => setSimpleRequest(e.target.value)}
							rows={3}
						/>
					</div>
				</>
			),
		},
		{
			id: "collaborate",
			title: "Collaborate",
			content: (
				<>
					<p>
						If you want things to change, the next step is usually a conversation with the other person so
						you can get on the same page and then co-create a solution together.
					</p>

					<p>
						It helps to do the full reflection process in this tool first. When you're clearer about what
						happened, how you felt, and what needs were involved, the conversation is much more likely to go
						well.
					</p>

					<p>A few things tend to make these conversations easier and safer for both people:</p>

					<ul>
						<li>
							<strong>Start by getting permission.</strong> Rather than launching straight into the issue,
							make a simple request first, such as: "Would you be willing to talk about something that
							came up for me earlier?"
						</li>

						<li>
							<strong>Begin with your guesses about them.</strong> When people feel that you're trying to
							understand them, their nervous system tends to settle. You might start with something like:
							"I'm wondering if when that happened you might have been needing…"
						</li>

						<li>
							<strong>Wait for their willingness to hear you.</strong> If they're not ready to listen yet,
							pushing usually makes things harder. It's often better to wait until there's genuine
							openness on both sides.
						</li>

						<li>
							<strong>Use connection requests to make sure you're both being heard.</strong>
							<ul>
								<li>"Have I heard you correctly? Is this what you're saying?"</li>
								<li>"Would you be willing to tell me what you're hearing me say?"</li>
							</ul>
						</li>

						<li>
							<strong>Co-create a solution only after both of you have been heard.</strong> When
							everyone's needs are visible, it becomes much easier to look for strategies that could work
							for both of you.
						</li>
					</ul>

					<div className="collab-checkbox-group">
						<label className="collab-checkbox-label">
							<input
								type="checkbox"
								checked={wantsConversation}
								onChange={(e) => setWantsConversation(e.target.checked)}
							/>
							I'd like to have a conversation with this person
						</label>
					</div>
				</>
			),
		},
	];

	return (
		<div className="step-collab">
			<p>
				Many of us find that doing this process resolves a lot of our issues, and when it's done, we're done!
				But sometimes it's more complicated, and we want to figure out how to move forward with the other
				person.
			</p>

			<div className="collab-accordion">
				{SECTIONS.map(({ id, title, content }) => {
					const isOpen = expanded.has(id);
					return (
						<div key={id} className={`collab-section ${isOpen ? "open" : ""}`}>
							<button className="collab-section-toggle" onClick={() => toggle(id)}>
								<span>{title}</span>
								<span className="collab-section-chevron">{isOpen ? "▲" : "▼"}</span>
							</button>
							{isOpen && <div className="collab-section-content">{content}</div>}
						</div>
					);
				})}
			</div>
		</div>
	);
};

ConversationsAndCollaboration.title = "Conversations and Collaboration";
ConversationsAndCollaboration.helpContent = null;
// ConversationsAndCollaboration.helpContent = (
// 	<>
// 		<p>Help content for conversations and collaboration will go here.</p>
// 	</>
// );

export default ConversationsAndCollaboration;
