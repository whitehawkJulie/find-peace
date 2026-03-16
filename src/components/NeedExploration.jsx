import React from "react";
import { getNeedData } from "../utils/renderHelpers";
import { resolvePrompts } from "../utils/resolvePrompts";

// Build the list of clarify prompts for a need, resolving any library refs
export const getClarifyPrompts = (needName) => {
	const needData = getNeedData(needName);
	if (!needData?.clarify) return null;

	const resolved = resolvePrompts(needData.clarify.prompts);
	return {
		core: resolved.filter((p) => p.tier === "core"),
		deeper: resolved.filter((p) => p.tier === "deeper"),
	};
};

// NeedExploration is no longer a wizard step (replaced by NeedUnpacking),
// but its title and helpContent are still used by HelpIndex.
const NeedExploration = () => null;

NeedExploration.title = "Exploring Your Needs";
NeedExploration.helpContent = (
	<>
		<h3>Clarifying a Need</h3>
		<p>
			Some needs are easy to name but harder to feel. When we slow down and explore what a need means personally,
			it often becomes clearer and more grounded.
		</p>

		<p>If the energy feels sharp or especially strong, you might gently ask:</p>

		<p>
			<em>"If I truly had this need… what would that give me?"</em>
		</p>

		<p>and see if a deeper need emerges.</p>

		<h3>Meeting a Need (Not Just Fulfilling It)</h3>

		<p>
			In everyday language, "meeting a need" usually means fulfilling it. Here, we're using "meet" in a different
			way.
		</p>

		<p>
			To meet this need means to turn toward it — to sense how it lives in you, not just as a word, but as a
			longing, a forward-driving energy.
		</p>

		<p>
			Needs aren't just concepts. They are the movement of life in you — the part that wants connection, safety,
			truth, contribution.
		</p>

		<p>
			Before looking for strategies, pause to recognise that living energy. Not to fix it. Not to analyse it. Just
			to acknowledge it.
		</p>

		<h3>Why Some Needs Feel Bigger Than the Moment</h3>

		<p>You can imagine your needs as small water tanks.</p>

		<p>
			Each need — for connection, affection, agency, freedom, safety, being seen — has its own tank. Some tanks
			are usually full. When they're full, small disturbances don't affect you much.
		</p>

		<p>Other tanks fluctuate — they fill and drain.</p>

		<p>
			And some tanks may feel chronically low. If a need wasn't reliably met earlier in life, your nervous system
			may have learned to stay alert around it.
		</p>

		<p>
			When a tank is low, your system reacts faster and more intensely. The current situation may not be creating
			the wound — it may simply be touching something that was already tender.
		</p>

		<p>
			Naming the need doesn't immediately fill the tank. But it often steadies the system enough to respond with
			more choice.
		</p>

		<h3>Black Hole Tanks</h3>

		<p>
			Some needs can feel like "black hole" tanks — no matter how much reassurance or effort comes in, it doesn't
			seem to stay. It's like the tanks have holes in them.
		</p>

		<p>This can happen when the nervous system learned early that the need wasn't safe to rely on.</p>

		<p>
			And, sometimes, a need can also look like a black hole because it's standing in for a deeper one. For
			example, you might work very hard to feel accepted — and still feel unsettled — because what you're really
			longing for is a deeper sense of mattering in yourself.
		</p>

		<p>
			In that case, no amount of reassurance from others fully lands. The surface need keeps feeling urgent and
			demanding, and you may feel easily triggered around it — not because you're "too much," but because
			something deeper is asking to be seen.
		</p>

		<h3>"Tragic Strategies"</h3>

		<p>
			When we're not clear about the need underneath our feelings, we often reach for strategies that we hope will
			relieve the discomfort.
		</p>

		<p>
			We might push harder, withdraw, criticise, demand reassurance, over-explain, shut down, people-please, or
			try to control the situation.
		</p>

		<p>
			Marshall Rosenberg, who developed Nonviolent Communication, called these{" "}
			<strong>"tragic strategies for unmet needs."</strong>
		</p>

		<p>
			They're tragic not because we're bad — but because the strategy is aimed at relief, while missing the real
			source of the pain.
		</p>

		<p>
			Without clarity about the need, we're often shooting in the dark — and sometimes wounding ourselves or
			others in the process.
		</p>

		<p>
			Getting clear about the need changes the quality of our action. Instead of reacting from urgency, we respond
			from understanding.
		</p>

		<h3>Hold Tightly to the Need, Loosely to the Strategy</h3>

		<p>
			Filling the tank does <strong>not</strong> have to mean:
		</p>

		<ul>
			<li>This person</li>
			<li>This exact behaviour</li>
			<li>This one solution</li>
		</ul>

		<p>
			Once the need is clear, you can look for multiple ways to support it — including outside this relationship.
			That often reduces pressure and increases freedom. Every need has millions of possible ways to meet it
			(strategies), and we can get very stuck when we insist on one particular way that isn't actually available,
			like insisting on a particular person acting in a particular way that they're actually not capable of right
			now.
		</p>
	</>
);

export default NeedExploration;
