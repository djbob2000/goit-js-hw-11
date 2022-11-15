import { galleryLightbox } from './js/simplelightbox';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { fetchImages } from './js/API';
const refs = {
  searchFormQuery: document.querySelector('#query'),
  searchButton: document.querySelector('#search-button'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchButton.addEventListener('click', onSearch);
refs.loadMoreBtn.addEventListener('click', loadMore);

let page = 1;

async function onSearch(evt) {
  evt.preventDefault();
  page = 1;
  refs.gallery.innerHTML = '';
  try {
    const response = await fetchImages(refs.searchFormQuery.value, page);
    const { hits, totalHits } = response.data;

    // ============================
    if (hits.length == 0) {
      Notify.info("We're sorry, no images matched search results.");
    } else {
      Notify.success(`Hooray! We found ${totalHits} images.`);
      renderGallery(hits);
      galleryLightbox.refresh();
      refs.loadMoreBtn.classList.remove('visually-hidden');
    }
  } catch (error) {
    console.error(error);
  }
}

async function loadMore(evt) {
  evt.preventDefault();
  refs.loadMoreBtn.classList.add('visually-hidden');
  page += 1;
  const response = await fetchImages(refs.searchFormQuery.value, page);
  const { hits, totalHits } = response.data;

  if (refs.gallery.children.length === totalHits) {
    return Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
  } else {
    renderGallery(hits);
    galleryLightbox.refresh();
    refs.loadMoreBtn.classList.remove('visually-hidden');
  }
}

function renderGallery(hits) {
  const markup = hits
    .map(
      hit => `
      <div class="photo-card">
      <a class="gallery__link" href="${hit.largeImageURL}">
        <img src="${hit.webformatURL}" alt="${hit.tags}" loading="lazy" />
        </a>
        <div class="info">
          <p class="info-item">
            <b>❤</b>${hit.likes}
          </p>
          <p class="info-item">
            <b>👁</b>${hit.views}
          </p>
          <p class="info-item">
            <b>💬</b>${hit.comments}
          </p>
          <p class="info-item">
            <b>⏬</b>${hit.downloads}
          </p>
        </div>
      </div>
      `
    )
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
