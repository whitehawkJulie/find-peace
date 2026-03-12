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

	return (
		<div className="card">
			<div className="card-content" ref={cardContentRef}>
				<div className="card-header">
					<div className="card-app-title">Find Peace</div>
					<div className="card-title-row">
						<h2>{title}</h2>
						{showHelp && (
							<button
								className="help-icon"
								title={helpDrawerOpen ? "Close help" : "Open help"}
								onClick={() => setHelpDrawerOpen((prev) => !prev)}>
								?
							</button>
						)}
					</div>
				</div>
				{children}
				<div
					className="card-scroll-fade"
					aria-hidden="true"
					style={{ opacity: hasMoreBelow ? 1 : 0 }}
				/>
			</div>

			<SlideDrawer isOpen={helpDrawerOpen} onClose={() => setHelpDrawerOpen(false)} title={`Help: ${title}`} showBrowse>
				{helpContent}
			</SlideDrawer>

			{!hideNav && !hideMainNav && <MenuBar />}
		</div>
	);
};

export default Card;
