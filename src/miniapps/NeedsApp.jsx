import React, { useState, useEffect } from "react";
import Checklist from "../components/Checklist";
import { Needs } from "../data/AllNeedsData";
import { filterByState } from "../utils/renderHelpers";
import "./MiniApp.css";

const NeedsApp = () => {
	const [selected, setSelected] = useState({});
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		document.title = "Needs";
		return () => { document.title = "UntangleThis"; };
	}, []);

	const allSelected = [
		...filterByState(selected, "double-clicked"),
		...filterByState(selected, "clicked"),
	];

	const handleCopy = () => {
		navigator.clipboard.writeText(allSelected.join(", "));
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<div className="mini-app">
			<div className="mini-header">
				<h1 className="mini-title">Needs</h1>
				{allSelected.length > 0 && (
					<button className="mini-copy-btn" onClick={handleCopy}>
						{copied ? "Copied ✓" : `Copy ${allSelected.length} selected`}
					</button>
				)}
			</div>

			<div className="mini-body">
				<Checklist
					data={[
						Needs.sections.connection,
						Needs.sections.meaning,
						Needs.sections.freedom,
						Needs.sections.subsistence,
					]}
					selectedItems={selected}
					setSelectedItems={setSelected}
					type="needs"
					showListModeToggle={true}
					defaultListMode="full"
				/>
			</div>
		</div>
	);
};

export default NeedsApp;
