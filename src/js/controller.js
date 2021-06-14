import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
// import { slice } from 'core-js/core/array';

const recipeContainer = document.querySelector(".recipe");

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

const init = function () {
  recipeView.addHandlerRender(controlRecipe);
};

init();
