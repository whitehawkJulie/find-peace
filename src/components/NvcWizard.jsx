import React, { useState } from "react";
import Observation from "./Observation";
import Feelings from "./Feelings";
import Needs from "./Needs";
import NeedsMet from "./NeedsMet";
import NeedsUnmet from "./NeedsUnmet";
import Request from "./Request";
import "./NvcWizard.css";

const NVCWizard = () => {
	const [stepIndex, setStepIndex] = useState(0);

	const [observation, setObservation] = useState("");
	const [feelings, setFeelings] = useState({});
	const [needs, setNeeds] = useState({});
	const [request, setRequest] = useState("");

	const hasMetNeeds = Object.values(needs).includes("met");

	const steps = [
		<Observation observation={observation} setObservation={setObservation} />,
		<Feelings feelings={feelings} setFeelings={setFeelings} />,

		<Needs needs={needs} setNeeds={setNeeds} feelings={feelings} />,
		...(hasMetNeeds ? [<NeedsMet needs={needs} />] : []),
		<NeedsUnmet needs={needs} />,
		<Request request={request} setRequest={setRequest} />,
	];

	const currentStep = steps[stepIndex];

	return (
		<div className="nvc-wizard">
			<div className="card">{currentStep}</div>

			<div className="menu-bar">
				<button onClick={() => setStepIndex((i) => Math.max(i - 1, 0))} disabled={stepIndex === 0}>
					Previous
				</button>
				<button
					onClick={() => setStepIndex((i) => Math.min(i + 1, steps.length - 1))}
					disabled={stepIndex === steps.length - 1}>
					Next
				</button>
			</div>
		</div>
	);
};

export default NVCWizard;
