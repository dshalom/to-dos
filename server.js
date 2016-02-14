var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var todos = [{
  id: 1,
  description: 'go to bed',
  completed: false
},
{
  id: 2,
  description: 'feed guinee pigs',
  completed: false
},
{
  id: 3,
  description: 'get some food',
  completed: true
}];

app.get('/', function(req, res){
  res.send('todo root');
});

app.get('/todos', function(req, res){
  res.json(todos);
});

function findToDo(id){
    var r = todos.reduce(function(acc, value){
    if(value.id === id){
     acc.push(value);
    }
    return acc;

}, []);
    return r[0];
}


app.get('/todos/:id', function(req, res){
  var id = parseInt(req.params.id);
  var matchedToDo;

  todos.forEach(function(todo){
    if(todo.id === id){
      matchedToDo = todo;
    }
  });
  if(matchedToDo){
    res.send(res.json(matchedToDo));
  }else{
    res.status(404).send();
  }
});

app.listen(PORT, function(){
  console.log('App listening on port ' + PORT);
});
