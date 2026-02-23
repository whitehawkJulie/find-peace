import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";

const Observation = () => {
	const { jackalTalk, setJackalTalk, observation, setObservation } = useWizard();
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<div className="step-observation">
			<p>
				Ok, so you're ready to explore. Can you identify what this is about? Try to picture a
				specific scene — not the whole relationship or the big pattern, just{" "}
				<strong>one moment</strong>.
			</p>
			<p>
				Let's start by getting things off your chest. Say it how it is, in all your glorious
				jackal-ness:
			</p>

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
			First, give yourself a chance to vent — just let it out, raw and unfiltered. Then see if
			you can name the actual observable event without judgments or interpretations.
		</p>

		<h4>The camera test</h4>
		<p>
			Imagine a video camera was recording the moment. What would it capture? Stick to what you
			could literally see or hear — no mind-reading, no interpretations.
		</p>

		<h4>Common traps to watch for</h4>
		<ul>
			<li>
				<strong>Avoid "always" and "never"</strong> — these are generalisations, not
				observations. Instead of "You never listen," try "When I was telling you about my
				day, you picked up your phone."
			</li>
			<li>
				<strong>Drop labels and diagnoses</strong> — "You were rude" is a judgment. "You
				said 'whatever' and walked out" is an observation.
			</li>
			<li>
				<strong>Watch for "that" as a clue</strong> — "I noticed <em>that</em> you don't
				care" sneaks in an interpretation. What did you actually see or hear?
			</li>
			<li>
				<strong>Be specific about time and place</strong> — "Last Tuesday at dinner" is
				much more grounded than "lately" or "all the time."
			</li>
			<li>
				<strong>Separate observation from evaluation</strong> — "She's lazy" is an
				evaluation. "She didn't take out the bins on Thursday" is an observation.
			</li>
		</ul>

		<h4>Why this matters</h4>
		<p>
			When we mix observation with evaluation, the other person is likely to hear criticism and
			resist. A clean observation creates a shared reality that both people can agree on —
			that's the foundation for everything that follows.
		</p>

		<h4>Examples</h4>
		<ul>
			<li>
				Instead of "You ignored me" → "When I said hello, you didn't respond."
			</li>
			<li>
				Instead of "You're always late" → "The last three times we met, you arrived 20
				minutes after the agreed time."
			</li>
			<li>
				Instead of "You don't care about my work" → "When I told you about my promotion,
				you said 'that's nice' and changed the subject."
			</li>
		</ul>
	</>
);
export default Observation;
