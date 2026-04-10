import React from "react";
import { useWizard } from "../WizardContext";
import Checklist from "../Checklist";
import HelpLink from "../HelpLink";
import DismissibleHint from "../DismissibleHint";
import { AllFeelingsData as FeelingsData } from "../../data/AllFeelingsData";
import { Needs as NeedsData } from "../../data/AllNeedsData";

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
				<em>Remember: The point isn't to guess correctly. It's simply to widen the frame.</em>
			</p>

			<p>There are three parts:</p>
			<ul>
				<li>
					what they might have <strong>observed</strong>
				</li>
				<li>
					how they might be <strong>feeling</strong>
				</li>
				<li>
					and what they might be <strong>needing</strong>
				</li>
			</ul>

			<div className="guesses-section">
				<h2>{"What might they have observed?"}</h2>
				<p>What do you think the other person saw or heard? Just the facts, from their point of view.</p>
				<textarea
					className="guesses-textarea"
					data-field-id="making-guesses"
					value={guessObservation}
					onChange={(e) => setGuessObservation(e.target.value)}
					placeholder="They might have seen/heard..."
					rows={3}
				/>
			</div>

			<div className="guesses-section">
				<h2>{"How might they be feeling?"}</h2>
				<p>
					What emotions might be alive in them? If you have zero idea, have you ever been in a similar
					situation to where they were? What might you have felt?
				</p>
				<p>TIP: Select any that seem possible, even if they seem to conflict with each other.</p>
				<DismissibleHint id="guesses-checklists">Tap a section heading to expand it.</DismissibleHint>

				<Checklist
					data={[FeelingsData.sections.feelings, FeelingsData.sections.feelingsMet]}
					selectedItems={guessFeelings}
					setSelectedItems={setGuessFeelings}
					type="feeling"
					showListModeToggle
					defaultCollapsed={["Feelings", "Feelings when our needs are met"]}
				/>
			</div>

			<div className="guesses-section">
				<h2>{"What might they be needing?"}</h2>
				<p>
					What needs of theirs might not be met in this situation? Or, alternately, what needs might they have
					been trying to meet, in what they said or did?
				</p>
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
					defaultCollapsed={["Subsistence Needs", "Connection Needs", "Meaning Needs", "Freedom Needs"]}
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
