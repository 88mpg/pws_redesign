class Search {
  constructor() {
    this.searchIcon = document.querySelector('.js-searchButton')
    this.searchField = document.querySelector('.search')
    this.searchInput = document.querySelector('.search input[type="search"]')
    this.searchClose = document.querySelector('.js-searchClose')

    this.activeClass = `is-active`

    this.addEventListeners();
  }

  addEventListeners() {
    this.searchIcon.addEventListener('click', e => {
      e.preventDefault();

      !this.searchField.classList.contains(this.activeClass)
        ? this.expandSearch()
        : this.collapseSearch()
    })

    this.searchClose.addEventListener('click', e => {
      e.preventDefault();
      this.collapseSearch();
    })
  }

  expandSearch() {
    this.searchField.classList.add(this.activeClass);
    this.searchInput.focus()
  }

  collapseSearch() {
    this.searchField.classList.remove(this.activeClass);
  }
}

export default Search;
