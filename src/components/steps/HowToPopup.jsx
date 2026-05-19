import React, { useState } from "react";
import "./Onboarding.css";

const POPUP_ID = "howto-popup";

function getHints() {
	try { return JSON.parse(localStorage.getItem("findPeaceHints") || "{}"); } catch { return {}; }
}
function dismissHint(id) {
	localStorage.setItem("findPeaceHints", JSON.stringify({ ...getHints(), [id]: true }));
}

const STEPS = [
	{
		id: "menu",
		title: "☰ Menu",
		body: "Access your summary, settings, and saved sessions from anywhere in the app.",
		bubbleTop: "2.2rem",
		arrowTop: "1.4rem",
	},
	{
		id: "hint",
		title: "💬 Hints",
		body: (<>Tips appear on some pages to give extra guidance. Click <strong>✕</strong> to dismiss them — you can bring them back in Settings.</>),
		bubbleTop: "5.2rem",
		arrowTop: "1.4rem",
	},
	{
		id: "link",
		title: "Underlined links",
		body: "Scattered throughout the app — click one to open a help panel with more context on that topic.",
		bubbleTop: "7.6rem",
		arrowTop: "3.1rem",
	},
	{
		id: "pill",
		title: "Words",
		body: (<><strong>Click</strong> a word to select it. <strong>Click again</strong> to mark it as strongly felt.</>),
		bubbleTop: "12rem",
		arrowTop: "4rem",
	},
	{
		id: "progress",
		title: "Progress bar",
		body: "Shows where you are. Most steps are optional — skip what doesn't fit and come back anytime.",
		bubbleTop: "15.75rem",
		arrowTop: "4rem",
	},
	{
		id: "summary",
		title: "📋 Summary",
		body: "View a summary of all your choices so far.",
		bubbleTop: "19.5rem",
		arrowTop: "1.4rem",
	},
];

const HowToPopup = () => {
	const [visible, setVisible] = useState(() => !getHints()[POPUP_ID]);
	const [step, setStep] = useState(0);

	if (!visible) return null;

	const isLast = step === STEPS.length - 1;
	const current = STEPS[step];
	const close = () => { dismissHint(POPUP_ID); setVisible(false); };
	const advance = () => isLast ? close() : setStep(s => s + 1);

	const active = (id) => current.id === id ? " howto-active" : "";

	return (
		<>
			<div className="howto-popup-backdrop" onClick={close} />
			<div className="howto-popup" role="dialog" aria-modal="true" aria-label="Finding your way around">
				<button className="howto-skip-btn" onClick={close}>Skip</button>
				<p className="howto-popup-title">Finding your way around</p>

				<div className="howto-stage">
					<div className="howto-dummy-card">
						<div className="howto-dummy-header">
							<span className={`howto-dummy-menu-btn${active("menu")}`}>☰</span>
							<span className="howto-dummy-page-title">What am I feeling?</span>
						</div>
						<div className="howto-dummy-body">
							<div className="howto-dummy-hint-box">
								<span className={`howto-dummy-hint-x${active("hint")}`}>✕</span>
								<span className="howto-dummy-hint-text">As you read through, try picking the words that feel like the best match.</span>
							</div>
							<p className="howto-dummy-prose">
								You might find that{" "}
								<span className={`howto-dummy-link${active("link")}`}>naming feelings</span>
								{" "}gives you information you didn't realise you had.
							</p>
							<div className="howto-dummy-section">
								<span className="howto-dummy-section-label">Afraid</span>
								<div className="howto-dummy-pills">
									{["trapped", "panicked", "terrified", "frightened", "scared"].map(word => (
										<span
											key={word}
											className={`howto-dummy-pill${current.id === "pill" && word === "panicked" ? " howto-active" : ""}`}>
											{word}
										</span>
									))}
								</div>
							</div>
						</div>
						<div className="howto-dummy-progress-row">
							<div className={`howto-dummy-progress-track${active("progress")}`}>
								<div className="howto-dummy-progress-fill" />
							</div>
						</div>
						<div className="howto-dummy-nav-row">
							<span className="howto-dummy-nav-btn">← Prev</span>
							<span className={`howto-dummy-summary-btn${active("summary")}`}>📋 Summary</span>
							<span className="howto-dummy-nav-btn">Next →</span>
						</div>
					</div>
				</div>

				<div
					className="howto-speech-bubble"
					style={{ top: current.bubbleTop, '--arrow-top': current.arrowTop }}
				>
					<strong className="howto-step-title">{current.title}</strong>
					{" — "}
					{current.body}
					{!isLast && (
						<button className="howto-next-tip" onClick={advance}>next tip →</button>
					)}
				</div>

				<div className="howto-step-nav">
					<div className="howto-step-dots" aria-label="Step indicators">
						{STEPS.map((s, i) => (
							<button
								key={s.id}
								className={`howto-step-dot${i === step ? " howto-step-dot--active" : ""}`}
								onClick={() => setStep(i)}
								aria-label={`Step ${i + 1}`}
							/>
						))}
					</div>
					{isLast && (
						<button className="howto-popup-close" onClick={close}>Got it</button>
					)}
				</div>
			</div>
		</>
	);
};

export default HowToPopup;
