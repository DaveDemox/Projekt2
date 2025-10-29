import React from 'react';
import IconButton from './IconButton';

export default function AddMemberButton({ onClick }) {
  return <IconButton label={'+'} onClick={onClick} size={72} />;
}


