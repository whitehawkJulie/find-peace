import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import "./MenuBar.css";

const LIST_MODE_OPTIONS = [
	{ key: "quick", label: "Quick picks" },
	{ key: "short", label: "Short list" },
	{ key: "full", label: "Full list" },
];

const SettingsContent = ({ settings, updateSettings }) => (
	<div className="settings-content">
		<div className="settings-group">
			<h4>Pause Screens</h4>
			<label className="settings-toggle">
				<input
					type="checkbox"
					checked={!(settings.skipPauses ?? false)}
					onChange={(e) => updateSettings({ skipPauses: !e.target.checked })}
				/>
				Show pause/breathing screens between steps
			</label>
		</div>

		<div className="settings-group">
			<h4>Feelings List</h4>
			<label className="settings-label">Default list size:</label>
			<div className="settings-radio-group">
				{LIST_MODE_OPTIONS.map((opt) => (
					<label key={opt.key} className="settings-radio">
						<input
							type="radio"
							name="defaultListMode"
							value={opt.key}
							checked={(settings.defaultListMode || "short") === opt.key}
							onChange={() => updateSettings({ defaultListMode: opt.key })}
						/>
						{opt.label}
					</label>
				))}
			</div>
		</div>

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
	</div>
);

const MenuBar = () => {
	const { stepIndex, setStepIndex, visibleSteps, settings, updateSettings } = useWizard();
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
					</button>
					{stepIndex + 1} / {visibleSteps.length}
				</span>

				<button onClick={goToNext} disabled={!hasNext} className="nav-button" aria-label="Next">
					Next →
				</button>
			</div>

			<SlideDrawer isOpen={showSettings} onClose={() => setShowSettings(false)} title="Settings">
				<SettingsContent settings={settings} updateSettings={updateSettings} />
			</SlideDrawer>
		</>
	);
};

export default MenuBar;
