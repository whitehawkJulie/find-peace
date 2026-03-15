import React from "react";
import "./Introduction.css";

const Introduction = () => {
	return (
		<div className="step-introduction">
			<p>
				Life sure throws some curve balls, doesn’t it? We do our best, but things don’t always go the way we
				expected.
			</p>

			<p>
				When something painful happens, we might feel hurt, angry, or scared. Our brain flips into threat mode
				and quickly creates a story about what happened, who’s to blame, and how to stop it — a story we can
				feel very certain is the truth.
			</p>

			<p>
				But in threat mode, our ability to think clearly shrinks. We reach for quick reactions like arguing,
				blaming, defending, controlling, or shutting down. Those reactions usually don’t solve the problem —
				because we haven’t yet slowed down enough to understand what’s really going on.
			</p>

			<p>
				This tool helps you pause and get clear on three things: what actually happened, how it landed in you
				(your feelings), and what mattered to you (your needs).
			</p>

			<p>
				When we do that, our brain can move out of threat mode and into the seeking and care circuits — the
				parts that are much better at finding creative solutions, often ones that work for everyone involved.
			</p>
			<p>Ready to try it out?</p>
		</div>
	);
};

Introduction.title = "WTF just happened?!";

Introduction.helpContent = (
	<>
		<h2>Why conversations go wrong</h2>

		<div>
			<p>
				<em>
					This tool is based on the four steps of Nonviolent Communication, a process developed by Marshall
					Rosenberg, adapted with more recent understanding of nervous system regulation and polyvagal theory.
				</em>
			</p>
			<p>
				I’ve come to understand conflict as something that begins when one of the three core aversive emotions
				common to all mammals is triggered: fear, anger, or distress. In Jaak Panksepp’s affective neuroscience
				research these correspond to the FEAR, RAGE, and PANIC/GRIEF systems.
			</p>
			<p>
				When one of these systems activates, it switches on what we might call the brain’s{" "}
				<strong>threat circuit</strong>. In this state, the brain reduces cognitive and emotional flexibility so
				it can focus on survival. Because speed matters more than accuracy here, the mind tends to create quick
				explanations for what’s happening. These explanations almost always involve figuring out who is to blame
				and how to stop them. In other words, the brain quickly generates what Marshall Rosenberg would call a{" "}
				<em>tragic strategy</em>.
			</p>
			<p>
				Nonviolent Communication is essentially a process for helping people move out of this threat state and
				into two other brain systems that support much more flexible thinking: the{" "}
				<strong>SEEKING circuit</strong> (curiosity about what I want or need) and the{" "}
				<strong>CARE circuit</strong> (care for myself and for others).
			</p>
			<p>
				Sometimes people get stuck along the way. One common reason is that they miss the{" "}
				<strong>first feeling</strong> that activated the threat response. Instead, they focus only on the{" "}
				<em>secondary</em>, defensive feelings that appear afterward. When that happens, they often identify the
				wrong need underneath the situation, and nothing really lands — they never experience the “shift” that
				NVC practitioners often talk about.
			</p>
			<p>
				How someone responds to that first feeling often depends on their preferred{" "}
				<strong>regulation strategy</strong>. Broadly speaking, there are three ways humans tend to regulate
				emotions:
			</p>
			<ul>
				<li>expressing the feeling and moving toward it</li>
				<li>suppressing the feeling and moving away from it</li>
				<li>reframing the feeling cognitively</li>
			</ul>
			<p>
				For example, I might initially feel anger when something crosses a boundary. But instead of staying
				connected to that anger, my nervous system tries to feel safer by reframing the situation cognitively. I
				disconnect from the anger and mainly notice a vague discomfort instead. Then I may rationalise that
				discomfort away through numbness or resignation.
			</p>
			<p>
				If I then look for the need underneath that state, I might conclude that what I need is <em>peace</em>.
				But that may not actually be the original need at all. The anger might have been signalling something
				closer to <strong>agency</strong> or self-respect — needs associated with the anger/agency triad.
			</p>
			<p>
				If I keep trying to meet the need for peace, it never fully resolves the situation, because it wasn’t
				the real signal in the first place. When the original need is recognised, however, the system can often
				settle much more deeply.
			</p>
			<p>
				This app offers tools to help you look beneath the surface reactions and reconnect with the deeper need
				that may have been missed. When that underlying need becomes clearer, it’s much easier to find
				strategies that genuinely move the situation forward rather than repeating the same old patterns.
			</p>
			<p>React → Get curious → Understand → Connect → Solve</p>
		</div>

		<div className="highlight-box">
			<p>
				When we focus on what’s wrong, we get stuck. <br />
				When we focus on what matters, new possibilities appear.
			</p>
		</div>
	</>
);

export default Introduction;
