import React from 'react';

export default function IconButton({ label, onClick, size = 48, filled = true }) {
  const diameter = size;
  const style = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: filled ? '#8cbf99' : 'transparent',
    border: '2px solid #4a6e57',
    color: '#1d3327',
    fontSize: diameter * 0.45,
    cursor: 'pointer',
  };

  return (
    <button aria-label={label} style={style} onClick={onClick}>
      {label}
    </button>
  );
}


