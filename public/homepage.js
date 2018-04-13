// require('./db')

document.addEventListener('DOMContentLoaded', init);
console.log('running');

function init() {
	console.log('init');


	//login form will be dynamically programmed to show up if the user is not logged in already 
	const login = document.createElement('div');
	login.id = 'login';


	const loginForm = document.createElement('form');
	loginForm.setAttribute('method', 'post');
	loginForm.setAttribute('action', '');

	const username = document.createElement('input');
	username.classList.add('input')
	username.setAttribute('type', 'text');
	username.setAttribute('name', 'username');
	username.setAttribute('label', "username");
	username.setAttribute('value', 'username');
	loginForm.appendChild(username);
	username.addEventListener('focus', () => {
		username.value = '';
		username.style.color = 'black';
	});

	const password = document.createElement('input');
	password.classList.add('input');
	password.setAttribute('type', 'text');
	password.setAttribute('name', 'password');
	password.setAttribute('value', 'password');
	loginForm.appendChild(password);
	password.addEventListener('focus', () => {
		password.value = '';
		password.style.color = 'black';
	});

	const submit = document.createElement('input');
	submit.setAttribute('type', 'submit');
	submit.setAttribute('name', 'login');
	submit.setAttribute('value', 'login');
	loginForm.appendChild(submit);
	submit.addEventListener('focus', () => {
		login.style.display = 'none';
	});

	login.appendChild(loginForm);
	
	const body = document.getElementById('content');

	body.appendChild(login);


	const postButton = document.getElementById('postButton');

	if (postButton) {
		postButton.addEventListener('click', () => {
			const addPostOverlay = document.getElementById('addPost');
			addPostOverlay.style.display = 'block';
		});	
	}
}