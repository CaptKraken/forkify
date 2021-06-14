import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
// import { slice } from 'core-js/core/array';

const recipeContainer = document.querySelector(".recipe");

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2
// 156b8c38-4dae-4e72-bc6f-43025b8945e0
///////////////////////////////////////

//TODO: refactor this whole thing later
const showRecipe = async function () {
  try {
    const recipeID = window.location.hash.slice(1);
    if (!recipeID) return; //no id => show message

    recipeView.renderSpinner(recipeContainer);
    //loading recipe
    await model.loadRecipe(recipeID);
    //rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

showRecipe();

// ["hashchange", "load"].forEach((e) => window.addEventListener(e, showRecipe));
window.addEventListener("hashchange", showRecipe);
window.addEventListener("load", showRecipe);
