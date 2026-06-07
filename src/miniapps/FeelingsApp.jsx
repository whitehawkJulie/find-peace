import React, { useState, useEffect } from "react";
import Checklist from "../components/Checklist";
import { AllFeelingsData } from "../data/AllFeelingsData";
import { filterByState } from "../utils/renderHelpers";
import "./MiniApp.css";

const FeelingsApp = () => {
	const [unmetSelected, setUnmetSelected] = useState({});
	const [metSelected, setMetSelected] = useState({});
	const [unmetOpen, setUnmetOpen] = useState(true);
	const [metOpen, setMetOpen] = useState(true);
	const [copied, setCopied] = useState(false);

	useEffect(() => {
		document.title = "Feelings";
		return () => { document.title = "UntangleThis"; };
	}, []);

	const allSelected = [
		...filterByState(unmetSelected, "double-clicked"),
		...filterByState(unmetSelected, "clicked"),
		...filterByState(metSelected, "double-clicked"),
		...filterByState(metSelected, "clicked"),
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
				<div className="mini-section">
					<button className="mini-section-toggle" onClick={() => setUnmetOpen((o) => !o)}>
						<span>When needs aren't met</span>
						<span className="mini-toggle-icon">{unmetOpen ? "▲" : "▼"}</span>
					</button>
					{unmetOpen && (
						<div className="step-feelings">
							<Checklist
								data={[AllFeelingsData.sections.feelings]}
								selectedItems={unmetSelected}
								setSelectedItems={setUnmetSelected}
								type="feelings"
								showListModeToggle={true}
								defaultListMode="short"
							/>
						</div>
					)}
				</div>

				<div className="mini-section">
					<button className="mini-section-toggle" onClick={() => setMetOpen((o) => !o)}>
						<span>When needs are met</span>
						<span className="mini-toggle-icon">{metOpen ? "▲" : "▼"}</span>
					</button>
					{metOpen && (
						<div className="step-feelings">
							<Checklist
								data={[AllFeelingsData.sections.feelingsMet]}
								selectedItems={metSelected}
								setSelectedItems={setMetSelected}
								type="feelings"
								showListModeToggle={true}
								defaultListMode="short"
							/>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default FeelingsApp;
