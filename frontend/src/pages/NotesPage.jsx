import React, { useEffect, useState } from 'react';
import NoteCard from '../components/NoteCard';
import LoadingBar from '../components/LoadingBar';
import './NotesPage.css';

export default function NotesPage({ notes, loading, onEdit, onDelete, onRefresh }) {
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    onRefresh();
  }, []);

  const handleDelete = async (id) => {
    setDeletingId(id);
    await onDelete(id);
    setDeletingId(null);
  };

  return (
    <div className="notes-page">
      <div className="notes-page-header">
        <h2>All Notes</h2>
        <span className="notes-count">{notes.length} {notes.length === 1 ? 'note' : 'notes'}</span>
      </div>

      <LoadingBar visible={loading} />

      {!loading && notes.length === 0 && (
        <div className="empty-state">
          <div className="empty-icon">📭</div>
          <p>No notes yet.</p>
          <p>Click <strong>Create</strong> in the navbar to write your first note.</p>
        </div>
      )}

      <div className="notes-grid">
        {notes.map((note, i) => (
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
    </div>
  );
}
