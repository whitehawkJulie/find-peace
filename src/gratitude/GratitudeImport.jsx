import React, { useState, useMemo } from "react";
import { useGratitude } from "./GratitudeContext";
import allNeeds from "../data/AllNeedsFlat";
import { FeelingsMet } from "../data/FeelingsMet";
import "./GratitudeImport.css";

// ── Build lookup sets (lowercase for case-insensitive matching) ──

const canonicalNeed = (raw) => {
	const lower = raw.toLowerCase();
	const match = allNeeds.find((n) => n.label.toLowerCase() === lower);
	return match ? match.label : null;
};

const canonicalFeeling = (raw) => {
	const lower = raw.toLowerCase();
	for (const group of Object.values(FeelingsMet.groups)) {
		const item = group.items.find((i) => i.item.toLowerCase() === lower);
		if (item) return item.item;
	}
	return null;
};

const parseCSV = (text) =>
	text.split(",").map((s) => s.trim()).filter(Boolean);

const validateFeelings = (raw) => {
	const matched = [], unknown = [];
	parseCSV(raw).forEach((f) => {
		const c = canonicalFeeling(f);
		if (c) matched.push(c); else unknown.push(f);
	});
	return { matched, unknown };
};

const validateNeeds = (raw) => {
	const matched = [], unknown = [];
	parseCSV(raw).forEach((n) => {
		const c = canonicalNeed(n);
		if (c) matched.push(c); else unknown.push(n);
	});
	return { matched, unknown };
};

// ── Component ──

const GratitudeImport = ({ onClose }) => {
	const { savedEntries, setSavedEntries } = useGratitude();
	const [observation, setObservation] = useState("");
	const [feelingsText, setFeelingsText] = useState("");
	const [needsText, setNeedsText] = useState("");
	const [imported, setImported] = useState(false);

	const feelings = useMemo(() => validateFeelings(feelingsText), [feelingsText]);
	const needs = useMemo(() => validateNeeds(needsText), [needsText]);

	const hasContent = observation.trim() || feelings.matched.length > 0 || needs.matched.length > 0;
	const hasWarnings = feelings.unknown.length > 0 || needs.unknown.length > 0;

	const handleImport = () => {
		const feelingsObj = {};
		feelings.matched.forEach((f) => { feelingsObj[f] = "clicked"; });

		const needsObj = {};
		needs.matched.forEach((n) => { needsObj[n] = "clicked"; });

		const entry = {
			id: Date.now(),
			date: new Date().toISOString(),
			observation: observation.trim(),
			feelings: feelingsObj,
			needs: needsObj,
			reviewReflection: "",
		};

		const updated = [entry, ...savedEntries];
		setSavedEntries(updated);
		localStorage.setItem("gratitudeSessions", JSON.stringify(updated));
		setImported(true);
	};

	const handleImportAnother = () => {
		setObservation("");
		setFeelingsText("");
		setNeedsText("");
		setImported(false);
	};

	return (
		<div className="gi-panel">
			<div className="gi-header">
				<h2>Import an entry</h2>
				<button className="gi-close" onClick={onClose} aria-label="Close">×</button>
			</div>

			<div className="gi-body">
				{imported ? (
					<div className="gi-success">
						<p className="gi-success-icon">✓</p>
						<p className="gi-success-text">Entry imported!</p>
						<button className="gi-btn-primary" onClick={handleImportAnother}>Import another</button>
						<button className="gi-btn-secondary" onClick={onClose}>Done</button>
					</div>
				) : (
					<>
						<div className="gi-field">
							<label className="gi-label">What happened</label>
							<textarea
								className="gi-textarea"
								rows={3}
								placeholder="Describe what you're grateful for…"
								value={observation}
								onChange={(e) => setObservation(e.target.value)}
							/>
						</div>

						<div className="gi-field">
							<label className="gi-label">Feelings <span className="gi-label-hint">comma-separated</span></label>
							<textarea
								className="gi-textarea"
								rows={2}
								placeholder="e.g. grateful, touched, warm"
								value={feelingsText}
								onChange={(e) => setFeelingsText(e.target.value)}
							/>
							{feelings.matched.length > 0 && (
								<p className="gi-matched">✓ {feelings.matched.join(", ")}</p>
							)}
							{feelings.unknown.length > 0 && (
								<p className="gi-warning">⚠ Not recognised, will be skipped: <strong>{feelings.unknown.join(", ")}</strong></p>
							)}
						</div>

						<div className="gi-field">
							<label className="gi-label">Needs met <span className="gi-label-hint">comma-separated</span></label>
							<textarea
								className="gi-textarea"
								rows={2}
								placeholder="e.g. care, belonging, support"
								value={needsText}
								onChange={(e) => setNeedsText(e.target.value)}
							/>
							{needs.matched.length > 0 && (
								<p className="gi-matched">✓ {needs.matched.join(", ")}</p>
							)}
							{needs.unknown.length > 0 && (
								<p className="gi-warning">⚠ Not recognised, will be skipped: <strong>{needs.unknown.join(", ")}</strong></p>
							)}
						</div>

						{hasContent && (
							<button className="gi-btn-primary" onClick={handleImport}>
								{hasWarnings ? "Import anyway" : "Import entry"}
							</button>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default GratitudeImport;
