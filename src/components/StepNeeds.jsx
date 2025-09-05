import React from "react";

export default function StepNeeds({ needs, onChange }) {
	return (
		<>
			<div className="card">
				<h2>Step 3: Needs</h2>
				<label htmlFor="needs">What needs were behind those feelings?</label>
				<textarea
					id="needs"
					rows={4}
					value={needs}
					onChange={(e) => onChange(e.target.value)}
					placeholder="e.g. Support, understanding, safety..."
				/>
			</div>
		</>
	);
}
