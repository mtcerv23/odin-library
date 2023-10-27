const myLibrary = [];
const main = document.querySelector('main');


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

// check if the book is already in main.
function displayBook() {
  myLibrary.forEach(book => {
    let alreadyExists = document.getElementById(`${book.title}`);
    if (!alreadyExists) {
      let newDiv = document.createElement("div");
      newDiv.setAttribute('id', `${book.title}`)
      newDiv.innerHTML =
        `<h1>${book.title}</h1>
        <p><b>Author:</b> ${book.author}</p>
        <p><b>Pages:</b> ${book.pages}</p>
        <p><b>Already read?</b> ${book.read}</p>`;
        main.append(newDiv);
        alert
        modal.close();
    }
  })
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
  if (read === false) {read = 'No'} else read = 'Yes';

  if (title != '' && author != '' && pages != '') {
    addBookToLibrary(title, author, pages, read);
    displayBook();
  }}
);