class ArticleProgress {
  constructor() {
    this.article = document.querySelector('.article section')
    this.articlePosition = this.article.getBoundingClientRect()
    this.articleProgress = document.querySelector('.navigation__articleProgress')

    this.addEventListeners();
  }

  addEventListeners() {
    window.addEventListener('scroll', e => {
      console.log(this.determinePosition());
      this.articleProgress.style.transform = `translate3d(-${this.determinePosition()}%, 0, 0)`
    })
  }

  determinePosition( element ){
    var h = document.documentElement,
        b = document.body,
        st = 'scrollTop',
        sh = 'scrollHeight';
    return (100 - ((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100)).toFixed(2);
  }
}

export default ArticleProgress;
