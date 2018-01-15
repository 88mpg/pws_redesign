function scrollPosition( element ){
  var h = document.documentElement,
      b = document.body,
      st = 'scrollTop',
      sh = 'scrollHeight';
  if (element == 'percent') {
    return (100 - ((h[st]||b[st]) / ((h[sh]||b[sh]) - h.clientHeight) * 100)).toFixed(2);
  } else if (element == 'static') {
    return window.scrollY;
  }
}

export { scrollPosition }
