const express = require('express');
const Todo = require('./../models/Todo');

const router = express.Router();


router.get('/todo', (req, res) => {

    Todo.find({}, (err, todos) => {

        res.render("todos", {
            tasks: (Object.keys(todos).length > 0 ? todos : {})
        });
    });
});

// POST - Submit Task
router.post('/todo', (req, res) => {
    const newTask = new Todo({
        task: req.body.task
    });

    newTask.save()
    .then(task => res.redirect('/todo'))
    .catch(err => console.log(err));
});

// POST - Destroy todo item
router.post('/todo/destroy', (req, res) => {
    const taskKey = req.body._key;

    Todo.findOneAndRemove({_id: taskKey}, (err) => {

        if(err) console.log(err);
        res.redirect('/todo');
    });
});


module.exports = router;