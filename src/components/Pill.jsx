import React from "react";
import "./Pill.css"; // uses existing styles

const Pill = ({
	item,
	type = "", // "feeling" or "need"
	state = "", // "", "clicked", or "double-clicked"
	meaning = "", // if defined, will be shown as a tooltip
	onClick = null,
	onDoubleClick = null,
}) => {
	const className = `pill ${type} ${state}`.trim();

	return (
		<div
			className={className}
			onClick={onClick}
			onDoubleClick={(e) => {
				e.preventDefault();
				if (onDoubleClick) onDoubleClick(e);
			}}
			{...(meaning ? { "data-tooltip": meaning } : {})}>
			{item}
		</div>
	);
};

export default Pill;
