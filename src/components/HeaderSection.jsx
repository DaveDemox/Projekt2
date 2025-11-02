import React from 'react';
import IconButton from './IconButton';

export default function HeaderSection({ title, onBack, children }) {
  const container = {
    padding: '16px 20px 8px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  };

  return (
    <div>
      <div style={container}>
        <IconButton label={'<'} onClick={onBack} size={40} filled={false} />
      </div>
      <div style={{ textAlign: 'center', marginTop: 8 }}>
        <h1 style={{ margin: 0, fontSize: 42, fontWeight: 600 }}>{title}</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 20, padding: '0 20px', width: '100%' }}>
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '100%' }}>
          {children}
        </div>
      </div>
    </div>
  );
}


