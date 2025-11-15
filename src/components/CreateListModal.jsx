import React, { useState } from 'react';
import Modal from './Modal';
import '../styles/common.css';

export default function CreateListModal({ isOpen, onClose, onCreate }) {
  const [listName, setListName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = listName.trim();
    if (!trimmed) return;
    onCreate(trimmed);
    setListName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create List">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Enter list name"
          className="input"
          autoFocus
        />
        <div className="modal-buttons">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}

