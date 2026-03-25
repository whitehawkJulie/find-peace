/**
 * useContent() — hook for accessing the content system inside components.
 *
 * Reads the current tone from settings (defaults to 'polite').
 * The `core` axis (fear / anger / distress) is undefined for now and will be
 * wired up here once it is derived from the user's feelings/needs selections.
 *
 * Usage:
 *   const { t } = useContent();
 *   <p>{t("observation.jackalSection.intro1")}</p>
 *
 * For direct node resolution (e.g. arrays or imported JSX nodes):
 *   const { resolve } = useContent();
 *   resolve(someContentNode)   // applies tone/core and returns the right variant
 */

import { useWizard } from "../components/WizardContext";
import { getText, resolveNode } from "./resolver.js";

export function useContent() {
	const { settings } = useWizard();

	const context = {
		tone: settings?.tone ?? "polite",
		// core will be derived from feelings/needs here in the future:
		core: undefined,
	};

	return {
		/** Resolve a content key for the current tone/core context. */
		t: (keyPath) => getText(keyPath, context),

		/**
		 * Resolve a content node directly — useful when you've imported the node
		 * from a content file rather than looking it up by key.
		 */
		resolve: (node) => resolveNode(node, context),

		/** The current context object — pass to getText() if needed outside JSX. */
		context,
	};
}
