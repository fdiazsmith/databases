const Express = require('express')
const bodyParser = require('body-parser')
const Todo = require('./models/todo')
const Users = require('./models/users')
const { passport } = require('./util/setPassport')

const app = Express()
const __dirname = '/Users/fdiazsmith/Documents/HYF/databases/examples/todo/'


app.use(passport.initialize());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}));

// parse application/json
app.use(bodyParser.json())

app.use(Express.static('./public'));

const {list, create, update, remove, authenticate } = require('./actions')

app.get('/', (req, res)=>{
  res.sendFile(__dirname + 'public/views/index.html');
  // NOTE: implement path.join at a later time
  // res.sendFile(path.join(__dirname, '../public', 'index1.html'));
})

app.get('/todos', list)
app.post('/todos', create)
app.put('/todos/:id', update)
app.delete('/todos/:id', remove)

app.post("/login", authenticate);

app.get("/secret", passport.authenticate('jwt', { session: true }), function(req, res){
  res.json({message: "Success! You can not see this without a token"});
});


app.listen(3000, ()=>{
  console.info("SERVER IS UP");
})

Todo.init()
Users.init()
