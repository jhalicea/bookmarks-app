const STORE = {
  bookmarks: [],
  adding: false,
  editing: false,
  error: null,
  filter: 0
};

// STORE MANAGEMENT FUNCTIONS

const addBookmarks = function (bookmark) {
  this.STORE.bookmarks.push(bookmark);
};

const storeDeleteBookmark = function (id) {
  let index = STORE.bookmarks.indexOf(id);
  STORE.bookmarks.splice(index, 1);
  console.log(STORE.bookmarks);
};

// API MANAGEMENT FUNCTIONS

const BASE_URL = 'https://thinkful-list-api.herokuapp.com/jhalicea';

const getBookmarks = function () {
  return fetch(`${BASE_URL}/bookmarks`);
};

const createBookmark = function (jsonData) {
  return fetch(`${BASE_URL}/bookmarks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonData,
  });
};

const deleteBookmark = function (id) {
  return fetch(`${BASE_URL}/bookmarks/${id}`, {
    method: 'DELETE'
  });
};



export  default {
  STORE,
  getBookmarks,
  addBookmarks,
  createBookmark,
  deleteBookmark,
  storeDeleteBookmark,
};