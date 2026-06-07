import React, { useState, useMemo } from "react";
import { useGratitude } from "./GratitudeContext";
import allNeeds from "../data/AllNeedsFlat";
import { FeelingsMet } from "../data/FeelingsMet";
import "./GratitudeImport.css";

// ── Build lookup sets (lowercase for case-insensitive matching) ──

const VALID_NEEDS = new Set(allNeeds.map((n) => n.label.toLowerCase()));
const VALID_FEELINGS = new Set(
	Object.values(FeelingsMet.groups).flatMap((g) => g.items.map((i) => i.item.toLowerCase()))
);

// Return the canonical-cased label for a need, or null
const canonicalNeed = (raw) => {
	const lower = raw.toLowerCase();
	const match = allNeeds.find((n) => n.label.toLowerCase() === lower);
	return match ? match.label : null;
};

// Return the canonical-cased feeling item, or null
const canonicalFeeling = (raw) => {
	const lower = raw.toLowerCase();
	for (const group of Object.values(FeelingsMet.groups)) {
		const item = group.items.find((i) => i.item.toLowerCase() === lower);
		if (item) return item.item;
	}
	return null;
};

const parseLine = (line) =>
	line
		.split(",")
		.map((s) => s.trim())
		.filter(Boolean);

const parseImport = (text) => {
	const lines = text.split("\n").map((l) => l.trim());
	const [obsLine = "", feelingsLine = "", needsLine = ""] = lines;

	const rawFeelings = parseLine(feelingsLine);
	const rawNeeds = parseLine(needsLine);

	const matchedFeelings = [];
	const unknownFeelings = [];
	rawFeelings.forEach((f) => {
		const c = canonicalFeeling(f);
		if (c) matchedFeelings.push(c);
		else unknownFeelings.push(f);
	});

	const matchedNeeds = [];
	const unknownNeeds = [];
	rawNeeds.forEach((n) => {
		const c = canonicalNeed(n);
		if (c) matchedNeeds.push(c);
		else unknownNeeds.push(n);
	});

	return { observation: obsLine, matchedFeelings, unknownFeelings, matchedNeeds, unknownNeeds };
};

// ── Component ──

const GratitudeImport = ({ onClose }) => {
	const { savedEntries, setSavedEntries } = useGratitude();
	const [text, setText] = useState("");
	const [imported, setImported] = useState(false);

	const parsed = useMemo(() => (text.trim() ? parseImport(text) : null), [text]);

	const hasContent = parsed && (parsed.observation || parsed.matchedFeelings.length > 0 || parsed.matchedNeeds.length > 0);
	const hasWarnings = parsed && (parsed.unknownFeelings.length > 0 || parsed.unknownNeeds.length > 0);

	const handleImport = () => {
		if (!parsed) return;

		const feelingsObj = {};
		parsed.matchedFeelings.forEach((f) => { feelingsObj[f] = "clicked"; });

		const needsObj = {};
		parsed.matchedNeeds.forEach((n) => { needsObj[n] = "clicked"; });

		const entry = {
			id: Date.now(),
			date: new Date().toISOString(),
			observation: parsed.observation,
			feelings: feelingsObj,
			needs: needsObj,
			reviewReflection: "",
		};

		const updated = [entry, ...savedEntries];
		setSavedEntries(updated);
		localStorage.setItem("gratitudeSessions", JSON.stringify(updated));
		setImported(true);
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
						<button className="gi-btn-primary" onClick={() => { setText(""); setImported(false); }}>
							Import another
						</button>
						<button className="gi-btn-secondary" onClick={onClose}>
							Done
						</button>
					</div>
				) : (
					<>
						<p className="gi-instructions">
							Paste your entry below — one piece per line:
						</p>
						<ol className="gi-format">
							<li><strong>Observation</strong> — what happened</li>
							<li><strong>Feelings</strong> — comma-separated</li>
							<li><strong>Needs</strong> — comma-separated</li>
						</ol>

						<textarea
							className="gi-textarea"
							rows={6}
							placeholder={"My friend surprised me with a home-cooked meal.\ngrateful, touched, warm\ncare, belonging, support"}
							value={text}
							onChange={(e) => setText(e.target.value)}
						/>

						{parsed && hasContent && (
							<div className="gi-preview">
								<p className="gi-preview-label">Preview</p>

								{parsed.observation && (
									<div className="gi-preview-row">
										<span className="gi-preview-key">What happened: </span>
										<span>{parsed.observation}</span>
									</div>
								)}

								{parsed.matchedFeelings.length > 0 && (
									<div className="gi-preview-row">
										<span className="gi-preview-key">Feelings: </span>
										<span>{parsed.matchedFeelings.join(", ")}</span>
									</div>
								)}

								{parsed.matchedNeeds.length > 0 && (
									<div className="gi-preview-row">
										<span className="gi-preview-key">Needs: </span>
										<span>{parsed.matchedNeeds.join(", ")}</span>
									</div>
								)}

								{hasWarnings && (
									<div className="gi-warnings">
										{parsed.unknownFeelings.length > 0 && (
											<p className="gi-warning">
												⚠ These feelings weren't recognised and will be skipped:{" "}
												<strong>{parsed.unknownFeelings.join(", ")}</strong>
											</p>
										)}
										{parsed.unknownNeeds.length > 0 && (
											<p className="gi-warning">
												⚠ These needs weren't recognised and will be skipped:{" "}
												<strong>{parsed.unknownNeeds.join(", ")}</strong>
											</p>
										)}
									</div>
								)}

								<button className="gi-btn-primary" onClick={handleImport}>
									{hasWarnings ? "Import anyway" : "Import entry"}
								</button>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default GratitudeImport;
