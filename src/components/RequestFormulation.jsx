import React from "react";
import { useWizard } from "./WizardContext";
import "./RequestFormulation.css";

const RequestFormulation = () => {
	const { requestOfSelf, setRequestOfSelf, requestOfOther, setRequestOfOther } = useWizard();
	return (
		<div className="request-formulation step-container">
			<p>
				<em>
					{
						"This tool is a work in progress. There will be more to come about relational repair: how to use what you've just unpacked to have a connection-building conversation with the other person, and find solutions. For now, just take a moment to write down any requests that come up for you as you reflect on the other steps."
					}
				</em>
			</p>
			<p>
				Now that you've connected with your feelings and needs, and considered the other person's perspective,
				you're in a much better place to think about what you'd actually like to happen next.
			</p>

			<div className="request-section">
				<h3>{"A request of yourself"}</h3>
				<p>
					Based on what you've discovered, is there something you'd like to commit to? Something you could do
					differently, or something kind you could do for yourself?
				</p>
				<textarea
					className="request-textarea"
					data-field-id="request-of-self"
					value={requestOfSelf}
					onChange={(e) => setRequestOfSelf(e.target.value)}
					placeholder="Might I be willing to..."
					rows={3}
				/>
			</div>

			<div className="request-section">
				<h3>{"A request of the other person"}</h3>
				<p>
					Is there something specific you'd like to ask of them? Remember, a true request allows them to say
					no — and is easy to do when you're really clear that there are MANY ways to meet your needs, and
					what you're requesting is just ONE of them. Try starting with \"Would you be willing to...\"
				</p>
				<textarea
					className="request-textarea"
					data-field-id="request-of-other"
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
RequestFormulation.navTitle = "Making Requests";

export default RequestFormulation;
