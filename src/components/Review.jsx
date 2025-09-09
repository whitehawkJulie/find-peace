import React from "react";
import { useWizard } from "./WizardContext";

const Review = () => {
	const { observation, feelings, needs } = useWizard();

	const clickedFeelings = Object.entries(feelings)
		.filter(([, status]) => status === "click" || status === "double")
		.map(([feeling]) => feeling);

	const strongFeelings = Object.entries(feelings)
		.filter(([, status]) => status === "double")
		.map(([feeling]) => feeling);

	const metNeeds = Object.entries(needs)
		.filter(([, status]) => status === "click")
		.map(([need]) => need);

	const unmetNeeds = Object.entries(needs)
		.filter(([, status]) => status === "double")
		.map(([need]) => need);

	return (
		<div className="review">
			<h3>Observation</h3>
			<p>{observation || "No observation entered."}</p>

			<h3>Feelings</h3>
			{clickedFeelings.length === 0 ? (
				<p>No feelings selected.</p>
			) : (
				<p>
					You’re feeling{" "}
					{clickedFeelings.map((feeling, index) => {
						const isStrong = strongFeelings.includes(feeling);
						return (
							<span key={feeling}>
								{isStrong ? <strong>{feeling}</strong> : feeling}
								{index < clickedFeelings.length - 1 ? ", " : ""}
							</span>
						);
					})}
				</p>
			)}

			<h3>Needs</h3>
			{metNeeds.length > 0 && (
				<>
					<p>
						<strong>Met needs:</strong> {metNeeds.join(", ")}
					</p>
				</>
			)}
			{unmetNeeds.length > 0 && (
				<>
					<p>
						<strong>Unmet needs:</strong> {unmetNeeds.join(", ")}
					</p>
				</>
			)}
			{metNeeds.length === 0 && unmetNeeds.length === 0 && <p>No needs selected.</p>}
		</div>
	);
};

export default Review;
