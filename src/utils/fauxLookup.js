import { feelingsData } from "../components/FeelingsData";
import { fauxNeedsData } from "../components/FauxNeedsData";
import needsData from "../components/NeedsData";

// ========== FAUX FEELINGS ==========

// Build a flat array of all faux feeling items, each annotated with its "home" feeling category
// The home category is determined by the first suggestedFeeling — we find which main category it belongs to
const realFeelingCategories = feelingsData["Feelings when needs are not met"];

function findFeelingCategory(feelingName) {
	for (const [category, items] of Object.entries(realFeelingCategories)) {
		if (items.some((f) => f.item.toLowerCase() === feelingName.toLowerCase())) {
			return category;
		}
	}
	return null;
}

// Build annotated faux feelings list
export const fauxFeelingsList = [];
export const fauxFeelingsMap = new Map();

Object.entries(feelingsData["Faux Feelings"]).forEach(([subCategory, items]) => {
	items.forEach((item) => {
		const firstSuggested = item.suggestedFeelings?.[0];
		const homeCategory = firstSuggested
			? findFeelingCategory(firstSuggested)
			: "Sad"; // fallback

		const annotated = { ...item, subCategory, _homeCategory: homeCategory };
		fauxFeelingsList.push(annotated);
		fauxFeelingsMap.set(item.item, annotated);
	});
});

export const isFauxFeeling = (name) => fauxFeelingsMap.has(name);
export const getFauxFeeling = (name) => fauxFeelingsMap.get(name);

// Build a Set of all faux feeling names
export const fauxFeelingNames = new Set(fauxFeelingsList.map((f) => f.item));

// ========== FAUX NEEDS ==========

// Find which top-level need category a need belongs to (e.g., "Safety (emotional)" → "Subsistence and Security")
function findNeedCategory(needName) {
	for (const [topCategory, subcategories] of Object.entries(needsData)) {
		for (const [, items] of Object.entries(subcategories)) {
			if (items.some((n) => n.item.toLowerCase() === needName.toLowerCase())) {
				return topCategory;
			}
		}
	}
	return null;
}

// Build annotated faux needs list
export const fauxNeedsList = [];
export const fauxNeedsMap = new Map();

Object.entries(fauxNeedsData).forEach(([subCategory, items]) => {
	items.forEach((item) => {
		const firstSuggested = item.suggestedNeeds?.[0];
		const homeCategory = firstSuggested
			? findNeedCategory(firstSuggested)
			: "Connection"; // fallback

		const annotated = { ...item, subCategory, _homeCategory: homeCategory };
		fauxNeedsList.push(annotated);
		fauxNeedsMap.set(item.item, annotated);
	});
});

export const isFauxNeed = (name) => fauxNeedsMap.has(name);
export const getFauxNeed = (name) => fauxNeedsMap.get(name);

// Build a Set of all faux need names
export const fauxNeedNames = new Set(fauxNeedsList.map((n) => n.item));
