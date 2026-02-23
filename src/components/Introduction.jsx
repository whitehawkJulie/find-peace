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
				If you've come to use this tool, something has probably happened that's stirred you up. You
				might be wanting answers, action, or change — but more often than not, the first thing we
				actually need is <strong>clarity and self-connection</strong>.
			</p>

			<p>
				This tool will walk you gently through a process of uncovering the deep longings underneath
				what you're feeling. And once you've made contact with those needs, you may find your whole
				body relaxing into relief, clarity, or even hope.
			</p>

			<p>
				There are a few steps, but don't worry — each one has guidance, and you can take as long as
				you need. The steps are:
			</p>

			<ol style={{ lineHeight: "1.8", paddingLeft: "1.25rem" }}>
				<li><strong>Settling in</strong> — is your body ready to reflect?</li>
				<li><strong>Observation</strong> — what actually happened?</li>
				<li><strong>Feelings</strong> — what emotions are alive in you?</li>
				<li><strong>Needs</strong> — what are you really longing for?</li>
				<li><strong>Strategies & Requests</strong> — what could help?</li>
			</ol>

			<p style={{ fontStyle: "italic", color: "#555" }}>
				So take a breath. Slow down. Let yourself really feel into these questions. It's worth the
				time.
			</p>

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
		<p>
			This tool is based on the 4-step process of Nonviolent Communication (NVC) — Observation,
			Feelings, Needs, and Request (OFNR).
		</p>
		<p>
			You don't need to know anything about NVC to use it. Each step includes helpful prompts and
			optional guidance. Take your time, and follow your body's sense of resonance — it knows what's
			true.
		</p>
		<p>
			You'll begin by exploring what's going on in <em>you</em> — and later, you'll have the option
			to consider what might be going on for the other person involved. I know — you might not care
			about that right now 🙂 — but it's a powerful process. Trust me.
		</p>
		<p>
			Marshall Rosenberg, creator of NVC, used to say: <br />
			<em>"When we uncover the needs, the solutions find us."</em>
		</p>
	</>
);

export default Introduction;
