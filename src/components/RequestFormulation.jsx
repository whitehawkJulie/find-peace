import React from "react";
import { useWizard } from "./WizardContext";
import "./RequestFormulation.css";

const RequestFormulation = () => {
	const { requestOfSelf, setRequestOfSelf, requestOfOther, setRequestOfOther } = useWizard();

	return (
		<div className="request-formulation">
			<p>
				Now that you've connected with your feelings and needs, and considered the other person's
				perspective, you're in a much better place to think about what you'd actually like to happen
				next.
			</p>

			<div className="request-section">
				<h3>A request of yourself</h3>
				<p>
					Based on what you've discovered, is there something you'd like to commit to? Something
					you could do differently, or something kind you could do for yourself?
				</p>
				<textarea
					className="request-textarea"
					value={requestOfSelf}
					onChange={(e) => setRequestOfSelf(e.target.value)}
					placeholder="I would like to..."
					rows={3}
				/>
			</div>

			<div className="request-section">
				<h3>A request of the other person</h3>
				<p>
					Is there something you'd like to ask of them? Remember, a true request allows them to say
					no. Try starting with <em>"Would you be willing to..."</em>
				</p>
				<textarea
					className="request-textarea"
					value={requestOfOther}
					onChange={(e) => setRequestOfOther(e.target.value)}
					placeholder="Would you be willing to..."
					rows={3}
				/>
			</div>
		</div>
	);
};

RequestFormulation.title = "Making Requests";
RequestFormulation.helpContent = (
	<>
		<p>
			Requests are different from demands. A demand carries an implicit threat — if you don't do
			this, there will be consequences. A request carries genuine openness to hearing "no."
		</p>
		<p>A good request is:</p>
		<ul>
			<li>
				<strong>Specific</strong> — not "be nicer" but "would you greet me when I come home?"
			</li>
			<li>
				<strong>Doable</strong> — something the person can actually say yes or no to
			</li>
			<li>
				<strong>Positive</strong> — what you DO want, not what you don't
			</li>
			<li>
				<strong>Present-tense</strong> — about now or the near future, not forever
			</li>
		</ul>
		<p>
			It's equally valuable to make a request of yourself. Self-care and self-compassion are acts of
			meeting your own needs.
		</p>
	</>
);

export default RequestFormulation;
