import React from "react";
import "./Introduction.css";

const introductionFeelingList = [
	"confused, frustrated, annoyed, judged, blamed",
	"not feeling heard or understood",
	"STUCK with no way to move forward",
	"like your self identity is being criticized",
];

const introductionFourSteps = [
	"what actually happened",
	"how it landed in you (your feelings)",
	"what mattered to you (your needs)",
	"what you'd like to do next",
];

const Introduction = () => {
	return (
		<div className="step-introduction step-container">
			<p>{"If you're feeling anything like this:"}</p>
			<ul>
				{introductionFeelingList.map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>
			<p>{"… this process is for you. It will help you find a way forward that works for you, and you'll feel much better in the process."}</p>

			<p>{"This process helps you pause and get clear on four things:"}</p>
			<ol>
				{introductionFourSteps.map((step, i) => (
					<li key={i}>{step}</li>
				))}
			</ol>

			<p>{"When you do that, your brain is able to move out of threat mode, where it's not firing on all cylinders, and into the seeking and care circuits, which are much better at finding creative solutions, often ones that work for everyone involved."}</p>
			<p>{"This makes a huge difference. Things shift."}</p>
		</div>
	);
};

Introduction.title = "Feel Better";
Introduction.titleSweary = "WTF just happened and how do I make it stop?!";
Introduction.navTitle = "Intro";
Introduction.helpContent = (
	<>
		<h2>Why this process can help</h2>

		<p>
			This tool is based on the four steps of <strong>Nonviolent Communication</strong>, developed by Marshall
			Rosenberg, and integrates newer understandings from affective neuroscience and nervous system regulation.
		</p>

		<p>
			Research in affective neuroscience suggests that mammals share three core aversive emotional systems:{" "}
			<strong>fear, anger, and distress</strong>. In Jaak Panksepp's work these correspond to the{" "}
			<strong>FEAR</strong>, <strong>RAGE</strong>, and <strong>PANIC/GRIEF</strong> systems.
		</p>

		<p>
			When one of these systems activates, the brain shifts into a threat-focused mode. In this state, flexibility
			decreases so the brain can focus on immediate protection. The mind quickly generates explanations about
			what's happening — often centred on <strong>who is responsible and how to stop the problem</strong>.
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
			Sometimes the process doesn't seem to work. One common reason is that the{" "}
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
			When we focus only on what's wrong, we tend to repeat the same patterns.
			<br />
			When we focus on what <strong>matters</strong>, new possibilities often appear.
		</p>

		<h2>Your privacy</h2>

		<p>
			Everything you enter into this tool stays on your device. Your responses are stored only in your browser's
			local storage and are <strong>never sent to any server</strong>. When you save or copy a session, your
			feelings and needs word selections are shared anonymously to help improve this tool — no personal
			observations, reflections, or free text is included.
		</p>

		<p>
			You can clear all your saved data at any time, or protect it with a passphrase, from ☰ Menu → ⚙ Settings.
		</p>
	</>
);

export default Introduction;
