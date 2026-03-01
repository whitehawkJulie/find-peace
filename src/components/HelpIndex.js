// Central index of all help topics.
// Each entry has a title (searchable) and content (JSX from the component's static helpContent).
// Uses lazy initialization to avoid circular dependency issues at module load time.

import Observation from "./Observation";
import Feelings from "./Feelings";
import FeelingsExploreCard from "./FeelingsExploreCard";
import Needs from "./Needs";
import StrategyDiscovery from "./StrategyDiscovery";
import MakingGuesses from "./MakingGuesses";
import RequestFormulation from "./RequestFormulation";
import Review from "./Review";
import NeedExploration from "./NeedExploration";

let _topics = null;

export const getHelpTopics = () => {
	if (!_topics) {
		_topics = [
			{ title: Observation.title || "Observation", content: Observation.helpContent },
			{ title: Feelings.title || "Feelings", content: Feelings.helpContent },
			{ title: FeelingsExploreCard.title || "Settling", content: FeelingsExploreCard.helpContent },
			{ title: Needs.title || "Needs", content: Needs.helpContent },
			{ title: StrategyDiscovery.title || "Strategies", content: StrategyDiscovery.helpContent },
			{ title: MakingGuesses.title || "Their View", content: MakingGuesses.helpContent },
			{ title: RequestFormulation.title || "Request", content: RequestFormulation.helpContent },
			{ title: Review.title || "Review", content: Review.helpContent },
			{ title: NeedExploration.title || "Need Exploration", content: NeedExploration.helpContent },
		].filter((t) => t.content);
	}
	return _topics;
};
