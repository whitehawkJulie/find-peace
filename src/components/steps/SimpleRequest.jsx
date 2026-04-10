import React from "react";
import { useWizard } from "../WizardContext";

const SimpleRequest = () => {
	const { simpleRequest, setSimpleRequest } = useWizard();

	return (
		<div>
			<p className="step-purpose">
				{
					"Here we're shaping a clear request, so that you can ask for what you want in a way the other person can understand and respond to."
				}
			</p>

			<p>
				If this is a fairly simple situation, there may be a request you'd like to make of the other person. A
				request is basically asking whether someone would be willing to take an action that might help meet one
				or more of your needs.
			</p>
			<p>
				It helps to stay aware that no-one has to meet your needs. You're asking for willingness, not demanding
				compliance. In fact, you usually don't want people to do something unwillingly — that tends to create
				resentment and disconnect rather than genuine care.
			</p>
			<p>A few things tend to make requests work better:</p>

			<ul>
				<li>
					<strong>{"Be clear and specific."}</strong>{" "}
					{
						'A request needs to describe something the other person could actually do or say. "Be nicer to me" isn\'t very clear, because the other person has no idea what that would look like for you.'
					}
				</li>
				<li>
					<strong>{"Describe the action you're asking for."}</strong>{" "}
					{
						'"Would you be willing to ask me how my day was when I get home, for the next week?" is specific and doable.'
					}
				</li>
				<li>
					<strong>{"Keep it doable."}</strong>{" "}
					{
						"Requests work best when they are concrete and realistic. Specific actions and timeframes make it easier for the other person to respond honestly."
					}
				</li>
				<li>
					<strong>{'Be willing to hear "no".'}</strong>{" "}
					{
						"A request only stays a request if the other person can freely say no. If they say no, it doesn't mean your needs don't matter — it usually means they have needs of their own that are also important."
					}
				</li>
				<li>
					<strong>{'Listen for the "yes" to their own needs.'}</strong>{" "}
					{
						"When someone says no, they are often protecting something important to them — perhaps their time, energy, safety, or priorities. Hearing that can open the door to finding another strategy that might work for both of you."
					}
				</li>
			</ul>

			<p>
				When both people's needs are on the table, it becomes much easier to look for solutions that everyone
				can willingly support.
			</p>

			<div className="collab-input-group">
				<label className="collab-input-label">{"Is there a request you'd like to make?"}</label>
				<textarea
					className="collab-textarea"
					data-field-id="simple-request"
					placeholder="e.g. Would you be willing to…"
					value={simpleRequest}
					onChange={(e) => setSimpleRequest(e.target.value)}
					rows={3}
				/>
			</div>
		</div>
	);
};

export default SimpleRequest;
