import React from "react";
import { useWizard } from "../WizardContext";
import "./Collaborate.css";

const ReflectBox = ({ fieldId, label, placeholder }) => {
	const { meetMyNeedsResponses, setMeetMyNeedsResponse } = useWizard();
	const value = meetMyNeedsResponses?.[fieldId] ?? "";

	return (
		<div className="collab-input-group">
			<label className="collab-input-label">{label}</label>
			<textarea
				className="collab-textarea"
				placeholder={placeholder}
				value={value}
				onChange={(e) => setMeetMyNeedsResponse(fieldId, e.target.value)}
				rows={3}
			/>
		</div>
	);
};

export default ReflectBox;
