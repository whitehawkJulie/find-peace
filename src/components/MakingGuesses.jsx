import React from "react";
import { useWizard } from "./WizardContext";
import Checklist from "./Checklist";
import HelpLink from "./HelpLink";
import { AllFeelingsData as FeelingsData } from "../data/AllFeelingsData";
import { Needs as NeedsData } from "../data/AllNeedsData";

import "./MakingGuesses.css";

const MakingGuesses = () => {
	const { guessObservation, setGuessObservation, guessFeelings, setGuessFeelings, guessNeeds, setGuessNeeds } =
		useWizard();
	return (
		<div className="making-guesses step-container">
			<p>
				Here we're getting curious about what might be going on for them, so that we can open the door to
				understanding and connection.{" "}
				<HelpLink topic="making-guesses" aside>
					Why on earth would I want to do that???
				</HelpLink>
			</p>

			<p>
				When you're ready, we can gently turn toward the other person — not to agree, just to widen the view. As
				we imagine what they might be feeling or needing, we often begin to see more of what's happening.
				Sometimes that brings a little more space inside you, and it can feel less like a verdict about you.
			</p>
			<p className="guesses-reminder highlight-box">
				<em>{"Remember: The point isn't to guess correctly. It's simply to widen the frame."}</em>
			</p>

			<div className="guesses-section">
				<h3>{"What might they have observed?"}</h3>
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
				<h3>{"How might they be feeling?"}</h3>
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
				<h3>{"What might they be needing?"}</h3>
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
MakingGuesses.titleSweary = "Where the hell were they coming from?";
MakingGuesses.navTitle = "Their View";

// Help content kept inline — it references HelpLink and is concise.

export default MakingGuesses;
