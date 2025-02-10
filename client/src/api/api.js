const API_BASE_URL = "http://localhost:3000";

// Fetch all items
export const fetchItems = async () => {
  console.log("Sending GET request...");
  const response = await fetch(`${API_BASE_URL}/items`);
  return response.json();
};

// Add a new item
export const addItem = async (itemData) => {
  console.log("Sending POST request...");
  const response = await fetch(`${API_BASE_URL}/newItem`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  return response.json();
};

// Update an item
export const updateItem = async (id, itemData) => {
  console.log("Sending PUT request for ID: ", id);
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(itemData),
  });
  return response.json();
};

// Delete an item
export const deleteItem = async (id) => {
  console.log("Sending DELETE request for ID: ", id);
  await fetch(`${API_BASE_URL}/${id}`, { method: "DELETE" });
};
