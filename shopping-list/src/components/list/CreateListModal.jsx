import { useState } from "react";
import { useTranslation } from "react-i18next";

function CreateListModal({ onConfirm, onClose }) {
  const { t } = useTranslation();
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) return;
    onConfirm(trimmed);
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t("createListTitle")}</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <label className="modal-label" htmlFor="list-name">{t("listNameLabel")}</label>
          <input
            id="list-name"
            className="modal-input"
            type="text"
            placeholder={t("listNamePlaceholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button type="button" className="modal-btn-cancel" onClick={onClose}>{t("cancel")}</button>
            <button type="submit" className="modal-btn-confirm" disabled={!name.trim()}>{t("create")}</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateListModal;
