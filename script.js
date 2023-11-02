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

        // create read button
        let readButton = document.createElement('button');
        
        if (book.read === false) {
          readButton.textContent = 'Not Read';
          readButton.setAttribute('class', 'not-read read-button');
        }
        else {
          readButton.textContent = 'Read';
          readButton.setAttribute('class', 'read read-button');
        }

        // toggle between Read and Not Read
        readButton.addEventListener('click', () => {
          if (readButton.textContent === 'Not Read') {
            myLibrary[index].read = true;
            readButton.textContent = 'Read';
            readButton.setAttribute('class', 'read read-button');
          } else {
            myLibrary[index].read = false;
            readButton.textContent = 'Not Read';
            readButton.setAttribute('class', 'not-read read-button');
          }
        });

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

// delete button functionality
function deleteSelf(index) {
  console.log(`index = ${index}`);
  if (index < myLibrary.length - 1) {
    for (let i = index; i < myLibrary.length - 1; i++) {
      console.log(`myLibrary[${i}].read = ${myLibrary[i].read}`);
      let nextDiv = document.querySelector(`[data-index="${i + 1}"]`);
      nextDiv.dataset.index = `${i}`;

      let deleteButton = document.getElementById(`delete-${i + 1}`);
      nextDiv.removeChild(deleteButton);

      // removes and creates new read button because I don't know how to replace the event handler lol
      nextDiv.querySelector('.read-button').remove(); 
      let newReadButton = document.createElement('button');

      if (myLibrary[i + 1].read === true) {
        newReadButton.textContent = 'Read';
        newReadButton.setAttribute('class', 'read read-button');
      } else {
        newReadButton.textContent = 'Not Read';
        newReadButton.setAttribute('class', 'not-read read-button')
      };

      newReadButton.addEventListener('click', () => {
        if (newReadButton.textContent === 'Not Read') {
          myLibrary[i].read = true;
          newReadButton.textContent = 'Read';
          newReadButton.setAttribute('class', 'read read-button');
        } else if (newReadButton.textContent === 'Read') {
          myLibrary[i].read = false;
          newReadButton.textContent = 'Not Read';
          newReadButton.setAttribute('class', 'not-read read-button');
        }
      });

      nextDiv.append(newReadButton);

      // new Delete Button
      let newDeleteButton = document.createElement('button');
      newDeleteButton.textContent = 'Delete';
      newDeleteButton.setAttribute('id', `delete-${i}`);
      newDeleteButton.setAttribute("onclick", `deleteSelf(${i})`);
      nextDiv.appendChild(newDeleteButton);
    }
  }
  document.querySelector(`[data-index="${index}"]`).remove();
  myLibrary.splice(index, 1);
}

const modal = document.querySelector("[data-modal]");
const addBook = document.getElementById('add-book');
const cancel = document.getElementById('cancel');
const submit = document.getElementById('submit');

addBook.addEventListener('click', () => modal.showModal());
cancel.addEventListener('click', () => modal.close());

submit.addEventListener("click", function(event) {
  event.preventDefault();
  let title = document.getElementById('title').value;
  let author = document.getElementById('author').value;
  let pages = document.getElementById('pages').value;
  let read = document.getElementById('read').checked;
  let newBook = myLibrary.find(book => book.title === title) === undefined; // returns true if book title not already in myLibrary
  console.log(myLibrary);

  if (title != '' && author != '' && pages != '' && newBook) {
    document.getElementById('already-added').textContent = '';
    addBookToLibrary(title, author, pages, read);
    displayBook();
  } else { /* display error message saying book has already been added */
    document.getElementById('already-added').textContent = 'Book already in library';
  } 
}
);