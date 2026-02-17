import React, { createContext, useContext, useState } from "react";

// Create context
const WizardContext = createContext();

// Hook to use context
export const useWizard = () => useContext(WizardContext);

// Step components
import Introduction from "./Introduction";
import Observation from "./Observation";
import Feelings from "./Feelings";
import Needs from "./Needs";
import NeedsMet from "./NeedsMet";
import NeedExploration from "./NeedExploration";
import StrategyDiscovery from "./StrategyDiscovery";
import MakingGuesses from "./MakingGuesses";
import RequestFormulation from "./RequestFormulation";
import Review from "./Review";
import BodyCheckIn from "./BodyCheckIn";

// Full list of steps
const allSteps = [
	{ component: Introduction, title: "Intro", optional: true },
	{ component: Observation, title: "Observation" },
	{
		component: BodyCheckIn,
		title: "Body",
		pause: "Let's slow down for a moment. Before we name anything, let's just notice what's happening in your body...",
	},
	{ component: Feelings, title: "Feelings" },
	{
		component: Needs,
		title: "Needs",
		pause: "Now that you've named what you're feeling, let's look at what those feelings are pointing to — the needs underneath...",
	},
	{
		component: NeedsMet,
		title: "Met",
		optional: true,
		condition: (state) => Object.values(state.needs || {}).includes("double-clicked"),
	},
	{
		component: NeedExploration,
		title: "Explore",
		optional: true,
		condition: (state) => Object.values(state.needs || {}).includes("clicked"),
		pause: "Take a breath. You've done important work naming your needs. Now let's go deeper — exploring what these needs really mean to you...",
	},
	{
		component: StrategyDiscovery,
		title: "Strategies",
		optional: true,
		condition: (state) => Object.values(state.needs || {}).includes("clicked"),
		pause: "Now let's think about what might actually help — concrete things you could do to meet these needs...",
	},
	{ component: MakingGuesses, title: "Their View", optional: true },
	{ component: RequestFormulation, title: "Request", optional: true },
	{ component: Review, title: "Review", optional: true },
];

export const WizardProvider = ({ children }) => {
	// App-wide state
	const [stepIndex, setStepIndex] = useState(0);
	const [jackalTalk, setJackalTalk] = useState("");
	const [observation, setObservation] = useState("");
	const [bodyScan, setBodyScan] = useState({});
	const [feelings, setFeelings] = useState({});
	const [needs, setNeeds] = useState({});

	// Beauty of the Needs exploration
	const [needExplorations, setNeedExplorations] = useState({});
	const [currentExploringNeed, setCurrentExploringNeed] = useState(null);
	const [explorationStep, setExplorationStep] = useState(0);

	// Strategies
	const [strategies, setStrategies] = useState({});

	// Making Guesses (other person's perspective)
	const [guessObservation, setGuessObservation] = useState("");
	const [guessFeelings, setGuessFeelings] = useState({});
	const [guessNeeds, setGuessNeeds] = useState({});

	// Requests
	const [requestOfSelf, setRequestOfSelf] = useState("");
	const [requestOfOther, setRequestOfOther] = useState("");

	// Saved entries (loaded from localStorage)
	const [savedEntries, setSavedEntries] = useState(() => {
		try {
			const saved = localStorage.getItem("findPeaceSessions");
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});

	// Build state object for step conditions
	const state = { observation, feelings, needs, needExplorations, strategies };
	const visibleSteps = allSteps.filter((step) =>
		step.condition ? step.condition(state) : true
	);

	const currentStep = visibleSteps[stepIndex];

	// Save current session to localStorage
	const saveSession = () => {
		const session = {
			id: Date.now(),
			date: new Date().toISOString(),
			jackalTalk,
			observation,
			bodyScan,
			feelings,
			needs,
			needExplorations,
			strategies,
			guessObservation,
			guessFeelings,
			guessNeeds,
			requestOfSelf,
			requestOfOther,
		};
		const updated = [...savedEntries, session];
		setSavedEntries(updated);
		localStorage.setItem("findPeaceSessions", JSON.stringify(updated));
		return session;
	};

	// Load a past session back into the wizard
	const loadSession = (session) => {
		setJackalTalk(session.jackalTalk || "");
		setObservation(session.observation || "");
		setBodyScan(session.bodyScan || {});
		setFeelings(session.feelings || {});
		setNeeds(session.needs || {});
		setNeedExplorations(session.needExplorations || {});
		setCurrentExploringNeed(null);
		setExplorationStep(0);
		setStrategies(session.strategies || {});
		setGuessObservation(session.guessObservation || "");
		setGuessFeelings(session.guessFeelings || {});
		setGuessNeeds(session.guessNeeds || {});
		setRequestOfSelf(session.requestOfSelf || "");
		setRequestOfOther(session.requestOfOther || "");
		setStepIndex(0);
	};

	// Start a fresh session
	const resetSession = () => {
		setStepIndex(0);
		setJackalTalk("");
		setObservation("");
		setBodyScan({});
		setFeelings({});
		setNeeds({});
		setNeedExplorations({});
		setCurrentExploringNeed(null);
		setExplorationStep(0);
		setStrategies({});
		setGuessObservation("");
		setGuessFeelings({});
		setGuessNeeds({});
		setRequestOfSelf("");
		setRequestOfOther("");
	};

	// Delete a saved session
	const deleteSession = (sessionId) => {
		const updated = savedEntries.filter((s) => s.id !== sessionId);
		setSavedEntries(updated);
		localStorage.setItem("findPeaceSessions", JSON.stringify(updated));
	};

	const value = {
		stepIndex,
		setStepIndex,
		jackalTalk,
		setJackalTalk,
		observation,
		setObservation,
		bodyScan,
		setBodyScan,
		feelings,
		setFeelings,
		needs,
		setNeeds,
		needExplorations,
		setNeedExplorations,
		currentExploringNeed,
		setCurrentExploringNeed,
		explorationStep,
		setExplorationStep,
		strategies,
		setStrategies,
		guessObservation,
		setGuessObservation,
		guessFeelings,
		setGuessFeelings,
		guessNeeds,
		setGuessNeeds,
		requestOfSelf,
		setRequestOfSelf,
		requestOfOther,
		setRequestOfOther,
		savedEntries,
		saveSession,
		loadSession,
		resetSession,
		deleteSession,
		visibleSteps,
		currentStep,
	};

	return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};
