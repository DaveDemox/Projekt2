import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLists } from '../context/ListsContext';
import { getCurrentUser } from '../utils/authorization';
import { Roles } from '../utils/authorization';
import HeaderSection from './HeaderSection';
import Avatar from './Avatar';
import CreateListButton from './CreateListButton';
import CreateListModal from './CreateListModal';
import ConfirmModal from './ConfirmModal';
import '../styles/common.css';

export default function ListsOverview() {
  const navigate = useNavigate();
  const { userLists, archivedLists, createList, deleteList } = useLists();
  const currentUser = getCurrentUser();
  
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [showArchived, setShowArchived] = useState(false);

  const handleCreateList = (listName) => {
    if (!listName || !listName.trim()) return;
    createList(listName.trim());
  };

  const handleDeleteClick = (listId, e) => {
    e.stopPropagation();
    const list = userLists.find((l) => l.id === listId);
    setListToDelete(list);
    setShowDeleteConfirmModal(true);
  };

  const handleDeleteConfirm = () => {
    if (listToDelete) {
      deleteList(listToDelete.id);
      setListToDelete(null);
    }
  };

  const handleListClick = (listId) => {
    navigate(`/list/${listId}`);
  };

  return (
    <div>
      <HeaderSection title={showArchived ? "Archived Lists" : "Lists"} onBack={null}>
        <div className="flex-center gap-md">
          <Avatar initials={currentUser.initials} size={48} />
          <button
            onClick={() => setShowArchived(!showArchived)}
            className={`btn btn-small ${showArchived ? 'btn-primary' : ''}`}
            style={{
              background: showArchived ? 'var(--color-primary-dark)' : 'var(--color-primary)',
              color: showArchived ? 'white' : 'var(--color-text)',
            }}
          >
            {showArchived ? 'Active' : 'Archived'}
          </button>
        </div>
      </HeaderSection>

      <div className="tile-grid">
        {(showArchived ? archivedLists : userLists.filter(list => !list.archived)).map((list) => (
          <div
            key={list.id}
            className="tile"
            onClick={() => handleListClick(list.id)}
          >
            {list.role === Roles.OWNER && (
              <button
                onClick={(e) => handleDeleteClick(list.id, e)}
                className="tile-delete-btn"
                aria-label="Delete list"
              >
                –
              </button>
            )}
            <div>
              <div className="tile-name">{list.name}</div>
              <div className="tile-role">{list.role}</div>
            </div>
          </div>
        ))}
      </div>

      {!showArchived && <CreateListButton onClick={() => setShowCreateModal(true)} />}

      <CreateListModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={handleCreateList}
      />

      <ConfirmModal
        isOpen={showDeleteConfirmModal}
        onClose={() => {
          setShowDeleteConfirmModal(false);
          setListToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
        title="Delete List"
        message={listToDelete ? `Are you sure you want to delete "${listToDelete.name}"? This action cannot be undone.` : ''}
        confirmText="Delete"
        cancelText="Cancel"
        danger={true}
      />
    </div>
  );
}

