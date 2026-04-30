import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CURRENT_USER_ID,
  KNOWN_USERS,
  getList,
  renameList,
  addMember,
  removeMember,
  leaveList,
  addItem,
  deleteItem,
  resolveItem,
} from "../api/shoppingListApi";
import ListHeader from "../components/detail/ListHeader";
import MembersSection from "../components/detail/MembersSection";
import AddMemberForm from "../components/detail/AddMemberForm";
import AddItemForm from "../components/detail/AddItemForm";
import ItemsList from "../components/detail/ItemsList";

const CURRENT_USER = KNOWN_USERS.find((u) => u.id === CURRENT_USER_ID);

function ShoppingListDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [list, setList] = useState(null);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);
  const [showResolved, setShowResolved] = useState(false);

  useEffect(() => {
    getList(listId)
      .then((data) => {
        setList(data);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, [listId]);

  if (status === "pending") return <p className="status-message">Načítání...</p>;
  if (status === "error") return <p className="status-message error">Chyba: {error}</p>;

  const isOwner = list.ownerId === CURRENT_USER_ID;
  const filteredItems = showResolved ? list.items : list.items.filter((i) => !i.resolved);
  const availableUsers = KNOWN_USERS.filter((u) => !list.members.some((m) => m.id === u.id));

  async function handleRenameList(newName) {
    try {
      const updated = await renameList(list.id, newName);
      setList(updated);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAddMember(userId) {
    try {
      const result = await addMember(list.id, userId);
      setList((prev) => ({ ...prev, members: result.members }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleRemoveMember(userId) {
    try {
      const result = await removeMember(list.id, userId);
      setList((prev) => ({ ...prev, members: result.members }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleLeaveList() {
    try {
      await leaveList(list.id);
      navigate("/lists");
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAddItem(name) {
    try {
      const newItem = await addItem(list.id, name);
      setList((prev) => ({ ...prev, items: [...prev.items, newItem] }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteItem(itemId) {
    try {
      await deleteItem(list.id, itemId);
      setList((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== itemId) }));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleResolveItem(itemId) {
    try {
      const updatedItem = await resolveItem(list.id, itemId);
      setList((prev) => ({
        ...prev,
        items: prev.items.map((i) => (i.id === itemId ? updatedItem : i)),
      }));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <div className="detail-container">
        {error && <p className="status-message error">Chyba: {error}</p>}
        <ListHeader
          name={list.name}
          isOwner={isOwner}
          onRename={handleRenameList}
          onClose={() => navigate("/lists")}
        />
        <MembersSection
          members={list.members}
          ownerId={list.ownerId}
          currentUserId={CURRENT_USER_ID}
          onRemoveMember={handleRemoveMember}
          onLeaveList={handleLeaveList}
        />
        {isOwner && availableUsers.length > 0 && (
          <AddMemberForm availableUsers={availableUsers} onSubmit={handleAddMember} />
        )}
        <AddItemForm onSubmit={handleAddItem} />
        <div className="filter-bar">
          <button
            className={`filter-btn ${!showResolved ? "active" : ""}`}
            onClick={() => setShowResolved(false)}
          >
            Jen nevyřešené
          </button>
          <button
            className={`filter-btn ${showResolved ? "active" : ""}`}
            onClick={() => setShowResolved(true)}
          >
            Zobrazit vše
          </button>
        </div>
        <ItemsList
          items={filteredItems}
          onDeleteItem={handleDeleteItem}
          onResolveItem={handleResolveItem}
        />
      </div>
    </div>
  );
}

export default ShoppingListDetailPage;
