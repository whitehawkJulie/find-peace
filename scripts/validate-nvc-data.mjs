/**
 * validate-nvc-data.mjs
 *
 * Development-only validation script for the Untangle This emotional ontology.
 *
 * WHY THIS EXISTS:
 * We are working with a large, evolving structured data model
 * (feelings, needs, story words, empathy guesses).
 *
 * This script protects us from:
 * - Silent mismatches (e.g., suggestedFeeling not in canonical list)
 * - Accidental deletions
 * - Duplicate entries
 * - Drift in casing conventions
 * - Broken prompt refs / clarify structures
 *
 * It does NOT enforce philosophical correctness.
 * It enforces structural integrity.
 *
 * ---------------------------------------------
 * MINIMAL VALIDATOR – WHAT IT CHECKS
 * ---------------------------------------------
 *
 * A. CANONICAL SETS
 *    - All unmet feelings items (your canonical unmet list)
 *    - All needs items (your canonical needs list)
 *
 * B. FOR EACH storyWord ("Words We Often Use...")
 *    - Every suggestedFeelings[] exists in canonical unmet feelings
 *      OR is explicitly allow-listed (optional hook below)
 *    - Every suggestedNeeds[] exists in canonical needs
 *    - No duplicates inside suggestedFeelings or suggestedNeeds
 *    - Casing consistency (feelings lowercase, needs Title Case)
 *
 * C. WARNINGS (not hard errors) for:
 *    - Missing storyHint
 *    - Missing empathyGuesses
 *    - Too many suggestedNeeds (> 8)
 *
 * D. CLARIFY VALIDATION (needs + feelings)
 *    - If item.clarify exists:
 *        - clarify.type is one of: murky | needs-clarify | deepen | differentiate
 *        - clarify.prompts is an array
 *        - Each prompt is EITHER:
 *            - Inline prompt: { type, question, ... }
 *            - Ref prompt: { ref: "KEY", override?: { ... } }
 *        - Ref keys must exist in clarifyPromptLibrary
 *        - Inline prompts must include required fields
 *        - Library prompts must include required fields (warn/error)
 *    - Warn if murky feelings (angry/anxious/depressed/ashamed/guilty) are missing clarify
 *
 * Hard errors cause exit code 1.
 * Warnings do not block execution.
 */

import { Feelings } from "../src/data/AllFeelingsData.js";
import { Needs } from "../src/data/AllNeedsData.js";
import clarifyPromptLibrary from "../src/data/clarifyPromptLibrary.js";

/* --------------------------------------------------
   Configuration
-------------------------------------------------- */

/**
 * If you ever intentionally allow a feeling suggestion that is not in canonical unmet,
 * add it here (lowercase). Example: if you later add "powerless" as a cognitive feeling
 * but haven't yet placed it into the unmet list.
 */
const ALLOWED_NONCANON_FEELINGS = new Set([
	// "powerless",
]);

/**
 * "Murky" feelings that we generally expect to have immediate clarify support.
 * (Warn only — not an error.)
 */
const MURKY_FEELINGS = new Set(["angry", "anxious", "depressed", "ashamed", "guilty"]);

/* --------------------------------------------------
   Utility helpers
-------------------------------------------------- */

function isNonEmptyString(x) {
	return typeof x === "string" && x.trim().length > 0;
}

function norm(s) {
	return typeof s === "string" ? s.trim() : s;
}

function findDuplicates(arr) {
	const seen = new Set();
	const dupes = new Set();
	for (const x of arr) {
		if (seen.has(x)) dupes.add(x);
		seen.add(x);
	}
	return [...dupes];
}

function looksLikeTitleCase(s) {
	// Loose heuristic: starts with capital letter.
	// Your needs include punctuation like "To be heard" so keep this gentle.
	return typeof s === "string" && /^[A-Z]/.test(s.trim());
}

function looksLikeLowercase(s) {
	return typeof s === "string" && /^[a-z]/.test(s.trim());
}

/* --------------------------------------------------
   Generic walkers (support BOTH object-groups and array-groups)
-------------------------------------------------- */

/**
 * Walk a "groups" container that might be:
 * - object: { GroupName: [items...] , ... }
 * - array:  [{ key, ui, items: [...] }, ...]
 * - hybrid: { groupKey: { ui, items:[...] } }
 *
 * Calls cb({ groupKey, item, path })
 */
function walkGroups(groups, basePath, cb) {
	if (!groups) return;

	// Array-of-groups shape
	if (Array.isArray(groups)) {
		for (let gi = 0; gi < groups.length; gi++) {
			const g = groups[gi];
			const groupKey = g?.key ?? g?.groupKey ?? g?.name ?? `(unnamed-group-${gi})`;
			const items = g?.items ?? g?.entries ?? [];
			const groupPath = `${basePath}.groups[${groupKey}]`;
			if (Array.isArray(items)) {
				for (let i = 0; i < items.length; i++) {
					cb({
						groupKey,
						item: items[i],
						path: `${groupPath}.items[${i}]`,
					});
				}
			}
		}
		return;
	}

	// Object-of-groups shape
	if (groups && typeof groups === "object") {
		for (const [groupKey, arr] of Object.entries(groups)) {
			const groupPath = `${basePath}.groups.${groupKey}`;

			// Classic: { groupKey: [items...] }
			if (Array.isArray(arr)) {
				for (let i = 0; i < arr.length; i++) {
					cb({
						groupKey,
						item: arr[i],
						path: `${groupPath}[${i}]`,
					});
				}
				continue;
			}

			// Hybrid: { groupKey: { ui, items:[...] } }
			if (arr && typeof arr === "object" && Array.isArray(arr.items)) {
				for (let i = 0; i < arr.items.length; i++) {
					cb({
						groupKey,
						item: arr.items[i],
						path: `${groupPath}.items[${i}]`,
					});
				}
			}
		}
	}
}

/**
 * Walk sections: { key: sectionObj, ... }
 * Calls cb({ sectionKey, sectionObj, path })
 */
function walkSections(sections, basePath, cb) {
	if (!sections || typeof sections !== "object") return;
	for (const [sectionKey, sectionObj] of Object.entries(sections)) {
		cb({
			sectionKey,
			sectionObj,
			path: `${basePath}.sections.${sectionKey}`,
		});
	}
}

/* --------------------------------------------------
   Canonical flatteners
-------------------------------------------------- */

function collectCanonicalUnmetFeelings(FeelingsRoot) {
	// Expect: Feelings.sections.feelings.groups...
	const unmet = FeelingsRoot?.sections?.feelings;
	const out = [];

	if (!unmet) return out;

	walkGroups(unmet.groups, "Feelings.sections.feelings", ({ item }) => {
		if (isNonEmptyString(item?.item)) out.push(item.item);
	});

	return out.map(norm).filter(isNonEmptyString);
}

function collectCanonicalNeeds(NeedsRoot) {
	// Expect: Needs.sections.<section>.groups...
	const out = [];

	walkSections(NeedsRoot?.sections, "Needs", ({ sectionObj, path }) => {
		walkGroups(sectionObj?.groups, path, ({ item }) => {
			if (isNonEmptyString(item?.item)) out.push(item.item);
		});
	});

	return out.map(norm).filter(isNonEmptyString);
}

function collectStoryWords(FeelingsRoot) {
	// Expect story words live at Feelings.sections.story
	const story = FeelingsRoot?.sections?.story;
	const out = [];

	if (!story) return out;

	walkGroups(story.groups, "Feelings.sections.story", ({ item, groupKey, path }) => {
		if (item && typeof item === "object" && isNonEmptyString(item.item)) {
			out.push({ groupKey, path, ...item });
		}
	});

	return out;
}

/* --------------------------------------------------
   Reporting helpers
-------------------------------------------------- */

let hadError = false;
let warnCount = 0;

function warn(msg) {
	warnCount++;
	console.log(`! WARN: ${msg}`);
}

function error(msg) {
	hadError = true;
	console.log(`✗ ERROR: ${msg}`);
}

/* --------------------------------------------------
   CLARIFY VALIDATION
-------------------------------------------------- */

function isValidPromptType(t) {
	return t === "text" || t === "singleChoice" || t === "multiChoice";
}

function validateLibraryPromptShape(libPrompt, contextPath) {
	if (!libPrompt || typeof libPrompt !== "object") {
		error(`${contextPath}: clarifyPromptLibrary entry is missing or not an object`);
		return;
	}

	const { type, question, options } = libPrompt;

	if (!isValidPromptType(type)) {
		error(`${contextPath}: clarifyPromptLibrary prompt has invalid type "${type}"`);
	}
	if (!isNonEmptyString(question)) {
		error(`${contextPath}: clarifyPromptLibrary prompt missing question`);
	}
	if ((type === "singleChoice" || type === "multiChoice") && !Array.isArray(options)) {
		error(`${contextPath}: clarifyPromptLibrary choice prompt missing options[]`);
	}
}

function validateInlinePromptShape(prompt, contextPath) {
	const { type, question, options, stem } = prompt;

	if (!isValidPromptType(type)) {
		error(`${contextPath}: inline prompt has invalid type "${type}"`);
	}
	if (!isNonEmptyString(question)) {
		error(`${contextPath}: inline prompt missing question`);
	}
	if ((type === "singleChoice" || type === "multiChoice") && !Array.isArray(options)) {
		error(`${contextPath}: choice prompt missing options[]`);
	}
	if (stem !== undefined && typeof stem !== "string") {
		error(`${contextPath}: stem must be a string if provided`);
	}
}

function validateClarify(clarify, contextPath) {
	if (!clarify) return;

	const allowedModes = ["murky", "needs-clarify", "deepen", "differentiate"];
	if (!allowedModes.includes(clarify.type)) {
		error(`${contextPath}: clarify.type "${clarify.type}" is invalid`);
	}

	if (!Array.isArray(clarify.prompts)) {
		error(`${contextPath}: clarify.prompts must be an array`);
		return;
	}

	for (let i = 0; i < clarify.prompts.length; i++) {
		const p = clarify.prompts[i];
		const promptPath = `${contextPath}: clarify.prompts[${i}]`;

		if (!p || typeof p !== "object") {
			error(`${promptPath}: prompt must be an object`);
			continue;
		}

		// Ref prompt
		if (isNonEmptyString(p.ref)) {
			const key = p.ref.trim();
			if (!clarifyPromptLibrary || typeof clarifyPromptLibrary !== "object") {
				error(`${promptPath}: clarifyPromptLibrary is not an object (import issue?)`);
				continue;
			}
			if (!clarifyPromptLibrary[key]) {
				error(`${promptPath}: ref "${key}" not found in clarifyPromptLibrary`);
				continue;
			}

			validateLibraryPromptShape(clarifyPromptLibrary[key], `${promptPath}: clarifyPromptLibrary["${key}"]`);

			if (p.override !== undefined && (typeof p.override !== "object" || Array.isArray(p.override))) {
				error(`${promptPath}: override must be an object if provided`);
			}

			// Optional: validate override fields if present
			if (p.override && typeof p.override === "object") {
				if (p.override.type !== undefined)
					warn(`${promptPath}: override contains type (unusual; check intent)`);
				if (p.override.options !== undefined && !Array.isArray(p.override.options)) {
					error(`${promptPath}: override.options must be an array if provided`);
				}
				if (p.override.question !== undefined && typeof p.override.question !== "string") {
					error(`${promptPath}: override.question must be a string if provided`);
				}
				if (p.override.stem !== undefined && typeof p.override.stem !== "string") {
					error(`${promptPath}: override.stem must be a string if provided`);
				}
			}

			continue;
		}

		// Inline prompt
		validateInlinePromptShape(p, promptPath);
	}
}

/**
 * Walk every item that appears in a Feelings section that has groups,
 * and validate item.clarify if present.
 */
function validateAllFeelingsClarify(FeelingsRoot) {
	const sections = FeelingsRoot?.sections;
	if (!sections || typeof sections !== "object") return;

	for (const [sectionKey, sectionObj] of Object.entries(sections)) {
		// story words are handled elsewhere; but if you ever add clarify there, this will still validate it
		if (!sectionObj || typeof sectionObj !== "object") continue;
		if (!sectionObj.groups) continue;

		const basePath = `Feelings.sections.${sectionKey}`;
		walkGroups(sectionObj.groups, basePath, ({ groupKey, item, path }) => {
			if (!item || typeof item !== "object") return;
			if (!isNonEmptyString(item.item)) return;

			const ctx = `${item.item} @ ${path}`;
			if (item.clarify) validateClarify(item.clarify, ctx);

			// Murky feelings: warn if missing clarify (only in unmet section, but safe regardless)
			const lower = item.item.toLowerCase();
			if (MURKY_FEELINGS.has(lower) && !item.clarify) {
				warn(`Murky feeling "${item.item}" missing clarify @ ${path}`);
			}
		});
	}
}

/**
 * Walk every needs item and validate item.clarify if present.
 */
function validateAllNeedsClarify(NeedsRoot) {
	const sections = NeedsRoot?.sections;
	if (!sections || typeof sections !== "object") return;

	for (const [sectionKey, sectionObj] of Object.entries(sections)) {
		if (!sectionObj || typeof sectionObj !== "object") continue;
		if (!sectionObj.groups) continue;

		const basePath = `Needs.sections.${sectionKey}`;
		walkGroups(sectionObj.groups, basePath, ({ item, path }) => {
			if (!item || typeof item !== "object") return;
			if (!isNonEmptyString(item.item)) return;

			const ctx = `${item.item} @ ${path}`;
			if (item.clarify) validateClarify(item.clarify, ctx);
		});
	}
}

/* --------------------------------------------------
   Validation
-------------------------------------------------- */

const canonicalUnmet = collectCanonicalUnmetFeelings(Feelings);
const canonicalNeeds = collectCanonicalNeeds(Needs);

if (canonicalUnmet.length === 0) {
	warn(
		"Canonical unmet feelings set is empty. Check AllFeelingsData.js exports and structure (Feelings.sections.unmet.groups).",
	);
}
if (canonicalNeeds.length === 0) {
	warn(
		"Canonical needs set is empty. Check AllNeedsData.js exports and structure (Needs.sections.*.groups). Also confirm all section imports exist.",
	);
}

const unmetSet = new Set(canonicalUnmet);
const needsSet = new Set(canonicalNeeds);

// A. Canonical duplicates (informational)
{
	const dupUnmet = findDuplicates(canonicalUnmet);
	if (dupUnmet.length) warn(`Duplicate unmet feeling items: ${dupUnmet.join(", ")}`);

	const dupNeeds = findDuplicates(canonicalNeeds);
	if (dupNeeds.length) warn(`Duplicate needs items: ${dupNeeds.join(", ")}`);
}

// D. Clarify validation (needs + feelings)
validateAllFeelingsClarify(Feelings);
validateAllNeedsClarify(Needs);

// B. StoryWords checks
const storyWords = collectStoryWords(Feelings);

for (const sw of storyWords) {
	const label = `${sw.item} @ ${sw.path}`;

	// Suggested feelings existence + duplicates + casing
	const sf = Array.isArray(sw.suggestedFeelings) ? sw.suggestedFeelings.map(norm) : [];
	const sfDup = findDuplicates(sf);
	if (sfDup.length) warn(`${label}: duplicate suggestedFeelings: ${sfDup.join(", ")}`);

	for (const f of sf) {
		if (!isNonEmptyString(f)) continue;

		const isAllowed = unmetSet.has(f) || ALLOWED_NONCANON_FEELINGS.has(f);
		if (!isAllowed) {
			error(`${label}: suggestedFeeling not in canonical unmet list: "${f}"`);
		}

		// casing gentle check (warn only)
		if (!looksLikeLowercase(f)) {
			warn(`${label}: suggestedFeeling casing looks non-lowercase: "${f}"`);
		}
	}

	// Suggested needs existence + duplicates + casing
	const sn = Array.isArray(sw.suggestedNeeds) ? sw.suggestedNeeds.map(norm) : [];
	const snDup = findDuplicates(sn);
	if (snDup.length) warn(`${label}: duplicate suggestedNeeds: ${snDup.join(", ")}`);

	for (const n of sn) {
		if (!isNonEmptyString(n)) continue;

		if (!needsSet.has(n)) {
			error(`${label}: suggestedNeed not in canonical needs list: "${n}"`);
		}

		// casing gentle check (warn only)
		if (!looksLikeTitleCase(n)) {
			warn(`${label}: suggestedNeed casing looks non-TitleCase: "${n}"`);
		}
	}

	// C. Soft warnings
	if (!isNonEmptyString(sw.storyHint)) warn(`${label}: missing storyHint`);
	if (!Array.isArray(sw.empathyGuesses) || sw.empathyGuesses.length === 0) {
		warn(`${label}: missing empathyGuesses`);
	}
	if (sn.length > 8) warn(`${label}: suggestedNeeds has ${sn.length} items (may be heavy)`);

	// If story words ever gain clarify, validate it too
	if (sw.clarify) validateClarify(sw.clarify, label);
}

/* --------------------------------------------------
   Summary + exit code
-------------------------------------------------- */

console.log("");
console.log(
	`Validation complete. Canonical unmet feelings: ${canonicalUnmet.length}. Canonical needs: ${canonicalNeeds.length}. Story words: ${storyWords.length}. Warnings: ${warnCount}.`,
);

if (hadError) {
	console.log("One or more errors detected. Exiting with code 1.");
	process.exit(1);
} else {
	console.log("No hard errors detected.");
	process.exit(0);
}
