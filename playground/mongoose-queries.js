const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo}= require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '58b6d7a061427540340e65621';

// if(!ObjectID.isValid(id)) {
//     return console.log('ID not valid');
// }

// Todo.find({
//     _id: id
// }).then((todos)=>{
//     console.log('Todos\n', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todo)=>{
//     console.log('Single Todo \n', todo);
// });

// Todo.findById(id).then((todo) => {
//     if(!todo){
//         return console.log('ID not FOUND');
//     }
//     console.log('Todo By Id\n', todo);
// }).catch((e)=> {
//     console.log(e);
// });

//find by id USER 

var userID = '58b692310a1f395412cbed87';
if (!ObjectID.isValid(userID)){
    console.log('Invalid ID');
} else {
    User.findById(userID).then( (user) =>{
        if(!user) {
         return console.log('User NotFound');
        }
        console.log('Here the User:,', JSON.stringify(user,undefined,2));
    }, (err) => {
        console.log('Error occured',e);
    });
}


