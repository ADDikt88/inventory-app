import { useState } from "react";
import { addItem } from "../api/api.js"; // Import API function

const AddItemForm = ({ onItemAdded }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [dateLastUsed, setDateLastUsed] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !dateLastUsed) {
      alert("Please fill all fields");
      return;
    }

    const newItem = { name, category, image_url: "", last_used: dateLastUsed };
    const addedItem = await addItem(newItem);
    onItemAdded(addedItem); // Update parent state
    setName("");
    setCategory("");
    setDateLastUsed("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Item Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="date"
        value={dateLastUsed}
        onChange={(e) => setDateLastUsed(e.target.value)}
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default AddItemForm;
