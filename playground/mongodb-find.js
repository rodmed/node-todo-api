// const MongoClient = require('mongodb').MongoClient;

const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err){
        return console.log('Unable to connect to MongoDb server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').find({
    //         _id: new ObjectID('58b3ded5dfbe041802c450be')
    //         }).toArray().then((docs) => {
    //     console.log('TODOS');
    //     console.log(JSON.stringify(docs,undefined,2))
    // }, (err) => {
    //     console.log('Unable to get Todos!')
    // })

    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`'Todos count' ${count}`);
    // }, (err) => {
    //     console.log('Unable to get Todos!')
    // })

    
    db.collection('Users').find({name: 'Rodrigo'}).count().then((count) => {
        console.log(`Rodrigo count' ${count}`);
    }, (err) => {
        console.log('Did not found any Rodrigo !')
    })


    //db.close();
});