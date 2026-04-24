function DeleteConfirmModal({ listName, onConfirm, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Smazat seznam</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <p className="modal-text">
            Opravdu chcete smazat seznam <strong>„{listName}"</strong>? Tato akce je nevratná.
          </p>
          <div className="modal-actions">
            <button className="modal-btn-cancel" onClick={onClose}>Zrušit</button>
            <button className="modal-btn-delete" onClick={onConfirm}>Smazat</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmModal;
