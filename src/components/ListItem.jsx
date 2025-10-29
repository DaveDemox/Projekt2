import React from 'react';
import Checkbox from './Checkbox';

export default function ListItem({ label, checked, onToggle, onDelete }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', padding: '14px 20px' }}>
      <Checkbox checked={checked} onChange={onToggle} />
      <div style={{ marginLeft: 14, fontSize: 22, flex: 1 }}>{label}</div>
      <button
        onClick={onDelete}
        style={{
          width: 24,
          height: 24,
          borderRadius: 12,
          border: '2px solid #4a6e57',
          color: '#1d3327',
          background: '#8cbf99',
          cursor: 'pointer',
        }}
      >
        –
      </button>
    </div>
  );
}


