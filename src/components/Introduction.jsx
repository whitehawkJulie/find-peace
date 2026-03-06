import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import SavedEntries from "./SavedEntries";

const Introduction = () => {
	const { savedEntries } = useWizard();
	const [showSaved, setShowSaved] = useState(false);

	return (
		<div className="step-intro">
			<p>
				<i>
					This is a tool for working through something that's upset you. It will help you move from stuckness
					and frustration, to having options and choices that you couldn't see before.
				</i>
			</p>

			<p>Something here matters to you. A LOT.</p>

			<p>
				When something feels important — or threatening — our systems respond. Anger, hurt, confusion, urgency…
				none of that is random.
			</p>

			<p>Your response makes sense in context.</p>

			<p>
				If you're feeling stuck, it might be because it seems like the only way this situation gets better is if
				the other person changes. When it looks like that, it's easy to feel powerless.
			</p>

			<p>
				This process is here to help you find where you <em>do</em> have agency — how you express yourself, what
				you ask for, what choices are available to you, and what might help move things forward.
			</p>

			<p>
				As that clarity grows, people are often surprised to discover they have more influence in the situation
				than it first seemed.
			</p>

			<p>Ready? We’ll move one step at a time.</p>

			{savedEntries.length > 0 && (
				<div style={{ marginTop: "1.5rem", textAlign: "center" }}>
					<button className="subtle-button" onClick={() => setShowSaved(true)}>
						View past sessions ({savedEntries.length})
					</button>
				</div>
			)}

			<SlideDrawer isOpen={showSaved} onClose={() => setShowSaved(false)} title="Past Sessions">
				<SavedEntries />
			</SlideDrawer>
		</div>
	);
};

Introduction.title = "Welcome";

Introduction.helpContent = (
	<>
		<h3>About This Process</h3>

		<p>
			This tool is rooted in the 4 steps of Nonviolent Communication (NVC): Observation, Feelings, Needs, and
			Request.
		</p>

		<p>You don’t need to know anything about NVC to use it. I’ll guide you.</p>

		<p>Over time, I’ve expanded the traditional framework to include:</p>

		<ul>
			<li>A wider range of feelings and needs</li>
			<li>Gentle unpacking when things feel tangled or murky</li>
			<li>Support for finding clarity before trying to fix anything</li>
		</ul>

		<p>
			We’ll begin by exploring what’s happening in you. Later — if you’re willing — you’ll have the option to
			consider what might be happening for the other person.
		</p>

		<p>
			You might not care about that part right now 🙂 That’s okay. We’ll get there when (and if) it feels right.
		</p>

		<p>Marshall Rosenberg, the creator of NVC, used to say:</p>

		<blockquote>“When we uncover the needs, the solutions find us.”</blockquote>
	</>
);

export default Introduction;
