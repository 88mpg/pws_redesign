import Navigation from './components/Navigation'
import Theme from './components/Theme'
import Search from './components/Search'
import Carousel from './components/Carousel'
import ArticleProgress from './components/ArticleProgress'
import ChapterJump from './components/ChapterJump'

import BackToTop from './components/BackToTop'

new BackToTop()

if (document.querySelector('.navigation__header')) new Navigation();
if (document.querySelector('select[name="themes"]')) new Theme();
if (document.querySelector('.search')) new Search();
if (document.querySelector('.article')) new ArticleProgress();
if (document.querySelector('.article__chapters')) new ChapterJump();

if (document.querySelector('.carousel')) {
	const carousels = document.querySelectorAll('.carousel');
	for (let carouselsIndex = 0, length = carousels.length; carouselsIndex < length; carouselsIndex++) {
		new Carousel(carousels[carouselsIndex]);
	}
}
