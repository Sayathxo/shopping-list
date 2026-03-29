import { useState } from "react";

function ListHeader({ name, isOwner, onRename, onClose }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  function handleSubmit() {
    onRename(value);
    setEditing(false);
  }

  return (
    <div className="detail-header">
      {editing ? (
        <>
          <input
            className="rename-input"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button className="save-btn" onClick={handleSubmit}>Uložit</button>
        </>
      ) : (
        <>
          <h2>{name}</h2>
          {isOwner && (
            <button className="rename-btn" onClick={() => setEditing(true)}>✎</button>
          )}
        </>
      )}
      <button className="close-btn" onClick={onClose}>✕</button>
    </div>
  );
}

export default ListHeader;