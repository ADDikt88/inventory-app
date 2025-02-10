import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { fetchItems, addItem, updateItem, deleteItem } from "./api/api.js";

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  // const [category, setCategory] = useState("");
  // const [lastUsed, setLastUsed] = useState("");

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data);
  };

  const handleAddItem = async () => {
    if (!name) return;
    await addItem({
      name,
      category: "Default",
      image_url: "",
      last_used: "2025-02-09",
    });
    setName("");
    loadItems();
  };

  const handleUpdateItem = async (id) => {
    if (!name) return;
    await updateItem(id, {
      name,
      category: "Default",
      image_url: "",
      last_used: "2025-02-09",
    });
    setName("");
    loadItems();
  };

  const handleDeleteItem = async (id) => {
    await deleteItem(id);
    loadItems();
  };

  return (
    <>
      <div>
        <h1>Evelyn&apos;s Inventory</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter new item"
        />
        <button onClick={handleAddItem}>Add Item</button>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name} {item.category} {item.image_url} {item.last_used}{" "}
              <button onClick={() => handleDeleteItem(item.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
