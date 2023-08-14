const express = require('express');
const router = express.Router();
const Todo = require('./../models/Todo'); // Assuming Todo is the Mongoose model for tasks

router.get('/todo/mongo', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.render("todos", {
            tasks: (todos.length > 0 ? todos : {}),
            base: "/todo/mongo"
        });
    } catch (err) {
        console.log(err);
        res.sendStatus(500); // Handle the error appropriately in your application
    }
});

// POST - Submit Task
router.post('/todo/mongo', async (req, res) => {
    try {
        const newTask = new Todo({
            task: req.body.task
        });
        await newTask.save();
        res.redirect('/todo/mongo');
    } catch (err) {
        console.log(err);
        res.sendStatus(500); // Handle the error appropriately in your application
    }
});

// POST - Destroy todo item
router.post('/todo/mongo/destroy', async (req, res) => {
    const taskKey = req.body._key;
    try {
        await Todo.findOneAndDelete({ _id: taskKey });
        res.redirect('/todo/mongo');
    } catch (err) {
        console.log(err);
        res.sendStatus(500); // Handle the error appropriately in your application
    }
});


// POST - Destroy todo item
router.post('/todo/mongo/destroyall', async (req, res) => {
    const taskKey = req.body._key;
    try {
        await Todo.deleteMany({});
        res.redirect('/todo/mongo');
    } catch (err) {
        console.log(err);
        res.sendStatus(500); // Handle the error appropriately in your application
    }
});

module.exports = router;