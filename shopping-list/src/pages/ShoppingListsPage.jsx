import { useState } from "react";
import { SHOPPING_LISTS, CURRENT_USER } from "../constants/data";
import PageHeader from "../components/list/PageHeader";
import ShoppingListsGrid from "../components/list/ShoppingListsGrid";
import CreateListModal from "../components/list/CreateListModal";
import DeleteConfirmModal from "../components/list/DeleteConfirmModal";

function ShoppingListsPage() {
  const [lists, setLists] = useState(SHOPPING_LISTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  function handleCreateConfirm(name) {
    const newList = {
      id: "list" + Date.now(),
      name,
      ownerId: CURRENT_USER.id,
      archived: false,
      members: [CURRENT_USER],
      items: [],
    };
    setLists([...lists, newList]);
    setShowCreateModal(false);
  }

  function handleDeleteRequest(listId) {
    const list = lists.find((l) => l.id === listId);
    setDeleteTarget(list);
  }

  function handleDeleteConfirm() {
    setLists(lists.filter((l) => l.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return (
    <div className="page-wrapper">
      <PageHeader title="Nákupní seznamy" userName={CURRENT_USER.name} />
      <div className="lists-container">
        <div className="lists-toolbar">
          <button className="create-btn" onClick={() => setShowCreateModal(true)}>
            + Nový seznam
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