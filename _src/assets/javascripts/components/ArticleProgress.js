import { scrollPosition } from '../utilities/scrollPosition'

class ArticleProgress {
  constructor() {
    this.article = document.querySelector('.article section')
    this.articlePosition = this.article.getBoundingClientRect()
    this.articleProgress = document.querySelector('.navigation__articleProgress')

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', e => {
      this.articleProgress.style.transform = `translate3d(-${scrollPosition('percent')}%, 0, 0)`
    })
  }
}

export default ArticleProgress;
