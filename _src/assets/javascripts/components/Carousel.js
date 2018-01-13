class Carousel {
  constructor(carousel) {
    this.carousel = carousel
    this.container = this.carousel.querySelector('.carousel__slides')
    this.previousButton = this.carousel.querySelector('.carousel__controls-previous')
    this.nextButton = this.carousel.querySelector('.carousel__controls-next')
    this.slides = Array.from(this.carousel.querySelectorAll('.carousel__slides > li'))
    this.slideCount = this.slides.length

    this.currentCount = 1
    this.currentItem
    this.activeItem
    this.previousItem
    this.nextItem

    this.addEventListeners()
  }

  addEventListeners() {
    // previous arrow moves to previous slide
    this.previousButton.addEventListener('click', e => {
      e.preventDefault()
      this.currentCount === 1 ? this.currentCount = this.slideCount : this.currentCount--
      this.transitionItem()
    })

    // next arrow moves to next slide
    this.nextButton.addEventListener('click', e => {
      e.preventDefault()
      this.currentCount === this.slideCount ? this.currentCount = 1 : this.currentCount++
      this.transitionItem()
    })

    document.addEventListener('DOMContentLoaded', () => {
      // add data attributes to slides
      this.slides.forEach((el, i) => el.setAttribute('data-slide', i+1))

      // add data attributes to indicators
      // this.dots.forEach((el, i) => el.setAttribute('data-slide', i+1))

      // add helper classes when the carousel loads
      this.container.firstElementChild.classList.add('is-active')
      this.container.firstElementChild.nextElementSibling.classList.add('is-next')
      this.container.lastElementChild.classList.add('is-previous')

      // set current item count
      this.currentItem = this.carousel.querySelector(`[data-slide="${this.currentCount}"]`)
    })
  }

  transitionItem() {
    // get current active slide
    this.activeItem = this.carousel.querySelector('.is-active')
    this.currentItem = this.carousel.querySelector(`[data-slide="${this.currentCount}"]`)

    if (this.currentCount === 1) {
      // if we're at the beginning
      this.previousItem = this.container.lastElementChild
      this.nextItem = this.currentItem.nextElementSibling
    } else if (this.currentCount === this.slideCount) {
      // if we're at the end
      this.previousItem = this.currentItem.previousElementSibling
      this.nextItem = this.container.firstElementChild
    } else {
      // if we're somewhere in the middle
      this.previousItem = this.currentItem.previousElementSibling
      this.nextItem = this.currentItem.nextElementSibling
    }

    // remove class names
    this.slides.forEach(el => el.className = '')

    // update class names
    this.currentItem.className = 'is-active'
    this.previousItem.className = 'is-previous'
    this.nextItem.className = 'is-next'
  }
}

// class Carousel {
//   constructor() {
//     this.container = document.querySelector('.carousel--container')
//     this.controlsPrevious = document.querySelector('.carousel--controls-prev')
//     this.controlsNext = document.querySelector('.carousel--controls-next')
//     this.slides = Array.from(this.container.getElementsByTagName('li'))
//     this.slideCount = this.container.getElementsByTagName('li').length
//
//     this.indicators = document.querySelector('.carousel--indicators')
//     this.dots = Array.from(this.indicators.querySelectorAll('li'))
//     this.indicatorsLength = this.indicators.querySelectorAll('li').length
//
//     this.currentCount = 1
//     this.currentItem = ''
//     this.activeItem = ''
//     this.previousItem = ''
//     this.nextItem = ''
//
//     this.addEventListeners();
//   }
//
//   addEventListeners() {
//     // previous arrow moves to previous slide
//     this.controlsPrevious.addEventListener('click', e => {
//       e.preventDefault()
//       this.currentCount === 1 ? this.currentCount = this.slideCount : this.currentCount--
//       this.transitionItem()
//     })
//
//     // next arrow moves to next slide
//     this.controlsNext.addEventListener('click', e => {
//       e.preventDefault()
//       this.currentCount === this.slideCount ? this.currentCount = 1 : this.currentCount++
//       this.transitionItem()
//     })
//
//     // dot moves to appropriate slide
//     this.dots.forEach((dot, i) => {
//       dot.addEventListener('click', e => {
//         e.preventDefault()
//         console.log(currentItem);
//       })
//     })
//
//     document.addEventListener('DOMContentLoaded', () => {
//
//       // add data attributes to slides
//       this.slides.forEach((el, i) => el.setAttribute('data-slide', i+1))
//
//       // add data attributes to indicators
//       this.dots.forEach((el, i) => el.setAttribute('data-slide', i+1))
//
//       // add helper classes when the carousel loads
//       this.container.firstElementChild.classList.add('carousel--item-active')
//       this.container.firstElementChild.nextElementSibling.classList.add('carousel--item-next')
//       this.container.lastElementChild.classList.add('carousel--item-previous')
//
//       // set current item count
//       this.currentItem = document.querySelector(`[data-slide="${this.currentCount}"]`)
//     })
//   }
//
//   updateDots() {
//     this.dots.forEach((dot, i) => {
//       dot.classList.remove('is-active')
//       if (i == this.currentSlide) dot.classList.add('is-active')
//     })
//   }
//
//   transitionItem() {
//     // get current active slide
//     this.activeItem = document.querySelector('.carousel--item-active')
//     this.currentItem = document.querySelector(`[data-slide="${this.currentCount}"]`)
//
//     if (this.currentCount == 1) {
//       // if we're at the beginning
//       this.previousItem = this.container.lastElementChild
//       this.nextItem = this.currentItem.nextElementSibling
//     } else if (this.currentCount == this.slideCount) {
//       // if we're at the end
//       this.previousItem = this.currentItem.previousElementSibling
//       this.nextItem = this.container.firstElementChild
//     } else {
//       // if we're somewhere in the middle
//       this.previousItem = this.currentItem.previousElementSibling
//       this.nextItem = this.currentItem.nextElementSibling
//     }
//
//     // remove class names
//     this.slides.forEach(el => el.className = '')
//
//     // update class names
//     this.currentItem.className = 'carousel--item-active'
//     this.previousItem.className = 'carousel--item-previous'
//     this.nextItem.className = 'carousel--item-next'
//   }
// }
//
// export default Carousel;

export default Carousel;
