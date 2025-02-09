// routes/indexRouter.js
const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const indexRouter = Router();

//messagesRouter.get("/", messagesController.messagesListGet);

//Display All Items
indexRouter.get("/items", itemsController.itemsListGet);

//Add new item
indexRouter.post("/newItem", itemsController.newItemPost);

//Edit existing item id
indexRouter.put("/:id", itemsController.updateItemPut);

//Delete existing item id
indexRouter.delete("/:id", itemsController.deleteItem);

module.exports = indexRouter;
