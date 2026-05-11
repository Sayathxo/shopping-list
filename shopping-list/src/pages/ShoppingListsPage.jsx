import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useLists } from "../context/ListsContext";
import ShoppingListsGrid from "../components/list/ShoppingListsGrid";
import CreateListModal from "../components/list/CreateListModal";
import DeleteConfirmModal from "../components/list/DeleteConfirmModal";
import { CURRENT_USER_ID, KNOWN_USERS } from "../api/shoppingListApi";

const CURRENT_USER = KNOWN_USERS.find((u) => u.id === CURRENT_USER_ID);

function ShoppingListsPage() {
  const { t } = useTranslation();
  const {
    lists, status, error,
    createList, deleteList, archiveList, unarchiveList,
  } = useLists();

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [showArchived, setShowArchived] = useState(false);
  const [localError, setLocalError] = useState(null);

  if (status === "pending") return <p className="status-message">{t("loading")}</p>;
  if (status === "error") return <p className="status-message error">{t("error")}: {error}</p>;

  const visibleLists = lists.filter((l) => showArchived ? l.archived : !l.archived);
  const archivedCount = lists.filter((l) => l.archived).length;

  async function handleCreateConfirm(name) {
    try {
      await createList(name);
      setShowCreateModal(false);
    } catch (err) {
      setLocalError(err.message);
    }
  }

  function handleDeleteRequest(listId) {
    setDeleteTarget(lists.find((l) => l.id === listId));
  }

  async function handleDeleteConfirm() {
    try {
      await deleteList(deleteTarget.id);
      setDeleteTarget(null);
    } catch (err) {
      setLocalError(err.message);
    }
  }

  async function handleArchive(listId) {
    try {
      await archiveList(listId);
    } catch (err) {
      setLocalError(err.message);
    }
  }

  async function handleUnarchive(listId) {
    try {
      await unarchiveList(listId);
    } catch (err) {
      setLocalError(err.message);
    }
  }

  return (
    <div className="page-wrapper">
      {localError && <p className="status-message error">{t("error")}: {localError}</p>}
      <div className="lists-container">
        <div className="lists-toolbar">
          <button
            className={`archive-toggle-btn${showArchived ? " active" : ""}`}
            onClick={() => setShowArchived((v) => !v)}
          >
            {showArchived ? t("hideArchived") : t("showArchived")}
            {archivedCount > 0 && !showArchived && (
              <span className="archived-count-badge">{archivedCount}</span>
            )}
          </button>
          <button className="create-btn" onClick={() => setShowCreateModal(true)}>
            {t("newList")}
          </button>
        </div>
        <ShoppingListsGrid
          lists={visibleLists}
          currentUser={CURRENT_USER}
          onDeleteList={handleDeleteRequest}
          onArchiveList={handleArchive}
          onUnarchiveList={handleUnarchive}
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
