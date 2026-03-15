import React, { createContext, useContext, useState, useRef } from "react";

// Create context
const WizardContext = createContext();

// Hook to use context
export const useWizard = () => useContext(WizardContext);

// Step components
import Introduction from "./Introduction";
import Observation from "./Observation";
import Feelings from "./Feelings";
import Needs from "./Needs";
import NeedUnpacking from "./NeedUnpacking";
import MakingGuesses from "./MakingGuesses";
import RequestFormulation from "./RequestFormulation";
import ExploringWhatsChanged from "./ExploringWhatsChanged";
import ConversationsAndCollaboration from "./ConversationsAndCollaboration";
import Review from "./Review";
import FeelingsExploreCard from "./FeelingsExploreCard";

// Data for feeling type regulation step condition
import { AllFeelingsData as FeelingsData } from "../data/AllFeelingsData";
import { pickDominantFeelingType } from "../data/FeelingTypes";

// Build lookup for unmet feelings that have a FeelingType property
const unmetFeelingLookup = {};
const unmetSection = FeelingsData.sections.feelings;
if (unmetSection?.groups) {
	for (const group of Object.values(unmetSection.groups)) {
		for (const item of group.items) {
			if (item.feelingType) {
				unmetFeelingLookup[item.item] = item;
			}
		}
	}
}

// Full list of steps
const allSteps = [
	{ component: Introduction, title: "Intro", optional: true },
	{
		component: Observation,
		title: "Observation",
		pause: (
			<>
				<p>When something feels important or threatening, our systems respond.</p>
				<p>Your response makes sense in context.</p>
				<p>Let's slow it down and discover what matters so much here — so we can take good care of it.</p>
				<p>
					<em>Let's zoom in on one specific moment.</em>
				</p>
			</>
		),
	},
	{
		component: Feelings,
		title: "Feelings",
		pause: (
			<>
				<p>
					This mattered. Stay with just that one moment. <br />
					Take one slow breath before we continue.
				</p>
			</>
		),
	},
	{
		component: FeelingsExploreCard,
		title: "Explore Feelings",
		optional: true,
		condition: (state) => Object.values(state.feelings || {}).some((s) => s === "clicked" || s === "double-clicked"),
	},
	{
		component: Needs,
		title: "Needs",
		pause: "Now that you've named what you're feeling, let's look at what those feelings are pointing to — \
		to what really matters to you here...",
	},
	{
		component: NeedUnpacking,
		title: "Explore a Need",
		optional: true,
		condition: (state) => Object.values(state.needs || {}).includes("clicked"),
	},
	{ component: MakingGuesses, title: "Their View", optional: true },
	// { component: RequestFormulation, title: "Request", optional: true },
	{ component: ExploringWhatsChanged, title: "Exploring what's changed", optional: true },
	{ component: ConversationsAndCollaboration, title: "Conversations and Collaboration", optional: true },
	{ component: Review, title: "Review", optional: true },
];

export const WizardProvider = ({ children }) => {
	// App-wide state
	const [stepIndex, setStepIndex] = useState(0);
	const [jackalTalk, setJackalTalk] = useState("");
	const [observation, setObservation] = useState({ moment: "", actions: "", camera: "", refined: "" });
	const [bodyScan, setBodyScan] = useState({});
	const [bodySensations, setBodySensations] = useState({ selected: [], custom: "" });
	const [feelings, setFeelings] = useState({});
	const [needs, setNeeds] = useState({});

	// Beauty of the Needs exploration
	const [needExplorations, setNeedExplorations] = useState({});
	const [currentExploringNeed, setCurrentExploringNeed] = useState(null);
	const [explorationStep, setExplorationStep] = useState(0);
	const [needExplorationOpen, setNeedExplorationOpen] = useState(false);

	// Strategies
	const [strategies, setStrategies] = useState({});

	// Feelings explore card responses
	const [feelingsExploreResponses, setFeelingsExploreResponses] = useState({});

	// Making Guesses (other person's perspective)
	const [guessObservation, setGuessObservation] = useState("");
	const [guessFeelings, setGuessFeelings] = useState({});
	const [guessNeeds, setGuessNeeds] = useState({});

	// Requests
	const [requestOfSelf, setRequestOfSelf] = useState("");
	const [requestOfOther, setRequestOfOther] = useState("");

	// "Exploring what's changed" page responses
	const [whatsChangedResponses, setWhatsChangedResponses] = useState({});

	// Conversations and Collaboration
	const [simpleRequest, setSimpleRequest] = useState("");
	const [wantsConversation, setWantsConversation] = useState(false);

	// Help drawer open state (lifted so step components can trigger it)
	const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);

	// Settings (persisted in localStorage)
	const [settings, setSettings] = useState(() => {
		try {
			const saved = localStorage.getItem("findPeaceSettings");
			return saved ? JSON.parse(saved) : {};
		} catch {
			return {};
		}
	});

	const updateSettings = (updates) => {
		setSettings((prev) => {
			const next = { ...prev, ...updates };
			localStorage.setItem("findPeaceSettings", JSON.stringify(next));
			return next;
		});
	};

	// Sub-step navigation: when true, Card hides the main MenuBar
	const [hideMainNav, setHideMainNav] = useState(false);

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
	const visibleSteps = allSteps.filter((step) => (step.condition ? step.condition(state) : true));

	const currentStep = visibleSteps[stepIndex];

	// Save current session to localStorage
	const saveSession = () => {
		const session = {
			id: Date.now(),
			date: new Date().toISOString(),
			jackalTalk,
			observation,
			bodyScan,
			bodySensations,
			feelings,
			needs,
			needExplorations,
			strategies,
			feelingsExploreResponses,
			guessObservation,
			guessFeelings,
			guessNeeds,
			requestOfSelf,
			requestOfOther,
			whatsChangedResponses,
			simpleRequest,
			wantsConversation,
		};
		const updated = [...savedEntries, session];
		setSavedEntries(updated);
		localStorage.setItem("findPeaceSessions", JSON.stringify(updated));
		return session;
	};

	// Load a past session back into the wizard
	const loadSession = (session) => {
		setJackalTalk(session.jackalTalk || "");
		const obs = session.observation || {};
		setObservation({
			moment: obs.moment || "",
			actions: obs.actions || "",
			camera: obs.camera || "",
			// Backward compat: old sessions have no refined field; combine the 3 parts
			refined: obs.refined || [obs.moment, obs.actions, obs.camera].filter((s) => s?.trim()).join("\n\n"),
		});
		setBodyScan(session.bodyScan || {});
		setBodySensations(session.bodySensations || { selected: [], custom: "" });
		setFeelings(session.feelings || {});
		setNeeds(session.needs || {});
		setNeedExplorations(session.needExplorations || {});
		setCurrentExploringNeed(null);
		setExplorationStep(0);
		setStrategies(session.strategies || {});
		// Backward compat: old sessions used different key names for this field
		setFeelingsExploreResponses(
			session.feelingsExploreResponses || session.feelingTypeResponses || session.familyResponses || {},
		);
		setGuessObservation(session.guessObservation || "");
		setGuessFeelings(session.guessFeelings || {});
		setGuessNeeds(session.guessNeeds || {});
		setRequestOfSelf(session.requestOfSelf || "");
		setRequestOfOther(session.requestOfOther || "");
		setWhatsChangedResponses(session.whatsChangedResponses || {});
		setSimpleRequest(session.simpleRequest || "");
		setWantsConversation(session.wantsConversation || false);
		setStepIndex(1); // Go straight to Observation (index 1 is always Observation)
	};

	// Start a fresh session
	const resetSession = () => {
		setStepIndex(0);
		setJackalTalk("");
		setObservation({ moment: "", actions: "", camera: "", refined: "" });
		setBodyScan({});
		setBodySensations({ selected: [], custom: "" });
		setFeelings({});
		setNeeds({});
		setNeedExplorations({});
		setCurrentExploringNeed(null);
		setExplorationStep(0);
		setNeedExplorationOpen(false);
		setStrategies({});
		setFeelingsExploreResponses({});
		setGuessObservation("");
		setGuessFeelings({});
		setGuessNeeds({});
		setRequestOfSelf("");
		setRequestOfOther("");
		setWhatsChangedResponses({});
		setSimpleRequest("");
		setWantsConversation(false);
	};

	// Ref to .card-content scroll container (attached by Card.jsx)
	const cardContentRef = useRef(null);

	// Delete a saved session
	const deleteSession = (sessionId) => {
		const updated = savedEntries.filter((s) => s.id !== sessionId);
		setSavedEntries(updated);
		localStorage.setItem("findPeaceSessions", JSON.stringify(updated));
	};

	// Check if the current session has any data worth warning about
	const hasSessionData = () => {
		return !!(
			jackalTalk ||
			observation?.refined?.trim() ||
			observation?.moment?.trim() ||
			Object.keys(feelings).length > 0 ||
			Object.keys(needs).length > 0 ||
			Object.keys(needExplorations).length > 0 ||
			Object.keys(strategies).length > 0 ||
			Object.keys(feelingsExploreResponses).length > 0 ||
			guessObservation?.trim() ||
			Object.keys(guessFeelings).length > 0 ||
			Object.keys(guessNeeds).length > 0 ||
			requestOfSelf?.trim() ||
			requestOfOther?.trim() ||
			whatsChangedResponses?.before?.trim() ||
			whatsChangedResponses?.differently?.trim()
		);
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
		bodySensations,
		setBodySensations,
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
		needExplorationOpen,
		setNeedExplorationOpen,
		strategies,
		setStrategies,
		feelingsExploreResponses,
		setFeelingsExploreResponses,
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
		whatsChangedResponses,
		setWhatsChangedResponses,
		simpleRequest,
		setSimpleRequest,
		wantsConversation,
		setWantsConversation,
		settings,
		updateSettings,
		helpDrawerOpen,
		setHelpDrawerOpen,
		hideMainNav,
		setHideMainNav,
		savedEntries,
		saveSession,
		loadSession,
		resetSession,
		deleteSession,
		hasSessionData,
		visibleSteps,
		currentStep,
		cardContentRef,
	};

	return <WizardContext.Provider value={value}>{children}</WizardContext.Provider>;
};
