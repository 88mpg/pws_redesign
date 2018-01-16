/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.container = this.carousel.querySelector('.carousel__slides');
    this.previousButton = this.carousel.querySelector('.carousel__controls-prev');
    this.nextButton = this.carousel.querySelector('.carousel__controls-next');
    this.slides = Array.from(this.carousel.querySelectorAll('.carousel__slides > li'));
    this.slideCount = this.slides.length;

    this.currentCount = 1;
    this.currentItem;
    this.activeItem;
    this.previousItem;
    this.nextItem;

    this.addEventListeners();
  }

  addEventListeners() {
    // previous arrow moves to previous slide
    this.previousButton.addEventListener('click', e => {
      e.preventDefault();
      this.currentCount === 1 ? this.currentCount = this.slideCount : this.currentCount--;
      this.transitionItem();
    });

    // next arrow moves to next slide
    this.nextButton.addEventListener('click', e => {
      e.preventDefault();
      this.currentCount === this.slideCount ? this.currentCount = 1 : this.currentCount++;
      this.transitionItem();
    });

    document.addEventListener('DOMContentLoaded', () => {
      // add data attributes to slides
      this.slides.forEach((el, i) => el.setAttribute('data-slide', i + 1));

      // add data attributes to indicators
      // this.dots.forEach((el, i) => el.setAttribute('data-slide', i+1))

      // add helper classes when the carousel loads
      this.container.firstElementChild.classList.add('is-active');
      this.container.firstElementChild.nextElementSibling.classList.add('is-next');
      this.container.lastElementChild.classList.add('is-previous');

      // set current item count
      this.currentItem = this.carousel.querySelector(`[data-slide="${this.currentCount}"]`);
    });
  }

  transitionItem() {
    // get current active slide
    this.activeItem = this.carousel.querySelector('.is-active');
    this.currentItem = this.carousel.querySelector(`[data-slide="${this.currentCount}"]`);

    if (this.currentCount === 1) {
      // if we're at the beginning
      this.previousItem = this.container.lastElementChild;
      this.nextItem = this.currentItem.nextElementSibling;
    } else if (this.currentCount === this.slideCount) {
      // if we're at the end
      this.previousItem = this.currentItem.previousElementSibling;
      this.nextItem = this.container.firstElementChild;
    } else {
      // if we're somewhere in the middle
      this.previousItem = this.currentItem.previousElementSibling;
      this.nextItem = this.currentItem.nextElementSibling;
    }

    // remove class names
    this.slides.forEach(el => el.className = '');

    // update class names
    this.currentItem.className = 'is-active';
    this.previousItem.className = 'is-previous';
    this.nextItem.className = 'is-next';
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

/* harmony default export */ __webpack_exports__["a"] = (Carousel);

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Navigation {

  constructor() {
    this.navHeader = document.querySelector('.navigation__header');

    this.activeClass = `is-active`;

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', () => {
      console.log('scrolling');
    });
  }

  addActiveClass() {
    this.navHeader.classList.add(this.activeClass);
  }

  removeActiveClass() {
    this.navHeader.classList.add(this.activeClass);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Navigation);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Search {
  constructor() {
    this.searchIcon = document.querySelector('.js-searchButton');
    this.searchField = document.querySelector('.search');
    this.searchInput = document.querySelector('.search input[type="search"]');
    this.searchClose = document.querySelector('.js-searchClose');

    this.activeClass = `is-active`;

    this.addEventListeners();
  }

  addEventListeners() {
    this.searchIcon.addEventListener('click', e => {
      e.preventDefault();

      !this.searchField.classList.contains(this.activeClass) ? this.expandSearch() : this.collapseSearch();
    });

    this.searchClose.addEventListener('click', e => {
      e.preventDefault();
      this.collapseSearch();
    });
  }

  expandSearch() {
    this.searchField.classList.add(this.activeClass);
    this.searchInput.focus();
  }

  collapseSearch() {
    this.searchField.classList.remove(this.activeClass);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Search);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Theme {

  constructor() {
    this.themes = ["Macho Man"];

    this.themeMenu = document.querySelector('select[name="themes"]');

    this.populateThemeSelector();
    this.addEventListeners();
  }

  addEventListeners() {
    this.themeMenu.addEventListener('change', e => {
      e.preventDefault();

      const theme = e.target.value;

      document.body.classList = theme;
    });
  }

  populateThemeSelector() {
    this.themes.forEach(theme => {
      let themeClass = theme.replace(/ /g, "_").toLowerCase();

      let option = document.createElement('option');
      option.value = `theme__${themeClass}`;
      option.innerHTML = theme;

      this.themeMenu.appendChild(option);
    });
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Theme);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Navigation__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Theme__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Search__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Carousel__ = __webpack_require__(0);





if (document.querySelector('.navigation__header')) new __WEBPACK_IMPORTED_MODULE_0__components_Navigation__["a" /* default */]();
if (document.querySelector('select[name="themes"]')) new __WEBPACK_IMPORTED_MODULE_1__components_Theme__["a" /* default */]();
if (document.querySelector('.search')) new __WEBPACK_IMPORTED_MODULE_2__components_Search__["a" /* default */]();

if (document.querySelector('.carousel')) {
	const carousels = document.querySelectorAll('.carousel');
	for (let carouselsIndex = 0, length = carousels.length; carouselsIndex < length; carouselsIndex++) {
		new __WEBPACK_IMPORTED_MODULE_3__components_Carousel__["a" /* default */](carousels[carouselsIndex]);
	}
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgMGVmMTQxZDA3MGRmMTNiMmNjNGQiLCJ3ZWJwYWNrOi8vLy4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9DYXJvdXNlbC5qcyIsIndlYnBhY2s6Ly8vLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL05hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9UaGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbIkNhcm91c2VsIiwiY29uc3RydWN0b3IiLCJjYXJvdXNlbCIsImNvbnRhaW5lciIsInF1ZXJ5U2VsZWN0b3IiLCJwcmV2aW91c0J1dHRvbiIsIm5leHRCdXR0b24iLCJzbGlkZXMiLCJBcnJheSIsImZyb20iLCJxdWVyeVNlbGVjdG9yQWxsIiwic2xpZGVDb3VudCIsImxlbmd0aCIsImN1cnJlbnRDb3VudCIsImN1cnJlbnRJdGVtIiwiYWN0aXZlSXRlbSIsInByZXZpb3VzSXRlbSIsIm5leHRJdGVtIiwiYWRkRXZlbnRMaXN0ZW5lcnMiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInByZXZlbnREZWZhdWx0IiwidHJhbnNpdGlvbkl0ZW0iLCJkb2N1bWVudCIsImZvckVhY2giLCJlbCIsImkiLCJzZXRBdHRyaWJ1dGUiLCJmaXJzdEVsZW1lbnRDaGlsZCIsImNsYXNzTGlzdCIsImFkZCIsIm5leHRFbGVtZW50U2libGluZyIsImxhc3RFbGVtZW50Q2hpbGQiLCJwcmV2aW91c0VsZW1lbnRTaWJsaW5nIiwiY2xhc3NOYW1lIiwiTmF2aWdhdGlvbiIsIm5hdkhlYWRlciIsImFjdGl2ZUNsYXNzIiwid2luZG93IiwiY29uc29sZSIsImxvZyIsImFkZEFjdGl2ZUNsYXNzIiwicmVtb3ZlQWN0aXZlQ2xhc3MiLCJTZWFyY2giLCJzZWFyY2hJY29uIiwic2VhcmNoRmllbGQiLCJzZWFyY2hJbnB1dCIsInNlYXJjaENsb3NlIiwiY29udGFpbnMiLCJleHBhbmRTZWFyY2giLCJjb2xsYXBzZVNlYXJjaCIsImZvY3VzIiwicmVtb3ZlIiwiVGhlbWUiLCJ0aGVtZXMiLCJ0aGVtZU1lbnUiLCJwb3B1bGF0ZVRoZW1lU2VsZWN0b3IiLCJ0aGVtZSIsInRhcmdldCIsInZhbHVlIiwiYm9keSIsInRoZW1lQ2xhc3MiLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJjYXJvdXNlbHMiLCJjYXJvdXNlbHNJbmRleCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ2hFQSxNQUFNQSxRQUFOLENBQWU7QUFDYkMsY0FBWUMsUUFBWixFQUFzQjtBQUNwQixTQUFLQSxRQUFMLEdBQWdCQSxRQUFoQjtBQUNBLFNBQUtDLFNBQUwsR0FBaUIsS0FBS0QsUUFBTCxDQUFjRSxhQUFkLENBQTRCLG1CQUE1QixDQUFqQjtBQUNBLFNBQUtDLGNBQUwsR0FBc0IsS0FBS0gsUUFBTCxDQUFjRSxhQUFkLENBQTRCLDBCQUE1QixDQUF0QjtBQUNBLFNBQUtFLFVBQUwsR0FBa0IsS0FBS0osUUFBTCxDQUFjRSxhQUFkLENBQTRCLDBCQUE1QixDQUFsQjtBQUNBLFNBQUtHLE1BQUwsR0FBY0MsTUFBTUMsSUFBTixDQUFXLEtBQUtQLFFBQUwsQ0FBY1EsZ0JBQWQsQ0FBK0Isd0JBQS9CLENBQVgsQ0FBZDtBQUNBLFNBQUtDLFVBQUwsR0FBa0IsS0FBS0osTUFBTCxDQUFZSyxNQUE5Qjs7QUFFQSxTQUFLQyxZQUFMLEdBQW9CLENBQXBCO0FBQ0EsU0FBS0MsV0FBTDtBQUNBLFNBQUtDLFVBQUw7QUFDQSxTQUFLQyxZQUFMO0FBQ0EsU0FBS0MsUUFBTDs7QUFFQSxTQUFLQyxpQkFBTDtBQUNEOztBQUVEQSxzQkFBb0I7QUFDbEI7QUFDQSxTQUFLYixjQUFMLENBQW9CYyxnQkFBcEIsQ0FBcUMsT0FBckMsRUFBOENDLEtBQUs7QUFDakRBLFFBQUVDLGNBQUY7QUFDQSxXQUFLUixZQUFMLEtBQXNCLENBQXRCLEdBQTBCLEtBQUtBLFlBQUwsR0FBb0IsS0FBS0YsVUFBbkQsR0FBZ0UsS0FBS0UsWUFBTCxFQUFoRTtBQUNBLFdBQUtTLGNBQUw7QUFDRCxLQUpEOztBQU1BO0FBQ0EsU0FBS2hCLFVBQUwsQ0FBZ0JhLGdCQUFoQixDQUFpQyxPQUFqQyxFQUEwQ0MsS0FBSztBQUM3Q0EsUUFBRUMsY0FBRjtBQUNBLFdBQUtSLFlBQUwsS0FBc0IsS0FBS0YsVUFBM0IsR0FBd0MsS0FBS0UsWUFBTCxHQUFvQixDQUE1RCxHQUFnRSxLQUFLQSxZQUFMLEVBQWhFO0FBQ0EsV0FBS1MsY0FBTDtBQUNELEtBSkQ7O0FBTUFDLGFBQVNKLGdCQUFULENBQTBCLGtCQUExQixFQUE4QyxNQUFNO0FBQ2xEO0FBQ0EsV0FBS1osTUFBTCxDQUFZaUIsT0FBWixDQUFvQixDQUFDQyxFQUFELEVBQUtDLENBQUwsS0FBV0QsR0FBR0UsWUFBSCxDQUFnQixZQUFoQixFQUE4QkQsSUFBRSxDQUFoQyxDQUEvQjs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsV0FBS3ZCLFNBQUwsQ0FBZXlCLGlCQUFmLENBQWlDQyxTQUFqQyxDQUEyQ0MsR0FBM0MsQ0FBK0MsV0FBL0M7QUFDQSxXQUFLM0IsU0FBTCxDQUFleUIsaUJBQWYsQ0FBaUNHLGtCQUFqQyxDQUFvREYsU0FBcEQsQ0FBOERDLEdBQTlELENBQWtFLFNBQWxFO0FBQ0EsV0FBSzNCLFNBQUwsQ0FBZTZCLGdCQUFmLENBQWdDSCxTQUFoQyxDQUEwQ0MsR0FBMUMsQ0FBOEMsYUFBOUM7O0FBRUE7QUFDQSxXQUFLaEIsV0FBTCxHQUFtQixLQUFLWixRQUFMLENBQWNFLGFBQWQsQ0FBNkIsZ0JBQWUsS0FBS1MsWUFBYSxJQUE5RCxDQUFuQjtBQUNELEtBZEQ7QUFlRDs7QUFFRFMsbUJBQWlCO0FBQ2Y7QUFDQSxTQUFLUCxVQUFMLEdBQWtCLEtBQUtiLFFBQUwsQ0FBY0UsYUFBZCxDQUE0QixZQUE1QixDQUFsQjtBQUNBLFNBQUtVLFdBQUwsR0FBbUIsS0FBS1osUUFBTCxDQUFjRSxhQUFkLENBQTZCLGdCQUFlLEtBQUtTLFlBQWEsSUFBOUQsQ0FBbkI7O0FBRUEsUUFBSSxLQUFLQSxZQUFMLEtBQXNCLENBQTFCLEVBQTZCO0FBQzNCO0FBQ0EsV0FBS0csWUFBTCxHQUFvQixLQUFLYixTQUFMLENBQWU2QixnQkFBbkM7QUFDQSxXQUFLZixRQUFMLEdBQWdCLEtBQUtILFdBQUwsQ0FBaUJpQixrQkFBakM7QUFDRCxLQUpELE1BSU8sSUFBSSxLQUFLbEIsWUFBTCxLQUFzQixLQUFLRixVQUEvQixFQUEyQztBQUNoRDtBQUNBLFdBQUtLLFlBQUwsR0FBb0IsS0FBS0YsV0FBTCxDQUFpQm1CLHNCQUFyQztBQUNBLFdBQUtoQixRQUFMLEdBQWdCLEtBQUtkLFNBQUwsQ0FBZXlCLGlCQUEvQjtBQUNELEtBSk0sTUFJQTtBQUNMO0FBQ0EsV0FBS1osWUFBTCxHQUFvQixLQUFLRixXQUFMLENBQWlCbUIsc0JBQXJDO0FBQ0EsV0FBS2hCLFFBQUwsR0FBZ0IsS0FBS0gsV0FBTCxDQUFpQmlCLGtCQUFqQztBQUNEOztBQUVEO0FBQ0EsU0FBS3hCLE1BQUwsQ0FBWWlCLE9BQVosQ0FBb0JDLE1BQU1BLEdBQUdTLFNBQUgsR0FBZSxFQUF6Qzs7QUFFQTtBQUNBLFNBQUtwQixXQUFMLENBQWlCb0IsU0FBakIsR0FBNkIsV0FBN0I7QUFDQSxTQUFLbEIsWUFBTCxDQUFrQmtCLFNBQWxCLEdBQThCLGFBQTlCO0FBQ0EsU0FBS2pCLFFBQUwsQ0FBY2lCLFNBQWQsR0FBMEIsU0FBMUI7QUFDRDtBQTVFWTs7QUErRWY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLHlEQUFlbEMsUUFBZixFOzs7Ozs7O0FDbkxBLE1BQU1tQyxVQUFOLENBQWlCOztBQUVmbEMsZ0JBQWM7QUFDWixTQUFLbUMsU0FBTCxHQUFpQmIsU0FBU25CLGFBQVQsQ0FBdUIscUJBQXZCLENBQWpCOztBQUVBLFNBQUtpQyxXQUFMLEdBQW9CLFdBQXBCOztBQUVBLFNBQUtuQixpQkFBTDtBQUNEOztBQUVEQSxzQkFBb0I7QUFDbEJvQixXQUFPbkIsZ0JBQVAsQ0FBd0IsUUFBeEIsRUFBa0MsTUFBTTtBQUN0Q29CLGNBQVFDLEdBQVIsQ0FBWSxXQUFaO0FBQ0QsS0FGRDtBQUdEOztBQUVEQyxtQkFBaUI7QUFDZixTQUFLTCxTQUFMLENBQWVQLFNBQWYsQ0FBeUJDLEdBQXpCLENBQTZCLEtBQUtPLFdBQWxDO0FBQ0Q7O0FBRURLLHNCQUFvQjtBQUNsQixTQUFLTixTQUFMLENBQWVQLFNBQWYsQ0FBeUJDLEdBQXpCLENBQTZCLEtBQUtPLFdBQWxDO0FBQ0Q7QUF0QmM7O0FBeUJqQix5REFBZUYsVUFBZixFOzs7Ozs7O0FDekJBLE1BQU1RLE1BQU4sQ0FBYTtBQUNYMUMsZ0JBQWM7QUFDWixTQUFLMkMsVUFBTCxHQUFrQnJCLFNBQVNuQixhQUFULENBQXVCLGtCQUF2QixDQUFsQjtBQUNBLFNBQUt5QyxXQUFMLEdBQW1CdEIsU0FBU25CLGFBQVQsQ0FBdUIsU0FBdkIsQ0FBbkI7QUFDQSxTQUFLMEMsV0FBTCxHQUFtQnZCLFNBQVNuQixhQUFULENBQXVCLDhCQUF2QixDQUFuQjtBQUNBLFNBQUsyQyxXQUFMLEdBQW1CeEIsU0FBU25CLGFBQVQsQ0FBdUIsaUJBQXZCLENBQW5COztBQUVBLFNBQUtpQyxXQUFMLEdBQW9CLFdBQXBCOztBQUVBLFNBQUtuQixpQkFBTDtBQUNEOztBQUVEQSxzQkFBb0I7QUFDbEIsU0FBSzBCLFVBQUwsQ0FBZ0J6QixnQkFBaEIsQ0FBaUMsT0FBakMsRUFBMENDLEtBQUs7QUFDN0NBLFFBQUVDLGNBQUY7O0FBRUEsT0FBQyxLQUFLd0IsV0FBTCxDQUFpQmhCLFNBQWpCLENBQTJCbUIsUUFBM0IsQ0FBb0MsS0FBS1gsV0FBekMsQ0FBRCxHQUNJLEtBQUtZLFlBQUwsRUFESixHQUVJLEtBQUtDLGNBQUwsRUFGSjtBQUdELEtBTkQ7O0FBUUEsU0FBS0gsV0FBTCxDQUFpQjVCLGdCQUFqQixDQUFrQyxPQUFsQyxFQUEyQ0MsS0FBSztBQUM5Q0EsUUFBRUMsY0FBRjtBQUNBLFdBQUs2QixjQUFMO0FBQ0QsS0FIRDtBQUlEOztBQUVERCxpQkFBZTtBQUNiLFNBQUtKLFdBQUwsQ0FBaUJoQixTQUFqQixDQUEyQkMsR0FBM0IsQ0FBK0IsS0FBS08sV0FBcEM7QUFDQSxTQUFLUyxXQUFMLENBQWlCSyxLQUFqQjtBQUNEOztBQUVERCxtQkFBaUI7QUFDZixTQUFLTCxXQUFMLENBQWlCaEIsU0FBakIsQ0FBMkJ1QixNQUEzQixDQUFrQyxLQUFLZixXQUF2QztBQUNEO0FBbENVOztBQXFDYix5REFBZU0sTUFBZixFOzs7Ozs7O0FDckNBLE1BQU1VLEtBQU4sQ0FBWTs7QUFFVnBELGdCQUFjO0FBQ1osU0FBS3FELE1BQUwsR0FBYyxDQUNaLFdBRFksQ0FBZDs7QUFJQSxTQUFLQyxTQUFMLEdBQWlCaEMsU0FBU25CLGFBQVQsQ0FBdUIsdUJBQXZCLENBQWpCOztBQUVBLFNBQUtvRCxxQkFBTDtBQUNBLFNBQUt0QyxpQkFBTDtBQUNEOztBQUVEQSxzQkFBb0I7QUFDbEIsU0FBS3FDLFNBQUwsQ0FBZXBDLGdCQUFmLENBQWdDLFFBQWhDLEVBQTBDQyxLQUFLO0FBQzdDQSxRQUFFQyxjQUFGOztBQUVBLFlBQU1vQyxRQUFRckMsRUFBRXNDLE1BQUYsQ0FBU0MsS0FBdkI7O0FBRUFwQyxlQUFTcUMsSUFBVCxDQUFjL0IsU0FBZCxHQUEwQjRCLEtBQTFCO0FBQ0QsS0FORDtBQU9EOztBQUVERCwwQkFBd0I7QUFDdEIsU0FBS0YsTUFBTCxDQUFZOUIsT0FBWixDQUFvQmlDLFNBQVM7QUFDM0IsVUFBSUksYUFBYUosTUFBTUssT0FBTixDQUFlLElBQWYsRUFBcUIsR0FBckIsRUFBMkJDLFdBQTNCLEVBQWpCOztBQUVBLFVBQUlDLFNBQVN6QyxTQUFTMEMsYUFBVCxDQUF1QixRQUF2QixDQUFiO0FBQ0FELGFBQU9MLEtBQVAsR0FBZ0IsVUFBU0UsVUFBVyxFQUFwQztBQUNBRyxhQUFPRSxTQUFQLEdBQW1CVCxLQUFuQjs7QUFFQSxXQUFLRixTQUFMLENBQWVZLFdBQWYsQ0FBMkJILE1BQTNCO0FBQ0QsS0FSRDtBQVNEOztBQWpDUzs7QUFxQ1oseURBQWVYLEtBQWYsRTs7Ozs7Ozs7Ozs7O0FDckNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLElBQUk5QixTQUFTbkIsYUFBVCxDQUF1QixxQkFBdkIsQ0FBSixFQUFtRCxJQUFJLHVFQUFKO0FBQ25ELElBQUltQixTQUFTbkIsYUFBVCxDQUF1Qix1QkFBdkIsQ0FBSixFQUFxRCxJQUFJLGtFQUFKO0FBQ3JELElBQUltQixTQUFTbkIsYUFBVCxDQUF1QixTQUF2QixDQUFKLEVBQXVDLElBQUksbUVBQUo7O0FBRXZDLElBQUltQixTQUFTbkIsYUFBVCxDQUF1QixXQUF2QixDQUFKLEVBQXlDO0FBQ3hDLE9BQU1nRSxZQUFZN0MsU0FBU2IsZ0JBQVQsQ0FBMEIsV0FBMUIsQ0FBbEI7QUFDQSxNQUFLLElBQUkyRCxpQkFBaUIsQ0FBckIsRUFBd0J6RCxTQUFTd0QsVUFBVXhELE1BQWhELEVBQXdEeUQsaUJBQWlCekQsTUFBekUsRUFBaUZ5RCxnQkFBakYsRUFBbUc7QUFDbEcsTUFBSSxxRUFBSixDQUFhRCxVQUFVQyxjQUFWLENBQWI7QUFDQTtBQUNELEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbiBcdF9fd2VicGFja19yZXF1aXJlX18uaSA9IGZ1bmN0aW9uKHZhbHVlKSB7IHJldHVybiB2YWx1ZTsgfTtcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7XG4gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuIFx0XHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcbiBcdFx0XHRcdGdldDogZ2V0dGVyXG4gXHRcdFx0fSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gNCk7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gd2VicGFjay9ib290c3RyYXAgMGVmMTQxZDA3MGRmMTNiMmNjNGQiLCJjbGFzcyBDYXJvdXNlbCB7XG4gIGNvbnN0cnVjdG9yKGNhcm91c2VsKSB7XG4gICAgdGhpcy5jYXJvdXNlbCA9IGNhcm91c2VsXG4gICAgdGhpcy5jb250YWluZXIgPSB0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbF9fc2xpZGVzJylcbiAgICB0aGlzLnByZXZpb3VzQnV0dG9uID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWxfX2NvbnRyb2xzLXByZXYnKVxuICAgIHRoaXMubmV4dEJ1dHRvbiA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmNhcm91c2VsX19jb250cm9scy1uZXh0JylcbiAgICB0aGlzLnNsaWRlcyA9IEFycmF5LmZyb20odGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWxfX3NsaWRlcyA+IGxpJykpXG4gICAgdGhpcy5zbGlkZUNvdW50ID0gdGhpcy5zbGlkZXMubGVuZ3RoXG5cbiAgICB0aGlzLmN1cnJlbnRDb3VudCA9IDFcbiAgICB0aGlzLmN1cnJlbnRJdGVtXG4gICAgdGhpcy5hY3RpdmVJdGVtXG4gICAgdGhpcy5wcmV2aW91c0l0ZW1cbiAgICB0aGlzLm5leHRJdGVtXG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKClcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIC8vIHByZXZpb3VzIGFycm93IG1vdmVzIHRvIHByZXZpb3VzIHNsaWRlXG4gICAgdGhpcy5wcmV2aW91c0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLmN1cnJlbnRDb3VudCA9PT0gMSA/IHRoaXMuY3VycmVudENvdW50ID0gdGhpcy5zbGlkZUNvdW50IDogdGhpcy5jdXJyZW50Q291bnQtLVxuICAgICAgdGhpcy50cmFuc2l0aW9uSXRlbSgpXG4gICAgfSlcblxuICAgIC8vIG5leHQgYXJyb3cgbW92ZXMgdG8gbmV4dCBzbGlkZVxuICAgIHRoaXMubmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICB0aGlzLmN1cnJlbnRDb3VudCA9PT0gdGhpcy5zbGlkZUNvdW50ID8gdGhpcy5jdXJyZW50Q291bnQgPSAxIDogdGhpcy5jdXJyZW50Q291bnQrK1xuICAgICAgdGhpcy50cmFuc2l0aW9uSXRlbSgpXG4gICAgfSlcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XG4gICAgICAvLyBhZGQgZGF0YSBhdHRyaWJ1dGVzIHRvIHNsaWRlc1xuICAgICAgdGhpcy5zbGlkZXMuZm9yRWFjaCgoZWwsIGkpID0+IGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZScsIGkrMSkpXG5cbiAgICAgIC8vIGFkZCBkYXRhIGF0dHJpYnV0ZXMgdG8gaW5kaWNhdG9yc1xuICAgICAgLy8gdGhpcy5kb3RzLmZvckVhY2goKGVsLCBpKSA9PiBlbC5zZXRBdHRyaWJ1dGUoJ2RhdGEtc2xpZGUnLCBpKzEpKVxuXG4gICAgICAvLyBhZGQgaGVscGVyIGNsYXNzZXMgd2hlbiB0aGUgY2Fyb3VzZWwgbG9hZHNcbiAgICAgIHRoaXMuY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG4gICAgICB0aGlzLmNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnaXMtbmV4dCcpXG4gICAgICB0aGlzLmNvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2lzLXByZXZpb3VzJylcblxuICAgICAgLy8gc2V0IGN1cnJlbnQgaXRlbSBjb3VudFxuICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcihgW2RhdGEtc2xpZGU9XCIke3RoaXMuY3VycmVudENvdW50fVwiXWApXG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zaXRpb25JdGVtKCkge1xuICAgIC8vIGdldCBjdXJyZW50IGFjdGl2ZSBzbGlkZVxuICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmlzLWFjdGl2ZScpXG4gICAgdGhpcy5jdXJyZW50SXRlbSA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcihgW2RhdGEtc2xpZGU9XCIke3RoaXMuY3VycmVudENvdW50fVwiXWApXG5cbiAgICBpZiAodGhpcy5jdXJyZW50Q291bnQgPT09IDEpIHtcbiAgICAgIC8vIGlmIHdlJ3JlIGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgIHRoaXMucHJldmlvdXNJdGVtID0gdGhpcy5jb250YWluZXIubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgdGhpcy5uZXh0SXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRDb3VudCA9PT0gdGhpcy5zbGlkZUNvdW50KSB7XG4gICAgICAvLyBpZiB3ZSdyZSBhdCB0aGUgZW5kXG4gICAgICB0aGlzLnByZXZpb3VzSXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgICAgdGhpcy5uZXh0SXRlbSA9IHRoaXMuY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHdlJ3JlIHNvbWV3aGVyZSBpbiB0aGUgbWlkZGxlXG4gICAgICB0aGlzLnByZXZpb3VzSXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgICAgdGhpcy5uZXh0SXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGNsYXNzIG5hbWVzXG4gICAgdGhpcy5zbGlkZXMuZm9yRWFjaChlbCA9PiBlbC5jbGFzc05hbWUgPSAnJylcblxuICAgIC8vIHVwZGF0ZSBjbGFzcyBuYW1lc1xuICAgIHRoaXMuY3VycmVudEl0ZW0uY2xhc3NOYW1lID0gJ2lzLWFjdGl2ZSdcbiAgICB0aGlzLnByZXZpb3VzSXRlbS5jbGFzc05hbWUgPSAnaXMtcHJldmlvdXMnXG4gICAgdGhpcy5uZXh0SXRlbS5jbGFzc05hbWUgPSAnaXMtbmV4dCdcbiAgfVxufVxuXG4vLyBjbGFzcyBDYXJvdXNlbCB7XG4vLyAgIGNvbnN0cnVjdG9yKCkge1xuLy8gICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsLS1jb250YWluZXInKVxuLy8gICAgIHRoaXMuY29udHJvbHNQcmV2aW91cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbC0tY29udHJvbHMtcHJldicpXG4vLyAgICAgdGhpcy5jb250cm9sc05leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwtLWNvbnRyb2xzLW5leHQnKVxuLy8gICAgIHRoaXMuc2xpZGVzID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKSlcbi8vICAgICB0aGlzLnNsaWRlQ291bnQgPSB0aGlzLmNvbnRhaW5lci5nZXRFbGVtZW50c0J5VGFnTmFtZSgnbGknKS5sZW5ndGhcbi8vXG4vLyAgICAgdGhpcy5pbmRpY2F0b3JzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsLS1pbmRpY2F0b3JzJylcbi8vICAgICB0aGlzLmRvdHMgPSBBcnJheS5mcm9tKHRoaXMuaW5kaWNhdG9ycy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpKVxuLy8gICAgIHRoaXMuaW5kaWNhdG9yc0xlbmd0aCA9IHRoaXMuaW5kaWNhdG9ycy5xdWVyeVNlbGVjdG9yQWxsKCdsaScpLmxlbmd0aFxuLy9cbi8vICAgICB0aGlzLmN1cnJlbnRDb3VudCA9IDFcbi8vICAgICB0aGlzLmN1cnJlbnRJdGVtID0gJydcbi8vICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSAnJ1xuLy8gICAgIHRoaXMucHJldmlvdXNJdGVtID0gJydcbi8vICAgICB0aGlzLm5leHRJdGVtID0gJydcbi8vXG4vLyAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuLy8gICB9XG4vL1xuLy8gICBhZGRFdmVudExpc3RlbmVycygpIHtcbi8vICAgICAvLyBwcmV2aW91cyBhcnJvdyBtb3ZlcyB0byBwcmV2aW91cyBzbGlkZVxuLy8gICAgIHRoaXMuY29udHJvbHNQcmV2aW91cy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuLy8gICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4vLyAgICAgICB0aGlzLmN1cnJlbnRDb3VudCA9PT0gMSA/IHRoaXMuY3VycmVudENvdW50ID0gdGhpcy5zbGlkZUNvdW50IDogdGhpcy5jdXJyZW50Q291bnQtLVxuLy8gICAgICAgdGhpcy50cmFuc2l0aW9uSXRlbSgpXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgLy8gbmV4dCBhcnJvdyBtb3ZlcyB0byBuZXh0IHNsaWRlXG4vLyAgICAgdGhpcy5jb250cm9sc05leHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuLy8gICAgICAgdGhpcy5jdXJyZW50Q291bnQgPT09IHRoaXMuc2xpZGVDb3VudCA/IHRoaXMuY3VycmVudENvdW50ID0gMSA6IHRoaXMuY3VycmVudENvdW50Kytcbi8vICAgICAgIHRoaXMudHJhbnNpdGlvbkl0ZW0oKVxuLy8gICAgIH0pXG4vL1xuLy8gICAgIC8vIGRvdCBtb3ZlcyB0byBhcHByb3ByaWF0ZSBzbGlkZVxuLy8gICAgIHRoaXMuZG90cy5mb3JFYWNoKChkb3QsIGkpID0+IHtcbi8vICAgICAgIGRvdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuLy8gICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbi8vICAgICAgICAgY29uc29sZS5sb2coY3VycmVudEl0ZW0pO1xuLy8gICAgICAgfSlcbi8vICAgICB9KVxuLy9cbi8vICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuLy9cbi8vICAgICAgIC8vIGFkZCBkYXRhIGF0dHJpYnV0ZXMgdG8gc2xpZGVzXG4vLyAgICAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKChlbCwgaSkgPT4gZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlJywgaSsxKSlcbi8vXG4vLyAgICAgICAvLyBhZGQgZGF0YSBhdHRyaWJ1dGVzIHRvIGluZGljYXRvcnNcbi8vICAgICAgIHRoaXMuZG90cy5mb3JFYWNoKChlbCwgaSkgPT4gZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlJywgaSsxKSlcbi8vXG4vLyAgICAgICAvLyBhZGQgaGVscGVyIGNsYXNzZXMgd2hlbiB0aGUgY2Fyb3VzZWwgbG9hZHNcbi8vICAgICAgIHRoaXMuY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLS1pdGVtLWFjdGl2ZScpXG4vLyAgICAgICB0aGlzLmNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnY2Fyb3VzZWwtLWl0ZW0tbmV4dCcpXG4vLyAgICAgICB0aGlzLmNvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLS1pdGVtLXByZXZpb3VzJylcbi8vXG4vLyAgICAgICAvLyBzZXQgY3VycmVudCBpdGVtIGNvdW50XG4vLyAgICAgICB0aGlzLmN1cnJlbnRJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2xpZGU9XCIke3RoaXMuY3VycmVudENvdW50fVwiXWApXG4vLyAgICAgfSlcbi8vICAgfVxuLy9cbi8vICAgdXBkYXRlRG90cygpIHtcbi8vICAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZG90LCBpKSA9PiB7XG4vLyAgICAgICBkb3QuY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbi8vICAgICAgIGlmIChpID09IHRoaXMuY3VycmVudFNsaWRlKSBkb3QuY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcbi8vICAgICB9KVxuLy8gICB9XG4vL1xuLy8gICB0cmFuc2l0aW9uSXRlbSgpIHtcbi8vICAgICAvLyBnZXQgY3VycmVudCBhY3RpdmUgc2xpZGVcbi8vICAgICB0aGlzLmFjdGl2ZUl0ZW0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwtLWl0ZW0tYWN0aXZlJylcbi8vICAgICB0aGlzLmN1cnJlbnRJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtc2xpZGU9XCIke3RoaXMuY3VycmVudENvdW50fVwiXWApXG4vL1xuLy8gICAgIGlmICh0aGlzLmN1cnJlbnRDb3VudCA9PSAxKSB7XG4vLyAgICAgICAvLyBpZiB3ZSdyZSBhdCB0aGUgYmVnaW5uaW5nXG4vLyAgICAgICB0aGlzLnByZXZpb3VzSXRlbSA9IHRoaXMuY29udGFpbmVyLmxhc3RFbGVtZW50Q2hpbGRcbi8vICAgICAgIHRoaXMubmV4dEl0ZW0gPSB0aGlzLmN1cnJlbnRJdGVtLm5leHRFbGVtZW50U2libGluZ1xuLy8gICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50Q291bnQgPT0gdGhpcy5zbGlkZUNvdW50KSB7XG4vLyAgICAgICAvLyBpZiB3ZSdyZSBhdCB0aGUgZW5kXG4vLyAgICAgICB0aGlzLnByZXZpb3VzSXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZ1xuLy8gICAgICAgdGhpcy5uZXh0SXRlbSA9IHRoaXMuY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkXG4vLyAgICAgfSBlbHNlIHtcbi8vICAgICAgIC8vIGlmIHdlJ3JlIHNvbWV3aGVyZSBpbiB0aGUgbWlkZGxlXG4vLyAgICAgICB0aGlzLnByZXZpb3VzSXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZ1xuLy8gICAgICAgdGhpcy5uZXh0SXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nXG4vLyAgICAgfVxuLy9cbi8vICAgICAvLyByZW1vdmUgY2xhc3MgbmFtZXNcbi8vICAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKGVsID0+IGVsLmNsYXNzTmFtZSA9ICcnKVxuLy9cbi8vICAgICAvLyB1cGRhdGUgY2xhc3MgbmFtZXNcbi8vICAgICB0aGlzLmN1cnJlbnRJdGVtLmNsYXNzTmFtZSA9ICdjYXJvdXNlbC0taXRlbS1hY3RpdmUnXG4vLyAgICAgdGhpcy5wcmV2aW91c0l0ZW0uY2xhc3NOYW1lID0gJ2Nhcm91c2VsLS1pdGVtLXByZXZpb3VzJ1xuLy8gICAgIHRoaXMubmV4dEl0ZW0uY2xhc3NOYW1lID0gJ2Nhcm91c2VsLS1pdGVtLW5leHQnXG4vLyAgIH1cbi8vIH1cbi8vXG4vLyBleHBvcnQgZGVmYXVsdCBDYXJvdXNlbDtcblxuZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWw7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL0Nhcm91c2VsLmpzIiwiY2xhc3MgTmF2aWdhdGlvbiB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5uYXZIZWFkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2aWdhdGlvbl9faGVhZGVyJyk7XG5cbiAgICB0aGlzLmFjdGl2ZUNsYXNzID0gYGlzLWFjdGl2ZWBcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCAoKSA9PiB7XG4gICAgICBjb25zb2xlLmxvZygnc2Nyb2xsaW5nJyk7XG4gICAgfSlcbiAgfVxuXG4gIGFkZEFjdGl2ZUNsYXNzKCkge1xuICAgIHRoaXMubmF2SGVhZGVyLmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVDbGFzcyk7XG4gIH1cblxuICByZW1vdmVBY3RpdmVDbGFzcygpIHtcbiAgICB0aGlzLm5hdkhlYWRlci5jbGFzc0xpc3QuYWRkKHRoaXMuYWN0aXZlQ2xhc3MpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE5hdmlnYXRpb247XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL05hdmlnYXRpb24uanMiLCJjbGFzcyBTZWFyY2gge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnNlYXJjaEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2VhcmNoQnV0dG9uJylcbiAgICB0aGlzLnNlYXJjaEZpZWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpXG4gICAgdGhpcy5zZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2ggaW5wdXRbdHlwZT1cInNlYXJjaFwiXScpXG4gICAgdGhpcy5zZWFyY2hDbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1zZWFyY2hDbG9zZScpXG5cbiAgICB0aGlzLmFjdGl2ZUNsYXNzID0gYGlzLWFjdGl2ZWBcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuc2VhcmNoSWNvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAhdGhpcy5zZWFyY2hGaWVsZC5jbGFzc0xpc3QuY29udGFpbnModGhpcy5hY3RpdmVDbGFzcylcbiAgICAgICAgPyB0aGlzLmV4cGFuZFNlYXJjaCgpXG4gICAgICAgIDogdGhpcy5jb2xsYXBzZVNlYXJjaCgpXG4gICAgfSlcblxuICAgIHRoaXMuc2VhcmNoQ2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuY29sbGFwc2VTZWFyY2goKTtcbiAgICB9KVxuICB9XG5cbiAgZXhwYW5kU2VhcmNoKCkge1xuICAgIHRoaXMuc2VhcmNoRmllbGQuY2xhc3NMaXN0LmFkZCh0aGlzLmFjdGl2ZUNsYXNzKTtcbiAgICB0aGlzLnNlYXJjaElucHV0LmZvY3VzKClcbiAgfVxuXG4gIGNvbGxhcHNlU2VhcmNoKCkge1xuICAgIHRoaXMuc2VhcmNoRmllbGQuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmFjdGl2ZUNsYXNzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTZWFyY2g7XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL1NlYXJjaC5qcyIsImNsYXNzIFRoZW1lIHtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnRoZW1lcyA9IFtcbiAgICAgIFwiTWFjaG8gTWFuXCJcbiAgICBdXG5cbiAgICB0aGlzLnRoZW1lTWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ3NlbGVjdFtuYW1lPVwidGhlbWVzXCJdJylcblxuICAgIHRoaXMucG9wdWxhdGVUaGVtZVNlbGVjdG9yKCk7XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy50aGVtZU1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgIGNvbnN0IHRoZW1lID0gZS50YXJnZXQudmFsdWVcblxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QgPSB0aGVtZTtcbiAgICB9KVxuICB9XG5cbiAgcG9wdWxhdGVUaGVtZVNlbGVjdG9yKCkge1xuICAgIHRoaXMudGhlbWVzLmZvckVhY2godGhlbWUgPT4ge1xuICAgICAgbGV0IHRoZW1lQ2xhc3MgPSB0aGVtZS5yZXBsYWNlKCAvIC9nLCBcIl9cIiApLnRvTG93ZXJDYXNlKCk7XG5cbiAgICAgIGxldCBvcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdvcHRpb24nKTtcbiAgICAgIG9wdGlvbi52YWx1ZSA9IGB0aGVtZV9fJHt0aGVtZUNsYXNzfWBcbiAgICAgIG9wdGlvbi5pbm5lckhUTUwgPSB0aGVtZTtcblxuICAgICAgdGhpcy50aGVtZU1lbnUuYXBwZW5kQ2hpbGQob3B0aW9uKTtcbiAgICB9KTtcbiAgfVxuXG59XG5cbmV4cG9ydCBkZWZhdWx0IFRoZW1lO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9UaGVtZS5qcyIsImltcG9ydCBOYXZpZ2F0aW9uIGZyb20gJy4vY29tcG9uZW50cy9OYXZpZ2F0aW9uJ1xuaW1wb3J0IFRoZW1lIGZyb20gJy4vY29tcG9uZW50cy9UaGVtZSdcbmltcG9ydCBTZWFyY2ggZnJvbSAnLi9jb21wb25lbnRzL1NlYXJjaCdcbmltcG9ydCBDYXJvdXNlbCBmcm9tICcuL2NvbXBvbmVudHMvQ2Fyb3VzZWwnXG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2aWdhdGlvbl9faGVhZGVyJykpIG5ldyBOYXZpZ2F0aW9uKCk7XG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3Rvcignc2VsZWN0W25hbWU9XCJ0aGVtZXNcIl0nKSkgbmV3IFRoZW1lKCk7XG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlYXJjaCcpKSBuZXcgU2VhcmNoKCk7XG5cbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwnKSkge1xuXHRjb25zdCBjYXJvdXNlbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2Fyb3VzZWwnKTtcblx0Zm9yIChsZXQgY2Fyb3VzZWxzSW5kZXggPSAwLCBsZW5ndGggPSBjYXJvdXNlbHMubGVuZ3RoOyBjYXJvdXNlbHNJbmRleCA8IGxlbmd0aDsgY2Fyb3VzZWxzSW5kZXgrKykge1xuXHRcdG5ldyBDYXJvdXNlbChjYXJvdXNlbHNbY2Fyb3VzZWxzSW5kZXhdKTtcblx0fVxufVxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvbWFpbi5qcyJdLCJzb3VyY2VSb290IjoiIn0=