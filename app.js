const express = require('express');
// const mongoose = require('mongoose');
// require('./db');
// const User = mongoose.model('User');
// const Post = mongoose.model('Post');
// const Comment = mongoose.model('Comment');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true,
}));


console.log('app.js');

app.get('/', (req, res) => {
	res.render('homepage');
});

// app.get('/register', (req, res) => {

// });


// app.get('/post/:slug', (req, res) => {

// });

// app.get('/user/:username', (req, res) => {

// });


// app.post('/login', (req, res) => {

// });

app.listen(process.env.PORT || 3000);
