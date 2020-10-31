import 'normalize.css';
import '../css/index.css';
import $ from 'jquery';

import database from './database';
import templates from './templates';




const render = function () {
  const bookmarks = database.STORE.bookmarks;

  if(database.STORE.adding === true) {
    const addView = templates.addNewBookmarkTemplateView();
    $('#all-bookmarks').html(addView);
  } else if (database.STORE.editing === true) {
    const addEdit = templates.generateEditBookmarktemplate();
    $('#all-bookmarks').html(addEdit);
  } else if(database.STORE.filter > 0 ) {
    const filtered = filteredBookmarks(bookmarks);
    const bookmarksHTMLString = templates.generateBookmarkHTMLstring(filtered);
    $('#all-bookmarks').html(bookmarksHTMLString);
  } else {
    //render the bookmarks to initial view
    const bookmarksHTMLString = templates.generateBookmarkHTMLstring(bookmarks);
    $('#all-bookmarks').html(bookmarksHTMLString);
  }

};

const addBookmarkEventListener = function () {
  $('#add-bookmark').on('click',  function () {
    database.STORE.adding = true;
    render();
  });
};

const filteredBookmarks = function (bookmarks) {
  let filter = database.STORE.filter;
  let filteredBookmarks = [];
  bookmarks.forEach(function (bookmark){
    if (bookmark.rating == filter) {
      filteredBookmarks.push(bookmark);
    }
    
  });
  return filteredBookmarks;
};


const expandedBookmark = function (id) {
  const foundBookmark = database.STORE.bookmarks.find(bookmark => bookmark.id === id);
  foundBookmark.expanded = !foundBookmark.expanded;
};

const getBookmarkIdFromElement = function (element) {
  return $(element)
    .closest('.bookmark')
    .data('bookmark');
};

const expandBookmarksEventListener = function () {
  $('#all-bookmarks').on('click', '.app-link',  function (event) {
    const id = getBookmarkIdFromElement(event.currentTarget);
    console.log(event.currentTarget);
    expandedBookmark(id);
    render();
  });
};



function serializeJson(form) {
  const formData = new FormData(form);
  const o = {};
  formData.forEach((val, name) => o[name] = val);
  return JSON.stringify(o);
}

const submitNewBookmarkEventListener = function () {
  $('main').on('submit', '.add-new-bookmark', function (event){
    event.preventDefault();
    const formElemnet = $('.add-new-bookmark')[0];
    console.log($('.add-new-bookmark'));
    const jsonData = serializeJson(formElemnet);
    database.createBookmark(jsonData)
      .then(response => response.json())
      .then((newBookmark) => {
        database.addBookmarks(newBookmark); 
        render();
      });
    
    // debugger;
    // console.log(jsonData);
    // const localData = JSON.parse(jsonData);
    // database.STORE.bookmarks.push(localData);
    // console.log(database.STORE.bookmarks);
    database.STORE.adding = false;
  });
};

const filterBookmarkEventListener = function () {
  $('#filter-by-raiting').on('click', function (event){
    event.preventDefault();
    let filterValue = $('#filter-by-raiting').val();
    database.STORE.filter = filterValue;
    console.log(database.STORE.filter);
    render();
  });
};



const cancelNewBookmarkEventListener = function (){
  $('main').on('click', '#cancel-bookmark', function (event){
    event.preventDefault();
    database.STORE.adding = false;
    render();
  });
};

const deleteBookmarkEventListener = function() {
  $('main').on('click', '.delete-bookmark', function (event){
    event.preventDefault();
    console.log('hey');
    const id = getBookmarkIdFromElement(event.currentTarget);
    database.deleteBookmark(id)
      .then(response => response.json())
      .then(() => {
        console.log(id);
        database.storeDeleteBookmark(id);
        render();
      });
  });
};


const eventListeners = function () {
  addBookmarkEventListener();
  filterBookmarkEventListener();
  expandBookmarksEventListener();
  submitNewBookmarkEventListener();
  cancelNewBookmarkEventListener();
  deleteBookmarkEventListener();
  

};

const app = function (){

  database.getBookmarks()
    .then(response => response.json())
    .then((bookmarks) => {
      bookmarks.forEach((bookmark) => database.addBookmarks(bookmark));
      render();
    });

  render();
  eventListeners();

};

$(app);