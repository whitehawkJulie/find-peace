import React, { useState } from 'react';
import StepObservation from './StepObservation';
import StepFeelings from './StepFeelings';
import StepNeeds from './StepNeeds';
import StepRequest from './StepRequest';
import SavedEntries from './SavedEntries';

export default function NvcWizard() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    observation: '',
    feelings: [],
    needs: [],
    request: '',
  });
  const [savedEntries, setSavedEntries] = useState(() => {
    const stored = localStorage.getItem('nvcEntries');
    return stored ? JSON.parse(stored) : [];
  });
  const [viewingPast, setViewingPast] = useState(false);
  const [showObservationHelp, setShowObservationHelp] = useState(false);

  const handleFieldChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const saveEntry = () => {
    const newEntry = { ...formData, timestamp: new Date().toISOString() };
    const updated = [...savedEntries, newEntry];
    setSavedEntries(updated);
    localStorage.setItem('nvcEntries', JSON.stringify(updated));
  };

  const goToStep = (n) => {
    setStep((prev) => Math.max(0, Math.min(3, prev + n)));
  };

  const startNew = () => {
    setFormData({ observation: '', feelings: [], needs: [], request: '' });
    setStep(0);
    setViewingPast(false);
  };

  return (
    <div className="nvc-wizard">
      <div className="menu-bar top">
        <button onClick={startNew}>New</button>
        <button onClick={() => setViewingPast(true)}>Past</button>
      </div>

      {!viewingPast ? (
        <div className="step-container">
          {step === 0 && (
            <StepObservation
              observation={formData.observation}
              onChange={(value) => handleFieldChange('observation', value)}
              showHelp={showObservationHelp}
              toggleHelp={() => setShowObservationHelp(!showObservationHelp)}
            />
          )}
          {step === 1 && (
            <StepFeelings
              feelings={formData.feelings}
              onChange={(value) => handleFieldChange('feelings', value)}
            />
          )}
          {step === 2 && (
            <StepNeeds
              needs={formData.needs}
              onChange={(value) => handleFieldChange('needs', value)}
            />
          )}
          {step === 3 && (
            <StepRequest
              request={formData.request}
              onChange={(value) => handleFieldChange('request', value)}
            />
          )}

          <div className="menu-bar bottom">
            <button onClick={() => goToStep(-1)} disabled={step === 0}>
              Previous
            </button>
            <button onClick={() => goToStep(1)} disabled={step === 3}>
              Next
            </button>
            <button onClick={saveEntry} disabled={step !== 3}>
              Save
            </button>
          </div>
        </div>
      ) : (
        <SavedEntries entries={savedEntries} />
      )}
    </div>
  );
}