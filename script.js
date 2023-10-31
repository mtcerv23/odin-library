const myLibrary = [];
const main = document.querySelector('main');
let bookOnScreen;


function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read
}

function addBookToLibrary(title, author, pages, read) {
  let book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

// check if the book is already on screen.
function displayBook() {
  myLibrary.forEach((book, index) => {
    bookOnScreen = document.querySelector(`[data-index="${index}"]`); // check if there is already a book on screen with data-index starting from 0
    console.log(`bookOnScreen = ${bookOnScreen}`);
    console.log(`book index = ${index}`);
    // if there is no book on screen with the current libraryIndex, create a div
    if (!bookOnScreen) {
      let newDiv = document.createElement("div");
      newDiv.dataset.index = myLibrary.findIndex(bookObj => bookObj.title === book.title);
      newDiv.innerHTML =
        `<h1>${book.title}</h1>
        <p><b>Author:</b> ${book.author}</p>
        <p><b>Pages:</b> ${book.pages}</p>
        <p><b>Already read?</b> ${book.read}</p>`;
      let deleteButton = newDiv.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteSelf(newDiv));
      main.append(newDiv);
      modal.close();
    }
  })
}

function deleteSelf(index) {
  document.querySelector(`[data-index="${index}"]`).remove();
}

const modal = document.querySelector("[data-modal]");
const addBook = document.getElementById('add-book');
const cancel = document.getElementById('cancel');
const submit = document.getElementById('submit');

addBook.onclick = () => {
  modal.showModal()
}

function resetForm() {
  document.getElementById('title').value = null;
  document.getElementById('author').value = null;
  document.getElementById('pages').value = null;
  document.getElementById('read').checked = false;
}

cancel.addEventListener('click', () => {
  resetForm();
  modal.close();
})

submit.addEventListener("click", function(event) {
  event.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;
  let bookNotFound = myLibrary.find(book => book.title === title) === undefined; // boolean for whether or not book title is found in myLibrary

  if (read === false) {read = 'No'} else read = 'Yes';

  if (title != '' && author != '' && pages != '' && bookNotFound) {
    addBookToLibrary(title, author, pages, read);
    displayBook();
  } else {} /* display error message saying book has already been added */
}
);

