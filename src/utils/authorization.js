import { CURRENT_USER_ID, MOCK_LIST_MEMBERSHIPS, MOCK_USERS } from '../constants/mockData';

// Export MOCK_USERS for use in components
export { MOCK_USERS };

export const Roles = {
  OWNER: 'owner',
  MEMBER: 'member',
};

/**
 * Check if the current user is an owner of a specific list
 */
export function isOwner(listId, userId = CURRENT_USER_ID) {
  const memberships = MOCK_LIST_MEMBERSHIPS[listId];
  if (!memberships) return false;
  return memberships[userId] === Roles.OWNER;
}

/**
 * Check if the current user is a member (owner or member) of a specific list
 */
export function isMember(listId, userId = CURRENT_USER_ID) {
  const memberships = MOCK_LIST_MEMBERSHIPS[listId];
  if (!memberships) return false;
  return memberships[userId] !== undefined;
}

/**
 * Get the role of a user in a specific list
 */
export function getUserRole(listId, userId = CURRENT_USER_ID) {
  const memberships = MOCK_LIST_MEMBERSHIPS[listId];
  if (!memberships) return null;
  return memberships[userId] || null;
}

/**
 * Get all lists that the current user is a member of
 */
export function getUserLists(userId = CURRENT_USER_ID) {
  return Object.keys(MOCK_LIST_MEMBERSHIPS)
    .filter((listId) => isMember(Number(listId), userId))
    .map(Number);
}

/**
 * Get the current user
 */
export function getCurrentUser() {
  return MOCK_USERS[CURRENT_USER_ID];
}

/**
 * Get all members of a specific list with their roles
 */
export function getListMembers(listId) {
  const memberships = MOCK_LIST_MEMBERSHIPS[listId];
  if (!memberships) return [];
  
  return Object.entries(memberships).map(([userId, role]) => {
    const user = MOCK_USERS[Number(userId)];
    if (!user) return null;
    return {
      ...user,
      role,
    };
  }).filter(Boolean);
}

