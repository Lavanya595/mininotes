import React from 'react';
import './NoteCard.css';

const DOTS = ['#e85d26', '#1d6fa5', '#2d8a5e', '#6b4fa0', '#f5a623'];

export default function NoteCard({ note, index, onEdit, onDelete, deleting }) {
  const dot = DOTS[index % DOTS.length];

  const formatDate = (iso) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className={'note-card' + (deleting ? ' deleting' : '')}>
      <div className="note-dot" style={{ background: dot }} />
      <div className="note-title">{note.title}</div>
      <div className="note-desc">{note.description}</div>
      <div className="note-date">{formatDate(note.createdAt)}</div>
      <div className="note-actions">
        <button className="btn-edit" onClick={() => onEdit(note)} disabled={deleting}>
          Edit
        </button>
        <button className="btn-delete" onClick={() => onDelete(note._id)} disabled={deleting}>
          {deleting ? 'Deleting…' : 'Delete'}
        </button>
      </div>
    </div>
  );
}
