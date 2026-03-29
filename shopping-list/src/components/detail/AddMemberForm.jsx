import { useState } from "react";

function AddMemberForm({ onSubmit }) {
  const [value, setValue] = useState("");

  function handleSubmit() {
    if (!value.trim()) return;
    onSubmit(value.trim());
    setValue("");
  }

  return (
    <div className="add-member-form">
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Jméno člena"
      />
      <button onClick={handleSubmit}>Přidat</button>
    </div>
  );
}

export default AddMemberForm;