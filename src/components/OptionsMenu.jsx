import React, { useEffect, useRef, useState } from 'react';
import IconButton from './IconButton';
import '../styles/common.css';

export default function OptionsMenu({
  onArchive,
  onUnarchive,
  onDeleteList,
  onLeaveList,
  onChangeName,
  role = 'member',
  isArchived = false,
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
      className="options-menu-item"
    >
      {text}
    </button>
  );

  return (
    <div className="options-menu" ref={menuRef}>
      <IconButton label={'⋯'} onClick={() => setOpen((v) => !v)} size={48} filled={false} />
      {open && (
        <div className="options-menu-dropdown">
          {role === 'owner' && !isArchived && onArchive && item('Archive', onArchive)}
          {role === 'owner' && isArchived && onUnarchive && item('Unarchive', onUnarchive)}
          {role === 'owner' && item('Delete list', onDeleteList)}
          {role !== 'owner' && item('Leave list', onLeaveList)}
          {role === 'owner' && !isArchived && item('Change name', onChangeName)}
        </div>
      )}
    </div>
  );
}


