import React, { useState } from "react";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import { trackEvent } from "../analytics/analytics";
import "./MenuBar.css";

// ── Privacy & Data section ─────────────────────────────────────────────────
const PrivacySection = () => {
	const { savedEntries, clearAllSessions } = useWizard();
	const [confirming, setConfirming] = useState(false);

	return (
		<div className="settings-group">
			<h4>Privacy &amp; Your Data</h4>
			<p className="settings-privacy-note">
				Everything you enter stays on this device. Your responses are stored in your browser's local storage and
				are <strong>never sent to any server</strong>. When you save or copy a session, your feelings and needs
				word selections are shared anonymously to help improve this tool — no personal observations or free text
				is included.
			</p>
			{savedEntries.length > 0 && (
				<>
					{confirming ? (
						<div className="settings-reset-confirm">
							<p>
								Permanently delete all {savedEntries.length} saved session
								{savedEntries.length !== 1 ? "s" : ""}? This cannot be undone.
							</p>
							<div className="settings-reset-confirm-buttons">
								<button
									className="settings-reset-confirm-yes"
									onClick={() => {
										clearAllSessions();
										setConfirming(false);
									}}>
									Yes, delete all
								</button>
								<button className="settings-reset-cancel" onClick={() => setConfirming(false)}>
									Cancel
								</button>
							</div>
						</div>
					) : (
						<button className="settings-reset-btn" onClick={() => setConfirming(true)}>
							🗑 Delete all saved sessions
						</button>
					)}
				</>
			)}
		</div>
	);
};

// ── Passphrase encryption section ─────────────────────────────────────────
const PassphraseSection = () => {
	const {
		passphraseActive,
		hasEncryptedSessions,
		enableEncryption,
		unlockSessions,
		removePassphrase,
		clearAllSessions,
	} = useWizard();
	const [mode, setMode] = useState(null); // null | "set" | "remove"
	const [phrase, setPhrase] = useState("");
	const [confirm, setConfirm] = useState("");
	const [showPhrase, setShowPhrase] = useState(false);
	const [error, setError] = useState("");
	const [working, setWorking] = useState(false);

	const reset = () => {
		setPhrase("");
		setConfirm("");
		setError("");
		setMode(null);
		setShowPhrase(false);
	};

	// State C — encrypted sessions in storage, no passphrase in memory yet
	if (hasEncryptedSessions && !passphraseActive) {
		return (
			<div className="settings-group">
				<h4>Protect Your Data</h4>
				<p className="settings-privacy-status">🔒 Your sessions are encrypted.</p>
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						setWorking(true);
						setError("");
						try {
							await unlockSessions(phrase);
							reset();
						} catch {
							setError("Incorrect passphrase. Please try again.");
						} finally {
							setWorking(false);
						}
					}}>
					<input
						type={showPhrase ? "text" : "password"}
						value={phrase}
						onChange={(e) => setPhrase(e.target.value)}
						placeholder="Enter passphrase to unlock"
						className="settings-passphrase-input"
						required
					/>
					{error && <p className="settings-error">{error}</p>}
					<div className="settings-passphrase-actions">
						<button type="submit" disabled={!phrase || working} className="settings-passphrase-btn">
							{working ? "Unlocking…" : "Unlock sessions"}
						</button>
					</div>
				</form>
				<button
					className="settings-passphrase-forgot"
					onClick={() => {
						if (
							window.confirm(
								"This will permanently delete all your encrypted sessions. This cannot be undone. Continue?",
							)
						) {
							clearAllSessions();
						}
					}}>
					Forgot passphrase? Clear encrypted sessions
				</button>
			</div>
		);
	}

	// State B — passphrase active in memory
	if (passphraseActive) {
		return (
			<div className="settings-group">
				<h4>Protect Your Data</h4>
				<p className="settings-privacy-status">
					🔒 Encryption active. Your sessions are protected this browser session.
				</p>
				{mode === "remove" ? (
					<>
						<p className="settings-passphrase-hint">
							This will decrypt all your saved sessions and save them as plain text.
						</p>
						<div className="settings-passphrase-actions">
							<button
								className="settings-passphrase-btn settings-passphrase-btn--danger"
								disabled={working}
								onClick={async () => {
									setWorking(true);
									try {
										await removePassphrase();
										reset();
									} catch {
										setError("Something went wrong.");
									} finally {
										setWorking(false);
									}
								}}>
								{working ? "Removing…" : "Yes, remove passphrase"}
							</button>
							<button className="settings-reset-cancel" onClick={reset}>
								Cancel
							</button>
						</div>
						{error && <p className="settings-error">{error}</p>}
					</>
				) : (
					<button
						className="settings-passphrase-btn settings-passphrase-btn--secondary"
						onClick={() => setMode("remove")}>
						Remove passphrase
					</button>
				)}
			</div>
		);
	}

	// State A — no passphrase, no encrypted sessions
	return (
		<div className="settings-group">
			<h4>Protect Your Data</h4>
			<p className="settings-passphrase-intro">
				Optionally protect your saved sessions with a passphrase. Only someone who knows it will be able to read
				them — even if they can access your browser.
			</p>
			{mode === "set" ? (
				<form
					onSubmit={async (e) => {
						e.preventDefault();
						if (phrase !== confirm) {
							setError("Passphrases don't match.");
							return;
						}
						setWorking(true);
						setError("");
						try {
							await enableEncryption(phrase);
							reset();
						} catch {
							setError("Something went wrong. Please try again.");
						} finally {
							setWorking(false);
						}
					}}>
					<input
						type={showPhrase ? "text" : "password"}
						value={phrase}
						onChange={(e) => setPhrase(e.target.value)}
						placeholder="Passphrase"
						className="settings-passphrase-input"
						required
					/>
					<input
						type={showPhrase ? "text" : "password"}
						value={confirm}
						onChange={(e) => setConfirm(e.target.value)}
						placeholder="Confirm passphrase"
						className="settings-passphrase-input"
						required
					/>
					<label className="settings-toggle settings-passphrase-show">
						<input type="checkbox" checked={showPhrase} onChange={(e) => setShowPhrase(e.target.checked)} />
						Show passphrase
					</label>
					{error && <p className="settings-error">{error}</p>}
					<div className="settings-passphrase-actions">
						<button type="submit" disabled={!phrase || working} className="settings-passphrase-btn">
							{working ? "Encrypting…" : "Enable encryption"}
						</button>
						<button type="button" className="settings-reset-cancel" onClick={reset}>
							Cancel
						</button>
					</div>
				</form>
			) : (
				<button
					className="settings-passphrase-btn settings-passphrase-btn--secondary"
					onClick={() => setMode("set")}>
					Set a passphrase
				</button>
			)}
		</div>
	);
};

// ── Hints reset section ────────────────────────────────────────────────────
const HintsSection = () => {
	const hasDismissed = Object.keys(JSON.parse(localStorage.getItem("findPeaceHints") || "{}")).length > 0;
	const [done, setDone] = useState(false);

	if (!hasDismissed && !done) return null;

	return (
		<div className="settings-group">
			<h4>Hints</h4>
			{done ? (
				<p className="settings-hint">Hints will reappear as you navigate.</p>
			) : (
				<button
					className="settings-reset-btn"
					onClick={() => {
						localStorage.removeItem("findPeaceHints");
						setDone(true);
					}}>
					↺ Show all hints again
				</button>
			)}
		</div>
	);
};

// ── Main settings panel ────────────────────────────────────────────────────
const SettingsContent = ({ onClose }) => {
	const { hasSessionData, resetSession, settings, updateSettings } = useWizard();
	const [confirmReset, setConfirmReset] = useState(false);

	const handleReset = () => {
		resetSession();
		setConfirmReset(false);
		onClose();
	};

	return (
		<div className="settings-content">
			<div className="settings-group">
				<h4>Language style</h4>
				<label className="settings-toggle">
					<input
						type="checkbox"
						checked={(settings?.tone ?? "polite") === "sweary"}
						onChange={(e) => {
							const newTone = e.target.checked ? "sweary" : "polite";
							updateSettings({ tone: newTone });
							trackEvent("action", { action_name: "settings_change", setting: "tone", value: newTone });
						}}
					/>
					Sweary mode
				</label>
				<p className="settings-hint">Uses more colourful language throughout.</p>
			</div>

			<HintsSection />

			<PrivacySection />

			<PassphraseSection />

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

// ── Drawer wrapper ─────────────────────────────────────────────────────────
const SettingsDrawer = () => {
	const { showSettings, setShowSettings } = useWizard();
	const close = () => setShowSettings(false);

	return (
		<SlideDrawer isOpen={showSettings} onClose={close} title="Settings">
			<SettingsContent onClose={close} />
		</SlideDrawer>
	);
};

export default SettingsDrawer;
