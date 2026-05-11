import { useTranslation } from "react-i18next";

function DeleteConfirmModal({ listName, onConfirm, onClose }) {
  const { t } = useTranslation();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{t("deleteListTitle")}</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p className="modal-text">
            {t("deleteListConfirm")} <strong>„{listName}"</strong>?
          </p>
          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={onClose}>{t("cancel")}</button>
            <button className="modal-btn-delete" onClick={onConfirm}>{t("delete")}</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
