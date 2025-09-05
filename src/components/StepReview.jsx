import React from 'react';

export default function StepReview({ data, onSave }) {
  return (
    <>
      <h2>Review your entry</h2>
      <p><strong>Observation:</strong> {data.observation}</p>
      <p><strong>Feelings:</strong> {data.feelings}</p>
      <p><strong>Needs:</strong> {data.needs}</p>
      <p><strong>Request:</strong> {data.request}</p>
      <button onClick={onSave}>Save Entry</button>
    </>
  );
}