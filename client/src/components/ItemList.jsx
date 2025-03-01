import { fetchItems, deleteItem } from "../api/api.js"; // Import API function
import { useState, useEffect } from "react";

function ItemList({ items }) {
  const [displayItems, setDisplayItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //Sort mode
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

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
      <h1>Current Inventory</h1>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
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
              {
                <>
                  <td>
                    <div className="name-image-cell">
                      {item.name}
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
                  <td>{item.category}</td>
                  <td>{item.ageRange}</td>
                  <td>{item.quantity}</td>
                  <td>
                    {new Date(item.last_used).toISOString().split("T")[0]}
                  </td>
                  <td>{item.description}</td>
                </>
              }
              <td>
                <div className="edit-del-cell">
                  <button
                    className="edit-btn"
                    onClick={(e) =>
                      e.preventDefault()
                    } /*Impelement edit mode soon... */
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ItemList;
