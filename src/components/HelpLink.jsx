import React from "react";
import { useWizard } from "./WizardContext";

// Renders an inline link that opens a specific help topic in the drawer.
// Usage: <HelpLink topic="mourning">mourning</HelpLink>
const HelpLink = ({ topic, children }) => {
	const { openHelpTopic } = useWizard();
	return (
		<a
			href="#"
			className="help-link"
			onClick={(e) => {
				e.preventDefault();
				openHelpTopic(topic);
			}}>
			{children}
		</a>
	);
};

export default HelpLink;
