import { useEffect, useRef } from "react";
import { useWizard } from "../components/WizardContext";

/**
 * Manages browser history for overlay UI elements (drawers, modals, popups)
 * so the back button closes them instead of navigating away.
 *
 * @param {boolean} isOpen   - Whether the overlay is currently open
 * @param {Function} onClose - Called to close the overlay (e.g. () => setOpen(false))
 * @param {string} overlayKey - Unique identifier stored in the history state entry
 *
 * @returns {{ closeWithCleanup, cleanupHistory }}
 *   closeWithCleanup — use on all UI close buttons (X, backdrop click, Escape).
 *                      Removes the overlay's history entry then calls onClose().
 *   cleanupHistory   — only the history removal part, without calling onClose.
 *                      Useful when the "close" action is more complex (e.g. Done vs Cancel).
 */
export function useOverlayHistory(isOpen, onClose, overlayKey) {
	const { stepIndex } = useWizard();
	const stepIndexRef = useRef(stepIndex);
	const pushedRef = useRef(false);

	// Stable ref to onClose so the popstate listener doesn't need to re-register
	const onCloseRef = useRef(onClose);
	useEffect(() => {
		onCloseRef.current = onClose;
	}, [onClose]);

	// Keep stepIndexRef up-to-date for replaceState calls
	useEffect(() => {
		stepIndexRef.current = stepIndex;
	}, [stepIndex]);

	// Push a history entry when the overlay opens
	useEffect(() => {
		if (isOpen) {
			history.pushState({ overlay: overlayKey }, "");
			pushedRef.current = true;
		}
	}, [isOpen, overlayKey]);

	// Intercept the back button: close the overlay instead of navigating
	useEffect(() => {
		const handler = () => {
			if (pushedRef.current) {
				pushedRef.current = false;
				onCloseRef.current();
			}
		};
		window.addEventListener("popstate", handler);
		return () => window.removeEventListener("popstate", handler);
	}, []); // stable — uses refs internally

	// Remove the overlay's history entry without firing popstate.
	// Call this whenever the overlay is closed via UI (not back button).
	const cleanupHistory = () => {
		if (pushedRef.current) {
			pushedRef.current = false;
			history.replaceState({ stepIndex: stepIndexRef.current }, "");
		}
	};

	// Convenience: cleanup + close in one call
	const closeWithCleanup = () => {
		cleanupHistory();
		onCloseRef.current();
	};

	return { closeWithCleanup, cleanupHistory };
}
