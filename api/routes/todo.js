const Todo = require("../models/Todo");
const router = require("express").Router();

//GET TODO
router.get("/", async (req, res) => {
    try {
        const todo = await Todo.find();
        res.status(200).json(todo);
    } catch (err) {
        res.status(500).json(err);
    }
});

//CREATE
router.post("/new", async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        const savedTodo = await newTodo.save();
        res.status(200).json(savedTodo)
    } catch (error) {
        res.status(500).json(error);

    }
})

//Delete
router.delete("/delete/:id", async (req, res) => {
    try {
        const result = await Todo.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (err) {
        res.status(500).json(err);
    }
});

//COMPLETE
router.put("/complete/:id", async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        todo.complete = !todo.complete;
        todo.save();
        res.json(todo)
    } catch (err) {
        res.status(501).json(err)
    }
})



module.exports = router;


