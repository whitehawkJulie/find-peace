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
					Read all the way through the list of universal, shared human needs, to uncover ALL your needs that
					are relevant to this particular situation. The needs you come up with here are likely to be
					associated with the painful feeling words you chose above.{" "}
				</p>
				<p>
					You may notice that many of the needs in the list WERE actually met at the time - if you'd like, you
					can note those too by double-clicking on them to mark them as "met needs".
				</p>
			</SlideDrawer>
		</div>
	);
};

export default Needs;
