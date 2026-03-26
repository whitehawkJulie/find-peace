import React from "react";
import { useWizard } from "./WizardContext";
import { useContent } from "../content/useContent";

const SimpleRequest = () => {
	const { simpleRequest, setSimpleRequest } = useWizard();
	const { t } = useContent();

	return (
		<div>
			{t("simpleRequest.purpose") && <p className="step-purpose">{t("simpleRequest.purpose")}</p>}

			<p>{t("simpleRequest.intro1")}</p>
			<p>{t("simpleRequest.intro2")}</p>
			<p>{t("simpleRequest.tipsIntro")}</p>

			<ul>
				<li>
					<strong>{t("simpleRequest.tip1Heading")}</strong> {t("simpleRequest.tip1")}
				</li>
				<li>
					<strong>{t("simpleRequest.tip2Heading")}</strong> {t("simpleRequest.tip2")}
				</li>
				<li>
					<strong>{t("simpleRequest.tip3Heading")}</strong> {t("simpleRequest.tip3")}
				</li>
				<li>
					<strong>{t("simpleRequest.tip4Heading")}</strong> {t("simpleRequest.tip4")}
				</li>
				<li>
					<strong>{t("simpleRequest.tip5Heading")}</strong> {t("simpleRequest.tip5")}
				</li>
			</ul>

			<p>{t("simpleRequest.outro")}</p>

			<div className="collab-input-group">
				<label className="collab-input-label">{t("simpleRequest.requestLabel")}</label>
				<textarea
					className="collab-textarea"
					placeholder={t("simpleRequest.requestPlaceholder")}
					value={simpleRequest}
					onChange={(e) => setSimpleRequest(e.target.value)}
					rows={3}
				/>
			</div>
		</div>
	);
};

export default SimpleRequest;
