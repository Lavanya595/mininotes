import React, { useState } from 'react';
import NoteCard from '../components/NoteCard';
import LoadingBar from '../components/LoadingBar';
import './SearchPage.css';

export default function SearchPage({ notes, loading, onEdit, onDelete, onSearch }) {
  const [query, setQuery] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    onSearch(val);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  const filtered = query.trim()
    ? notes.filter((n) => n.title.toLowerCase().startsWith(query.trim().toLowerCase()))
    : [];

  return (
    <div className="search-page">
      <div className="search-header">
        <h2>Search Notes</h2>
      </div>

      <div className="search-box">
        <span className="search-icon">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          type="text"
          placeholder="Search by title… type 'd' to see notes starting with d"
          value={query}
          onChange={handleChange}
          autoFocus
        />
        {query && (
          <button className="search-clear" onClick={() => { setQuery(''); onSearch(''); }}>✕</button>
        )}
      </div>

      <LoadingBar visible={loading} />

      {!query.trim() && (
        <div className="search-empty">
          <div className="empty-icon">🔍</div>
          <p>Start typing to search your notes by title.</p>
        </div>
      )}

      {query.trim() && filtered.length === 0 && !loading && (
        <div className="search-empty">
          <div className="empty-icon">😕</div>
          <p>No notes found for <strong>"{query}"</strong></p>
        </div>
      )}

      {query.trim() && filtered.length > 0 && (
        <>
          <p className="search-results-label">
            {filtered.length} result{filtered.length !== 1 ? 's' : ''} for <strong>"{query}"</strong>
          </p>
          <div className="notes-grid">
            {filtered.map((note, i) => (
              <NoteCard
                key={note._id}
                note={note}
                index={i}
                onEdit={onEdit}
                onDelete={handleDelete}
                deleting={deletingId === note._id}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
