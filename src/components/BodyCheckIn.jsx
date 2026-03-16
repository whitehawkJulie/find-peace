import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import "./BodyCheckIn.css";

const bodyAreas = [
	{
		id: "chest",
		label: "Chest / Heart",
		prompt: "Place your attention on your chest area. Is there tightness, warmth, aching, openness, heaviness?",
		icon: "\u{1F49B}",
	},
	{
		id: "stomach",
		label: "Stomach / Gut",
		prompt: "Now notice your belly. Any butterflies, knots, churning, emptiness, or settling?",
		icon: "\u{1F300}",
	},
	{
		id: "throat",
		label: "Throat",
		prompt: "How about your throat? Does it feel open, tight, choked up, or like something is stuck?",
		icon: "\u{1FAE7}",
	},
	{
		id: "shoulders",
		label: "Shoulders / Neck",
		prompt: "Notice your shoulders and neck. Are they raised, tense, heavy, or relaxed?",
		icon: "\u{1FAA8}",
	},
	{
		id: "jaw",
		label: "Jaw / Face",
		prompt: "Check in with your jaw and face. Is your jaw clenched? Brow furrowed? Or soft and relaxed?",
		icon: "\u{1F60C}",
	},
	{
		id: "hands",
		label: "Hands / Arms",
		prompt: "Finally, your hands and arms. Clenched? Restless? Heavy? Tingling? Open?",
		icon: "\u{1F932}",
	},
];

const BodyCheckIn = () => {
	const { bodyScan, setBodyScan } = useWizard();
	const [activeArea, setActiveArea] = useState(null);

	const handleInput = (areaId, value) => {
		setBodyScan((prev) => ({
			...prev,
			[areaId]: value,
		}));
	};

	const hasAnyInput = Object.values(bodyScan || {}).some((v) => v && v.trim());

	return (
		<div className="body-checkin">
			<p className="body-checkin-intro">
				Before naming your feelings, take a moment to notice what's happening in your body. You don't need to go
				looking for anything — just notice what's already there.
			</p>

			<div className="body-areas">
				{bodyAreas.map((area) => {
					const isActive = activeArea === area.id;
					const hasValue = bodyScan[area.id]?.trim();

					return (
						<div
							key={area.id}
							className={`body-area ${isActive ? "active" : ""} ${hasValue ? "has-value" : ""}`}>
							<button
								className="body-area-header"
								onClick={() => setActiveArea(isActive ? null : area.id)}>
								<span className="body-area-icon">{area.icon}</span>
								<span className="body-area-label">{area.label}</span>
								{hasValue && <span className="body-area-check">{"\u2713"}</span>}
							</button>

							{isActive && (
								<div className="body-area-content">
									<p className="body-area-prompt">{area.prompt}</p>
									<textarea
										className="body-area-input"
										placeholder="What do you notice?"
										value={bodyScan[area.id] || ""}
										onChange={(e) => handleInput(area.id, e.target.value)}
										rows={2}
									/>
								</div>
							)}
						</div>
					);
				})}
			</div>

			<p className="body-checkin-bridge">
				{hasAnyInput
					? "Thank you for taking that moment. Now let's find words for what you're noticing..."
					: "Take your time. When you're ready, we'll move on to finding words for what's alive in you."}
			</p>
		</div>
	);
};

BodyCheckIn.title = "Body Check-In";
BodyCheckIn.helpContent = (
	<>
		<p>
			Our bodies hold information that our minds often miss. Before we try to name our feelings, it helps to slow
			down and notice what's actually happening physically.
		</p>
		<p>
			Tap on each body area to check in. You don't need to write anything — just pausing to notice is enough. But
			if words come, you can jot them down.
		</p>
		<h4>Why start with the body?</h4>
		<p>
			Emotions live in the body first. That knot in your stomach, the tightness in your chest, the tension in your
			jaw — these are your feelings trying to get your attention. When we name what we feel in the body, the right
			feeling words often follow naturally.
		</p>
	</>
);

export default BodyCheckIn;
