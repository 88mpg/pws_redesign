import jump from 'jump.js'
import { scrollPosition } from '../utilities/scrollPosition'

class BackToTop {
  constructor() {
    this.button = document.querySelector('.js-backToTop')

    this.addEventListeners()
  }

  addEventListeners() {
    this.button.addEventListener('click', e => {
      e.preventDefault()
      jump('body', {
        duration: 750
      })
    })

    window.addEventListener('scroll', e => {
      scrollPosition('percent') > 50
        ? this.hideButton()
        : this.showButton()
    })
  }

  showButton() {
    this.button.classList.add('is-active')
  }

  hideButton() {
    this.button.classList.remove('is-active')
  }
}

export default BackToTop
