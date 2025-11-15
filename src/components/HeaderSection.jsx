import React from 'react';
import IconButton from './IconButton';
import '../styles/common.css';

export default function HeaderSection({ title, onBack, children }) {
  return (
    <div>
      <div className="header-container">
        {onBack && <IconButton label={'<'} onClick={onBack} size={40} filled={false} />}
      </div>
      <div className="header-title">
        <h1>{title}</h1>
      </div>
      <div className="header-content">
        <div className="header-content-inner">
          {children}
        </div>
      </div>
    </div>
  );
}


