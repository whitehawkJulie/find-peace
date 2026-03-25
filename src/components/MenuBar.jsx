import React, { useState, useEffect, useRef } from "react";
import { useWizard } from "./WizardContext";
import { getText } from "../content/resolver";
import "./MenuBar.css";

const MenuBar = () => {
	const { stepIndex, setStepIndex, visibleSteps, allSteps, totalSteps, currentStep } = useWizard();
	const [showPageMenu, setShowPageMenu] = useState(false);
	const pagePickerRef = useRef(null);

	useEffect(() => {
		if (!showPageMenu) return;
		const handleClickOutside = (e) => {
			if (pagePickerRef.current && !pagePickerRef.current.contains(e.target)) {
				setShowPageMenu(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [showPageMenu]);

	const hasPrev = stepIndex > 0;
	const hasNext = stepIndex < visibleSteps.length - 1;

	const goToPrevious = () => {
		if (hasPrev) setStepIndex(stepIndex - 1);
	};

	const goToNext = () => {
		if (hasNext) setStepIndex(stepIndex + 1);
	};

	return (
		<div className="menu-bar">
			<button onClick={goToPrevious} disabled={!hasPrev} className="nav-button" aria-label="Previous" style={currentStep?.color ? { background: currentStep.color } : undefined}>
				← Prev
			</button>

			<span className="step-indicator">
				<span className="page-picker-wrap" ref={pagePickerRef}>
					<button
						className="page-picker-btn"
						title="Choose page"
						aria-label="Choose page"
						onClick={() => setShowPageMenu((v) => !v)}>
						{allSteps.findIndex((s) => s.component === currentStep?.component) + 1} / {totalSteps}
					</button>
					{showPageMenu && (
						<div className="page-picker-menu" role="menu">
							{allSteps.map((step, allIdx) => {
								const visIdx = visibleSteps.findIndex((s) => s.component === step.component);
								const isUnlocked = visIdx !== -1;
								const isActive = isUnlocked && visIdx === stepIndex;
								return (
									<button
										key={allIdx}
										className={`page-picker-item${isActive ? " page-picker-item--active" : ""}${!isUnlocked ? " page-picker-item--locked" : ""}`}
										role="menuitem"
										disabled={!isUnlocked}
										onClick={() => {
											setStepIndex(visIdx);
											setShowPageMenu(false);
										}}>
										<span className="page-picker-dot" style={{ background: step.color }} />
										<span className="page-picker-num">{allIdx + 1}</span>
										{step.navTitleKey ? getText(step.navTitleKey) : step.title}
									</button>
								);
							})}
						</div>
					)}
				</span>
			</span>

			<button onClick={goToNext} disabled={!hasNext} className="nav-button" aria-label="Next" style={currentStep?.color ? { background: currentStep.color } : undefined}>
				Next →
			</button>
		</div>
	);
};

export default MenuBar;
