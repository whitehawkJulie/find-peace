import React, { useState, useEffect, lazy, Suspense } from "react";
import { useWizard } from "./WizardContext";
import "./SlideDrawer.css";

// Dynamically import HelpBrowser to avoid circular dependency at module load time
const HelpBrowser = lazy(() => import("./HelpBrowser"));

const SlideDrawer = ({ isOpen, onClose, title, children, showBrowse = false }) => {
	const { helpTopic, setHelpTopic } = useWizard();
	const [browsing, setBrowsing] = useState(false);

	// Auto-enter browse mode when a specific topic is requested
	useEffect(() => {
		if (helpTopic && isOpen) setBrowsing(true);
	}, [helpTopic, isOpen]);

	// Reset browsing state and clear topic when drawer closes
	useEffect(() => {
		if (!isOpen) {
			setBrowsing(false);
			setHelpTopic(null);
		}
	}, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{isOpen && <div className="slide-panel-backdrop" onClick={onClose} />}
			<div className={`slide-panel ${isOpen ? "show" : ""}`}>
				<div className="slide-panel-header">
					<h3>{browsing ? "All Help Topics" : title}</h3>
					<button className="close-button" onClick={onClose}>
						×
					</button>
				</div>
				<div className="slide-panel-content">
					{browsing ? (
						<Suspense fallback={<p style={{ color: "#999", fontSize: "0.9rem" }}>Loading…</p>}>
							<HelpBrowser initialTopic={helpTopic} onBack={() => setBrowsing(false)} />
						</Suspense>
					) : (
						<>
							{children}
							{showBrowse && (
								<div className="slide-panel-browse">
									<button
										className="slide-panel-browse-btn"
										onClick={() => setBrowsing(true)}>
										Browse all help topics →
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default SlideDrawer;
