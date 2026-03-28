import React from "react";

// Standalone help topics — not tied to any specific step/page.
// Each entry: { id, title, content (JSX) }

// Link to one from anywhere with: openHelpTopic("topic-id")
// eg
// import { useWizard } from "./WizardContext";
// const { openHelpTopic } = useWizard();
// <button onClick={() => openHelpTopic("Mourning")}>What is mourning?</button>
// ===== or =====

// <HelpLink topic="topic">text</HelpLink> ... just embed that in text anywhere
import HelpLink from "../components/HelpLink";

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
				<h2>For example...</h2>
				This is a tiny example, just for show ... note that the process can be used for anything, from the
				smallest conflict to the largest war.
				<h3>It might start like this...</h3>
				<img src="/conflict.png" alt="" style={{ width: "100%", display: "block", marginTop: "1rem" }} />
				<h3>... but it can end up like this</h3>
				<img src="/field-of-needs.jpg" alt="" style={{ width: "100%", display: "block" }} />
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
			<>
				<h3>Connecting with and mourning unmet needs</h3>

				<p>
					Sometimes identifying a need brings up grief — not just about this situation, but about how long
					this need has gone unmet, or how little hope there seems to be.
				</p>

				<p>
					This kind of grief is real, and worth acknowledging. It doesn’t mean nothing can change — but it may
					mean something in you needs care before moving on.
				</p>

				<h3>Needs and strategies</h3>

				<p>
					Our minds often latch onto one specific way for a need to be met — one person, one outcome, one
					path.
				</p>

				<p>When that path feels blocked, it can start to feel like the need itself is impossible.</p>

				<p>But it’s usually the strategy that’s stuck — not the need.</p>

				<p>When we loosen our grip on the “how,” other possibilities often begin to appear.</p>

				<h3>Gently connecting with the need</h3>
				<p>If it feels accessible, you might explore what this need actually means to you.</p>

				<ul>
					<li>What might it look like if this need were met?</li>
					<li>What would it take to genuinely feel it had been met?</li>
					<li>How might that feel in your body?</li>
				</ul>

				<p>If that’s too hard, you might imagine it for someone else:</p>

				<ul>
					<li>What would it look like for another person to have this need met?</li>
					<li>How would you recognise it in them?</li>
				</ul>

				<h3>Making space for what’s here</h3>
				<p>
					Sometimes the most helpful thing is simply to let yourself feel the weight of the unmet need,
					without rushing to fix it.
				</p>

				<p>
					You might notice sadness, heaviness, or an ache. See if you can{" "}
					<HelpLink topic="stay-with-it">stay with it</HelpLink>, even for a few moments, without needing to
					change it.
				</p>

				<p>This can take courage. And often, something begins to shift when it’s given space.</p>

				<h3>Acceptance</h3>
				<p>Part of this process can be acknowledging that, right now, this need isn’t met.</p>

				<p>
					Acceptance doesn’t mean giving up. It means fully recognising what is — which is often what allows
					new possibilities to emerge.
				</p>

				<h3>A different way to relate to the need</h3>
				<p>Even when a need hasn’t been met, it still lives in you — as a kind of longing.</p>

				<p>That longing isn’t a mistake. It’s part of you reaching toward what matters.</p>

				<p>
					You don’t have to resolve this here. Simply recognising it, and allowing some space for it, can be
					enough for now.
				</p>
			</>
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
				<h3>Catching the first feeling</h3>
				<ul>
					<li>Your body gives a fast, initial signal (fear, anger, distress)</li>
					<li>We often move away from it quickly (suppress, reframe, distract)</li>
					<li>If you miss it, you may identify the wrong need</li>
					<li>When you catch it, things often click and move forward</li>
				</ul>

				<h3>Why people get stuck</h3>
				<ul>
					<li>The original feeling gets bypassed</li>
					<li>You work with a secondary or vague feeling instead</li>
					<li>This can lead to misaligned needs and no real relief</li>
				</ul>

				<h3>First vs later feelings</h3>
				<ul>
					<li>First feelings: fast, body-based, instinctive</li>
					<li>Later feelings: shaped by the mind’s story about what happened</li>
					<li>Both matter, but separating them brings clarity</li>
				</ul>

				<h3>Try this</h3>
				<ul>
					<li>Ask: “What did I feel first?”</li>
					<li>Even a rough sense can help you get back on track</li>
				</ul>
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

	// ---- Collaborate step help topics ----

	{
		id: "nervous",
		title: "Nervous about the conversation?",
		content: (
			<>
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
		),
	},

	{
		id: "collab-understand-them",
		title: "Why start with expressing our guesses for them?",
		content: (
			<>
				<h3>Why start with expressing our guesses for them?</h3>
				<p>
					Even if your guesses are completely wrong, the fact that you've made them indicates that you CARE
					about what it happening for them - and that does most of the work.
				</p>
				<p>When someone feels understood, their nervous system often settles.</p>
				<p>That makes it much more likely they'll be able to hear you in return.</p>
				<p>This doesn't mean their perspective is "right" — just that understanding comes before resolution.</p>
				<p>
					If you guesses were wrong, they'll quickly correct you here ... it's really important to stay with
					it and make sure they get that you GET it. It can be helpful to reflect them back: "Oh! you were
					wanting..."
				</p>
				<p>
					This might take a bit of listening. You don't have to agree with them — just focus on understanding
					what it was like for them.
				</p>
			</>
		),
	},

	{
		id: "collab-check-willingness",
		title: "What if they're not ready to listen?",
		content: (
			<>
				<h3>What if they're not ready to listen?</h3>
				<p>If they say no, or seem defensive, it usually means they don't feel fully heard yet.</p>
				<p>You might:</p>
				<ul>
					<li>Come back to listening to them a bit more</li>
					<li>Take a break and return later</li>
				</ul>

				<h3>If they say yes, but they're not really ready</h3>
				<p>Sometimes the other person isn't in a place where they can have this kind of conversation.</p>
				<p>That might look like:</p>
				<ul>
					<li>Interrupting or arguing</li>
					<li>Shutting down</li>
					<li>Dismissing what you're saying</li>
				</ul>
				<p>
					If that happens, it's often more effective to pause and come back later, rather than pushing
					through. You might also want to go through this whole process again, to make sure you're expressing
					needs rather than blame. Very few people are able to hear blame (even if it's only implied) without
					rushing to self-defence.
				</p>
			</>
		),
	},

	{
		id: "collab-share-experience",
		title: "How do I share without it coming out as blame?",
		content: (
			<>
				<h3>How do I share without it coming out as blame?</h3>
				<p>Try to stay with:</p>
				<ul>
					<li>What actually happened (not interpretations)</li>
					<li>How you felt</li>
					<li>What you were needing</li>
				</ul>
				<p>
					If you notice blame or "you always / you never" creeping in, gently come back to talking about your
					own internal experience, rather than your thoughts about them.
				</p>
				<p>
					If it gets too hard, take a break, and go through this online process again from the start, to see
					if you can find more clarity, and more ease in yourself, before trying the conversation again.
				</p>
			</>
		),
	},

	{
		id: "collab-check-understood",
		title: "What if they didn't quite get it?",
		content: (
			<>
				<h3>What if they didn't quite get it?</h3>
				<p>If they didn't quite get it, that's okay — you can try again more simply.</p>
				<p>You might say:</p>
				<ul>
					<li>"Not quite — what I meant was…"</li>
				</ul>
				<p>This step helps reduce misunderstandings before moving forward.</p>
			</>
		),
	},

	{
		id: "collab-way-forward",
		title: "How do we find something that works for both of us?",
		content: (
			<>
				<h3>How do we find something that works for both of us?</h3>
				<p>You're looking for something that works for both of you — not just one person "winning".</p>
				<p>
					This process generally helps you move to a place where you genuinely care about the other person's
					needs as well, and WANT to find mutual solutions. That energy comes across.
				</p>
				<p>It can help to keep it:</p>
				<ul>
					<li>Specific</li>
					<li>Doable</li>
					<li>Open to adjustment</li>
				</ul>
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
