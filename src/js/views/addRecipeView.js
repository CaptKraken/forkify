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
  _generateMarkup() {}
}

export default new AddRecipeView();
