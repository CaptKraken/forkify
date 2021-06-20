import View from './View';
import icons from 'url:../../images/icons.svg';
import { MODAL_CLOSE_TIMEOUT } from '../config';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _message = `Recipe was successfully uploaded.this window will close automatically.`;
  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnClose = document.querySelector('.btn--close-modal');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');

  constructor() {
    super();
    this._addHandlerShowWindow();
  }

  toggleWindow() {
    [this._window, this._overlay].forEach((el) =>
      el.classList.toggle('hidden')
    );
  }

  _addHandlerShowWindow() {
    [this._btnOpen, this._btnClose, this._overlay].forEach((el) =>
      el.addEventListener('click', () => {
        this.toggleWindow();
      })
    );
  }

  addHandlerUpload(handler) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      const dataArr = [...new FormData(this)];
      const data = Object.fromEntries(dataArr);
      handler(data);
    });
  }
  _generateMarkup() {
    return `<div class="upload__column">
    <h3 class="upload__heading">Recipe data</h3>
    <label>Title</label>
    <input value="" required name="title" type="text" />
    <label>URL</label>
    <input value="" required name="sourceUrl" type="text" />
    <label>Image URL</label>
    <input value="" required name="image" type="text" />
    <label>Publisher</label>
    <input value="" required name="publisher" type="text" />
    <label>Prep time</label>
    <input value="23" required name="cookingTime" type="number" />
    <label>Servings</label>
    <input value="23" required name="servings" type="number" />
  </div>

  <div class="upload__column">
    <h3 class="upload__heading">Ingredients</h3>
    <label>Ingredient 1</label>
    <input
      value=""
      type="text"
      required
      name="ingredient-1"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 2</label>
    <input
      value=""
      type="text"
      name="ingredient-2"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 3</label>
    <input
      value=""
      type="text"
      name="ingredient-3"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 4</label>
    <input
      type="text"
      name="ingredient-4"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 5</label>
    <input
      type="text"
      name="ingredient-5"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
    <label>Ingredient 6</label>
    <input
      type="text"
      name="ingredient-6"
      placeholder="Format: 'Quantity,Unit,Description'"
    />
  </div>

  <button class="btn upload__btn">
    <svg id="icon-upload-cloud" viewBox="0 0 24 24">
      <path
        d="M11 14.414v6.586c0 0.552 0.448 1 1 1s1-0.448 1-1v-6.586l2.293 2.293c0.391 0.391 1.024 0.391 1.414 0s0.391-1.024 0-1.414l-4-4c-0.092-0.092-0.202-0.166-0.324-0.217s-0.253-0.076-0.383-0.076c-0.256 0-0.512 0.098-0.707 0.293l-4 4c-0.391 0.391-0.391 1.024 0 1.414s1.024 0.391 1.414 0zM20.869 19.268c1.454-0.793 2.451-2.102 2.884-3.574s0.305-3.112-0.488-4.566c-0.679-1.245-1.737-2.155-2.959-2.663-0.724-0.301-1.505-0.46-2.299-0.465h-0.527c-0.725-2.057-2.144-3.708-3.917-4.752-1.983-1.168-4.415-1.581-6.821-0.959s-4.333 2.162-5.502 4.145-1.581 4.415-0.959 6.821c0.372 1.437 1.073 2.709 1.975 3.713 0.369 0.411 1.002 0.444 1.412 0.075s0.444-1.002 0.075-1.412c-0.688-0.765-1.235-1.75-1.526-2.877-0.484-1.872-0.164-3.761 0.746-5.305s2.407-2.74 4.279-3.224 3.761-0.164 5.305 0.746 2.74 2.407 3.224 4.279c0.116 0.435 0.506 0.75 0.969 0.75h1.253c0.536 0.004 1.061 0.111 1.545 0.312 0.815 0.339 1.517 0.943 1.97 1.773 0.529 0.97 0.615 2.061 0.325 3.044s-0.953 1.854-1.923 2.382c-0.485 0.264-0.664 0.872-0.399 1.357s0.872 0.664 1.357 0.399z"
      ></path>
    </svg>
    <span>Upload</span>
  </button>`;
  }
}

export default new AddRecipeView();
