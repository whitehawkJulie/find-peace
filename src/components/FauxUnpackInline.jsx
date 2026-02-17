import React from "react";
import Pill from "./Pill";
import "./FauxUnpackInline.css";

const FauxUnpackInline = ({
	fauxItem,
	feelings,
	setFeelings,
	needs,
	setNeeds,
}) => {
	if (!fauxItem) return null;

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

	const hasFeelings = fauxItem.suggestedFeelings?.length > 0;
	const hasNeeds = fauxItem.suggestedNeeds?.length > 0;

	return (
		<div className="faux-unpack-inline">
			{fauxItem.thought && (
				<p className="faux-unpack-reframe">{fauxItem.thought}.</p>
			)}

			<p className="faux-unpack-bridge">
				{hasFeelings
					? "Let's find what's underneath — the feelings in your body, and the needs they're pointing to."
					: "Let's find the deeper needs underneath — the ones that are truly universal and alive in you."}
			</p>

			{fauxItem.suggestedFeelings?.length > 0 && (
				<div className="faux-unpack-section">
					<p className="faux-unpack-label">You might be feeling:</p>
					<div className="pill-grid">
						{fauxItem.suggestedFeelings.map((f, i) => (
							<Pill
								key={i}
								item={f}
								type="feeling"
								state={feelings[f] === "clicked" ? "clicked" : ""}
								onClick={() => toggleFeeling(f)}
							/>
						))}
					</div>
				</div>
			)}

			{fauxItem.suggestedNeeds?.length > 0 && (
				<div className="faux-unpack-section">
					<p className="faux-unpack-label">Needs that might be underneath:</p>
					<div className="pill-grid">
						{fauxItem.suggestedNeeds.map((n, i) => (
							<Pill
								key={i}
								item={n}
								type="need"
								state={needs[n] === "clicked" ? "clicked" : ""}
								onClick={() => toggleNeed(n)}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

export default FauxUnpackInline;
