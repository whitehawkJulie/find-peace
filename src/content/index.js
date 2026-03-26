/**
 * Content registry — the single source of truth for getText().
 *
 * To add a new page:
 *   1. Create src/content/myPage.js (or .jsx if it needs React elements)
 *   2. Export a `myPageContent` object from it
 *   3. Import and add it here under a short camelCase key
 *   4. Use that key as the first segment of any getText() call: getText('myPage.someKey', ctx)
 */
import { observationContent } from "./observation.jsx";
import { introductionContent } from "./introduction.jsx";
import { makingGuessesContent } from "./makingGuesses.js";
import { feelingsContent } from "./feelings.jsx";
import { unpackFeelingsContent } from "./unpackFeelings.jsx";
import { needsContent } from "./needs.jsx";
import { unpackNeedsContent } from "./unpackNeeds.js";
import { exploringWhatsChangedContent } from "./exploringWhatsChanged.jsx";
import { requestFormulationContent } from "./requestFormulation.js";
import { collaborationContent } from "./collaboration.jsx";
import { griefContent } from "./grief.jsx";
import { whetherContent } from "./whether.js";
import { simpleRequestContent } from "./simpleRequest.js";
import { collaborateContent } from "./collaborate.js";
import { reviewContent } from "./review.js";
import { sharedContent } from "./shared.js";

export const registry = {
	observation: observationContent,
	introduction: introductionContent,
	makingGuesses: makingGuessesContent,
	feelings: feelingsContent,
	unpackFeelings: unpackFeelingsContent,
	needs: needsContent,
	unpackNeeds: unpackNeedsContent,
	exploringWhatsChanged: exploringWhatsChangedContent,
	requestFormulation: requestFormulationContent,
	collaboration: collaborationContent,
	grief: griefContent,
	whether: whetherContent,
	simpleRequest: simpleRequestContent,
	collaborate: collaborateContent,
	review: reviewContent,
	shared: sharedContent,
};
