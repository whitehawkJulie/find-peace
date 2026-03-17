import React, { useState, useEffect, useCallback } from "react";
import SlideDrawer from "./SlideDrawer";
import MenuBar from "./MenuBar";
import { useWizard } from "./WizardContext";
import "./Card.css";

const Card = ({ title, children, showHelp = false, helpContent = null, hideNav = false }) => {
	const { hideMainNav, helpDrawerOpen, setHelpDrawerOpen, cardContentRef } = useWizard();
	const [hasMoreBelow, setHasMoreBelow] = useState(false);

	const checkScroll = useCallback(() => {
		const el = cardContentRef?.current;
		if (!el) return;
		const isScrollable = el.scrollHeight > el.clientHeight + 10;
		const isAtBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 10;
		setHasMoreBelow(isScrollable && !isAtBottom);
	}, [cardContentRef]);

	useEffect(() => {
		const el = cardContentRef?.current;
		if (!el) return;
		checkScroll();
		el.addEventListener("scroll", checkScroll);
		const observer = new ResizeObserver(checkScroll);
		observer.observe(el);
		return () => {
			el.removeEventListener("scroll", checkScroll);
			observer.disconnect();
		};
	}, [checkScroll, children]);

	// Keep card height in sync with the actual visible viewport so mobile keyboards
	// don't cover content in webviews that don't properly support dvh.
	useEffect(() => {
		const vv = window.visualViewport;
		if (!vv) return;
		const update = () => {
			document.documentElement.style.setProperty("--vv-height", `${vv.height}px`);
		};
		update();
		vv.addEventListener("resize", update);
		vv.addEventListener("scroll", update);
		return () => {
			vv.removeEventListener("resize", update);
			vv.removeEventListener("scroll", update);
		};
	}, []);

	return (
		<div className="card">
			{/* Wrapper gives the fade a reliable anchor: position:absolute inside
			    a position:relative container that exactly matches the scrollable area */}
			<div className="card-content-wrapper">
				<div className="card-content" ref={cardContentRef}>
					<div className="card-header">
						<div className="card-app-title">Wait, What?!</div>
						<div className="card-title-row">
							<h2>{title}</h2>
							{showHelp && (
								<button
									className="help-icon"
									title={helpDrawerOpen ? "Close help" : "Open help"}
									onClick={() => setHelpDrawerOpen((prev) => !prev)}>
									<span className="help-icon-q">?</span>
									<span className="help-icon-label">Help</span>
								</button>
							)}
						</div>
					</div>
					{children}
				</div>
				<div className="card-scroll-fade" aria-hidden="true" style={{ opacity: hasMoreBelow ? 1 : 0 }} />
			</div>

			<SlideDrawer
				isOpen={helpDrawerOpen}
				onClose={() => setHelpDrawerOpen(false)}
				title={`Help: ${title}`}
				showBrowse>
				{helpContent}
			</SlideDrawer>

			{!hideNav && !hideMainNav && <MenuBar />}
		</div>
	);
};

export default Card;
