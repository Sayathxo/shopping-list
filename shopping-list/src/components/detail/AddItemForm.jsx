import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddItemForm({ onSubmit }) {
  const { t } = useTranslation();
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <div>
      <p className="form-label">{t("addItem")}</p>
      <div className="add-item-form">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t("addItemPlaceholder")}
        />
        <button onClick={handleSubmit}>{t("add")}</button>
      </div>
    </div>
  );
}

export default AddItemForm;
