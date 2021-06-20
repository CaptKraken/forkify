import icons from 'url:../../images/icons.svg';

export default class View {
  _data;

  /**
   * render the received object to the DOM
   * @param {Object | Object[]} data the data to be render (i.e: a recipe)
   * @param {boolean} [render=true] (default true) if false, create markup string instead of rendering to the DOM
   * @returns {undefined | string} a markup string is returned if render= false
   * @this {Object} View instance
   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    if (JSON.stringify(data) === '{}') return;
    this._data = data;
    const markup = this._generateMarkup();

    if (!render) return markup;

    this._clear();
    this._addToParentEl(markup);
  }

  /**
   * update the view by comparing the existing elements with the received elements
   * @param {Object} data  the received data to use as a new markup
   */
  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDom = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDom.querySelectorAll('*'));
    const currentElements = Array.from(this._parentEl.querySelectorAll('*'));
    newElements.forEach((newEl, i) => {
      const curEl = currentElements[i];
      //update changed text
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() != ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      //update data attr
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
    });
  }

  /**
   * This is used to reset the add recipe window and nothing else because other views dont really need to reset and the _generateMarkup for other views dont have static markup like addRecipeView.
   */
  reset() {
    this._clear();
    this._addToParentEl(this._generateMarkup());
  }

  /**
   * Renders error a message and display it to the DOM
   * @param {string} message (default to the view _errorMessage), but you can pass a string in there
   */
  renderError(message = this._errorMessage) {
    const markup = `
      <div class="error">
        <div>
          <svg>
            <use href="${icons}#icon-alert-triangle"></use>
          </svg>
        </div>
        <p>${message}</p>
      </div>`;
    this._clear();
    this._addToParentEl(markup);
  }

  /**
   *Renders a message and display it to the DOM. i.e message telling user to search for a recipe or the empty bookmark message
   * @param {string} message (default to the view _errorMessage), but you can pass a string in there
   */
  renderMessage(message = this._message) {
    const markup = `
      <div class="message">
            <div>
              <svg>
                <use href="${icons}#icon-smile"></use>
              </svg>
            </div>
            <p>${message}</p>
      </div>`;
    this._clear();
    this._addToParentEl(markup);
  }

  /**
   * render a loading spinner to the DOM
   */
  renderSpinner() {
    const markup = `
      <div class="spinner">
        <svg>
          <use href="${icons}#icon-loader"></use>
        </svg>
      </div>
    `;
    this._clear();
    this._addToParentEl(markup);
  }

  /**
   * clears the parent element's innerHTML, usually to prepare for a new render
   */
  _clear() {
    this._parentEl.innerHTML = ''; //removes the message
  }

  /**
   * insert html markup to parent element
   * @param {string} markup usually the generated markup
   */
  _addToParentEl(markup) {
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

//no exporting the class' instance. this class is only used as a parent class for other view classes
