import { useState, useCallback } from 'react';
import { notesApi } from '../utils/api';

export function useNotes() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNotes = useCallback(async (search = '') => {
    setLoading(true);
    setError(null);
    try {
      const res = await notesApi.getAll(search);
      setNotes(res.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const createNote = useCallback(async (data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await notesApi.create(data);
      setNotes((prev) => [res.data.data, ...prev]);
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const updateNote = useCallback(async (id, data) => {
    setLoading(true);
    setError(null);
    try {
      const res = await notesApi.update(id, data);
      setNotes((prev) => prev.map((n) => (n._id === id ? res.data.data : n)));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteNote = useCallback(async (id) => {
    setLoading(true);
    setError(null);
    try {
      await notesApi.delete(id);
      setNotes((prev) => prev.filter((n) => n._id !== id));
      return { success: true };
    } catch (err) {
      setError(err.message);
      return { success: false, message: err.message };
    } finally {
      setLoading(false);
    }
  }, []);

  return { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote };
}
