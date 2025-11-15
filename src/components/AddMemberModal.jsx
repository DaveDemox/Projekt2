import React, { useState } from 'react';
import Modal from './Modal';
import { MOCK_USERS, CURRENT_USER_ID } from '../constants/mockData';
import '../styles/common.css';

export default function AddMemberModal({ isOpen, onClose, onAdd, existingMemberIds = [] }) {
  const [selectedUserId, setSelectedUserId] = useState('');

  // Get available users (exclude current user and existing members)
  const availableUsers = Object.values(MOCK_USERS).filter(
    (user) => user.id !== CURRENT_USER_ID && !existingMemberIds.includes(user.id)
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedUserId) return;
    onAdd(Number(selectedUserId));
    setSelectedUserId('');
    onClose();
  };

  if (availableUsers.length === 0) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Add Member">
        <p className="modal-message">No available users to add.</p>
        <div className="modal-buttons">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Close
          </button>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add Member">
      <form onSubmit={handleSubmit}>
        <select
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="select"
          required
        >
          <option value="">Select a user...</option>
          {availableUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.initials})
            </option>
          ))}
        </select>
        <div className="modal-buttons">
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
          <button type="submit" className="btn btn-primary" disabled={!selectedUserId}>
            Add
          </button>
        </div>
      </form>
    </Modal>
  );
}

