import React, { useState, useEffect, useRef } from "react";
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

const HelpBrowser = ({ initialTopic, directOpen, onBack, onTopicChange }) => {
	const [query, setQuery] = useState("");
	const topics = getHelpTopics();

	// Initialise directly from initialTopic (avoids mount effect + StrictMode double-invoke)
	const [selected, setSelected] = useState(() =>
		initialTopic ? (topics.find((t) => t.id === initialTopic) || null) : null
	);
	const [history, setHistory] = useState([]);

	// Ref so change-effect can read current selected without stale closure
	const selectedRef = useRef(selected);
	selectedRef.current = selected;

	// Ref to detect genuine changes to initialTopic (not StrictMode remounts)
	const prevInitialTopicRef = useRef(initialTopic);

	// Notify parent of the initial topic title (if opened directly to a topic)
	useEffect(() => {
		if (selected) onTopicChange?.(selected.title);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// When initialTopic changes after mount (HelpLink clicked from inside a topic)
	useEffect(() => {
		if (initialTopic === prevInitialTopicRef.current) return;
		prevInitialTopicRef.current = initialTopic;
		if (!initialTopic) return;
		const match = topics.find((t) => t.id === initialTopic);
		if (!match) return;
		setHistory((h) => [...h, selectedRef.current]);
		setSelected(match);
		onTopicChange?.(match.title);
	}, [initialTopic]); // eslint-disable-line react-hooks/exhaustive-deps

	const goBack = () => {
		if (history.length === 0) {
			onBack?.();
			return;
		}
		const prev = history[history.length - 1];
		setHistory((h) => h.slice(0, -1));
		setSelected(prev);
		onTopicChange?.(prev?.title ?? null);
	};

	const backLabel =
		history.length === 0
			? "← Back"
			: history[history.length - 1] === null
			? "← All topics"
			: `← ${history[history.length - 1].title}`;

	const filtered = query.trim()
		? topics.filter((t) => {
				const q = query.toLowerCase();
				return t.title.toLowerCase().includes(q) || extractText(t.content).toLowerCase().includes(q);
		  })
		: topics;

	if (selected) {
		const showBack = history.length > 0 || !directOpen;
		return (
			<div className="help-browser">
				{showBack && (
					<button className="help-browser-back" onClick={goBack}>
						{backLabel}
					</button>
				)}
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
						<button
							className="help-browser-item"
							onClick={() => {
								setHistory((h) => [...h, selected]);
								setSelected(topic);
								onTopicChange?.(topic.title);
							}}>
							{topic.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HelpBrowser;
