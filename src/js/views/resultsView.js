import View from "./View";
import icons from "url:../../images/icons.svg";

class ResultView extends View {
  _parentEl = document.querySelector(".results");
  _errorMessage = "No recipe found for your query! Please try again.";
  _generateMarkup() {
    return this._data
      .map((result) => this._generateMarkupPreview(result))
      .join("");
  }
  _generateMarkupPreview(result) {
    return `
    <li class="preview">
        <a class="preview__link" href="#${result.id}">
            <figure class="preview__fig">
                <img src="${result.image}" alt="${result.title}" />
            </figure>
            <div class="preview__data">
                <h4 class="preview__title">
                    ${result.title}
                </h4>
                <p class="preview__publisher">${result.publisher}</p>
                
            </div>
        </a>
    </li>
  `;
    // <div class="preview__user-generated">
    //     <svg>
    //         <use href="${icons}#icon-user"></use>
    //     </svg>
    // </div>
  }
}

export default new ResultView();
