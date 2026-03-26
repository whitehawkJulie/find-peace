import React from "react";
import HelpLink from "./HelpLink";

const Grief = () => {
	return (
		<div className="step-container">
			<p>
				It's very common in this process that people become aware of one or more needs that have not been met in
				a long time, if ever, and there's grief around that. If that's the case, this page is for you
				(otherwise, skip it).
			</p>
			<p className="step-purpose">
				{
					"Here we're making space for that grief, so that it can be felt and begin to settle before coming back to what's possible now."
				}
			</p>

			<p>The first question to ask yourself is:</p>
			<p>
				<strong>Am I stuck on one particular strategy?</strong>
				<br />
				Am I believing there is only <em>one</em> way for this need to be met?
				<br />
				Do I need to loosen my grip on my preferred strategy and become willing to explore other possibilities?
			</p>
			<p>
				Sometimes that is enough. Once you stop treating one strategy as the only path, other options begin to
				appear.
			</p>
			<p>
				Very occasionally, though, something deeper surfaces: this need feels unmet not just here, but more
				broadly — and you genuinely have no idea how to change that. When that happens, there are usually two
				helpful approaches.
			</p>

			<h3>{"1. Let it percolate"}</h3>
			<p>
				Are you willing to sit with the unmet need for a few days and give it time? Let yourself wonder what
				this need really means to you, and what would actually help you feel it had been met. Put it on the back
				burner for a while and let it unfold.
			</p>
			<p>
				You might like to read more about{" "}
				<HelpLink topic="mourning">connecting with, and mourning, unmet needs</HelpLink>.
			</p>

			<h3>{"2. Try giving it"}</h3>
			<p>
				This can feel counter-intuitive, but sometimes, when you feel desperate and lost, stopping trying to get
				the need met for yourself and instead looking for a way to offer it to someone else can be surprisingly
				powerful.
			</p>
			<p>
				For example, if the need is <strong>love</strong>, you might look for someone even more starved of love
				and find a way to offer them some. Strangely, this can teach you a lot about the need itself — what it
				really is, what it looks like in practice, and sometimes even what might help meet it in your own life.
			</p>

			<p>And finally, if you're still completely stuck, it can help to remember this:</p>
			<p>
				<strong>
					{
						"Even if you can't see how this need could be met right now, you do not know what the future holds."
					}
				</strong>
			</p>
			<p>
				You can still honour the need. Hold it gently, value it, and let it matter — even before you know what
				to do about it.
			</p>
		</div>
	);
};

Grief.title = "Grief and Mourning";
Grief.titleSweary = "When it just feels shit";
Grief.navTitle = "Grief";

Grief.helpContent = (
	<>
		<h2>Grief about unmet needs</h2>

		<section>
			<h3>When the pain goes deeper</h3>
			<p>
				Sometimes identifying a need brings up grief — not just about this situation, but about how long this
				need has gone unmet, or how little hope there seems to be.
			</p>
			<p>This kind of grief is real and worth acknowledging. It doesn't mean nothing can change.</p>
		</section>

		<section>
			<h3>Strategies vs needs</h3>
			<p>Our minds often fix on one particular way to get a need met — one person, one situation, one outcome.</p>
			<p>When that strategy feels impossible, it can feel like the need itself is impossible.</p>
			<p>But needs are almost always meet-able — it's strategies that get stuck.</p>
		</section>

		<section>
			<h3>Sitting with it</h3>
			<p>
				Sometimes the most helpful thing is simply to let yourself feel the weight of the unmet need without
				rushing to fix it.
			</p>
			<p>This takes courage. And it often shifts things in ways that striving to fix them doesn't.</p>
		</section>
	</>
);

export default Grief;
