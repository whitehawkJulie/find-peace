import React from "react";

// Standalone help topics — not tied to any specific step/page.
// Each entry: { id, title, content (JSX) }

// Link to one from anywhere with: openHelpTopic("topic-id")
// eg
// import { useWizard } from "./WizardContext";
// const { openHelpTopic } = useWizard();
// <button onClick={() => openHelpTopic("Mourning")}>What is mourning?</button>
// ===== or =====
// import HelpLink from "./HelpLink";
// import HelpLink from "../components/HelpLink";
// <HelpLink topic="topic-id">link text</HelpLink> ... just embed that in text anywhere

const StandaloneHelpTopics = [
	{
		id: "mourning",
		title: "Connecting with and mourning unmet needs",
		content: (
			<div>
				<h3>Connecting</h3>
				<p>
					If you can’t remember a time this need was ever met, you’re not doing anything wrong. For some
					needs, this is a very real and painful discovery.
				</p>

				<p>
					To get a sense of connection to this need, it can be powerful to <em>imagine</em> the need being
					met. This isn't about "faking it until you make it" or trying to trick yourself into feeling
					something. It's about using your imagination to explore what this need means to you, and how it
					might show up in your life if it were met.
				</p>

				<ul>
					<li>
						What might it look like if this need <em>were</em> met? What would it actually take to genuinely
						feel like this need has been met?
					</li>
					<li>How might that feel in your body?</li>
					<li>How might you then move, speak, or relate to others?</li>
				</ul>

				<p>If that’s still too hard, can you imagine it for someone else?</p>

				<ul>
					<li>What would it look like for another person to have this need met?</li>
					<li>How do you imagine they might feel?</li>
					<li>How would you recognise it in them?</li>
				</ul>

				<h3>Mourning</h3>

				<p>
					Sometimes, when a need hasn’t been met for a long time — or ever — what arises is{" "}
					<strong>grief</strong>.
				</p>

				<p>Rather than trying to solve it right now, you might pause and gently make space for that.</p>

				<ul>
					<li>Notice any sadness, heaviness, or aching that’s present</li>
					<li>See if you can stay with it, just for a few moments</li>
					<li>Let it be there, without needing to change it</li>
				</ul>

				<p>
					You might also notice that even when a need hasn’t been met, it still lives in you — as a kind of
					longing, a forward-moving energy that hasn’t disappeared.
				</p>

				<p>That longing isn’t a mistake. It’s part of you reaching toward what matters.</p>

				<p>
					You don’t have to resolve this here. Simply recognising it, and allowing some space for it, can be
					enough for now.
				</p>
			</div>
		),
	},

	{
		id: "differences",
		title: "What's different here from 'standard' NVC?",
		content: (
			<>
				<h3>TO DO</h3>
				<p>
					I've taught NVC for 15 years, and I've come to see some aspects that haven't worked so well for me,
					or for the people I've taught. This section will explain some of the differences in this app, and
					the reasoning behind them.
				</p>
				<p>
					Threat, seeking and care motivation circuits - plus how it guides different pathways through the
					process
				</p>
				<p>
					Beauty of the needs as VITAL, and how Marshall said "Get as quickly as you can from need to
					request", and how he saw grief as always being the blocker (care circuit), whereas sometimes it's
					agency (seeking circuit).
				</p>
				<p>Explain about including 'faux feelings'.</p>
			</>
		),
	},

	{
		id: "needs-tanks",
		title: "Needs Tanks",
		content: (
			<>
				<p>TODO</p>
			</>
		),
	},

	{
		id: "black-hole-needs",
		title: "Black Hole Needs",
		content: (
			<>
				<p>TODO</p>
			</>
		),
	},

	{
		id: "thought-feelings",
		title: "Thought Feelings",
		content: (
			<>
				<p>TODO</p>
			</>
		),
	},

	{
		id: "beauty-of-needs",
		title: "The Beauty of the Needs",
		content: (
			<>
				<p>TODO</p>
			</>
		),
	},

	{
		id: "acceptance",
		title: "Acceptance vs Approval",
		content: (
			<>
				<p>
					<strong>B.J. Loridan</strong> said: My spiritual teacher told me, “If you don’t accept something,
					you don’t fully recognize that it exists. If you don’t fully recognize that something exists, then
					you can’t take steps to change it.” So we might say that acceptance is the willingness to fully
					recognize what is. As I see it, acceptance is the precursor to change. ... When we accept, we allow
					what is there to be there, and thus we become aware of what choices are available to us.
				</p>
			</>
		),
	},

	{
		id: "stay-with-it",
		title: "Stay with the feeling",
		content: (
			<>
				<p>
					Most of us have been taught to push feelings away, to put them aside. It's so helpful to learn how
					to actually stay with them, welcome them.
				</p>
				<p>Add all the stuff here about "message delivered", and HOW to be with a feeling</p>
				<ul>
					<li>attention to body sensations</li>
					<li>allowing without changing</li>
					<li>short time frames (“just 10 seconds”)</li>
					<li>naming without analysing</li>
				</ul>
			</>
		),
	},

	{
		id: "what-are-needs",
		title: "What are needs?",
		content: (
			<div>
				<h2>What Is a Need?</h2>

				<p>
					Needs are qualities that all human beings long for — things that help us thrive, like safety,
					respect, understanding, choice, or connection.
				</p>

				<p>
					A need isn’t a demand and it isn’t a specific outcome. It’s simply a word for what matters most to
					us.
				</p>

				<p>Needs are universal. Strategies are personal.</p>

				<p>
					<strong>Need:</strong> Respect
					<br />
					<strong>Strategy:</strong> “I want this particular person to act in this particular way.”
				</p>

				<p>When we focus on the need instead of one strategy, many more possibilities open up.</p>

				<h2>Why Naming Needs Helps</h2>

				<p>
					Feelings are signals that something important is happening. When we identify the need underneath,
					the intensity often softens — even before anything changes externally.
				</p>

				<p>
					If the need isn’t clear, we often reach for strategies that promise relief — arguing, withdrawing,
					blaming, or trying to control the situation.
				</p>

				<p>
					Marshall Rosenberg called these “tragic strategies for unmet needs.” They’re tragic not because
					we’re wrong, but because the strategy aims for relief while missing the real source of the pain.
				</p>

				<h2>Hold Tightly to the Need, Loosely to the Strategy</h2>

				<p>
					The need is what matters. Any specific strategy — a particular person acting in a particular way —
					is just one possible way to meet it.
				</p>

				<p>When we loosen our grip on one strategy, we open the door to many other ways forward.</p>
			</div>
		),
	},

	{
		id: "feedback",
		title: "How did this go for you?",
		content: (
			<div>
				<p>
					I'd genuinely love to hear how this went for you — what helped, what felt off, what you wish was
					different.
				</p>
				<p>This tool is a work in progress, and your experience shapes how it grows.</p>
				<p>
					You can reach me by email at{" "}
					<a href="mailto:julielawrencenvc@gmail.com">julielawrencenvc@gmail.com</a>, or via the contact form
					on my website,{" "}
					<a href="https://makinglifemorewonderful.com.au" target="_blank" rel="noopener noreferrer">
						Making Life More Wonderful
					</a>
					.
				</p>
				<p>Bugs, suggestions, reflections — all welcome. Thank you for using this. 💚</p>
			</div>
		),
	},

	{
		id: "threat-mode",
		title: "Threat, Seeking and Care circuits",
		content: (
			<>
				<p></p>
			</>
		),
	},

	// Add more topics here as needed. Example:
	// {
	// 	id: "empathy",
	// 	title: "Empathy",
	// 	content: (
	// 		<>
	// 			<p></p>
	// 		</>
	// 	),
	// },
];
export default StandaloneHelpTopics;
