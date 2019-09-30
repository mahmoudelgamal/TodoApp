const express = require('express');
const router = express.Router();
const db = require('../models')

router.get('/', (req, res) => {
    db.Todo.find()
    .then((todos) => {
        res.json(todos)
    })
    .catch((err) => {
        res.send(err)
    })
})
router.post('/', (req, res) => {
    db.Todo.create(req.body)
    .then((newTodo) => {
        res.json(newTodo)
    })
    .catch((err) => {
        res.send(err)
    })
})

router.get('/:todoId', (req, res) => {
    db.Todo.findById(req.params.todoId)
    .then((foundTodo) => {
        res.json(foundTodo)
    })
    .catch((err) => {
        res.send(err)
    })
})

router.put('/:todoId', (req, res) => {
    db.Todo.findOneAndUpdate({_id:req.params.todoId}, req.body, {new: true})
    .then((todo) => {
        res.json(todo)
    })
    .catch((err) => {
        res.send(err)
    })
})
router.delete('/:todoId', (req, res) => {
    db.Todo.remove({_id:req.params.todoId})
    .then(() => {
        res.send({message : 'we deteted it'})
    })
    .catch((err) => {
        res.send(err)
    })
})

module.exports = router