class Navigation {

  constructor() {
    this.navHeader = document.querySelector('.navigation__header');

    this.activeClass = `is-active`

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', () => {
      console.log('scrolling');
    })
  }

  addActiveClass() {
    this.navHeader.classList.add(this.activeClass);
  }

  removeActiveClass() {
    this.navHeader.classList.add(this.activeClass);
  }
}

export default Navigation;
