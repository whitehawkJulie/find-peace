import React, { lazy, Suspense } from "react";
import NvcWizard from "./components/NvcWizard";
import { WizardProvider } from "./components/WizardContext";
import "./App.css";

const NeedsAuditPage = lazy(() => import("./dev/NeedsAuditPage.jsx"));
const showAudit = import.meta.env.DEV && new URLSearchParams(window.location.search).has("audit");

const App = () => {
	if (showAudit) return <Suspense fallback={null}><NeedsAuditPage /></Suspense>;
	return (
		<WizardProvider>
			<NvcWizard />
		</WizardProvider>
	);
};

export default App;
