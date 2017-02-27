// const MongoClient = require('mongodb').MongoClient;

const { MongoClient, ObjectID } = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if (err) {
        return console.log('Unable to connect to MongoDb server');
    }

    console.log('Connected to MongoDB server');

    // db.collection('Todos').findOneAndUpdate({ _id: new ObjectID('58b3db8fadc72e362ce5835a') }, {
    //     $set: {
    //         completed: false
    //     }
    // }, {
    //     returnOriginal: false
    // }).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndUpdate({ _id: new ObjectID('58b3dc2a1a69e32ba0939dc3') }, {
        $set: {
            name: 'Rodrigo M M A'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });

    //ObjectId("58b3dc2a1a69e32ba0939dc3")

    // db.close();
});