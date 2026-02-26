import React, { useState } from "react";
import SlideDrawer from "./SlideDrawer";
import MenuBar from "./MenuBar";
import { useWizard } from "./WizardContext";
import "./Card.css";

const Card = ({ title, children, showHelp = false, helpContent = null, hideNav = false }) => {
	const { hideMainNav } = useWizard();
	const [showDrawer, setShowDrawer] = useState(false);

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-app-title">Find Peace</div>
				<div className="card-title-row">
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

			{!hideNav && !hideMainNav && <MenuBar />}
		</div>
	);
};

export default Card;
