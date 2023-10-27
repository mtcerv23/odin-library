const myLibrary = [];
const main = document.querySelector('main');


function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.info = function () {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`
  }
}

function addBookToLibrary(title, author, pages, read) {
    // let title = prompt("Title: ", "Harry Potter");
    // let author = prompt("Author: ", "J.K. Rowling");
    // let pages = prompt("Pages: ", 690);
    // let read = prompt("Already read? ", "yes/no");
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

function displayBook() {
    myLibrary.forEach(book => {
        const newDiv = document.createElement("div");
        // const newContent = document.createTextNode(`${book.title}, ${book.author}, ${book.pages}, ${book.read}`);
        // newDiv.appendChild(newContent);
        newDiv.innerHTML =
        `<h1>${book.title}</h1>
        <p><b>Author:</b> ${book.author}</p>
        <p><b>Pages:</b> ${book.pages}</p>
        <p><b>Already read?</b> ${book.read}</p>`;

        main.append(newDiv);
      }
    )
  }

const modal = document.querySelector("[data-modal]");
const addBook = document.getElementById('add-book');


addBook.onclick = () => {
  modal.showModal()
}

const submit = document.getElementById('submit');

submit.onclick = () => {
  let title = document.getElementById('title');
  let author = document.getElementById('author');
  let pages = document.getElementById('pages');
  let read = document.getElementById('read');
  addBookToLibrary(title, author, pages, read);
  displayBook();
}