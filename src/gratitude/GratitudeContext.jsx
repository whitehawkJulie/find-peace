import React, { createContext, useContext, useState, useRef, useMemo } from "react";
import { HelpContext } from "../components/HelpContext";

const GratitudeContext = createContext();

export const useGratitude = () => useContext(GratitudeContext);

// Step components (imported lazily inside provider to avoid circular dep / HMR TDZ)
import GratitudeWelcome from "./steps/GratitudeWelcome";
import GratitudeObservation from "./steps/GratitudeObservation";
import GratitudeFeelings from "./steps/GratitudeFeelings";
import GratitudeNeeds from "./steps/GratitudeNeeds";
import GratitudeExpress from "./steps/GratitudeExpress";
import GratitudeReview from "./steps/GratitudeReview";

export const GratitudeProvider = ({ children }) => {
	const allSteps = useMemo(() => [
		{ component: GratitudeWelcome,     group: "intro",       color: "#7a9a5a" },
		{ component: GratitudeObservation, group: "observation", color: "#b07830" },
		{ component: GratitudeFeelings,    group: "feelings",    color: "#9e6040" },
		{ component: GratitudeNeeds,       group: "needs",       color: "#3a72a0" },
		{ component: GratitudeExpress,     group: "express",     color: "#5a8a7a" },
		{ component: GratitudeReview,      group: "review",      color: "#7a9a5a" },
	], []);

	const visibleSteps = allSteps; // no conditional steps

	// ── State ──────────────────────────────────────────────────────
	const [stepIndex, setStepIndexRaw] = useState(0);
	const [prevStepIndex, setPrevStepIndex] = useState(null);

	const setStepIndex = (newIdx) => {
		setPrevStepIndex(stepIndex);
		setStepIndexRaw(newIdx);
	};

	const [observation, setObservation] = useState("");
	const [feelings, setFeelings] = useState({});
	const [needs, setNeeds] = useState({});
	const [expressNote, setExpressNote] = useState("");
	const [reviewReflection, setReviewReflection] = useState("");

	const [showSummary, setShowSummary] = useState(false);

	// Help drawer
	const [helpDrawerOpen, setHelpDrawerOpen] = useState(false);
	const [helpDrawerOverride, setHelpDrawerOverride] = useState(null);
	const [helpTopic, setHelpTopic] = useState(null);
	const openHelpTopic = (topicId) => {
		setHelpTopic(topicId);
		setHelpDrawerOpen(true);
	};

	// Dirty tracking (warn before unload)
	const dirtyRef = useRef(false);

	// Settings — share the same localStorage key so tone etc. carry over
	const [settings] = useState(() => {
		try {
			const saved = localStorage.getItem("findPeaceSettings");
			return saved ? JSON.parse(saved) : {};
		} catch {
			return {};
		}
	});

	// Ref to card-content scroll container
	const cardContentRef = useRef(null);

	const currentStep = visibleSteps[stepIndex];

	const resetSession = () => {
		dirtyRef.current = false;
		setStepIndexRaw(0);
		setObservation("");
		setFeelings({});
		setNeeds({});
		setExpressNote("");
		setReviewReflection("");
	};

	const value = {
		stepIndex,
		prevStepIndex,
		setStepIndex,
		observation,
		setObservation,
		feelings,
		setFeelings,
		needs,
		setNeeds,
		expressNote,
		setExpressNote,
		reviewReflection,
		setReviewReflection,
		showSummary,
		setShowSummary,
		helpDrawerOpen,
		setHelpDrawerOpen,
		helpDrawerOverride,
		setHelpDrawerOverride,
		helpTopic,
		setHelpTopic,
		openHelpTopic,
		settings,
		dirtyRef,
		cardContentRef,
		allSteps,
		visibleSteps,
		currentStep,
		totalSteps: allSteps.length,
		resetSession,
	};

	return (
		<GratitudeContext.Provider value={value}>
			<HelpContext.Provider value={{ openHelpTopic }}>
				{children}
			</HelpContext.Provider>
		</GratitudeContext.Provider>
	);
};
