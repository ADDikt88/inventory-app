// Load environment variables
require("dotenv").config();
// config dotenv file

const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");

// const fs = require("fs");
// const url = require("url");
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//set up middleware parser
//app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", indexRouter);

//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Mini message board - listening on port ${PORT}!`);
});
