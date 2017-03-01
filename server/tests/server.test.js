const expect = require('expect');
const request = require('supertest');

const {app} = require('./../server');
const {Todo} = require('./../models/todo');

const todos=[
    {text: 'One todo'},
    {text: 'Second todo'}
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
                console.log(res.body.todo);
                expect(res.body.todo).toInclude({_id: todo._id});
                done();
            })
            .catch( (err) => done( err));
        })
        .catch( (err) => done('Something went MUCH wrong', err));
    });

});