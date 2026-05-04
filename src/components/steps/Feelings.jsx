import React, { useState } from "react";
import Checklist from "../Checklist";
import { AllFeelingsData as FeelingsData } from "../../data/AllFeelingsData";
import { feelingsMetSet } from "../../data/FeelingsMet";
import { useWizard } from "../WizardContext";
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
		feelingsMetShown,
		setFeelingsMetShown,
	} = useWizard();
	const [showBodySensations, setShowBodySensations] = useState(false);
	const [popupItem, setPopupItem] = useState(null);
	const [showFeelingsMet, setShowFeelingsMet] = useState(
		() => feelingsMetShown || Object.keys(feelings).some((f) => feelingsMetSet.has(f)),
	);

	// Called by Checklist before default selection
	const handleItemClick = (itemData) => {
		if (itemData.type === "storyWord") {
			if (feelings[itemData.item]) {
				// Already selected — deselect, no popup
				setFeelings((prev) => {
					const updated = { ...prev };
					delete updated[itemData.item];
					return updated;
				});
			} else {
				// Select immediately, then open popup to explore
				setFeelings((prev) => ({ ...prev, [itemData.item]: "clicked" }));
				setPopupItem(itemData);
			}
			return false;
		}
		return true; // normal feeling — allow default selection
	};

	// Chevron click on a selected murky feeling: reopen clarify popup
	const handleIndicatorClick = (itemData) => {
		setPopupItem(itemData);
	};

	// Toggle a suggested feeling from popup — cycles unselected → clicked → double-clicked → unselected
	const toggleFeeling = (name) => {
		setFeelings((prev) => {
			const updated = { ...prev };
			if (updated[name] === "double-clicked") {
				delete updated[name];
			} else if (updated[name] === "clicked") {
				updated[name] = "double-clicked";
			} else {
				updated[name] = "clicked";
			}
			return updated;
		});
	};

	// Toggle a suggested need from popup — cycles unselected → clicked → double-clicked → unselected
	const toggleNeed = (name) => {
		setNeeds((prev) => {
			const updated = { ...prev };
			if (updated[name] === "double-clicked") {
				delete updated[name];
			} else if (updated[name] === "clicked") {
				updated[name] = "double-clicked";
			} else {
				updated[name] = "clicked";
			}
			return updated;
		});
	};

	return (
		<div className="step-feelings step-container">
			<p>Now we're going to explore how you felt when that happened, or how you're still feeling about it now.</p>
			<p>
				You don’t have to get this perfect. Just notice what’s there — you might find that{" "}
				<HelpLink topic="feelings">naming feelings</HelpLink> gives you information you didn’t realise you had.
			</p>

			<div className="feelings-return-prompt">
				<span className="feelings-return-arrow">↩</span>
				<div>
					<strong>Return to that moment now.</strong>
					<div className="feelings-return-questions">
						<span>What do you notice inside you?</span>
						<span>
							Where do you feel it in your body?{" "}
							<button className="feelings-body-sens-link" onClick={() => setShowBodySensations(true)}>
								{"Not sure? →"}
							</button>
						</span>
						<span>What feelings are there?</span>
					</div>
				</div>
			</div>

			<DismissibleHint id="feelings-hint">
				As you read through, you might notice lots of these fit. When you choose, try picking the words that
				feel like the best match, rather than selecting multiple similar ones.
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
				selectionHint={
					<DismissibleHint id="click-feelings-twice">
						HINT: Tap a second time on any feeling that’s especially strong.
					</DismissibleHint>
				}
				subcategoryIcons={FEELINGS_ICONS}
			/>

			{!showFeelingsMet ? (
				<div className="feelings-met-prompt">
					<p>
						It can be helpful to notice if there are any feelings of relief, calm, or hope in the mix too.
						Would you like to choose some?
					</p>
					<button className="feelings-met-yes-btn" onClick={() => { setShowFeelingsMet(true); setFeelingsMetShown(true); }}>
						Yes, show me
					</button>
				</div>
			) : (
				<Checklist
					data={[FeelingsData.sections.feelingsMet]}
					selectedItems={feelings}
					setSelectedItems={setFeelings}
					type="feelings"
					onIndicatorClick={handleIndicatorClick}
					showListModeToggle
					defaultListMode="quick"
				/>
			)}

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
				headerContent={
					<DismissibleHint id="story-words-popup-hint">
						Story Words are thoughts that imply a lot of feelings. Tapping any word will open a popup to
						explore the feelings and needs that might be underneath it.
					</DismissibleHint>
				}
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
					onClose={() => setPopupItem(null)}
				/>
			)}

		</div>
	);
};

Feelings.title = "What am I feeling?";
Feelings.titleSweary = "Fuck them, what's going on in ME?";
Feelings.navTitle = "What am I feeling?";

export default Feelings;
