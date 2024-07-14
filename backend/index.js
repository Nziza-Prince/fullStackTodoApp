const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todos = require("./apis.js");
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;
app.use(cors(
    {
        origin:['https://full-stack-todo-app-r9wu.vercel.app'],
        methods:["POST","PATCH","GET","DELETE"],
        credentials : true,
        allowedHeaders: ['Content-Type', 'Authorization']
    }
));

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