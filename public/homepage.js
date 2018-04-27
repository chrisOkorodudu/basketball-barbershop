

function init() {
	console.log('init');
	const postButton = document.getElementById('postButton');

	if (postButton) {
		postButton.addEventListener('click', () => {
			const addPostOverlay = document.getElementById('addPost');
			addPostOverlay.style.display = 'block';
		});
	}

	const searchButton = document.getElementById('submitsearch');
	searchButton.addEventListener('click', handleSearch);
}



function handleSearch(evt) {
	evt.preventDefault();
	console.log('searching');

	const searchQuery = document.querySelector('.filter').value;

	const req = new XMLHttpRequest();

	req.open('GET', '/?username='+searchQuery);
	req.addEventListener('load', () => {
		const postList = document.getElementById('posts');
		//clear current post table
		while (postList.firstChild) {
			postList.removeChild(postList.firstChild);
		}

		let posts = JSON.parse(req.responseText);
		posts = posts.reverse();

		for (const post of posts) {
			console.log(post);
			const postDiv = document.createElement('div');
			postDiv.classList.add('post');
			const lineBreak = document.createElement('br');

			const ele = document.createElement('li');
			ele.textContent = post.username+': ' +	post.status;
			ele.appendChild(lineBreak);

			const commentsLink = document.createElement('a');
			commentsLink.href = '/post/'+post.slug;
			commentsLink.appendChild(document.createTextNode('View Comments'));
			commentsLink.classList.add('comments');

			const timeStamp = document.createElement('p');
			timeStamp.id = 'timestamp';
			timeStamp.textContent = post.createAt;
			console.log(post.createAt);


			postDiv.appendChild(ele);
			postDiv.appendChild(commentsLink);
			postDiv.appendChild(timeStamp);
			postDiv.appendChild(document.createElement('br'));

			postList.appendChild(postDiv);
		}
	});
	req.send();
}


document.addEventListener('DOMContentLoaded', init);
