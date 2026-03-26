import React from "react";

const WhetherToConverse = () => {
	return (
		<div>
			<p className="step-purpose">
				{
					"Here we're exploring whether a conversation would actually serve you, so that you can choose your next step with clarity."
				}
			</p>

			<p>A conversation with the other person is likely to be worthwhile IF:</p>
			<ul>
				<li>{"You have ongoing contact with this person"}</li>
				<li>{"AND this is an appropriate place for you to try having this need met"}</li>
				<li>{"AND this is a need they are potentially capable of meeting"}</li>
				<li>{"AND you have enough clarity to express yourself clearly enough"}</li>
				<li>{"AND they're willing to have the conversation!"}</li>
			</ul>
			<p>
				If this person isn't capable of meeting this need, don't give up on it — find ways to meet it elsewhere.
				Hold tightly to your needs, and loosely to your strategies.
			</p>
		</div>
	);
};

export default WhetherToConverse;
