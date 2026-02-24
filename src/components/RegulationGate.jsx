import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import SavedEntries from "./SavedEntries";
import "./RegulationGate.css";

// Sub-step constants
const ENTRY = 0;
const BODY_CHECK = 1;
const ACTIVATION_TYPE = 2;
const REGULATION = 3;
const ORIENTATION = 4;
const READINESS = 5;

const RegulationGate = () => {
	const { stepIndex, setStepIndex, savedEntries } = useWizard();
	const [subStep, setSubStep] = useState(ENTRY);
	const [showSaved, setShowSaved] = useState(false);
	const [bodyText, setBodyText] = useState("");
	const [knowsWhat, setKnowsWhat] = useState(null); // true = skip regulation, false = full flow
	const [activationType, setActivationType] = useState(null); // "agitated" | "numb" | "foggy"
	const [showNotYet, setShowNotYet] = useState(false); // for regulation "not yet" follow-up
	const [orientation, setOrientation] = useState(null);
	const [readinessNotYet, setReadinessNotYet] = useState(false);

	const advanceWizard = () => setStepIndex(stepIndex + 1);

	// ─── Step 0: Entry ───
	if (subStep === ENTRY) {
		return (
			<div className="regulation-gate">
				<p className="regulation-lead">
					Something has brought you here. Before we dive in, let's just take a moment.
				</p>

				<p className="regulation-question">Do you know what this feeling is about?</p>

				<div className="regulation-choices">
					<button
						className="regulation-choice"
						onClick={() => {
							setKnowsWhat(true);
							setSubStep(BODY_CHECK);
						}}>
						Yes, something specific happened
					</button>
					<button
						className="regulation-choice regulation-choice-soft"
						onClick={() => {
							setKnowsWhat(false);
							setSubStep(BODY_CHECK);
						}}>
						Not really — I just feel unsettled or activated
					</button>
				</div>

				{savedEntries.length > 0 && (
					<div style={{ marginTop: "1.5rem", textAlign: "center" }}>
						<button className="subtle-button" onClick={() => setShowSaved(true)}>
							View past sessions ({savedEntries.length})
						</button>
					</div>
				)}

				<SlideDrawer
					isOpen={showSaved}
					onClose={() => setShowSaved(false)}
					title="Past Sessions">
					<SavedEntries />
				</SlideDrawer>
			</div>
		);
	}

	// ─── Step 1: Body Check-In ───
	if (subStep === BODY_CHECK) {
		return (
			<div className="regulation-gate">
				<p className="regulation-lead">
					Before we go any further, take a quiet moment to check in with your body.
				</p>

				<div className="regulation-invitations body-check-invitations">
					<p>Close your eyes if you're comfortable.</p>
					<p>
						Notice any tension, flutter, heaviness, tightness, lightness — you don't
						need to go looking for anything. Just notice what's already there.
					</p>
				</div>

				<p className="regulation-question">Where do you notice it most?</p>

				<textarea
					className="regulation-textarea"
					value={bodyText}
					onChange={(e) => setBodyText(e.target.value)}
					placeholder="Maybe your chest, stomach, throat, shoulders..."
					rows={3}
				/>

				<div className="regulation-nav">
					<button className="subtle-button" onClick={() => setSubStep(ENTRY)}>
						Back
					</button>
					<button
						onClick={() => {
							if (knowsWhat) {
								advanceWizard(); // ready → go to Observation
							} else {
								setSubStep(ACTIVATION_TYPE); // needs regulation
							}
						}}>
						Continue
					</button>
				</div>
			</div>
		);
	}

	// ─── Step 2: Activation Type ───
	if (subStep === ACTIVATION_TYPE) {
		return (
			<div className="regulation-gate">
				<p className="regulation-question">Which feels closest right now?</p>

				<div className="regulation-choices type-choices">
					<button
						className="regulation-choice type-agitated"
						onClick={() => {
							setActivationType("agitated");
							setShowNotYet(false);
							setSubStep(REGULATION);
						}}>
						<span className="type-icon">🔥</span>
						<span className="type-label">Warm, tight, or agitated</span>
					</button>
					<button
						className="regulation-choice type-numb"
						onClick={() => {
							setActivationType("numb");
							setShowNotYet(false);
							setSubStep(REGULATION);
						}}>
						<span className="type-icon">🧊</span>
						<span className="type-label">Heavy, flat, or numb</span>
					</button>
					<button
						className="regulation-choice type-foggy"
						onClick={() => {
							setActivationType("foggy");
							setShowNotYet(false);
							setSubStep(REGULATION);
						}}>
						<span className="type-icon">🌫️</span>
						<span className="type-label">Foggy, scattered, or overwhelmed</span>
					</button>
				</div>

				<div className="regulation-nav">
					<button className="subtle-button" onClick={() => setSubStep(BODY_CHECK)}>
						Back
					</button>
				</div>
			</div>
		);
	}

	// ─── Step 3: Regulation Exercise ───
	if (subStep === REGULATION) {
		return (
			<div className="regulation-gate">
				{activationType === "agitated" && (
					<div className={`regulation-exercise exercise-agitated`}>
						<p className="regulation-framing">
							That makes sense. When things feel intense, our system tries to protect us
							by speeding up.
						</p>
						<p className="regulation-lead">
							Let's see if we can give it a little steadiness.
						</p>

						<div className="regulation-invitations">
							<p>See if you can take one slightly longer breath out than in.</p>
							<p>Feel your feet touching the floor.</p>
							<p>Let your shoulders soften just a little.</p>
						</div>

						<div className="regulation-pause">
							<p className="pause-prompt">Has anything softened, even 5%?</p>

							{!showNotYet ? (
								<div className="regulation-choices">
									<button
										className="regulation-choice"
										onClick={() => setSubStep(ORIENTATION)}>
										A little
									</button>
									<button
										className="regulation-choice regulation-choice-soft"
										onClick={() => setShowNotYet(true)}>
										Not yet
									</button>
								</div>
							) : (
								<div className="regulation-notyet">
									<p>
										That's okay. We can go slowly. Would it help to take another
										breath, or look around and name one neutral thing you see?
									</p>
									<button onClick={() => setSubStep(ORIENTATION)}>
										Continue whenever you're ready
									</button>
								</div>
							)}
						</div>
					</div>
				)}

				{activationType === "numb" && (
					<div className={`regulation-exercise exercise-numb`}>
						<p className="regulation-framing">
							Numbness is often a kind of protection. We don't need to push it away —
							just gently bring a little life back in.
						</p>

						<div className="regulation-invitations">
							<p>Wiggle your fingers or toes.</p>
							<p>Press your feet into the ground for a few seconds.</p>
							<p>Take one slightly deeper breath than usual.</p>
						</div>

						<div className="regulation-pause">
							<p className="pause-prompt">Has anything shifted, even a small amount?</p>

							{!showNotYet ? (
								<div className="regulation-choices">
									<button
										className="regulation-choice"
										onClick={() => setSubStep(ORIENTATION)}>
										A little
									</button>
									<button
										className="regulation-choice regulation-choice-soft"
										onClick={() => setShowNotYet(true)}>
										Not yet
									</button>
								</div>
							) : (
								<div className="regulation-notyet">
									<p>
										That's okay. Even noticing the numbness is a step.
									</p>
									<button onClick={() => setSubStep(ORIENTATION)}>
										Continue whenever you're ready
									</button>
								</div>
							)}
						</div>
					</div>
				)}

				{activationType === "foggy" && (
					<div className={`regulation-exercise exercise-foggy`}>
						<p className="regulation-framing">
							When everything feels tangled, it can help to narrow the focus.
						</p>

						<div className="regulation-invitations">
							<p>Can you notice just one sensation in your body?</p>
							<p>Is it more tight or more heavy?</p>
							<p>Take one slow breath with that sensation.</p>
						</div>

						<div className="regulation-pause">
							<p className="pause-prompt">
								Does this feel even slightly clearer?
							</p>

							{!showNotYet ? (
								<div className="regulation-choices">
									<button
										className="regulation-choice"
										onClick={() => setSubStep(ORIENTATION)}>
										A little
									</button>
									<button
										className="regulation-choice regulation-choice-soft"
										onClick={() => setShowNotYet(true)}>
										Not yet
									</button>
								</div>
							) : (
								<div className="regulation-notyet">
									<p>
										That's okay. There's no rush here. Just being with it is enough.
									</p>
									<button onClick={() => setSubStep(ORIENTATION)}>
										Continue whenever you're ready
									</button>
								</div>
							)}
						</div>
					</div>
				)}

				<div className="regulation-nav">
					<button
						className="subtle-button"
						onClick={() => {
							setShowNotYet(false);
							setSubStep(ACTIVATION_TYPE);
						}}>
						Back
					</button>
				</div>
			</div>
		);
	}

	// ─── Step 4: Gentle Orientation ───
	if (subStep === ORIENTATION) {
		return (
			<div className="regulation-gate">
				<p className="regulation-question">
					If this feeling had a time direction, would it be about:
				</p>

				<div className="regulation-choices">
					<button
						className={`regulation-choice ${orientation === "now" ? "chosen" : ""}`}
						onClick={() => setOrientation("now")}>
						Something happening right now
					</button>
					<button
						className={`regulation-choice ${orientation === "future" ? "chosen" : ""}`}
						onClick={() => setOrientation("future")}>
						Something that might happen
					</button>
					<button
						className={`regulation-choice ${orientation === "past" ? "chosen" : ""}`}
						onClick={() => setOrientation("past")}>
						Something from earlier
					</button>
				</div>

				{orientation && (
					<p className="regulation-noticing">
						Just noticing that. No need to figure anything out.
					</p>
				)}

				<div className="regulation-nav">
					<button className="subtle-button" onClick={() => setSubStep(REGULATION)}>
						Back
					</button>
					{orientation && (
						<button onClick={() => setSubStep(READINESS)}>Continue</button>
					)}
				</div>
			</div>
		);
	}

	// ─── Step 5: Readiness Check ───
	if (subStep === READINESS) {
		return (
			<div className="regulation-gate">
				<p className="regulation-question">
					Has your system softened enough to look at this more clearly?
				</p>

				{!readinessNotYet ? (
					<div className="regulation-choices">
						<button className="regulation-choice" onClick={advanceWizard}>
							Yes
						</button>
						<button
							className="regulation-choice regulation-choice-soft"
							onClick={() => setReadinessNotYet(true)}>
							Not yet
						</button>
					</div>
				) : (
					<div className="regulation-stay">
						<p>
							That's completely fine. There's no pressure to move forward. You can stay
							here as long as you need.
						</p>
						<div className="regulation-choices">
							<button
								className="regulation-choice"
								onClick={() => {
									setReadinessNotYet(false);
									setSubStep(REGULATION);
								}}>
								Try the exercise again
							</button>
							<button className="regulation-choice" onClick={advanceWizard}>
								Continue anyway — I'll be gentle with myself
							</button>
						</div>
					</div>
				)}

				<div className="regulation-nav">
					<button className="subtle-button" onClick={() => setSubStep(ORIENTATION)}>
						Back
					</button>
				</div>
			</div>
		);
	}

	return null;
};

RegulationGate.title = "Settling In";

RegulationGate.helpContent = (
	<>
		<p>
			This tool walks you gently through a process based on Nonviolent Communication (NVC) —
			uncovering the deep longings underneath what you're feeling. You don't need to know
			anything about NVC to use it.
		</p>
		<p>
			When we're activated — whether agitated, numb, or overwhelmed — our nervous system is in
			protection mode. In that state, it's hard to think clearly about feelings and needs. So
			we start here, with settling.
		</p>
		<p>
			If you already know what's going on, you'll move quickly through to the observation step.
			If not, there are some gentle exercises to help your body settle first.
		</p>
	</>
);

export default RegulationGate;
