import React, { useEffect, useRef, useState } from 'react';
import IconButton from './IconButton';

export default function OptionsMenu({
  onAddUser,
  onRemoveUser,
  onArchive,
  onDeleteList,
  onLeaveList,
  onChangeName,
  role = 'member',
}) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDocClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open]);

  const item = (text, handler) => (
    <button
      key={text}
      onClick={() => {
        handler && handler();
        setOpen(false);
      }}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '10px 12px',
        background: 'white',
        border: '1px solid #e5e5e5',
        cursor: 'pointer',
      }}
    >
      {text}
    </button>
  );

  return (
    <div style={{ position: 'relative' }} ref={menuRef}>
      <IconButton label={'⋯'} onClick={() => setOpen((v) => !v)} size={48} filled={false} />
      {open && (
        <div style={{ position: 'absolute', right: 0, marginTop: 10, width: 220, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
          {role === 'owner' && item('Add user', onAddUser)}
          {role === 'owner' && item('Remove user', onRemoveUser)}
          {role === 'owner' && item('Archive', onArchive)}
          {role === 'owner' && item('Delete list', onDeleteList)}
          {role !== 'owner' && item('Leave list', onLeaveList)}
          {role === 'owner' && item('Change name', onChangeName)}
        </div>
      )}
    </div>
  );
}


