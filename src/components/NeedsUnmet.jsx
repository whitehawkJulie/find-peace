import React from "react";

const NeedsUnmet = ({ needs }) => {
	const unmetNeeds = Object.keys(needs).filter((key) => needs[key] === "unmet");

	return (
		<div className="step-met-needs">
			<h2>Needs that were not met</h2>
			<div className="pill-grid">
				{unmetNeeds.map((need) => (
					<div key={need} className="pill unmet">
						{need}
					</div>
				))}
			</div>
			<p>
				These are the needs that weren't met for you in that moment. If any of these come up often for you, it's
				probable that those particular needs are often unmet for you, that you have "bone dry needs tanks" for
				these. This particular situation won't be the only time this pain arises for you around this need.
				Fortunately, needs are not tied to any one person, place or time ... we can get them met in many, many
				ways! There are two meanings of the phrase "to meet a need" ... living energy of needs etc, and finding
				strategies fo rneeds etc. So let's consider how we might be able to better met those needs in our daily
				lives?
			</p>
		</div>
	);
};

export default NeedsUnmet;
