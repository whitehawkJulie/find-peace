import React from 'react';
import './StepFeelings.css';

export default function StepFeelings({ feelings, onChange, openDrawer }) {
  return (
    <>
      <h2>Step 2: Feelings</h2>
      <label htmlFor="feelings">How did you feel?</label>
      <textarea
        id="feelings"
        rows={4}
        value={feelings}
        onChange={(e) => onChange(e.target.value)}
        placeholder="e.g. Hurt, anxious, relieved..."
      />
      <button className="list-button" onClick={openDrawer}>Choose from list</button>
    </>
  );
}