/**
 * AllNeedsData.js
 * ─────────────────────────────────────────────────────────────────
 * Builds the Checklist-compatible section structure from the flat
 * needs array.  Checklist expects:
 *   section: { ui: { heading }, groups: { [key]: { ui: { heading, order }, items: [...] } } }
 *   item:    { item: <label string>, meaning: <short description> }
 */

import allNeeds from "./AllNeedsFlat.js";

// ── Section metadata: family → heading ───────────────────────────
const SECTION_HEADING = {
	Subsistence: "Subsistence Needs",
	Connection: "Connection Needs",
	Meaning: "Meaning Needs",
	Freedom: "Freedom Needs",
};

// ── Group display order within each section ───────────────────────
const GROUP_ORDER = {
	"Physical sustenance": 1,
	Security: 2,
	Affection: 1,
	"To matter": 2,
	Community: 3,
	"Sense of self": 1,
	Understanding: 2,
	Meaning: 3,
	Transcendence: 4,
	"Autonomy & Agency": 1,
	"Leisure & Relaxation": 2,
};

// ── Build one section object from the flat array ─────────────────
function buildSection(familyName) {
	const groups = {};
	for (const need of allNeeds) {
		if (need.family !== familyName) continue;
		const cat = need.category;
		if (!groups[cat]) {
			groups[cat] = {
				ui: { heading: cat, order: GROUP_ORDER[cat] ?? 99 },
				items: [],
			};
		}
		groups[cat].items.push({ item: need.label, meaning: need.helpText });
	}
	return {
		ui: { heading: SECTION_HEADING[familyName] },
		groups,
	};
}

export const Needs = {
	ui: { heading: "Needs", helpText: "" },
	sections: {
		subsistence: buildSection("Subsistence"),
		connection: buildSection("Connection"),
		meaning: buildSection("Meaning"),
		freedom: buildSection("Freedom"),
	},
};
