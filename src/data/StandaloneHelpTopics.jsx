import AudioPlayer from "../components/AudioPlayer";
import itsok from "../assets/itsok.mp3";

// Standalone help topics — not tied to any specific step/page.
// Each entry: { id, title, content (JSX) }

// Link to one from anywhere with: openHelpTopic("topic-id")
// eg
// import { useWizard } from "./WizardContext";
// const { openHelpTopic } = useWizard();
// <button onClick={() => openHelpTopic("Mourning")}>What is mourning?</button>
// ===== or =====

// <HelpLink topic="topic" aside>text</HelpLink> ... just embed that in text anywhere
import HelpLink from "../components/HelpLink";

const StandaloneHelpTopics = [
	{
		id: "this-process",
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
				<img src="/conflict.jpg" alt="" style={{ width: "100%", display: "block", marginTop: "1rem" }} />
				<h3>... but we can get to this</h3>
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
					browser's local storage and are <strong>never sent to any server</strong>.
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
				<p>This need matters — even if how it might be met isn’t clear yet.</p>
				<p>
					It can feel urgent to "fix this", in this moment of discovering it... and the first step is to slow
					down and get to know it.
				</p>
				<p>If you’d like to engage with this more actively, here are some gentle ways to explore:</p>
				<h3>Staying with it</h3>
				<p>
					You might spend some time with this need. Let yourself feel it, be curious about it, and allow it to
					unfold without needing to solve it right away.
				</p>
				<p>
					You might notice sadness, heaviness, or an ache. See if you can{" "}
					<HelpLink topic="stay-with-it">stay with these feelings</HelpLink>, even for a few moments, without
					needing to change them.
				</p>
				<p>This can take courage. Often, something begins to shift when it’s given space to be truly heard.</p>
				<h3>Exploring the need</h3>
				<ul>
					<li>What might it look like if this need were met?</li>
					<li>What would it take to genuinely feel it had been met?</li>
					<li>How might that feel in your body?</li>
				</ul>
				<p>If that feels hard, you might imagine it for someone else:</p>
				<ul>
					<li>What would it look like for another person to have this need met?</li>
					<li>How would you recognise it in them?</li>
				</ul>
				<h3>When things feel stuck</h3>

				<p>
					Our minds often latch onto one specific way a need should be met — one person, one outcome, one
					path.
				</p>

				<p>Before going further, you might gently check:</p>

				<ul>
					<li>Am I holding onto one particular way this need has to be met?</li>
					<li>Am I believing there is only one path forward?</li>
				</ul>

				<p>When that path feels blocked, it can seem like the need itself is impossible.</p>

				<p>
					But it’s usually the strategy that’s stuck — not the need. When we loosen our grip on the “how,"
					other possibilities can begin to appear.
				</p>

				<h3>A different way to relate to the need</h3>
				<p>Even when a need hasn’t been met, it still lives in you as a kind of longing.</p>
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
	{
		id: "needs-tanks",
		title: "Needs tanks",
		content: (
			<>
				<p>You can imagine your needs as small water tanks.</p>

				<p>
					Each need — for connection, affection, agency, freedom, safety, being seen — has its own tank. Some
					tanks are usually full. When they're full, small disturbances don't affect you much.
				</p>

				<p>Other tanks fluctuate — they fill and drain.</p>

				<p>
					And some tanks may feel chronically low. If a need wasn't reliably met earlier in life, your nervous
					system may have learned to stay alert around it.
				</p>

				<p>
					When a tank is low, your system reacts faster and more intensely. The current situation may not be
					creating the wound — it may simply be touching something that was already tender.
				</p>

				<p>
					Naming the need doesn't immediately fill the tank. But it often steadies the system enough to
					respond with more choice.
				</p>
				<p>
					Filling the tank does <strong>not</strong> have to mean:
				</p>

				<ul>
					<li>This person</li>
					<li>This exact behaviour</li>
					<li>This one solution</li>
				</ul>

				<p>
					Once the need is clear, you can look for multiple ways to support it — including outside this
					relationship. That often reduces pressure and increases freedom. Every need has millions of possible
					ways to meet it (strategies), and we can get very stuck when we insist on one particular way that
					isn't actually available, like insisting on a particular person acting in a particular way that
					they're actually not capable of right now.
				</p>
			</>
		),
	},

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
					<strong>Strategy:</strong> “I want this particular person to act in this particular way."
				</p>

				<p>When we focus on the need instead of one strategy, many more possibilities open up.</p>

				<p>
					If the need isn’t clear, we often reach for strategies that promise relief — arguing, withdrawing,
					blaming, or trying to control the situation.
				</p>

				<p>
					Marshall Rosenberg called these “tragic strategies for unmet needs." They’re tragic not because
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
				<h3>Black Hole Tanks</h3>

				<p>
					Some needs can feel like "black hole" tanks — no matter how much reassurance or effort comes in, it
					doesn't seem to stay. It's like the tanks have holes in them.
				</p>

				<p>This can happen when the nervous system learned early that the need wasn't safe to rely on.</p>

				<p>
					And, sometimes, a need can also look like a black hole because it's standing in for a deeper one.
					For example, you might work very hard to feel accepted — and still feel unsettled — because what
					you're really longing for is a deeper sense of mattering in yourself.
				</p>

				<p>
					In that case, no amount of reassurance from others fully lands. The surface need keeps feeling
					urgent and demanding, and you may feel easily triggered around it — not because you're "too much,"
					but because something deeper is asking to be seen.
				</p>
			</>
		),
	},

	{
		id: "meeting-a-friend",
		title: "Meeting a Need as in Meeting a Friend",
		content: (
			<>
				<p>
					In everyday language, "meeting a need" usually means fulfilling it. Here, we're using "meet" in a
					different way, rather as in "meeting a friend".
				</p>

				<p>
					To meet this need means to turn toward it — to sense how it lives in you, not just as a word, but as
					a longing, a forward-driving energy.
				</p>

				<p>
					Needs aren't just concepts. They are the movement of life in you — the part that wants connection,
					safety, truth, contribution.
				</p>

				<p>
					Before looking for strategies, pause to recognise that living energy. Not to fix it. Not to analyse
					it. Just to acknowledge it.
				</p>
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
						it’s as if the body says, “Message received," and the intensity can begin to settle.
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
							feeling, try saying “something in me is feeling [eg sad]" rather than “I am feeling [eg
							sad]".
						</li>
						<li>
							<strong>Find it in your body:</strong> Notice where in your body you feel this sensation. Is
							it in your chest, stomach, shoulders?
						</li>
						<li>
							<strong>Pause and turn toward it:</strong> Take a breath, gently bring your attention
							inward, and notice the sensation with a curious, friendly attitude.
						</li>
						<li>
							<strong>Say hello:</strong> Gently say, “Hello, I know you’re there". You could place a
							gentle, supportive hand on the place where you feel it.
						</li>
						<li>
							<strong>No wonder:</strong> Can you trust that there's a good reason for this feeling to be
							here? Can you say to it, "No wonder you feel this way! You make sense!"
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
				<h3>When things feel intense</h3>

				<p>When something matters a lot, your system can become more reactive and focused on what’s wrong.</p>

				<p>
					In that state, the mind often moves quickly into stories — especially about who’s responsible and
					how to stop the problem.
				</p>

				<p>
					This can lead to reactions like blaming, pushing, or withdrawing — ways of trying to protect
					something important, even if they don’t quite work.
				</p>

				<p>
					As things begin to settle, it becomes easier to get curious about what really matters and to find a
					way forward.
				</p>
			</>
		),
		more: (
			<>
				<div>
					<h3>What’s happening in your brain</h3>

					<p>
						When something feels threatening or painful, the brain shifts into a more protective mode. This
						narrows attention so it can focus on immediate safety.
					</p>

					<p>
						Jaak Panksepp, an affective neuroscience researcher, described core emotional systems like FEAR,
						RAGE, and PANIC/GRIEF that drive these reactions.
					</p>

					<p>
						In this state, the mind quickly generates explanations about what’s happening — often centred on
						who is responsible and how to stop the problem.
					</p>

					<p>
						Marshall Rosenberg called many of the resulting reactions “tragic strategies” — attempts to
						protect what matters through blame, control, or withdrawal, which often backfire.
					</p>

					<p>
						As the system settles, other capacities come back online — including curiosity about what
						matters (sometimes called the SEEKING system) and the ability to care about ourselves and others
						(the CARE system).
					</p>

					<p>These states make it much easier to find responses that genuinely address what matters.</p>
				</div>
				<div className="brain-mode-diagram">
					{/* ── THREAT ── */}
					<div className="brain-mode-box threat">
						<div className="brain-mode-header">
							<strong>Threat Mode</strong>
							<span>survival / protection</span>
						</div>
						<div className="brain-mode-body">
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Focus</p>
								<ul>
									<li>Blame</li>
									<li>Fault-finding</li>
									<li>Certainty</li>
									<li>Right / wrong</li>
								</ul>
							</div>
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Experience</p>
								<ul>
									<li>Anger / fear / urgency</li>
									<li>Tightness</li>
									<li>Reactivity</li>
								</ul>
							</div>
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Behaviour</p>
								<ul>
									<li>Attack / defend</li>
									<li>Control / withdraw</li>
									<li>Argue / shut down</li>
								</ul>
							</div>
						</div>
					</div>

					{/* ── Connector ── */}
					<div className="brain-mode-connector">
						<div className="brain-mode-connector-line" />
						<span className="brain-mode-connector-note">Pause · naming · clarity</span>
						<span className="brain-mode-connector-prompt">→ “what actually happened?"</span>
						<div className="brain-mode-connector-line" />
						<span className="brain-mode-connector-arrow">↓</span>
					</div>

					{/* ── SEEKING ── */}
					<div className="brain-mode-box seeking">
						<div className="brain-mode-header">
							<strong>Seeking Mode</strong>
							<span>curiosity / problem-solving</span>
						</div>
						<div className="brain-mode-body">
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Focus</p>
								<ul>
									<li>Curiosity</li>
									<li>What matters?</li>
									<li>What’s needed?</li>
								</ul>
							</div>
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Experience</p>
								<ul>
									<li>Interest</li>
									<li>Openness</li>
									<li>Mental flexibility</li>
								</ul>
							</div>
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Behaviour</p>
								<ul>
									<li>Exploring options</li>
									<li>Making sense</li>
									<li>Generating strategies</li>
								</ul>
							</div>
						</div>
					</div>

					{/* ── Connector ── */}
					<div className="brain-mode-connector">
						<div className="brain-mode-connector-line" />
						<span className="brain-mode-connector-note">empathy / connection</span>
						<span className="brain-mode-connector-prompt">→ “what’s happening for me / them?"</span>
						<div className="brain-mode-connector-line" />
						<span className="brain-mode-connector-arrow">↓</span>
					</div>

					{/* ── CARE ── */}
					<div className="brain-mode-box care">
						<div className="brain-mode-header">
							<strong>Care Mode</strong>
							<span>connection / attachment</span>
						</div>
						<div className="brain-mode-body">
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Focus</p>
								<ul>
									<li>Understanding</li>
									<li>Shared humanity</li>
									<li>Connection</li>
								</ul>
							</div>
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Experience</p>
								<ul>
									<li>Warmth</li>
									<li>Softness</li>
									<li>Tenderness</li>
								</ul>
							</div>
							<div className="brain-mode-section">
								<p className="brain-mode-section-label">Behaviour</p>
								<ul>
									<li>Listening</li>
									<li>Empathy</li>
									<li>Collaborative requests</li>
								</ul>
							</div>
						</div>
					</div>

					{/* ── End note ── */}
					<div className="brain-mode-connector">
						<div className="brain-mode-connector-line" />
						<div className="brain-mode-connector-arrow">↓</div>
					</div>
					<p className="brain-mode-end-note">Restored safety → threat settles</p>
				</div>
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
					<li>Ask: “What did I feel first?"</li>
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
					This isn’t about being more “correct." It’s about getting closer to your own experience — the
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
			<div>
				<h4>Noticing what you feel</h4>

				<p>You might notice a lot here — strong reactions, mixed feelings, or something harder to name.</p>

				<p>You can simply notice what’s present, or take a moment to tune in more closely.</p>

				<p>Naming what you feel can help your system settle — like your body saying “message received."</p>

				<p>It’s normal to feel several things at once — even contradictory ones.</p>

				<p>Try looking through the whole list. The unexpected ones often shift the most.</p>
			</div>
		),
		more: (
			<>
				<p>
					Feelings live in your body — they’re part of your body’s signal system, letting you know when
					something important is happening.
				</p>

				<p>
					<a href="https://sarahpeyton.com/" target="_blank" rel="noopener noreferrer">
						Sarah Peyton
					</a>{" "}
					describes how the body keeps signalling until it feels heard. When you notice and name what you’re
					feeling, it’s as if the body says “message received," and the intensity can begin to settle.
				</p>

				<p>
					This effect has also been observed in brain studies: when a feeling is accurately named, activity in
					areas linked to emotional reactivity decreases, and regulation increases. It’s as if the brain
					recognises what’s happening and no longer needs to keep sounding the alarm.
				</p>

				<p>
					So when you can name what you’re actually feeling, something often shifts. That clarity opens the
					door to understanding what you need.
				</p>

				<p>
					It can help to look through the whole list, rather than just for feelings you already know. The
					unexpected ones often create the biggest shift.
				</p>

				<p>
					It’s completely normal to feel several things at once — even contradictory ones. Select any feelings
					that jump out at you.
				</p>

				<p>
					If you’d like support staying with a feeling once you’ve found it, you can explore that
					<HelpLink href="/help/feelings">here</HelpLink>. We'll do more of that in the next step, Exploring
					Feelings.
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

	{
		id: "making-guesses",
		title: "Making Guesses for the Other Person",
		content: (
			<>
				<h3>Making guesses for the other person</h3>

				<p>
					This can be a surprisingly powerful step: trying to see the situation through the other person’s
					eyes.
				</p>

				<p>Not to agree with them or excuse anything — just to understand.</p>

				<p>
					If it feels hard or you’re still angry, that’s completely normal. You can come back to this later if
					you need to.
				</p>

				<p>You might simply wonder:</p>

				<ul>
					<li>What might they have experienced?</li>
					<li>What might they have felt?</li>
					<li>What might they have needed?</li>
				</ul>
			</>
		),
		more: (
			<>
				<h3>Why empathy guesses matter</h3>

				<p>
					Marshall Rosenberg taught that behind every action — no matter how hurtful — is a person trying to
					meet a need.
				</p>

				<p>
					When we begin to guess what that need might be, something often shifts. We start to see them not
					just as the problem, but as another human being trying to cope.
				</p>

				<h3>How to make guesses</h3>

				<ul>
					<li>
						You don’t need to be right. The act of wondering is what matters — even imperfect guesses can
						open something.
					</li>
					<li>
						Start with their observation — what might they have seen or experienced? Their version may be
						very different from yours.
					</li>
					<li>
						Then their feelings — not what they think, but what they might be feeling in their body: angry,
						scared, hurt, overwhelmed.
					</li>
					<li>
						Then their needs — what might they have been longing for? Connection, respect, safety, to
						matter?
					</li>
				</ul>

				<h3>A surprise to watch for</h3>

				<p>
					You might discover that the other person has some of the same unmet needs as you. That can be a
					powerful place to stand — shared humanity, even in conflict.
				</p>

				<h3>If it feels too hard</h3>

				<p>
					If you’re not ready to consider their experience yet, that’s okay. It often means you need more
					empathy for yourself first.
				</p>

				<p>You can come back to this later, or return to your own experience again.</p>
			</>
		),
	},

	{
		id: "tragic-strategies", // not used yet
		title: "Tragic Strategies",
		content: (
			<>
				<p>
					When we're not clear about the need underneath our feelings, we often reach for strategies that we
					hope will relieve the discomfort.
				</p>

				<p>
					We might push harder, withdraw, criticise, demand reassurance, over-explain, shut down,
					people-please, or try to control the situation.
				</p>

				<p>
					Marshall Rosenberg, who developed Nonviolent Communication, called these{" "}
					<strong>"tragic strategies for unmet needs."</strong>
				</p>

				<p>
					They're tragic not because we're bad — but because the strategy is aimed at relief, while missing
					the real source of the pain.
				</p>

				<p>
					Without clarity about the need, we're often shooting in the dark — and sometimes wounding ourselves
					or others in the process.
				</p>

				<p>
					Getting clear about the need changes the quality of our action. Instead of reacting from urgency, we
					respond from understanding.
				</p>
			</>
		),
	},

	{
		id: "requests", // not used yet
		title: "Making Requests",
		content: (
			<>
				<h3>Requests vs. demands</h3>
				<p>
					The key test: if the other person says "no," how do you feel? If you'd be angry or punish them, it
					was a demand. If you can genuinely accept "no" and look for another strategy — that's a request.
				</p>

				<h3>Three types of request</h3>
				<ul>
					<li>
						<strong>Connection request</strong> — asking the other person to reflect back what they heard,
						or how they feel hearing this. E.g. "Would you be willing to tell me what you heard me say?"
						This is often the most important first step.
					</li>
					<li>
						<strong>Action request</strong> — asking for a specific, doable action. E.g. "Would you be
						willing to text me if you're going to be more than 15 minutes late?"
					</li>
					<li>
						<strong>Self-request</strong> — a commitment to yourself. E.g. "I'd like to pause and breathe
						before responding next time I feel triggered."
					</li>
				</ul>

				<h3>A good request is:</h3>
				<ul>
					<li>
						<strong>Specific</strong> — not "be nicer" but "would you greet me when I come home?"
					</li>
					<li>
						<strong>Doable</strong> — something the person can actually say yes or no to
					</li>
					<li>
						<strong>Positive</strong> — what you DO want, not what you don't want
					</li>
					<li>
						<strong>Present-tense</strong> — about now or the near future, not forever
					</li>
				</ul>

				<h3>Common pitfalls</h3>
				<ul>
					<li>
						"I want you to understand me" — too vague. Try: "Would you be willing to tell me what you're
						hearing?"
					</li>
					<li>
						"Stop being so critical" — negative and vague. Try: "When you notice something I could do
						differently, would you be willing to start with what I did well?"
					</li>
					<li>
						"You need to change" — that's a demand about who they are. Focus on a specific, observable
						action.
					</li>
				</ul>
			</>
		),
	},

	{
		id: "finding-strategies", // not used yet
		title: "Finding Strategies",
		content: (
			<>
				<p>
					A <strong>need</strong> is universal and internal — like connection, safety, or meaning.
				</p>
				<p>
					A <strong>strategy</strong> is a specific action you could take to meet that need. The beautiful
					thing is, every need can be met in countless ways!
				</p>
				<p>
					For example, a need for "connection" could be met by calling a friend, joining a class, writing in a
					journal, or even sitting with a pet.
				</p>
				<p>Feeling stuck is often a sign that we've confused a need with one specific strategy.</p>
				<h3>Finding the deeper need</h3>
				<p>
					Sometimes the need you've named is actually a stepping stone to a deeper need. The test: if you feel
					self-righteous about the need, there's probably something underneath. Keep asking "If I had that,
					then what would I have?" until you find the one that brings tears or a deep softening — that's the
					more valuable one to work with.
				</p>
			</>
		),
	},

	{
		id: "about",
		title: "About this app",
		content: (
			<div>
				<p>
					This is a free tool built by Julie Lawrence, long time trainer in Nonviolent Communication, and
					founder of{" "}
					<a href="https://makinglifemorewonderful.com.au" target="_blank" rel="noopener noreferrer">
						Making Life More Wonderful
					</a>
					. You can find out more about me there.
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
		id: "not-ready",
		title: "Not Ready?",
		content: (
			<>
				<p>
					Too distressed for this? That's okay. This is an audio I made for myself when I'm really distressed.
					See if it helps for you.
				</p>
				<AudioPlayer src={itsok} title="It's OK to feel this way" description="Just rest into this." />
			</>
		),
		more: <></>,
	},

	// {
	// 	id: "empathy",
	// 	title: "Empathy",
	// 	content: (<></>),
	// more: (<></>)
	// },

	// {
	// 	id: "empathy",
	// 	title: "Empathy",
	// 	content: (<></>),
	// more: (<></>)
	// },

	// {
	// 	id: "empathy",
	// 	title: "Empathy",
	// 	content: (<></>),
	// more: (<></>)
	// },
];
export default StandaloneHelpTopics;
