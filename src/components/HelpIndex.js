// Central index of all help topics.
// Each entry has an id (for deep-linking), title (searchable), and content (JSX).
// Topics are defined in StandaloneHelpTopics and linked from inline HelpLink components.

import StandaloneHelpTopics from "../data/StandaloneHelpTopics.jsx";

let _topics = null;

export const getHelpTopics = () => {
	if (!_topics) {
		_topics = StandaloneHelpTopics;
	}
	return _topics;
};
