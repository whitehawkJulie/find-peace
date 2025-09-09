import React from "react";
import NvcWizard from "./components/NvcWizard";
import { WizardProvider } from "./components/WizardContext";
import "./App.css";

const App = () => {
	return (
		<WizardProvider>
			<NvcWizard />
		</WizardProvider>
	);
};

export default App;
