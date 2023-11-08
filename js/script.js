let book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
let book2 = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1137, false);
let book3 = new Book('The Silmarillion', 'J.R.R. Tolkien', 365, true);

const myLibrary = [book1, book2, book3];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	this.readToggle = function () {
		this.read = !this.read;
	}
}

function toggleButtons() {
	document.querySelectorAll('.book-read-btn').forEach(item => {
		item.addEventListener('click', event => {
			const index = item.dataset.index;
			myLibrary[index].readToggle();
			renderBooksList();
		});
	});
	
	document.querySelectorAll('.book-delete-btn').forEach(item => {
		console.log("item");
		item.addEventListener('click', event => {
			removeBookFromLibrary(item.dataset.index);
		})
	});
}

function addBookToLibrary() {
	let title = document.getElementById('title-input').value;
	let author = document.getElementById('author-input').value;
	let pages = document.getElementById('pages-input').value;
	let readCheckbox = document.getElementById('read-input');
	let read = readCheckbox.checked ? true : false;
	let newBook = new Book(title, author, pages, read);
	myLibrary.push(newBook);
	renderBooksList();
}

function renderBooksList() {
	console.log('rendering books list');
	document.getElementById('books-list').innerHTML = '';
	for (i = 0; i < myLibrary.length; i++) {
		let li = document.createElement('li');
		li.setAttribute('class', 'book-item');
		li.innerHTML = `
		<div class="book-info">
		<p class="book-title">${myLibrary[i].title}</p>
		<p class="book-author">${myLibrary[i].author}</p>
		<p class="book-pages">${myLibrary[i].pages}</p>
		<p class="book-read">${myLibrary[i].read ? "Read" : "Not Read"}</p>
	</div>
	<div class="book-actions">
		<button class="book-read-btn" data-index="${i}">${myLibrary[i].read ? "Unread" : "Read"}</button>
		<button class="book-delete-btn" data-index="${i}">Delete</button>
	</div>
`;
		document.getElementById('books-list').appendChild(li);
	}
	toggleButtons();
}

function removeBookFromLibrary(i) {
	myLibrary.splice(i, 1);
	renderBooksList();
}


document.getElementById('add-book-btn').addEventListener('click', addBookToLibrary);

renderBooksList();



