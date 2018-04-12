

document.addEventListener('DOMContentLoaded', init);
console.log('running');

function init() {
	console.log('init');

	constole.log('minor change made');
	//login form will be dynamically programmed to show up if the user is not logged in already 
	const login = document.createElement('div');
	login.id = 'login';

	const loginForm = document.createElement('form');
	loginForm.setAttribute('method', 'post');
	loginForm.setAttribute('action', '');

	const username = document.createElement('input');
	username.setAttribute('type', 'text');
	username.setAttribute('name', 'username');
	username.setAttribute('label', "username");
	loginForm.appendChild(username);

	const password = document.createElement('input');
	password.setAttribute('type', 'text');
	password.setAttribute('name', 'password');
	loginForm.appendChild(password);

	const submit = document.createElement('input');
	submit.setAttribute('type', 'submit');
	submit.setAttribute('name', 'login');
	submit.setAttribute('value', 'login');
	loginForm.appendChild(submit);

	login.appendChild(loginForm);
	
	const body = document.getElementById('content');

	body.appendChild(login);
}