import React, { useState } from "react";
import SlideDrawer from "./SlideDrawer";
import MenuBar from "./MenuBar";
import "./Card.css";

const Card = ({ title, children, showHelp = false, helpContent = null }) => {
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-title-with-icon">
					<h2>{title}</h2>
					{showHelp && (
						<button
							className="help-icon"
							title={showDrawer ? "Close help" : "Open help"}
							onClick={() => setShowDrawer((prev) => !prev)}>
							?
						</button>
					)}
				</div>
			</div>

			<div className="card-content">{children}</div>

			<SlideDrawer isOpen={showDrawer} onClose={() => setShowDrawer(false)} title={`Help: ${title}`}>
				{helpContent}
			</SlideDrawer>

			<MenuBar />
		</div>
	);
};

export default Card;
