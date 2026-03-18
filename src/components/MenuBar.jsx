import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import SavedEntries from "./SavedEntries";
import "./MenuBar.css";

const SettingsContent = ({ settings, updateSettings, onSessionLoaded, onReset }) => {
	const { savedEntries, hasSessionData } = useWizard();
	const [confirmReset, setConfirmReset] = useState(false);

	const handleReset = () => {
		onReset();
		setConfirmReset(false);
	};

	return (
		<div className="settings-content">
			<div className="settings-group">
				<h4>Nervous System Colours</h4>
				<label className="settings-toggle">
					<input
						type="checkbox"
						checked={settings.regulationOverlay ?? false}
						onChange={(e) => updateSettings({ regulationOverlay: e.target.checked })}
					/>
					Show body-state colours on feelings by default
				</label>
			</div>

			{savedEntries.length > 0 && (
				<div className="settings-group">
					<h4>Past Sessions</h4>
					<SavedEntries onSessionLoaded={onSessionLoaded} />
				</div>
			)}

			{hasSessionData() && (
				<div className="settings-group settings-group--reset">
					<h4>Start Over</h4>
					{confirmReset ? (
						<div className="settings-reset-confirm">
							<p>This will clear all your current progress. Are you sure?</p>
							<div className="settings-reset-confirm-buttons">
								<button className="settings-reset-confirm-yes" onClick={handleReset}>
									Yes, start over
								</button>
								<button className="settings-reset-cancel" onClick={() => setConfirmReset(false)}>
									Cancel
								</button>
							</div>
						</div>
					) : (
						<button className="settings-reset-btn" onClick={() => setConfirmReset(true)}>
							↺ Start over
						</button>
					)}
				</div>
			)}
		</div>
	);
};

const MenuBar = () => {
	const { stepIndex, setStepIndex, visibleSteps, settings, updateSettings, resetSession } = useWizard();
	const [showSettings, setShowSettings] = useState(false);

	const hasPrev = stepIndex > 0;
	const hasNext = stepIndex < visibleSteps.length - 1;

	const goToPrevious = () => {
		if (hasPrev) setStepIndex(stepIndex - 1);
	};

	const goToNext = () => {
		if (hasNext) setStepIndex(stepIndex + 1);
	};

	return (
		<>
			<div className="menu-bar">
				<button onClick={goToPrevious} disabled={!hasPrev} className="nav-button" aria-label="Previous">
					← Prev
				</button>

				<span className="step-indicator">
					<button
						className="settings-cog"
						title="Settings"
						onClick={() => setShowSettings(true)}
						aria-label="Settings">
						&#9881;
						<span className="settings-cog-label">Settings</span>
					</button>
					{stepIndex + 1} / {visibleSteps.length}
				</span>

				<button onClick={goToNext} disabled={!hasNext} className="nav-button" aria-label="Next">
					Next →
				</button>
			</div>

			<SlideDrawer isOpen={showSettings} onClose={() => setShowSettings(false)} title="Settings">
				<SettingsContent
					settings={settings}
					updateSettings={updateSettings}
					onSessionLoaded={() => setShowSettings(false)}
					onReset={() => { resetSession(); setShowSettings(false); }}
				/>
			</SlideDrawer>
		</>
	);
};

export default MenuBar;
