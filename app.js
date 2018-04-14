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
const bcrypt = require('bcrypt');
const flash = require('connect-flash');

const passport = require('passport'),
	LocalStrategy = require('passport-local').Strategy;

const app = express();


passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log('here');

		User.findOne({username: username}, (err, user) => {
			if (err) { return done(err); }

			if (!user) {
				return done(null, false, {message: 'USERNAME NOT FOUND'});
			}

			bcrypt.compare(password, user.password, (err, res) => {
				if (err) {
					return done(err);
				} else if (!res) {
					return done(null, false, {message: 'USERNAME/PASSWORD NOT FOUND'});
				}
				// req.session.username = user.username;
				return done(null, user);
			});

		});	
	}
));

passport.serializeUser((user, done) => {
	done(null, user.username);
});

passport.deserializeUser((username, done) => {
	User.findOne({username: username}, (err, user) => {
		done(err, user);
	});
});

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'add session secret here!',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
	res.locals.user = req.user;
	next();
});


app.get('/', (req, res) => {
	Post.find((err, posts) => {
		if (!err && posts) {
			res.render('homepage', {error: req.flash('error'), posts: posts});	
		}
	});
});

app.post('/', (req, res) => {
	const post = new Post({
		username: req.user.username,
		status: req.body.status,
		url: req.body.link,
		description: req.body.description
	}).save((err, post) => {
		if (!err && post) {
			// console.log(user);
			res.redirect('/');
		} else {
			console.log(err);
		}
	});
});

app.post('/login',
	passport.authenticate('local', {successRedirect: '/', 
									failureRedirect: '/', 
									failureFlash: true})
);

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	const authenticate = passport.authenticate('local', {successRedirect: '/', 
														failureRedirect: '/register',
														failureFlash: true}
	);

	auth.register(req.body.email, req.body.username, req.body.password, authenticate.bind(null, req, res), (err) => {
		res.render('register', {message: err.message});
	});
});


// app.get('/post/:slug', (req, res) => {

// });

// app.get('/user/:username', (req, res) => {

// });


// app.post('/login', (req, res) => {

// });

app.listen(process.env.PORT || 3000);
