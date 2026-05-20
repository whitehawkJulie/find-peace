import React from "react";
import { useWizard } from "../WizardContext";
import "./Collaborate.css";

const ReflectBox = ({ fieldId, label, placeholder }) => {
	const { reflectResponses, setReflectResponse } = useWizard();
	const value = reflectResponses?.[fieldId] ?? "";

	return (
		<div className="collab-input-group">
			<label className="collab-input-label">{label}</label>
			<textarea
				className="collab-textarea"
				placeholder={placeholder}
				value={value}
				onChange={(e) => setReflectResponse(fieldId, e.target.value)}
				rows={3}
			/>
		</div>
	);
};

export default ReflectBox;
