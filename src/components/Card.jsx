import React, { useState, useEffect, useCallback } from "react";
import SlideDrawer from "./SlideDrawer";
import MenuBar from "./MenuBar";
import SettingsDrawer from "./SettingsDrawer";
import SummaryModal from "./SummaryModal";
import SideMenu from "./SideMenu";
import { useWizard } from "./WizardContext";
import "./Card.css";

const Card = ({ title, children, showHelp = false, helpContent = null, hideNav = false }) => {
	const {
		hideMainNav,
		helpDrawerOpen,
		setHelpDrawerOpen,
		helpDrawerOverride,
		setHelpDrawerOverride,
		helpTopic,
		setHelpTopic,
		cardContentRef,
		currentStep,
	} = useWizard();
	const [hasMoreBelow, setHasMoreBelow] = useState(false);
	const [sideMenuOpen, setSideMenuOpen] = useState(false);

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
			// After the card resizes (e.g. keyboard appears), scroll the focused
			// input/textarea into view within the card-content scroll container.
			const focused = document.activeElement;
			if (focused && (focused.tagName === "TEXTAREA" || focused.tagName === "INPUT")) {
				requestAnimationFrame(() => focused.scrollIntoView({ block: "nearest" }));
			}
		};
		update();
		vv.addEventListener("resize", update);
		vv.addEventListener("scroll", update);
		return () => {
			vv.removeEventListener("resize", update);
			vv.removeEventListener("scroll", update);
		};
	}, []);

	// Fallback for browsers/webviews that don't fire visualViewport resize
	// (e.g. some in-app browsers): scroll focused element into view after keyboard delay.
	useEffect(() => {
		const el = cardContentRef?.current;
		if (!el) return;
		const handleFocusIn = (e) => {
			const target = e.target;
			if (target.tagName === "TEXTAREA" || target.tagName === "INPUT") {
				// 350ms lets the keyboard finish animating open before we scroll
				setTimeout(() => target.scrollIntoView({ block: "nearest" }), 350);
			}
		};
		el.addEventListener("focusin", handleFocusIn);
		return () => el.removeEventListener("focusin", handleFocusIn);
	}, [cardContentRef]);

	return (
		<div className="card">
			{/* Header sits outside the scrollable area so it stays pinned at the top */}
			<div className="card-header" style={currentStep?.color ? { background: currentStep.color } : undefined}>
				<button
					className="card-menu-btn"
					title="Menu"
					aria-label="Menu"
					aria-expanded={sideMenuOpen}
					onClick={() => setSideMenuOpen((v) => !v)}>
					&#9776;
				</button>
				<div className="card-header-text">
					<div className="card-app-title">Untangle This</div>
					<h2 className="card-page-title">{title}</h2>
				</div>
			</div>

			{/* Wrapper gives the fade a reliable anchor: position:absolute inside
			    a position:relative container that exactly matches the scrollable area */}
			<div className="card-content-wrapper">
				<div className="card-content" ref={cardContentRef}>
					{children}
				</div>
				<div className="card-scroll-fade" aria-hidden="true" style={{ opacity: hasMoreBelow ? 1 : 0 }} />
			</div>

			<SlideDrawer
				isOpen={helpDrawerOpen}
				onClose={() => {
					setHelpDrawerOpen(false);
					setHelpDrawerOverride(null);
				}}
				title={`${title}`}
				showBrowse
				helpTopic={helpTopic}
				setHelpTopic={setHelpTopic}>
				{helpDrawerOverride ?? helpContent}
			</SlideDrawer>

			{!hideNav && !hideMainNav && <MenuBar />}
			<SummaryModal />
			<SettingsDrawer />
			<SideMenu isOpen={sideMenuOpen} onClose={() => setSideMenuOpen(false)} />
		</div>
	);
};

export default Card;
