import React, { useState, useEffect } from "react";
import Checklist from "../components/Checklist";
import { AllFeelingsData } from "../data/AllFeelingsData";
import { filterByState } from "../utils/renderHelpers";
import "./MiniApp.css";

const FeelingsApp = () => {
	const [selected, setSelected] = useState({});
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		document.title = "Feelings";
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
				<h1 className="mini-title">Feelings</h1>
				{allSelected.length > 0 && (
					<button className="mini-copy-btn" onClick={handleCopy}>
						{copied ? "Copied ✓" : `Copy ${allSelected.length} selected`}
					</button>
				)}
			</div>

			<div className="mini-body">
				<Checklist
					data={[AllFeelingsData.sections.feelings]}
					selectedItems={selected}
					setSelectedItems={setSelected}
					type="feelings"
					showListModeToggle={true}
					defaultListMode="short"
				/>
			</div>
		</div>
	);
};

export default FeelingsApp;
