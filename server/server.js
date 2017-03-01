const _ = require('lodash');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require ('./db/mongoose');
var {User} = require ('./models/user');
var {Todo} = require ('./models/todo');

const PORT = process.env.PORT || 3000;

var app = express(); 

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    })

    todo.save().then( (doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {
    Todo.find({}).then ( (todos)=>{
        res.send({todos})
    }, (err) => {
        res.status(400).send(e);
    })
})

// GET /todos/:iD
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid) {
        return res.status(404).send();
    }
    
    Todo.findById(id).then((todo) => {
        if (!todo) {
            res.status(404).send();
        }

        res.status(200).send({todo});
    }, (err)=> res.status(400).send())
    .catch( (err)=> res.status(400).send() );
});

// GET /todos/:iD
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    if (!ObjectID.isValid) {
        return res.status(404).send();
    }
    Todo.findByIdAndRemove(id).then( (todo) => {
        if (!todo) {
            res.status(404).send();
        }
        
        res.status(200).send({todo});
    }, (err) => { 
        res.status(400).send()
    });
        
    
});

app.listen(PORT, () => {
    console.log(`Started on port ${PORT}`);
});
 
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['text', 'completed']);

    if (!ObjectID.isValid) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true} ).then( (todo) => {
        if (!todo) {
            res.status(404).send();
        }
        res.status(200).send({todo});
    }, (err) => { 
        res.status(400).send();
    });
});    

module.exports = {app};