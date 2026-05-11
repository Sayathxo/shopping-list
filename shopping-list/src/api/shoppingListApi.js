const BASE_URL = "http://localhost:3000";
export const CURRENT_USER_ID = "u1";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";

export const KNOWN_USERS = [
  { id: "u1", name: "Petr Novák" },
  { id: "u2", name: "Anna Nováková" },
  { id: "u3", name: "Mike Novák" },
];

// --- Mock data store ---
let mockLists = [
  {
    id: "list1",
    name: "Seznam na party",
    ownerId: "u1",
    ownerName: "Petr Novák",
    archived: false,
    members: [
      { id: "u1", name: "Petr Novák" },
      { id: "u2", name: "Anna Nováková" },
      { id: "u3", name: "Mike Novák" },
    ],
    items: [
      { id: "i1", name: "Mléko", resolved: false },
      { id: "i2", name: "Chléb", resolved: false },
      { id: "i3", name: "Máslo", resolved: true },
      { id: "i4", name: "Jablka", resolved: false },
    ],
  },
  {
    id: "list2",
    name: "Nákup na dovolenou",
    ownerId: "u2",
    ownerName: "Anna Nováková",
    archived: false,
    members: [
      { id: "u2", name: "Anna Nováková" },
      { id: "u1", name: "Petr Novák" },
    ],
    items: [
      { id: "i5", name: "Opalovací krém", resolved: false },
      { id: "i6", name: "Ručník", resolved: true },
    ],
  },
  {
    id: "list3",
    name: "Týdenní nákup",
    ownerId: "u1",
    ownerName: "Petr Novák",
    archived: false,
    members: [
      { id: "u1", name: "Petr Novák" },
    ],
    items: [
      { id: "i7", name: "Vejce", resolved: false },
      { id: "i8", name: "Jogurt", resolved: false },
      { id: "i9", name: "Sýr", resolved: true },
    ],
  },
];

function clone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// --- Real API helpers ---
function authHeaders() {
  return {
    "Content-Type": "application/json",
    "x-user-id": CURRENT_USER_ID,
  };
}

async function apiFetch(path, options = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: authHeaders(),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  return res.json();
}

function normalizeList(raw) {
  const id = raw.id || (raw._id ? raw._id.toString() : undefined);
  return { ...raw, id };
}

// --- Exported API functions ---

export function getLists() {
  if (USE_MOCK) {
    return Promise.resolve(
      clone(mockLists.filter((l) => l.members.some((m) => m.id === CURRENT_USER_ID)))
    );
  }
  return apiFetch("/lists").then((data) => data.itemList.map(normalizeList));
}

export function archiveList(listId) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    list.archived = true;
    return Promise.resolve(clone(list));
  }
  return apiFetch(`/lists/${listId}/archive`, { method: "POST" }).then(normalizeList);
}

export function unarchiveList(listId) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    list.archived = false;
    return Promise.resolve(clone(list));
  }
  return apiFetch(`/lists/${listId}/unarchive`, { method: "POST" }).then(normalizeList);
}

export function createList(name) {
  if (USE_MOCK) {
    const owner = KNOWN_USERS.find((u) => u.id === CURRENT_USER_ID);
    const newList = {
      id: "list" + Date.now(),
      name,
      ownerId: CURRENT_USER_ID,
      ownerName: owner.name,
      archived: false,
      members: [clone(owner)],
      items: [],
    };
    mockLists.push(newList);
    return Promise.resolve(clone(newList));
  }
  return apiFetch("/lists", { method: "POST", body: JSON.stringify({ name }) }).then(normalizeList);
}

export function deleteList(listId) {
  if (USE_MOCK) {
    mockLists = mockLists.filter((l) => l.id !== listId);
    return Promise.resolve({ id: listId });
  }
  return apiFetch(`/lists/${listId}`, { method: "DELETE" });
}

export function getList(listId) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    return Promise.resolve(clone(list));
  }
  return apiFetch(`/lists/${listId}`).then(normalizeList);
}

export function renameList(listId, name) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    list.name = name;
    return Promise.resolve(clone(list));
  }
  return apiFetch(`/lists/${listId}`, {
    method: "POST",
    body: JSON.stringify({ name }),
  }).then(normalizeList);
}

export function addMember(listId, userId) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    const user = KNOWN_USERS.find((u) => u.id === userId);
    if (!user) return Promise.reject(new Error("Uživatel nenalezen"));
    if (!list.members.some((m) => m.id === userId)) {
      list.members.push(clone(user));
    }
    return Promise.resolve({ listId, members: clone(list.members) });
  }
  return apiFetch(`/lists/${listId}/members`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
}

export function removeMember(listId, userId) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    list.members = list.members.filter((m) => m.id !== userId);
    return Promise.resolve({ listId, members: clone(list.members) });
  }
  return apiFetch(`/lists/${listId}/members/${userId}`, { method: "DELETE" });
}

export function leaveList(listId) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    list.members = list.members.filter((m) => m.id !== CURRENT_USER_ID);
    return Promise.resolve({ listId });
  }
  return apiFetch(`/lists/${listId}/members/me`, { method: "DELETE" });
}

export function addItem(listId, name) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    const newItem = { id: "i" + Date.now(), name, resolved: false };
    list.items.push(newItem);
    return Promise.resolve(clone(newItem));
  }
  return apiFetch(`/lists/${listId}/items`, {
    method: "POST",
    body: JSON.stringify({ name }),
  });
}

export function deleteItem(listId, itemId) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    list.items = list.items.filter((i) => i.id !== itemId);
    return Promise.resolve({ itemId });
  }
  return apiFetch(`/lists/${listId}/items/${itemId}`, { method: "DELETE" });
}

export function resolveItem(listId, itemId) {
  if (USE_MOCK) {
    const list = mockLists.find((l) => l.id === listId);
    if (!list) return Promise.reject(new Error("Seznam nenalezen"));
    const item = list.items.find((i) => i.id === itemId);
    if (!item) return Promise.reject(new Error("Položka nenalezena"));
    item.resolved = !item.resolved;
    return Promise.resolve(clone(item));
  }
  return apiFetch(`/lists/${listId}/items/${itemId}/resolve`, { method: "POST" });
}
