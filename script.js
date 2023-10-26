const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title,
  this.author = author,
  this.pages = pages,
  this.read = read,
  this.info = function () {
    return `${this.title}, ${this.author}, ${this.pages}, ${this.read}`
  }
}

function addBookToLibrary() {
    let title = prompt("Title: ", "Harry Potter");
    let author = prompt("Author: ", "J.K. Rowling");
    let pages = prompt("Pages: ", 690);
    let read = prompt("Already read? ", "yes/no");
    let book = {
        title: title,
        author: author,
        pages: pages,
        read: read
    }
    myLibrary.push({book})
    console.log(myLibrary)
}

function displayBook() {
    myLibrary.forEach(book => {
        const newDiv = document.createElement("div");
        const newContent = document.createTextNode(`${book.title}, ${book.author}, ${book.pages}, ${book.read}`);
        newDiv.appendChild(newContent);
        document.body.append(newDiv);
    }
    )


    }

addBookToLibrary();
displayBook();
