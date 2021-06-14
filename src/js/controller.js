import * as model from "../js/model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
// import { slice } from 'core-js/core/array';

const recipeContainer = document.querySelector(".recipe");

//rendering error message
// const markup = `
// <div class="message" style="flex-direction: column; margin: 0 auto; text-align: center;">
// <svg style="height: 5rem; width: 5rem" id="icon-alert-triangle" viewBox="0 0 24 24">
//   <path d="M11.148 4.374c0.073-0.123 0.185-0.242 0.334-0.332 0.236-0.143 0.506-0.178 0.756-0.116s0.474 0.216 0.614 0.448l8.466 14.133c0.070 0.12 0.119 0.268 0.128 0.434-0.015 0.368-0.119 0.591-0.283 0.759-0.18 0.184-0.427 0.298-0.693 0.301l-16.937-0.001c-0.152-0.001-0.321-0.041-0.481-0.134-0.239-0.138-0.399-0.359-0.466-0.607s-0.038-0.519 0.092-0.745zM9.432 3.346l-8.47 14.14c-0.422 0.731-0.506 1.55-0.308 2.29s0.68 1.408 1.398 1.822c0.464 0.268 0.976 0.4 1.475 0.402h16.943c0.839-0.009 1.587-0.354 2.123-0.902s0.864-1.303 0.855-2.131c-0.006-0.536-0.153-1.044-0.406-1.474l-8.474-14.147c-0.432-0.713-1.11-1.181-1.854-1.363s-1.561-0.081-2.269 0.349c-0.429 0.26-0.775 0.615-1.012 1.014zM11 9v4c0 0.552 0.448 1 1 1s1-0.448 1-1v-4c0-0.552-0.448-1-1-1s-1 0.448-1 1zM12 18c0.552 0 1-0.448 1-1s-0.448-1-1-1-1 0.448-1 1 0.448 1 1 1z"></path>
// </svg>
//   <p style="margin-left: 0">Please try loading another recipe.</p>
//   <p style="margin-left: 0">${error}</p>
// </div>
// `;
// const recipeContainer = document.querySelector(".recipe");
// recipeContainer.innerHTML = "";
// recipeContainer.insertAdjacentHTML("afterbegin", markup);

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

["hashchange", "load"].forEach((e) => {
  window.addEventListener(e, showRecipe);
});
