/**
 * Debounce
 * Inspiration: https://www.freecodecamp.org/news/javascript-debounce-example/
 */

export function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), timeout);
  };
}

export function setPageTitle(title) {
  document.title = title;
}
