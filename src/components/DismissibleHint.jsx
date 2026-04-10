import React, { useState } from "react";
import "./DismissibleHint.css";

const STORAGE_KEY = "findPeaceHints";

function getDismissed() {
	try {
		return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
	} catch {
		return {};
	}
}

const DismissibleHint = ({ id, children }) => {
	const [dismissed, setDismissed] = useState(() => getDismissed()[id] === true);

	if (dismissed) return null;

	const dismiss = () => {
		const current = getDismissed();
		localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [id]: true }));
		setDismissed(true);
	};

	return (
		<div className="dismissible-hint">
			<span className="dismissible-hint-content">{children}</span>
			<button className="dismissible-hint-close" onClick={dismiss} aria-label="Dismiss hint">
				×
			</button>
		</div>
	);
};

export default DismissibleHint;
