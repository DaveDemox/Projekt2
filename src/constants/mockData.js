// Mock Users
export const MOCK_USERS = {
  1: { id: 1, name: 'David', initials: 'D' },
  2: { id: 2, name: 'Alice', initials: 'A' },
  3: { id: 3, name: 'Bob', initials: 'B' },
};

// Current authenticated user (mock)
export const CURRENT_USER_ID = 1;

// Mock Lists
export const MOCK_LISTS = [
  { id: 1, name: 'List 1', items: ['bacon', 'eggs', 'oil', 'avocado'] },
  { id: 2, name: 'A List 2', items: ['milk', 'bread'] },
  { id: 3, name: 'List 3', items: ['apples', 'bananas'] },
];

// Mock List Memberships: { listId: { userId: 'owner' | 'member', ... } }
export const MOCK_LIST_MEMBERSHIPS = {
  1: { 1: 'owner' }, // List 1: David is owner
  2: { 1: 'owner' }, // List 2: David is owner
  3: { 1: 'member', 2: 'owner' }, // List 3: David is member, Alice is owner
};

