import View from './View';
import icons from 'url:../../images/icons.svg';

class PaginationView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _btnGenerator(direction, currentPage) {
    //declearing currentPage up there as a class field gave me an error and im too lazy to investigate it, so here we are.
    const page =
      direction === 'next' ? `${currentPage + 1}` : `${currentPage - 1}`;
    const arrDir = direction === 'next' ? 'right' : 'left';

    const markup = `
        <button data-goto="${page}" class="btn--inline pagination__btn--${direction}"${
      direction === 'prev' ? ' style="flex-direction: row-reverse;"' : ''
    }>
        <span>Page ${page}</span>
        <svg class="search__icon">
            <use href="${icons}#icon-arrow-${arrDir}"></use>
        </svg>
        </button>
        `;

    return markup;
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.page;

    //page 1 w/ no other page or no result at all
    if (numPages === 1 || numPages <= 0) return '';
    //page 1 w/ other pages
    if (currentPage === 1 && numPages > 1) {
      return this._btnGenerator('next', currentPage);
    }
    //pages in the middle
    if (currentPage < numPages) {
      //prettier-ignore
      return `${this._btnGenerator("prev", currentPage)}${this._btnGenerator("next", currentPage)}`;
    }
    // last page
    if (currentPage === numPages) {
      return this._btnGenerator('prev', currentPage);
    }
  }
}

export default new PaginationView();
