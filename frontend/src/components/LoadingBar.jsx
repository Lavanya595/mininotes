import React from 'react';
import './LoadingBar.css';

export default function LoadingBar({ visible }) {
  if (!visible) return null;
  return (
    <div className="loading-bar">
      <div className="loading-bar-inner" />
    </div>
  );
}
