const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const todos = require("./apis.js");
const port = process.env.PORT || 3000;
const mongoUrl = process.env.MONGO_URI;
const prodOrigins = [process.env.ORIGIN_1,process.env.ORIGIN_2]
const devOrigins = ['http://localhost:5173',]
const allowedOrigins = process.env.NODE_ENV === 'production' ? prodOrigins : devOrigins
app.use(cors({
  origin:(origin,callback)=>{
    if(allowedOrigins.includes(origin)){
      console.log(origin,allowedOrigins)
      callback(null,true)
    }else{
      callback(new Error('Not allowed'))
    }
  },
  credentials : true,
  methods : ['GET','POST','PATCH','DELETE']
}));
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