import { scrollPosition } from '../utilities/scrollPosition'

class Navigation {

  constructor() {
    this.navHeader = document.querySelector('.navigation__header');

    this.activeClass = `is-collapsed`

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', () => {
      console.log(scrollPosition('static'));
      (scrollPosition('static') > 60)
        ? this.addActiveClass()
        : this.removeActiveClass()
    })
  }

  addActiveClass() {
    this.navHeader.classList.add(this.activeClass);
  }

  removeActiveClass() {
    this.navHeader.classList.remove(this.activeClass);
  }
}

export default Navigation;
