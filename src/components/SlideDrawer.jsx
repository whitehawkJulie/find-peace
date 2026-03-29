import React, { useState, useEffect, useRef, lazy, Suspense } from "react";
import "./SlideDrawer.css";

// Dynamically import HelpBrowser to avoid circular dependency at module load time
const HelpBrowser = lazy(() => import("./HelpBrowser"));

const SlideDrawer = ({
	isOpen,
	onClose,
	title,
	children,
	showBrowse = false,
	helpTopic = null,
	setHelpTopic = null,
}) => {
	const [browsing, setBrowsing] = useState(false);
	const [browseTitle, setBrowseTitle] = useState(null);
	const panelRef = useRef(null);
	const helpBrowserRef = useRef(null);

	// Swipe right to step back (browse → content) or close (content → closed)
	useEffect(() => {
		const el = panelRef.current;
		if (!el || !isOpen) return;
		let startX = 0;
		let startY = 0;
		const onTouchStart = (e) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
		};
		const onTouchEnd = (e) => {
			const dx = e.changedTouches[0].clientX - startX;
			const dy = e.changedTouches[0].clientY - startY;
			if (dx < 60 || Math.abs(dx) < Math.abs(dy) * 1.8) return;
			if (browsing && (helpBrowserRef.current?.historyLength ?? 0) > 0) {
				helpBrowserRef.current.goBack();
			} else if (browsing && children) {
				setBrowsing(false);
				setBrowseTitle(null);
				setHelpTopic?.(null);
			} else {
				onClose();
			}
		};
		el.addEventListener("touchstart", onTouchStart, { passive: true });
		el.addEventListener("touchend", onTouchEnd, { passive: true });
		return () => {
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchend", onTouchEnd);
		};
	}, [isOpen, browsing, onClose, setHelpTopic]);

	// Auto-enter browse mode when a specific topic is requested
	useEffect(() => {
		if (helpTopic && isOpen) setBrowsing(true);
	}, [helpTopic, isOpen]);

	// Reset browsing state and clear topic when drawer closes
	useEffect(() => {
		if (!isOpen) {
			setBrowsing(false);
			setBrowseTitle(null);
			setHelpTopic?.(null);
		}
	}, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<>
			{isOpen && <div className="slide-panel-backdrop" onClick={onClose} />}
			<div className={`slide-panel ${isOpen ? "show" : ""}`} ref={panelRef}>
				<div className="slide-panel-header">
					<h3>{browsing ? (browseTitle ?? "All Help Topics") : title}</h3>
					<button className="close-button" onClick={onClose}>
						×
					</button>
				</div>
				<div className="slide-panel-content">
					{browsing ? (
						<Suspense fallback={<p style={{ color: "#999", fontSize: "0.9rem" }}>Loading…</p>}>
							<HelpBrowser
								ref={helpBrowserRef}
								initialTopic={helpTopic}
								directOpen={!!helpTopic}
								onBack={() => { setBrowsing(false); setBrowseTitle(null); setHelpTopic?.(null); }}
								onTopicChange={(t) => setBrowseTitle(t)}
							/>
						</Suspense>
					) : (
						<>
							{children}
							{showBrowse && (
								<div className="slide-panel-browse">
									<button className="slide-panel-browse-btn" onClick={() => setBrowsing(true)}>
										Browse all help topics →
									</button>
								</div>
							)}
						</>
					)}
				</div>
			</div>
		</>
	);
};

export default SlideDrawer;
