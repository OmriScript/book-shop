'use strict';
// Todo: validate price from user is a number
// Todo: make the table css better when no items
// Todo: show a msg when no books left
// Todo: optional? change the Id in the table to single digits

// Todo: bonuses

function onInit() {
  renderBooks();
}

function renderBooks() {
  resetOrderId();
  var books = getBooks();
  var tableHeadHtml = `
    <tr>
        <td>Id</td>
        <td>Title</td>
        <td>Price</td>
        <td colspan="3">Actions</td>
    </tr>
    `;
  var strHtmls = books.map(function (book) {
    return `
        <tr>
            <td>${getOrderId()}</td>
            <td>${book.title}</td>
            <td>${book.price}</td>
            <td><button class="btn btn-read" onclick="onReadBook('${
              book.id
            }')">Read</button></td>
            <td><button class="btn btn-update"onclick="onUpdateBook('${
              book.id
            }')">Update</button></td>
            <td><button class="btn btn-delete" onclick="onRemoveBook('${
              book.id
            }')">Delete</button></td>
        </tr>
        `;
  });
  var elTBody = document.querySelector('tbody');
  elTBody.innerHTML = tableHeadHtml;
  elTBody.innerHTML += strHtmls.join('');
}

function onRemoveBook(id) {
  removeBook(id);
  renderBooks();
}

function onAddBook() {
  var title = prompt("Enter book's title");
  var price = +prompt("Enter book's price");
  price += '$';
  addBook(title, price);
  renderBooks();
}

function onUpdateBook(id) {
  var price = +prompt("Enter book's price");
  price += '$';
  updateBook(id, price);
  renderBooks();
}

function onCloseModal() {
  document.querySelector('.modal').hidden = true;
}

function onReadBook(bookId) {
  var book = getBookById(bookId);
  var elModal = document.querySelector('.modal');
  elModal.querySelector('h3').innerText = book.title;
  elModal.querySelector('h4').innerHTML = book.desc;
  elModal.querySelector('p img').src = book.imgUrl;
  elModal.querySelector('p .rate').innerText = book.rate;
  elModal.hidden = false;
}

function onRateChange(symbol) {
  rateChange(symbol);
  renderBooks();
}
