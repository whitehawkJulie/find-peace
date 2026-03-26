import React, { useState } from "react";
import Checklist from "./Checklist";
import { AllFeelingsData as FeelingsData, regulationMeta } from "../data/AllFeelingsData";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import ClarifyFeelings from "./ClarifyFeelings";
import BodySensationsPopup from "./BodySensationsPopup";
import "./Feelings.css";

const REGULATION_TYPES = ["activated", "threat", "contracted", "collapsed", "cognitive"];

const RegulationLegend = ({ onHelp, onClose }) => (
	<div className="regulation-legend">
		{REGULATION_TYPES.map((key) => {
			const meta = regulationMeta[key];
			if (!meta) return null;
			return (
				<span
					key={key}
					className="pill reg-overlay"
					style={{
						backgroundColor: meta.colors.bg,
						border: `1px solid ${meta.colors.border}`,
						cursor: "default",
					}}>
					{meta.label}
				</span>
			);
		})}
		{onHelp && (
			<button className="regulation-help-btn" title="What's this?" onClick={onHelp}>
				?
			</button>
		)}
		{onClose && (
			<button className="regulation-legend-close" title="Turn off body state view" onClick={onClose}>
				✕
			</button>
		)}
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
	const { observation, feelings, setFeelings, needs, setNeeds, settings, bodySensations, setBodySensations } =
		useWizard();
	const [showStoryHelp, setShowStoryHelp] = useState(false);
	const [showBodySensations, setShowBodySensations] = useState(false);
	const [popupItem, setPopupItem] = useState(null);
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
			if (feelings[itemData.item]) {
				// Already selected — deselect immediately on single click
				setFeelings((prev) => {
					const updated = { ...prev };
					delete updated[itemData.item];
					return updated;
				});
				return false;
			}
			// Story word: open popup, do NOT add to selection yet
			setPopupItem(itemData);
			return false;
		}
		return true; // normal feeling — allow default selection
	};

	// Chevron click on a selected murky feeling: reopen clarify popup
	const handleIndicatorClick = (itemData) => {
		setPopupItem(itemData);
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
		<div className="step-feelings step-container">
			<p>
				Here we’re tuning into what you’re feeling, so that we can get more information about what’s going on
				for you.
			</p>

			<p>
				When something happens, your body reacts before your mind has worked it out. If we skip that step, we
				often act on the first story our mind creates — which can lead us in the wrong direction.
			</p>

			<p>
				You don’t have to get this perfect. Just notice what’s there — you might find that naming feelings gives
				you information you didn’t realise you had.
			</p>

			<p>Now return to that moment.</p>

			<p>
				What do you notice inside you?
				<br />
				Where do you feel it in your body?{" "}
				<button className="feelings-body-sens-link" onClick={() => setShowBodySensations(true)}>
					{"Not sure? →"}
				</button>
				<br />
				What feelings are there?
			</p>

			<Checklist
				data={[FeelingsData.sections.feelings, FeelingsData.sections.story]}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				type="feelings"
				onItemClick={handleItemClick}
				onIndicatorClick={handleIndicatorClick}
				showListModeToggle
				defaultListMode="full"
				regulationOverlay={showRegulationOverlay}
				regulationToggle={regulationToggle}
				headerContent={
					showRegulationOverlay ? (
						<RegulationLegend
							onHelp={regulationToggle?.onHelp}
							onClose={() => setShowRegulationOverlay(false)}
						/>
					) : null
				}
				tooltipEnhancer={
					showRegulationOverlay
						? (itemData, base) => {
								const regType = itemData._resolvedRegType;
								if (!regType) return base;
								const types = Array.isArray(regType) ? regType : [regType];
								const labels = types.map((t) => regulationMeta[t]?.label).filter(Boolean);
								if (!labels.length) return base;
								const suffix = `(${labels.join(" / ")})`;
								return base ? `${base}\n${suffix}` : suffix;
							}
						: null
				}
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
				defaultListMode="quick"
				regulationOverlay={showRegulationOverlay}
			/>

			{showBodySensations && (
				<BodySensationsPopup
					selected={bodySensations.selected}
					customText={bodySensations.custom}
					onToggle={(word) =>
						setBodySensations((prev) => {
							const already = prev.selected.includes(word);
							return {
								...prev,
								selected: already ? prev.selected.filter((w) => w !== word) : [...prev.selected, word],
							};
						})
					}
					onCustomChange={(text) => setBodySensations((prev) => ({ ...prev, custom: text }))}
					onClose={() => setShowBodySensations(false)}
				/>
			)}

			{popupItem && (
				<ClarifyFeelings
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
						These are what we call <strong>Story Words</strong>. (Traditional NVC calls them Faux Feelings.)
						{/* TODO: put that last bit in a footnote */}
					</p>

					<p>
						For example, words like <em>ignored</em>, <em>rejected</em>, or <em>attacked</em> carry an
						interpretation about another person’s behaviour.
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

Feelings.title = "What am I feeling?";
Feelings.titleSweary = "Fuck them, what's going on in ME?";
Feelings.navTitle = "What am I feeling?";
Feelings.helpContent = (
	<>
		<h3>Feelings</h3>

		<p>
			Feelings live in your body - they are part of your body's signal system. They let you know whether something
			important is happening — often connected to your needs being met or unmet.
		</p>
		<p>
			<a href="https://sarahpeyton.com/" target="_blank" rel="noopener noreferrer">
				Sarah Peyton
			</a>{" "}
			says that our body’s job is to signal what’s happening inside us. When we ignore those signals, the body
			can’t fully relax — it’s still trying to deliver the message. But when we notice and acknowledge what it’s
			telling us, it’s as if the body says, “Message delivered!,” and it can finally relax.
		</p>
		<p>
			When you can name what you're actually feeling, intensity often shifts. Clarity opens the doorway to
			understanding what you need.
		</p>

		<p>
			It's really useful to look through the entire feelings list, checking for every feeling inside yourself,
			rather than just scanning the list looking for words for feelings you already know. The surprising ones hold
			a LOT of power to shift your experience.
		</p>

		<p>
			It's completely normal to feel lots of different things at once, some of them contradictory! Select any
			feelings in the list that jump out at you.
		</p>

		<h3>Story Words</h3>

		<p>
			Many of the words we use as "feelings" actually contain a story about what someone else did. We call these{" "}
			<strong>Story Words</strong>. This isn't wrong — it's just how we're taught to speak. (Traditional NVC
			called these "Faux Feelings".)
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

		<p>
			When we speak in story words, we often stay focused on what the other person did. When we name the
			underlying feeling, we move closer to ourselves. Clear feelings point more directly to clear needs.
		</p>

		<p>If you select a Story Word, you'll be gently guided to unpack it. There's no pressure to get it perfect.</p>
	</>
);

export default Feelings;
