
const initialBookmarkTemplateView = function (bookmark) {
  let bookmarkTitle = `<h2><span class="app-link">${bookmark.title}</span></h2>`;
  let totalRating = '';
  let i = 0;
  while (bookmark.rating > i) {
    totalRating += '⭐';
    i++;
  }

  let bookmarkRaiting = `<div class="bookmark-raiting">${totalRating}</div>`;
  let bookmarkDescription = `<p class="bookmark-description">${bookmark.desc}</p>`;
  let bookmarkExpanded = '';
  let bookmarkAdd = '';
  //look at the state of the bookmark list
  if(bookmark.expanded === true) {
    bookmarkExpanded = `<div class="expanded-controls">
                                <a class="visit-website" href="${bookmark.url}" target="_blank">Open 🔗</a>
                                <button class="delete-bookmark">Delete</button>
                            </div>
                                ${bookmarkDescription}
                            <!--<div class="edit">
                             <button class="edit-bookmark">Edit</button> 
                            </div>-->`;
  }
    
  return `<div class="bookmark" data-bookmark="${bookmark.id}">
                ${bookmarkTitle}
                ${bookmarkAdd}
                ${bookmarkExpanded}
                ${bookmarkRaiting}
             </div>`;
};

const generateBookmarkHTMLstring = function (bookmarks) {
  const bookmarksString = bookmarks.map((bookmark) => initialBookmarkTemplateView(bookmark));
  return bookmarksString.join('');
};

const generateFilteredBookmarkHTMLString = function (bookmarks, raiting) {

//   const bookmarksString = bookmarks.map((bookmark) => initialBookmarkTemplateView(bookmark));
//   console.log(bookmarksString);
// //   const filteredBookmarksString = bookmarksString.
//   return bookmarksString.join('');
};


const addNewBookmarkTemplateView = function (){

  //you have to find the one to edit by using id
  let titleH2 = 'Create Bookmark';
  const bookmarkAdd = `<h2>${titleH2}</h2>
                          <form class="add-new-bookmark">
                              <input type="text" name="title" id="title" placeholder="Title" pattern="[a-zA-Z0-9_]+.*$" minlength="1" required>
                              <input type="text" name="url" value="https://" id="url" placeholder="https://website.com" pattern="https://.*|http://.*"  minlength="5" required>
                              <textarea name="desc" id="desc" placeholder="Description"></textarea>
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
  
const editBookmarkTemplateView = function (){
  let titleH2 = 'Edit Bookmark';
  let title = db.bookmarks.title;
  
  const bookmarkEdit = `<h2>${titleH2}</h2>
                          <form class="add-new-bookmark">
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
                                  <button type="submit" id="save-edited-bookmark">Save 🔖</button>
                                  <button id="cancel-bookmark">Cancel</button>
                              </div>
                          </form>`;
  return bookmarkEdit;
  
};

export default {
  initialBookmarkTemplateView,
  generateBookmarkHTMLstring,
  generateFilteredBookmarkHTMLString,
  addNewBookmarkTemplateView,
  editBookmarkTemplateView
};