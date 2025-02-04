const pool = require("./pool");

async function getAllItems() {
  console.log("retrieving items...");
  const { rows } = await pool.query("SELECT * FROM items");
  return rows;
}

module.exports = {
  getAllItems,
};
