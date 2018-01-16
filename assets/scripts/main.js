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
/******/ 	return __webpack_require__(__webpack_require__.s = 9);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return scrollPosition; });
function scrollPosition(element) {
  var h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  if (element == 'percent') {
    return (100 - (h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight) * 100).toFixed(2);
  } else if (element == 'static') {
    return window.scrollY;
  }
}



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// Robert Penner's easeInOutQuad

// find the rest of his easing functions here: http://robertpenner.com/easing/
// find them exported for ES6 consumption here: https://github.com/jaxgeller/ez.js

var easeInOutQuad = function easeInOutQuad(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return c / 2 * t * t + b;
  t--;
  return -c / 2 * (t * (t - 2) - 1) + b;
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var jumper = function jumper() {
  // private variable cache
  // no variables are created during a jump, preventing memory leaks

  var element = void 0; // element to scroll to                   (node)

  var start = void 0; // where scroll starts                    (px)
  var stop = void 0; // where scroll stops                     (px)

  var offset = void 0; // adjustment from the stop position      (px)
  var easing = void 0; // easing function                        (function)
  var a11y = void 0; // accessibility support flag             (boolean)

  var distance = void 0; // distance of scroll                     (px)
  var duration = void 0; // scroll duration                        (ms)

  var timeStart = void 0; // time scroll started                    (ms)
  var timeElapsed = void 0; // time spent scrolling thus far          (ms)

  var next = void 0; // next scroll position                   (px)

  var callback = void 0; // to call when done scrolling            (function)

  // scroll position helper

  function location() {
    return window.scrollY || window.pageYOffset;
  }

  // element offset helper

  function top(element) {
    return element.getBoundingClientRect().top + start;
  }

  // rAF loop helper

  function loop(timeCurrent) {
    // store time scroll started, if not started already
    if (!timeStart) {
      timeStart = timeCurrent;
    }

    // determine time spent scrolling so far
    timeElapsed = timeCurrent - timeStart;

    // calculate next scroll position
    next = easing(timeElapsed, start, distance, duration);

    // scroll to it
    window.scrollTo(0, next);

    // check progress
    timeElapsed < duration ? window.requestAnimationFrame(loop) // continue scroll loop
    : done(); // scrolling is done
  }

  // scroll finished helper

  function done() {
    // account for rAF time rounding inaccuracies
    window.scrollTo(0, start + distance);

    // if scrolling to an element, and accessibility is enabled
    if (element && a11y) {
      // add tabindex indicating programmatic focus
      element.setAttribute('tabindex', '-1');

      // focus the element
      element.focus();
    }

    // if it exists, fire the callback
    if (typeof callback === 'function') {
      callback();
    }

    // reset time for next jump
    timeStart = false;
  }

  // API

  function jump(target) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    // resolve options, or use defaults
    duration = options.duration || 1000;
    offset = options.offset || 0;
    callback = options.callback; // "undefined" is a suitable default, and won't be called
    easing = options.easing || easeInOutQuad;
    a11y = options.a11y || false;

    // cache starting position
    start = location();

    // resolve target
    switch (typeof target === 'undefined' ? 'undefined' : _typeof(target)) {
      // scroll from current position
      case 'number':
        element = undefined; // no element to scroll to
        a11y = false; // make sure accessibility is off
        stop = start + target;
        break;

      // scroll to element (node)
      // bounding rect is relative to the viewport
      case 'object':
        element = target;
        stop = top(element);
        break;

      // scroll to element (selector)
      // bounding rect is relative to the viewport
      case 'string':
        element = document.querySelector(target);
        stop = top(element);
        break;
    }

    // resolve scroll distance, accounting for offset
    distance = stop - start + offset;

    // resolve duration
    switch (_typeof(options.duration)) {
      // number in ms
      case 'number':
        duration = options.duration;
        break;

      // function passed the distance of the scroll
      case 'function':
        duration = options.duration(distance);
        break;
    }

    // start the loop
    window.requestAnimationFrame(loop);
  }

  // expose only the jump method
  return jump;
};

// export singleton

var singleton = jumper();

/* harmony default export */ __webpack_exports__["a"] = (singleton);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_scrollPosition__ = __webpack_require__(0);


class ArticleProgress {
  constructor() {
    this.article = document.querySelector('.article section');
    this.articlePosition = this.article.getBoundingClientRect();
    this.articleProgress = document.querySelector('.navigation__articleProgress');

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', e => {
      this.articleProgress.style.transform = `translate3d(-${__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utilities_scrollPosition__["a" /* scrollPosition */])('percent')}%, 0, 0)`;
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ArticleProgress);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jump_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utilities_scrollPosition__ = __webpack_require__(0);



class BackToTop {
  constructor() {
    this.button = document.querySelector('.js-backToTop');

    this.addEventListeners();
  }

  addEventListeners() {
    this.button.addEventListener('click', e => {
      e.preventDefault();
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_jump_js__["a" /* default */])('body', {
        duration: 750
      });
    });

    window.addEventListener('scroll', e => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utilities_scrollPosition__["a" /* scrollPosition */])('percent') > 50 ? this.hideButton() : this.showButton();
    });
  }

  showButton() {
    this.button.classList.add('is-active');
  }

  hideButton() {
    this.button.classList.remove('is-active');
  }
}

/* harmony default export */ __webpack_exports__["a"] = (BackToTop);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
    this.container = this.carousel.querySelector('.carousel__slides');
    this.previousButton = this.carousel.querySelector('.carousel__controls-previous');
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
      // this.dots.forEach((el, i) => el.setAttribute('data-slide', i + 1))

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

  // updatePagination() {
  //   this.pages.forEach((page, i) => {
  //     page.classList.remove('is-active')
  //     if (i == this.currentSlide) page.classList.add('is-active')
  //   })
  // }
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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_jump_js__ = __webpack_require__(1);


class ChapterJump {
  constructor() {
    this.chapters = document.querySelectorAll('.article__chapters li a');

    this.addEventListeners();
  }

  addEventListeners() {
    this.chapters.forEach(chapter => {
      chapter.addEventListener('click', e => {
        e.preventDefault();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_jump_js__["a" /* default */])(chapter.hash, {
          offset: -110,
          duration: 500
        });
      });
    });
  }
}

/* harmony default export */ __webpack_exports__["a"] = (ChapterJump);

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utilities_scrollPosition__ = __webpack_require__(0);


class Navigation {

  constructor() {
    this.navHeader = document.querySelector('.navigation__header');

    this.activeClass = `is-collapsed`;

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', () => {
      __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utilities_scrollPosition__["a" /* scrollPosition */])('static') > 50 ? this.addActiveClass() : this.removeActiveClass();
    });
  }

  addActiveClass() {
    this.navHeader.classList.add(this.activeClass);
  }

  removeActiveClass() {
    this.navHeader.classList.remove(this.activeClass);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Navigation);

/***/ }),
/* 7 */
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
/* 8 */
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_Navigation__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_Theme__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_Search__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_Carousel__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_ArticleProgress__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_ChapterJump__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_BackToTop__ = __webpack_require__(3);









new __WEBPACK_IMPORTED_MODULE_6__components_BackToTop__["a" /* default */]();

if (document.querySelector('.navigation__header')) new __WEBPACK_IMPORTED_MODULE_0__components_Navigation__["a" /* default */]();
if (document.querySelector('select[name="themes"]')) new __WEBPACK_IMPORTED_MODULE_1__components_Theme__["a" /* default */]();
if (document.querySelector('.search')) new __WEBPACK_IMPORTED_MODULE_2__components_Search__["a" /* default */]();
if (document.querySelector('.article')) new __WEBPACK_IMPORTED_MODULE_4__components_ArticleProgress__["a" /* default */]();
if (document.querySelector('.article__chapters')) new __WEBPACK_IMPORTED_MODULE_5__components_ChapterJump__["a" /* default */]();

if (document.querySelector('.carousel')) {
	const carousels = document.querySelectorAll('.carousel');
	for (let carouselsIndex = 0, length = carousels.length; carouselsIndex < length; carouselsIndex++) {
		new __WEBPACK_IMPORTED_MODULE_3__components_Carousel__["a" /* default */](carousels[carouselsIndex]);
	}
}

/***/ })
/******/ ]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAgYzAyOGQ5MjYwYzEyYjEyYzg2YWQiLCJ3ZWJwYWNrOi8vLy4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvdXRpbGl0aWVzL3Njcm9sbFBvc2l0aW9uLmpzIiwid2VicGFjazovLy8uL34vanVtcC5qcy9kaXN0L2p1bXAubW9kdWxlLmpzIiwid2VicGFjazovLy8uL19zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvQXJ0aWNsZVByb2dyZXNzLmpzIiwid2VicGFjazovLy8uL19zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvQmFja1RvVG9wLmpzIiwid2VicGFjazovLy8uL19zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvQ2Fyb3VzZWwuanMiLCJ3ZWJwYWNrOi8vLy4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9DaGFwdGVySnVtcC5qcyIsIndlYnBhY2s6Ly8vLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL05hdmlnYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9TZWFyY2guanMiLCJ3ZWJwYWNrOi8vLy4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9UaGVtZS5qcyIsIndlYnBhY2s6Ly8vLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9tYWluLmpzIl0sIm5hbWVzIjpbInNjcm9sbFBvc2l0aW9uIiwiZWxlbWVudCIsImgiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImIiLCJib2R5Iiwic3QiLCJzaCIsImNsaWVudEhlaWdodCIsInRvRml4ZWQiLCJ3aW5kb3ciLCJzY3JvbGxZIiwiQXJ0aWNsZVByb2dyZXNzIiwiY29uc3RydWN0b3IiLCJhcnRpY2xlIiwicXVlcnlTZWxlY3RvciIsImFydGljbGVQb3NpdGlvbiIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsImFydGljbGVQcm9ncmVzcyIsImFkZEV2ZW50TGlzdGVuZXJzIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJzdHlsZSIsInRyYW5zZm9ybSIsIkJhY2tUb1RvcCIsImJ1dHRvbiIsInByZXZlbnREZWZhdWx0IiwianVtcCIsImR1cmF0aW9uIiwiaGlkZUJ1dHRvbiIsInNob3dCdXR0b24iLCJjbGFzc0xpc3QiLCJhZGQiLCJyZW1vdmUiLCJDYXJvdXNlbCIsImNhcm91c2VsIiwiY29udGFpbmVyIiwicHJldmlvdXNCdXR0b24iLCJuZXh0QnV0dG9uIiwic2xpZGVzIiwiQXJyYXkiLCJmcm9tIiwicXVlcnlTZWxlY3RvckFsbCIsInNsaWRlQ291bnQiLCJsZW5ndGgiLCJjdXJyZW50Q291bnQiLCJjdXJyZW50SXRlbSIsImFjdGl2ZUl0ZW0iLCJwcmV2aW91c0l0ZW0iLCJuZXh0SXRlbSIsInRyYW5zaXRpb25JdGVtIiwiZm9yRWFjaCIsImVsIiwiaSIsInNldEF0dHJpYnV0ZSIsImZpcnN0RWxlbWVudENoaWxkIiwibmV4dEVsZW1lbnRTaWJsaW5nIiwibGFzdEVsZW1lbnRDaGlsZCIsInByZXZpb3VzRWxlbWVudFNpYmxpbmciLCJjbGFzc05hbWUiLCJDaGFwdGVySnVtcCIsImNoYXB0ZXJzIiwiY2hhcHRlciIsImhhc2giLCJvZmZzZXQiLCJOYXZpZ2F0aW9uIiwibmF2SGVhZGVyIiwiYWN0aXZlQ2xhc3MiLCJhZGRBY3RpdmVDbGFzcyIsInJlbW92ZUFjdGl2ZUNsYXNzIiwiU2VhcmNoIiwic2VhcmNoSWNvbiIsInNlYXJjaEZpZWxkIiwic2VhcmNoSW5wdXQiLCJzZWFyY2hDbG9zZSIsImNvbnRhaW5zIiwiZXhwYW5kU2VhcmNoIiwiY29sbGFwc2VTZWFyY2giLCJmb2N1cyIsIlRoZW1lIiwidGhlbWVzIiwidGhlbWVNZW51IiwicG9wdWxhdGVUaGVtZVNlbGVjdG9yIiwidGhlbWUiLCJ0YXJnZXQiLCJ2YWx1ZSIsInRoZW1lQ2xhc3MiLCJyZXBsYWNlIiwidG9Mb3dlckNhc2UiLCJvcHRpb24iLCJjcmVhdGVFbGVtZW50IiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJjYXJvdXNlbHMiLCJjYXJvdXNlbHNJbmRleCJdLCJtYXBwaW5ncyI6IjtBQUFBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxtREFBMkMsY0FBYzs7QUFFekQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7OztBQ2hFQTtBQUFBLFNBQVNBLGNBQVQsQ0FBeUJDLE9BQXpCLEVBQWtDO0FBQ2hDLE1BQUlDLElBQUlDLFNBQVNDLGVBQWpCO0FBQUEsTUFDSUMsSUFBSUYsU0FBU0csSUFEakI7QUFBQSxNQUVJQyxLQUFLLFdBRlQ7QUFBQSxNQUdJQyxLQUFLLGNBSFQ7QUFJQSxNQUFJUCxXQUFXLFNBQWYsRUFBMEI7QUFDeEIsV0FBTyxDQUFDLE1BQU8sQ0FBQ0MsRUFBRUssRUFBRixLQUFPRixFQUFFRSxFQUFGLENBQVIsS0FBa0IsQ0FBQ0wsRUFBRU0sRUFBRixLQUFPSCxFQUFFRyxFQUFGLENBQVIsSUFBaUJOLEVBQUVPLFlBQXJDLElBQXFELEdBQTdELEVBQW1FQyxPQUFuRSxDQUEyRSxDQUEzRSxDQUFQO0FBQ0QsR0FGRCxNQUVPLElBQUlULFdBQVcsUUFBZixFQUF5QjtBQUM5QixXQUFPVSxPQUFPQyxPQUFkO0FBQ0Q7QUFDRjs7Ozs7Ozs7O0FDVkQ7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUliLFNBQVNhLGFBQVQsQ0FBdUIsVUFBdkIsQ0FBSixFQUF3QyxJQUFJLDRFQUFKO0FBQ3hDLElBQUliLFNBQVNhLGFBQVQsQ0FBdUIsb0JBQXZCLENBQUosRUFBa0QsSUFBSSx3RUFBSjs7QUFFbEQsSUFBSWIsU0FBU2EsYUFBVCxDQUF1QixXQUF2QixDQUFKLEVBQXlDO0FBQ3hDLE9BQU04RSxZQUFZM0YsU0FBU3dDLGdCQUFULENBQTBCLFdBQTFCLENBQWxCO0FBQ0EsTUFBSyxJQUFJb0QsaUJBQWlCLENBQXJCLEVBQXdCbEQsU0FBU2lELFVBQVVqRCxNQUFoRCxFQUF3RGtELGlCQUFpQmxELE1BQXpFLEVBQWlGa0QsZ0JBQWpGLEVBQW1HO0FBQ2xHLE1BQUkscUVBQUosQ0FBYUQsVUFBVUMsY0FBVixDQUFiO0FBQ0E7QUFDRCxDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBpZGVudGl0eSBmdW5jdGlvbiBmb3IgY2FsbGluZyBoYXJtb255IGltcG9ydHMgd2l0aCB0aGUgY29ycmVjdCBjb250ZXh0XG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBmdW5jdGlvbih2YWx1ZSkgeyByZXR1cm4gdmFsdWU7IH07XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuIFx0XHRcdFx0Y29uZmlndXJhYmxlOiBmYWxzZSxcbiBcdFx0XHRcdGVudW1lcmFibGU6IHRydWUsXG4gXHRcdFx0XHRnZXQ6IGdldHRlclxuIFx0XHRcdH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDkpO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIHdlYnBhY2svYm9vdHN0cmFwIGMwMjhkOTI2MGMxMmIxMmM4NmFkIiwiZnVuY3Rpb24gc2Nyb2xsUG9zaXRpb24oIGVsZW1lbnQgKXtcbiAgdmFyIGggPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgICBiID0gZG9jdW1lbnQuYm9keSxcbiAgICAgIHN0ID0gJ3Njcm9sbFRvcCcsXG4gICAgICBzaCA9ICdzY3JvbGxIZWlnaHQnO1xuICBpZiAoZWxlbWVudCA9PSAncGVyY2VudCcpIHtcbiAgICByZXR1cm4gKDEwMCAtICgoaFtzdF18fGJbc3RdKSAvICgoaFtzaF18fGJbc2hdKSAtIGguY2xpZW50SGVpZ2h0KSAqIDEwMCkpLnRvRml4ZWQoMik7XG4gIH0gZWxzZSBpZiAoZWxlbWVudCA9PSAnc3RhdGljJykge1xuICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWTtcbiAgfVxufVxuXG5leHBvcnQgeyBzY3JvbGxQb3NpdGlvbiB9XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy91dGlsaXRpZXMvc2Nyb2xsUG9zaXRpb24uanMiLCIvLyBSb2JlcnQgUGVubmVyJ3MgZWFzZUluT3V0UXVhZFxuXG4vLyBmaW5kIHRoZSByZXN0IG9mIGhpcyBlYXNpbmcgZnVuY3Rpb25zIGhlcmU6IGh0dHA6Ly9yb2JlcnRwZW5uZXIuY29tL2Vhc2luZy9cbi8vIGZpbmQgdGhlbSBleHBvcnRlZCBmb3IgRVM2IGNvbnN1bXB0aW9uIGhlcmU6IGh0dHBzOi8vZ2l0aHViLmNvbS9qYXhnZWxsZXIvZXouanNcblxudmFyIGVhc2VJbk91dFF1YWQgPSBmdW5jdGlvbiBlYXNlSW5PdXRRdWFkKHQsIGIsIGMsIGQpIHtcbiAgdCAvPSBkIC8gMjtcbiAgaWYgKHQgPCAxKSByZXR1cm4gYyAvIDIgKiB0ICogdCArIGI7XG4gIHQtLTtcbiAgcmV0dXJuIC1jIC8gMiAqICh0ICogKHQgLSAyKSAtIDEpICsgYjtcbn07XG5cbnZhciBfdHlwZW9mID0gdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT09IFwic3ltYm9sXCIgPyBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqO1xufSA6IGZ1bmN0aW9uIChvYmopIHtcbiAgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG59O1xuXG52YXIganVtcGVyID0gZnVuY3Rpb24ganVtcGVyKCkge1xuICAvLyBwcml2YXRlIHZhcmlhYmxlIGNhY2hlXG4gIC8vIG5vIHZhcmlhYmxlcyBhcmUgY3JlYXRlZCBkdXJpbmcgYSBqdW1wLCBwcmV2ZW50aW5nIG1lbW9yeSBsZWFrc1xuXG4gIHZhciBlbGVtZW50ID0gdm9pZCAwOyAvLyBlbGVtZW50IHRvIHNjcm9sbCB0byAgICAgICAgICAgICAgICAgICAobm9kZSlcblxuICB2YXIgc3RhcnQgPSB2b2lkIDA7IC8vIHdoZXJlIHNjcm9sbCBzdGFydHMgICAgICAgICAgICAgICAgICAgIChweClcbiAgdmFyIHN0b3AgPSB2b2lkIDA7IC8vIHdoZXJlIHNjcm9sbCBzdG9wcyAgICAgICAgICAgICAgICAgICAgIChweClcblxuICB2YXIgb2Zmc2V0ID0gdm9pZCAwOyAvLyBhZGp1c3RtZW50IGZyb20gdGhlIHN0b3AgcG9zaXRpb24gICAgICAocHgpXG4gIHZhciBlYXNpbmcgPSB2b2lkIDA7IC8vIGVhc2luZyBmdW5jdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIChmdW5jdGlvbilcbiAgdmFyIGExMXkgPSB2b2lkIDA7IC8vIGFjY2Vzc2liaWxpdHkgc3VwcG9ydCBmbGFnICAgICAgICAgICAgIChib29sZWFuKVxuXG4gIHZhciBkaXN0YW5jZSA9IHZvaWQgMDsgLy8gZGlzdGFuY2Ugb2Ygc2Nyb2xsICAgICAgICAgICAgICAgICAgICAgKHB4KVxuICB2YXIgZHVyYXRpb24gPSB2b2lkIDA7IC8vIHNjcm9sbCBkdXJhdGlvbiAgICAgICAgICAgICAgICAgICAgICAgIChtcylcblxuICB2YXIgdGltZVN0YXJ0ID0gdm9pZCAwOyAvLyB0aW1lIHNjcm9sbCBzdGFydGVkICAgICAgICAgICAgICAgICAgICAobXMpXG4gIHZhciB0aW1lRWxhcHNlZCA9IHZvaWQgMDsgLy8gdGltZSBzcGVudCBzY3JvbGxpbmcgdGh1cyBmYXIgICAgICAgICAgKG1zKVxuXG4gIHZhciBuZXh0ID0gdm9pZCAwOyAvLyBuZXh0IHNjcm9sbCBwb3NpdGlvbiAgICAgICAgICAgICAgICAgICAocHgpXG5cbiAgdmFyIGNhbGxiYWNrID0gdm9pZCAwOyAvLyB0byBjYWxsIHdoZW4gZG9uZSBzY3JvbGxpbmcgICAgICAgICAgICAoZnVuY3Rpb24pXG5cbiAgLy8gc2Nyb2xsIHBvc2l0aW9uIGhlbHBlclxuXG4gIGZ1bmN0aW9uIGxvY2F0aW9uKCkge1xuICAgIHJldHVybiB3aW5kb3cuc2Nyb2xsWSB8fCB3aW5kb3cucGFnZVlPZmZzZXQ7XG4gIH1cblxuICAvLyBlbGVtZW50IG9mZnNldCBoZWxwZXJcblxuICBmdW5jdGlvbiB0b3AoZWxlbWVudCkge1xuICAgIHJldHVybiBlbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCArIHN0YXJ0O1xuICB9XG5cbiAgLy8gckFGIGxvb3AgaGVscGVyXG5cbiAgZnVuY3Rpb24gbG9vcCh0aW1lQ3VycmVudCkge1xuICAgIC8vIHN0b3JlIHRpbWUgc2Nyb2xsIHN0YXJ0ZWQsIGlmIG5vdCBzdGFydGVkIGFscmVhZHlcbiAgICBpZiAoIXRpbWVTdGFydCkge1xuICAgICAgdGltZVN0YXJ0ID0gdGltZUN1cnJlbnQ7XG4gICAgfVxuXG4gICAgLy8gZGV0ZXJtaW5lIHRpbWUgc3BlbnQgc2Nyb2xsaW5nIHNvIGZhclxuICAgIHRpbWVFbGFwc2VkID0gdGltZUN1cnJlbnQgLSB0aW1lU3RhcnQ7XG5cbiAgICAvLyBjYWxjdWxhdGUgbmV4dCBzY3JvbGwgcG9zaXRpb25cbiAgICBuZXh0ID0gZWFzaW5nKHRpbWVFbGFwc2VkLCBzdGFydCwgZGlzdGFuY2UsIGR1cmF0aW9uKTtcblxuICAgIC8vIHNjcm9sbCB0byBpdFxuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBuZXh0KTtcblxuICAgIC8vIGNoZWNrIHByb2dyZXNzXG4gICAgdGltZUVsYXBzZWQgPCBkdXJhdGlvbiA/IHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUobG9vcCkgLy8gY29udGludWUgc2Nyb2xsIGxvb3BcbiAgICA6IGRvbmUoKTsgLy8gc2Nyb2xsaW5nIGlzIGRvbmVcbiAgfVxuXG4gIC8vIHNjcm9sbCBmaW5pc2hlZCBoZWxwZXJcblxuICBmdW5jdGlvbiBkb25lKCkge1xuICAgIC8vIGFjY291bnQgZm9yIHJBRiB0aW1lIHJvdW5kaW5nIGluYWNjdXJhY2llc1xuICAgIHdpbmRvdy5zY3JvbGxUbygwLCBzdGFydCArIGRpc3RhbmNlKTtcblxuICAgIC8vIGlmIHNjcm9sbGluZyB0byBhbiBlbGVtZW50LCBhbmQgYWNjZXNzaWJpbGl0eSBpcyBlbmFibGVkXG4gICAgaWYgKGVsZW1lbnQgJiYgYTExeSkge1xuICAgICAgLy8gYWRkIHRhYmluZGV4IGluZGljYXRpbmcgcHJvZ3JhbW1hdGljIGZvY3VzXG4gICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZSgndGFiaW5kZXgnLCAnLTEnKTtcblxuICAgICAgLy8gZm9jdXMgdGhlIGVsZW1lbnRcbiAgICAgIGVsZW1lbnQuZm9jdXMoKTtcbiAgICB9XG5cbiAgICAvLyBpZiBpdCBleGlzdHMsIGZpcmUgdGhlIGNhbGxiYWNrXG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG5cbiAgICAvLyByZXNldCB0aW1lIGZvciBuZXh0IGp1bXBcbiAgICB0aW1lU3RhcnQgPSBmYWxzZTtcbiAgfVxuXG4gIC8vIEFQSVxuXG4gIGZ1bmN0aW9uIGp1bXAodGFyZ2V0KSB7XG4gICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMSAmJiBhcmd1bWVudHNbMV0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1sxXSA6IHt9O1xuXG4gICAgLy8gcmVzb2x2ZSBvcHRpb25zLCBvciB1c2UgZGVmYXVsdHNcbiAgICBkdXJhdGlvbiA9IG9wdGlvbnMuZHVyYXRpb24gfHwgMTAwMDtcbiAgICBvZmZzZXQgPSBvcHRpb25zLm9mZnNldCB8fCAwO1xuICAgIGNhbGxiYWNrID0gb3B0aW9ucy5jYWxsYmFjazsgLy8gXCJ1bmRlZmluZWRcIiBpcyBhIHN1aXRhYmxlIGRlZmF1bHQsIGFuZCB3b24ndCBiZSBjYWxsZWRcbiAgICBlYXNpbmcgPSBvcHRpb25zLmVhc2luZyB8fCBlYXNlSW5PdXRRdWFkO1xuICAgIGExMXkgPSBvcHRpb25zLmExMXkgfHwgZmFsc2U7XG5cbiAgICAvLyBjYWNoZSBzdGFydGluZyBwb3NpdGlvblxuICAgIHN0YXJ0ID0gbG9jYXRpb24oKTtcblxuICAgIC8vIHJlc29sdmUgdGFyZ2V0XG4gICAgc3dpdGNoICh0eXBlb2YgdGFyZ2V0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZih0YXJnZXQpKSB7XG4gICAgICAvLyBzY3JvbGwgZnJvbSBjdXJyZW50IHBvc2l0aW9uXG4gICAgICBjYXNlICdudW1iZXInOlxuICAgICAgICBlbGVtZW50ID0gdW5kZWZpbmVkOyAvLyBubyBlbGVtZW50IHRvIHNjcm9sbCB0b1xuICAgICAgICBhMTF5ID0gZmFsc2U7IC8vIG1ha2Ugc3VyZSBhY2Nlc3NpYmlsaXR5IGlzIG9mZlxuICAgICAgICBzdG9wID0gc3RhcnQgKyB0YXJnZXQ7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAvLyBzY3JvbGwgdG8gZWxlbWVudCAobm9kZSlcbiAgICAgIC8vIGJvdW5kaW5nIHJlY3QgaXMgcmVsYXRpdmUgdG8gdGhlIHZpZXdwb3J0XG4gICAgICBjYXNlICdvYmplY3QnOlxuICAgICAgICBlbGVtZW50ID0gdGFyZ2V0O1xuICAgICAgICBzdG9wID0gdG9wKGVsZW1lbnQpO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnQgKHNlbGVjdG9yKVxuICAgICAgLy8gYm91bmRpbmcgcmVjdCBpcyByZWxhdGl2ZSB0byB0aGUgdmlld3BvcnRcbiAgICAgIGNhc2UgJ3N0cmluZyc6XG4gICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG4gICAgICAgIHN0b3AgPSB0b3AoZWxlbWVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIHJlc29sdmUgc2Nyb2xsIGRpc3RhbmNlLCBhY2NvdW50aW5nIGZvciBvZmZzZXRcbiAgICBkaXN0YW5jZSA9IHN0b3AgLSBzdGFydCArIG9mZnNldDtcblxuICAgIC8vIHJlc29sdmUgZHVyYXRpb25cbiAgICBzd2l0Y2ggKF90eXBlb2Yob3B0aW9ucy5kdXJhdGlvbikpIHtcbiAgICAgIC8vIG51bWJlciBpbiBtc1xuICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgZHVyYXRpb24gPSBvcHRpb25zLmR1cmF0aW9uO1xuICAgICAgICBicmVhaztcblxuICAgICAgLy8gZnVuY3Rpb24gcGFzc2VkIHRoZSBkaXN0YW5jZSBvZiB0aGUgc2Nyb2xsXG4gICAgICBjYXNlICdmdW5jdGlvbic6XG4gICAgICAgIGR1cmF0aW9uID0gb3B0aW9ucy5kdXJhdGlvbihkaXN0YW5jZSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIC8vIHN0YXJ0IHRoZSBsb29wXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShsb29wKTtcbiAgfVxuXG4gIC8vIGV4cG9zZSBvbmx5IHRoZSBqdW1wIG1ldGhvZFxuICByZXR1cm4ganVtcDtcbn07XG5cbi8vIGV4cG9ydCBzaW5nbGV0b25cblxudmFyIHNpbmdsZXRvbiA9IGp1bXBlcigpO1xuXG5leHBvcnQgZGVmYXVsdCBzaW5nbGV0b247XG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuL34vanVtcC5qcy9kaXN0L2p1bXAubW9kdWxlLmpzXG4vLyBtb2R1bGUgaWQgPSAxXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsImltcG9ydCB7IHNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vdXRpbGl0aWVzL3Njcm9sbFBvc2l0aW9uJ1xuXG5jbGFzcyBBcnRpY2xlUHJvZ3Jlc3Mge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmFydGljbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZSBzZWN0aW9uJylcbiAgICB0aGlzLmFydGljbGVQb3NpdGlvbiA9IHRoaXMuYXJ0aWNsZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKVxuICAgIHRoaXMuYXJ0aWNsZVByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmlnYXRpb25fX2FydGljbGVQcm9ncmVzcycpXG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZSA9PiB7XG4gICAgICB0aGlzLmFydGljbGVQcm9ncmVzcy5zdHlsZS50cmFuc2Zvcm0gPSBgdHJhbnNsYXRlM2QoLSR7c2Nyb2xsUG9zaXRpb24oJ3BlcmNlbnQnKX0lLCAwLCAwKWBcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEFydGljbGVQcm9ncmVzcztcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL19zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvQXJ0aWNsZVByb2dyZXNzLmpzIiwiaW1wb3J0IGp1bXAgZnJvbSAnanVtcC5qcydcbmltcG9ydCB7IHNjcm9sbFBvc2l0aW9uIH0gZnJvbSAnLi4vdXRpbGl0aWVzL3Njcm9sbFBvc2l0aW9uJ1xuXG5jbGFzcyBCYWNrVG9Ub3Age1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5qcy1iYWNrVG9Ub3AnKVxuXG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVycygpXG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLmJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4gICAgICBqdW1wKCdib2R5Jywge1xuICAgICAgICBkdXJhdGlvbjogNzUwXG4gICAgICB9KVxuICAgIH0pXG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgZSA9PiB7XG4gICAgICBzY3JvbGxQb3NpdGlvbigncGVyY2VudCcpID4gNTBcbiAgICAgICAgPyB0aGlzLmhpZGVCdXR0b24oKVxuICAgICAgICA6IHRoaXMuc2hvd0J1dHRvbigpXG4gICAgfSlcbiAgfVxuXG4gIHNob3dCdXR0b24oKSB7XG4gICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LmFkZCgnaXMtYWN0aXZlJylcbiAgfVxuXG4gIGhpZGVCdXR0b24oKSB7XG4gICAgdGhpcy5idXR0b24uY2xhc3NMaXN0LnJlbW92ZSgnaXMtYWN0aXZlJylcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBCYWNrVG9Ub3BcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL19zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvQmFja1RvVG9wLmpzIiwiY2xhc3MgQ2Fyb3VzZWwge1xuICBjb25zdHJ1Y3RvcihjYXJvdXNlbCkge1xuICAgIHRoaXMuY2Fyb3VzZWwgPSBjYXJvdXNlbFxuICAgIHRoaXMuY29udGFpbmVyID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWxfX3NsaWRlcycpXG4gICAgdGhpcy5wcmV2aW91c0J1dHRvbiA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmNhcm91c2VsX19jb250cm9scy1wcmV2aW91cycpXG4gICAgdGhpcy5uZXh0QnV0dG9uID0gdGhpcy5jYXJvdXNlbC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWxfX2NvbnRyb2xzLW5leHQnKVxuICAgIHRoaXMuc2xpZGVzID0gQXJyYXkuZnJvbSh0aGlzLmNhcm91c2VsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJvdXNlbF9fc2xpZGVzID4gbGknKSlcbiAgICB0aGlzLnNsaWRlQ291bnQgPSB0aGlzLnNsaWRlcy5sZW5ndGhcblxuICAgIHRoaXMuY3VycmVudENvdW50ID0gMVxuICAgIHRoaXMuY3VycmVudEl0ZW1cbiAgICB0aGlzLmFjdGl2ZUl0ZW1cbiAgICB0aGlzLnByZXZpb3VzSXRlbVxuICAgIHRoaXMubmV4dEl0ZW1cblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgLy8gcHJldmlvdXMgYXJyb3cgbW92ZXMgdG8gcHJldmlvdXMgc2xpZGVcbiAgICB0aGlzLnByZXZpb3VzQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHRoaXMuY3VycmVudENvdW50ID09PSAxID8gdGhpcy5jdXJyZW50Q291bnQgPSB0aGlzLnNsaWRlQ291bnQgOiB0aGlzLmN1cnJlbnRDb3VudC0tXG4gICAgICB0aGlzLnRyYW5zaXRpb25JdGVtKClcbiAgICB9KVxuXG4gICAgLy8gbmV4dCBhcnJvdyBtb3ZlcyB0byBuZXh0IHNsaWRlXG4gICAgdGhpcy5uZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgIHRoaXMuY3VycmVudENvdW50ID09PSB0aGlzLnNsaWRlQ291bnQgPyB0aGlzLmN1cnJlbnRDb3VudCA9IDEgOiB0aGlzLmN1cnJlbnRDb3VudCsrXG4gICAgICB0aGlzLnRyYW5zaXRpb25JdGVtKClcbiAgICB9KVxuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAgIC8vIGFkZCBkYXRhIGF0dHJpYnV0ZXMgdG8gc2xpZGVzXG4gICAgICB0aGlzLnNsaWRlcy5mb3JFYWNoKChlbCwgaSkgPT4gZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlJywgaSArIDEpKVxuXG4gICAgICAvLyBhZGQgZGF0YSBhdHRyaWJ1dGVzIHRvIGluZGljYXRvcnNcbiAgICAgIC8vIHRoaXMuZG90cy5mb3JFYWNoKChlbCwgaSkgPT4gZWwuc2V0QXR0cmlidXRlKCdkYXRhLXNsaWRlJywgaSArIDEpKVxuXG4gICAgICAvLyBhZGQgaGVscGVyIGNsYXNzZXMgd2hlbiB0aGUgY2Fyb3VzZWwgbG9hZHNcbiAgICAgIHRoaXMuY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG4gICAgICB0aGlzLmNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5uZXh0RWxlbWVudFNpYmxpbmcuY2xhc3NMaXN0LmFkZCgnaXMtbmV4dCcpXG4gICAgICB0aGlzLmNvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkLmNsYXNzTGlzdC5hZGQoJ2lzLXByZXZpb3VzJylcblxuICAgICAgLy8gc2V0IGN1cnJlbnQgaXRlbSBjb3VudFxuICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcihgW2RhdGEtc2xpZGU9XCIke3RoaXMuY3VycmVudENvdW50fVwiXWApXG4gICAgfSlcbiAgfVxuXG4gIHRyYW5zaXRpb25JdGVtKCkge1xuICAgIC8vIGdldCBjdXJyZW50IGFjdGl2ZSBzbGlkZVxuICAgIHRoaXMuYWN0aXZlSXRlbSA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcignLmlzLWFjdGl2ZScpXG4gICAgdGhpcy5jdXJyZW50SXRlbSA9IHRoaXMuY2Fyb3VzZWwucXVlcnlTZWxlY3RvcihgW2RhdGEtc2xpZGU9XCIke3RoaXMuY3VycmVudENvdW50fVwiXWApXG5cbiAgICBpZiAodGhpcy5jdXJyZW50Q291bnQgPT09IDEpIHtcbiAgICAgIC8vIGlmIHdlJ3JlIGF0IHRoZSBiZWdpbm5pbmdcbiAgICAgIHRoaXMucHJldmlvdXNJdGVtID0gdGhpcy5jb250YWluZXIubGFzdEVsZW1lbnRDaGlsZFxuICAgICAgdGhpcy5uZXh0SXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRDb3VudCA9PT0gdGhpcy5zbGlkZUNvdW50KSB7XG4gICAgICAvLyBpZiB3ZSdyZSBhdCB0aGUgZW5kXG4gICAgICB0aGlzLnByZXZpb3VzSXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgICAgdGhpcy5uZXh0SXRlbSA9IHRoaXMuY29udGFpbmVyLmZpcnN0RWxlbWVudENoaWxkXG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGlmIHdlJ3JlIHNvbWV3aGVyZSBpbiB0aGUgbWlkZGxlXG4gICAgICB0aGlzLnByZXZpb3VzSXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ucHJldmlvdXNFbGVtZW50U2libGluZ1xuICAgICAgdGhpcy5uZXh0SXRlbSA9IHRoaXMuY3VycmVudEl0ZW0ubmV4dEVsZW1lbnRTaWJsaW5nXG4gICAgfVxuXG4gICAgLy8gcmVtb3ZlIGNsYXNzIG5hbWVzXG4gICAgdGhpcy5zbGlkZXMuZm9yRWFjaChlbCA9PiBlbC5jbGFzc05hbWUgPSAnJylcblxuICAgIC8vIHVwZGF0ZSBjbGFzcyBuYW1lc1xuICAgIHRoaXMuY3VycmVudEl0ZW0uY2xhc3NOYW1lID0gJ2lzLWFjdGl2ZSdcbiAgICB0aGlzLnByZXZpb3VzSXRlbS5jbGFzc05hbWUgPSAnaXMtcHJldmlvdXMnXG4gICAgdGhpcy5uZXh0SXRlbS5jbGFzc05hbWUgPSAnaXMtbmV4dCdcbiAgfVxuXG4gIC8vIHVwZGF0ZVBhZ2luYXRpb24oKSB7XG4gIC8vICAgdGhpcy5wYWdlcy5mb3JFYWNoKChwYWdlLCBpKSA9PiB7XG4gIC8vICAgICBwYWdlLmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXG4gIC8vICAgICBpZiAoaSA9PSB0aGlzLmN1cnJlbnRTbGlkZSkgcGFnZS5jbGFzc0xpc3QuYWRkKCdpcy1hY3RpdmUnKVxuICAvLyAgIH0pXG4gIC8vIH1cbn1cblxuLy8gY2xhc3MgQ2Fyb3VzZWwge1xuLy8gICBjb25zdHJ1Y3RvcigpIHtcbi8vICAgICB0aGlzLmNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbC0tY29udGFpbmVyJylcbi8vICAgICB0aGlzLmNvbnRyb2xzUHJldmlvdXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2Fyb3VzZWwtLWNvbnRyb2xzLXByZXYnKVxuLy8gICAgIHRoaXMuY29udHJvbHNOZXh0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsLS1jb250cm9scy1uZXh0Jylcbi8vICAgICB0aGlzLnNsaWRlcyA9IEFycmF5LmZyb20odGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJykpXG4vLyAgICAgdGhpcy5zbGlkZUNvdW50ID0gdGhpcy5jb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2xpJykubGVuZ3RoXG4vL1xuLy8gICAgIHRoaXMuaW5kaWNhdG9ycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJvdXNlbC0taW5kaWNhdG9ycycpXG4vLyAgICAgdGhpcy5kb3RzID0gQXJyYXkuZnJvbSh0aGlzLmluZGljYXRvcnMucXVlcnlTZWxlY3RvckFsbCgnbGknKSlcbi8vICAgICB0aGlzLmluZGljYXRvcnNMZW5ndGggPSB0aGlzLmluZGljYXRvcnMucXVlcnlTZWxlY3RvckFsbCgnbGknKS5sZW5ndGhcbi8vXG4vLyAgICAgdGhpcy5jdXJyZW50Q291bnQgPSAxXG4vLyAgICAgdGhpcy5jdXJyZW50SXRlbSA9ICcnXG4vLyAgICAgdGhpcy5hY3RpdmVJdGVtID0gJydcbi8vICAgICB0aGlzLnByZXZpb3VzSXRlbSA9ICcnXG4vLyAgICAgdGhpcy5uZXh0SXRlbSA9ICcnXG4vL1xuLy8gICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbi8vICAgfVxuLy9cbi8vICAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4vLyAgICAgLy8gcHJldmlvdXMgYXJyb3cgbW92ZXMgdG8gcHJldmlvdXMgc2xpZGVcbi8vICAgICB0aGlzLmNvbnRyb2xzUHJldmlvdXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgIGUucHJldmVudERlZmF1bHQoKVxuLy8gICAgICAgdGhpcy5jdXJyZW50Q291bnQgPT09IDEgPyB0aGlzLmN1cnJlbnRDb3VudCA9IHRoaXMuc2xpZGVDb3VudCA6IHRoaXMuY3VycmVudENvdW50LS1cbi8vICAgICAgIHRoaXMudHJhbnNpdGlvbkl0ZW0oKVxuLy8gICAgIH0pXG4vL1xuLy8gICAgIC8vIG5leHQgYXJyb3cgbW92ZXMgdG8gbmV4dCBzbGlkZVxuLy8gICAgIHRoaXMuY29udHJvbHNOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4vLyAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbi8vICAgICAgIHRoaXMuY3VycmVudENvdW50ID09PSB0aGlzLnNsaWRlQ291bnQgPyB0aGlzLmN1cnJlbnRDb3VudCA9IDEgOiB0aGlzLmN1cnJlbnRDb3VudCsrXG4vLyAgICAgICB0aGlzLnRyYW5zaXRpb25JdGVtKClcbi8vICAgICB9KVxuLy9cbi8vICAgICAvLyBkb3QgbW92ZXMgdG8gYXBwcm9wcmlhdGUgc2xpZGVcbi8vICAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZG90LCBpKSA9PiB7XG4vLyAgICAgICBkb3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbi8vICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXG4vLyAgICAgICAgIGNvbnNvbGUubG9nKGN1cnJlbnRJdGVtKTtcbi8vICAgICAgIH0pXG4vLyAgICAgfSlcbi8vXG4vLyAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbi8vXG4vLyAgICAgICAvLyBhZGQgZGF0YSBhdHRyaWJ1dGVzIHRvIHNsaWRlc1xuLy8gICAgICAgdGhpcy5zbGlkZXMuZm9yRWFjaCgoZWwsIGkpID0+IGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZScsIGkrMSkpXG4vL1xuLy8gICAgICAgLy8gYWRkIGRhdGEgYXR0cmlidXRlcyB0byBpbmRpY2F0b3JzXG4vLyAgICAgICB0aGlzLmRvdHMuZm9yRWFjaCgoZWwsIGkpID0+IGVsLnNldEF0dHJpYnV0ZSgnZGF0YS1zbGlkZScsIGkrMSkpXG4vL1xuLy8gICAgICAgLy8gYWRkIGhlbHBlciBjbGFzc2VzIHdoZW4gdGhlIGNhcm91c2VsIGxvYWRzXG4vLyAgICAgICB0aGlzLmNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKCdjYXJvdXNlbC0taXRlbS1hY3RpdmUnKVxuLy8gICAgICAgdGhpcy5jb250YWluZXIuZmlyc3RFbGVtZW50Q2hpbGQubmV4dEVsZW1lbnRTaWJsaW5nLmNsYXNzTGlzdC5hZGQoJ2Nhcm91c2VsLS1pdGVtLW5leHQnKVxuLy8gICAgICAgdGhpcy5jb250YWluZXIubGFzdEVsZW1lbnRDaGlsZC5jbGFzc0xpc3QuYWRkKCdjYXJvdXNlbC0taXRlbS1wcmV2aW91cycpXG4vL1xuLy8gICAgICAgLy8gc2V0IGN1cnJlbnQgaXRlbSBjb3VudFxuLy8gICAgICAgdGhpcy5jdXJyZW50SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNsaWRlPVwiJHt0aGlzLmN1cnJlbnRDb3VudH1cIl1gKVxuLy8gICAgIH0pXG4vLyAgIH1cbi8vXG4vLyAgIHVwZGF0ZURvdHMoKSB7XG4vLyAgICAgdGhpcy5kb3RzLmZvckVhY2goKGRvdCwgaSkgPT4ge1xuLy8gICAgICAgZG90LmNsYXNzTGlzdC5yZW1vdmUoJ2lzLWFjdGl2ZScpXG4vLyAgICAgICBpZiAoaSA9PSB0aGlzLmN1cnJlbnRTbGlkZSkgZG90LmNsYXNzTGlzdC5hZGQoJ2lzLWFjdGl2ZScpXG4vLyAgICAgfSlcbi8vICAgfVxuLy9cbi8vICAgdHJhbnNpdGlvbkl0ZW0oKSB7XG4vLyAgICAgLy8gZ2V0IGN1cnJlbnQgYWN0aXZlIHNsaWRlXG4vLyAgICAgdGhpcy5hY3RpdmVJdGVtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsLS1pdGVtLWFjdGl2ZScpXG4vLyAgICAgdGhpcy5jdXJyZW50SXRlbSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXNsaWRlPVwiJHt0aGlzLmN1cnJlbnRDb3VudH1cIl1gKVxuLy9cbi8vICAgICBpZiAodGhpcy5jdXJyZW50Q291bnQgPT0gMSkge1xuLy8gICAgICAgLy8gaWYgd2UncmUgYXQgdGhlIGJlZ2lubmluZ1xuLy8gICAgICAgdGhpcy5wcmV2aW91c0l0ZW0gPSB0aGlzLmNvbnRhaW5lci5sYXN0RWxlbWVudENoaWxkXG4vLyAgICAgICB0aGlzLm5leHRJdGVtID0gdGhpcy5jdXJyZW50SXRlbS5uZXh0RWxlbWVudFNpYmxpbmdcbi8vICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudENvdW50ID09IHRoaXMuc2xpZGVDb3VudCkge1xuLy8gICAgICAgLy8gaWYgd2UncmUgYXQgdGhlIGVuZFxuLy8gICAgICAgdGhpcy5wcmV2aW91c0l0ZW0gPSB0aGlzLmN1cnJlbnRJdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbi8vICAgICAgIHRoaXMubmV4dEl0ZW0gPSB0aGlzLmNvbnRhaW5lci5maXJzdEVsZW1lbnRDaGlsZFxuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICAvLyBpZiB3ZSdyZSBzb21ld2hlcmUgaW4gdGhlIG1pZGRsZVxuLy8gICAgICAgdGhpcy5wcmV2aW91c0l0ZW0gPSB0aGlzLmN1cnJlbnRJdGVtLnByZXZpb3VzRWxlbWVudFNpYmxpbmdcbi8vICAgICAgIHRoaXMubmV4dEl0ZW0gPSB0aGlzLmN1cnJlbnRJdGVtLm5leHRFbGVtZW50U2libGluZ1xuLy8gICAgIH1cbi8vXG4vLyAgICAgLy8gcmVtb3ZlIGNsYXNzIG5hbWVzXG4vLyAgICAgdGhpcy5zbGlkZXMuZm9yRWFjaChlbCA9PiBlbC5jbGFzc05hbWUgPSAnJylcbi8vXG4vLyAgICAgLy8gdXBkYXRlIGNsYXNzIG5hbWVzXG4vLyAgICAgdGhpcy5jdXJyZW50SXRlbS5jbGFzc05hbWUgPSAnY2Fyb3VzZWwtLWl0ZW0tYWN0aXZlJ1xuLy8gICAgIHRoaXMucHJldmlvdXNJdGVtLmNsYXNzTmFtZSA9ICdjYXJvdXNlbC0taXRlbS1wcmV2aW91cydcbi8vICAgICB0aGlzLm5leHRJdGVtLmNsYXNzTmFtZSA9ICdjYXJvdXNlbC0taXRlbS1uZXh0J1xuLy8gICB9XG4vLyB9XG4vL1xuLy8gZXhwb3J0IGRlZmF1bHQgQ2Fyb3VzZWw7XG5cbmV4cG9ydCBkZWZhdWx0IENhcm91c2VsO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9DYXJvdXNlbC5qcyIsImltcG9ydCBqdW1wIGZyb20gJ2p1bXAuanMnXG5cbmNsYXNzIENoYXB0ZXJKdW1wIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5jaGFwdGVycyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5hcnRpY2xlX19jaGFwdGVycyBsaSBhJylcblxuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKVxuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcnMoKSB7XG4gICAgdGhpcy5jaGFwdGVycy5mb3JFYWNoKGNoYXB0ZXIgPT4ge1xuICAgICAgY2hhcHRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGUgPT4ge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcbiAgICAgICAganVtcChjaGFwdGVyLmhhc2gsIHtcbiAgICAgICAgICBvZmZzZXQ6IC0xMTAsXG4gICAgICAgICAgZHVyYXRpb246IDUwMFxuICAgICAgICB9KVxuICAgICAgfSlcbiAgICB9KVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IENoYXB0ZXJKdW1wXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9fc3JjL2Fzc2V0cy9qYXZhc2NyaXB0cy9jb21wb25lbnRzL0NoYXB0ZXJKdW1wLmpzIiwiaW1wb3J0IHsgc2Nyb2xsUG9zaXRpb24gfSBmcm9tICcuLi91dGlsaXRpZXMvc2Nyb2xsUG9zaXRpb24nXG5cbmNsYXNzIE5hdmlnYXRpb24ge1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubmF2SGVhZGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdmlnYXRpb25fX2hlYWRlcicpO1xuXG4gICAgdGhpcy5hY3RpdmVDbGFzcyA9IGBpcy1jb2xsYXBzZWRgXG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgKCkgPT4ge1xuICAgICAgKHNjcm9sbFBvc2l0aW9uKCdzdGF0aWMnKSA+IDUwKVxuICAgICAgICA/IHRoaXMuYWRkQWN0aXZlQ2xhc3MoKVxuICAgICAgICA6IHRoaXMucmVtb3ZlQWN0aXZlQ2xhc3MoKVxuICAgIH0pXG4gIH1cblxuICBhZGRBY3RpdmVDbGFzcygpIHtcbiAgICB0aGlzLm5hdkhlYWRlci5jbGFzc0xpc3QuYWRkKHRoaXMuYWN0aXZlQ2xhc3MpO1xuICB9XG5cbiAgcmVtb3ZlQWN0aXZlQ2xhc3MoKSB7XG4gICAgdGhpcy5uYXZIZWFkZXIuY2xhc3NMaXN0LnJlbW92ZSh0aGlzLmFjdGl2ZUNsYXNzKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBOYXZpZ2F0aW9uO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9OYXZpZ2F0aW9uLmpzIiwiY2xhc3MgU2VhcmNoIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5zZWFyY2hJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmpzLXNlYXJjaEJ1dHRvbicpXG4gICAgdGhpcy5zZWFyY2hGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWFyY2gnKVxuICAgIHRoaXMuc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoIGlucHV0W3R5cGU9XCJzZWFyY2hcIl0nKVxuICAgIHRoaXMuc2VhcmNoQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuanMtc2VhcmNoQ2xvc2UnKVxuXG4gICAgdGhpcy5hY3RpdmVDbGFzcyA9IGBpcy1hY3RpdmVgXG5cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXJzKCk7XG4gIH1cblxuICBhZGRFdmVudExpc3RlbmVycygpIHtcbiAgICB0aGlzLnNlYXJjaEljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgIXRoaXMuc2VhcmNoRmllbGQuY2xhc3NMaXN0LmNvbnRhaW5zKHRoaXMuYWN0aXZlQ2xhc3MpXG4gICAgICAgID8gdGhpcy5leHBhbmRTZWFyY2goKVxuICAgICAgICA6IHRoaXMuY29sbGFwc2VTZWFyY2goKVxuICAgIH0pXG5cbiAgICB0aGlzLnNlYXJjaENsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmNvbGxhcHNlU2VhcmNoKCk7XG4gICAgfSlcbiAgfVxuXG4gIGV4cGFuZFNlYXJjaCgpIHtcbiAgICB0aGlzLnNlYXJjaEZpZWxkLmNsYXNzTGlzdC5hZGQodGhpcy5hY3RpdmVDbGFzcyk7XG4gICAgdGhpcy5zZWFyY2hJbnB1dC5mb2N1cygpXG4gIH1cblxuICBjb2xsYXBzZVNlYXJjaCgpIHtcbiAgICB0aGlzLnNlYXJjaEZpZWxkLmNsYXNzTGlzdC5yZW1vdmUodGhpcy5hY3RpdmVDbGFzcyk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgU2VhcmNoO1xuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vX3NyYy9hc3NldHMvamF2YXNjcmlwdHMvY29tcG9uZW50cy9TZWFyY2guanMiLCJjbGFzcyBUaGVtZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy50aGVtZXMgPSBbXG4gICAgICBcIk1hY2hvIE1hblwiXG4gICAgXVxuXG4gICAgdGhpcy50aGVtZU1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3RbbmFtZT1cInRoZW1lc1wiXScpXG5cbiAgICB0aGlzLnBvcHVsYXRlVGhlbWVTZWxlY3RvcigpO1xuICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcnMoKTtcbiAgfVxuXG4gIGFkZEV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMudGhlbWVNZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGUgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBjb25zdCB0aGVtZSA9IGUudGFyZ2V0LnZhbHVlXG5cbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0ID0gdGhlbWU7XG4gICAgfSlcbiAgfVxuXG4gIHBvcHVsYXRlVGhlbWVTZWxlY3RvcigpIHtcbiAgICB0aGlzLnRoZW1lcy5mb3JFYWNoKHRoZW1lID0+IHtcbiAgICAgIGxldCB0aGVtZUNsYXNzID0gdGhlbWUucmVwbGFjZSggLyAvZywgXCJfXCIgKS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICBsZXQgb3B0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnb3B0aW9uJyk7XG4gICAgICBvcHRpb24udmFsdWUgPSBgdGhlbWVfXyR7dGhlbWVDbGFzc31gXG4gICAgICBvcHRpb24uaW5uZXJIVE1MID0gdGhlbWU7XG5cbiAgICAgIHRoaXMudGhlbWVNZW51LmFwcGVuZENoaWxkKG9wdGlvbik7XG4gICAgfSk7XG4gIH1cblxufVxuXG5leHBvcnQgZGVmYXVsdCBUaGVtZTtcblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL19zcmMvYXNzZXRzL2phdmFzY3JpcHRzL2NvbXBvbmVudHMvVGhlbWUuanMiLCJpbXBvcnQgTmF2aWdhdGlvbiBmcm9tICcuL2NvbXBvbmVudHMvTmF2aWdhdGlvbidcbmltcG9ydCBUaGVtZSBmcm9tICcuL2NvbXBvbmVudHMvVGhlbWUnXG5pbXBvcnQgU2VhcmNoIGZyb20gJy4vY29tcG9uZW50cy9TZWFyY2gnXG5pbXBvcnQgQ2Fyb3VzZWwgZnJvbSAnLi9jb21wb25lbnRzL0Nhcm91c2VsJ1xuaW1wb3J0IEFydGljbGVQcm9ncmVzcyBmcm9tICcuL2NvbXBvbmVudHMvQXJ0aWNsZVByb2dyZXNzJ1xuaW1wb3J0IENoYXB0ZXJKdW1wIGZyb20gJy4vY29tcG9uZW50cy9DaGFwdGVySnVtcCdcblxuaW1wb3J0IEJhY2tUb1RvcCBmcm9tICcuL2NvbXBvbmVudHMvQmFja1RvVG9wJ1xuXG5uZXcgQmFja1RvVG9wKClcblxuaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZpZ2F0aW9uX19oZWFkZXInKSkgbmV3IE5hdmlnYXRpb24oKTtcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzZWxlY3RbbmFtZT1cInRoZW1lc1wiXScpKSBuZXcgVGhlbWUoKTtcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VhcmNoJykpIG5ldyBTZWFyY2goKTtcbmlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYXJ0aWNsZScpKSBuZXcgQXJ0aWNsZVByb2dyZXNzKCk7XG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFydGljbGVfX2NoYXB0ZXJzJykpIG5ldyBDaGFwdGVySnVtcCgpO1xuXG5pZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcm91c2VsJykpIHtcblx0Y29uc3QgY2Fyb3VzZWxzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcm91c2VsJyk7XG5cdGZvciAobGV0IGNhcm91c2Vsc0luZGV4ID0gMCwgbGVuZ3RoID0gY2Fyb3VzZWxzLmxlbmd0aDsgY2Fyb3VzZWxzSW5kZXggPCBsZW5ndGg7IGNhcm91c2Vsc0luZGV4KyspIHtcblx0XHRuZXcgQ2Fyb3VzZWwoY2Fyb3VzZWxzW2Nhcm91c2Vsc0luZGV4XSk7XG5cdH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL19zcmMvYXNzZXRzL2phdmFzY3JpcHRzL21haW4uanMiXSwic291cmNlUm9vdCI6IiJ9