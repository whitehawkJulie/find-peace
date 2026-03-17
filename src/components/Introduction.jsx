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
				This tool helps you pause and get clear on four things: what actually happened, how it landed in you
				(your feelings), what mattered to you (your needs), and what you'd like to do next.
			</p>

			<p>
				When we do that, our brain can move out of threat mode and into the seeking and care circuits — the
				parts that are much better at finding creative solutions, often ones that work for everyone involved.
			</p>
			<p>Would you like to walk through it together?</p>
		</div>
	);
};

Introduction.title = "WTF just happened?!";

Introduction.helpContent = (
	<>
		<h2>Why this process can help</h2>

		<p>
			This tool is based on the four steps of <strong>Nonviolent Communication</strong>, developed by Marshall
			Rosenberg, and integrates newer understandings from affective neuroscience and nervous system regulation.
		</p>

		<p>
			Research in affective neuroscience suggests that mammals share three core aversive emotional systems:{" "}
			<strong>fear, anger, and distress</strong>. In Jaak Panksepp’s work these correspond to the{" "}
			<strong>FEAR</strong>, <strong>RAGE</strong>, and <strong>PANIC/GRIEF</strong> systems.
		</p>

		<p>
			When one of these systems activates, the brain shifts into a threat-focused mode. In this state, flexibility
			decreases so the brain can focus on immediate protection. The mind quickly generates explanations about
			what’s happening — often centred on <strong>who is responsible and how to stop the problem</strong>.
		</p>

		<p>
			Marshall Rosenberg called these explanations <em>tragic strategies</em>: attempts to protect what matters,
			expressed through blame, control, or withdrawal.
		</p>

		<p>
			The NVC process helps the nervous system move out of this narrowed threat state and into two other systems
			that support clearer thinking:
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
			When these systems are active, people are far more able to discover solutions that genuinely address what
			matters.
		</p>

		<h2>Why people sometimes get stuck</h2>

		<p>
			Sometimes the process doesn’t seem to work. One common reason is that the{" "}
			<strong>first emotional signal gets missed</strong>.
		</p>

		<p>
			When the nervous system detects something important, it produces an initial feeling signal — often fear,
			anger, or distress. But many people have learned regulation strategies that move them away from that signal
			very quickly.
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

		<p>If the original signal gets bypassed, we may end up identifying the wrong need underneath the situation.</p>

		<p>
			For example, someone might feel anger when a boundary is crossed. If they quickly move away from that anger
			through cognitive reframing, they may mainly notice a vague discomfort instead. When they look for the need
			underneath that discomfort, they might conclude the need is <em>peace</em>.
		</p>

		<p>
			But the original signal might actually have been pointing toward needs like <strong>agency</strong>,{" "}
			<strong>respect</strong>, or <strong>self-protection</strong>. When the underlying need is misidentified,
			attempts to resolve the situation rarely bring the sense of relief or clarity people expect.
		</p>

		<p>
			When the <strong>real signal</strong> is recognised, however, people often experience a profound shift both
			in how they feel, and their ability to move forward.
		</p>

		<h2>What this tool is designed to do</h2>

		<p>This app helps you slow down enough to reconnect with the deeper signal underneath the surface reactions.</p>

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
			the underlying need often becomes clearer. From that place, it becomes much easier to find strategies that
			actually move the situation forward.
		</p>

		<p>
			<strong>React → Get curious → Understand → Connect → Solve</strong>
		</p>

		<p>
			When we focus only on what’s wrong, we tend to repeat the same patterns.
			<br />
			When we focus on what <strong>matters</strong>, new possibilities often appear.
		</p>
	</>
);

export default Introduction;
