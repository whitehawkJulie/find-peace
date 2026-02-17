import React from "react";
import { useWizard } from "./WizardContext";
import Checklist from "./Checklist";
import { feelingsData } from "./FeelingsData";
import needsData from "./NeedsData";
import "./MakingGuesses.css";

// Build a version of feelingsData without the Faux Feelings category
const realFeelingsData = Object.fromEntries(
	Object.entries(feelingsData).filter(([key]) => key !== "Faux Feelings")
);

const MakingGuesses = () => {
	const {
		guessObservation,
		setGuessObservation,
		guessFeelings,
		setGuessFeelings,
		guessNeeds,
		setGuessNeeds,
	} = useWizard();

	return (
		<div className="making-guesses">
			<p>
				Now let's gently turn our attention to the other person. This isn't about being right —
				it's about expanding your empathy. When we guess what someone else might be feeling and
				needing, we humanise them and open the door to understanding.
			</p>
			<p className="guesses-reminder">
				<em>
					Remember: the point isn't to guess correctly. It's that the act of guessing puts us in
					some kind of connection with them.
				</em>
			</p>

			<div className="guesses-section">
				<h3>What might they have observed?</h3>
				<p>What do you think the other person saw or heard? Just the facts, from their point of view.</p>
				<textarea
					className="guesses-textarea"
					value={guessObservation}
					onChange={(e) => setGuessObservation(e.target.value)}
					placeholder="They might have seen/heard..."
					rows={3}
				/>
			</div>

			<div className="guesses-section">
				<h3>How might they be feeling?</h3>
				<p>What emotions might be alive in them? Select any that seem possible.</p>
				<Checklist
					data={realFeelingsData}
					selectedItems={guessFeelings}
					setSelectedItems={setGuessFeelings}
					type="feeling"
				/>
			</div>

			<div className="guesses-section">
				<h3>What might they be needing?</h3>
				<p>What needs of theirs might not be met in this situation?</p>
				<Checklist
					data={needsData}
					selectedItems={guessNeeds}
					setSelectedItems={setGuessNeeds}
					type="need"
				/>
			</div>
		</div>
	);
};

MakingGuesses.title = "Their Perspective";
MakingGuesses.helpContent = (
	<>
		<p>
			By making feelings and needs guesses for the other person, we humanise them. We start to see
			them not as the enemy, but as another person with unmet needs — just like us.
		</p>
		<p>
			The point is not to guess RIGHT, but that making guesses puts us in some kind of connection
			with them. Even wrong guesses open our hearts.
		</p>
		<p>
			You might be surprised to find that they may have some of the same needs as you!
		</p>
	</>
);

export default MakingGuesses;
