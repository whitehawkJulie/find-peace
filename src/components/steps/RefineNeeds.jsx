import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import { getNeedData } from "../../utils/renderHelpers";
import "./RefineNeeds.css";

// ─────────────────────────────────────────────
// RefineNeeds — Page A: FindDeeperNeeds
// Shows needs where offerDeepening is present (an object with questions +
// suggestions). User can replace the original need or keep both.
// ─────────────────────────────────────────────
const RefineNeeds = () => {
	const { needs, setNeeds, needReplacements, setNeedReplacements } = useWizard();

	// { original: "Respect", replacement: "Dignity" } | null
	const [pendingReplacement, setPendingReplacement] = useState(null);

	// Only show needs that have an offerDeepening object
	const checkNeeds = Object.keys(needs).filter((name) => {
		const data = getNeedData(name);
		return !!data?.offerDeepening;
	});

	const handleGuessClick = (original, guess) => {
		if (needs[guess]) return; // already selected — nothing to do
		setPendingReplacement({ original, replacement: guess });
	};

	const handleReplace = () => {
		const { original, replacement } = pendingReplacement;
		setNeeds((prev) => {
			const next = { ...prev };
			next[replacement] = next[original]; // inherit clicked / double-clicked state
			delete next[original];
			return next;
		});
		setNeedReplacements((prev) => ({ ...prev, [original]: replacement }));
		setPendingReplacement(null);
	};

	const handleKeepBoth = () => {
		setNeeds((prev) => ({ ...prev, [pendingReplacement.replacement]: "clicked" }));
		setPendingReplacement(null);
	};

	if (checkNeeds.length === 0) return null;

	return (
		<div className="refine-needs">
			<p className="refine-needs-optional">
				Optional — if all your needs feel exactly right, skip straight to the next step.
			</p>
			<p className="refine-needs-intro">
				Some of the needs you've chosen can <em>sometimes</em> be shorthand for something more specific. The
				questions below are there to help you check whether there's something underneath that might fit even
				more closely for you.
			</p>

			{checkNeeds.map((name) => {
				const deepening = getNeedData(name)?.offerDeepening;
				const questions = deepening?.questions ?? [];
				const suggestions = deepening?.suggestions ?? [];
				const isPending = pendingReplacement?.original === name;

				return (
					<div key={name} className="refine-need-card">
						<h3 className="refine-need-name">{name}</h3>

						{questions.length > 0 && (
							<div className="refine-need-questions">
								{questions.map((q, i) => (
									<p key={i} className="refine-need-question">
										{q}
									</p>
								))}
							</div>
						)}

						{suggestions.length > 0 && (
							<div className="refine-need-guesses">
								<p className="refine-need-guesses-label">Do any of these land more deeply for you?</p>
								<div className="pill-grid cloud">
									{suggestions.map((guess) => (
										<div
											key={guess}
											className={`pill need ${needs[guess] ? "clicked" : ""}`}
											onClick={() => handleGuessClick(name, guess)}>
											{guess}
										</div>
									))}
								</div>
							</div>
						)}

						{isPending && (
							<div className="need-remove-confirm">
								<span>
									Replace <strong>{name}</strong> with{" "}
									<strong>{pendingReplacement.replacement}</strong>, or keep both?
								</span>
								<div className="need-remove-confirm-btns">
									<button className="need-remove-confirm-yes" onClick={handleReplace}>
										Replace
									</button>
									<button className="need-remove-confirm-cancel" onClick={handleKeepBoth}>
										Keep both
									</button>
									<button
										className="need-remove-confirm-cancel"
										onClick={() => setPendingReplacement(null)}>
										Cancel
									</button>
								</div>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
};

RefineNeeds.title = "Refine your needs";
RefineNeeds.navTitle = "Refine";

export default RefineNeeds;
