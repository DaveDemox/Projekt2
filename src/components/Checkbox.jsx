import React from 'react';
import '../styles/common.css';

export default function Checkbox({ checked, onChange, size = 22 }) {
  const diameter = size;
  const style = {
    width: diameter,
    height: diameter,
  };

  return (
    <span 
      className={`checkbox ${checked ? 'checkbox-checked' : ''}`}
      style={style}
      onClick={() => onChange(!checked)} 
    />
  );
}


