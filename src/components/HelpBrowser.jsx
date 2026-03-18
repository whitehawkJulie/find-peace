import React, { useState, useEffect } from "react";
import { useWizard } from "./WizardContext";
import { getHelpTopics } from "./HelpIndex";
import "./HelpBrowser.css";

const HelpBrowser = ({ initialTopic, onBack }) => {
	const { setHelpTopic } = useWizard();
	const [query, setQuery] = useState("");
	const [selected, setSelected] = useState(null);

	const topics = getHelpTopics();

	// Auto-select topic when opened via a deep link
	useEffect(() => {
		if (initialTopic) {
			const match = topics.find((t) => t.id === initialTopic);
			if (match) setSelected(match);
		}
	}, [initialTopic]); // eslint-disable-line react-hooks/exhaustive-deps
	const filtered = query.trim()
		? topics.filter((t) => t.title.toLowerCase().includes(query.toLowerCase()))
		: topics;

	if (selected) {
		return (
			<div className="help-browser">
				<button className="help-browser-back" onClick={() => { setSelected(null); setHelpTopic(null); }}>
					← Back to topics
				</button>
				<h4 className="help-browser-topic-title">{selected.title}</h4>
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
				{filtered.length === 0 && (
					<li className="help-browser-empty">No topics match "{query}"</li>
				)}
				{filtered.map((topic) => (
					<li key={topic.title}>
						<button
							className="help-browser-item"
							onClick={() => setSelected(topic)}>
							{topic.title}
						</button>
					</li>
				))}
			</ul>
		</div>
	);
};

export default HelpBrowser;
