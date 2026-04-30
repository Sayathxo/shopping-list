import { useState } from "react";

function AddMemberForm({ availableUsers, onSubmit }) {
  const [selectedId, setSelectedId] = useState("");

  function handleSubmit() {
    if (!selectedId) return;
    onSubmit(selectedId);
    setSelectedId("");
  }

  return (
    <div className="add-member-form">
      <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
        <option value="">Vyberte uživatele</option>
        {availableUsers.map((u) => (
          <option key={u.id} value={u.id}>
            {u.name}
          </option>
        ))}
      </select>
      <button onClick={handleSubmit}>Přidat</button>
    </div>
  );
}

export default AddMemberForm;
