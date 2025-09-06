import React from "react";
import "./MenuBars.css";

export function TopMenuBar({ onNew, onViewPast }) {
	return (
		<div className="menu-bar top">
			<button onClick={onNew}>New</button>
			<button onClick={onViewPast}>Past</button>
		</div>
	);
}

export function BottomMenuBar({ onPrevious, onNext, onSave, disablePrevious, disableNext, disableSave }) {
	return (
		<div className="menu-bar bottom">
			<button onClick={onPrevious} disabled={disablePrevious}>
				Previous
			</button>
			<button onClick={onNext} disabled={disableNext}>
				Next
			</button>
			{/* 			<button onClick={onSave} disabled={disableSave}>
				Save
			</button> */}
		</div>
	);
}
