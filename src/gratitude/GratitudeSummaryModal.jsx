import React, { useState } from "react";
import { useGratitude } from "./GratitudeContext";
import { filterByState } from "../utils/renderHelpers";
import "./GratitudeSummaryModal.css";

const GratitudeSummaryModal = () => {
	const {
		setShowSummary,
		observation,
		feelings,
		needs,
		reviewReflection,
	} = useGratitude();

	const [copied, setCopied] = useState(false);

	const allFeelings = [
		...filterByState(feelings, "double-clicked"),
		...filterByState(feelings, "clicked"),
	];
	const strongNeeds = filterByState(needs, "double-clicked");
	const normalNeeds = filterByState(needs, "clicked");
	const allNeeds = [...strongNeeds, ...normalNeeds];

	const handleCopy = () => {
		const lines = [];
		const heading = (t) => lines.push("", `— ${t} —`, "");

		heading("What I'm grateful for");
		if (observation?.trim()) lines.push(observation.trim(), "");

		heading("How it felt");
		if (allFeelings.length > 0) lines.push(allFeelings.join(", "), "");

		heading("Needs that were met");
		if (allNeeds.length > 0) lines.push(allNeeds.join(", "), "");

		if (reviewReflection?.trim()) {
			lines.push("", `Reflection: ${reviewReflection.trim()}`);
		}

		navigator.clipboard.writeText(lines.join("\n")).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2500);
		});
	};

	const renderFeelingName = (name) =>
		feelings[name] === "double-clicked" ? <strong key={name}>{name}</strong> : <span key={name}>{name}</span>;

	const renderNeedName = (name) =>
		needs[name] === "double-clicked" ? <strong key={name}>{name}</strong> : <span key={name}>{name}</span>;

	const interleave = (arr, renderFn) =>
		arr.map((name, i) => (
			<React.Fragment key={name}>
				{i > 0 && ", "}
				{renderFn(name)}
			</React.Fragment>
		));

	return (
		<div className="g-summary-backdrop" onClick={() => setShowSummary(false)}>
			<div className="g-summary-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
				<div className="g-summary-header">
					<h2>Your gratitude</h2>
					<button className="g-summary-close" onClick={() => setShowSummary(false)} aria-label="Close">×</button>
				</div>

				<div className="g-summary-body">
					{observation?.trim() && (
						<section className="g-summary-section">
							<h3>What I'm grateful for</h3>
							<p>{observation.trim()}</p>
						</section>
					)}

					{allFeelings.length > 0 && (
						<section className="g-summary-section">
							<h3>How it felt</h3>
							<p>{interleave(allFeelings, renderFeelingName)}</p>
						</section>
					)}

					{allNeeds.length > 0 && (
						<section className="g-summary-section">
							<h3>Needs that were met</h3>
							<p>{interleave(allNeeds, renderNeedName)}</p>
						</section>
					)}

					{reviewReflection?.trim() && (
						<section className="g-summary-section">
							<h3>Reflection</h3>
							<p>{reviewReflection.trim()}</p>
						</section>
					)}
				</div>

				<div className="g-summary-footer">
					<button className="g-summary-btn g-summary-copy" onClick={handleCopy}>
						<span className="g-summary-btn-label">{copied ? "✓ Copied!" : "📋 Copy"}</span>
						<span className="g-summary-btn-sub">as plain text</span>
					</button>
					<button className="g-summary-btn g-summary-close-btn" onClick={() => setShowSummary(false)}>
						<span className="g-summary-btn-label">✕ Close</span>
						<span className="g-summary-btn-sub">summary</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default GratitudeSummaryModal;
