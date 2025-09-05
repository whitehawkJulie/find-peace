import React from 'react';
import './SavedEntries.css';

export default function SavedEntries({ entries }) {
  return (
    <div className="saved-entries">
      <h2>Saved Entries</h2>
      {entries.length === 0 ? (
        <p>No saved entries yet.</p>
      ) : (
        entries.map((entry, index) => (
          <div className="saved-card" key={index}>
            <p><strong>Observation:</strong> {entry.observation}</p>
            <p><strong>Feelings:</strong> {entry.feelings}</p>
            <p><strong>Needs:</strong> {entry.needs}</p>
            <p><strong>Request:</strong> {entry.request}</p>
          </div>
        ))
      )}
    </div>
  );
}