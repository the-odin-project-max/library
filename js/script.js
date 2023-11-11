// let book1 = new Book('The Hobbit', 'J.R.R. Tolkien', 295, true);
// let book2 = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1137, false);
// let book3 = new Book('The Silmarillion', 'J.R.R. Tolkien', 365, true);

// const myLibrary = [];

// Get the dialog element
const dialog = document.querySelector("dialog");
const showButton = document.querySelector(".open-form-btn");
const closeButton = document.querySelector(".close-form-btn");


class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
	}

	readToggle() {
		this.read = !this.read;
	}
}

class Library {
	constructor() {
		this.books = [];
		console.log('Library created');
		console.log(this.books);
	}

	getBooks() {
		return this.books;
	}

	renderBooksList() {
		console.log("render", this.books);
		console.log('rendering books list');
		document.getElementById('books-list').innerHTML = '';
		for (let i = 0; i < this.books.length; i++) {
			let li = document.createElement('li');
			li.setAttribute('class', 'book-item');
			li.innerHTML = `
			<div class="book-info">
			<p class="book-title">"${this.books[i].title}"</p>
			<p class="book-author">${this.books[i].author}</p>
			<p class="book-pages">${this.books[i].pages} pages</p>
			<p class="book-read">${this.books[i].read ? "Read" : "Not Read"}</p>
		</div>
		<div class="book-actions">
			<button class=${this.books[i].read ? "book-unread-btn" : "book-read-btn"} data-index="${i}">${this.books[i].read ? "Unread" : "Read"}</button>
			<button class="book-delete-btn" data-index="${i}">Delete</button>
		</div>
	`;
			document.getElementById('books-list').appendChild(li);
		}
		this.toggleButtons();
	}

	removeBookFromLibrary(i) {
		this.books.splice(i, 1);
		this.renderBooksList();
	}

	toggleButtons() {
		document.querySelectorAll('.book-read-btn, .book-unread-btn').forEach(item => {
			item.addEventListener('click', event => {
				const index = item.dataset.index;
				this.books[index].readToggle();
				this.renderBooksList();
			});
		});

		document.querySelectorAll('.book-delete-btn').forEach(item => {
			item.addEventListener('click', event => {
				this.removeBookFromLibrary(item.dataset.index);
			})
		});
	}

	addBookToLibrary(newBook) {
		console.log(this.books);
		this.books.push(newBook);

	}

	addBookButtonClicked = () => {
		let title = document.getElementById('title-input').value;
		let author = document.getElementById('author-input').value;
		let pages = document.getElementById('pages-input').value;
	
		if (title == "" || author == "" || pages == "") {
			// alert("Please fill all the fields");
			return;
		}
	
		let readCheckbox = document.getElementById('read-input');
		let read = readCheckbox.checked ? true : false;
	
		let newBook = new Book(title, author, pages, read);
		this.addBookToLibrary(newBook);
	
		this.renderBooksList();
	
		document.getElementById('title-input').value = "";
		document.getElementById('author-input').value = "";
		document.getElementById('pages-input').value = "";
		document.getElementById('read-input').checked = false;
	
		dialog.close();
	}
}


// "Show the dialog" button opens the dialog modally
showButton.addEventListener("click", () => {
	dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
	dialog.close();
});

let myLibrary = new Library();

document.getElementById('add-book-btn').addEventListener('click', myLibrary.addBookButtonClicked);
myLibrary.renderBooksList();



