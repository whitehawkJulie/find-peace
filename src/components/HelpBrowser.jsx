import React, { useState, useEffect } from "react";
import { getHelpTopics } from "./HelpIndex";
import "./HelpBrowser.css";

// Recursively extract plain text from a React element tree for full-content search
const extractText = (node) => {
	if (!node) return "";
	if (typeof node === "string" || typeof node === "number") return String(node);
	if (Array.isArray(node)) return node.map(extractText).join(" ");
	if (node.props?.children) return extractText(node.props.children);
	return "";
};

const HelpBrowser = ({ initialTopic, onBack, onTopicClear, onTopicChange }) => {
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState(null);

	const topics = getHelpTopics();

	const selectTopic = (topic) => {
		setSelected(topic);
		onTopicChange?.(topic?.title ?? null);
	};

	// Auto-select topic when opened via a deep link
	useEffect(() => {
		if (initialTopic) {
			const match = topics.find((t) => t.id === initialTopic);
			if (match) selectTopic(match);
		}
	}, [initialTopic]); // eslint-disable-line react-hooks/exhaustive-deps

	const filtered = query.trim()
		? topics.filter((t) => {
				const q = query.toLowerCase();
				return t.title.toLowerCase().includes(q) || extractText(t.content).toLowerCase().includes(q);
		  })
		: topics;

	if (selected) {
		return (
			<div className="help-browser">
				<button
					className="help-browser-back"
					onClick={() => {
						selectTopic(null);
						onTopicClear?.();
					}}>
					← See all topics
				</button>
				<div className="help-browser-content">{selected.content}</div>
			</div>
		);
	}

	return (
		<div className="help-browser">
			<button className="help-browser-back" onClick={onBack}>
				← Back
			</button>
			<input
				className="help-browser-search"
				type="text"
				placeholder="Search topics…"
				value={query}
				onChange={(e) => setQuery(e.target.value)}
				autoFocus
			/>
			<ul className="help-browser-list">
				{filtered.length === 0 && <li className="help-browser-empty">No topics match "{query}"</li>}
				{filtered.map((topic) => (
					<li key={topic.title}>
						<button className="help-browser-item" onClick={() => selectTopic(topic)}>
							{topic.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HelpBrowser;
