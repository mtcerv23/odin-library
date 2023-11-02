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
    if (!bookOnScreen) {
      let newDiv = document.createElement("div");
      newDiv.dataset.index = index;
      newDiv.innerHTML =
        `<h1>${book.title}</h1>
        <p><b>Author:</b> ${book.author}</p>
        <p><b>Pages:</b> ${book.pages}</p>`;
        let readButton = document.createElement('button');
        
        if (book.read === false) {
          readButton.textContent = 'Not read';
          readButton.setAttribute('class', 'not-read');
        }
        else {
          readButton.textContent = 'Read';
          readButton.setAttribute('class', 'read');
        }
        readButton.addEventListener('click', () => {
          if (readButton.textContent == 'Not read') {
            myLibrary[index].read = true;
            readButton.textContent = 'Read';
            readButton.setAttribute('class', 'read');
          } else {
            myLibrary[index].read = false;
            readButton.textContent = 'Not read';
            readButton.setAttribute('class', 'not-read');
          }}
        )
        newDiv.append(readButton);

      // create delete button
      let deleteButton = document.createElement('button');
      deleteButton.textContent = 'Delete';
      deleteButton.setAttribute('id', `delete-${index}`);
      deleteButton.addEventListener('click', () => deleteSelf(index));
      newDiv.append(deleteButton);

      main.append(newDiv);
      modal.close();
    }
  })
}

function deleteSelf(index) {
  console.log(`index = ${index}`);
  document.querySelector(`[data-index="${index}"]`).remove();
  myLibrary.splice(index, 1);
// problem: last element doesn't reassign

  if (index == myLibrary.length - 1) {
    let deleteButton = document.getElementById(`delete-${index + 1}`);
    deleteButton.setAttribute('id', `delete-${index}`);
    deleteButton.addEventListener('click,', () => deleteSelf(index));
    document.querySelector(`[data-index="${index + 1}"]`).dataset.index = `${index}`;
  }
  else if (myLibrary.length > 1 && index < myLibrary.length - 1) {
    let deleteButton = document.getElementById(`delete-${index + 1}`);
    deleteButton.setAttribute('id', `delete-${index}`);
    deleteButton.addEventListener('click,', () => deleteSelf(index)); // problem: keeping old event listener?? then i don't fucking know what to do
    for (let i = index; i < myLibrary.length; i++) {
      document.querySelector(`[data-index="${i + 1}"]`).dataset.index = `${i}`;
    }
  } else if (myLibrary.length == 0) {
    if (index === 1) {
      let deleteButton = document.getElementById(`delete-1`);
      deleteButton.setAttribute('id', `delete-0`);
      deleteButton.addEventListener('click,', () => deleteSelf(0));
      document.querySelector(`[data-index="1"]`).dataset.index = '0';
    } else {
      let deleteButton = document.getElementById(`delete-1`);
      deleteButton.setAttribute('id', `delete-0`);
      deleteButton.addEventListener('click,', () => deleteSelf(0));
      document.querySelector(`[data-index="1"]`).dataset.index = '0';
    }
  }


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

// let div = document.createElement('div');
// div.setAttribute('id', 'div1');
// div.style.border = '1px solid blue';
// let deleteButton = document.createElement('button');
// deleteButton.textContent = 'Delete';
// deleteButton.addEventListener('click', () => deleteElementAndThisChildNodes('div1'));
// div.appendChild(deleteButton);
// document.body.appendChild(div);

// function deleteElementAndThisChildNodes(parentId) {
//   document.getElementById(parentId).remove();
// }
