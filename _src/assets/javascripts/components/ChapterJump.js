import jump from 'jump.js'

class ChapterJump {
  constructor() {
    this.chapters = document.querySelectorAll('.article__chapters li a')

    this.addEventListeners()
  }

  addEventListeners() {
    this.chapters.forEach(chapter => {
      chapter.addEventListener('click', e => {
        e.preventDefault()
        jump(chapter.hash, {
          offset: -110,
          duration: 500
        })
      })
    })
  }
}

export default ChapterJump
