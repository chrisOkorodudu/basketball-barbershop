

function init() {
	console.log('init');
	const postButton = document.getElementById('postButton');

	if (postButton) {
		postButton.addEventListener('click', () => {
			const addPostOverlay = document.getElementById('addPost');
			addPostOverlay.style.display = 'block';
		});
	}
}


document.addEventListener('DOMContentLoaded', init);
