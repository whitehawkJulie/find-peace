import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";

const Observation = () => {
	const { jackalTalk, setJackalTalk, observation, setObservation } = useWizard();
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<div className="step-observation">
			<p>Let’s start by getting things off your chest. Say it how it is, in all your glorious jackal-ness:</p>

			<label htmlFor="jackalTalk">
				<strong>Jackal talk (vent it out):</strong>
			</label>
			<textarea
				id="jackalTalk"
				value={jackalTalk}
				onChange={(e) => setJackalTalk(e.target.value)}
				placeholder="They ALWAYS do this! I’m so over it..."
				rows={5}
			/>

			<p>
				Now, take a breath... and try to describe the <strong>observable facts</strong> — what actually
				happened, like a camera would see it. This is your “clean” observation.{" "}
				<button
					className="subtle-button"
					onClick={() => setShowDrawer(true)}
					title="Click for tips on how to make a clean observation">
					How do I do that?
				</button>
			</p>

			<label htmlFor="observation">
				<strong>Clean observation:</strong>
			</label>
			<textarea
				id="observation"
				value={observation}
				onChange={(e) => setObservation(e.target.value)}
				placeholder="e.g. They walked out while I was speaking"
				rows={4}
			/>

			<SlideDrawer
				isOpen={showDrawer}
				onClose={() => setShowDrawer(false)}
				title="How to make a clean observation">
				<p>
					A clean observation is something you could record on video — it’s what happened, without any
					judgments, interpretations, or assumptions.
				</p>
				<p>
					Instead of “They disrespected me” (a judgment), try “They left the room while I was still talking.”
				</p>
				<p>
					This helps reduce defensiveness, build clarity, and focus on the facts of what’s actually going on.
				</p>
				{/* You can edit/add content here later */}
			</SlideDrawer>
		</div>
	);
};

Observation.title = "Observation";
Observation.helpContent = (
	<>
		<p>
			First, give yourself a chance to "have a whinge" — just let it out. Then see if you can name the actual
			observable event without judgments or interpretations.
		</p>
		<p>Stick to what a camera would see or hear — no judgments or interpretations.</p>
		<p>Examples:</p>
		<ul>
			<li>"You walked away while I was speaking."</li>
			<li>"You said, 'That's a stupid idea.'"</li>
		</ul>
	</>
);
export default Observation;
