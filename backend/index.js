const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todos = require("./apis.js");
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;
app.use(cors());

app.use(express.json());
app.use("/todos", todos);

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);
app.get("/",(req,res)=>{
    res.send("yes it worked")
})