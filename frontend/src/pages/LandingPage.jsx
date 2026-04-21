import React from 'react';
import './LandingPage.css';

export default function LandingPage({ onEnter }) {
  return (
    <div className="landing">
      <div className="land-bg">
        <span>📝</span>
        <span>✏️</span>
        <span>📋</span>
        <span>🗒️</span>
        <span>📌</span>
      </div>
      <div className="land-content">
        <div className="land-badge">Your Personal Notepad</div>
        <h1 className="land-title">
          MINI<br /><span>Notes</span>
        </h1>
        <p className="land-sub">
          Write it down. Find it fast. A clean, minimal notes app for every thought worth keeping.
        </p>
        <button className="land-btn" onClick={onEnter}>
          Start Writing →
        </button>
        <div className="land-features">
          {['Create', 'Read', 'Update', 'Delete', 'Search'].map((f) => (
            <div className="land-feat" key={f}>✓ {f}</div>
          ))}
        </div>
      </div>
    </div>
  );
}
