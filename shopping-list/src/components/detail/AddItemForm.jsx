import { useState } from "react";

function AddItemForm({ onSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div className="add-item-form">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Název položky"
      />
      <button onClick={handleSubmit}>Přidat</button>
    </div>
  );
}

export default AddItemForm;