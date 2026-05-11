import { createContext, useContext, useEffect, useState } from "react";
import {
  getLists,
  createList as apiCreateList,
  deleteList as apiDeleteList,
  archiveList as apiArchiveList,
  unarchiveList as apiUnarchiveList,
  renameList as apiRenameList,
  addMember as apiAddMember,
  removeMember as apiRemoveMember,
  leaveList as apiLeaveList,
  addItem as apiAddItem,
  deleteItem as apiDeleteItem,
  resolveItem as apiResolveItem,
  CURRENT_USER_ID,
} from "../api/shoppingListApi";

const ListsContext = createContext();

function updateList(setLists, listId, updater) {
  setLists((prev) => prev.map((l) => (l.id === listId ? updater(l) : l)));
}

export function ListsProvider({ children }) {
  const [lists, setLists] = useState([]);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);

  useEffect(() => {
    getLists()
      .then((data) => { setLists(data); setStatus("ready"); })
      .catch((err) => { setError(err.message); setStatus("error"); });
  }, []);

  async function createList(name) {
    const newList = await apiCreateList(name);
    setLists((prev) => [...prev, newList]);
    return newList;
  }

  async function deleteList(listId) {
    await apiDeleteList(listId);
    setLists((prev) => prev.filter((l) => l.id !== listId));
  }

  async function archiveList(listId) {
    const updated = await apiArchiveList(listId);
    updateList(setLists, listId, () => updated);
    return updated;
  }

  async function unarchiveList(listId) {
    const updated = await apiUnarchiveList(listId);
    updateList(setLists, listId, () => updated);
    return updated;
  }

  async function renameList(listId, name) {
    const updated = await apiRenameList(listId, name);
    updateList(setLists, listId, () => updated);
    return updated;
  }

  async function addMember(listId, userId) {
    const result = await apiAddMember(listId, userId);
    updateList(setLists, listId, (l) => ({ ...l, members: result.members }));
    return result;
  }

  async function removeMember(listId, userId) {
    const result = await apiRemoveMember(listId, userId);
    updateList(setLists, listId, (l) => ({ ...l, members: result.members }));
    return result;
  }

  async function leaveList(listId) {
    await apiLeaveList(listId);
    setLists((prev) => prev.filter((l) => l.id !== listId));
  }

  async function addItem(listId, name) {
    const newItem = await apiAddItem(listId, name);
    updateList(setLists, listId, (l) => ({ ...l, items: [...l.items, newItem] }));
    return newItem;
  }

  async function deleteItem(listId, itemId) {
    await apiDeleteItem(listId, itemId);
    updateList(setLists, listId, (l) => ({
      ...l,
      items: l.items.filter((i) => i.id !== itemId),
    }));
  }

  async function resolveItem(listId, itemId) {
    const updatedItem = await apiResolveItem(listId, itemId);
    updateList(setLists, listId, (l) => ({
      ...l,
      items: l.items.map((i) => (i.id === itemId ? updatedItem : i)),
    }));
    return updatedItem;
  }

  return (
    <ListsContext.Provider value={{
      lists, status, error,
      createList, deleteList, archiveList, unarchiveList,
      renameList, addMember, removeMember, leaveList,
      addItem, deleteItem, resolveItem,
      CURRENT_USER_ID,
    }}>
      {children}
    </ListsContext.Provider>
  );
}

export function useLists() {
  return useContext(ListsContext);
}
