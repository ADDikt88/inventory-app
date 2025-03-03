const pool = require("./pool");

async function getAllItems() {
  console.log("retrieving items...");
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function insertNewItem(newItem) {
  let {
    name,
    category,
    image_url,
    last_used,
    age_range,
    quantity,
    description,
  } = newItem;

  // If date is empty, use the current timestamp
  if (!last_used) {
    last_used = new Date().toISOString().split("T")[0]; // YYYY-MM-DD format
  }
  const { rows } = await pool.query(
    "INSERT INTO items (name, category, image_url, last_used, age_range, quantity, description, time_added) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *",
    [
      name,
      category,
      image_url,
      last_used || NOW(),
      age_range,
      quantity,
      description || null,
    ]
  );
  return rows;
}

async function updateItem(id, updatedItem) {
  const {
    name,
    category,
    image_url,
    last_used,
    age_range,
    quantity,
    description,
  } = updatedItem;
  await pool.query(
    "UPDATE items SET name=$1, category=$2, image_url=$3, last_used=$4, age_range=$5, quantity=$6, description=$7, time_added=NOW() WHERE id=$8 RETURNING *",
    [
      name,
      category,
      image_url,
      last_used,
      age_range,
      quantity,
      description || null,
      id,
    ]
  );
}

async function deleteItem(id) {
  await pool.query("DELETE FROM items WHERE id=$1 RETURNING *", [id]);
}

module.exports = {
  getAllItems,
  insertNewItem,
  updateItem,
  deleteItem,
};
