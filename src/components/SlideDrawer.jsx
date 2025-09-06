import React from "react";
import "./SlideDrawer.css";

const SlideDrawer = ({ isOpen, onClose, title, children }) => {
	return (
		<div className={`slide-panel ${isOpen ? "show" : ""}`}>
			<div className="slide-panel-header">
				<h3>{title}</h3>
				<button className="close-button" onClick={onClose}>
					×
				</button>
			</div>
			<div className="slide-panel-content">{children}</div>
		</div>
	);
};

export default SlideDrawer;
