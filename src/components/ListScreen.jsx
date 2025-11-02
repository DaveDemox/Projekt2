import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import Avatar from './Avatar';
import AddMemberButton from './AddMemberButton';
import OptionsMenu from './OptionsMenu';
import ListItem from './ListItem';
import CreateListInput from './CreateListInput';
import IconButton from './IconButton';

export default function ListScreen({ title = 'List name', initialItems = [] }) {
  const Roles = { MEMBER: 'member', OWNER: 'owner' };
  const [listTitle, setListTitle] = useState(title);
  const [items, setItems] = useState(
    initialItems.map((t, i) => ({ id: i + 1, label: t, checked: i === 1 }))
  );
  const [members, setMembers] = useState([
    { id: 1, name: 'David', initials: 'D', role: Roles.OWNER },
  ]);
  const [currentUserId, setCurrentUserId] = useState(1);
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  const toggle = (id, next) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, checked: next } : it)));
  };

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
  const add = (label) =>
    setItems((prev) => [...prev, { id: Date.now(), label, checked: false }]);

  const nameToInitials = (name) => {
    const parts = name.trim().split(/\s+/);
    if (parts.length === 0) return '?';
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[1].charAt(0)).toUpperCase();
  };

  const addMember = () => {
    const input = window.prompt('Enter user name');
    if (!input) return;
    const name = input.trim();
    if (!name) return;
    setMembers((prev) => [
      ...prev,
      { id: Date.now(), name, initials: nameToInitials(name), role: Roles.MEMBER },
    ]);
  };

  const removeMember = (id) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    if (currentUserId === id && members.length > 1) {
      const next = members.find((m) => m.id !== id);
      if (next) setCurrentUserId(next.id);
    }
  };

  const currentUser = members.find((m) => m.id === currentUserId);
  const canRemove = (member) => {
    // Only owners see minus bubbles, and never for owners or themselves
    return (
      currentUser?.role === Roles.OWNER &&
      member.role !== Roles.OWNER &&
      member.id !== currentUserId
    );
  };

  const changeListName = () => {
    const newName = window.prompt('Enter new list name:', listTitle);
    if (newName !== null && newName.trim()) {
      setListTitle(newName.trim());
    }
  };

  const toggleShowCompleted = () => {
    setShowCompletedOnly((prev) => !prev);
  };

  const displayedItems = showCompletedOnly
    ? items.filter((it) => it.checked)
    : items;

  return (
    <div style={{ paddingBottom: 110 }}>
      <HeaderSection title={listTitle} onBack={() => {}}>
        {members.map((m) => (
          <div key={m.id} style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', margin: '0 10px' }}>
            <Avatar initials={m.initials} />
            {canRemove(m) && (
              <div style={{ position: 'absolute', left: -6, top: -6 }}>
                <IconButton label={'–'} onClick={() => removeMember(m.id)} size={24} />
              </div>
            )}
          </div>
        ))}
        <AddMemberButton onClick={addMember} />
        <IconButton
          label={'✓'}
          onClick={toggleShowCompleted}
          size={48}
          filled={showCompletedOnly}
        />
      </HeaderSection>

      {/* Role testing controls */}
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', justifyContent: 'center', marginTop: 8 }}>
        <label>
          You:
          <select
            value={currentUserId}
            onChange={(e) => setCurrentUserId(Number(e.target.value))}
            style={{ marginLeft: 6 }}
          >
            {members.map((m) => (
              <option key={m.id} value={m.id}>{m.name}</option>
            ))}
          </select>
        </label>
        <label>
          Role:
          <select
            value={members.find((m) => m.id === currentUserId)?.role || Roles.MEMBER}
            onChange={(e) =>
              setMembers((prev) =>
                prev.map((m) =>
                  m.id === currentUserId ? { ...m, role: e.target.value } : m
                )
              )
            }
            style={{ marginLeft: 6 }}
          >
            <option value={Roles.MEMBER}>member</option>
            <option value={Roles.OWNER}>owner</option>
          </select>
        </label>
      </div>

      <div style={{ paddingTop: 12 }}>
        {displayedItems.map((it) => (
          <ListItem
            key={it.id}
            label={it.label}
            checked={it.checked}
            onToggle={(n) => toggle(it.id, n)}
            onDelete={() => remove(it.id)}
          />
        ))}
      </div>

      <CreateListInput onCreate={add} />

      <div style={{ position: 'fixed', top: 18, right: 16 }}>
        <OptionsMenu
          role={currentUser?.role || Roles.MEMBER}
          onArchive={() => {}}
          onDeleteList={() => {}}
          onLeaveList={() => removeMember(currentUserId)}
          onChangeName={changeListName}
        />
      </div>
    </div>
  );
}


