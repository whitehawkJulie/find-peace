import NeedsSubsistence from "./NeedsSubsistence.js";
import NeedsConnection from "./NeedsConnection.js";
import NeedsMeaning from "./NeedsMeaning.js";
import NeedsFreedom from "./NeedsFreedom.js";

export const Needs = {
	ui: {
		heading: "Needs",
		helpText: "",
	},
	sections: {
		subsistence: NeedsSubsistence,
		connection: NeedsConnection,
		meaning: NeedsMeaning,
		freedom: NeedsFreedom,
	},
};
