import React from "react";

export default function Request({ request, onChange }) {
	return (
		<>
			<div className="card">
				<h2>Step 4: Request</h2>
				<p>
					Note to self: add some stuff here about request of self vs request of other, making clear requests
					etc. Do the cards need an option for whether they're doing OFNR for self or other?
				</p>
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
