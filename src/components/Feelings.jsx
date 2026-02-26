import React, { useState } from "react";
import Checklist from "./Checklist";
import { AllFeelingsData as FeelingsData, regulationMeta } from "../data/AllFeelingsData";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import ClarifyPopup from "./ClarifyPopup";

const REGULATION_TYPES = ["activated", "threat", "contracted", "collapsed", "cognitive", "settled"];

const RegulationLegend = () => (
	<div className="regulation-legend">
		{REGULATION_TYPES.map((key) => {
			const meta = regulationMeta[key];
			if (!meta) return null;
			return (
				<span key={key} className="regulation-legend-item">
					<span className="regulation-legend-dot" style={{ backgroundColor: meta.colors.dot }} />
					{meta.label}
				</span>
			);
		})}
	</div>
);

const RegulationHelpContent = () => {
	const drawer = regulationMeta.uiHelpDrawer;
	return (
		<>
			<p>{drawer.intro}</p>
			<p>{drawer.why}</p>

			<h4>How to use</h4>
			<ul>
				{drawer.howToUse.map((tip, i) => (
					<li key={i}>{tip}</li>
				))}
			</ul>

			<h4>The states</h4>
			{REGULATION_TYPES.map((key) => {
				const meta = regulationMeta[key];
				if (!meta) return null;
				return (
					<div key={key} className="regulation-help-type">
						<div className="regulation-help-header">
							<span
								className="regulation-help-swatch"
								style={{
									backgroundColor: meta.colors.bg,
									borderColor: meta.colors.border,
								}}
							/>
							<strong>{meta.help.title}</strong>
						</div>
						<p className="regulation-help-desc">{meta.description}</p>
						<p className="regulation-help-detail">
							<em>What it means:</em> {meta.help.whatItMeans}
						</p>
						<p className="regulation-help-detail">
							<em>Feels like:</em> {meta.help.commonFeelsLike}
						</p>
						<p className="regulation-help-detail">
							<em>How to use:</em> {meta.help.howToUse}
						</p>
						<p className="regulation-help-gentle">{meta.help.gentleNote}</p>
					</div>
				);
			})}

			<p className="regulation-help-caution">
				<em>{drawer.caution}</em>
			</p>
		</>
	);
};

const Feelings = () => {
	const { observation, feelings, setFeelings, needs, setNeeds, settings } = useWizard();
	const [showStoryHelp, setShowStoryHelp] = useState(false);
	const [popupItem, setPopupItem] = useState(null);
	const [murkyPromptItem, setMurkyPromptItem] = useState(null);
	const [promptedMurky, setPromptedMurky] = useState(new Set());
	const [showRegulationOverlay, setShowRegulationOverlay] = useState(settings.regulationOverlay ?? false);
	const [showRegulationHelp, setShowRegulationHelp] = useState(false);

	const regulationToggle = {
		active: showRegulationOverlay,
		onToggle: () => setShowRegulationOverlay((prev) => !prev),
		onHelp: () => setShowRegulationHelp(true),
	};

	// Called by Checklist before default selection
	const handleItemClick = (itemData) => {
		if (itemData.type === "storyWord") {
			// Story word: open popup, do NOT add to selection yet
			setPopupItem(itemData);
			return false;
		}
		if (itemData.clarify?.type === "murky" && !feelings[itemData.item] && !promptedMurky.has(itemData.item)) {
			// Murky feeling being selected for the first time: add to selection, then show gentle prompt
			setMurkyPromptItem(itemData);
			setPromptedMurky((prev) => new Set(prev).add(itemData.item));
			return true;
		}
		return true; // normal feeling — allow default selection
	};

	// Chevron click on a selected murky feeling: reopen clarify popup
	const handleIndicatorClick = (itemData) => {
		setPopupItem(itemData);
	};

	// User chose to clarify the murky feeling
	const handleClarify = () => {
		setPopupItem(murkyPromptItem);
		setMurkyPromptItem(null);
	};

	// User chose to skip clarifying
	const handleSkipClarify = () => {
		setMurkyPromptItem(null);
	};

	// Toggle a suggested feeling from popup
	const toggleFeeling = (name) => {
		setFeelings((prev) => {
			const updated = { ...prev };
			if (updated[name] === "clicked") {
				delete updated[name];
			} else {
				updated[name] = "clicked";
			}
			return updated;
		});
	};

	// Toggle a suggested need from popup
	const toggleNeed = (name) => {
		setNeeds((prev) => {
			const updated = { ...prev };
			if (updated[name] === "clicked") {
				delete updated[name];
			} else {
				updated[name] = "clicked";
			}
			return updated;
		});
	};

	// Story word: keep or discard after OK
	const handleKeepWord = (itemName, keep) => {
		if (keep) {
			setFeelings((prev) => ({ ...prev, [itemName]: "clicked" }));
		}
		setPopupItem(null);
	};

	return (
		<div className="step-feelings">
			<p>
				How are you feeling now about{" "}
				<strong>
					{observation?.refined || observation?.moment || observation?.actions || "what happened"}
				</strong>
				?
			</p>

			{showRegulationOverlay && <RegulationLegend />}

			<Checklist
				data={[FeelingsData.sections.feelings, FeelingsData.sections.story]}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				type="feelings"
				onItemClick={handleItemClick}
				onIndicatorClick={handleIndicatorClick}
				showListModeToggle
				defaultListMode={settings.defaultListMode || "short"}
				regulationOverlay={showRegulationOverlay}
				regulationToggle={regulationToggle}
				categoryHelpIcons={{
					[FeelingsData.sections.story.ui.heading]: () => setShowStoryHelp(true),
				}}
			/>

			<Checklist
				data={[FeelingsData.sections.feelingsMet]}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				type="feelings"
				onIndicatorClick={handleIndicatorClick}
				showListModeToggle
				defaultListMode={settings.defaultListMode || "short"}
				regulationOverlay={showRegulationOverlay}
			/>

			{/* Inline prompt for murky feelings (only while the triggering feeling is still selected) */}
			{murkyPromptItem && feelings[murkyPromptItem.item] && (
				<div className="murky-inline-prompt">
					<p>This often has a lot packed into it. Want to explore it a little?</p>
					<div className="murky-inline-buttons">
						<button className="murky-inline-btn" onClick={handleClarify}>
							Yes
						</button>
						<button className="murky-inline-btn murky-inline-btn-secondary" onClick={handleSkipClarify}>
							Not now
						</button>
					</div>
				</div>
			)}

			{popupItem && (
				<ClarifyPopup
					itemData={popupItem}
					feelings={feelings}
					needs={needs}
					onToggleFeeling={toggleFeeling}
					onToggleNeed={toggleNeed}
					onKeepWord={handleKeepWord}
					onClose={() => setPopupItem(null)}
				/>
			)}

			<SlideDrawer isOpen={showStoryHelp} onClose={() => setShowStoryHelp(false)} title="About Story Words">
				<>
					<h3 id="#story-words-help">About Story Words</h3>

					<p>
						Some words sound like feelings but actually point to what happened or what someone else did.
						These are what we call <strong>Story Words</strong>.
					</p>

					<p>
						For example, words like <em>ignored</em>, <em>rejected</em>, or <em>attacked</em>
						carry an interpretation about another person’s behaviour.
					</p>

					<p>
						There’s nothing wrong with using these words — it’s how most of us were taught to speak. Story
						Words often show up more strongly when we’re activated or hurt, because our system is trying to
						make sense of what happened.
					</p>

					<h4>What Happens If You Select One?</h4>

					<p>
						If you choose a Story Word, you’ll be gently guided to look underneath it. We’ll help you
						translate from the story about what happened to the clearer feelings living in your body.
					</p>

					<p>
						This isn’t about being more “correct.” It’s about getting closer to your own experience — the
						sensations, emotions, and needs that are present when the story falls away.
					</p>

					<p>
						When the story softens, what remains is usually something more vulnerable, more precise, and
						more useful for understanding what you need.
					</p>
				</>
			</SlideDrawer>

			<SlideDrawer
				isOpen={showRegulationHelp}
				onClose={() => setShowRegulationHelp(false)}
				title="Nervous System Overlay">
				<RegulationHelpContent />
			</SlideDrawer>
		</div>
	);
};

Feelings.title = "Feelings";
Feelings.helpContent = (
	<>
		<h3>Feelings</h3>

		<p>
			Feelings are part of your body's signal system. They let you know whether something important is happening —
			often connected to your needs being met or unmet.
		</p>

		<p>
			When you can name what you're actually feeling, intensity often shifts. Clarity opens the doorway to
			understanding what you need.
		</p>

		<h3>Using the Feeling List</h3>

		<ul>
			<li>Tap once to select a feeling.</li>
			<li>Tap again to mark it stronger.</li>
			<li>Tap a third time to deselect.</li>
			<li>You can select multiple feelings — even contradictory ones.</li>
			<li>
				If unsure, check your body. Feelings live in sensation: tight chest, heavy stomach, clenched jaw. What
				word matches that?
			</li>
		</ul>

		<h3>Story Words</h3>

		<p>
			Some words people use as feelings actually contain a strong story about what someone else is doing. We call
			these <strong>Story Words</strong>.
		</p>

		<p>If you select a Story Word, you'll be guided to unpack the clearer feelings underneath.</p>

		<p>
			<a href="#story-words-help">Learn more about Story Words →</a>
		</p>
	</>
);

Feelings.storyWordsHelpContent = (
	<>
		<h3>Story Words</h3>

		<p>
			Many of the words we use as "feelings" actually contain a story about what someone else did. This isn't
			wrong — it's just how we're taught to speak.
		</p>

		<p>For example:</p>

		<ul>
			<li>
				<strong>"I feel ignored"</strong> — carries a story that someone ignored you.
			</li>
			<li>
				<strong>"I feel rejected"</strong> — carries a story that someone rejected you.
			</li>
			<li>
				<strong>"I feel attacked"</strong> — carries a story that someone attacked you.
			</li>
		</ul>

		<p>Underneath these words are usually clearer body-feelings — lonely, hurt, scared, angry, sad, unsettled.</p>

		<h3>Why This Matters</h3>

		<p>
			When we speak in story words, we often stay focused on what the other person did. When we name the
			underlying feeling, we move closer to ourselves.
		</p>

		<p>
			This shift isn't about being "more correct." It's about clarity. Clear feelings point more directly to clear
			needs.
		</p>

		<h3>How to Use This Step</h3>

		<p>
			If you selected a Story Word, you'll be gently guided to unpack it. There's no pressure to get it perfect.
			You're simply translating from story-language into felt experience.
		</p>

		<p>
			If nothing underneath feels true yet, that's okay. Pause. Check your body. What sensation is actually here?
		</p>
	</>
);

export default Feelings;
