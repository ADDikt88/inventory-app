// Load environment variables
require("dotenv").config();
// config dotenv file

const express = require("express");
const cors = require("cors");

const app = express();
const indexRouter = require("./routes/indexRouter");

//Can connect on multiple local servers
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
};

app.use(cors(corsOptions));

// const fs = require("fs");
// const url = require("url");
const path = require("node:path");
const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

//set up middleware parser
//app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/", indexRouter);

//listen
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Inventory App - listening on port ${PORT}!`);
});
