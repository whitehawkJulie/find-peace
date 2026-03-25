import { createContext, useContext } from "react";

/**
 * Minimal context that provides openHelpTopic() to HelpLink.
 *
 * Keeping this separate from WizardContext means HelpLink has no dependency
 * on WizardContext, which allows content files (.jsx) to import HelpLink
 * without creating a circular import chain.
 *
 * The value is provided by WizardContextProvider, which passes openHelpTopic
 * down via this context.
 */
export const HelpContext = createContext(null);

export const useHelp = () => useContext(HelpContext);
