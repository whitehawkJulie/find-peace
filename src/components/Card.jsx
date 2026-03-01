import React from "react";
import SlideDrawer from "./SlideDrawer";
import MenuBar from "./MenuBar";
import { useWizard } from "./WizardContext";
import "./Card.css";

const Card = ({ title, children, showHelp = false, helpContent = null, hideNav = false }) => {
	const { hideMainNav, helpDrawerOpen, setHelpDrawerOpen } = useWizard();

	return (
		<div className="card">
			<div className="card-header">
				<div className="card-app-title">Find Peace</div>
				<div className="card-title-row">
					<h2>{title}</h2>
					{showHelp && (
						<button
							className="help-icon"
							title={helpDrawerOpen ? "Close help" : "Open help"}
							onClick={() => setHelpDrawerOpen((prev) => !prev)}>
							?
						</button>
					)}
				</div>
			</div>

			<div className="card-content">{children}</div>

			<SlideDrawer isOpen={helpDrawerOpen} onClose={() => setHelpDrawerOpen(false)} title={`Help: ${title}`} showBrowse>
				{helpContent}
			</SlideDrawer>

			{!hideNav && !hideMainNav && <MenuBar />}
		</div>
	);
};

export default Card;
