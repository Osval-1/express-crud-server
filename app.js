const express = require("express");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/message.routes");
require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGOURL);
mongoose.connection.on("connected", () => {
  console.log("connected to MongoDB");
});
mongoose.connection.on("error", (error) => {
  console.log("connection error", error);
});

app.use(express.json());
app.use("/message", messageRoutes);

app.listen(process.env.PORT, () => {
  console.log("server connected on Port", process.env.PORT);
});
