var express = require('express');
var bodyParse = require('body-parser');
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
  var id = parseInt(req.params.id);
  var matchedToDo;

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
  var body = req.body;
  body.id = nextToDoId++;
  res.json(body);
  todos.push(body);
});

app.listen(PORT, function(){
  console.log('App listening on port ' + PORT);
});
