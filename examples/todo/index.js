const Express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const Todo = require('./models/todo')
const Users = require('./models/users')
const { passport } = require('./util/setPassport')

const app = Express()
const DIRNAME = '/Users/fdiazsmith/Documents/HYF/databases/examples/todo/'
const cookieParser = require('cookie-parser')


app.set('view engine', 'pug')
app.set('views', path.join(DIRNAME, '/public/views'));

app.use( passport.initialize() )


app.use(cookieParser())

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({
  extended: true
}))

// parse application/json
app.use(bodyParser.json())

app.use(Express.static('./public') )

const { list, create, update, remove, authenticate, signin, markAsDone} = require('./actions')


app.get('/', function (req, res) {
  res.render('index', { title: 'todo', message: 'fer' })
})

app.get('/todos', passport.authenticate('jwt', { session: false }), list)

app.post('/todos',  create)

app.put('/todos/:id',  update)

app.put('/todos/:id/done', markAsDone)

app.delete('/todos/:id', remove)

app.post("/login", authenticate );

app.get("/signin", (req, res)=>{
  res.sendFile(DIRNAME + 'public/views/signin.html')
})
app.post("/signin", signin)

app.get('/secret', passport.authenticate('jwt', { session: false }), list )


app.listen(3000, ()=>{
  console.info(`SERVER IS UP running as: ${process.env.NODE_ENV} \nlistening on http://localhost:3000`)
})

Todo.init()

Users.init()
