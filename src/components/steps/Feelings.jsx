import React, { useState } from "react";
import Checklist from "../Checklist";
import { AllFeelingsData as FeelingsData, regulationMeta } from "../../data/AllFeelingsData";
import { useWizard } from "../WizardContext";
import SlideDrawer from "../SlideDrawer";
import ClarifyFeelings from "../ClarifyFeelings";
import BodySensationsPopup from "../BodySensationsPopup";
import HelpLink from "../HelpLink";
import DismissibleHint from "../DismissibleHint";

import AfraidIcon from "../../assets/afraid.svg?react";
import TenseIcon from "../../assets/tense.svg?react";
import DisquietIcon from "../../assets/disquiet.svg?react";
import AnnoyedIcon from "../../assets/annoyed.svg?react";
import AngryIcon from "../../assets/angry.svg?react";
import AversionIcon from "../../assets/aversion.svg?react";
import VulnerableIcon from "../../assets/vulnerable.svg?react";
import EmbarrassedIcon from "../../assets/embarrassed.svg?react";
import SadIcon from "../../assets/sad.svg?react";
import PainIcon from "../../assets/pain.svg?react";
import DisconnectedIcon from "../../assets/disconnected.svg?react";
import FatigueIcon from "../../assets/fatigue.svg?react";
import ConfusedIcon from "../../assets/confused.svg?react";
import YearningIcon from "../../assets/yearning.svg?react";

import "./Feelings.css";

const FEELINGS_ICONS = {
	Afraid: AfraidIcon,
	Tense: TenseIcon,
	Disquiet: DisquietIcon,
	Annoyed: AnnoyedIcon,
	Angry: AngryIcon,
	Aversion: AversionIcon,
	Vulnerable: VulnerableIcon,
	Embarrassed: EmbarrassedIcon,
	Sad: SadIcon,
	Pain: PainIcon,
	Disconnected: DisconnectedIcon,
	Fatigue: FatigueIcon,
	Confused: ConfusedIcon,
	Yearning: YearningIcon,
};

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
	const {
		observation,
		feelings,
		setFeelings,
		needs,
		setNeeds,
		settings,
		bodySensations,
		setBodySensations,
		openHelpTopic,
	} = useWizard();
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
				You don’t have to get this perfect. Just notice what’s there — you might find that{" "}
				<HelpLink topic="feelings">naming feelings</HelpLink> gives you information you didn’t realise you had.
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

			<DismissibleHint id="click-feelings-twice">
				HINT: Tap twice on any feeling that's especially strong.
			</DismissibleHint>

			<Checklist
				data={[FeelingsData.sections.feelings]}
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
				subcategoryIcons={FEELINGS_ICONS}
			/>

			<DismissibleHint id="feelings-extra-sections">HINT: Tap a section heading to open it.</DismissibleHint>

			<Checklist
				data={[FeelingsData.sections.story]}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				type="feelings"
				onItemClick={handleItemClick}
				onIndicatorClick={handleIndicatorClick}
				defaultCollapsed={["Story Words (optional)"]}
				categoryHelpIcons={{
					[FeelingsData.sections.story.ui.heading]: () => openHelpTopic("story-words"),
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
				defaultCollapsed={["Feelings when our needs are met"]}
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

export default Feelings;
