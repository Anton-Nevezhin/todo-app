const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./utils/DataBaseUtils');
const config = require('./config/config.json');

db.setUpConnection();

const app = express();

app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
	res.render('index')
});

app.get('/todos', (req, res) => {
	db.listTodos().then(data => {res.json(data)});
});

app.delete('/todos/delete/:id', (req, res) => {
	db.deleteTodo(req.params.id).then(data => res.json(data))
});

app.post('/todos/add', (req, res) => {
	db.createTodo(req.body).then(data => res.json(data))
});

app.put('/todos/update/:id', (req, res) => {
  db.updateTodo(req.params.id, req.body).then(data => res.json(data))
})

app.use('*', (req, res) => {
  res.render('index');
});


app.listen(config.serverPort, () => console.log('server start'));



