function smoothScroll() {
  const refs = {
    gallery: document.querySelector('.gallery'),
  };
  const { height: cardHeight } =
    refs.gallery.firstElementChild.getBoundingClientRect();

  return window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

export { smoothScroll };
