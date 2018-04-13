const express = require('express');
const mongoose = require('mongoose');
require('./db');
const auth = require('./auth.js');
const User = mongoose.model('User');
const Post = mongoose.model('Post');
const Comment = mongoose.model('Comment');
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

app.use((req, res, next) => {
	res.locals.user = req.session.user;
	next();
});

console.log('app.js');

app.get('/', (req, res) => {
	Post.find((err, posts) => {
		if (!err && posts) {
			console.log(posts);
			res.render('homepage', {posts: posts});
		}
	});
});

app.post('/', (req, res) => {

	if (req.body.login) {
		auth.login(req.body.username, req.body.password, (user) => {
			auth.startAuthenticatedSession(user, req, (err) => {
				if (!err) {
					console.log(req.body);
					req.session.username = user.username;
					res.redirect('/');
				}
			})
		}, (err) => {
			res.render('homepage', {error: err.error});
		});
	} else {
		console.log('here');
		const post = new Post({
			username: req.session.user.username,
			status: req.body.status,
			url: req.body.link,
			description: req.body.description
		}).save((err, user) => {
			if (!err && user) {
				// console.log(user);
				res.redirect('/');
			} else {
				console.log(err);
			}
		});
	}
});

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	auth.register(req.body.email, req.body.username, req.body.password, (user) => {
		auth.startAuthenticatedSession(user, req, (err) => {
			if (!err) {
				console.log(user.username);
				res.redirect('/');
			}
		});
	}), (err) => {
		res.render('register', {message: err.error});
	}
});


// app.get('/post/:slug', (req, res) => {

// });

// app.get('/user/:username', (req, res) => {

// });


// app.post('/login', (req, res) => {

// });

app.listen(process.env.PORT || 3000);
