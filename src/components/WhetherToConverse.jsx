import React from "react";
import { useContent } from "../content/useContent";

const WhetherToConverse = () => {
	const { t } = useContent();

	return (
		<div>
			{t("whether.purpose") && <p className="step-purpose">{t("whether.purpose")}</p>}

			<p>{t("whether.worthwhile")}</p>
			<ul>
				<li>{t("whether.check1")}</li>
				<li>{t("whether.check2")}</li>
				<li>{t("whether.check3")}</li>
				<li>{t("whether.check4")}</li>
				<li>{t("whether.check5")}</li>
			</ul>
			<p>{t("whether.dontGiveUp")}</p>
		</div>
	);
};

export default WhetherToConverse;
