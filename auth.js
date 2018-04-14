const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = mongoose.model('User');


function register(email, username, password, success, error) {
	console.log('running');

	//I would like to use promises to implement this but am not yet
	//comfortable enough with them 
	if (password.length < 8) {
		console.log('password to short');
		error({message: 'password must be at least 8 characters'});
	} else {
		User.findOne({username: username}, (err, result) => {
			if (err) {
				console.log('Error when checking for username existence');
			} else if (result) {
				error({message: 'username already exists'});
			} else {
				bcrypt.hash(password, 10, (err, hash) => {
					if (err) {
						error({message: 'ERROR ENCRYPTING PASSWORD'});
					} else {
						const user = new User({
							username: username, 
							email: email, 
							password: hash, 
						}).save((err, user) => {
							if (err) {
								console.log(err);
								error({message: 'DOCUMENT SAVE ERROR'});
							} else {
								success(user.username, user.password);
							}
						});
					}
				});
			}
		});
	}
}

// passport.use(new localStrategy(
// 	function(username, password, done) {

// 	}))

// function login(username, password, cb) {

// 	User.findOne({username: username}, (err, user) => {
// 		if (!err && user) {
// 			bcrypt.compare(password, user.password, (err, res) => {
// 				if (res) {
// 					cb(null, user);
// 				} else {
// 					cb(null, false, {error: 'PASSWORD INCORRECT'});
// 				}
// 			});
// 		} else if (err) {
// 			cb(err);
// 		} else {
// 			console.log('USER NOT FOUND');
// 			cb(null, false, {error: 'USER NOT FOUND'});
// 		} 
// 	});
// }



// function startAuthenticatedSession(user, req, cb) {
// 	req.session.regenerate((err) => {
// 		if (!err) {
// 			req.session.user = {
// 				username: user.username
// 			}
// 			cb(err);
// 		}
// 	});
// }


module.exports = {
	register: register
	// login: login, 
	// startAuthenticatedSession: startAuthenticatedSession
};