var express = require('express');
var bodyParse = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParse.json());
var todos = [];
var nextToDoId = 1;

app.get('/', function(req, res){
  res.send('todo root');
});

app.get('/todos', function(req, res){
  res.json(todos);
});

app.get('/todos/:id', function(req, res){
  var todoId = parseInt(req.params.id, 10);
  var matchedToDo = _.findWhere(todos, {id: todoId});

  todos.forEach(function(todo){
    if(todo.id === id){
      matchedToDo = todo;
    }
  });
  if(matchedToDo){
    res.json(matchedToDo);
  }else{
    res.status(404).send();
  }
});

app.post('/todos', function(req, res){
  var body = _.pick(req.body, 'description',  'completed');

  if(!_.isBoolean(body.completed) || !_.isString(body.description)  || body.description.trim().length === 0 ){
      res.status(400).send();
      return;
  }
  body.description = body.description.trim();
  body.id = nextToDoId++;
  res.json(body);
  todos.push(body);
});

app.listen(PORT, function(){
  console.log('App listening on port ' + PORT);
});
