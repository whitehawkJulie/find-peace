import React, { useState } from "react";
import Checklist from "./Checklist";
import { feelingsData } from "./feelingsData";
import { useWizard } from "./WizardContext";
import SlideDrawer from "./SlideDrawer";
import UnpackPopup from "./UnpackPopup";

const Feelings = () => {
	const { observation, feelings, setFeelings, needs, setNeeds } = useWizard();
	const [showStoryHelp, setShowStoryHelp] = useState(false);
	const [popupItem, setPopupItem] = useState(null);

	// Called by Checklist before default selection
	const handleItemClick = (itemData) => {
		if (itemData.kind === "storyWord") {
			// Story word: open popup, do NOT add to selection yet
			setPopupItem(itemData);
			return false;
		}
		if (itemData.unpack && itemData.unpack.cardId) {
			// Murky feeling: DO add to selection (return true), then open popup
			setPopupItem(itemData);
			return true;
		}
		return true; // normal feeling — allow default selection
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

	// Look up unpack card data for murky feelings
	const unpackCard = popupItem?.unpack?.cardId
		? feelingsData.meta?.unpackCards?.[popupItem.unpack.cardId] || null
		: null;

	return (
		<div className="step-feelings">
			<p>
				How are you feeling now about <strong>{observation || "what happened"}</strong>?
			</p>

			<Checklist
				data={feelingsData}
				selectedItems={feelings}
				setSelectedItems={setFeelings}
				type="feelings"
				onItemClick={handleItemClick}
				categoryHelpIcons={{
					"Words that point to what happened": () => setShowStoryHelp(true),
				}}
			/>

			{popupItem && (
				<UnpackPopup
					itemData={popupItem}
					unpackCard={unpackCard}
					feelings={feelings}
					needs={needs}
					onToggleFeeling={toggleFeeling}
					onToggleNeed={toggleNeed}
					onKeepWord={handleKeepWord}
					onClose={() => setPopupItem(null)}
				/>
			)}

			<SlideDrawer isOpen={showStoryHelp} onClose={() => setShowStoryHelp(false)} title="About Story Words">
				<p>
					These are words that sound like feelings but actually point to what happened
					or what someone did — they carry a story or judgment about another person.
				</p>
				<p>
					Selecting one will help you unpack the real feelings and needs underneath.
				</p>
				<p><em>More detailed help text coming soon.</em></p>
			</SlideDrawer>
		</div>
	);
};

Feelings.title = "Feelings";
Feelings.helpContent = (
	<>
		<p>
			Feelings are the body's signal system. They tell us whether our needs are being met or
			not. When we can name what we're actually feeling, we open a doorway to understanding
			what we need.
		</p>

		<h4>Feelings vs. thoughts</h4>
		<p>
			In NVC, we distinguish between actual feelings (emotions and body sensations) and
			"story words" — words that sound like feelings but actually contain a judgment about
			what someone else did.
		</p>
		<ul>
			<li>
				<strong>"I feel abandoned"</strong> — this implies someone abandoned you. The
				feeling underneath might be <em>lonely, scared, or sad</em>.
			</li>
			<li>
				<strong>"I feel unheard"</strong> — this implies someone didn't listen. The feeling
				might be <em>frustrated, hurt, or disconnected</em>.
			</li>
			<li>
				<strong>"I feel attacked"</strong> — this implies someone attacked you. The feeling
				might be <em>frightened, tense, or angry</em>.
			</li>
		</ul>

		<h4>How to check</h4>
		<p>
			A real feeling makes sense after "I feel..." but not after "I feel <em>that</em>..." or
			"I feel <em>like</em>..." If you can say "I feel <em>that</em> you don't care," that's
			a thought, not a feeling.
		</p>

		<h4>Tips</h4>
		<ul>
			<li>
				<strong>Tap once</strong> for feelings that are present.{" "}
				<strong>Double-tap</strong> if a feeling is particularly strong — it helps to
				notice intensity.
			</li>
			<li>
				It's normal to have many feelings at once, even contradictory ones. Select as many
				as resonate.
			</li>
			<li>
				If you select a word that points more to what happened than how you feel,
				you'll get a chance to unpack the real feelings underneath.
			</li>
			<li>
				When in doubt, check your body. Feelings live in the body — tight chest, heavy
				stomach, clenched jaw. What word matches that sensation?
			</li>
		</ul>
	</>
);

export default Feelings;
