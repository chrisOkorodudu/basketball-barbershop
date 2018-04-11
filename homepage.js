

document.addEventListener('DOMContentLoaded', init);
console.log('running');

function init() {
	console.log('init');


	//login form will be dynamically programmed to show up if the user is not logged in already 
	const login = document.createElement('div');

	const loginForm = document.createElement('form');
	loginForm.setAttribute('method', 'post');
	loginForm.setAttribute('action', '');

	const username = document.createElement('input');
	username.setAttribute('type', 'text');
	username.setAttribute('name', 'username');

	const password = document.createElement('input');
	password.setAttribute('type', 'text');
	password.setAttribute('name', 'password');

	const submit = document.createElement('input');
	submit.setAttribute('type', 'submit');
	submit.setAttribute('name', 'submit');

}