// controllers/messagesController.js

const db = require("../db/queries");

// //links variables
// const links = [
//   { href: "/", text: "Home" },
//   { href: "new", text: "New Message" },
// ];

async function itemsListGet(req, res) {
  console.log("accessing database...");
  const items = await db.getAllItems();
  console.log("items: ", items);
  res.json(items);
}

module.exports = {
  itemsListGet,
};
