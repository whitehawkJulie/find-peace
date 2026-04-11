// Central index of all help topics.
// Each entry has an id (for deep-linking), title (searchable), and content (JSX).
// Uses lazy initialization to avoid circular dependency issues at module load time.

import Observation from "./steps/ObservationJackal.jsx";
import Feelings from "./steps/Feelings";
import UnpackFeelings from "./steps/UnpackFeelings";
import Needs from "./steps/Needs";
import StrategyDiscovery from "./StrategyDiscovery";
import MakingGuesses from "./steps/MakingGuesses";
import RequestFormulation from "./steps/RequestFormulation";
import Review from "./steps/Review";
import NeedExploration from "./NeedExploration";
import StandaloneHelpTopics from "../data/StandaloneHelpTopics.jsx";

let _topics = null;

export const getHelpTopics = () => {
	if (!_topics) {
		const stepTopics = [
			{ id: "observation", title: Observation.title || "Observation", content: Observation.helpContent },
			{ id: "feelings", title: Feelings.title || "Feelings", content: Feelings.helpContent },
			{ id: "explore-feelings", title: UnpackFeelings.title || "Settling", content: UnpackFeelings.helpContent },
			{ id: "needs", title: Needs.title || "Needs", content: Needs.helpContent },
			{
				id: "strategies",
				title: StrategyDiscovery.title || "Strategies",
				content: StrategyDiscovery.helpContent,
			},
			{ id: "their-view", title: MakingGuesses.title || "Their View", content: MakingGuesses.helpContent },
			{ id: "request", title: RequestFormulation.title || "Request", content: RequestFormulation.helpContent },
			{ id: "review", title: Review.title || "Review", content: Review.helpContent },
			{
				id: "need-exploration",
				title: NeedExploration.title || "Need Exploration",
				content: NeedExploration.helpContent,
			},
		].filter((t) => t.content);

		_topics = [...stepTopics, ...StandaloneHelpTopics];
	}
	return _topics;
};
