import React from 'react';
import Checkbox from './Checkbox';
import '../styles/common.css';

export default function ListItem({ label, checked, onToggle, onDelete }) {
  return (
    <div className="list-item">
      <Checkbox checked={checked} onChange={onToggle} />
      <div className="list-item-label">{label}</div>
      {onDelete && (
        <button onClick={onDelete} className="list-item-delete-btn">
          –
        </button>
      )}
    </div>
  );
}


