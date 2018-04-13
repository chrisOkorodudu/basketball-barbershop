// require('./db')

document.addEventListener('DOMContentLoaded', init);
console.log('running');

function init() {
	console.log('init');


	const loginForm = document.getElementById('loginForm');

	const inputs = document.getElementsByClassName('input');
	for (let i=0; i<inputs.length; i++) {

		inputs[i].addEventListener('focus', () => {
			inputs[i].value = '';
			inputs[i].style.color = 'black';
		});
	}


	const postButton = document.getElementById('postButton');

	if (postButton) {
		postButton.addEventListener('click', () => {
			const addPostOverlay = document.getElementById('addPost');
			addPostOverlay.style.display = 'block';
		});	
	}
}