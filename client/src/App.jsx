import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AddItemForm from "./components/AddItemForm";
import ItemList from "./components/ItemList";
import { fetchItems, updateItem, deleteItem } from "./api/api.js";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await fetchItems();
    setItems(data);
  };

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
    loadItems();
  };

  const handleUpdateItem = async (id) => {
    // if (!name) return;
    // await updateItem(id, {
    //   name,
    //   category: "Default",
    //   image_url: "",
    //   last_used: "2025-02-09",
    // });
    // setName("");
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
        <AddItemForm onItemAdded={handleAddItem} />
        <ItemList items={items} onDelete={handleDeleteItem} />
      </div>
    </>
  );
}

export default App;
