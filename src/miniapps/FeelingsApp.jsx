import React, { useState, useEffect } from "react";
import Checklist from "../components/Checklist";
import { AllFeelingsData } from "../data/AllFeelingsData";
import { filterByState } from "../utils/renderHelpers";
import "./MiniApp.css";

const FeelingsApp = () => {
	const [unmetSelected, setUnmetSelected] = useState({});
	const [metSelected, setMetSelected] = useState({});
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		document.title = "Feelings";
		return () => { document.title = "UntangleThis"; };
	}, []);

	const allSelected = [
		...filterByState(unmetSelected, "double-clicked"),
		...filterByState(unmetSelected, "clicked"),
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
				<div className="step-feelings">
					<Checklist
						data={[AllFeelingsData.sections.feelings, AllFeelingsData.sections.feelingsMet]}
						selectedItems={unmetSelected}
						setSelectedItems={setUnmetSelected}
						type="feelings"
						showListModeToggle={true}
						defaultListMode="short"
					/>
				</div>
			</div>
		</div>
	);
};

export default FeelingsApp;
