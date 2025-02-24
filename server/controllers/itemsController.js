// controllers/messagesController.js

const db = require("../db/queries");
// Multer for file upload handling
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temporary storage for images

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
  console.log("adding a new item...", req.body);

  if (req.file) {
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);
    imageUrl = result.secure_url;
    req.body.image_url = imageUrl;
  }

  await db.insertNewItem(req.body);
  res.json({
    message: "Item added successfully",
  });
}

async function updateItemPut(req, res) {
  console.log("updating this item id: ", req.params.id);
  const itemId = parseInt(req.params.id, 10);
  const newItem = await db.updateItem(itemId, req.body);
  res.json({
    message: "Item updated successfully",
    newItem,
  });
}

async function deleteItem(req, res) {
  console.log("deleting this item id: ", req.params.id);
  const itemId = parseInt(req.params.id, 10);
  await db.deleteItem(itemId);
  res.json({
    message: "Item deleted successfully",
  });
}

module.exports = {
  itemsListGet,
  newItemPost,
  updateItemPut,
  deleteItem,
  upload,
};
