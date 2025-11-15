import React from 'react';
import Modal from './Modal';
import '../styles/common.css';

export default function ConfirmModal({ isOpen, onClose, onConfirm, title, message, confirmText = 'Confirm', cancelText = 'Cancel', danger = false }) {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="modal-message">{message}</div>
      <div className="modal-buttons">
        <button type="button" onClick={onClose} className="btn btn-secondary">
          {cancelText}
        </button>
        <button type="button" onClick={handleConfirm} className={`btn ${danger ? 'btn-danger' : 'btn-primary'}`}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}

