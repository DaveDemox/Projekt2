import React, { useState } from 'react';

export default function CreateListInput({ placeholder = 'Add a list item', onCreate }) {
  const [value, setValue] = useState('');

  const bar = {
    position: 'fixed',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    background: '#8cbf99',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  };

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onCreate && onCreate(trimmed);
    setValue('');
  };

  return (
    <div style={bar}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={placeholder}
          style={{
            flex: 1,
            fontSize: 18,
            padding: '14px 16px',
            borderRadius: 12,
            border: 'none',
            outline: 'none',
          }}
        />
        <button
          onClick={submit}
          aria-label="Create item"
          style={{
            width: 54,
            height: 54,
            borderRadius: 27,
            border: 'none',
            background: '#e6e6e6',
            fontSize: 22,
            cursor: 'pointer',
          }}
        >
          ↑
        </button>
      </div>
    </div>
  );
}


