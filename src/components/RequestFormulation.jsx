import React from "react";
import { useWizard } from "./WizardContext";
import "./RequestFormulation.css";

const RequestFormulation = () => {
	const { requestOfSelf, setRequestOfSelf, requestOfOther, setRequestOfOther } = useWizard();

	return (
		<div className="request-formulation">
			<p>
				<em>
					This tool is a work in progress. There will be more to come about relational repair: how to use what
					you've just unpacked to have a connection-building conversation with the other person, and find
					solutions. For now, just take a moment to write down any requests that come up for you as you
					reflect on the other steps.
				</em>
			</p>
			<p>
				Now that you've connected with your feelings and needs, and considered the other person's perspective,
				you're in a much better place to think about what you'd actually like to happen next.
			</p>

			<div className="request-section">
				<h3>A request of yourself</h3>
				<p>
					Based on what you've discovered, is there something you'd like to commit to? Something you could do
					differently, or something kind you could do for yourself?
				</p>
				<textarea
					className="request-textarea"
					value={requestOfSelf}
					onChange={(e) => setRequestOfSelf(e.target.value)}
					placeholder="Might I be willing to..."
					rows={3}
				/>
			</div>

			<div className="request-section">
				<h3>A request of the other person</h3>
				<p>
					Is there something specific you'd like to ask of them? Remember, a true request allows them to say
					no - and is easy to do when you're really clear that there are MANY ways to meet your needs, and
					what you're requesting is just ONE of them. Try starting with <em>"Would you be willing to..."</em>
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
		<h4>Requests vs. demands</h4>
		<p>
			The key test: if the other person says "no," how do you feel? If you'd be angry or punish them, it was a
			demand. If you can genuinely accept "no" and look for another strategy — that's a request.
		</p>

		<h4>Three types of request</h4>
		<ul>
			<li>
				<strong>Connection request</strong> — asking the other person to reflect back what they heard, or how
				they feel hearing this. E.g. "Would you be willing to tell me what you heard me say?" This is often the
				most important first step.
			</li>
			<li>
				<strong>Action request</strong> — asking for a specific, doable action. E.g. "Would you be willing to
				text me if you're going to be more than 15 minutes late?"
			</li>
			<li>
				<strong>Self-request</strong> — a commitment to yourself. E.g. "I'd like to pause and breathe before
				responding next time I feel triggered."
			</li>
		</ul>

		<h4>A good request is:</h4>
		<ul>
			<li>
				<strong>Specific</strong> — not "be nicer" but "would you greet me when I come home?"
			</li>
			<li>
				<strong>Doable</strong> — something the person can actually say yes or no to
			</li>
			<li>
				<strong>Positive</strong> — what you DO want, not what you don't want
			</li>
			<li>
				<strong>Present-tense</strong> — about now or the near future, not forever
			</li>
		</ul>

		<h4>Common pitfalls</h4>
		<ul>
			<li>
				"I want you to understand me" — too vague. Try: "Would you be willing to tell me what you're hearing?"
			</li>
			<li>
				"Stop being so critical" — negative and vague. Try: "When you notice something I could do differently,
				would you be willing to start with what I did well?"
			</li>
			<li>"You need to change" — that's a demand about who they are. Focus on a specific, observable action.</li>
		</ul>
	</>
);

export default RequestFormulation;
