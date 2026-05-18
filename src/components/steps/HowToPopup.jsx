import React, { useState } from "react";
import "./Onboarding.css";

const POPUP_ID = "howto-popup";

function getHints() {
	try { return JSON.parse(localStorage.getItem("findPeaceHints") || "{}"); } catch { return {}; }
}
function dismissHint(id) {
	localStorage.setItem("findPeaceHints", JSON.stringify({ ...getHints(), [id]: true }));
}

const HowToPopup = () => {
	const [visible, setVisible] = useState(() => !getHints()[POPUP_ID]);
	if (!visible) return null;

	const close = () => { dismissHint(POPUP_ID); setVisible(false); };

	return (
		<>
			<div className="howto-popup-backdrop" onClick={close} />
			<div className="howto-popup" role="dialog" aria-modal="true" aria-label="Finding your way around">
				<h2 className="howto-popup-title">Finding your way around</h2>

				<div className="howto-diagram-wrap">
					<div className="howto-card">
						<div className="howto-card-header">
							<span className="howto-card-title">What just happened?</span>
							<span className="howto-menu-icon">☰</span>
							<span className="howto-callout-badge" aria-hidden="true">1</span>
						</div>
						<div className="howto-card-body">
							<div className="howto-dummy-line howto-line--long" />
							<div className="howto-dummy-line howto-line--medium" />
							<div className="howto-dummy-line howto-line--short" />
						</div>
						<div className="howto-progress-row">
							<div className="howto-progress-track">
								<div className="howto-progress-fill" />
							</div>
							<span className="howto-callout-badge" aria-hidden="true">2</span>
						</div>
						<div className="howto-nav-row">
							<span className="howto-nav-btn">← Prev</span>
							<span className="howto-nav-btn">Next →</span>
							<span className="howto-callout-badge" aria-hidden="true">3</span>
						</div>
					</div>
				</div>

				<ol className="howto-legend">
					<li><strong>☰ Menu</strong> — access your summary, settings, and saved sessions</li>
					<li><strong>Progress bar</strong> — most steps are optional; skip what doesn't fit, come back anytime</li>
					<li><strong>Prev / Next</strong> — move between steps at your own pace</li>
				</ol>

				<p className="howto-note">
					💡 On the feelings and needs screens, <strong>double-click a word</strong> to open more detail.
				</p>

				<p className="howto-note">
					🔗 <strong>Underlined links</strong> throughout the app open help panels with more context.
				</p>

				<p className="howto-note">
					💬 <strong>Hints</strong> appear on some pages to give extra guidance — click <strong>✕</strong> to dismiss them.
				</p>

				<button className="howto-popup-close" onClick={close}>Got it</button>
			</div>
		</>
	);
};

export default HowToPopup;
