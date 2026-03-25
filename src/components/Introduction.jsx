import React from "react";
import { useContent } from "../content/useContent";
import { introductionFeelingList, introductionFourSteps, introductionHelpContent } from "../content/introduction.jsx";
import "./Introduction.css";

const Introduction = () => {
	const { t } = useContent();

	return (
		<div className="step-introduction step-container">
			<p>{t("introduction.feelingListIntro")}</p>
			<ul>
				{introductionFeelingList.map((item, i) => (
					<li key={i}>{item}</li>
				))}
			</ul>
			<p>{t("introduction.feelingListOutro")}</p>

			<p>{t("introduction.fourThingsIntro")}</p>
			<ol>
				{introductionFourSteps.map((step, i) => (
					<li key={i}>{step}</li>
				))}
			</ol>

			<p>{t("introduction.brainCircuits")}</p>
			<p>{t("introduction.thingsShift")}</p>
		</div>
	);
};

Introduction.titleKey = "introduction.title";
Introduction.title = "Feel Better";
Introduction.helpContent = introductionHelpContent;

export default Introduction;
