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

function displayBook() {
  myLibrary.forEach(book => {
    const newDiv = document.createElement("div");
    newDiv.innerHTML =
      `<h1>${book.title}</h1>
      <p><b>Author:</b> ${book.author}</p>
      <p><b>Pages:</b> ${book.pages}</p>
      <p><b>Already read?</b> ${book.read}</p>`;
      main.append(newDiv);
  })
}

const modal = document.querySelector("[data-modal]");
const addBook = document.getElementById('add-book');


addBook.onclick = () => {
  modal.showModal()
}

const submit = document.getElementById('submit');

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
  modal.close();
  }}
);