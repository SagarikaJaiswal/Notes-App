require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const app = express();

const userRoutes = require("./src/routes/userRoutes");
const noteRoutes = require("./src/routes/noteRoutes");

mongoose
  .connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "notes-app",
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) =>
    console.error("Error occurred while connecting to db", error)
  );

app.use(express.json());
app.use("/api/auth", userRoutes);
app.use("/api/notes", noteRoutes);

app.listen(3000, () => {
  console.log("Server listening to port 3000.....");
});
