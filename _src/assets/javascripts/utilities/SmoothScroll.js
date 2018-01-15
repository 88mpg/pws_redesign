import jump from 'jump.js'

function smoothScroll(target) {
  jump(target, {
    offset: -130
  })
}

export { smoothScroll }
