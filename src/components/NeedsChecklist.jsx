import React, { useState, useEffect } from "react";
import "./NeedsChecklist.css";

const needsData = {
	"Subsistence and Security": {
		"Physical sustenance": [
			"Air",
			"Food",
			"Health",
			"Movement",
			"Physical Safety",
			"Rest / sleep",
			"Shelter",
			"Touch",
			"Water",
		],
		Security: [
			"Security",
			"Consistency",
			"Order/Structure",
			"Peace (external)",
			"Peace of mind",
			"Protection",
			"Safety (emotional)",
			"Stability",
			"Trusting",
		],
	},
	Connection: {
		Affection: [
			"Affection",
			"Appreciation",
			"Attention",
			"Closeness",
			"Companionship",
			"Harmony",
			"Intimacy",
			"Love",
			"Nurturing",
			"Sexual expression",
			"Support",
			"Tenderness",
			"Warmth",
		],
		"To matter": [
			"To matter",
			"Acceptance",
			"Care",
			"Compassion",
			"Consideration",
			"Empathy",
			"Respect",
			"To be heard, seen",
			"To be known, understood",
			"To be trusted",
			"Understanding others",
			"Mutual Recognition",
			"Kindness",
		],
		Community: [
			"Community",
			"Belonging",
			"Communication",
			"Cooperation",
			"Equality",
			"Inclusion",
			"Mutuality",
			"Participation",
			"Partnership",
			"Self-expression",
			"Sharing",
		],
	},
	Meaning: {
		"Sense of self": [
			"Authenticity",
			"Competence",
			"Creativity",
			"Dignity",
			"Growth",
			"Healing",
			"Honesty",
			"Integrity",
			"Self-acceptance",
			"Self-care",
			"Self-connection",
			"Self-knowledge",
			"Self-realizatioin",
			"Mattering to myself",
		],
		Understanding: [
			"Understanding",
			"Awareness",
			"Clarity",
			"Discovery",
			"Learning",
			"Making sense of life",
			"Stimulation",
		],
		Meaning: [
			"Meaning",
			"Challenge",
			"Aliveness",
			"Consciousness",
			"Contribution",
			"Creativity",
			"Effectiveness",
			"Exploration",
			"Integration",
			"Purpose",
		],
		Transcendence: [
			"Beauty",
			"Celebration of life",
			"Communion",
			"Faith",
			"Flow",
			"Hope",
			"Inspiration",
			"Mourning",
			"Peace (internal)",
			"Presence",
		],
	},
	Freedom: {
		Autonomy: ["Autonomy", "Choice", "Ease", "Independence", "Power", "Self-responsiblity", "Space", "Spontaneity"],
		"Leisure/Relaxation": ["Humour", "Joy", "Play", "Pleasure", "Rejuvenation"],
	},
};

const NeedsChecklist = ({ selectedNeeds, setSelectedNeeds }) => {
	const [collapsed, setCollapsed] = useState({});

	useEffect(() => {
		const initialState = {};
		Object.keys(needsData).forEach((cat) => {
			// Don't track collapse for category — they're always open
			Object.keys(needsData[cat]).forEach((sub) => {
				initialState[`${cat}-${sub}`] = false; // collapsed
			});
		});
		setCollapsed(initialState);
	}, []);

	const toggleCollapse = (key) => {
		setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));
	};

	const toggleNeed = (need) => {
		setSelectedNeeds((prev) => (prev.includes(need) ? prev.filter((n) => n !== need) : [...prev, need]));
	};

	return (
		<div className="needs-checklist">
			{Object.entries(needsData).map(([category, subs]) => (
				<div key={category} className="needs-category">
					<h2 className="category-title">{category}</h2>

					{Object.entries(subs).map(([sub, needs]) => (
						<div key={sub} className="needs-subcategory">
							<h3 className="subcategory-title">{sub}</h3>
							<div className="pill-container">
								{needs.map((need) => (
									<button
										key={need}
										className={`pill ${selectedNeeds.includes(need) ? "selected" : ""}`}
										onClick={() => toggleNeed(need)}
										type="button">
										{need}
									</button>
								))}
							</div>
						</div>
					))}
				</div>
			))}
		</div>
	);
};

export default NeedsChecklist;
