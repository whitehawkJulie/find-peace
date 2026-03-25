import React, { useEffect } from "react";
import { useWizard } from "./WizardContext";
import SummaryContent from "./SummaryContent";
import "./SummaryModal.css";

const SummaryModal = () => {
	const { showSummary, setShowSummary } = useWizard();

	// Close on Escape
	useEffect(() => {
		if (!showSummary) return;
		const handler = (e) => { if (e.key === "Escape") setShowSummary(false); };
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [showSummary, setShowSummary]);

	if (!showSummary) return null;

	return (
		<div className="summary-modal-backdrop" onClick={() => setShowSummary(false)}>
			<div className="summary-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Summary">
				<div className="summary-modal-header">
					<h2>Summary so far</h2>
					<button
						className="summary-modal-close"
						onClick={() => setShowSummary(false)}
						aria-label="Close summary">
						×
					</button>
				</div>
				<div className="summary-modal-body">
					<SummaryContent />
				</div>
			</div>
		</div>
	);
};

export default SummaryModal;
