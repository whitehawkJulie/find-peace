import React, { useEffect } from "react";
import { useWizard } from "./WizardContext";
import SavedEntries from "./SavedEntries";
import "./OpenDrawer.css";

const OpenDrawer = () => {
	const { showOpen, setShowOpen } = useWizard();
	const close = () => setShowOpen(false);

	useEffect(() => {
		if (!showOpen) return;
		const handler = (e) => { if (e.key === "Escape") close(); };
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [showOpen]);

	if (!showOpen) return null;

	return (
		<div className="open-modal-backdrop" onClick={close}>
			<div
				className="open-modal"
				onClick={(e) => e.stopPropagation()}
				role="dialog"
				aria-modal="true"
				aria-label="Open saved session">
				<div className="open-modal-header">
					<h2>Saved sessions</h2>
					<button className="open-modal-close" onClick={close} aria-label="Close">×</button>
				</div>
				<div className="open-modal-body">
					<SavedEntries onSessionLoaded={close} />
				</div>
			</div>
		</div>
	);
};

export default OpenDrawer;
