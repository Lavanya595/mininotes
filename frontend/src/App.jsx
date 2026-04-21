import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import NotesPage from './pages/NotesPage';
import CreatePage from './pages/CreatePage';
import SearchPage from './pages/SearchPage';
import { ToastContainer, useToast } from './components/Toast';
import { useNotes } from './hooks/useNotes';

export default function App() {
  const [started, setStarted] = useState(false);
  const [page, setPage] = useState('notes');
  const [editNote, setEditNote] = useState(null);
  const { notes, loading, fetchNotes, createNote, updateNote, deleteNote } = useNotes();
  const { toasts, show: showToast } = useToast();

  const handleNavigate = (target) => {
    if (target !== 'create') setEditNote(null);
    setPage(target);
  };

  const handleEdit = (note) => {
    setEditNote(note);
    setPage('create');
  };

  const handleSave = async (data) => {
    if (editNote) {
      const result = await updateNote(editNote._id, data);
      if (result.success) {
        showToast('Note updated!', 'success');
        setEditNote(null);
      } else {
        showToast(result.message || 'Failed to update', 'error');
      }
      return result;
    } else {
      const result = await createNote(data);
      if (result.success) {
        showToast('Note saved!', 'success');
      } else {
        showToast(result.message || 'Failed to save', 'error');
      }
      return result;
    }
  };

  const handleDelete = async (id) => {
    const result = await deleteNote(id);
    if (result.success) {
      showToast('Note deleted', 'success');
    } else {
      showToast(result.message || 'Failed to delete', 'error');
    }
    return result;
  };

  const handleCancelEdit = () => {
    setEditNote(null);
  };

  if (!started) {
    return (
      <>
        <LandingPage onEnter={() => { setStarted(true); fetchNotes(); }} />
        <ToastContainer toasts={toasts} />
      </>
    );
  }

  return (
    <>
      <Navbar currentPage={page} onNavigate={handleNavigate} />

      {page === 'notes' && (
        <NotesPage
          notes={notes}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onRefresh={fetchNotes}
        />
      )}

      {page === 'create' && (
        <CreatePage
          loading={loading}
          onSave={handleSave}
          editNote={editNote}
          onCancelEdit={handleCancelEdit}
          onNavigate={handleNavigate}
        />
      )}

      {page === 'search' && (
        <SearchPage
          notes={notes}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onSearch={(q) => fetchNotes(q)}
        />
      )}

      <ToastContainer toasts={toasts} />
    </>
  );
}
