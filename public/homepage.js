// require('./db')




function addComment() {

}

// function getComments(evt) {
// 	evt.preventDefault();
//
// 	const req = new XMLHttpRequest();
// 	req.open('GET', '/post/'+link.id, true);
// 	req.addEventListener('load', )
//
// }



function init() {
	console.log('init');
	const postButton = document.getElementById('postButton');

	if (postButton) {
		postButton.addEventListener('click', () => {
			const addPostOverlay = document.getElementById('addPost');
			addPostOverlay.style.display = 'block';
		});
	}

	// const commentLinks = document.getElementsByClassName('.comments');
	// for (const link of commentLinks) {
	// 	link.addEventListener('click', getCommment(evt, link.id));
	// }
}


document.addEventListener('DOMContentLoaded', init);
