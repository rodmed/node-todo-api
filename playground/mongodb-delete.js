// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDb server');
    }

    console.log('Connected to MongoDB server');

    // deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Launch'}).then( (result) => {
    //     console.log(result);
    // });


    // deleteOne
    // db.collection('Todos').deleteOne({text: 'OI OI OI '}).then( (result) => {
    //     console.log(result);
    // });
   
    // findOneAndDelete
    // db.collection('Todos').findOneAndDelete({text: 'OI OI OI'}).then( (res) => {
    //     console.log(res);
    // })

    //db.close();
});