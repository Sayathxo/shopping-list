import { useState } from "react";
import { SHOPPING_LISTS, CURRENT_USER } from "../constants/data";
import PageHeader from "../components/list/PageHeader";
import ShoppingListsGrid from "../components/list/ShoppingListsGrid";

function ShoppingListsPage() {
  const [lists, setLists] = useState(SHOPPING_LISTS);

  function handleCreateList() {
    const newList = {
      id: "list" + Date.now(),
      name: "Nový seznam",
      ownerId: CURRENT_USER.id,
      archived: false,
      members: [CURRENT_USER],
      items: [],
    };
    setLists([...lists, newList]);
  }

  function handleDeleteList(listId) {
    setLists(lists.filter((l) => l.id !== listId));
  }

  return (
    <div className="page-wrapper">
      <PageHeader title="Nákupní seznamy" userName={CURRENT_USER.name} />
      <div className="lists-container">
        <div className="lists-toolbar">
          <button className="create-btn" onClick={handleCreateList}>Nový seznam</button>
        </div>
        <ShoppingListsGrid
          lists={lists}
          currentUser={CURRENT_USER}
          onDeleteList={handleDeleteList}
        />
      </div>
    </div>
  );
}

export default ShoppingListsPage;