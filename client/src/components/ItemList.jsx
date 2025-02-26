import { fetchItems, deleteItem } from "../api/api.js"; // Import API function
import { useState, useEffect } from "react";

function ItemList({ items }) {
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems();
      setDisplayItems(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  //fetch items with useEffect
  useEffect(() => {
    console.log("Items: ", items);

    if (items === undefined) loadItems();
    else {
      let result = [...items];
      setLoading(false);
      setDisplayItems(result);
    }
  }, [items]); // Empty dependency array means this runs once on mount

  if (loading) return <p>Loading items....</p>;
  if (error) return <p>Error: {error}</p>;

  const handleDelete = (id) => {
    deleteItem(id); // delete item
    setDisplayItems(displayItems.filter((item) => item.id !== id));
    //loadItems();
  };

  return (
    <div>
      <h1>Current Inventory</h1>
      <ul>
        {displayItems.map((item) => (
          <li key={item.id}>
            {item.id} - {item.name} - {item.category} - Last Used:{" "}
            {item.last_used}
            <button key={item.id} onClick={() => handleDelete(item.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ItemList;
