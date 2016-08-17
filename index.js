"use strict";
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

/*DB stuff */
mongoose.connect('mongodb://localhost:27017/adaptive-quizzing');
mongoose.connection.once('open', ()=>console.log('Connected to DB!'));
const Question = require('./models/Question.js');
const Topic = require('./models/Topic.js');
mongoose.Promise = global.Promise;

/*App and middlewares */
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static('static'));
app.set('view engine', 'ejs');

app.use(session({
  secret: 'l4kjafkjefbgkjlfdsn4slvd',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({
    url: 'mongodb://localhost/sessions'
  })
}));


/* Routes */
app.get('/', (req,res)=>res.render('main'));
require('./routes/questions.js')(app, Question);
require('./routes/topics.js')(app, Topic);

const port = 3333;
app.listen(port, ()=> console.log('App listening on port ', port));