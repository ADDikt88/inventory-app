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
            {item.id} - {item.name} - {item.category} - {item.ageRange} -{" "}
            {item.quantity} - {item.description}
            Last Used: {
              new Date(item.last_used).toISOString().split("T")[0]
            } -{" "}
            {item.image_url ? (
              <img
                src={item.image_url}
                alt={`${item.name}`}
                style={{
                  maxWidth: "100px",
                  maxHeight: "100px",
                  display: "inline-block",
                  margin: "8px 0",
                }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "";
                }}
              />
            ) : (
              <span>No image available</span>
            )}{" "}
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
