import React from "react";

const NeedsMet = ({ needs }) => {
	const metNeeds = Object.keys(needs).filter((key) => needs[key] === "met");

	return (
		<div className="step-met-needs">
			<h2>Needs that are already met</h2>
			<p>
				Isn't it lovely to notice that some needs WERE met? Pause for a moment and savour how it feels in your
				body when those needs are met!
			</p>
			<div className="pill-grid">
				{metNeeds.map((need) => (
					<div key={need} className="pill met">
						{need}
					</div>
				))}
			</div>
		</div>
	);
};

export default NeedsMet;
