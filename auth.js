const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const User = mongoose.model('User');


function register(email, username, password, success, error) {


	//I would like to use promises to implement this but am not yet
	//comfortable enough with them 
	if (password.length < 8) {
		error({error: 'password must be at least 8 characters'});
	} else {
		User.findOne({username: username}, (err, result) => {
			if (err) {
				console.log('Error when checking for username existence');
			} else if (result) {
				error({error: 'username already exists'});
			} else {
				bcrypt.hash(password, 10, (err, hash) => {
					if (err) {
						error({error: 'ERROR ENCRYPTING PASSWORD'});
					} else {
						const user = new User({
							username: username, 
							email: email, 
							password: hash
						}).save((err, user) => {
							if (err) {
								error({error: 'DOCUMENT SAVE ERROR'});
							} else {
								success(user);
							}
						});
					}
				});
			}
		});
	}
}

function login(username, password, success, error) {

	User.findOne({username: username}, (err, user) => {
		if (!err && user) {
			bcrypt.compare(password, user.password, (err, res) => {
				if (res) {
					success(user);
				} else {
					error(error: 'PASSWORD INCORRECT');
				}
			});
		} else {
			error(error: 'USER NOT FOUND');
		}
}


function startAuthenticatedSession(req, user, cb) {
	req.session.regenerate((err) => {
		if (!err) {
			req.session.user = {
				username: user.username;
			}
			cb(err);
		}
	});
}


module.exports = {
	register: register, 
	login: login, 
	startAuthenticatedSession: startAuthenticatedSession
};