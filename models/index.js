const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.connect('mongodb://localhost:27017/todo-app', {useNewUrlParser: true})
.then(() => console.log('connected to data base'))
mongoose.Promise = Promise;

module.exports.Todo = require('./todo');