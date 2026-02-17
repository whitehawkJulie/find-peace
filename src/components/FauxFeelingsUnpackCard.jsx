import React from "react";
import { useWizard } from "./WizardContext";
import { feelingsData } from "./feelingsData";
import Pill from "./Pill";
import "./FauxFeelingsUnpackCard.css";

const FauxFeelingsUnpackCard = () => {
	const { feelings, setFeelings, needs, setNeeds } = useWizard();

	// Flatten all faux feelings into a single list for lookup
	const fauxFeelingsMap = Object.entries(feelingsData["Faux Feelings"]).flatMap(
		([subCategory, items]) =>
			items.map((item) => ({
				...item,
				subCategory,
			}))
	);

	// Find which selected feelings are actually faux feelings
	const selectedFauxFeelings = Object.entries(feelings)
		.filter(([_, status]) => status === "clicked")
		.map(([feeling]) => fauxFeelingsMap.find((entry) => entry.item === feeling))
		.filter(Boolean);

	if (selectedFauxFeelings.length === 0) return null;

	// Toggle a suggested feeling into/out of the main feelings state
	const toggleFeeling = (name) => {
		setFeelings((prev) => {
			const updated = { ...prev };
			if (updated[name] === "clicked") {
				delete updated[name];
			} else {
				updated[name] = "clicked";
			}
			return updated;
		});
	};

	// Toggle a suggested need into/out of the main needs state
	const toggleNeed = (name) => {
		setNeeds((prev) => {
			const updated = { ...prev };
			if (updated[name] === "clicked") {
				delete updated[name];
			} else {
				updated[name] = "clicked";
			}
			return updated;
		});
	};

	return (
		<div className="faux-unpack">
			<p>
				Some of the words you chose are what we call <strong>"faux feelings"</strong> — they sound
				like feelings, but they're actually thoughts about what someone else is doing to us.
			</p>
			<p>
				That's completely okay! These words carry a lot of pain. But because they're thoughts rather
				than body-based feelings, they tend to keep us stuck — feeling like victims, powerless to
				change anything.
			</p>
			<p>
				The good news? Underneath each of these words, there <em>are</em> real feelings and real
				needs. And those, we can work with. <strong>Tap any that resonate</strong> to add them to
				your selections.
			</p>

			{selectedFauxFeelings.map((feeling, i) => (
				<div key={i} className="faux-card">
					<div className="faux-card-header">
						<span className="faux-word">{feeling.item}</span>
						<span className="faux-category">{feeling.subCategory}</span>
					</div>

					{feeling.thought && (
						<p className="faux-reframe">{feeling.thought}.</p>
					)}

					<p className="faux-why">{feeling.problem}.</p>

					{feeling.suggestedFeelings?.length > 0 && (
						<div className="faux-suggestions">
							<p className="faux-suggestions-label">What you might actually be feeling:</p>
							<div className="pill-grid cloud">
								{feeling.suggestedFeelings.map((f, index) => (
									<Pill
										key={index}
										item={f}
										type="feeling"
										state={feelings[f] === "clicked" ? "clicked" : ""}
										onClick={() => toggleFeeling(f)}
									/>
								))}
							</div>
						</div>
					)}

					{feeling.suggestedNeeds?.length > 0 && (
						<div className="faux-suggestions">
							<p className="faux-suggestions-label">Needs that might be underneath:</p>
							<div className="pill-grid cloud">
								{feeling.suggestedNeeds.map((n, index) => (
									<Pill
										key={index}
										item={n}
										type="need"
										state={needs[n] === "clicked" ? "clicked" : ""}
										onClick={() => toggleNeed(n)}
									/>
								))}
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
};

FauxFeelingsUnpackCard.title = "Unpacking Faux Feelings";

FauxFeelingsUnpackCard.helpContent = (
	<>
		<p>
			<em>
				"The key to identifying and expressing feelings is to focus on words that describe our inner
				experience rather than words that describe our interpretations of people's actions."
			</em>{" "}
			— Miki Kashtan
		</p>
		<h4>Why does this matter?</h4>
		<p>
			Words like "abandoned," "betrayed," or "manipulated" feel deeply true when we're in pain. But
			they describe what we think someone <em>did to us</em>, not what we're actually feeling in our
			bodies.
		</p>
		<p>
			The problem is that our minds can dwell on these stories forever. But our bodies have a
			powerful ability to move through actual emotions — if we can name them.
		</p>
		<h4>How to reframe</h4>
		<p>
			For each faux feeling, we're looking for two things: the <strong>real feelings</strong>{" "}
			underneath (what's happening in your body?) and the <strong>unmet needs</strong> those feelings
			are pointing to.
		</p>
		<p>
			For example, "I feel rejected" might become "I'm feeling sad and scared, because I have a need
			for belonging and acceptance."
		</p>
		<p>
			This shift — from story to sensation, from blame to need — is where the real power is. It
			moves us from helplessness into self-connection.
		</p>
		<p>
			<strong>Tap any feelings or needs that resonate</strong> — they'll be added to your selections
			and carry through to the next steps.
		</p>
	</>
);

export default FauxFeelingsUnpackCard;
