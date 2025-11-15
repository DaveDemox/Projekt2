import React, { useState } from 'react';
import '../styles/common.css';

export default function CreateListInput({ placeholder = 'Add a list item', onCreate }) {
  const [value, setValue] = useState('');

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onCreate && onCreate(trimmed);
    setValue('');
  };

  return (
    <div className="create-input-bar">
      <div className="create-input-container">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && submit()}
          placeholder={placeholder}
          className="create-input-field"
        />
        <button
          onClick={submit}
          aria-label="Create item"
          className="create-input-submit"
        >
          ↑
        </button>
      </div>
    </div>
  );
}


