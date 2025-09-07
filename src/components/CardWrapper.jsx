import React, { useState } from "react";
import SlideDrawer from "./SlideDrawer";
import MenuBars from "./MenuBars";
import "./CardWrapper.css";

const CardWrapper = ({ title, children, showHelp = false, helpContent = null, onPrev, onNext }) => {
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<div className="nvc-card">
			<div className="card-header">
				<h2>{title}</h2>
				{showHelp && (
					<button
						className="help-icon"
						title={showDrawer ? "Close Help" : "Open Help"}
						onClick={() => setShowDrawer((prev) => !prev)}>
						?
					</button>
				)}
			</div>

			<div className="card-content">{children}</div>

			<SlideDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} title={`Help: ${title}`}>
				{helpContent}
			</SlideDrawer>

			<MenuBars onPrev={onPrev} onNext={onNext} />
		</div>
	);
};

export default CardWrapper;
