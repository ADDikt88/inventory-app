import { fetchItems, deleteItem, updateItem } from "../api/api.js"; // Import API function
import { useState, useEffect } from "react";

function ItemList({ items }) {
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Sort mode
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  //Edit mode
  const [editingItemId, setEditingItemId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  const loadItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchItems();
      console.log("new display items");
      setDisplayItems(
        data.sort((a, b) => {
          return a["time_added"].toLowerCase() < b["time_added"].toLowerCase()
            ? 1
            : -1;
        })
      );
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
      setDisplayItems(
        result.sort((a, b) => {
          return a["time_added"].toLowerCase() < b["time_added"].toLowerCase()
            ? 1
            : -1;
        })
      );
    }
  }, []); // Empty dependency array means this runs once on mount

  if (loading) return <p>Loading items....</p>;
  if (error) return <p>Error: {error}</p>;

  const startEditing = (item) => {
    setEditingItemId(item.id);
    setEditedItem(item); // Load existing values into state
  };

  const handleDelete = (id) => {
    deleteItem(id); // delete item
    setDisplayItems(displayItems.filter((item) => item.id !== id));
    //loadItems();
  };

  const handleSave = async (item) => {
    setEditingItemId(null);
    await updateItem(item.id, item);
    await loadItems();
  };

  const handleSort = (keyChoice) => {
    let directionChoice = "asc";
    if (sortConfig.key === keyChoice && sortConfig.direction === "asc") {
      console.log("switching to desc");
      directionChoice = "desc";
    }
    setSortConfig({ key: keyChoice, direction: directionChoice });

    setDisplayItems(
      displayItems.sort((a, b) => {
        //set conditions

        if (keyChoice === "quantity") {
          if (sortConfig.key !== keyChoice) {
            console.log("new choice ", keyChoice);
            return a[keyChoice] > b[keyChoice] ? 1 : -1;
          }
          if (directionChoice === "asc") {
            console.log("asc ");
            return a[sortConfig.key] > b[sortConfig.key] ? 1 : -1;
          }
          if (directionChoice === "desc") {
            console.log("desc ");
            return a[sortConfig.key] < b[sortConfig.key] ? 1 : -1;
          }
        } else {
          if (sortConfig.key !== keyChoice) {
            console.log("new choice ", keyChoice);
            return a[keyChoice].toLowerCase() > b[keyChoice].toLowerCase()
              ? 1
              : -1;
          }
          if (directionChoice === "asc") {
            console.log("asc ");
            return a[sortConfig.key].toLowerCase() >
              b[sortConfig.key].toLowerCase()
              ? 1
              : -1;
          }
          if (directionChoice === "desc") {
            console.log("desc ");
            return a[sortConfig.key].toLowerCase() <
              b[sortConfig.key].toLowerCase()
              ? 1
              : -1;
          }
        }
      })
    );
  };

  return (
    <div>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Image</th>
            <th onClick={() => handleSort("name")}>
              Name{" "}
              {sortConfig.key === "name"
                ? sortConfig.direction === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}
            </th>
            <th onClick={() => handleSort("category")}>
              Category{" "}
              {sortConfig.key === "category"
                ? sortConfig.direction === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}
            </th>
            <th>Age Range</th>
            <th onClick={() => handleSort("quantity")}>
              Quantity{" "}
              {sortConfig.key === "quantity"
                ? sortConfig.direction === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}
            </th>
            <th onClick={() => handleSort("last_used")}>
              Date Last Used{" "}
              {sortConfig.key === "last_used"
                ? sortConfig.direction === "asc"
                  ? "⬆"
                  : "⬇"
                : ""}
            </th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayItems.map((item) => (
            <tr key={item.id}>
              {editingItemId === item.id ? (
                <>
                  <td>
                    <div className="name-image-cell">
                      {item.image_url ? (
                        <img
                          className="item-image"
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
                      )}
                    </div>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedItem.name}
                      onChange={(e) =>
                        setEditedItem({ ...editedItem, name: e.target.value })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedItem.category}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          category: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={editedItem.age_range ? editedItem.age_range : ""}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          age_range: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      value={editedItem.quantity ? editedItem.quantity : 1}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          quantity: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      value={editedItem.last_used ? editedItem.last_used : ""}
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          last_used: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <textarea
                      value={
                        editedItem.description ? editedItem.description : ""
                      }
                      onChange={(e) =>
                        setEditedItem({
                          ...editedItem,
                          description: e.target.value,
                        })
                      }
                    />
                  </td>
                  <td>
                    <div className="edit-del-cell">
                      <button
                        className="del-btn"
                        onClick={() => handleSave(editedItem)}
                      >
                        Save
                      </button>
                      <button
                        className="edit-btn"
                        onClick={() => setEditingItemId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <div className="name-image-cell">
                      {item.image_url ? (
                        <img
                          className="item-image"
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
                      )}
                    </div>
                  </td>
                  <td>{item.name}</td>
                  <td>{item.category}</td>
                  <td>{item.age_range}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {new Date(item.last_used).toISOString().split("T")[0]}
                  </td>
                  <td>{item.description}</td>
                  <td>
                    <div className="edit-del-cell">
                      <button
                        className="edit-btn"
                        onClick={() => startEditing(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="del-btn"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
