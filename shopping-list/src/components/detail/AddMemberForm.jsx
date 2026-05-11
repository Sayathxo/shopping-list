import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddMemberForm({ availableUsers, onSubmit }) {
  const { t } = useTranslation();
  const [selectedId, setSelectedId] = useState("");

  function handleSubmit() {
    if (!selectedId) return;
    onSubmit(selectedId);
    setSelectedId("");
  }

  return (
    <div>
      <p className="form-label">{t("addMember")}</p>
      <div className="add-member-form">
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">{t("selectMember")}</option>
          {availableUsers.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <button onClick={handleSubmit}>{t("add")}</button>
      </div>
    </div>
  );
}

export default AddMemberForm;
