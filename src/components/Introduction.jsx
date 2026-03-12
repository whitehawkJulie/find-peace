import React from "react";

const Introduction = () => {
	return (
		<>
			<p>If you're here, something probably happened that didn’t go the way you hoped.</p>

			<p>
				When we feel hurt, angry, or scared, our brain often switches into <strong>threat mode</strong>. In that
				state our thinking narrows, and we quickly form a story about what went wrong and who’s to blame.
			</p>

			<p>
				Being in threat mode reduces our emotional and cognitive flexibility, so the strategies we reach for in
				that moment often don’t lead where we want them to. In threat mode, we tend to focus on fixing the other
				person or controlling the situation. When we reconnect with what actually matters to us — our needs —
				new possibilities open up, new strategies that are much more likely to satisfy us.
			</p>

			<p>
				This tool helps you slow things down, reconnect with what actually matters to you, and look at the
				situation with a wider perspective.
			</p>

			<p>
				Once that happens, it becomes much easier to find responses that move the situation in a better
				direction.
			</p>
		</>
	);
};

Introduction.title = "Welcome";

Introduction.helpContent = (
	<>
		<h2>Why conversations go wrong</h2>
		<p>
			When something upsetting happens, our brain often switches into <strong>threat mode</strong>.
		</p>
		<p>
			In threat mode, our thinking narrows. We quickly form a story about what’s wrong and who’s to blame, and we
			reach for the first strategy that seems like it might stop the pain.
		</p>
		<p>That strategy often looks like:</p>
		<ul>
			<li>arguing</li>
			<li>defending ourselves</li>
			<li>blaming the other person</li>
			<li>trying to control the situation</li>
		</ul>
		<p>
			Unfortunately, these reactions usually make the situation worse. They push the other person into threat mode
			too.
		</p>
		<p>
			The result is a conversation where both people are trying to <strong>fix the other person</strong>, and
			nobody is really being heard.
		</p>
		<h2>What’s happening inside us</h2>
		<p>
			Underneath the blame story, there is usually a <strong>first feeling</strong> — something like fear, anger,
			or hurt.
		</p>
		<p>
			When we are in threat mode, our brain tries to get rid of that feeling as quickly as possible. It does this
			by generating “fix-it thoughts” about what the other person did wrong and what they should do differently.
		</p>
		<p>
			But in threat mode we lose a lot of our <strong>emotional and cognitive flexibility</strong>, so the
			strategies we come up with are often the least effective ones.
		</p>
		<h2>What this tool helps you do</h2>
		<p>React → Get curious → Understand → Connect → Solve</p>
		<p>This tool helps you step out of threat mode and reconnect with what actually matters to you.</p>
		<p>It does that in three stages:</p>
		<ol>
			<li>
				<strong>Clarify what’s happening in you</strong>
				<br />
				Identify the first feeling and the needs underneath it. This helps your brain move out of threat mode
				and into a more curious, problem-solving state.
			</li>

			<li>
				<strong>Widen your perspective</strong>
				<br />
				Consider what might be happening for the other person as well. This helps reduce the sense that they are
				an enemy you need to defend against.
			</li>

			<li>
				<strong>Find strategies that work for both people</strong>
				<br />
				When you’re looking at the level of needs rather than blame, surprisingly creative and workable
				solutions often appear.
			</li>
		</ol>
		<h2>A different starting point for conversation</h2>
		<p>
			Nonviolent Communication helps translate the reactions that arise in threat mode into something more useful.
		</p>
		<p>
			Instead of focusing on <strong>what’s wrong with the other person</strong>, it helps you discover{" "}
			<strong>what you are really wanting</strong>.
		</p>
		<p>Once you know that, your brain becomes much better at finding ways to move toward it.</p>

		<div className="highlight-box">
			<p>
				When we focus on what’s wrong, we get stuck. <br />
				When we focus on what matters, new possibilities appear.
			</p>
		</div>
	</>
);

export default Introduction;
