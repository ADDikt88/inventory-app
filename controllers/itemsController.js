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

async function newItemPost(req, res) {
  console.log("adding a new item...");
  await db.insertNewItem(req.body);
  res.redirect("/items");
}

async function updateItemPut(req, res) {
  console.log("updating this item id: ", req.params.id);
  const itemId = parseInt(req.params.id, 10);
  await db.updateItem(itemId, req.body);
  res.redirect("/items");
}

async function deleteItem(req, res) {
  console.log("deleting this item id: ", req.params.id);
  const itemId = parseInt(req.params.id, 10);
  await db.deleteItem(itemId);
  res.redirect("/items");
}

module.exports = {
  itemsListGet,
  newItemPost,
  updateItemPut,
  deleteItem,
};
