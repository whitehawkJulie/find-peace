import React, { useState, useEffect, useCallback, useRef } from "react";
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
		stepIndex,
		setStepIndex,
		visibleSteps,
	} = useWizard();
	const isIntro = stepIndex === 0;
	const [hasMoreBelow, setHasMoreBelow] = useState(false);
	const [sideMenuOpen, setSideMenuOpen] = useState(false);

	// Swipe left/right to navigate between pages
	useEffect(() => {
		const el = cardContentRef?.current;
		if (!el) return;
		let startX = 0;
		let startY = 0;
		const onTouchStart = (e) => {
			startX = e.touches[0].clientX;
			startY = e.touches[0].clientY;
		};
		const onTouchEnd = (e) => {
			if (helpDrawerOpen) return; // let the drawer handle its own gestures
			const dx = e.changedTouches[0].clientX - startX;
			const dy = e.changedTouches[0].clientY - startY;
			// Require 60px horizontal movement and horizontal clearly dominant over vertical
			if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.8) return;
			if (dx < 0 && stepIndex < visibleSteps.length - 1) setStepIndex(stepIndex + 1);
			if (dx > 0 && stepIndex > 0) setStepIndex(stepIndex - 1);
		};
		el.addEventListener("touchstart", onTouchStart, { passive: true });
		el.addEventListener("touchend", onTouchEnd, { passive: true });
		return () => {
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchend", onTouchEnd);
		};
	}, [cardContentRef, helpDrawerOpen, stepIndex, visibleSteps, setStepIndex]);

	// Refs for back-button drawer management
	const drawerHistoryRef = useRef(false); // true when we've pushed a drawer history entry
	const suppressPopRef = useRef(false);   // suppresses our popstate handler once (X-close path)

	// Push a history entry when the drawer opens so the back button can close it
	useEffect(() => {
		if (helpDrawerOpen) {
			history.pushState({ helpDrawerOpen: true }, "");
			drawerHistoryRef.current = true;
		}
	}, [helpDrawerOpen]);

	// Intercept the back button to close the drawer instead of navigating
	useEffect(() => {
		const handlePopState = () => {
			if (suppressPopRef.current) {
				suppressPopRef.current = false;
				return;
			}
			if (drawerHistoryRef.current) {
				drawerHistoryRef.current = false;
				setHelpDrawerOpen(false);
				setHelpDrawerOverride(null);
			}
		};
		window.addEventListener("popstate", handlePopState);
		return () => window.removeEventListener("popstate", handlePopState);
	}, [setHelpDrawerOpen, setHelpDrawerOverride]);

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
					{!isIntro && <div className="card-app-title">Untangle This</div>}
					{isIntro && (
						<div className="untangle-logo-wrap">
							<img
								src="./untangle-trans-sm.png"
								alt="Untangle This"
								className="untangle-logo"
								style={{ width: "100%" }}
							/>
						</div>
					)}
					{!isIntro && <h2 className="card-page-title">{title}</h2>}
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
					if (drawerHistoryRef.current) {
						drawerHistoryRef.current = false;
						history.replaceState({ stepIndex }, ""); // replace drawer entry without firing popstate
					}
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
