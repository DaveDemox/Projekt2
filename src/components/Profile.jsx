import React from 'react';
import Avatar from './Avatar';

export default function Profile({ initials = 'D' }) {
  return (
    <div style={{ display: 'inline-flex', gap: 16, alignItems: 'center' }}>
      <Avatar initials={initials} size={72} />
    </div>
  );
}


