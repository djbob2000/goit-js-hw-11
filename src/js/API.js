import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '31182736-3dd78a34c786b70675da4185d';
const PER_PAGE = 40;

async function fetchImages(searchQuery, page) {
  try {
    const fetchData = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: searchQuery,
        image_type: 'photo',
        orientation: 'horizontal',
        page: page,
        per_page: PER_PAGE,
      },
    });
    return fetchData;
  } catch (error) {
    console.log(error);
  }
}

export { fetchImages };
