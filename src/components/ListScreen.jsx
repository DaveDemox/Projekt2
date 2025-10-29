import React, { useState } from 'react';
import HeaderSection from './HeaderSection';
import Profile from './Profile';
import AddMemberButton from './AddMemberButton';
import OptionsMenu from './OptionsMenu';
import ListItem from './ListItem';
import CreateListInput from './CreateListInput';
import IconButton from './IconButton';

export default function ListScreen({ title = 'List name', initialItems = [] }) {
  const [items, setItems] = useState(
    initialItems.map((t, i) => ({ id: i + 1, label: t, checked: i === 1 }))
  );

  const toggle = (id, next) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, checked: next } : it)));
  };

  const remove = (id) => setItems((prev) => prev.filter((it) => it.id !== id));
  const add = (label) =>
    setItems((prev) => [...prev, { id: Date.now(), label, checked: false }]);

  return (
    <div style={{ paddingBottom: 110 }}>
      <HeaderSection title={title} onBack={() => {}}>
        <IconButton label={'–'} onClick={() => {}} size={28} />
        <Profile initials={'D'} />
        <AddMemberButton onClick={() => {}} />
        <IconButton label={'✓'} onClick={() => {}} size={48} filled={false} />
      </HeaderSection>

      <div style={{ paddingTop: 12 }}>
        {items.map((it) => (
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
          onAddUser={() => {}}
          onRemoveUser={() => {}}
          onArchive={() => {}}
          onDeleteList={() => {}}
          onLeaveList={() => {}}
          onChangeName={() => {}}
        />
      </div>
    </div>
  );
}


