import React, { useState } from "react";
import "./Needs.css";

import SlideDrawer from "./SlideDrawer";
import NeedsChecklist from "./NeedsChecklist";

const Needs = ({ needs, setNeeds, onNext }) => {
	const [showHelp, setShowHelp] = useState(false);

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

			<p>
				<strong>What needs are alive for you here?</strong>
			</p>

			<NeedsChecklist selectedNeeds={needs} setSelectedNeeds={setNeeds} />

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
