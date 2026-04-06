/**
 * analytics.js — lightweight, privacy-safe analytics for Find Peace
 *
 * Principles:
 *   • No user-entered text is captured or sent
 *   • No IP addresses logged (handled server-side)
 *   • Anonymous session IDs only (sessionStorage, cleared on tab close)
 *   • Events batched and sent every 10 s, or on visibility-hide / unload
 *   • Fails silently if the endpoint is unavailable
 *
 * Debug mode: set localStorage item 'fp_analytics_debug' to 'true' to log
 * events to the console instead of posting them.
 */

// ─── Session ─────────────────────────────────────────────────────────────────
const SESSION_ID =
	typeof crypto !== "undefined" && typeof crypto.randomUUID === "function"
		? crypto.randomUUID()
		: Math.random().toString(36).slice(2) + Date.now().toString(36);

try {
	sessionStorage.setItem("fp_session", SESSION_ID);
} catch {
	// sessionStorage unavailable — continue without persisting
}

export const SESSION_START = Date.now();

// ─── Config ───────────────────────────────────────────────────────────────────
const ENDPOINT = "/scripts/analytics.php";
const BATCH_MS = 10_000; // flush every 10 s
const IDLE_THRESHOLD = 30_000; // 30 s of no activity = idle
const SAMPLE_INTERVAL = 5_000; // poll active/idle every 5 s

const DEBUG = (() => {
	try {
		return localStorage.getItem("fp_analytics_debug") === "true";
	} catch {
		return false;
	}
})();

// ─── Event queue + flush ─────────────────────────────────────────────────────
const queue = [];
let flushTimer = null;

export function trackEvent(name, payload = {}) {
	const event = {
		event: name,
		session_id: SESSION_ID,
		timestamp: Date.now(),
		...payload,
	};
	if (DEBUG) {
		// eslint-disable-next-line no-console
		console.log("[analytics]", event);
		return;
	}
	queue.push(event);
	scheduleFlush();
}

function scheduleFlush() {
	if (flushTimer) return;
	flushTimer = setTimeout(flush, BATCH_MS);
}

export function flush() {
	if (flushTimer) {
		clearTimeout(flushTimer);
		flushTimer = null;
	}
	if (queue.length === 0) return;
	const events = queue.splice(0); // drain
	try {
		fetch(ENDPOINT, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(events),
			keepalive: true, // survives page unload
		});
	} catch {
		// fail silently
	}
}

// Flush when page hides or unloads (covers mobile tab-switch and desktop close)
document.addEventListener("visibilitychange", () => {
	if (document.visibilityState === "hidden") flush();
});
window.addEventListener("pagehide", flush, { passive: true });

// ─── Active/idle page timer ───────────────────────────────────────────────────
let lastActivityTime = Date.now();
let pageEnterTime = null;
let activeMsAccum = 0;
let idleMsAccum = 0;
let samplerTimer = null;

// Track any user activity
["mousemove", "keydown", "scroll", "touchstart"].forEach((evt) =>
	window.addEventListener(evt, () => { lastActivityTime = Date.now(); }, { passive: true }),
);

// Also reset idle clock on window focus
window.addEventListener("focus", () => { lastActivityTime = Date.now(); });

export let currentPage = "unknown";

/** Call when entering a new page. Resets timer and accumulators. */
export function startPage(pageName) {
	currentPage = pageName;
	pageEnterTime = Date.now();
	activeMsAccum = 0;
	idleMsAccum = 0;
	if (samplerTimer) clearInterval(samplerTimer);
	samplerTimer = setInterval(() => {
		if (Date.now() - lastActivityTime < IDLE_THRESHOLD) {
			activeMsAccum += SAMPLE_INTERVAL;
		} else {
			idleMsAccum += SAMPLE_INTERVAL;
		}
	}, SAMPLE_INTERVAL);
}

/** Call when leaving a page. Stops the timer, returns { time_active_ms, time_idle_ms }. */
export function endPage() {
	if (samplerTimer) {
		clearInterval(samplerTimer);
		samplerTimer = null;
	}
	return { time_active_ms: activeMsAccum, time_idle_ms: idleMsAccum };
}

// ─── Navigation method hint ───────────────────────────────────────────────────
// Callers set this before calling setStepIndex so the centralised navigation
// tracker in NvcWizard can attach the method to the navigation event.
let _pendingNavMethod = null;

export function setPendingNavMethod(method) {
	_pendingNavMethod = method;
}

export function consumeNavMethod() {
	const m = _pendingNavMethod;
	_pendingNavMethod = null;
	return m;
}

// ─── Length bucket ────────────────────────────────────────────────────────────
export function lengthBucket(str) {
	const n = (str || "").length;
	if (n === 0) return "0";
	if (n <= 20) return "1-20";
	if (n <= 100) return "21-100";
	return "100+";
}

// ─── Global field tracker ─────────────────────────────────────────────────────
// Fires field_interaction once per unique field per session, on blur.
// Captures only: field ID, whether filled, length bucket — NEVER the text itself.
const trackedFields = new Set();

document.addEventListener(
	"focusout",
	(e) => {
		const el = e.target;
		if (el.tagName !== "TEXTAREA" && el.tagName !== "INPUT") return;
		// Skip non-text inputs
		if (el.type && ["checkbox", "radio", "hidden", "submit", "button"].includes(el.type)) return;
		// Skip the passphrase fields (they have type=password)
		if (el.type === "password") return;

		const id = el.dataset.fieldId || el.name || el.id || "unknown";
		const sessionKey = `${currentPage}:${id}`;
		if (trackedFields.has(sessionKey)) return; // already tracked this field this session
		trackedFields.add(sessionKey);

		const val = el.value || "";
		trackEvent("field_interaction", {
			page_name: currentPage,
			field_id: id,
			filled: val.length > 0,
			length_bucket: lengthBucket(val),
		});
	},
	true, // capture phase — catches all inputs regardless of component structure
);
