import React, { useState, useRef, useCallback } from "react";
import "./Pill.css";

const Pill = ({
	item,
	type = "",
	state = "",
	meaning = "",
	indicator = null, // "plus" | "chevron" | null
	onClick = null,
	onIndicatorClick = null,
}) => {
	const [showTouchTooltip, setShowTouchTooltip] = useState(false);
	const [desktopTooltip, setDesktopTooltip] = useState(null);
	const touchTimerRef = useRef(null);
	const wasLongPress = useRef(false);
	const pillRef = useRef(null);

	const handleMouseEnter = useCallback(() => {
		if (!meaning) return;
		const rect = pillRef.current?.getBoundingClientRect();
		if (!rect) return;
		const rawX = rect.left + rect.width / 2;
		const x = Math.max(110, Math.min(window.innerWidth - 110, rawX));
		setDesktopTooltip({ left: x, top: rect.top - 6 });
	}, [meaning]);

	const handleMouseLeave = useCallback(() => {
		setDesktopTooltip(null);
	}, []);

	const handleTouchStart = useCallback(() => {
		wasLongPress.current = false;
		if (!meaning) return;
		touchTimerRef.current = setTimeout(() => {
			wasLongPress.current = true;
			setShowTouchTooltip(true);
		}, 400);
	}, [meaning]);

	const handleTouchEnd = useCallback((e) => {
		clearTimeout(touchTimerRef.current);
		setShowTouchTooltip(false);
		if (wasLongPress.current) {
			e.preventDefault();
			wasLongPress.current = false;
		}
	}, []);

	const handleTouchMove = useCallback(() => {
		clearTimeout(touchTimerRef.current);
		setShowTouchTooltip(false);
	}, []);

	const handleClick = useCallback(
		(e) => {
			if (wasLongPress.current) {
				wasLongPress.current = false;
				return;
			}
			onClick?.(e);
		},
		[onClick]
	);

	const className = `pill ${type} ${state}`.trim();

	return (
		<div
			ref={pillRef}
			className={className}
			onClick={handleClick}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchMove={handleTouchMove}>
			{state === "double-clicked" && (type === "feeling" || type === "feelings" || type === "need" || type === "needs") && (
				<span className="pill-strong-badge">●</span>
			)}
			{item}
			{indicator === "plus" && <span className="pill-expand-hint">→</span>}
			{indicator === "chevron" && (
				<span
					className="pill-chevron"
					onClick={(e) => {
						e.stopPropagation();
						onIndicatorClick?.();
					}}>
					›
				</span>
			)}
			{indicator === "info" && (
				<span
					className="pill-info"
					onClick={(e) => {
						e.stopPropagation();
						onIndicatorClick?.();
					}}>
					?
				</span>
			)}
			{showTouchTooltip && meaning && <div className="pill-tooltip-touch">{meaning}</div>}
			{desktopTooltip && meaning && (
				<div
					className="pill-tooltip-desktop"
					style={{ left: desktopTooltip.left, top: desktopTooltip.top }}>
					{meaning}
				</div>
			)}
		</div>
	);
};

export default Pill;
