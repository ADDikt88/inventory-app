// routes/indexRouter.js
const { Router } = require("express");
const itemsController = require("../controllers/itemsController");
const indexRouter = Router();

//messagesRouter.get("/", messagesController.messagesListGet);
indexRouter.get("/items", itemsController.itemsListGet);

// messagesRouter.get("/edit/:id", messagesController.messagesUpdateGet);
// messagesRouter.post("/edit/:id", messagesController.messagesUpdatePost);

// messagesRouter.post("/delete/:id", messagesController.messagesDeletePost);

module.exports = indexRouter;
