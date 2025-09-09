// Observation.jsx

import { useWizard } from "./WizardContext";

const Observation = () => {
	const { observation, setObservation } = useWizard();
	return (
		<textarea
			value={observation}
			onChange={(e) => setObservation(e.target.value)}
			rows={6}
			placeholder="What did you observe?"
		/>
	);
};

Observation.title = "Observation";
Observation.helpContent = (
	<>
		<p>Stick to what a camera would see or hear — no judgments or interpretations.</p>
		<p>Examples:</p>
		<ul>
			<li>"You walked away while I was speaking."</li>
			<li>"You said, 'That's a stupid idea.'"</li>
		</ul>
	</>
);

export default Observation;
