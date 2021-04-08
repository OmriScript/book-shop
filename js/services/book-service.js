'use strict';

const KEY = 'books';

var gBooks;
var gId = 0;

_createBooks();

function getBooks() {
  return gBooks;
}

function _createBook(
  title,
  price,
  imgUrl = '../img/Book Cover Not Available.png',
  rate = 0
) {
  return {
    id: makeId(),
    title,
    price,
    imgUrl: imgUrl,
    desc: makeLorem(),
    rate: rate,
  };
}

function _createBooks() {
  var books = loadFromStorage(KEY);
  if (!books || !books.length) {
    // Create dummy data
    books = [];
    books.push(
      _createBook('Parry Hotter', '15.90$', '../img/Parry_Hottter.png')
    );
    books.push(
      _createBook('Good Morning Zoom', '9.90$', '../img/Good Morning Zoom.png')
    );
    books.push(
      _createBook(
        'If You Give a Mouse An iPhone',
        '49.90$',
        '../img/If You Give a Mouse An iPhone.png'
      )
    );
  }
  gBooks = books;
  _saveCarsToStorage();
}

function _saveCarsToStorage() {
  saveToStorage(KEY, gBooks);
}

function removeBook(bookId) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });
  gBooks.splice(bookIdx, 1);
  _saveCarsToStorage();
}

function addBook(title, price) {
  var book = _createBook(title, price);
  gBooks.push(book);
  _saveCarsToStorage();
}

function updateBook(bookId, bookPrice) {
  var bookIdx = gBooks.findIndex(function (book) {
    return book.id === bookId;
  });
  gBooks[bookIdx].price = bookPrice;
  _saveCarsToStorage();
}

function getBookById(bookId) {
  var book = gBooks.find(function (book) {
    return bookId === book.id;
  });
  return book;
}

function rateChange(symbol) {
  var elDesc = document.querySelector('.modal h4');
  var desc = elDesc.innerHTML;
  var elRate = document.querySelector('.modal .rate');
  var currRate = elRate.innerHTML;
  var bookIdx = gBooks.findIndex(function (book) {
    return book.desc === desc;
  });

  if (symbol === '-' && currRate > 1) {
    gBooks[bookIdx].rate--;
    elRate.innerHTML--;
  } else if (symbol === '+' && currRate < 9) {
    gBooks[bookIdx].rate++;
    elRate.innerHTML++;
  }
  _saveCarsToStorage();
}

function getOrderId() {
  gId++;
  return gId;
}

function resetOrderId() {
  gId = 0;
}
