import ShoppingListCard from "./ShoppingListCard";
import { useNavigate } from "react-router-dom";

function ShoppingListsGrid({ lists, currentUser, onDeleteList }) {
  const navigate = useNavigate();

  return (
    <div className="lists-cards">
      {lists.map((list) => (
        <ShoppingListCard
          key={list.id}
          id={list.id}
          name={list.name}
          items={list.items}
          memberCount={list.members.length}
          isOwner={list.ownerId === currentUser.id}
          onOpenList={(id) => navigate(`/lists/${id}`)}
          onDeleteList={onDeleteList}
        />
      ))}
    </div>
  );
}

export default ShoppingListsGrid;