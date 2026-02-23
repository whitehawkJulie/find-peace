import React from "react";
import { useWizard } from "./WizardContext";
import Checklist from "./Checklist";
import { feelingsData } from "./FeelingsData";
import needsData from "./NeedsData";
import "./MakingGuesses.css";

// Build a version of feelingsData without the Faux Feelings category
const realFeelingsData = Object.fromEntries(
	Object.entries(feelingsData).filter(([key]) => key !== "meta" && key !== "Words that point to what happened")
);

const MakingGuesses = () => {
	const { guessObservation, setGuessObservation, guessFeelings, setGuessFeelings, guessNeeds, setGuessNeeds } =
		useWizard();

	return (
		<div className="making-guesses">
			<p>
				When you’re ready, we can gently turn toward the other person. Not to agree — just to widen the view. As
				we imagine what they might be feeling or needing, we often see more of what’s happening. Sometimes that
				brings a little more space inside you, and it can feel less like a verdict about you.
			</p>
			<p className="guesses-reminder">
				<em>Remember: The point isn’t to guess correctly. It’s simply to widen the frame.</em>
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
				<p>
					What emotions might be alive in them? Select any that seem possible, even if they seem to conflict
					with each other.
				</p>
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
				<Checklist data={needsData} selectedItems={guessNeeds} setSelectedItems={setGuessNeeds} type="need" />
			</div>
		</div>
	);
};

MakingGuesses.title = "Their Perspective";
MakingGuesses.helpContent = (
	<>
		<p>
			This is one of the most powerful moves in NVC: trying to see the world through the other person's eyes. Not
			to agree with them, not to excuse anything — just to understand.
		</p>

		<h4>Why empathy guesses matter</h4>
		<p>
			Marshall Rosenberg taught that behind every action — no matter how hurtful — is a person trying to meet a
			need. When we can guess what that need might be, something shifts. We start to see them not as the enemy,
			but as a fellow human in pain.
		</p>

		<h4>How to make guesses</h4>
		<ul>
			<li>
				<strong>You don't need to be right.</strong> The act of guessing is what opens your heart. Even wrong
				guesses create connection.
			</li>
			<li>
				Start with their observation — what did <em>they</em> see or experience? Their version of events might
				be very different from yours.
			</li>
			<li>
				Guess at their feelings — not what they think, but what they might be feeling in their body. Angry?
				Scared? Hurt? Overwhelmed?
			</li>
			<li>Then guess at their needs — what were they longing for? Connection? Respect? To matter? Safety?</li>
		</ul>

		<h4>A surprise to watch for</h4>
		<p>
			You might discover that the other person has some of the same unmet needs as you. That's a powerful place to
			stand — shared humanity, even in conflict.
		</p>

		<h4>If it feels too hard</h4>
		<p>
			If you're not ready to empathise with them yet, that's completely fine. It usually means you haven't fully
			received empathy for yourself first. You can skip this and come back to it later.
		</p>
	</>
);

export default MakingGuesses;
