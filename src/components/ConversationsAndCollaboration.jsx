import React, { useState, useEffect, useRef, useCallback } from "react";
import { useWizard } from "./WizardContext";
import { filterByState } from "../utils/renderHelpers";
import "./ConversationsAndCollaboration.css";
import HelpLink from "./HelpLink";

// ── Conversation step definitions (inside Collaborate accordion) ─────────────
const COLLAB_STEPS = [
	{
		id: "step1",
		num: 1,
		title: "Start with permission",
		desc: "Gently check if they're open.",
		hint: "This helps both of you feel safer before you begin.",
		extraHelp: null,
	},
	{
		id: "step2",
		num: 2,
		title: "Understand them first",
		desc: "Let them know you want to understand their side.",
		hint: "When people feel understood, things often soften.",
		extraHelp: (
			<>
				<p>
					This might take a bit of listening. You don't have to agree with them — just focus on understanding
					what it was like for them.
				</p>
				<p>If you're not sure, you can gently guess:</p>
				<ul>
					<li>"Were you feeling…?"</li>
					<li>"Was it because you were needing…?"</li>
				</ul>
				<p>If your guess is off, that's okay — they'll usually correct you, and that helps you get closer.</p>
			</>
		),
	},
	{
		id: "step3",
		num: 3,
		title: "Check they're open to hearing you",
		desc: "Before sharing, make sure they're willing to listen.",
		hint: "If they're not ready yet, that's okay — you can come back to this later.",
		extraHelp: (
			<>
				<p>If they say no, or seem defensive, it usually means they're not ready yet.</p>
				<p>You might:</p>
				<ul>
					<li>Come back to listening to them a bit more</li>
					<li>Take a break and return later</li>
				</ul>
				<p>This isn't failure — it's pacing.</p>
			</>
		),
	},
	{
		id: "step4",
		num: 4,
		title: "Share your experience",
		desc: "Keep it simple and grounded in your experience.",
		hint: "You don't have to get this exactly right.",
		extraHelp: (
			<>
				<p>Try to stay with:</p>
				<ul>
					<li>What actually happened (not interpretations)</li>
					<li>How you felt</li>
					<li>What you were needing</li>
				</ul>
				<p>
					If you notice blame or "you always / you never" creeping in, gently come back to talking about your
					own internal experience, rather than your thoughts about them.
				</p>
			</>
		),
	},
	{
		id: "step5",
		num: 5,
		title: "Check they got it",
		desc: "Invite them to reflect back what they heard.",
		hint: "This isn't a test — it just helps you both feel clearer.",
		extraHelp: (
			<>
				<p>If they didn't quite get it, that's okay — you can try again more simply.</p>
				<p>You might say:</p>
				<ul>
					<li>"Not quite — what I meant was…"</li>
				</ul>
				<p>This step helps reduce misunderstandings before moving forward.</p>
			</>
		),
	},
	{
		id: "step6",
		num: 6,
		title: "Find a way forward",
		desc: "Work together on what might help.",
		hint: "It doesn't have to be perfect — just a step that feels okay for both of you.",
		extraHelp: (
			<>
				<p>You're looking for something that works for both of you — not just one person "winning".</p>
				<p>It can help to keep it:</p>
				<ul>
					<li>Specific</li>
					<li>Doable</li>
					<li>Open to adjustment</li>
				</ul>
			</>
		),
	},
];

const STEP_DEFAULTS = {
	step1: "Hey, is now a good time to talk about something?",
	step2: "I'd really like to understand what was going on for you earlier.",
	step3: "Would you be open to hearing what was going on for me?",
	step4: "When [what happened], I felt [feeling], because I was needing [need].",
	step5: "Could you tell me what you heard me say?",
	step6: "What could we do next time that would work better for both of us?",
	finalScript: "",
};

const buildFinalScript = (script) => {
	const parts = [];

	parts.push("=== CHECK WILLINGNESS FOR CONVERSATION ===");
	if (script.step1) parts.push(script.step1);
	parts.push("");

	parts.push("=== EXPRESS GUESSES FOR THEM ===");
	if (script.step2) parts.push(script.step2);
	parts.push("");

	parts.push("=== Need to check you've understood them? ===");
	parts.push(' - "Have I heard you correctly? Is this what you\'re saying?"');
	parts.push("");

	parts.push("=== CHECK FOR WILLINGNESS TO HEAR YOU ===");
	if (script.step3) parts.push(script.step3);
	parts.push("");

	parts.push("=== EXPRESS OWN FEELINGS AND NEEDS ===");
	if (script.step4) parts.push(script.step4);
	parts.push("");

	parts.push("=== Need to check they've understood you? ===");
	if (script.step5) parts.push(script.step5);
	parts.push("");

	parts.push("=== FIND A MUTUAL SOLUTION ===");
	if (script.step6) parts.push(script.step6);
	parts.push("");

	return parts.join("\n");
};

// ── Component ───────────────────────────────────────────────────────────────
const ConversationsAndCollaboration = () => {
	const {
		simpleRequest,
		setSimpleRequest,
		collabScript,
		setCollabScript,
		guessObservation,
		guessFeelings,
		guessNeeds,
		observation,
		feelings,
		needs,
	} = useWizard();

	// Accordion open/close state
	const [expanded, setExpanded] = useState(new Set());
	// Per-step extra help toggles (inside Collaborate)
	const [openHelp, setOpenHelp] = useState(new Set());
	// Refs for auto-resizing textareas
	const textareaRefs = useRef({});

	const autoResize = useCallback((el) => {
		if (!el) return;
		el.style.height = "auto";
		el.style.height = el.scrollHeight + "px";
	}, []);

	const toggle = (id) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const toggleHelp = (id) => {
		setOpenHelp((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const updateCollabScript = (field, value) => setCollabScript((prev) => ({ ...prev, [field]: value }));

	// Initialise step fields from context data on first visit
	useEffect(() => {
		if (collabScript.step1 !== undefined) return;

		// Self — observation, feelings, needs
		const allFeelings = [...filterByState(feelings, "clicked"), ...filterByState(feelings, "double-clicked")];
		const allNeeds = [...filterByState(needs, "clicked"), ...filterByState(needs, "double-clicked")];
		const obs = observation?.refined?.trim() || "[what happened]";
		const feelStr = allFeelings.length ? allFeelings.join(", ").toLowerCase() : "[feeling]";
		const needStr = allNeeds.length ? allNeeds.join(", ").toLowerCase() : "[need]";

		// Other — guesses about their feelings and needs
		const guessFeelingsAll = [
			...filterByState(guessFeelings, "clicked"),
			...filterByState(guessFeelings, "double-clicked"),
		];
		const guessNeedsAll = [...filterByState(guessNeeds, "clicked"), ...filterByState(guessNeeds, "double-clicked")];
		const guessFeelStr = guessFeelingsAll.join(", ").toLowerCase();
		const guessNeedStr = guessNeedsAll.join(", ").toLowerCase();

		let step2 = "";
		if (guessObservation || guessFeelStr || guessNeedStr) {
			if (guessObservation && (guessFeelStr || guessNeedStr)) {
				step2 = `I'm wondering what it was like for you when ${guessObservation}, if you might have been feeling ${guessFeelStr || "[feeling]"}, and wanting ${guessNeedStr || "[need]"}.`;
			} else if (guessObservation) {
				step2 = `I'm wondering what it was like for you when ${guessObservation}.`;
			} else {
				step2 = `I'd really like to understand how it was for you earlier, if you might have been feeling ${guessFeelStr || "[feeling]"}, and wanting ${guessNeedStr || "[need]"}.`;
			}
		}

		const fields = {
			...STEP_DEFAULTS,
			step2,
			step4: `When ${obs}, I felt ${feelStr}, because I was needing ${needStr}.`,
		};

		setCollabScript({
			...fields,
			finalScript: buildFinalScript(fields),
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	// Auto-resize all tracked textareas whenever their content changes
	useEffect(() => {
		Object.values(textareaRefs.current).forEach(autoResize);
	}, [collabScript, autoResize]);

	const SECTIONS = [
		{
			id: "despair",
			title: "First: despair about need ever being met",
			content: (
				<>
					<p>
						Sometimes, after identifying a need, the pain is not just that the need is unmet in this
						situation — it's that you can't see any way for it to be met at all.
					</p>

					<p>The first question to ask yourself is:</p>

					<p>
						<strong>Am I stuck on one particular strategy?</strong>
						<br />
						Am I believing there is only <em>one</em> way for this need to be met?
						<br />
						Do I need to loosen my grip on my preferred strategy and become willing to explore other
						possibilities?
					</p>

					<p>
						Sometimes that is enough. Once you stop treating one strategy as the only path, other options
						begin to appear.
					</p>

					<p>
						Very occasionally, though, something deeper surfaces: this need feels unmet not just here, but
						more broadly — and you genuinely have no idea how to change that. When that happens, there are
						usually two helpful approaches.
					</p>

					<h3>1. Let it percolate</h3>

					<p>
						Are you willing to sit with the unmet need for a few days and give it time? Let yourself wonder
						what this need really means to you, and what would actually help you feel it had been met. Put
						it on the back burner for a while and let it unfold.
					</p>

					<h3>2. Try giving it</h3>

					<p>
						This can feel counter-intuitive, but sometimes, when you feel desperate and lost, stopping
						trying to get the need met for yourself and instead looking for a way to offer it to someone
						else can be surprisingly powerful.
					</p>

					<p>
						For example, if the need is <strong>love</strong>, you might look for someone even more starved
						of love and find a way to offer them some. Strangely, this can teach you a lot about the need
						itself — what it really is, what it looks like in practice, and sometimes even what might help
						meet it in your own life.
					</p>

					<p>And finally, if you're still completely stuck, it can help to remember this:</p>

					<p>
						<strong>
							Even if you can't see how this need could be met right now, you do not know what the future
							holds.
						</strong>
					</p>

					<p>
						You can still honour the need. Hold it gently, value it, and let it matter — even before you
						know what to do about it.
					</p>
					<p>
						You might like to read more about{" "}
						<HelpLink topic="mourning">connecting with, and mourning, unmet needs</HelpLink>.
					</p>
				</>
			),
		},
		{
			id: "whether",
			title: "Whether to have the conversation",
			content: (
				<>
					<p>A conversation with the other person is likely to be worthwhile IF:</p>
					<ul>
						<li>You have ongoing contact with this person</li>
						<li>AND this is an appropriate place for you to try having this need met</li>
						<li>AND this is a need they are potentially capable of meeting</li>
						<li>AND you have enough clarity to express yourself clearly enough</li>
						<li>AND they're willing to have the conversation!</li>
					</ul>
					<p>
						If this person isn't capable of meeting this need, don't give up on it — find ways to meet it
						elsewhere. Hold tightly to your needs, and loosely to your strategies.
					</p>
				</>
			),
		},

		{
			id: "request",
			title: "Make a simple request",
			content: (
				<>
					<p>
						If this is a fairly simple situation, there may be a request you'd like to make of the other
						person. A request is basically asking whether someone would be willing to take an action that
						might help meet one or more of your needs.
					</p>

					<p>
						It helps to stay aware that no-one has to meet your needs. You're asking for willingness, not
						demanding compliance. In fact, you usually don't want people to do something unwillingly — that
						tends to create resentment and disconnect rather than genuine care.
					</p>

					<p>A few things tend to make requests work better:</p>

					<ul>
						<li>
							<strong>Be clear and specific.</strong> A request needs to describe something the other
							person could actually do or say. "Be nicer to me" isn't very clear, because the other person
							has no idea what that would look like for you.
						</li>

						<li>
							<strong>Describe the action you're asking for.</strong> For example: "Would you be willing
							to ask me how my day was when I get home, for the next week?"
						</li>

						<li>
							<strong>Keep it doable.</strong> Requests work best when they are concrete and realistic.
							Specific actions and timeframes make it easier for the other person to respond honestly.
						</li>

						<li>
							<strong>Be willing to hear "no".</strong> A request only stays a request if the other person
							can freely say no. If they say no, it doesn't mean your needs don't matter — it usually
							means they have needs of their own that are also important.
						</li>

						<li>
							<strong>Listen for the "yes" to their own needs.</strong> When someone says no, they are
							often protecting something important to them — perhaps their time, energy, safety, or
							priorities. Hearing that can open the door to finding another strategy that might work for
							both of you.
						</li>
					</ul>

					<p>
						When both people's needs are "on the table", it becomes much easier to look for solutions that
						everyone can willingly support.
					</p>

					<div className="collab-input-group">
						<label className="collab-input-label">Is there a request you'd like to make?</label>
						<textarea
							className="collab-textarea"
							placeholder="e.g. Would you be willing to…"
							value={simpleRequest}
							onChange={(e) => setSimpleRequest(e.target.value)}
							rows={3}
						/>
					</div>
				</>
			),
		},
		{
			id: "collaborate",
			title: "Collaborate",
			content: (
				<>
					<p>
						If you'd like to talk this through with the other person, this can help you plan the
						conversation.
					</p>
					<p>There's no perfect way to do this — just something honest and human.</p>
					<p className="collab-intro-note">Use these as prompts, not a script. Let it sound like you.</p>

					<div className="collab-steps">
						{COLLAB_STEPS.map((step) => {
							const value = collabScript[step.id] ?? STEP_DEFAULTS[step.id] ?? "";
							const helpOpen = openHelp.has(step.id);
							return (
								<div className="collab-step" key={step.id}>
									<h3 className="collab-step-title">
										<span className="collab-step-num">{step.num}.</span>
										{step.title}
									</h3>
									<p className="collab-step-desc">{step.desc}</p>
									<p className="collab-step-hint">{step.hint}</p>
									<textarea
										className="collab-step-textarea"
										ref={(el) => {
											textareaRefs.current[step.id] = el;
											autoResize(el);
										}}
										value={value}
										onInput={(e) => autoResize(e.target)}
										onChange={(e) => updateCollabScript(step.id, e.target.value)}
									/>
									{step.extraHelp && (
										<>
											<button
												className="collab-help-toggle"
												onClick={() => toggleHelp(step.id)}
												aria-expanded={helpOpen}>
												{helpOpen
													? "▲ Hide extra help"
													: "Need a bit more help with this step?"}
											</button>
											{helpOpen && <div className="collab-help-extra">{step.extraHelp}</div>}
										</>
									)}
								</div>
							);
						})}

						<div className="collab-step collab-step--final">
							<h3 className="collab-step-title">Say it in your own words</h3>
							<p className="collab-step-desc">
								Here's your whole script — edit it to make it sound more like you.
							</p>
							<p className="collab-step-hint">
								For heaven's sake, don't use these exact words! Too formal. Let it sound natural.
							</p>
							<textarea
								className="collab-step-textarea collab-step-textarea--very-tall"
								placeholder="Your conversation script will appear here…"
								ref={(el) => {
									textareaRefs.current["finalScript"] = el;
									autoResize(el);
								}}
								value={collabScript.finalScript ?? ""}
								onInput={(e) => autoResize(e.target)}
								onChange={(e) => updateCollabScript("finalScript", e.target.value)}
							/>
							<button
								className="collab-regenerate-btn"
								onClick={() => updateCollabScript("finalScript", buildFinalScript(collabScript))}>
								↺ Regenerate from fields above
							</button>
						</div>
					</div>

					<p className="collab-save-hint">You can save or copy all this on the next page.</p>
				</>
			),
		},
	];

	return (
		<div className="step-collab step-container">
			<p>
				Many people find that doing this process resolves a lot of their issues, and when it's done, it's done!
				But sometimes it's more complicated, and you want to figure out how to move forward with the other
				person.
			</p>

			<div className="collab-accordion">
				{SECTIONS.map(({ id, title, content }) => {
					const isOpen = expanded.has(id);
					return (
						<div key={id} className={`collab-section ${isOpen ? "open" : ""}`}>
							<button className="collab-section-toggle" onClick={() => toggle(id)}>
								<span>{title}</span>
								<span className="collab-section-chevron">{isOpen ? "▲" : "▼"}</span>
							</button>
							{isOpen && <div className="collab-section-content">{content}</div>}
						</div>
					);
				})}
			</div>
		</div>
	);
};

ConversationsAndCollaboration.title = "Conversations and Collaboration";

ConversationsAndCollaboration.helpContent = (
	<>
		<h2>Need more support with having a conversation?</h2>

		<section>
			<h3>When this feels hard</h3>
			<p>If this feels difficult, that’s completely normal.</p>
			<p>
				When we’re hurt or activated, our brain shifts into protection mode — it can feel urgent to explain,
				defend, or fix things quickly.
			</p>
			<p>
				This process is about slowing things down just enough to understand what’s really going on, so you have
				a better chance of being heard.
			</p>
		</section>

		<section>
			<h3>Why start with them?</h3>
			<p>When someone feels understood, their nervous system often settles.</p>
			<p>That makes it much more likely they’ll be able to hear you in return.</p>
			<p>This doesn’t mean their perspective is “right” — just that understanding comes before resolution.</p>
		</section>

		<section>
			<h3>If they’re not ready</h3>
			<p>Sometimes the other person isn’t in a place where they can have this kind of conversation.</p>
			<p>That might look like:</p>
			<ul>
				<li>Interrupting or arguing</li>
				<li>Shutting down</li>
				<li>Dismissing what you’re saying</li>
			</ul>
			<p>If that happens, it’s often more effective to pause and come back later, rather than pushing through.</p>
		</section>

		<section>
			<h3>You don’t have to get this right</h3>
			<p>There’s no perfect way to do this.</p>
			<p>What matters most is sincerity — being real about your experience, and open to theirs.</p>
			<p>Even a messy, human version of this can shift things.</p>
		</section>

		<section>
			<h3>This is a practice</h3>
			<p>This kind of conversation takes practice.</p>
			<p>It’s normal to forget steps, get tangled, or slip back into old patterns.</p>
			<p>Each time you try, you’re building a new way of relating.</p>
		</section>
	</>
);

export default ConversationsAndCollaboration;
