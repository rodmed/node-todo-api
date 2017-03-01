const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User} = require('./../server/models/user');

// Todo.remove({}).then( (result) => {
//     console.log(result);
// });

//Todo.findOneAndRemove() return
//Todo.findByIdAndRemove() return

Todo.findOneAndRemove({_id:'58b71f9c4a717e9439cfa99a'}).then((todo) => {
    console.log(todo);
}, (err) => {
    console.log(err);
})