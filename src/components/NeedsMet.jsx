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

			{metNeeds.length > 0 ? (
				<div className="pill-grid">
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
		<p>This step shows the needs you've marked as met (via double-clicked).</p>
		<p>
			Recognizing met needs can be just as valuable as identifying unmet ones. It helps you see what’s working and
			what resources you already have.
		</p>
	</>
);

export default NeedsMet;
