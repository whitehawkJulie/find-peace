import React, { useState, useEffect, useCallback, useRef } from "react";
import SlideDrawer from "./SlideDrawer";
import MenuBar from "./MenuBar";
import SettingsDrawer from "./SettingsDrawer";
import SummaryModal from "./SummaryModal";
import SideMenu from "./SideMenu";
import { useWizard } from "./WizardContext";
import { useOverlayHistory } from "../hooks/useOverlayHistory";
import { trackEvent, setPendingNavMethod, currentPage } from "../analytics/analytics";
import "./Card.css";

const Card = ({ title, children, hideNav = false }) => {
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

	const helpOpenAt = useRef(null);
	const sideMenuOpenAt = useRef(null);

	// Back-button support: closes the help drawer or side menu instead of navigating
	const closeHelpDrawer = () => {
		setHelpDrawerOpen(false);
		setHelpDrawerOverride(null);
	};
	const { closeWithCleanup: closeHelpDrawerWithCleanup } = useOverlayHistory(helpDrawerOpen, closeHelpDrawer, "helpDrawer");
	const { closeWithCleanup: closeSideMenuWithCleanup } = useOverlayHistory(sideMenuOpen, () => setSideMenuOpen(false), "sideMenu");

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
			if (dx < 0 && stepIndex < visibleSteps.length - 1) {
				setPendingNavMethod("swipe");
				setStepIndex(stepIndex + 1);
			}
			if (dx > 0 && stepIndex > 0) {
				setPendingNavMethod("swipe");
				setStepIndex(stepIndex - 1);
			}
		};
		el.addEventListener("touchstart", onTouchStart, { passive: true });
		el.addEventListener("touchend", onTouchEnd, { passive: true });
		return () => {
			el.removeEventListener("touchstart", onTouchStart);
			el.removeEventListener("touchend", onTouchEnd);
		};
	}, [cardContentRef, helpDrawerOpen, stepIndex, visibleSteps, setStepIndex]);

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

	// Help drawer open/close tracking
	useEffect(() => {
		if (helpDrawerOpen) {
			helpOpenAt.current = Date.now();
			trackEvent("ui_open", { type: "help", name: helpTopic || "page-help", page_name: currentPage });
		} else if (helpOpenAt.current) {
			trackEvent("ui_close", { type: "help", name: helpTopic || "page-help",
				time_open_ms: Date.now() - helpOpenAt.current });
			helpOpenAt.current = null;
		}
	}, [helpDrawerOpen, helpTopic]); // eslint-disable-line react-hooks/exhaustive-deps

	// Side menu open/close tracking
	useEffect(() => {
		if (sideMenuOpen) {
			sideMenuOpenAt.current = Date.now();
			trackEvent("ui_open", { type: "menu", name: "side-menu", page_name: currentPage });
		} else if (sideMenuOpenAt.current) {
			trackEvent("ui_close", { type: "menu", name: "side-menu",
				time_open_ms: Date.now() - sideMenuOpenAt.current });
			sideMenuOpenAt.current = null;
		}
	}, [sideMenuOpen]); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="card">
			{/* Header sits outside the scrollable area so it stays pinned at the top */}
			<div className="card-header" style={currentStep?.color ? { background: currentStep.color } : undefined}>
				<button
					className="card-menu-btn"
					title="Menu"
					aria-label="Menu"
					aria-expanded={sideMenuOpen}
					onClick={() => { if (sideMenuOpen) closeSideMenuWithCleanup(); else setSideMenuOpen(true); }}>
					&#9776;
				</button>
				<div className="card-header-text">
					{!isIntro && <div className="card-app-title">Untangle This</div>}
					{isIntro && (
						<>
							<div className="untangle-logo-wrap">
								<img
									src="./untangle-trans-sm.png"
									alt="Untangle This"
									className="untangle-logo"
									style={{ width: "100%" }}
								/>
							</div>
							<p className="card-intro-tagline">{title}</p>
						</>
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
				<div className="card-scroll-label" aria-hidden="true" style={{ opacity: hasMoreBelow ? 1 : 0 }}>
					scroll for more ↓
				</div>
			</div>

			<SlideDrawer
				isOpen={helpDrawerOpen}
				onClose={closeHelpDrawerWithCleanup}
				title={`${title}`}
				showBrowse
				helpTopic={helpTopic}
				setHelpTopic={setHelpTopic}>
				{helpDrawerOverride}
			</SlideDrawer>

			{!hideNav && !hideMainNav && <MenuBar />}
			<SummaryModal />
			<SettingsDrawer />
			<SideMenu isOpen={sideMenuOpen} onClose={closeSideMenuWithCleanup} />
		</div>
	);
};

export default Card;
