import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { SHOPPING_LISTS, CURRENT_USER } from "../constants/data";
import ListHeader from "../components/detail/ListHeader";
import MembersSection from "../components/detail/MembersSection";
import AddMemberForm from "../components/detail/AddMemberForm";
import AddItemForm from "../components/detail/AddItemForm";
import ItemsList from "../components/detail/ItemsList";

function ShoppingListDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const initialList = SHOPPING_LISTS.find((l) => l.id === listId);
  const [list, setList] = useState(initialList);

  if (!list) return <p>Seznam nenalezen.</p>;

  const isOwner = list.ownerId === CURRENT_USER.id;

  function handleRenameList(newName) {
    setList({ ...list, name: newName });
  }

  function handleAddMember(name) {
    const newMember = { id: "u" + Date.now(), name };
    setList({ ...list, members: [...list.members, newMember] });
  }

  function handleRemoveMember(userId) {
    setList({ ...list, members: list.members.filter((m) => m.id !== userId) });
  }

  function handleLeaveList() {
    setList({ ...list, members: list.members.filter((m) => m.id !== CURRENT_USER.id) });
  }

  function handleAddItem(name) {
    const newItem = { id: "i" + Date.now(), name, resolved: false };
    setList({ ...list, items: [...list.items, newItem] });
  }

  function handleDeleteItem(itemId) {
    setList({ ...list, items: list.items.filter((i) => i.id !== itemId) });
  }

  function handleResolveItem(itemId) {
    setList({
      ...list,
      items: list.items.map((i) =>
        i.id === itemId ? { ...i, resolved: !i.resolved } : i
      ),
    });
  }

  return (
    <div>
      <div className="detail-container">
        <ListHeader
          name={list.name}
          isOwner={isOwner}
          onRename={handleRenameList}
          onClose={() => navigate("/lists")}
        />
        <MembersSection
          members={list.members}
          ownerId={list.ownerId}
          currentUserId={CURRENT_USER.id}
          onRemoveMember={handleRemoveMember}
          onLeaveList={handleLeaveList}
        />
        {isOwner && <AddMemberForm onSubmit={handleAddMember} />}
        <AddItemForm onSubmit={handleAddItem} />
        <ItemsList
          items={list.items}
          onDeleteItem={handleDeleteItem}
          onResolveItem={handleResolveItem}
        />
      </div>
    </div>
  );
}

export default ShoppingListDetailPage;