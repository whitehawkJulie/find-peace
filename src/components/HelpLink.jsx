import React from "react";
import { useHelp } from "./HelpContext";

// Renders an inline link that opens a specific help topic in the drawer.
// Usage: <HelpLink topic="mourning">mourning</HelpLink>
const HelpLink = ({ topic, children }) => {
	const { openHelpTopic } = useHelp();
	return (
		<a
			href="#"
			className="inline-help-link"
			onClick={(e) => {
				e.preventDefault();
				openHelpTopic(topic);
			}}>
			{children}
		</a>
	);
};

export default HelpLink;
