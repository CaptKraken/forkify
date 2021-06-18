import * as model from '../js/model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';
import bookmarksView from './views/bookmarksView.js';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// import { slice } from 'core-js/core/array';

const recipeContainer = document.querySelector('.recipe');
const searchInput = document.querySelector('.search__field');

// https://forkify-api.herokuapp.com/v2
// 156b8c38-4dae-4e72-bc6f-43025b8945e0
///////////////////////////////////////

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipe = async function () {
  try {
    const recipeID = window.location.hash.slice(1);
    if (!recipeID) return; //no id
    recipeView.renderSpinner();

    //mark selected search result
    resultsView.update(model.getSearchResultPage());

    //loading recipe
    await model.loadRecipe(recipeID);

    //update bookmark
    bookmarksView.update(model.state.bookmarks);

    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

controlRecipe();

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();

    //get search query from the search input
    const query = searchView.getQuery();
    if (!query) return; //guard clause

    //load search recipe
    await model.loadSearchResult(query);

    //render results
    resultsView.render(model.getSearchResultPage(1));
    // render initial pagination buttons
    paginationView.render(model.state.search);
  } catch (error) {}
};

const controlResultPage = (goToPage) => {
  resultsView.render(model.getSearchResultPage(goToPage));
  paginationView.render(model.state.search);
};

const controlServings = (newServings) => {
  model.updateServings(newServings);
  //update recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = () => {
  //add or remove
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.removeBookmark(model.state.recipe.id);
  }

  //update recipe view
  recipeView.update(model.state.recipe);
  // bookmarksView.update(model.state.bookmarks);

  //render bookmarks

  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = () => {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlResultPage);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
};

init();

searchInput.addEventListener('input', () => {
  // searchView.getQuery();
});
