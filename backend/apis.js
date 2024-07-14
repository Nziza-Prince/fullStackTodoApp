const express = require("express");
const router = express.Router();
const Todo = require("./models.js");


router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.send(todos);
  } catch (err) {
    res.status(500).send("Couldn't fetch todos");
  }
});


router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Todo not found");
    }
    res.send(todo);
  } catch (err) {
    res.status(500).send(err);
  }
});
//creating a todo 
router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    completed: req.body.completed,
  });
  try {
    const newTodo = await todo.save();
    res.send(newTodo);
  } catch (err) {
    res.status(500).send(err);
  }
});
router.patch("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).send("Couldn't get task");
    }
    if (req.body.title != null) {
      todo.title = req.body.title;
    }
    if (req.body.completed != null) {
      todo.completed = req.body.completed;
    }
    const updatedTodo = await todo.save();
    res.send(updatedTodo);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});


router.delete("/:id", async (req, res) => {
    try {
      const todo = await Todo.findByIdAndDelete(req.params.id);
      if (!todo) {
        return res.status(404).send("Couldn't find the task with such ID");
      }
      res.send(`Removed ${todo.title} successfully`);
    } catch (err) {
      res.status(500).send("Something went wrong");
    }
  });
  
  router.get("/status/incomplete", async (req, res) => {
    try {
      const incompleteTodos = await Todo.find({ completed: false });
      res.send(incompleteTodos);
    } catch (err) {
      res.status(500).send("Couldn't fetch incomplete todos");
    }
  });
  
  // Fetch complete tasks
  router.get("/status/complete", async (req, res) => {
    try {
      const completeTodos = await Todo.find({ completed: true });
      res.send(completeTodos);
    } catch (err) {
      res.status(500).send("Couldn't fetch complete todos");
    }
  });
  
module.exports = router;
