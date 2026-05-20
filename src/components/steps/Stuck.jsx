import React from "react";
import ReflectBox from "./ReflectBox";
import "./Stuck.css";


const Stuck = () => {
	return (
		<div className="step-container">
			<h2>If nothing has shifted yet</h2>
			<p>
				Sometimes you get to the end of this process and still feel angry, hurt, guarded, certain, activated, or
				focused on the other person changing.
			</p>
			<p>That does not mean you did it wrong.</p>
			<p>Sometimes it simply means your system is still holding onto something important.</p>
			<p>
				You do not need to force yourself to soften, forgive, or move on. This page is simply here to help you
				notice what may still need attention.
			</p>

			<section className="stuck-card">
				<h3>A. Part of me still wants movement or acknowledgement</h3>
				<p className="stuck-card-fit">
					This may fit if part of you still wants recognition, responsiveness, accountability, understanding,
					change, repair, or protection.
				</p>
				<p>You might notice thoughts like:</p>
				<ul>
					<li>"No, this really matters."</li>
					<li>"They need to understand what they did."</li>
					<li>"I can't move on while this is still happening."</li>
					<li>"If I stop pushing, nothing will change."</li>
				</ul>
				<p>Try asking:</p>
				<ul>
					<li>What still feels important to protect here?</li>
					<li>What am I afraid will happen if I stop pushing?</li>
					<li>What do I most want recognised?</li>
					<li>Is there a clear request hiding inside this protest?</li>
				</ul>
				<ReflectBox
					fieldId="stuck-still-important"
					label="What still feels important to protect?"
					placeholder="What still feels important here is..."
				/>
			</section>

			<section className="stuck-card">
				<h3>B. Part of me feels very certain about what happened</h3>
				<p className="stuck-card-fit">
					This may fit if you feel clear about the issue, but not especially curious, relieved, open, or more
					spacious.
				</p>
				<p>You might notice thoughts like:</p>
				<ul>
					<li>"I know what happened."</li>
					<li>"The issue is obvious."</li>
					<li>"This is about respect / fairness / basic decency."</li>
					<li>"I don't really see another way to look at it."</li>
				</ul>
				<p>Try asking:</p>
				<ul>
					<li>What feels important about holding this view?</li>
					<li>What does this perspective help me stay connected to?</li>
					<li>Is there something I do not want to lose sight of?</li>
					<li>What would I want any wider perspective to still honour?</li>
				</ul>
				<ReflectBox
					fieldId="stuck-perspective-connected"
					label="What does this perspective help me stay connected to?"
					placeholder="This view helps me remember..."
				/>
			</section>

			<section className="stuck-card">
				<h3>C. Part of me feels exhausted, hopeless, or done</h3>
				<p className="stuck-card-fit">
					This may fit if you feel flat, tired, numb, resigned, disconnected, or like nothing would help
					anyway.
				</p>
				<p>You might notice thoughts like:</p>
				<ul>
					<li>"What's the point?"</li>
					<li>"This is just how people are."</li>
					<li>"Nothing ever changes."</li>
					<li>"I don't have the energy for this."</li>
					<li>"I'm tired of needing things."</li>
				</ul>
				<p>Sometimes this is not clarity. Sometimes it is protection through shutdown or hopelessness.</p>
				<p>Try asking:</p>
				<ul>
					<li>What feels too painful, risky, or exhausting to keep hoping for?</li>
					<li>What need may have been disappointed for a long time?</li>
					<li>What would support or gentleness look like right now?</li>
					<li>Do I need solutions right now, or simply care?</li>
				</ul>
				<ReflectBox
					fieldId="stuck-care-before-action"
					label="What might need care before action is possible?"
					placeholder="What feels too painful, risky, or exhausting is..."
				/>
			</section>

			<div className="stuck-closing">
				<p>
					<strong>You do not have to force anything.</strong>
				</p>
				<p>
					Sometimes the next step is not to feel differently. It is simply to notice what still feels
					important, and what kind of support that part of you might need.
				</p>
				<p>If something in you is still saying "not yet," you can listen to that without making it wrong.</p>
			</div>
		</div>
	);
};

Stuck.title = "When something still feels unresolved";
Stuck.navTitle = "Still unresolved";
Stuck.helpContent = null;

export default Stuck;
