import React, { useEffect, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import NvcWizard from "./components/NvcWizard";
import { WizardProvider } from "./components/WizardContext";
import { GratitudeProvider } from "./gratitude/GratitudeContext";
import GratitudeWizard from "./gratitude/GratitudeWizard";
import FeelingsApp from "./miniapps/FeelingsApp";
import NeedsApp from "./miniapps/NeedsApp";
import "./App.css";
import "./styles/dyslexia-font.css";

const AuditShell = import.meta.env.DEV ? lazy(() => import("./dev/AuditShell.jsx")) : null;
const showAudit = import.meta.env.DEV && new URLSearchParams(window.location.search).has("audit");

const App = () => {

	if (showAudit)
		return (
			<Suspense fallback={null}>
				<AuditShell />
			</Suspense>
		);

	return (
		<Routes>
			<Route path="/feelings" element={<FeelingsApp />} />
			<Route path="/needs" element={<NeedsApp />} />
			<Route
				path="/gratitude"
				element={
					<GratitudeProvider>
						<GratitudeWizard />
					</GratitudeProvider>
				}
			/>
			<Route
				path="*"
				element={
					<WizardProvider>
						<NvcWizard />
					</WizardProvider>
				}
			/>
		</Routes>
	);
};

export default App;
