import React from "react";
import { useWizard } from "./WizardContext";
import { filterByState } from "../utils/renderHelpers";
import "./SavedEntries.css";

export default function SavedEntries() {
	const { savedEntries, loadSession, deleteSession } = useWizard();

	if (savedEntries.length === 0) {
		return (
			<div className="saved-entries">
				<p>No saved sessions yet. When you complete a session and save it from the Review step, it will appear here.</p>
			</div>
		);
	}

	return (
		<div className="saved-entries">
			{savedEntries
				.slice()
				.reverse()
				.map((entry) => {
					const date = new Date(entry.date).toLocaleDateString("en-AU", {
						day: "numeric",
						month: "short",
						year: "numeric",
						hour: "2-digit",
						minute: "2-digit",
					});
					const preview = entry.observation
						? entry.observation.slice(0, 80) + (entry.observation.length > 80 ? "..." : "")
						: "No observation recorded";
					const feelingCount = entry.feelings ? Object.keys(entry.feelings).length : 0;
					const unmetCount = entry.needs ? filterByState(entry.needs, "clicked").length : 0;

					return (
						<div className="saved-card" key={entry.id}>
							<div className="saved-card-header">
								<span className="saved-date">{date}</span>
								<div className="saved-card-actions">
									<button
										className="saved-action-btn load-btn"
										onClick={() => loadSession(entry)}
										title="Load this session"
									>
										Open
									</button>
									<button
										className="saved-action-btn delete-btn"
										onClick={() => {
											if (window.confirm("Delete this saved session?")) {
												deleteSession(entry.id);
											}
										}}
										title="Delete this session"
									>
										×
									</button>
								</div>
							</div>
							<p className="saved-preview">{preview}</p>
							<div className="saved-stats">
								{feelingCount > 0 && <span>{feelingCount} feelings</span>}
								{unmetCount > 0 && <span>{unmetCount} unmet needs</span>}
							</div>
						</div>
					);
				})}
		</div>
	);
}
