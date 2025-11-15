import React from 'react';
import '../styles/common.css';

export default function CreateListButton({ onClick }) {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <div className="fixed-bottom-bar">
      <button onClick={handleClick} className="btn btn-secondary btn-large" style={{ width: '100%' }}>
        Create list
      </button>
    </div>
  );
}

