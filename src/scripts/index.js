import 'normalize.css';
import '../css/index.css';
import $ from 'jquery';

const db = {
  bookmarks: [
    {
      id: 'x56w',
      title: 'Google',
      rating: 5,
      url: 'http://www.title1.com',
      description: 'lorem ipsum dolor sit',
      expanded: false
    },
    {
      id: '6ffw',
      title: 'Amazon',
      rating: 2,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: true
    },
    {
      id: '33xz',
      title: 'EBay',
      rating: 4,
      url: 'http://www.title2.com',
      description: 'dolorum tempore deserunt',
      expanded: false
    } 
  ],
  adding: false,
  editing: false,
  error: null,
  filter: 0
};

const generateAddNewBookmarktemplate = function (){

  //you have to find the one to edit by using id
  let titleH2 = 'Create Bookmark';
  const bookmarkAdd = `<h2>${titleH2}</h2>
                        <form>
                            <input type="text" name="title" id="title" placeholder="Title" required>
                            <input type="text" name="url" id="url" placeholder="https://website.com" required>
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                            <div class="add-raiting">
                                <fieldset class="rating">
                                    <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="5 Stars">5 Stars</label>
                                    <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 Stars">4 Stars</label>
                                    <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 Stars">3 Stars</label>
                                    <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 Stars">2 Stars</label>
                                    <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 Star">1 Star</label>
                                </fieldset>
                            </div>
                                <button id="save-bookmark">Save 🔖</button>
                                <button id="cancel-bookmark">Cancel</button>
                            </div>
                        </form>`;
  return bookmarkAdd;
};

const generateEditBookmarktemplate = function (){
  let titleH2 = 'Edit Bookmark';
  let title = db.bookmarks.title;
  console.log(db.bookmarks[title]);

  const bookmarkEdit = `<h2>${titleH2}</h2>
                        <form>
                            <input type="text" name="title" id="title" placeholder="Title" value="${title}" required>
                            <input type="text" name="url" id="url" placeholder="https://website.com" required>
                            <textarea name="description" id="description" placeholder="Description"></textarea>
                            <div class="add-raiting">
                                <fieldset class="rating">
                                    <input type="radio" id="star5" name="rating" value="5" /><label for="star5" title="5 Stars">5 Stars</label>
                                    <input type="radio" id="star4" name="rating" value="4" /><label for="star4" title="4 Stars">4 Stars</label>
                                    <input type="radio" id="star3" name="rating" value="3" /><label for="star3" title="3 Stars">3 Stars</label>
                                    <input type="radio" id="star2" name="rating" value="2" /><label for="star2" title="2 Stars">2 Stars</label>
                                    <input type="radio" id="star1" name="rating" value="1" /><label for="star1" title="1 Star">1 Star</label>
                                </fieldset>
                            </div>
                                <button id="save-edited-bookmark">Save 🔖</button>
                                <button id="cancel-bookmark">Cancel</button>
                            </div>
                        </form>`;
  return bookmarkEdit;

};

const generateBookmarkHTMLtemplate = function (bookmark) {
  let bookmarkTitle = `<h2>${bookmark.title}</h2>`;
  let bookmarkRaiting = '<div class="bookmark-raiting">⭐⭐⭐⭐⭐</div>';
  let bookmarkDescription = `<p class="bookmark-description">${bookmark.description}</p>`;
  let bookmarkExpanded = '';
  let bookmarkAdd = '';
  //look at the state of the bookmark list
  if(bookmark.expanded === true) {
    bookmarkExpanded = `<div class="expanded-controls">
                            <button class="visit-website">Open 🔗</button>
                            <button class="delete-bookmark">Delete</button>
                        </div>
                            ${bookmarkDescription}
                        <div class="edit">
                            <button class="edit-bookmark">Edit</button>
                        </div>`;
  }

  return `<div class="bookmark">
            ${bookmarkTitle}
            ${bookmarkAdd}
            ${bookmarkExpanded}
            ${bookmarkRaiting}
         </div>`;
};

const generateBookmarkHTMLstring = function (db) {
  const bookmarks = db.map((bookmark) => generateBookmarkHTMLtemplate(bookmark));
  return bookmarks.join('');
};



const render = function () {

  const bookmarks = db.bookmarks;
  debugger;


  if(db.adding === true) {
    const addView = generateAddNewBookmarktemplate();
    $('#all-bookmarks').html(addView);
  } else if (db.editing === true) {
    const addEdit = generateEditBookmarktemplate();
    $('#all-bookmarks').html(addEdit);
  } else {
    //render the initial bookmarks to the initial view
    const bookmarksHTMLString = generateBookmarkHTMLstring(bookmarks);
    console.log(bookmarksHTMLString);
    $('#all-bookmarks').html(bookmarksHTMLString);
  }



  
    

};

const addBookmarkEventListener = function () {
  $('#add-bookmark').on('click',  function () {
    db.adding = true;
    render();
  });
};

const addBookmark = function (bookmark) {};

const eventListeners = function () {
  addBookmarkEventListener();
};

const app = function (){
  render();
  eventListeners();

};

$(app);