import React, { useState } from "react";
import { useGratitude } from "./GratitudeContext";
import { filterByState } from "../utils/renderHelpers";
import GratitudeImport from "./GratitudeImport";
import "./GratitudeHistory.css";

const formatDate = (isoString) => {
	const d = new Date(isoString);
	return d.toLocaleDateString(undefined, {
		weekday: "short", day: "numeric", month: "short", year: "numeric",
		hour: "2-digit", minute: "2-digit",
	});
};

// Collect all unique needs across entries, sorted alphabetically
const collectAllNeeds = (entries) => {
	const needSet = new Set();
	entries.forEach((entry) => {
		[...filterByState(entry.needs, "double-clicked"), ...filterByState(entry.needs, "clicked")]
			.forEach((n) => needSet.add(n));
	});
	return [...needSet].sort();
};

const EntryCard = ({ entry, onDelete, highlightNeed }) => {
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
					<span className="gh-entry-values">
						{allNeeds.map((n, i) => (
							<span key={n}>
								{i > 0 && ", "}
								<span className={n === highlightNeed ? "gh-need-highlight" : ""}>{n}</span>
							</span>
						))}
					</span>
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

// The detail panel — slides in on top from the right
const NeedDetailPanel = ({ need, entries, onClose, onDelete }) => {
	const filtered = need === "All"
		? entries
		: entries.filter((e) =>
			filterByState(e.needs, "double-clicked").includes(need) ||
			filterByState(e.needs, "clicked").includes(need)
		);

	return (
		<div className={`gh-detail-panel gh-detail-panel--open`}>
			<div className="gh-header">
				<button className="gh-back" onClick={onClose} aria-label="Back">‹</button>
				<h2>{need === "All" ? "All entries" : `"${need}"`}</h2>
				<button className="gh-close" onClick={onClose} aria-label="Close">×</button>
			</div>

			{need !== "All" && (
				<p className="gh-detail-subtitle">Entries where this need was met</p>
			)}

			<div className="gh-body">
				{filtered.length === 0 ? (
					<p className="gh-empty">No entries found.</p>
				) : (
					filtered.map((entry) => (
						<EntryCard
							key={entry.id}
							entry={entry}
							onDelete={onDelete}
							highlightNeed={need !== "All" ? need : null}
						/>
					))
				)}
			</div>
		</div>
	);
};

const GratitudeHistory = () => {
	const { setShowHistory, savedEntries, deleteEntry } = useGratitude();
	const [selectedNeed, setSelectedNeed] = useState(null);
	const [showImport, setShowImport] = useState(false);

	const allNeeds = collectAllNeeds(savedEntries);

	const handleSelectNeed = (need) => {
		setSelectedNeed(need);
	};

	const handleCloseDetail = () => {
		setSelectedNeed(null);
	};

	return (
		<>
			<div className="gh-backdrop" onClick={() => setShowHistory(false)} />

			<div className="gh-panel">
				<div className="gh-header">
					<h2>Past entries</h2>
					<button className="gh-import-btn" onClick={() => setShowImport(true)}>Import</button>
					<button className="gh-close" onClick={() => setShowHistory(false)} aria-label="Close">×</button>
				</div>

				<div className="gh-body">
					{savedEntries.length === 0 ? (
						<p className="gh-empty">No saved entries yet. Save your first one from the Done page or summary.</p>
					) : (
						<>
							{/* Needs cloud */}
							<div className="gh-needs-cloud">
								<p className="gh-needs-cloud-label">Explore by need</p>
								<div className="gh-needs-pills">
									<button
										className="gh-need-pill gh-need-pill--all"
										onClick={() => handleSelectNeed("All")}
									>
										All
									</button>
									{allNeeds.map((need) => (
										<button
											key={need}
											className="gh-need-pill"
											onClick={() => handleSelectNeed(need)}
										>
											{need}
										</button>
									))}
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			{/* Detail panel slides in on top */}
			{selectedNeed && (
				<NeedDetailPanel
					need={selectedNeed}
					entries={savedEntries}
					onClose={handleCloseDetail}
					onDelete={deleteEntry}
				/>
			)}

			{/* Import panel slides in on top */}
			{showImport && <GratitudeImport onClose={() => setShowImport(false)} />}
		</>
	);
};

export default GratitudeHistory;
