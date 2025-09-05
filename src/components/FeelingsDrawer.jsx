import React from 'react';
import './FeelingsDrawer.css';

const feelingsList = ['Angry', 'Sad', 'Anxious', 'Hopeful', 'Relieved'];

export default function FeelingsDrawer({ onClose, onSelect }) {
  return (
    <div className="slide-panel show">
      <h3>Select Feelings</h3>
      <ul className="feeling-list">
        {feelingsList.map((feeling) => (
          <li key={feeling}>
            <button onClick={() => { onSelect(feeling); onClose(); }}>{feeling}</button>
          </li>
        ))}
      </ul>
      <button onClick={onClose}>Close</button>
    </div>
  );
}