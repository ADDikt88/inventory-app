// routes/indexRouter.js
const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const indexRouter = Router();
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Temp file storage

//messagesRouter.get("/", messagesController.messagesListGet);

//Display All Items
indexRouter.get("/items", itemsController.itemsListGet);

//Add new item
indexRouter.post(
  "/newItem",
  upload.single("image"),
  itemsController.newItemPost
);

//Edit existing item id
indexRouter.put("/:id", itemsController.updateItemPut);

//Delete existing item id
indexRouter.delete("/:id", itemsController.deleteItem);

module.exports = indexRouter;
