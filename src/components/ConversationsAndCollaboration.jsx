import React from "react";
import "./RequestFormulation.css";

const ConversationsAndCollaboration = () => {
	return (
		// <div className="request-formulation">
		<div>
			<h2>## WORK IN PROGRESS ##</h2>
			<p>So where to now? We've done the work - what's next?</p>
			<p>
				Many of us find that the process itself resolves a lot of our issues, and when it's done, we're done!
				But sometimes, it's more complicated, and we have to figure out how to move forward with the other
				person. So let's talk about how.
			</p>
			<h2>Requests</h2>
			<p>
				If this is a fairly simple situation, there could be a request you'd like to make of the other person.
				This is basically where we're asking another person if they're willing to meet one or more of our needs.
				It helps to stay aware that no-one HAS to meet our needs and that we're asking for a willingness to meet
				them, not demanding that they do. We don't actually want people to serve us unwillingly, it never ends
				well!
			</p>

			<ul>
				<li>Being as specific as possible- PLATO</li>
				<li>Willingness to hear no (not a demand), and hearing the yes to their own needs</li>
			</ul>

			<h2>Whether to have the conversation</h2>
			<p>
				Sometimes it's hard to know whether to best to leave well enough alone, or to actually have a
				conversation with the other person. Here's how I approach that:
				<ul>
					<li>
						If I have ongoing contact with this person, AND this is a need that they are capable of meeting,
						AND it affects our relationship, then I lean towards having the conversation.
					</li>
					<li>
						If the situation is likely to come up again, I lean towards having the conversation, because I
						want to figure out how to navigate it better in the future.
					</li>
					<li>
						If the situation is really bad and unlikely to be resolved without a conversation, I lean
						towards having the conversation.
					</li>
					<li>If this person isn't capable of meeting this need, I find ways to meet it elsewhere.</li>
				</ul>
			</p>
			<h2>How to have the conversation</h2>
			<p>
				If I want things to change, I'll have a conversation with the other person to get on the same page, and
				then co-create a solution together.
			</p>
			<p>Have to do OFNR for self FIRST, then OFN for other, before any conversation.</p>

			<ul>
				<li>Get permission to have the conversation (make a clear request around it)</li>
				<li>
					In the conversation, express your guesses for them first, so they know you care (lowers their threat
					circuit)
				</li>
				<li>
					Wait for their willingness to hear you back (and don't push the point if they don't — they're not
					ready and won't hear anyway).
				</li>
				<li>
					Make connection requests to ensure you're both being heard
					<ul>
						<li>Have I heard you correctly? Is this what you're saying?</li>
						<li>Can you tell me what you think I'm saying — what you're actually hearing?</li>
					</ul>
				</li>
				<li>Co-create a solution only after both of you have been heard (all needs on the table)</li>
			</ul>
		</div>
	);
};

ConversationsAndCollaboration.title = "Conversations and Collaboration";
ConversationsAndCollaboration.helpContent = (
	<>
		<p>Help content for conversations and collaboration will go here.</p>
	</>
);

export default ConversationsAndCollaboration;
