import React from "react";
import { useContent } from "../content/useContent";

const Grief = () => {
	const { t } = useContent();

	return (
		<div className="step-container">
			<p>{t("grief.stuck")}</p>
			{t("grief.purpose") && <p className="step-purpose">{t("grief.purpose")}</p>}

			<p>{t("grief.firstQuestion")}</p>
			<p>{t("grief.firstQuestionBody")}</p>
			<p>{t("grief.onceYouStop")}</p>
			<p>{t("grief.deeper")}</p>

			<h3>{t("grief.percolateHeading")}</h3>
			<p>{t("grief.percolate1")}</p>
			<p>{t("grief.percolate2")}</p>

			<h3>{t("grief.giveHeading")}</h3>
			<p>{t("grief.give1")}</p>
			<p>{t("grief.give2")}</p>

			<p>{t("grief.stillStuck")}</p>
			<p>
				<strong>{t("grief.cantSeeStrong")}</strong>
			</p>
			<p>{t("grief.honour")}</p>
		</div>
	);
};

Grief.titleKey = "grief.title";
Grief.title = "Grief";

Grief.helpContent = (
	<>
		<h2>Grief about unmet needs</h2>

		<section>
			<h3>When the pain goes deeper</h3>
			<p>
				Sometimes identifying a need brings up grief — not just about this situation, but about how long this
				need has gone unmet, or how little hope there seems to be.
			</p>
			<p>This kind of grief is real and worth acknowledging. It doesn't mean nothing can change.</p>
		</section>

		<section>
			<h3>Strategies vs needs</h3>
			<p>Our minds often fix on one particular way to get a need met — one person, one situation, one outcome.</p>
			<p>When that strategy feels impossible, it can feel like the need itself is impossible.</p>
			<p>But needs are almost always meet-able — it's strategies that get stuck.</p>
		</section>

		<section>
			<h3>Sitting with it</h3>
			<p>
				Sometimes the most helpful thing is simply to let yourself feel the weight of the unmet need without
				rushing to fix it.
			</p>
			<p>This takes courage. And it often shifts things in ways that striving to fix them doesn't.</p>
		</section>
	</>
);

export default Grief;
