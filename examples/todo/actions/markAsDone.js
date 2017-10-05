const Todo = require('../models/todo')
const deserializeTodo = require('../util/deserializeTodo')

module.exports = function (request, response) {

  const regex = /id:(\d{1,100})/g;
  let m = regex.exec(request.url)
  let id = m[1];

  if (id == null) { return }

  Todo.markAsDone( id, (error, todo) => {
    if (error) {
      console.error(error)
      response.status(500)
      response.json({error: 'Internal error'})
    } else {
      response.status(202)
      response.json({todo})
    }
  })

}
