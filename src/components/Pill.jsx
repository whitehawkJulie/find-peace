import React, { useState, useRef, useCallback } from "react";
import { regulationMeta } from "../data/AllFeelingsData";
import "./Pill.css";

const getRegulationStyle = (regulationType, state) => {
	if (!regulationType) return null;

	const types = Array.isArray(regulationType) ? regulationType : [regulationType];
	const primary = types[0];
	const primaryMeta = regulationMeta[primary];
	if (!primaryMeta) return null;

	const style = {};

	// Always apply background colour
	if (types.length === 1) {
		style.backgroundColor = primaryMeta.colors.bg;
	} else {
		const bgs = types
			.map((t) => regulationMeta[t]?.colors?.bg)
			.filter(Boolean);
		style.background = `linear-gradient(135deg, ${bgs.join(", ")})`;
	}

	// When selected, use red border (let CSS class handle it); otherwise use regulation border
	if (!state) {
		style.borderColor = primaryMeta.colors.border;
		style.border = `1px solid ${primaryMeta.colors.border}`;
	}

	return style;
};

const Pill = ({
	item,
	type = "",
	state = "",
	meaning = "",
	indicator = null, // "plus" | "chevron" | null
	regulationType = null,
	regulationOverlay = false,
	onClick = null,
	onIndicatorClick = null,
}) => {
	const [showTooltip, setShowTooltip] = useState(false);
	const touchTimerRef = useRef(null);
	const wasLongPress = useRef(false);

	const handleTouchStart = useCallback(() => {
		wasLongPress.current = false;
		if (!meaning) return;
		touchTimerRef.current = setTimeout(() => {
			wasLongPress.current = true;
			setShowTooltip(true);
		}, 400);
	}, [meaning]);

	const handleTouchEnd = useCallback(() => {
		clearTimeout(touchTimerRef.current);
		setShowTooltip(false);
	}, []);

	const handleTouchMove = useCallback(() => {
		clearTimeout(touchTimerRef.current);
		setShowTooltip(false);
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

	const regStyle = regulationOverlay ? getRegulationStyle(regulationType, state) : null;
	const className = `pill ${type} ${state} ${regStyle ? "reg-overlay" : ""}`.trim();

	return (
		<div
			className={className}
			style={regStyle || undefined}
			onClick={handleClick}
			onTouchStart={handleTouchStart}
			onTouchEnd={handleTouchEnd}
			onTouchMove={handleTouchMove}
			{...(meaning ? { "data-tooltip": meaning } : {})}>
			{item}
			{indicator === "plus" && <span className="pill-expand-hint">+</span>}
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
			{showTooltip && meaning && <div className="pill-tooltip-touch">{meaning}</div>}
		</div>
	);
};

export default Pill;
