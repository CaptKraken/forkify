import icons from 'url:../../images/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    // console.log(data);
    if (JSON.stringify(data) === '{}') return;
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._addToParentEl(markup);
  }
  update(data) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    if (JSON.stringify(data) === '{}') return;

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
        // console.log(newEl.firstChild?.nodeValue.trim());
      }

      //update data attr
      if (!newEl.isEqualNode(curEl))
        Array.from(newEl.attributes).forEach((attr) => {
          curEl.setAttribute(attr.name, attr.value);
        });
    });
  }

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

  _clear() {
    this._parentEl.innerHTML = ''; //removes the message
  }
  _addToParentEl(markup) {
    this._parentEl.insertAdjacentHTML('afterbegin', markup);
  }
}

//no exporting the class' instance. this class is only used as a parent class for other view classes
