import React from 'react';

export default function Checkbox({ checked, onChange, size = 22 }) {
  const diameter = size;
  const box = {
    width: diameter,
    height: diameter,
    borderRadius: diameter / 2,
    border: '2px solid #1d3327',
    background: checked ? '#8cbf99' : 'transparent',
    display: 'inline-block',
  };

  return <span onClick={() => onChange(!checked)} style={box} />;
}


