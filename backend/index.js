const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();
const todos = require("./apis.js");
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;

// Configure CORS to allow requests from specific origins
const corsOptions = {
  origin:'https://full-stack-todo-app-sigma.vercel.app/', // Replace '*' with your frontend's URL in production
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/todos", todos);

mongoose.connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error(err));

app.listen(port, () => console.log(`Server running at http://localhost:${port}`));
