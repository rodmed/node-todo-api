const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos=[
    {
        _id: new ObjectID(),
        text: 'One todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second todo',
        completed:true,
        completed:534
    }
];

beforeEach((done) => {
  Todo.remove({}).then(() => {
        return Todo.insertMany(todos);
  }).then( () => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    var text = 'Test todo text';

    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      });
  });
});

describe('GET /todo',() => {
    it('should get all todos', (done) => {
        request(app)
        .get('/todos')
        .expect(200)
        .expect((res)=>{
            expect(res.body.todos.length).toBe(2);
        })
        .end(done);
    });
});


describe ('GET /todos/:id', () => {
    it('should not return a todo with invalid ID', (done) => {
        var invalidID = 'XXXX'
        request(app)
        .get(`/todos/${invalidID}`)
        .send()
        .expect(400)
        .end(done);
    });

    it('should not return a todo with nonexistent ID', (done) => {
        var nonExistentID = '58b6d7a061427540340e6562';
        request(app)
        .get(`/todos/${nonExistentID}`)
        .send()
        .expect(404)
        .end(done);
    });

    it('should return a valid id with the user created', (done) => {
        Todo.findOne({}).then((todo) => {
            if (!todo) {
                return done('Empty User database, nothing to query');
            }
            request(app)
            .get(`/todos/${todo._id}`)
            .send()
            .expect(200)
            .expect( (res) => {
                expect(res.body.todo).toInclude({_id: todo._id});
                done();
            })
            .catch( (err) => done( err));
        })
        .catch( (err) => done('Something went MUCH wrong', err));
    });
});


describe('DELETE /todos/:id', () => {
    it('should remove a todo', (done) => {
        var hexID= todos[1]._id.toHexString();

        request(app)
        .delete(`/todos/${hexID}`)
        .expect(200)
        .expect((res)=> {
            expect(res.body.todo._id).toBe(hexID);
        })
        .end( (err, res) => {
            if (err) {
                return done(err);
            }
            Todo.findById(hexID).then((todo) => {
                // if (todo) {
                //     var error = new Error('Found Object, something wrong');
                //     return done(error);
                // }
                expect(todo).toNotExist();
                done();
            })
            .catch((e) => done(e));
        });
    });

    it('should return 404 if not found', (done) =>  {
        var hexID = new ObjectID();
        
        request(app)
        .delete(`/todos/${hexID}`)
        .expect(404)
        .end( (err, res) => {
            if (err) {
                return done(err);
            }
             done();
        });
    });
    
    it('should return 404 if object id is invalid', (done) => {
        var invalidHexID = 'BlaBlaBla';
        
        request(app)
        .delete(`/todos/${invalidHexID}`)
        .expect(400)
        .end( (err, res) => {
            if (err) {
                return done(err);
            }
             done();
        });
    });
    
});

describe('PATCH /todos:id', () => {
    it('should update the todo', (done) => {
        var hexID = todos[0]._id.toHexString();
        var text = 'This is a new text fo Todo';
     

        request(app)
        .patch(`/todos/${hexID}`)
        .send({completed:true, text})
        .expect(200)
        .expect( (res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(true);
            expect(res.body.todo.completedAt).toBeA('number');
        })
        .end(done);
      
    });

    it('should clear updateAt when todo is not completed', (done) => {
        var hexID = todos[1]._id.toHexString();
        var text = 'This is a new text for Todo';
     

        request(app)
        .patch(`/todos/${hexID}`)
        .send({completed:false, text})
        .expect(200)
        .expect( (res) => {
            expect(res.body.todo.text).toBe(text);
            expect(res.body.todo.completed).toBe(false);
            expect(res.body.todo.completedAt).toNotExist();
        })
        .end(done);
       
    });
})