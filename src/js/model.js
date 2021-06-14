import { API_URL } from "./config";
import { getJSON } from "./helpers";

export const state = {
  recipe: {},
};

export const loadRecipe = async function (recipeID) {
  try {
    const data = await getJSON(`${API_URL}/${recipeID}`);
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
  } catch (error) {
    console.error(`⚠️ ${error}`);
  }
};