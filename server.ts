const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
import { Application } from "express";
import { connectDB } from "./src/config/db.config";

const app: Application = express();

const routes = require("./src/routes/index");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// enable cors
app.use(
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);
app.options(
  "*",
  cors({
    origin: true,
    optionsSuccessStatus: 200,
    credentials: true,
  })
);

// connect to MongoDB
connectDB();

app.use("/api/parkinglot", routes);

app.listen(5000, () => {
  console.log(`✅ SERVER IS RUNNING ON PORT 5000`);
});
