import React, { useEffect, lazy, Suspense } from "react";
import NvcWizard from "./components/NvcWizard";
import { WizardProvider } from "./components/WizardContext";
import "./App.css";

const NeedsAuditPage = lazy(() => import("./dev/NeedsAuditPage.jsx"));
const showAudit = import.meta.env.DEV && new URLSearchParams(window.location.search).has("audit");

const App = () => {
	// tiny call to track App usage!! results in file visits.txt on the server.
	useEffect(() => {
		fetch("/visit.php");
	}, []);

	if (showAudit)
		return (
			<Suspense fallback={null}>
				<NeedsAuditPage />
			</Suspense>
		);
	return (
		<WizardProvider>
			<NvcWizard />
		</WizardProvider>
	);
};

export default App;
