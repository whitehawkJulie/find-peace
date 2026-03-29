import React from "react";
import { getNeedData } from "../utils/renderHelpers";
import { resolvePrompts } from "../utils/resolvePrompts";

// Build the list of clarify prompts for a need, resolving any library refs
export const getClarifyPrompts = (needName) => {
	const needData = getNeedData(needName);
	if (!needData?.clarify) return null;

	const resolved = resolvePrompts(needData.clarify.prompts);
	return {
		core: resolved.filter((p) => p.tier === "core"),
		deeper: resolved.filter((p) => p.tier === "deeper"),
	};
};

// NeedExploration is no longer a wizard step (replaced by NeedUnpacking),
// but its title and helpContent are still used by HelpIndex.
const NeedExploration = () => null;

NeedExploration.title = "Exploring Your Needs";

export default NeedExploration;
