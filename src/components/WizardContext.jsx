import React, { createContext, useContext, useState } from "react";

// Create context
const WizardContext = createContext();

// Hook to use context
export const useWizard = () => useContext(WizardContext);

// Step components
import Observation from "./Observation";
import Feelings from "./Feelings";
import Needs from "./Needs";
import NeedsMet from "./NeedsMet";
import NeedsUnmet from "./NeedsUnmet";

// Full list of steps
const allSteps = [
	{ component: Observation },
	{ component: Feelings },
	{ component: Needs },
	{
		component: NeedsMet,
		condition: (state) => Object.values(state.needs || {}).includes("double"),
	},
	{ component: NeedsUnmet },
];

export const WizardProvider = ({ children }) => {
	// App-wide state
	const [stepIndex, setStepIndex] = useState(0);
	const [observation, setObservation] = useState("");
	const [feelings, setFeelings] = useState({});
	const [needs, setNeeds] = useState({});

	// Filter steps by condition
	const visibleSteps = allSteps.filter((step) =>
		step.condition ? step.condition({ observation, feelings, needs }) : true
	);

	// Current step info
	const currentStep = visibleSteps[stepIndex]?.component;

	const value = {
		stepIndex,
		setStepIndex,
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
