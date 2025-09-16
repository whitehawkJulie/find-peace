import React, { createContext, useContext, useState } from "react";

// Create context
const WizardContext = createContext();

// Hook to use context
export const useWizard = () => useContext(WizardContext);

// Step components
import Introduction from "./Introduction";
import Observation from "./Observation";
import Feelings from "./Feelings";
import FauxFeelingsUnpackCard from "./FauxFeelingsUnpackCard";

import Needs from "./Needs";
import NeedsMet from "./NeedsMet";
import NeedsUnmet from "./NeedsUnmet";
import Review from "./Review";
import BodyCheckIn from "./BodyCheckIn";

// Full list of steps
const allSteps = [
	{ component: Introduction, title: "Intro", optional: true },
	{ component: Observation, title: "Observation" },
	{ component: BodyCheckIn, title: "Body", optional: true },
	{ component: Feelings, title: "Feelings" },
	{ component: FauxFeelingsUnpackCard, title: "Faux Feelings" },
	{ component: Needs, title: "Needs" },
	{
		component: NeedsMet,
		title: "Met",
		optional: true,
		condition: (state) => Object.values(state.needs || {}).includes("double-clicked"),
	},
	{ component: NeedsUnmet, title: "Unmet", optional: true },
	{ component: Review, title: "Review", optional: true },
];

export const WizardProvider = ({ children }) => {
	// App-wide state
	const [stepIndex, setStepIndex] = useState(0);
	const [jackalTalk, setJackalTalk] = useState("");

	const [observation, setObservation] = useState("");
	const [feelings, setFeelings] = useState({});
	const [needs, setNeeds] = useState({});

	const visibleSteps = allSteps.filter((step) =>
		step.condition ? step.condition({ observation, feelings, needs }) : true
	);

	const currentStep = visibleSteps[stepIndex];

	const value = {
		stepIndex,
		setStepIndex,
		jackalTalk,
		setJackalTalk,
		observation,
		setObservation,
		feelings,
		setFeelings,
		needs,
		setNeeds,
		visibleSteps,
		currentStep,
	};

	return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};
