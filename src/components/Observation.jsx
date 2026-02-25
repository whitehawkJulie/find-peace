import React from "react";
import { useWizard } from "./WizardContext";
import "./Observation.css";

const Observation = () => {
	const { observation, setObservation } = useWizard();

	const update = (field, value) => setObservation((prev) => ({ ...prev, [field]: value }));

	return (
		<div className="step-observation">
			<p>The whole story may be big and complicated.</p>
			<p>Right now, we're just choosing one moment — like pausing a video on a single frame.</p>

			<label htmlFor="obs-moment">
				Which specific moment are we looking at? Not the whole pattern — just one instance.
			</label>
			<textarea
				id="obs-moment"
				value={observation.moment}
				onChange={(e) => update("moment", e.target.value)}
				rows={3}
			/>

			<label htmlFor="obs-actions">What did you or the other person say or do in that moment?</label>
			<textarea
				id="obs-actions"
				value={observation.actions}
				onChange={(e) => update("actions", e.target.value)}
				rows={3}
			/>

			<label htmlFor="obs-camera" className="observation-camera-label">
				Imagine someone else had been in the room — what would they have seen or heard?
			</label>
			<textarea
				id="obs-camera"
				value={observation.camera}
				onChange={(e) => update("camera", e.target.value)}
				rows={3}
			/>
		</div>
	);
};

Observation.title = "Let\u2019s slow this down";
Observation.helpContent = (
	<>
		<h4>How to Choose a Clear Observation</h4>
		<p>When something hurts or frustrates us, our minds naturally zoom out.</p>
		<p>We think in patterns:</p>
		<ul>
			<li>"You always…"</li>
			<li>"This is what you're like."</li>
			<li>"It's the whole relationship."</li>
		</ul>
		<p>That makes sense. It's how we try to protect ourselves.</p>
		<p>But when everything is bundled together, it becomes hard to work with.</p>
		<p>
			<strong>Clarity grows from specifics.</strong>
		</p>
		<p>
			Instead of the whole arc, we're choosing one concrete moment — something that happened at a particular time.
		</p>
		<p>
			<strong>Why this helps:</strong>
		</p>
		<ul>
			<li>It reduces overwhelm.</li>
			<li>It lowers defensiveness.</li>
			<li>It helps you see what actually happened.</li>
			<li>It makes your next steps clearer.</li>
		</ul>
		<p>
			We're not denying the pattern.
			<br />
			We're starting with one frame of the video.
		</p>
		<h4>What makes an observation clear?</h4>
		<p>A clear observation describes what someone could have seen or heard.</p>
		<p>It avoids:</p>
		<ul>
			<li>
				<strong>Time collapse</strong> – "always / never"
			</li>
			<li>
				<strong>Evaluation</strong> – "disrespectful / selfish"
			</li>
			<li>
				<strong>Motive guesses</strong> – "to control me"
			</li>
			<li>
				<strong>Identity labels</strong> – "toxic / immature"
			</li>
			<li>
				<strong>Historical stacking</strong> – blending many past events into one
			</li>
		</ul>
		<p>
			Those interpretations may or may not be true.
			<br />
			For this step, we're just separating what happened from what it meant.
		</p>
		<p>You can come back to meaning later.</p>
		<h4>Examples</h4>
		<p>Instead of:</p>
		<p>
			<em>"You were disrespectful."</em>
		</p>
		<p>Try:</p>
		<p>
			<em>"When I was speaking, you interrupted me and raised your voice."</em>
		</p>
		<p>Instead of:</p>
		<p>
			<em>"You never listen."</em>
		</p>
		<p>Try:</p>
		<p>
			<em>"Yesterday at dinner, when I said I was tired, you kept talking about your day without responding."</em>
		</p>
		<p>Specific. Concrete. Observable.</p>
		<h4>If you're thinking:</h4>
		<p>
			<em>"But the whole thing matters!"</em>
		</p>
		<p>You're right.</p>
		<p>We're just choosing one doorway into it.</p>
		<p>As a wise person once said, "Even if you choose a twig, it's always connected to the whole trunk anyway"</p>
	</>
);
export default Observation;
