import { async } from 'regenerator-runtime';
import { API_URL, RESULTS_PER_PAGE } from './config';
import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RESULTS_PER_PAGE,
  },
  bookmarks: [],
};

export const loadRecipe = async function (recipeID) {
  try {
    const data = await getJSON(`${API_URL}${recipeID}`);
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

    state.recipe.bookmarked = state.bookmarks.some(
      (bookmark) => bookmark.id === state.recipe.id
    )
      ? true
      : false;
  } catch (error) {
    throw error;
  }
};

export const loadSearchResult = async (query) => {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    state.search.results = data.data.recipes.map((recipe) => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
      };
    });

    // state.search.page = 1;
  } catch (error) {
    throw error;
  }
};

export const getSearchResultPage = (page = state.search.page) => {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
};

export const updateServings = (newServings) => {
  if (newServings <= 0) newServings = 1;
  state.recipe.ingredients.forEach((ingredient) => {
    if (!ingredient.quantity) return;
    const res = (ingredient.quantity * newServings) / state.recipe.servings;

    const str = res.toString();
    // if res has ".00", remove it. if not, return res.
    ingredient.quantity = !str.includes('.00')
      ? res
      : Number(str.slice(0, str.indexOf('.00')));
  });

  state.recipe.servings = newServings;
};

const persistBookmarks = () => {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
};

export const addBookmark = (recipe) => {
  //add bookmark
  state.bookmarks.push(recipe);

  if ((recipe.id = state.recipe.id)) state.recipe.bookmarked = true;
  persistBookmarks();
};
export const removeBookmark = function (id) {
  //removeBookmark
  const index = state.bookmarks.findIndex((el) => (el.id = id));
  state.bookmarks.splice(index, 1);

  if ((id = state.recipe.id)) state.recipe.bookmarked = false;
  persistBookmarks();
};

const init = () => {
  const storage = localStorage.getItem('bookmarks');
  if (storage) state.bookmarks = JSON.parse(storage);
};

init();

const clearBookmarks = () => {
  localStorage.clear('bookmarks');
};
