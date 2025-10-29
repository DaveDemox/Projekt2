import React from 'react';

export default function Avatar({ initials = '?', size = 72 }) {
  const diameter = size;
  const container = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    background: '#8cbf99',
    border: '2px solid #4a6e57',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#1d3327',
    fontWeight: 700,
    fontSize: diameter * 0.45,
  };

  return <div style={container}>{initials}</div>;
}


