import React from "react";
import patriarchyNeedsData from "../data/PatriarchyNeedsData";
import { useWizard } from "./WizardContext";
import "./PatriarchyNeeds.css";

const PatriarchyNeeds = () => {
	const { needs, setNeeds } = useWizard();

	const toggleNeed = (needName) => {
		const newNeeds = { ...needs };
		if (newNeeds[needName]) {
			delete newNeeds[needName];
		} else {
			newNeeds[needName] = "clicked";
		}
		setNeeds(newNeeds);
	};

	return (
		<div className="patriarchy-needs">
			<p className="patriarchy-intro">
				Sometimes the words we reach for — like <em>control</em>, <em>safety</em>, or <em>approval</em> — feel
				like needs, but they're actually strategies shaped by the culture we grew up in. Underneath each one is
				a genuine, universal need. These come from Miki Kashtan.
				{/* TODO: ASK MIKI for permission to use these!! 
					AND add footnote:  Social Structures and Socialization, by Miki, Inbal and Arnina Kashtan, 
					link to https://thefearlessheart.org/item/social-structures-and-socialization-packet/ */}
			</p>
			<p className="patriarchy-intro">Tap a genuine need to add it to your selections. Tap again to remove it.</p>

			<div className="patriarchy-list">
				{patriarchyNeedsData.map(({ item, genuineNeeds, description }) => (
					<div key={item} className="patriarchy-item">
						<div className="patriarchy-label">{item}</div>
						<p className="patriarchy-description">{description}</p>
						<div className="genuine-needs-row">
							<span className="genuine-arrow">→</span>
							{genuineNeeds.map((need) => (
								<button
									key={need}
									className={`genuine-need-pill ${needs[need] ? "selected" : ""}`}
									onClick={() => toggleNeed(need)}>
									{need}
									{needs[need] && <span className="check-mark"> ✓</span>}
								</button>
							))}
						</div>
					</div>
				))}
			</div>

			<p className="patriarchy-attribution">
				Based on work by Miki Kashtan, <em>The Fearless Heart</em>.
			</p>
		</div>
	);
};

export default PatriarchyNeeds;
