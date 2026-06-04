import React, { useState } from "react";
import { useGratitude } from "./GratitudeContext";
import { filterByState } from "../utils/renderHelpers";
import "./GratitudeHistory.css";

const formatDate = (isoString) => {
	const d = new Date(isoString);
	return d.toLocaleDateString(undefined, {
		weekday: "short", day: "numeric", month: "short", year: "numeric",
		hour: "2-digit", minute: "2-digit",
	});
};

const EntryCard = ({ entry, onDelete }) => {
	const [confirmDelete, setConfirmDelete] = useState(false);

	const allFeelings = [
		...filterByState(entry.feelings, "double-clicked"),
		...filterByState(entry.feelings, "clicked"),
	];
	const allNeeds = [
		...filterByState(entry.needs, "double-clicked"),
		...filterByState(entry.needs, "clicked"),
	];

	return (
		<div className="gh-entry">
			<div className="gh-entry-date">{formatDate(entry.date)}</div>

			{entry.observation?.trim() && (
				<p className="gh-entry-obs">{entry.observation.trim()}</p>
			)}

			{allFeelings.length > 0 && (
				<div className="gh-entry-row">
					<span className="gh-entry-label">Felt: </span>
					<span className="gh-entry-values">{allFeelings.join(", ")}</span>
				</div>
			)}

			{allNeeds.length > 0 && (
				<div className="gh-entry-row">
					<span className="gh-entry-label">Needs met: </span>
					<span className="gh-entry-values">{allNeeds.join(", ")}</span>
				</div>
			)}

			{entry.reviewReflection?.trim() && (
				<p className="gh-entry-reflection">"{entry.reviewReflection.trim()}"</p>
			)}

			<div className="gh-entry-footer">
				{confirmDelete ? (
					<>
						<span className="gh-delete-confirm-text">Delete this entry?</span>
						<button className="gh-btn-delete-confirm" onClick={() => onDelete(entry.id)}>Yes, delete</button>
						<button className="gh-btn-cancel" onClick={() => setConfirmDelete(false)}>Cancel</button>
					</>
				) : (
					<button className="gh-btn-delete" onClick={() => setConfirmDelete(true)}>Delete</button>
				)}
			</div>
		</div>
	);
};

const GratitudeHistory = () => {
	const { setShowHistory, savedEntries, deleteEntry } = useGratitude();

	return (
		<div className="gh-backdrop" onClick={() => setShowHistory(false)}>
			<div className="gh-panel" onClick={(e) => e.stopPropagation()}>
				<div className="gh-header">
					<h2>Past entries</h2>
					<button className="gh-close" onClick={() => setShowHistory(false)} aria-label="Close">×</button>
				</div>

				<div className="gh-body">
					{savedEntries.length === 0 ? (
						<p className="gh-empty">No saved entries yet. Save your first one from the Done page or summary.</p>
					) : (
						savedEntries.map((entry) => (
							<EntryCard key={entry.id} entry={entry} onDelete={deleteEntry} />
						))
					)}
				</div>
			</div>
		</div>
	);
};

export default GratitudeHistory;
