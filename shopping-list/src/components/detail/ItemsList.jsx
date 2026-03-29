import ItemRow from "./ItemRow";

function ItemsList({ items, onDeleteItem, onResolveItem }) {
  return (
    <div className="items-list">
      {items.map((item) => (
        <ItemRow
          key={item.id}
          id={item.id}
          name={item.name}
          resolved={item.resolved}
          onDelete={() => onDeleteItem(item.id)}
          onResolve={() => onResolveItem(item.id)}
        />
      ))}
    </div>
  );
}

export default ItemsList;