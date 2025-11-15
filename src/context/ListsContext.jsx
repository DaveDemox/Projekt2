import React, { createContext, useContext, useState, useMemo } from 'react';
import { MOCK_LISTS, MOCK_LIST_MEMBERSHIPS, CURRENT_USER_ID } from '../constants/mockData';

const ListsContext = createContext();

export function ListsProvider({ children }) {
  // Initialize lists from mock data
  const [lists, setLists] = useState(MOCK_LISTS);
  // Initialize memberships from mock data
  const [memberships, setMemberships] = useState(MOCK_LIST_MEMBERSHIPS);

  // Get lists that the current user is a member of, with their role
  const userLists = useMemo(() => {
    return lists
      .filter((list) => {
        const listMemberships = memberships[list.id];
        return listMemberships && listMemberships[CURRENT_USER_ID] !== undefined;
      })
      .map((list) => ({
        ...list,
        role: memberships[list.id]?.[CURRENT_USER_ID] || null,
        archived: list.archived || false,
      }));
  }, [lists, memberships]);

  // Get archived lists that the current user is a member of
  const archivedLists = useMemo(() => {
    return lists
      .filter((list) => {
        const listMemberships = memberships[list.id];
        return list.archived && listMemberships && listMemberships[CURRENT_USER_ID] !== undefined;
      })
      .map((list) => ({
        ...list,
        role: memberships[list.id]?.[CURRENT_USER_ID] || null,
        archived: true,
      }));
  }, [lists, memberships]);

  const createList = (listName, userId = CURRENT_USER_ID) => {
    const newList = {
      id: Date.now(),
      name: listName,
      items: [],
    };
    setLists((prev) => [...prev, newList]);
    
    // Add the creator as owner
    setMemberships((prev) => ({
      ...prev,
      [newList.id]: { [userId]: 'owner' },
    }));
    
    return newList.id;
  };

  const deleteList = (listId) => {
    setLists((prev) => prev.filter((list) => list.id !== listId));
    setMemberships((prev) => {
      const newMemberships = { ...prev };
      delete newMemberships[listId];
      return newMemberships;
    });
  };

  const getList = (listId) => {
    return lists.find((list) => list.id === Number(listId));
  };

  const updateList = (listId, updates) => {
    setLists((prev) =>
      prev.map((list) => (list.id === Number(listId) ? { ...list, ...updates } : list))
    );
  };

  const addMemberToList = (listId, userId, role = 'member') => {
    setMemberships((prev) => {
      const listMemberships = prev[listId] || {};
      return {
        ...prev,
        [listId]: {
          ...listMemberships,
          [userId]: role,
        },
      };
    });
  };

  const removeMemberFromList = (listId, userId) => {
    setMemberships((prev) => {
      const listMemberships = prev[listId];
      if (!listMemberships) return prev;
      
      const newMemberships = { ...listMemberships };
      delete newMemberships[userId];
      
      // If no members left, remove the list entirely
      if (Object.keys(newMemberships).length === 0) {
        const newAllMemberships = { ...prev };
        delete newAllMemberships[listId];
        setLists((prevLists) => prevLists.filter((list) => list.id !== Number(listId)));
        return newAllMemberships;
      }
      
      return {
        ...prev,
        [listId]: newMemberships,
      };
    });
  };

  const archiveList = (listId) => {
    setLists((prev) =>
      prev.map((list) => (list.id === Number(listId) ? { ...list, archived: true } : list))
    );
  };

  const unarchiveList = (listId) => {
    setLists((prev) =>
      prev.map((list) => (list.id === Number(listId) ? { ...list, archived: false } : list))
    );
  };

  return (
    <ListsContext.Provider
      value={{
        lists,
        userLists,
        archivedLists,
        createList,
        deleteList,
        getList,
        updateList,
        memberships,
        addMemberToList,
        removeMemberFromList,
        archiveList,
        unarchiveList,
      }}
    >
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  const context = useContext(ListsContext);
  if (!context) {
    throw new Error('useLists must be used within a ListsProvider');
  }
  return context;
}

