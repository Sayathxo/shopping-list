import { useState } from "react";
import { useTranslation } from "react-i18next";

function ListHeader({ name, isOwner, onRename, onClose }) {
  const { t } = useTranslation();
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
          <button className="save-btn" onClick={handleSubmit}>{t("save")}</button>
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
