import React, { useState } from "react";
import "./Needs.css";
import needsData from "./NeedsData";

import SlideDrawer from "./SlideDrawer";
import Checklist from "./Checklist";

const Needs = ({ needs, setNeeds, feelings }) => {
	const [showHelp, setShowHelp] = useState(false);

	const feelingWords = Object.keys(feelings).filter((key) => feelings[key] === "unmet");
	console.log("Got: " + feelings);

	return (
		<div className="step-needs">
			<div className="card-header">
				<div className="card-title-with-icon">
					<h2>Needs</h2>
					<button className="help-icon" title="Open Help" onClick={() => setShowHelp((prev) => !prev)}>
						?
					</button>
				</div>
			</div>

			{feelingWords.length > 0 && (
				<p className="feeling-prompt">
					So, you're feeling <strong>{feelingWords.join(", ")}</strong>. What needs might be underneath these?
				</p>
			)}

			<Checklist
				data={needsData}
				selectedItems={needs}
				setSelectedItems={setNeeds}
				type="needs"
				initiallyOpen={true}
				allowDoubleClick={true}
			/>

			<SlideDrawer isOpen={showHelp} onClose={() => setShowHelp(false)} title="Help: Selecting Needs">
				<p>
					This list includes universal human needs. Choose the ones you were trying to meet during the
					situation.
				</p>
				<ul>
					<li>
						Click once to mark a need as <strong>unmet</strong>.
					</li>
					<li>
						Double-click to mark a need as <strong>met</strong>.
					</li>
					<li>You can select as many as you like.</li>
					<li>
						When you’re ready, click <em>Done</em> to continue.
					</li>
				</ul>
			</SlideDrawer>
		</div>
	);
};

export default Needs;
