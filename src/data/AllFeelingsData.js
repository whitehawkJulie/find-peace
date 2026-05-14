import Feelings from "./Feelings.js";
import FeelingsMet from "./FeelingsMet.js";

import StoryWords from "./StoryWords.js";

export const feelingDescriptionByName = Object.fromEntries(
	Object.values(Feelings.groups).flatMap((g) => g.items.map((it) => [it.item, it.description || ""]))
);

export const AllFeelingsData = {
	ui: {
		heading: "Feelings",
		helpText: "",
	},
	sections: {
		feelings: Feelings,
		story: StoryWords,
		feelingsMet: FeelingsMet,
	},
};
export default AllFeelingsData;
