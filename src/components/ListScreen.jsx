import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLists } from '../context/ListsContext';
import { getCurrentUser, Roles, MOCK_USERS } from '../utils/authorization';
import HeaderSection from './HeaderSection';
import Avatar from './Avatar';
import AddMemberButton from './AddMemberButton';
import OptionsMenu from './OptionsMenu';
import ListItem from './ListItem';
import CreateListInput from './CreateListInput';
import IconButton from './IconButton';
import AddMemberModal from './AddMemberModal';
import ConfirmModal from './ConfirmModal';
import '../styles/common.css';

export default function ListScreen({ title = 'List name', initialItems = [] }) {
  const navigate = useNavigate();
  const { listId } = useParams();
  const { getList, updateList, memberships, addMemberToList, removeMemberFromList, deleteList, archiveList, unarchiveList } = useLists();
  
  const [showAddMemberModal, setShowAddMemberModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [showLeaveConfirmModal, setShowLeaveConfirmModal] = useState(false);
  const [showArchiveConfirmModal, setShowArchiveConfirmModal] = useState(false);
  const [showUnarchiveConfirmModal, setShowUnarchiveConfirmModal] = useState(false);
  
  const listData = getList(listId);
  const isArchived = listData?.archived || false;
  const currentUser = getCurrentUser();
  const currentUserRole = useMemo(() => {
    if (!listData) return null;
    const listMemberships = memberships[listId];
    return listMemberships?.[currentUser.id] || null;
  }, [listId, listData, memberships, currentUser.id]);
  
  const members = useMemo(() => {
    if (!listData) return [];
    const listMemberships = memberships[listId];
    if (!listMemberships) return [];
    
    return Object.entries(listMemberships)
      .map(([userId, role]) => {
        const user = MOCK_USERS[Number(userId)];
        if (!user) return null;
        return {
          ...user,
          role,
        };
      })
      .filter(Boolean);
  }, [listId, listData, memberships]);
  
  const [listTitle, setListTitle] = useState(listData?.name || title);
  const [items, setItems] = useState(
    listData?.items?.map((t, i) => ({ id: i + 1, label: t, checked: false })) ||
    (initialItems.length > 0 
      ? initialItems.map((t, i) => ({ id: i + 1, label: t, checked: i === 1 }))
      : [{ id: 1, label: 'bacon', checked: false }, { id: 2, label: 'eggs', checked: false }, { id: 3, label: 'oil', checked: false }, { id: 4, label: 'avocado', checked: false }])
  );
  
  useEffect(() => {
    if (listData) {
      setListTitle(listData.name);
      setItems(listData.items?.map((t, i) => ({ id: i + 1, label: t, checked: false })) || []);
    }
  }, [listId, listData]);
  
  const handleBack = () => {
    navigate('/');
  };
  
  const [showCompletedOnly, setShowCompletedOnly] = useState(false);

  const toggle = (id, next) => {
    if (isArchived) return; // Disable editing when archived
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, checked: next } : it)));
  };

  const remove = (id) => {
    if (isArchived) return; // Disable editing when archived
    setItems((prev) => prev.filter((it) => it.id !== id));
  };
  
  const add = (label) => {
    if (isArchived) return; // Disable editing when archived
    setItems((prev) => [...prev, { id: Date.now(), label, checked: false }]);
  };

  const handleAddMember = (userId) => {
    addMemberToList(Number(listId), userId, 'member');
  };

  const handleRemoveMember = (userId) => {
    removeMemberFromList(Number(listId), userId);
  };

  const handleDeleteList = () => {
    deleteList(Number(listId));
    navigate('/');
  };

  const handleLeaveList = () => {
    removeMemberFromList(Number(listId), currentUser.id);
    navigate('/');
  };

  const existingMemberIds = members.map((m) => m.id);

  const canRemove = (member) => {
    // Only owners can remove members, and never owners or themselves
    return (
      currentUserRole === Roles.OWNER &&
      member.role !== Roles.OWNER &&
      member.id !== currentUser.id
    );
  };

  const changeListName = () => {
    if (isArchived) return; // Disable editing when archived
    const newName = window.prompt('Enter new list name:', listTitle);
    if (newName !== null && newName.trim()) {
      setListTitle(newName.trim());
      if (listData) {
        updateList(listId, { name: newName.trim() });
      }
    }
  };

  const handleArchive = () => {
    archiveList(Number(listId));
    navigate('/');
  };

  const handleUnarchive = () => {
    unarchiveList(Number(listId));
  };

  const toggleShowCompleted = () => {
    setShowCompletedOnly((prev) => !prev);
  };

  const displayedItems = showCompletedOnly
    ? items.filter((it) => it.checked)
    : items;

  return (
    <div style={{ paddingBottom: 110 }}>
      <HeaderSection title={listTitle} onBack={handleBack}>
        <div className="members-container">
          <div className="members-scroll">
            {members.map((m) => (
              <div key={m.id} className="member-item">
                <Avatar initials={m.initials} />
                {canRemove(m) && !isArchived && (
                  <div style={{ position: 'absolute', left: -6, top: -6 }}>
                    <IconButton label={'–'} onClick={() => handleRemoveMember(m.id)} size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
          {currentUserRole === Roles.OWNER && !isArchived && (
            <div className="flex-center" style={{ flexShrink: 0 }}>
              <AddMemberButton onClick={() => setShowAddMemberModal(true)} />
            </div>
          )}
        </div>
      </HeaderSection>

      {/* Checkmark button below members, aligned right */}
      <div className="flex" style={{ justifyContent: 'flex-end', paddingRight: '20px', marginTop: '10px' }}>
        <IconButton
          label={'✓'}
          onClick={toggleShowCompleted}
          size={48}
          filled={showCompletedOnly}
        />
      </div>

      {isArchived && (
        <div className="warning-banner">
          This list is archived. Editing is disabled.
        </div>
      )}

      <div style={{ paddingTop: 12 }}>
        {displayedItems.map((it) => (
          <ListItem
            key={it.id}
            label={it.label}
            checked={it.checked}
            onToggle={(n) => toggle(it.id, n)}
            onDelete={isArchived ? null : () => remove(it.id)}
          />
        ))}
      </div>

      {!isArchived && <CreateListInput onCreate={add} />}

      <div style={{ position: 'fixed', top: 18, right: 16 }}>
        <OptionsMenu
          role={currentUserRole || Roles.MEMBER}
          isArchived={isArchived}
          onArchive={currentUserRole === Roles.OWNER && !isArchived ? () => setShowArchiveConfirmModal(true) : null}
          onUnarchive={currentUserRole === Roles.OWNER && isArchived ? () => setShowUnarchiveConfirmModal(true) : null}
          onDeleteList={() => setShowDeleteConfirmModal(true)}
          onLeaveList={() => setShowLeaveConfirmModal(true)}
          onChangeName={changeListName}
        />
      </div>

      <AddMemberModal
        isOpen={showAddMemberModal}
        onClose={() => setShowAddMemberModal(false)}
        onAdd={handleAddMember}
        existingMemberIds={existingMemberIds}
      />

      <ConfirmModal
        isOpen={showDeleteConfirmModal}
        onClose={() => setShowDeleteConfirmModal(false)}
        onConfirm={handleDeleteList}
        title="Delete List"
        message={`Are you sure you want to delete "${listTitle}"? This action cannot be undone.`}
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
      />

      <ConfirmModal
        isOpen={showLeaveConfirmModal}
        onClose={() => setShowLeaveConfirmModal(false)}
        onConfirm={handleLeaveList}
        title="Leave List"
        message={`Are you sure you want to leave "${listTitle}"? You will no longer have access to this list.`}
        confirmText="Leave"
        cancelText="Cancel"
        danger={true}
      />

      <ConfirmModal
        isOpen={showArchiveConfirmModal}
        onClose={() => setShowArchiveConfirmModal(false)}
        onConfirm={handleArchive}
        title="Archive List"
        message={`Are you sure you want to archive "${listTitle}"? The list will be moved to archived lists and editing will be disabled.`}
        confirmText="Archive"
        cancelText="Cancel"
        danger={false}
      />

      <ConfirmModal
        isOpen={showUnarchiveConfirmModal}
        onClose={() => setShowUnarchiveConfirmModal(false)}
        onConfirm={handleUnarchive}
        title="Unarchive List"
        message={`Are you sure you want to unarchive "${listTitle}"? The list will be moved back to active lists and editing will be enabled.`}
        confirmText="Unarchive"
        cancelText="Cancel"
        danger={false}
      />
    </div>
  );
}


