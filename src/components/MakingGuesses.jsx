import React from "react";
import { useWizard } from "./WizardContext";
import Checklist from "./Checklist";
import { AllFeelingsData as FeelingsData } from "../data/AllFeelingsData";
import { Needs as NeedsData } from "../data/AllNeedsData";
import HelpLink from "./HelpLink";

import "./MakingGuesses.css";

const MakingGuesses = () => {
	const { guessObservation, setGuessObservation, guessFeelings, setGuessFeelings, guessNeeds, setGuessNeeds } =
		useWizard();

	return (
		<div className="making-guesses step-container">
			<p>
				When you're ready, we can gently turn toward the other person. Not to agree — just to widen the view. As
				we imagine what they might be feeling or needing, we often see more of what's happening. Sometimes that
				brings a little more space inside you, and it can feel less like a verdict about you.
			</p>
			<p className="guesses-reminder highlight-box">
				<em>Remember: The point isn't to guess correctly. It's simply to widen the frame.</em>
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
					data={[FeelingsData.sections.feelings, FeelingsData.sections.feelingsMet]}
					selectedItems={guessFeelings}
					setSelectedItems={setGuessFeelings}
					type="feeling"
					showListModeToggle
				/>
			</div>

			<div className="guesses-section">
				<h3>What might they be needing?</h3>
				<p>What needs of theirs might not be met in this situation?</p>
				<Checklist
					data={[
						NeedsData.sections.subsistence,
						NeedsData.sections.connection,
						NeedsData.sections.meaning,
						NeedsData.sections.freedom,
					]}
					selectedItems={guessNeeds}
					setSelectedItems={setGuessNeeds}
					type="need"
				/>
			</div>
		</div>
	);
};

MakingGuesses.title = "What might have been happening for them?";
MakingGuesses.helpContent = (
	<>
		<p>
			This is one of the most powerful moves in NVC: trying to see the world through the other person's eyes. Not
			to agree with them, not to excuse anything — just to understand. See{" "}
			<HelpLink topic="acceptance">Acceptance vs Approval</HelpLink>
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
			If you're not ready to consider what might have been going on in them yet, that's completely fine. It
			usually means you haven't fully received empathy for yourself first. You can skip this and come back to it
			later if you like.
		</p>
	</>
);

export default MakingGuesses;
