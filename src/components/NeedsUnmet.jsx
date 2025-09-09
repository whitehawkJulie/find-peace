import React from "react";
import { useWizard } from "./WizardContext";

const NeedsUnmet = () => {
	const { needs } = useWizard();

	// Filter for unmet needs
	const unmetNeeds = Object.entries(needs)
		.filter(([_, status]) => status === "unmet")
		.map(([need]) => need);

	return (
		<>
			<h2>Unmet needs</h2>

			{unmetNeeds.length > 0 ? (
				<div className="pill-grid">
					{unmetNeeds.map((need) => (
						<div key={need} className="pill clicked" title="Unmet need">
							{need}
						</div>
					))}
				</div>
			) : (
				<p>
					<em>No unmet needs selected.</em>
				</p>
			)}
			<p>
				These are the needs that weren't met for you in that moment. If any of these come up often for you, it's
				probable that those particular needs are often unmet for you, that you have "bone dry needs tanks" for
				these. This particular situation won't be the only time this pain arises for you around this need.
				Fortunately, needs are not tied to any one person, place or time ... we can get them met in many, many
				ways! There are two meanings of the phrase "to meet a need" ... living energy of needs etc, and finding
				strategies fo rneeds etc. So let's consider how we might be able to better met those needs in our daily
				lives?
			</p>
		</>
	);
};

NeedsUnmet.showHelp = true;
NeedsUnmet.helpContent = (
	<>
		<p>This step shows the needs you’ve marked as unmet.</p>
		<p>
			Seeing these clearly can help you identify pathways forward—ways to get support, make requests, or care for
			yourself.
		</p>
	</>
);

export default NeedsUnmet;
