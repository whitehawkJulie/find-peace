import { clarifyNeedsPrompts } from "../data/clarifyNeedsPrompts";

/**
 * Resolves an array of prompt objects, expanding any library refs.
 *
 * Prompt shapes:
 *   Inline:  { question: "...", ... }
 *   Ref:     { ref: "EMB_02", ... }
 *   Override:{ ref: "EMB_02", override: { label: "Custom" }, ... }
 *
 * After resolution every prompt has a `question` string.
 */
export const resolvePrompts = (prompts) =>
	prompts.map((prompt) => {
		if (prompt.ref) {
			const question = clarifyNeedsPrompts[prompt.ref];
			const { override, ...rest } = prompt;
			return { ...rest, question, ...(override || {}) };
		}
		return prompt;
	});
