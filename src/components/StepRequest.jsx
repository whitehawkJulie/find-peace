import React from "react";

export default function StepRequest({ request, onChange }) {
	return (
		<>
			<div className="card">
				<h2>Step 4: Request</h2>
				<label htmlFor="request">What would you like to ask for?</label>
				<textarea
					id="request"
					rows={4}
					value={request}
					onChange={(e) => onChange(e.target.value)}
					placeholder="e.g. Could we talk again tomorrow?"
				/>
			</div>
		</>
	);
}
