import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

import routes from "./routes/index.js";

const app = express();
dotenv.config();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static("uploads"));
app.use(
  bodyParser.raw({
    type: "image/png",
    limit: "10mb",
  })
);
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("This is a shopping site API");
});

app.use("/", routes);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((err) => console.log(err.message));
