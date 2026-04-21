import React, { useState, useEffect } from 'react';
import LoadingBar from '../components/LoadingBar';
import './CreatePage.css';

export default function CreatePage({ loading, onSave, editNote, onCancelEdit, onNavigate }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editNote) {
      setTitle(editNote.title);
      setDescription(editNote.description);
    } else {
      setTitle('');
      setDescription('');
    }
    setErrors({});
  }, [editNote]);

  const validate = () => {
    const e = {};
    if (!title.trim()) e.title = 'Title is required';
    if (!description.trim()) e.description = 'Description is required';
    return e;
  };

  const handleSubmit = async () => {
    const e = validate();
    if (Object.keys(e).length > 0) { setErrors(e); return; }
    const result = await onSave({ title: title.trim(), description: description.trim() });
    if (result.success) {
      setTitle('');
      setDescription('');
      setErrors({});
      onNavigate('notes');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setDescription('');
    setErrors({});
    onCancelEdit();
    onNavigate('notes');
  };

  return (
    <div className="create-page">
      <div className="create-panel">
        <h2>{editNote ? 'Edit Note' : 'New Note'}</h2>
        <LoadingBar visible={loading} />

        <div className="form-row">
          <label>Title</label>
          <input
            type="text"
            placeholder="Give your note a title…"
            value={title}
            onChange={(e) => { setTitle(e.target.value); setErrors((prev) => ({ ...prev, title: '' })); }}
            className={errors.title ? 'input-error' : ''}
          />
          {errors.title && <span className="field-error">{errors.title}</span>}
        </div>

        <div className="form-row">
          <label>Description</label>
          <textarea
            placeholder="Write your note here…"
            value={description}
            onChange={(e) => { setDescription(e.target.value); setErrors((prev) => ({ ...prev, description: '' })); }}
            className={errors.description ? 'input-error' : ''}
            rows={5}
          />
          {errors.description && <span className="field-error">{errors.description}</span>}
        </div>

        <div className="form-actions">
          <button className="btn-save" onClick={handleSubmit} disabled={loading}>
            {loading ? (editNote ? 'Updating…' : 'Saving…') : (editNote ? 'Update Note' : 'Save Note')}
          </button>
          <button className="btn-cancel" onClick={handleCancel} disabled={loading}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
