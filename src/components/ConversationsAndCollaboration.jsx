import React, { useState, useEffect } from "react";
import { useWizard } from "./WizardContext";
import { filterByState } from "../utils/renderHelpers";
import "./ConversationsAndCollaboration.css";
import HelpLink from "./HelpLink";

// Build a single combined script string from all the collabScript fields
const buildFinalScript = (fields) => {
	const { permissionLine, guessFeelingsLine, guessNeedsLine, selfObsLine, selfFeelingsLine, selfNeedsLine } = fields;
	const parts = [];

	parts.push("=== CHECK WILLINGNESS FOR CONVERSATION ===");

	if (permissionLine) {
		parts.push(
			`Would you be willing to have a conversation about ${permissionLine}? When might be a good time for you?`,
		);
		parts.push("");
	}

	parts.push("=== EXPRESS GUESSES FOR THEM ===");

	if (guessFeelingsLine || guessNeedsLine) {
		if (guessFeelingsLine) parts.push(`I'm wondering if you might have been feeling ${guessFeelingsLine}`);
		if (guessNeedsLine) parts.push(`and wanting ${guessNeedsLine}`);
		parts.push("");
	}

	parts.push(`=== Need to check you've understood them? ===`);
	parts.push(` - "Have I heard you correctly? Is this what you're saying?"`);
	parts.push("");

	parts.push("=== CHECK FOR WILLINGESS TO HEAR YOU ===");

	parts.push("Are you willing to hear what came up for me?");
	parts.push("");
	parts.push("=== EXPRESS OWN FEELINGS AND NEEDS ===");

	if (selfObsLine || selfFeelingsLine || selfNeedsLine) {
		if (selfObsLine) parts.push(`When I remember ${selfObsLine}`);
		if (selfFeelingsLine) parts.push(`I feel ${selfFeelingsLine}()`);
		if (selfNeedsLine) parts.push(`because I'm really longing for ${selfNeedsLine}`);
		parts.push("");
	}

	parts.push(`=== Need to check they've understood you? ===`);
	parts.push(` - "Can you tell me how that landed for you?"`);
	parts.push(` - "Can you tell me how you are, having heard that?"`);
	parts.push("");

	parts.push("=== FIND A MUTUAL SOLUTION ===");
	parts.push(`How do you think we can meet both/all of our needs`);
	parts.push(`One solution could be ... would that meet your needs also?`);
	parts.push("");

	return parts.join("\n");
};

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
		requestOfSelf,
	} = useWizard();
	const [expanded, setExpanded] = useState(new Set());

	const toggle = (id) => {
		setExpanded((prev) => {
			const next = new Set(prev);
			next.has(id) ? next.delete(id) : next.add(id);
			return next;
		});
	};

	const updateCollabScript = (field, value) => {
		setCollabScript((prev) => ({ ...prev, [field]: value }));
	};

	// Initialise collabScript from context data the first time the component mounts
	// (only if it hasn't been set yet — undefined means uninitialised, "" means user cleared it)
	useEffect(() => {
		if (collabScript.permissionLine !== undefined) return;

		const guessFeelingsAll = [
			...filterByState(guessFeelings, "clicked"),
			...filterByState(guessFeelings, "double-clicked"),
		];
		const guessNeedsAll = [...filterByState(guessNeeds, "clicked"), ...filterByState(guessNeeds, "double-clicked")];
		const allFeelings = filterByState(feelings, "clicked");
		const allNeeds = filterByState(needs, "clicked");

		// permissionLine stores just the topic (the observation part), not the full sentence
		const permissionLine = guessObservation;

		// Guess fields: feelings and needs as separate editable boxes
		const guessFeelingsLine = guessFeelingsAll.join(", ").toLowerCase();
		const guessNeedsLine = guessNeedsAll.join(", ").toLowerCase();

		const fields = {
			permissionLine,
			guessFeelingsLine,
			guessNeedsLine,
			theyAreReady: false,
			selfObsLine: observation?.refined?.trim() || "",
			selfFeelingsLine: allFeelings.join(", ").toLowerCase(),
			selfNeedsLine: allNeeds.join(", ").toLowerCase(),
		};

		setCollabScript({
			...fields,
			collabFinalScript: buildFinalScript(fields),
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const SECTIONS = [
		{
			id: "despair",
			title: "First: despair about need ever being met",
			content: (
				<>
					<p>
						Sometimes, after identifying a need, we realise the pain is not just that the need is unmet in
						this situation — it's that we can't see any way for it to be met at all.
					</p>

					<p>The first question I ask myself is:</p>

					<p>
						<strong>Am I stuck on one particular strategy?</strong>
						<br />
						Am I believing there is only <em>one</em> way for this need to be met?
						<br />
						Do I need to loosen my grip on my preferred strategy and become willing to explore other
						possibilities?
					</p>

					<p>
						Sometimes that is enough. Once we stop treating one strategy as the only path, other options
						begin to appear.
					</p>

					<p>
						Very occasionally, though, we realise something deeper: this need feels unmet not just here, but
						in our life more broadly — and we genuinely have no idea how to change that. When that happens,
						I tend to take one of two approaches.
					</p>

					<h3>1. Let it percolate</h3>

					<p>
						I ask myself whether I'm willing to sit with the unmet need for a few days and give it time. I
						let myself wonder what this need really means to me, and what would actually help me feel it had
						been met. I put it on the back burner for a while and let it unfold.
					</p>

					<h3>2. Try giving it</h3>

					<p>
						This can feel counter-intuitive, but sometimes, when I feel desperate and lost, I stop trying to
						get the need met for myself and instead look for a way to offer it to someone else.
					</p>

					<p>
						For example, if the need is <strong>love</strong>, I might look for someone even more starved of
						love than I am, and find a way to offer them some. Strangely, this can teach me a lot about the
						need itself — what it really is, what it looks like in practice, and sometimes even what might
						help meet it in my own life.
					</p>

					<p>And finally, if I'm still completely stuck, I find it helpful to remember this:</p>

					<p>
						<strong>
							Even if I can't see how this need could be met right now, I do not know what the future
							holds.
						</strong>
					</p>

					<p>
						I can still honour the need. I can hold it gently, value it, and let it matter — even before I
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
					<p>I'm likely to have the conversation with the other person about this situation IF:</p>
					<ul>
						<li>I have ongoing contact with this person</li>
						<li>AND this is an appropriate place for me to try having this need met</li>
						<li>AND this is a need that they are potentially capable of meeting</li>
						<li>AND I have enough clarity at this point to find a way to express myself clearly enough</li>
						<li>AND they're willing to have the conversation!</li>
					</ul>
					<p>
						If this person isn't capable of meeting this need, I don't give up on it — I find ways to meet
						it elsewhere. Hold tightly to your needs, and loosely to your strategies.
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
						It helps to stay aware that no-one has to meet our needs. We're asking for willingness, not
						demanding compliance. In fact, we usually don't want people to do something unwillingly — that
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
						If you want things to change, the next step is usually a conversation with the other person so
						you can get on the same page and then co-create a solution together.
					</p>

					<p>
						It helps to do the full reflection process in this tool first. When you're clearer about what
						happened, how you felt, and what needs were involved, the conversation is much more likely to go
						well.
					</p>

					<p>
						Below is a guide for the conversation. The text boxes are pre-filled from what you've explored —
						feel free to edit them before you have the conversation.
					</p>

					<div className="collab-script">
						<div className="collab-script-step">
							<p className="collab-script-heading">
								<strong>1. Start by getting permission</strong>
							</p>
							<p className="collab-script-hint">
								Rather than launching straight into the issue, make a simple request first.
							</p>
							<div className="collab-phrase">
								<div className="collab-phrase-prefix">
									Would you be willing to have a conversation about
								</div>
								<textarea
									className="collab-phrase-textarea"
									rows={2}
									value={collabScript.permissionLine ?? ""}
									onChange={(e) => updateCollabScript("permissionLine", e.target.value)}
									placeholder="what you'd like to talk about…"
								/>
								<div className="collab-phrase-suffix">? When might be a good time for you?</div>
							</div>
						</div>

						<div className="collab-script-step">
							<p className="collab-script-heading">
								<strong>2. Begin with your guesses about them</strong>
							</p>
							<p className="collab-script-hint">
								When people feel that you're trying to understand them, their nervous system tends to
								settle. Try starting with your guesses about what was happening for them.
							</p>
							<div className="collab-phrase">
								<div className="collab-phrase-prefix">I'm wondering if you might have been feeling</div>
								<textarea
									className="collab-phrase-textarea"
									rows={2}
									value={collabScript.guessFeelingsLine ?? ""}
									onChange={(e) => updateCollabScript("guessFeelingsLine", e.target.value)}
									placeholder="e.g. hurt, frustrated, anxious…"
								/>
							</div>
							<div className="collab-phrase">
								<div className="collab-phrase-prefix">and wanting</div>
								<textarea
									className="collab-phrase-textarea"
									rows={2}
									value={collabScript.guessNeedsLine ?? ""}
									onChange={(e) => updateCollabScript("guessNeedsLine", e.target.value)}
									placeholder="e.g. respect, connection, understanding…"
								/>
							</div>
							<p>
								At this point, if any of your guesses are wrong, they will usually very quickly correct
								you! And that's great ... we simply want to get clear on what's up for them.
							</p>
							<p>
								This stage might take a lot of listening ... try to keep your focus on guessing what
								they might be feeling and needing, underneath what they're saying, and reflecting those
								back to them - "Oh right, so it's about ... ". This takes practice - you'll get better
								at it with time!
							</p>
						</div>

						<div className="collab-script-step">
							<p className="collab-script-heading">
								<strong>3. Ask for their willingness to hear you</strong>
							</p>
							<p className="collab-script-hint">
								Once you sense that they feel heard, and aren't defensive any more, then you can ask
								"Are you willing to hear what came up for me?"{" "}
							</p>
							<p>
								If they're not ready to listen yet, it's usually because they still don't trust you're
								not about to attack them, so you could address that (like "Are you worried I'm going to
								say something mean?").{" "}
							</p>
							<p>
								If they're still not willing, it's usually best to give up for the moment, and try again
								another day. Pushing usually makes things harder.
							</p>
						</div>

						<div className="collab-script-step">
							<p className="collab-script-heading">
								<strong>4. Share what's true for you.</strong>
							</p>
							<p>
								If they DO feel heard and signal they're ready, THEN you can share your own perspective.
							</p>
							<p>
								I tend to be fairly selective about what I share, choosing the words that are least
								likely to trigger the other person unnecessarily, whilst still keeping the authentic
								heart of what I'm saying.
							</p>

							<div className="collab-self-ofn">
								<div className="collab-phrase">
									<div className="collab-phrase-prefix">When I remember</div>
									<textarea
										className="collab-phrase-textarea"
										rows={2}
										value={collabScript.selfObsLine ?? ""}
										onChange={(e) => updateCollabScript("selfObsLine", e.target.value)}
										placeholder="what happened…"
									/>
								</div>
								<div className="collab-phrase">
									<div className="collab-phrase-prefix">I feel</div>
									<textarea
										className="collab-phrase-textarea"
										rows={2}
										value={collabScript.selfFeelingsLine ?? ""}
										onChange={(e) => updateCollabScript("selfFeelingsLine", e.target.value)}
										placeholder="e.g. hurt, worried, sad…"
									/>
								</div>
								<div className="collab-phrase">
									<div className="collab-phrase-prefix">because I'm really longing for</div>
									<textarea
										className="collab-phrase-textarea"
										rows={2}
										value={collabScript.selfNeedsLine ?? ""}
										onChange={(e) => updateCollabScript("selfNeedsLine", e.target.value)}
										placeholder="e.g. connection, respect, safety…"
									/>
								</div>
							</div>
						</div>

						<div className="collab-script-step collab-script-step--static">
							<p className="collab-script-heading">
								<strong>5. Check they've heard you</strong>
							</p>
							<p>If you're not sure how what you've said has landed for them, you can ask!</p>
							<ul>
								<li>"Can you tell me how that landed for you?"</li>
								<li>"Can you tell me how you are, having heard that?"</li>
								<li>"Would you be willing to tell me what you're hearing me say?"</li>
							</ul>
							<p>
								Again, having lots of NVC practice until your belt comes in useful here! If, for
								example, they say something like "Well, you're saying I'm an asshole!", you can respond
								with something like, "Thanks for letting me know that's what you heard, it's really
								important to me that I've expressed myself clearly, and it's not actually what I was
								saying. Can I try again?"
							</p>
						</div>

						<div className="collab-script-step collab-script-step--static">
							<p className="collab-script-heading">
								<strong>6. Co-create a solution only after both of you feel heard</strong>
							</p>
							<p>
								Once you're at the point where you both feel connected, and safe, then it's possible to
								find solutions that work to meet both of your needs. You might ask{" "}
							</p>
							<ul>
								<li>"How do you think we can meet both/all of our needs"</li>
							</ul>

							<p>or, if you have some ideas, you could say </p>
							<ul>
								<li>"One solution could be ... would that meet your needs also?"</li>
							</ul>

							<p>
								The point is, we only want the other person to meet our needs if they can do so
								willingly. We all know what's it's like when someone isn't genuinely willing - it
								doesn't work for anyone.
							</p>
						</div>
						<div className="collab-script-step collab-final-script-section">
							<p className="collab-script-heading">
								<strong>Say it in your own words!</strong>
							</p>
							<p>
								Now, having built all that ... for heaven's sake, don't use these exact words, ha ha.
								It's way too formal, and people often hear it as inauthentic and manipulative.
							</p>
							<p>
								{" "}
								So the idea is to say it in a way that's as normal-to-you as possible. For example, I
								might say "Yeah, I imagine the other day was hard for you too. Were you wanting some
								down time and it was annoying when I asked for help?" ("down time" being a casual way of
								phrasing the needs for rest and ease.){" "}
							</p>
							<p>
								Same of course with check ins - rather than "can you tell me back what I've said", it
								might be more like noticing they're reacting and asking "Oh, I can see that's pissed you
								off, what are you taking from what I said?"
							</p>
							<p className="collab-final-script-intro">
								Here's your whole script — edit it here to make it sounds more like YOU.
							</p>
							<textarea
								className="collab-final-script-textarea"
								rows={16}
								value={collabScript.collabFinalScript ?? ""}
								onChange={(e) => updateCollabScript("collabFinalScript", e.target.value)}
								placeholder="Your conversation script will appear here…"
							/>
							<button
								className="collab-regenerate-btn"
								onClick={() => updateCollabScript("collabFinalScript", buildFinalScript(collabScript))}>
								↺ Regenerate from fields above
							</button>
						</div>
						<p className="collab-save-hint">You can save or copy all this on the next page.</p>
					</div>
				</>
			),
		},
	];

	return (
		<div className="step-collab step-container">
			<p>
				Many of us find that doing this process resolves a lot of our issues, and when it's done, we're done!
				But sometimes it's more complicated, and we want to figure out how to move forward with the other
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
ConversationsAndCollaboration.helpContent = null;

export default ConversationsAndCollaboration;
