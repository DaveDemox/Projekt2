import React from 'react';
import '../styles/common.css';

export default function Avatar({ initials = '?', size = 72 }) {
  const diameter = size;
  const style = {
    width: diameter,
    height: diameter,
    fontSize: diameter * 0.45,
  };

  return <div className="avatar" style={style}>{initials}</div>;
}


