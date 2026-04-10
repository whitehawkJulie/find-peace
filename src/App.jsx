import React, { useEffect, lazy, Suspense } from "react";
import NvcWizard from "./components/NvcWizard";
import { WizardProvider } from "./components/WizardContext";
import "./App.css";

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
		<WizardProvider>
			<NvcWizard />
		</WizardProvider>
	);
};

export default App;
