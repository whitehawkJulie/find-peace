import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { encryptSession, decryptSession, isEncryptedSession } from "../utils/crypto";
import { HelpContext } from "./HelpContext";

// Create context
const WizardContext = createContext();

// Hook to use context
export const useWizard = () => useContext(WizardContext);

// Step components
import Introduction from "./steps/Introduction";
import Observation from "./steps/Observation";
import ObservationClarify from "./steps/ObservationClarify";
import Feelings from "./steps/Feelings";
import Needs from "./steps/Needs";
import UnpackNeeds from "./steps/UnpackNeeds";
import MakingGuesses from "./steps/MakingGuesses";
import RequestFormulation from "./steps/RequestFormulation";
import ExploringWhatsChanged from "./steps/ExploringWhatsChanged";
import ConversationsAndCollaboration from "./steps/ConversationsAndCollaboration";
import Review from "./steps/Review";
import UnpackFeelings from "./steps/UnpackFeelings";

// Step icons
import introIcon from "../images/icons/intro.svg";
import observationIcon from "../images/icons/observation.svg";
import feelingsIcon from "../images/icons/feelings.svg";
import exploreFeelingsIcon from "../images/icons/explore-feelings.svg";
import needsIcon from "../images/icons/needs.svg";
import exploreNeedIcon from "../images/icons/explore-need.svg";
import theirViewIcon from "../images/icons/their-view.svg";
import whatsChangedIcon from "../images/icons/whats-changed.svg";
import conversationsIcon from "../images/icons/conversations.svg";
import reviewIcon from "../images/icons/review.svg";

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
	{ component: Introduction, group: "understand", optional: true, color: "#5F8F82", icon: introIcon },
	{
		component: Observation,
		group: "understand",
		color: "#5F8F82",
		icon: observationIcon,
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
	{ component: ObservationClarify, group: "understand", color: "#5F8F82", icon: observationIcon },
	{
		component: Feelings,
		group: "understand",
		color: "#5F8F82",
		icon: feelingsIcon,
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
		component: UnpackFeelings,
		group: "understand",
		color: "#5F8F82",
		icon: exploreFeelingsIcon,
		optional: true,
	},
	{
		component: Needs,
		group: "find",
		color: "#6E9B6A",
		icon: needsIcon,
		pause: "Now that you've named what you're feeling, let's look at what those feelings are pointing to — \
		to what really matters to you here...",
	},
	{
		component: UnpackNeeds,
		group: "find",
		color: "#6E9B6A",
		icon: exploreNeedIcon,
		optional: true,
	},
	{ component: MakingGuesses, group: "find", optional: true, color: "#6E9B6A", icon: theirViewIcon },
	// { component: RequestFormulation, optional: true },
	{
		component: ExploringWhatsChanged,
		group: "move",
		optional: true,
		color: "#7A9E5A",
		icon: whatsChangedIcon,
	},
	{
		component: ConversationsAndCollaboration,
		group: "move",
		optional: true,
		color: "#7A9E5A",
		icon: conversationsIcon,
	},
	{ component: Review, group: "move", optional: true, color: "#7A9E5A", icon: reviewIcon },
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
	const [collabScript, setCollabScript] = useState({});
	const [includeCollabInSummary, setIncludeCollabInSummary] = useState(false);
	const [reviewReflection, setReviewReflection] = useState("");

	// True once the user has unsaved changes; cleared when saveSession() is called.
	// Using a ref so beforeunload always reads the current value without a re-render.
	const dirtyRef = useRef(false);

	// Mark dirty only when there is actual non-empty data — this avoids false
	// positives from React StrictMode's double-mount, which fires the effect
	// twice on page load even before the user has entered anything.
	useEffect(() => {
		const hasData =
			jackalTalk?.trim() ||
			observation?.moment?.trim() ||
			observation?.actions?.trim() ||
			observation?.refined?.trim() ||
			Object.keys(feelings).length > 0 ||
			Object.keys(needs).length > 0 ||
			Object.keys(needExplorations).length > 0 ||
			Object.keys(feelingsExploreResponses).length > 0 ||
			guessObservation?.trim() ||
			Object.keys(guessFeelings).length > 0 ||
			Object.keys(guessNeeds).length > 0 ||
			requestOfSelf?.trim() ||
			requestOfOther?.trim() ||
			whatsChangedResponses?.before?.trim() ||
			whatsChangedResponses?.differently?.trim() ||
			simpleRequest?.trim() ||
			reviewReflection?.trim();
		if (hasData) dirtyRef.current = true;
	}, [
		jackalTalk,
		observation,
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
		reviewReflection,
	]); // eslint-disable-line react-hooks/exhaustive-deps

	// Help drawer open state (lifted so step components can trigger it)
	const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);
	// Override content: when set, the drawer shows this instead of the step's helpContent
	const [helpDrawerOverride, setHelpDrawerOverride] = useState(null);
	// Deep-link to a specific help topic by id (opens drawer in browse mode)
	const [helpTopic, setHelpTopic] = useState(null);
	const openHelpTopic = (topicId) => {
		setHelpTopic(topicId);
		setHelpDrawerOpen(true);
	};

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

	// Summary modal open state — accessible from any page via the top menu
	const [showSummary, setShowSummary] = useState(false);

	// Settings drawer open state — lifted so the top menu in Card can trigger it
	const [showSettings, setShowSettings] = useState(false);

	// Open (saved entries) drawer
	const [showOpen, setShowOpen] = useState(false);

	// Sub-step navigation: when true, Card hides the main MenuBar
	const [hideMainNav, setHideMainNav] = useState(false);

	// Tracks which saved entry is currently loaded (shown as "Loaded ✓" in SavedEntries)
	const [loadedId, setLoadedId] = useState(null);

	// Passphrase for optional encryption — held in a ref so it never appears in
	// React DevTools. passphraseActive drives re-renders when it changes.
	const passphraseRef = useRef(null);
	const [passphraseActive, setPassphraseActive] = useState(false);

	// Saved entries (loaded from localStorage — may contain encrypted objects)
	const [savedEntries, setSavedEntries] = useState(() => {
		try {
			const saved = localStorage.getItem("findPeaceSessions");
			return saved ? JSON.parse(saved) : [];
		} catch {
			return [];
		}
	});

	const hasEncryptedSessions = savedEntries.some(isEncryptedSession);

	// Build state object for step conditions
	const state = { observation, feelings, needs, needExplorations, strategies };
	const visibleSteps = allSteps.filter((step) => (step.condition ? step.condition(state) : true));

	const currentStep = visibleSteps[stepIndex];

	// Save current session to localStorage (async when passphrase is active).
	// If loadedId is set (session was previously saved or loaded), overwrites
	// that same entry. Otherwise appends a new entry and sets loadedId so
	// subsequent saves also overwrite rather than accumulate.
	const saveSession = async () => {
		const id = loadedId ?? Date.now();
		const session = {
			id,
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
			collabScript,
			includeCollabInSummary,
			reviewReflection,
		};

		// Build the updated entries list: overwrite existing or append new
		let allPlain;
		if (loadedId) {
			allPlain = savedEntries.map((e) => (e.id === loadedId ? session : e));
		} else {
			allPlain = [...savedEntries, session];
			setLoadedId(id);
		}

		if (passphraseRef.current) {
			const encrypted = await Promise.all(allPlain.map((s) => encryptSession(s, passphraseRef.current)));
			localStorage.setItem("findPeaceSessions", JSON.stringify(encrypted));
			setSavedEntries(allPlain); // keep plaintext in state for display
		} else {
			setSavedEntries(allPlain);
			localStorage.setItem("findPeaceSessions", JSON.stringify(allPlain));
		}

		dirtyRef.current = false;
		return session;
	};

	// Delete all saved sessions
	const clearAllSessions = () => {
		setSavedEntries([]);
		localStorage.removeItem("findPeaceSessions");
	};

	// Encrypt all existing sessions with a new passphrase
	const enableEncryption = async (phrase) => {
		const encrypted = await Promise.all(savedEntries.map((s) => encryptSession(s, phrase)));
		localStorage.setItem("findPeaceSessions", JSON.stringify(encrypted));
		// Keep plaintext in state — user just set the passphrase, they know it
		passphraseRef.current = phrase;
		setPassphraseActive(true);
	};

	// Unlock encrypted sessions in memory (they stay encrypted in localStorage)
	const unlockSessions = async (phrase) => {
		const decrypted = await Promise.all(
			savedEntries.map((s) => (isEncryptedSession(s) ? decryptSession(s, phrase) : s)),
		);
		setSavedEntries(decrypted);
		passphraseRef.current = phrase;
		setPassphraseActive(true);
	};

	// Decrypt all sessions and save plaintext back to localStorage
	const removePassphrase = async () => {
		const decrypted = await Promise.all(
			savedEntries.map((s) => (isEncryptedSession(s) ? decryptSession(s, passphraseRef.current) : s)),
		);
		localStorage.setItem("findPeaceSessions", JSON.stringify(decrypted));
		setSavedEntries(decrypted);
		passphraseRef.current = null;
		setPassphraseActive(false);
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
		setCollabScript(session.collabScript || {});
		setIncludeCollabInSummary(session.includeCollabInSummary ?? false);
		setReviewReflection(session.reviewReflection || "");
		setStepIndex(1); // Go straight to Observation (index 1 is always Observation)
	};

	// Start a fresh session
	const resetSession = () => {
		dirtyRef.current = false;
		setLoadedId(null);
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
		setCollabScript({});
		setIncludeCollabInSummary(false);
		setReviewReflection("");
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
		collabScript,
		setCollabScript,
		includeCollabInSummary,
		setIncludeCollabInSummary,
		reviewReflection,
		setReviewReflection,
		settings,
		updateSettings,
		dirtyRef,
		helpDrawerOpen,
		setHelpDrawerOpen,
		helpDrawerOverride,
		setHelpDrawerOverride,
		helpTopic,
		setHelpTopic,
		openHelpTopic,
		showSummary,
		setShowSummary,
		showSettings,
		setShowSettings,
		showOpen,
		setShowOpen,
		hideMainNav,
		setHideMainNav,
		passphraseActive,
		hasEncryptedSessions,
		enableEncryption,
		unlockSessions,
		removePassphrase,
		loadedId,
		setLoadedId,
		savedEntries,
		saveSession,
		clearAllSessions,
		loadSession,
		resetSession,
		deleteSession,
		hasSessionData,
		visibleSteps,
		allSteps,
		totalSteps: allSteps.length,
		currentStep,
		cardContentRef,
	};

	return (
		<WizardContext.Provider value={value}>
			<HelpContext.Provider value={{ openHelpTopic }}>{children}</HelpContext.Provider>
		</WizardContext.Provider>
	);
};
