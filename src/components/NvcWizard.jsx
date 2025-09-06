import React, { useState } from "react";
import StepObservation from "./StepObservation";
import StepFeelings from "./StepFeelings";
import Needs from "./Needs";
import StepRequest from "./StepRequest";
import SavedEntries from "./SavedEntries";
import { TopMenuBar, BottomMenuBar } from "./MenuBarComponents";

export default function NvcWizard() {
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState({
		observation: "",
		feelings: [],
		needs: [],
		request: "",
	});
	const [needs, setNeeds] = useState([]);
	const [showNeedsDrawer, setShowNeedsDrawer] = useState(false);

	const [savedEntries, setSavedEntries] = useState(() => {
		const stored = localStorage.getItem("nvcEntries");
		return stored ? JSON.parse(stored) : [];
	});

	const [viewingPast, setViewingPast] = useState(false);
	const [showObservationHelp, setShowObservationHelp] = useState(false);

	const saveFieldData = (field, value) => {
		setFormData({ ...formData, [field]: value });
	};

	const saveEntry = () => {
		const newEntry = { ...formData, timestamp: new Date().toISOString() };
		const updated = [...savedEntries, newEntry];
		setSavedEntries(updated);
		localStorage.setItem("nvcEntries", JSON.stringify(updated));
	};

	const goToStep = (n) => {
		setStep((prev) => Math.max(0, Math.min(3, prev + n)));
	};

	const startNew = () => {
		setFormData({ observation: "", feelings: [], needs: [], request: "" });
		setStep(0);
		setViewingPast(false);
	};

	return (
		<div className="nvc-wizard">
			{/* <TopMenuBar onNew={startNew} onViewPast={() => setViewingPast(true)} /> */}

			{!viewingPast ? (
				<>
					{step === 0 && (
						<StepObservation
							observation={formData.observation}
							onChange={(value) => saveFieldData("observation", value)}
							showHelp={showObservationHelp}
							toggleHelp={() => setShowObservationHelp(!showObservationHelp)}
						/>
					)}
					{step === 1 && (
						<StepFeelings
							feelings={formData.feelings}
							onChange={(value) => saveFieldData("feelings", value)}
						/>
					)}
					{step === 2 && (
						// <StepNeeds needs={formData.needs} onChange={(value) => saveFieldData("needs", value)} />

						<Needs
							needs={needs}
							setNeeds={setNeeds}
							showDrawer={showNeedsDrawer}
							setShowDrawer={setShowNeedsDrawer}
						/>
					)}
					{step === 3 && (
						<StepRequest request={formData.request} onChange={(value) => saveFieldData("request", value)} />
					)}

					<BottomMenuBar
						onPrevious={() => goToStep(-1)}
						onNext={() => goToStep(1)}
						onSave={saveEntry}
						disablePrevious={step === 0}
						disableNext={step === 3}
						disableSave={step !== 3}
					/>
				</>
			) : (
				<SavedEntries entries={savedEntries} />
			)}
		</div>
	);
}
