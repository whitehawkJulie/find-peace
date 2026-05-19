import React from "react";

const Stuck = () => {
	return (
		<div className="step-container">
			<h2>If nothing has shifted yet</h2>
			<p>
				Sometimes you get to the end of this process and still feel just as stuck, clear, angry, hurt, guarded,
				or unsure as before.
			</p>
			<p>
				That does not mean you did it wrong. It may just mean something in you is still trying to protect
				something important.
			</p>
			{/* <h3>Checks - WORK IN PROGRESS</h3>
			<ul>
				<li>not ready for perspective-taking - need more self-empathy or reassurance of agency!!</li>
				<li>
					jumping to fixing - “Are you trying to connect, or to fix? - connect, and the solutions find US.
					Attempts to force resolution before connection often backfire. Strategies vs needs.
				</li>
				<li>
					still urgent/protective - are you trying to make the other person understand or see things your way?
					- Are you still stuck on one particular strategy for getting your needs met? Like, the other person
					should do this particular thing?
				</li>
			</ul> */}
			<div className="reflection-card">
				<h3>What kind of stuck is this?</h3>
				<p>
					You do not need to change how you feel. This is just a way to notice what might still need
					attention.
				</p>
			</div>
			<div className="path-card path-a">
				<h3>A. Something still feels urgent</h3>
				<p>
					This might fit if part of you still wants to push, protest, explain, defend, or make sure the other
					person understands.
				</p>
				<ul>
					<li>“No, this really matters.”</li>
					<li>“They need to understand what they did.”</li>
					<li>“I can’t move on while this is still happening.”</li>
					<li>“If I stop pushing, nothing will change.”</li>
				</ul>
				<div className="gentle-prompt">
					<h4>Try asking:</h4>
					<ul>
						<li>What still feels important to protect here?</li>
						<li>What am I afraid will happen if I stop pushing?</li>
						<li>What do I most want recognised?</li>
						<li>Is there a clear request hiding inside this protest?</li>
					</ul>
				</div>
			</div>
			<div className="path-card path-b">
				<h3>B. Something still feels fixed or closed</h3>
				<p>This might fit if you feel calm or clear, but not especially curious, relieved, or more spacious.</p>
				<ul>
					<li>“I know what happened.”</li>
					<li>“The issue is obvious.”</li>
					<li>“This is about respect / fairness / basic decency.”</li>
					<li>“I don’t really see another way to look at it.”</li>
				</ul>
				<div className="gentle-prompt">
					<h4>Try asking:</h4>
					<ul>
						<li>What feels important about holding this view?</li>
						<li>What does this perspective help me stay connected to?</li>
						<li>Is there something I do not want to lose sight of?</li>
						<li>What would I want any wider perspective to still honour?</li>
					</ul>
				</div>
			</div>
			<div className="reflection-card">
				<h3>You do not have to force anything</h3>
				<p>
					Sometimes the next step is not to feel differently. It is simply to notice what still feels
					important, and what kind of support that part of you might need.
				</p>
			</div>
			<div className="button-row">
				<button type="button" className="secondary-button">
					Go back and review my need
				</button>
				<button type="button" className="secondary-button">
					Look for a possible request
				</button>
				<button type="button" className="primary-button">
					Continue
				</button>
			</div>
		</div>
	);
};

Stuck.title = "Where did I get stuck?";
Stuck.navTitle = "Where did I get stuck?";
Stuck.helpContent = null;

export default Stuck;
