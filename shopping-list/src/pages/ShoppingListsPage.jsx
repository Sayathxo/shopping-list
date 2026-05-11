import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CURRENT_USER_ID, KNOWN_USERS, getLists, createList, deleteList } from "../api/shoppingListApi";

const CURRENT_USER = KNOWN_USERS.find((u) => u.id === CURRENT_USER_ID);
import ShoppingListsGrid from "../components/list/ShoppingListsGrid";
import CreateListModal from "../components/list/CreateListModal";
import DeleteConfirmModal from "../components/list/DeleteConfirmModal";

function ShoppingListsPage() {
  const { t } = useTranslation();
  const [lists, setLists] = useState([]);
  const [status, setStatus] = useState("pending");
  const [error, setError] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  useEffect(() => {
    getLists()
      .then((data) => {
        setLists(data);
        setStatus("ready");
      })
      .catch((err) => {
        setError(err.message);
        setStatus("error");
      });
  }, []);

  async function handleCreateConfirm(name) {
    try {
      const newList = await createList(name);
      setLists((prev) => [...prev, newList]);
      setShowCreateModal(false);
    } catch (err) {
      setError(err.message);
    }
  }

  function handleDeleteRequest(listId) {
    const list = lists.find((l) => l.id === listId);
    setDeleteTarget(list);
  }

  async function handleDeleteConfirm() {
    try {
      await deleteList(deleteTarget.id);
      setLists((prev) => prev.filter((l) => l.id !== deleteTarget.id));
      setDeleteTarget(null);
    } catch (err) {
      setError(err.message);
    }
  }

  if (status === "pending") return <p className="status-message">{t("loading")}</p>;
  if (status === "error") return <p className="status-message error">{t("error")}: {error}</p>;

  return (
    <div className="page-wrapper">
      {error && <p className="status-message error">{t("error")}: {error}</p>}
      <div className="lists-container">
        <div className="lists-toolbar">
          <button className="create-btn" onClick={() => setShowCreateModal(true)}>
            {t("newList")}
          </button>
        </div>
        <ShoppingListsGrid
          lists={lists}
          currentUser={CURRENT_USER}
          onDeleteList={handleDeleteRequest}
        />
      </div>

      {showCreateModal && (
        <CreateListModal
          onConfirm={handleCreateConfirm}
          onClose={() => setShowCreateModal(false)}
        />
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          listName={deleteTarget.name}
          onConfirm={handleDeleteConfirm}
          onClose={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export default ShoppingListsPage;
