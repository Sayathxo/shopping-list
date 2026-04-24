import { useState } from "react";

function CreateListModal({ onConfirm, onClose }) {
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
          <h2>Nový nákupní seznam</h2>
          <button className="modal-close-btn" onClick={onClose}>✕</button>
        </div>
        <form onSubmit={handleSubmit} className="modal-body">
          <label className="modal-label" htmlFor="list-name">Název seznamu</label>
          <input
            id="list-name"
            className="modal-input"
            type="text"
            placeholder="Zadejte název..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button type="button" className="modal-btn-cancel" onClick={onClose}>Zrušit</button>
            <button type="submit" className="modal-btn-confirm" disabled={!name.trim()}>Vytvořit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateListModal;
