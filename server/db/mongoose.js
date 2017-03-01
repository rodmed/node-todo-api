var mongoose = require ('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

// save another something




module.exports = {mongoose};