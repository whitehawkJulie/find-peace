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
