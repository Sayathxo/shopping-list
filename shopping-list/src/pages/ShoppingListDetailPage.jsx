import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useLists } from "../context/ListsContext";
import { CURRENT_USER_ID, KNOWN_USERS } from "../api/shoppingListApi";
import ListHeader from "../components/detail/ListHeader";
import MembersSection from "../components/detail/MembersSection";
import AddMemberForm from "../components/detail/AddMemberForm";
import AddItemForm from "../components/detail/AddItemForm";
import ItemsList from "../components/detail/ItemsList";
import ItemsChart from "../components/detail/ItemsChart";

function ShoppingListDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const {
    lists, status, error,
    renameList, addMember, removeMember, leaveList,
    addItem, deleteItem, resolveItem,
  } = useLists();

  const [showResolved, setShowResolved] = useState(false);
  const [localError, setLocalError] = useState(null);

  if (status === "pending") return <p className="status-message">{t("loading")}</p>;
  if (status === "error") return <p className="status-message error">{t("error")}: {error}</p>;

  const list = lists.find((l) => l.id === listId);
  if (!list) return <p className="status-message error">{t("error")}: seznam nenalezen</p>;

  const isOwner = list.ownerId === CURRENT_USER_ID;
  const filteredItems = showResolved ? list.items : list.items.filter((i) => !i.resolved);
  const availableUsers = KNOWN_USERS.filter((u) => !list.members.some((m) => m.id === u.id));

  async function wrap(fn) {
    try {
      await fn();
    } catch (err) {
      setLocalError(err.message);
    }
  }

  return (
    <div className="page-wrapper">
      <div className="detail-container">
        {localError && <p className="status-message error">{t("error")}: {localError}</p>}
        <ListHeader
          name={list.name}
          isOwner={isOwner}
          onRename={(name) => wrap(() => renameList(listId, name))}
          onClose={() => navigate("/lists")}
        />
        <ItemsChart items={list.items} />
        <MembersSection
          members={list.members}
          ownerId={list.ownerId}
          currentUserId={CURRENT_USER_ID}
          onRemoveMember={(userId) => wrap(() => removeMember(listId, userId))}
          onLeaveList={() => wrap(() => leaveList(listId).then(() => navigate("/lists")))}
        />
        {isOwner && availableUsers.length > 0 && (
          <AddMemberForm
            availableUsers={availableUsers}
            onSubmit={(userId) => wrap(() => addMember(listId, userId))}
          />
        )}
        <AddItemForm onSubmit={(name) => wrap(() => addItem(listId, name))} />
        <div className="filter-bar">
          <button
            className={`filter-btn ${!showResolved ? "active" : ""}`}
            onClick={() => setShowResolved(false)}
          >
            {t("unresolvedOnly")}
          </button>
          <button
            className={`filter-btn ${showResolved ? "active" : ""}`}
            onClick={() => setShowResolved(true)}
          >
            {t("showAll")}
          </button>
        </div>
        <ItemsList
          items={filteredItems}
          onDeleteItem={(itemId) => wrap(() => deleteItem(listId, itemId))}
          onResolveItem={(itemId) => wrap(() => resolveItem(listId, itemId))}
        />
      </div>
    </div>
  );
}

export default ShoppingListDetailPage;
