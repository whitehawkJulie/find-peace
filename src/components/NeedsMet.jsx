import React from "react";
import { useWizard } from "./WizardContext";

const NeedsMet = () => {
	const { needs } = useWizard();

	// Filter for met needs
	const metNeeds = Object.entries(needs)
		.filter(([_, status]) => status === "double-clicked") /* double clicked means met need */
		.map(([need]) => need);

	return (
		<>
			<h2>These needs are being met</h2>
			<p>
				Isn't it lovely to notice that some needs WERE met? Pause for a moment and savour how it feels in your
				body when those needs are met!
			</p>

			{/* replace the following with renderPills */}

			{metNeeds.length > 0 ? (
				<div className="pill-grid cloud">
					{metNeeds.map((need) => (
						<div key={need} className="pill double-clicked need" title="Met need">
							{need}
						</div>
					))}
				</div>
			) : (
				<p>
					<em>No met needs selected.</em>
				</p>
			)}
		</>
	);
};

NeedsMet.title = "Needs that ARE met";
NeedsMet.showHelp = true;
NeedsMet.helpContent = (
	<>
		<p>
			NVC isn't only about what's missing. Noticing which needs <em>are</em> being met — even
			in a painful situation — builds resilience and perspective.
		</p>

		<h4>Why celebrate met needs?</h4>
		<ul>
			<li>
				It shifts us out of pure deficit-thinking. Even in conflict, some needs are alive
				and nourished.
			</li>
			<li>
				Savouring met needs builds our capacity to hold the unmet ones with more
				steadiness.
			</li>
			<li>
				It can reveal what's already working — resources we might overlook when we're in
				pain.
			</li>
		</ul>

		<h4>How to sit with this</h4>
		<p>
			Take a moment with each met need. Notice how it feels in your body when that need is
			met. Let yourself really receive that — it's nourishment for what comes next.
		</p>
	</>
);

export default NeedsMet;
