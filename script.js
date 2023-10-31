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

// check if the book is already on screen.
function displayBook() {
  myLibrary.forEach((book, index) => {
    let bookOnScreen = document.querySelector(`[data-index="${index}"]`); // check if there is already a book on screen with data-index starting from 0
    // if there is no div on screen for the current book's index, create a div
    if (!bookOnScreen && book.title != null) {
      let newDiv = document.createElement("div");
      newDiv.dataset.index = index;
      newDiv.innerHTML =
        `<h1>${book.title}</h1>
        <p><b>Author:</b> ${book.author}</p>
        <p><b>Pages:</b> ${book.pages}</p>`;
      if (book.read === false) newDiv.innerHTML += '<p><b>Not read yet</b></p>'
      else newDiv.innerHTML += '<p><b>Already read</b></p>'
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => deleteSelf(index));
      newDiv.append(deleteButton);
      main.append(newDiv);
      modal.close();
    }
  })
}

function deleteSelf(index) {
  document.querySelector(`[data-index="${index}"]`).remove();
  myLibrary[index].title = null;
  myLibrary[index].author = null;
  myLibrary[index].pages = null;
  myLibrary[index].read = null;
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
  let newBook = myLibrary.find(book => book.title === title) === undefined; // returns true if book title not already in myLibrary
  console.log(myLibrary);

  if (title != '' && author != '' && pages != '' && newBook) {
    addBookToLibrary(title, author, pages, read);
    displayBook();
  } else {} /* display error message saying book has already been added */
}
);

// test

// let objArray = [
//   {number: 1},
//   {number: 2},
//   {number: 3}
// ]
// delete objArray[0];
// console.log(objArray[0]);
// console.log(objArray.find(object => object.number == 1));

// let array = [1, 2, 3];
// delete array[0];
// console.log(array[0]);
// console.log(array.find(number => number == 1));