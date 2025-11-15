import React from 'react';
import '../styles/common.css';

export default function IconButton({ label, onClick, size = 48, filled = true }) {
  const diameter = size;
  const style = {
    width: diameter,
    height: diameter,
    fontSize: diameter * 0.45,
  };

  return (
    <button 
      aria-label={label} 
      className={`icon-btn ${filled ? 'icon-btn-filled' : 'icon-btn-empty'}`}
      style={style}
      onClick={onClick}
    >
      {label}
    </button>
  );
}


