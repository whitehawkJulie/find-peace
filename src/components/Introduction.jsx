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
				<strong>Something here matters.</strong>
			</p>

			<p>You wouldn’t be here if it didn’t.</p>

			<p>
				When something feels important — or threatening — our systems respond. Anger, hurt, confusion, urgency…
				none of that is random.
			</p>

			<p>Your response makes sense in context.</p>

			<p>
				We’re not here to judge it. We’re here to understand it clearly — so we can take good care of what
				matters.
			</p>

			<p>We’ll move one step at a time.</p>

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
