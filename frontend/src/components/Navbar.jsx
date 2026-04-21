import React from 'react';
import './Navbar.css';

export default function Navbar({ currentPage, onNavigate }) {
  const pages = [
    { key: 'notes', label: 'All Notes' },
    { key: 'create', label: 'Create' },
    { key: 'search', label: 'Search' },
  ];

  return (
    <nav className="navbar">
      <button className="nav-brand" onClick={() => onNavigate('notes')}>
        MINI <span>Notes</span>
      </button>
      <div className="nav-links">
        {pages.map((p) => (
          <button
            key={p.key}
            className={'nav-btn' + (currentPage === p.key ? ' active' : '')}
            onClick={() => onNavigate(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>
    </nav>
  );
}
