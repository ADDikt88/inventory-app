const pool = require("./pool");

async function getAllItems() {
  console.log("retrieving items...");
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

async function insertNewItem(newItem) {
  const { name, category, image_url, last_used } = newItem;
  await pool.query(
    "INSERT INTO items (name, category, image_url, last_used, time_added) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
    [name, category, image_url, last_used]
  );
}

async function updateItem(id, updatedItem) {
  const { name, category, image_url, last_used } = updatedItem;
  await pool.query(
    "UPDATE items SET name=$1, category=$2, image_url=$3, last_used=$4, time_added=NOW() WHERE id=$5 RETURNING *",
    [name, category, image_url, last_used, id]
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
