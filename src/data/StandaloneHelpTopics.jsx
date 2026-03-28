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
// <HelpLink topic="topic">text</HelpLink> ... just embed that in text anywhere

const StandaloneHelpTopics = [
	{
		id: "about",
		title: "About this process",
		content: (
			<>
				<h2>What this process is designed to do</h2>

				<p>
					This process builds on the four steps of <strong>Nonviolent Communication</strong>, developed by
					Marshall Rosenberg, and integrates newer understandings from affective neuroscience and nervous
					system regulation.
				</p>
				<p>
					This app helps you slow down enough to reconnect with the deeper signal underneath the surface
					reactions.
				</p>

				<p>By separating:</p>

				<ul>
					<li>
						<strong>what happened</strong>
					</li>
					<li>
						<strong>what you felt</strong>
					</li>
					<li>
						<strong>what mattered to you</strong>
					</li>
				</ul>

				<p>
					the underlying need often becomes clearer. From that place, it becomes much easier to find
					strategies that actually move the situation forward.
				</p>

				<p>
					<strong>React → Get curious → Understand → Connect → Solve</strong>
				</p>

				<p>
					When we focus only on what's wrong, we tend to repeat the same patterns.
					<br />
					When we focus on what <strong>matters</strong>, new possibilities often appear.
				</p>
			</>
		),
	},

	{
		id: "privacy",
		title: "Your privacy",
		content: (
			<>
				<h2>Your privacy</h2>

				<p>
					Everything you enter into this tool stays on your device. Your responses are stored only in your
					browser's local storage and are <strong>never sent to any server</strong>. When you save or copy a
					session, your feelings and needs word selections are shared anonymously to help improve this tool —
					no personal observations, reflections, or free text is included.
				</p>

				<p>
					You can clear all your saved data at any time, or protect it with a passphrase, from ☰ Menu → ⚙
					Settings.
				</p>
			</>
		),
	},

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
	{ id: "needs-tanks", title: "Needs tanks", content: "" },

	{
		id: "needs",
		title: "Shared Fundamental Human Needs",
		content: (
			<>
				<h3>What Is a Need?</h3>

				<p>
					Needs are what every human being longs for — things that help us thrive, like safety, respect,
					understanding, choice, or connection. They’re our common ground, something we all share.
				</p>

				<p>
					Needs are not about any specific person or situation. They’re more like qualities of life we’re
					wanting to experience — like feeling heard, having space to choose, or knowing we matter.
				</p>

				<p>
					When something is painful or upsetting, it’s often because one or more of these deeper needs isn’t
					being met. And when we can connect with the need underneath what’s happening, something begins to
					shift — we move out of blame and into understanding what really matters to us.
				</p>
				<p>
					This is different from the solutions or actions we think will meet those needs — we’ll come to that
					next.
				</p>

				<h3>Needs vs Strategies</h3>
				<p>
					A need isn’t a demand and it isn’t a specific outcome. It’s simply a word for what matters most to
					us. A strategy is something we DO to meet a need.
				</p>

				<p>Needs are universal. Strategies are personal.</p>

				<p>
					<strong>Need:</strong> Respect
					<br />
					<strong>Strategy:</strong> “I want this particular person to act in this particular way.”
				</p>

				<p>When we focus on the need instead of one strategy, many more possibilities open up.</p>

				<p>
					If the need isn’t clear, we often reach for strategies that promise relief — arguing, withdrawing,
					blaming, or trying to control the situation.
				</p>

				<p>
					Marshall Rosenberg called these “tragic strategies for unmet needs.” They’re tragic not because
					we’re wrong, but because the strategy aims for relief while missing the real source of the pain.
				</p>

				<h3>Hold Tightly to the Need, Loosely to the Strategy</h3>

				<p>
					The need is what matters. Any specific strategy — a particular person acting in a particular way —
					is just one possible way to meet it.
				</p>

				<p>When we loosen our grip on one strategy, we open the door to many other ways forward.</p>
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
				<div>
					<p>
						Most of us have been taught to push feelings away, distract from them, or try to fix them
						quickly. It can be surprisingly helpful to do the opposite — to stay with a feeling, and gently
						welcome it.
					</p>

					<p>
						Your body is constantly signalling what’s happening inside you. When those signals are ignored,
						the body keeps trying to get your attention. But when you notice and acknowledge what’s there,
						it’s as if the body says, “Message received,” and the intensity can begin to settle.
					</p>

					<p>
						<strong>How to stay with a feeling</strong>
					</p>
					<p>
						A technique called{" "}
						<a href="https://focusingresources.com/more-information-about-focusing" target="_blank">
							Inner Relationship Focusing
						</a>{" "}
						taught me how to be with a feeling, in a way that feels pretty great.
					</p>
					<ul>
						<li>
							<strong>Locate the "something":</strong> When you notice a tight, anxious, or uncomfortable
							feeling, try saying “something in me is [feeling]” rather than “I am [feeling]”.
						</li>
						<li>
							<strong>Pause and turn toward it:</strong> Take a breath, gently bring your attention
							inward, and notice the sensation with a curious, friendly attitude.
						</li>
						<li>
							<strong>Say hello:</strong> Gently say, “Hello, I know you’re there”. You could place a
							gentle, supportive hand on the place where you feel it.
						</li>
						<li>
							Can you trust that there's a good reason for this feeling to be here? Can you say to it, "No
							wonder you feel this way! You make sense!"
						</li>
						<li>
							<strong>Wait and listen:</strong> After saying hello, give it a moment. Let it show you
							more, while you stay present as a kind, non-judging listener.
						</li>
					</ul>
					<p>
						Notice that <em>it’s not about fixing</em>. The goal is not to make the feeling go away, but to
						get to know it.
					</p>
					<p>
						You don’t need to do this perfectly. Even a brief moment of noticing can help your system settle
						and make space for something new to emerge.
					</p>
				</div>
			</>
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
				<h2>Threat, Seeking and Care circuits</h2>

				<p>
					We mammals seem to all share three core aversive emotional systems:{" "}
					<strong>fear, anger, and distress</strong>. Jaak Panksepp, an affective neuroscience researcher,
					calls these the <strong>FEAR</strong>, <strong>RAGE</strong>, and <strong>PANIC/GRIEF</strong>{" "}
					systems.
				</p>

				<p>
					When one of these systems activates, the brain shifts into a threat-focused mode. In this state,
					flexibility decreases so the brain can focus on immediate protection. The mind quickly generates
					explanations about what's happening — often centred on{" "}
					<strong>who is responsible and how to stop the problem</strong>.
				</p>

				<p>
					These "explanations" or stories often lead to what Marshall Rosenberg (creator of NVC) called{" "}
					<em>tragic strategies</em>: attempts to protect what matters, expressed through blame, control, or
					withdrawal, which are almost guaranteed to backfire.
				</p>

				<p>
					The NVC process helps the nervous system move out of this narrowed threat state and into two other
					systems that support clearer thinking:
				</p>

				<ul>
					<li>
						the <strong>SEEKING system</strong>, which brings curiosity about what matters to us
					</li>
					<li>
						the <strong>CARE system</strong>, which allows empathy for ourselves and others
					</li>
				</ul>

				<p>
					When these systems are active, people are far more able to discover solutions that genuinely address
					what matters.
				</p>
			</>
		),
	},

	{
		id: "first-feeling",
		title: "Catching the FIRST feeling",
		content: (
			<>
				<h2>Why people sometimes get stuck</h2>

				<p>
					Sometimes the process doesn't seem to work. One common reason is that the{" "}
					<strong>first emotional signal gets missed</strong>.
				</p>

				<p>
					When the nervous system detects something important, it produces an initial feeling signal — often
					fear, anger, or distress. But many people have learned regulation strategies that move them away
					from that signal very quickly.
				</p>

				<p>Broadly speaking, humans tend to regulate emotions in three ways:</p>

				<ul>
					<li>
						<strong>Expressing the feeling and moving toward it</strong>
					</li>
					<li>
						<strong>Suppressing the feeling and moving away from it</strong>
					</li>
					<li>
						<strong>Reframing the feeling cognitively</strong>
					</li>
				</ul>

				<p>
					If the original signal gets bypassed, we may end up identifying the wrong need underneath the
					situation.
				</p>

				<p>
					For example, someone might feel anger when a boundary is crossed. If they quickly move away from
					that anger through cognitive reframing, they may mainly notice a vague discomfort instead. When they
					look for the need underneath that discomfort, they might conclude the need is <em>peace</em>.
				</p>

				<p>
					But the original signal might actually have been pointing toward needs like <strong>agency</strong>,{" "}
					<strong>respect</strong>, or <strong>self-protection</strong>. When the underlying need is
					misidentified, attempts to resolve the situation rarely bring the sense of relief or clarity people
					expect.
				</p>

				<p>
					When the <strong>real signal</strong> is recognised, however, people often experience a profound
					shift both in how they feel, and their ability to move forward.
				</p>
			</>
		),
	},
	{
		id: "story-words",
		title: "Story Words",
		content: (
			<>
				<p>
					Many of the words we use as "feelings" actually contain a story about what someone else did. We call
					these <strong>Story Words</strong>. This isn't wrong — it's just how we're taught to speak. Story
					Words often show up more strongly when we’re activated or hurt, because our system is trying to make
					sense of what happened. (Traditional NVC called these "Faux Feelings".)
				</p>
				<p>For example:</p>
				<ul>
					<li>
						<strong>"I feel ignored"</strong> — carries a story that someone ignored you.
					</li>
					<li>
						<strong>"I feel rejected"</strong> — carries a story that someone rejected you.
					</li>
					<li>
						<strong>"I feel attacked"</strong> — carries a story that someone attacked you.
					</li>
				</ul>
				<p>
					Underneath these words are usually clearer body-feelings — lonely, hurt, scared, angry, sad,
					unsettled.
				</p>
				<p>
					When we speak in story words, we often stay focused on what the other person did. When we name the
					underlying feeling, we move closer to ourselves. Clear feelings point more directly to clear needs.
				</p>
				<p>
					If you choose a Story Word, you’ll be gently guided to look underneath it. We’ll help you translate
					from the story about what happened to the clearer feelings living in your body.
				</p>
				<p>
					This isn’t about being more “correct.” It’s about getting closer to your own experience — the
					sensations, emotions, and needs that are present when the story falls away.
				</p>
				<p>
					When the story softens, what remains is usually something more vulnerable, more precise, and more
					useful for understanding what you need.
				</p>
			</>
		),
	},

	{
		id: "feelings",
		title: "Feelings",
		content: (
			<>
				<p>
					Feelings live in your body - they are part of your body's signal system. They let you know whether
					something important is happening — often connected to your needs being met or unmet.
				</p>
				<p>
					<a href="https://sarahpeyton.com/" target="_blank" rel="noopener noreferrer">
						Sarah Peyton
					</a>{" "}
					says that our body’s job is to signal what’s happening inside us. When we ignore those signals, the
					body can’t fully relax — it’s still trying to deliver the message. But when we notice and
					acknowledge what it’s telling us, it’s as if the body says, “Message delivered!,” and it can finally
					relax.
				</p>
				<p>
					This shift has even been observed in brain imaging studies. When people are exposed to emotionally
					evocative stimuli, activity increases across regions involved in threat and emotional reactivity.
					But when they are asked to identify and name the feeling — especially finding a word that fits
					closely — that activity decreases, and areas involved in regulation become more active. In other
					words, accurately naming what we feel appears to help the brain settle. It’s as if the brain
					recognises, “Ah — that’s what this is,” and no longer needs to keep sounding the alarm.
				</p>
				<p>
					So, when you can name what you're actually feeling, intensity often shifts. Clarity opens the
					doorway to understanding what you need.
				</p>
				<p>
					It's really useful to look through the entire feelings list, checking for every feeling inside
					yourself, rather than just scanning the list looking for words for feelings you already know. The
					surprising ones hold a LOT of power to shift your experience.
				</p>
				<p>
					It's completely normal to feel lots of different things at once, some of them contradictory! Select
					any feelings in the list that jump out at you.
				</p>
			</>
		),
	},

	{
		id: "observation",
		title: "How to Make a Clear Observation",
		content: (
			<>
				<p>
					An observation is a description of a specific moment — something that could have been seen or heard
					by someone in the room. It avoids interpretation, judgment, motive-guessing, and time collapse.
				</p>
				<p>It's actually quite a skill to learn to make a clear observation.</p>
				<p>
					It helps us start to move out of threat mode and into curiosity, which brings our brains back
					online.
				</p>

				<p>
					👁️<strong>What actually happened?</strong>
				</p>
				<ul>
					<li>Without labels like "rude," "selfish," or "asshole," what did they actually say or do?</li>
				</ul>

				<p>
					⏳<strong>One specific moment</strong>
				</p>
				<ul>
					<li>Choose a single moment — not the whole history. It's just easier to work with.</li>
					<li>
						Words like "always," "never," or "every time" often signal that multiple events are bundled
						together.
					</li>
					<li>
						Try narrowing to one moment: "On Tuesday evening when…" instead of "Every time we talk about
						this…"
					</li>
				</ul>

				<p>
					🖼️<strong>Could someone picture this happening?</strong>
				</p>
				<ul>
					<li>If someone else watched it, would they see what you’ve described?</li>
				</ul>

				<p>
					🔎<strong>Just what happened — not what it meant</strong>
				</p>
				<ul>
					<li>
						Can you describe what was actually said or done, rather than interpretations like
						"disrespectful," "uncaring," "manipulative"?
					</li>
					<li>
						Try stripping out words that carry a judgment or meaning, and rewriting in terms of actions,
						words, and what was physically present.
					</li>
					<li>Instead of "she was dismissive", try "she looked at her phone while I was speaking."</li>
					<li>
						If it helps, imagine what someone else in the room might have noticed happening. What might they
						say they saw or heard?
					</li>
				</ul>

				<p>
					🧠<strong>Leave the "why" aside just for now</strong>
				</p>
				<ul>
					<li>
						Can you remove any assumptions about motive? (e.g., "to control me," "to hurt me," "because he
						doesn't care")
					</li>
					<li>Our minds fill in meaning very quickly — that's normal.</li>
					<li>
						Try leaving out the "because" for now. Just describe what happened. The question of why can come
						later.
					</li>
				</ul>
			</>
		),
	},

	{
		id: "focusing",
		title: "Inner Relationship Focusing",
		content: (
			<>
				<p>https://focusingresources.com/more-information-about-focusing</p>
			</>
		),
	},

	// {
	// 	id: "empathy",
	// 	title: "Empathy",
	// 	content: (
	// 		<>
	// 			<p></p>
	// 		</>
	// 	),
	// },

	// {
	// 	id: "empathy",
	// 	title: "Empathy",
	// 	content: (
	// 		<>
	// 			<p></p>
	// 		</>
	// 	),
	// },

	// {
	// 	id: "empathy",
	// 	title: "Empathy",
	// 	content: (
	// 		<>
	// 			<p></p>
	// 		</>
	// 	),
	// },

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
