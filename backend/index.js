const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todos = require("./apis.js");

const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;

// Define allowed origins based on NODE_ENV
const prodOrigins = [
  "https://full-stack-todo-app-phi.vercel.app/"
];
const devOrigins = ['http://localhost:5173'];
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins;

// CORS middleware configuration
app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed'));
    }
  },
  credentials: true, // You may or may not need this depending on your application's requirements
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}));

app.use(express.json());
app.use("/todos", todos);

mongoose
  .connect(mongoUrl)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.listen(port, () =>
  console.log(`Server running at http://localhost:${port}`)
);

app.get("/", (req, res) => {
  res.send("Server is up and running");
});
