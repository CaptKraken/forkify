import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
// import { slice } from 'core-js/core/array';

const recipeContainer = document.querySelector(".recipe");
const searchInput = document.querySelector(".search__field");

// https://forkify-api.herokuapp.com/v2
// 156b8c38-4dae-4e72-bc6f-43025b8945e0
///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const recipeID = window.location.hash.slice(1);
    if (!recipeID) return; //no id

    recipeView.renderSpinner(recipeContainer);
    //loading recipe
    await model.loadRecipe(recipeID);
    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
    recipeView.renderError();
  }
};

controlRecipe();

const controlSearchResults = async function () {
  try {
    //get search query from the search input
    const query = searchView.getQuery();
    if (!query) return; //guard clause

    //load search recipe
    await model.loadSearchResult(query);

    console.log(model.state.search.results);
  } catch (error) {}
};

controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecipe);
  searchView.addHandlerSearch(controlSearchResults);
};

init();

searchInput.addEventListener("input", () => {
  // searchView.getQuery();
});
