import React, { useState } from "react";
import { useWizard } from "../WizardContext";
import UnpackNeeds from "./UnpackNeeds";
import ReflectBox from "./ReflectBox";
import Pill from "../Pill";
import "./MeetMyNeeds.css";
import HelpLink from "../HelpLink";

const MeetMyNeeds = () => {
	const { visibleSteps, setStepIndex, needs } = useWizard();
	const [focusNeed, setFocusNeed] = useState(null);

	const selectedNeeds = Object.entries(needs).filter(
		([, state]) => state === "clicked" || state === "double-clicked",
	);

	const handleNeedClick = (name) => {
		setFocusNeed((prev) => (prev === name ? null : name));
	};

	const N = ({ cap, longing, bare }) => {
		const name = focusNeed ? (
			<strong>
				<em>{focusNeed}</em>
			</strong>
		) : null;
		if (longing) {
			if (!focusNeed) return "for this need";
			return focusNeed.startsWith("to ") ? name : <>for {name}</>;
		}
		if (bare) return name ?? "this need";
		if (!focusNeed) return cap ? "This need" : "this need";
		const prefix = focusNeed.startsWith("to ")
			? cap
				? "The need "
				: "the need "
			: cap
				? "The need for "
				: "the need for ";
		return (
			<>
				{prefix}
				{name}
			</>
		);
	};

	const goTo = (TargetComponent) => {
		const idx = visibleSteps.findIndex((s) => s.component === TargetComponent);
		if (idx >= 0) setStepIndex(idx);
	};

	return (
		<div className="step-container">
			<h2>Finding strategies for an unmet need</h2>

			{selectedNeeds.length > 0 && (
				<div>
					<p className="cloud-label">Choose one of your needs to focus on for now</p>
					<div className="pill-grid cloud needs-selected-pills">
						{selectedNeeds.map(([name, state]) => (
							<Pill
								key={name}
								item={name}
								type="need"
								state={focusNeed === name ? "double-clicked" : ""}
								onClick={() => handleNeedClick(name)}
							/>
						))}
					</div>
				</div>
			)}

			<p>Some needs are easy to name, but surprisingly hard to meet.</p>

			<p>That doesn’t mean you’re doing it wrong. It usually means something is tangled around the need.</p>

			<ul>
				<li>Maybe the need feels forbidden, selfish, or impossible.</li>
				<li>Maybe you can only imagine one person meeting it, in one particular way.</li>
				<li>Maybe you’re grieving how long it has been unmet.</li>
				<li>Maybe your nervous system is so overwhelmed that it can’t access creativity yet.</li>
				<li>Maybe this need is actually a strategy for meeting an even deeper need.</li>
			</ul>

			<p>
				This page is here to help you slowly untangle those knots, so you can find small, realistic ways to
				nourish the need.
			</p>

			<section className="meet-card">
				<h3>1. Check whether this is the deepest need</h3>

				<p>Sometimes the need we first choose is real, but not the deepest layer.</p>

				<p>
					For example, you might first notice a need for <strong>respect</strong>, but underneath that there
					may be a softer longing for <strong>care</strong>, <strong>mattering</strong>,{" "}
					<strong>understanding</strong>, or <strong>safety</strong>.
				</p>

				<p>One way to check is to imagine saying:</p>

				<blockquote>
					Every cell in my body is longing <N longing />.
				</blockquote>

				<p>
					If that brings softness, ache, grief, tenderness, or even tears, you may be close to something
					important.
				</p>

				<p>
					If it brings more heat, tightness, urgency, or a sense that someone else <em>should</em> be
					different, that is not wrong. It may simply mean you are still close to protest energy, and there
					may be a more vulnerable need underneath.
				</p>

				<p>Try asking:</p>

				<ul>
					<li>
						If <N /> were met, what would that give me?
					</li>
					<li>And if I had that, what would become possible?</li>
					<li>What would soften in me?</li>
					<li>What would finally be able to relax?</li>
				</ul>

				<ReflectBox
					fieldId="deeper-need"
					label="What might be the softer or deeper need underneath this one?"
					placeholder="If this need were met, I might finally feel..."
				/>
			</section>

			<section className="meet-card">
				<h3>2. Get to know the need</h3>

				<p>Before trying to meet a need, it helps to actually know it.</p>

				<p>
					Think of “meeting the need” a bit like meeting a friend. You may know its name, but not yet know
					what it feels like, what it responds to, or how it shows up in your life.
				</p>

				<p>
					Sometimes we use a word for years — like <strong>mattering</strong>, <strong>support</strong>,{" "}
					<strong>belonging</strong>, or <strong>freedom</strong> — without really knowing what it means
					inside us.
				</p>

				<p>You might explore:</p>

				<ul>
					<li>
						When has <N /> been unmet in my life?
					</li>
					<li>How did I feel when it was missing?</li>
					<li>
						When has <N /> ever been met, even a little?
					</li>
					<li>How did I feel when it was present?</li>
					<li>What behaviours, environments, or relationships helped nourish it?</li>
				</ul>

				<ReflectBox
					fieldId="unmet-when"
					label={
						<>
							When has <N /> been unmet?
						</>
					}
					placeholder="A time this need was missing was..."
				/>

				<ReflectBox
					fieldId="met-when"
					label={
						<>
							When has <N /> been met, even a little?
						</>
					}
					placeholder="A time I experienced even a small amount of this need was..."
				/>
			</section>

			<section className="meet-card">
				<h3>
					3. Notice if <N /> feels impossible or forbidden
				</h3>

				<p>
					Some needs have been unmet for so long that they start to feel dangerous, shameful, or impossible.
				</p>

				<p>You might notice thoughts like:</p>

				<ul>
					<li>I shouldn’t need this.</li>
					<li>No one will ever give me this.</li>
					<li>It’s too late.</li>
					<li>This need is too much.</li>
					<li>If I want this, I’ll be disappointed again.</li>
				</ul>

				<p>This does not mean the need is wrong.</p>

				<p>It may mean the need has been starved, dismissed, or disappointed for a long time.</p>

				<p>Before looking for strategies, it may help to simply acknowledge:</p>

				<blockquote>
					<N cap /> matters. And it has hurt that it has not been met.
				</blockquote>

				<ReflectBox
					fieldId="forbidden-stories"
					label={
						<>
							What stories or fears are wrapped around <N />?
						</>
					}
					placeholder="A story I have about this need is..."
				/>
			</section>

			<section className="meet-card">
				<h3>4. Check whether you are attached to one strategy</h3>

				<p>Every need can be nourished in many different ways.</p>

				<p>But when we’re hurting, our nervous system often narrows around one particular strategy:</p>

				<ul>
					<li>this person must understand me</li>
					<li>my partner must love me in this exact way</li>
					<li>my boss must acknowledge what I did</li>
					<li>my family must finally get it</li>
					<li>this must happen now, or it means nothing</li>
				</ul>

				<p>Those longings may make complete sense. And they may still be too narrow to give you freedom.</p>

				<p>Try asking:</p>

				<ul>
					<li>
						Am I asking for <N bare />, or am I attached to one specific strategy?
					</li>
					<li>
						Who do I believe must meet <N />?
					</li>
					<li>When do I believe it must happen?</li>
					<li>How do I believe it must look?</li>
					<li>
						What might become possible if <N /> could be nourished in more than one way?
					</li>
				</ul>

				<ReflectBox
					fieldId="attached-strategy"
					label="What strategy am I most attached to?"
					placeholder="The way I most want this need to be met is..."
				/>
			</section>

			<section className="meet-card">
				<h3>5. Brainstorm without being realistic yet</h3>

				<p>Before choosing a strategy, let your imagination open up.</p>

				<p>You do not need to decide yet. You are just making room for possibilities.</p>

				<ul>
					<li>In my wildest imagination, what would fully meet this need?</li>
					<li>What might someone else do to meet this need in their life?</li>
					<li>Do I know anyone who seems to have more of this need met? What are they doing differently?</li>
					<li>What would I suggest to a friend who had this need?</li>
					<li>What small thing might nourish this need by 5%?</li>
				</ul>

				<ReflectBox
					fieldId="brainstorm"
					label="Brainstorm possible strategies"
					placeholder="Ways this need could possibly be nourished include..."
				/>
			</section>

			<section className="meet-card">
				<h3>6. Look for different places this need could be nourished</h3>

				<p>Sometimes we imagine a need can only be met through one person or one situation.</p>

				<p>But needs can often be nourished through many channels:</p>

				<ul>
					<li>your relationship with yourself</li>
					<li>one trusted person</li>
					<li>community or group spaces</li>
					<li>your physical environment</li>
					<li>structure, routines, or systems</li>
					<li>creativity</li>
					<li>rest and physical care</li>
					<li>play</li>
					<li>learning</li>
					<li>contribution</li>
					<li>spirituality or meaning</li>
				</ul>

				<p>If one channel is blocked, another may still offer some nourishment.</p>

				<ReflectBox
					fieldId="where-nourished"
					label={
						<>
							Where could <N /> be nourished?
						</>
					}
					placeholder="This need might be nourished through..."
				/>
			</section>

			<section className="meet-card">
				<h3>7. Get specific</h3>

				<p>
					A need like <strong>support</strong>, <strong>care</strong>, or <strong>respect</strong> can mean
					very different things in real life.
				</p>

				<p>
					If you were asking someone to help meet <N />, what would you actually ask them to do?
				</p>

				<p>Not just:</p>

				<blockquote>Be nicer.</blockquote>

				<p>But something more specific, like:</p>

				<blockquote>
					Would you be willing to sit with me for ten minutes and listen without giving advice?
				</blockquote>

				<p>Or:</p>

				<blockquote>Would you be willing to text me when you’re running late?</blockquote>

				<p>
					Specific requests are easier to understand, easier to say yes or no to, and easier to experiment
					with.
				</p>

				<ReflectBox
					fieldId="specific-action"
					label={
						<>
							What specific action might help meet <N />?
						</>
					}
					placeholder="A specific thing I could ask for or try is..."
				/>
			</section>

			<section className="meet-card">
				<h3>8. Check for other needs</h3>

				<p>Before choosing a strategy, pause and check whether it affects any other needs.</p>

				<p>A strategy might meet one need while threatening another.</p>

				<p>For example:</p>

				<ul>
					<li>Asking directly may support honesty, but feel risky for safety or approval.</li>
					<li>Taking space may support peace, but affect connection.</li>
					<li>Saying yes may support belonging, but cost autonomy.</li>
					<li>Saying no may support integrity, but bring up fear of conflict.</li>
				</ul>

				<p>This does not mean the strategy is wrong. It just means more than one need matters.</p>

				<ReflectBox
					fieldId="other-needs"
					label="What other needs might be affected?"
					placeholder="This strategy might also affect my needs for..."
				/>
			</section>

			<section className="meet-card">
				<h3>9. Hold other people’s needs with care</h3>

				<p>If your strategy involves another person, remember that they have needs too.</p>

				<p>
					When someone does not want to meet our need, it is usually because doing so does not meet their
					needs — or because it seems to threaten needs of their own.
				</p>

				<p>This does not mean your need stops mattering.</p>

				<p>
					It simply means the most workable strategies are the ones that can hold both people’s needs with
					care.
				</p>

				<p>
					If you want to ask someone for something, it may help to read about making{" "}
					<HelpLink topic="requests">clear requests</HelpLink> before you do.
				</p>
			</section>

			<section className="meet-card">
				<h3>10. Sometimes offering the need to others helps</h3>

				<p>Sometimes, offering a need to someone else helps us reconnect with it.</p>

				<p>For example:</p>

				<ul>
					<li>If you long for appreciation, you might experiment with offering sincere appreciation.</li>
					<li>If you long for understanding, you might offer someone else your full attention.</li>
					<li>If you long for love, you might look for one small way to act from love.</li>
					<li>If you long for beauty, you might create or notice beauty somewhere nearby.</li>
				</ul>

				<p>This is not a substitute for your own needs mattering.</p>

				<p>It is simply one possible way to reconnect with the living quality of the need.</p>

				<ReflectBox
					fieldId="offer-need"
					label={
						<>
							Could I offer <N /> somewhere, in a way that feels alive rather than self-abandoning?
						</>
					}
					placeholder="One way I might offer this quality is..."
				/>
			</section>

			<section className="meet-card">
				<h3>11. Choose one small experiment</h3>

				<p>You do not need to solve your life perfectly right now.</p>

				<p>You are not trying to find:</p>

				<ul>
					<li>the perfect strategy</li>
					<li>permanent fulfilment</li>
					<li>a guaranteed outcome</li>
					<li>the one true answer</li>
				</ul>

				<p>You are simply asking:</p>

				<blockquote>
					What might nourish <N /> a little?
				</blockquote>

				<p>Choose one small thing to try in the next few days.</p>

				<p>Treat it like an experiment:</p>

				<ul>
					<li>What did I try?</li>
					<li>What happened?</li>
					<li>Did it nourish the need at all?</li>
					<li>Did it affect any other needs?</li>
					<li>What did I learn?</li>
				</ul>

				<ReflectBox
					fieldId="small-experiment"
					label="My small experiment"
					placeholder="One small thing I will try is..."
				/>
			</section>

			<section className="meet-card">
				<h3>12. If nothing feels possible yet</h3>

				<p>If no strategy feels possible, that may not mean there are no strategies.</p>

				<p>It may mean the need is carrying grief, exhaustion, fear, or hopelessness.</p>

				<p>In that case, the next step might not be action yet.</p>

				<p>It might be mourning:</p>

				<blockquote>This has mattered for a long time. And it has hurt.</blockquote>

				<p>You can come back to strategies later.</p>

				<p>For now, it may be enough to let the need matter.</p>

				<ReflectBox
					fieldId="what-to-mourn"
					label="What might need mourning before action is possible?"
					placeholder="What hurts about this need being unmet is..."
				/>
			</section>
		</div>
	);
};

MeetMyNeeds.title = "Meet my needs";
MeetMyNeeds.navTitle = "Meet my needs";
MeetMyNeeds.helpContent = null;

export default MeetMyNeeds;
