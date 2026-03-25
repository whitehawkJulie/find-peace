/**
 * Content resolver — resolves text from the content registry.
 *
 * TONE axis:    'polite' (default) | 'sweary'      — from settings
 * CORE axis:    'fear' | 'anger' | 'distress'      — future: derived from user answers
 *
 * Fallback order for a content node:
 *   1. variants[tone][core]   — exact tone + core match
 *   2. tone[tone]             — tone-only match
 *   3. core[core]             — core-only match
 *   4. default                — catch-all
 *
 * Content nodes look like:
 *   { default: "...", tone: { sweary: "..." }, core: { fear: "..." }, variants: { sweary: { fear: "..." } } }
 *
 * Not every field is required — the resolver degrades gracefully.
 */

import { registry } from "./index.js";

/**
 * Resolves a single content node to a string or React element.
 *
 * If `node` is already a primitive or React element it is returned directly,
 * so plain strings and JSX values can coexist in content files without wrapping.
 *
 * @param {*} node
 * @param {{ tone?: string, core?: string }} context
 * @returns {string|React.ReactElement}
 */
export function resolveNode(node, context = {}) {
	if (node === null || node === undefined) return "";

	// Primitives — return as-is
	if (typeof node === "string" || typeof node === "number") return node;

	// React elements ($$typeof is set on all React elements)
	if (typeof node === "object" && node.$$typeof) return node;

	// Arrays (plain list data) — pass through untouched
	if (Array.isArray(node)) return node;

	const { tone, core } = context;

	// 1. Exact tone + core match via variants
	if (tone && core && node.variants?.[tone]?.[core] !== undefined) {
		return node.variants[tone][core];
	}

	// 2. Tone-only match
	if (tone && node.tone?.[tone] !== undefined) {
		return node.tone[tone];
	}

	// 3. Core-only match
	if (core && node.core?.[core] !== undefined) {
		return node.core[core];
	}

	// 4. Default
	return node.default ?? "";
}

/**
 * Gets resolved text from the registry by dot-separated key path.
 *
 * @param {string} keyPath  e.g. "observation.jackalSection.intro1"
 * @param {{ tone?: string, core?: string }} context
 * @returns {string|React.ReactElement}
 *
 * @example
 * getText("observation.title", { tone: "sweary" })
 * // → "What the hell just happened?"
 */
export function getText(keyPath, context = {}) {
	const parts = keyPath.split(".");
	let node = registry;

	for (const part of parts) {
		node = node?.[part];
		if (node === undefined) {
			if (typeof process === "undefined" || process.env?.NODE_ENV !== "production") {
				// eslint-disable-next-line no-console
				console.warn(`[getText] Missing content key: "${keyPath}"`);
			}
			return "";
		}
	}

	return resolveNode(node, context);
}
