function ItemRow({ name, resolved, onDelete, onResolve }) {
  return (
    <div className="item-row">
      <input type="checkbox" checked={resolved} onChange={onResolve} />
      <span className={resolved ? "resolved" : ""}>{name}</span>
      <button className="item-delete-btn" onClick={onDelete}>🗑</button>
    </div>
  );
}

export default ItemRow;