import img from '../../images/errorImgs/csaff-no-poster.jpg';

import { refs } from '../refs';
import { createDefaultPagination } from '../components/pagination';
import { fetchQuery } from '../service/fetchQuery';

const prevQuery = [];
export const queryMovieMarkup = async (query, pageNumber) => {
  prevQuery.push(query);

  if (prevQuery[0] !== query) {
    prevQuery.splice(0, prevQuery.length);
    prevQuery.push(query);
  }

  const resp = await fetchQuery(query, pageNumber);

  const markup = resp.data.results.reduce(
    (acc, { poster_path, title, release_date, vote_average, id }) => {
      if (prevQuery.length === 1) {
        createDefaultPagination(query, resp.data.total_pages);
      }

      poster_path
        ? (poster_path = `https://www.themoviedb.org/t/p/w500/${poster_path}`)
        : (poster_path = img);

      const date = release_date?.slice(0, 4) || '?';

      const rating = vote_average.toFixed(1);

      return (
        acc +
        `<li class="popular-list__item" data-name="film" data-id=${id}>
          <img class="popular-list__img" src="${poster_path}" alt="${title}">
          <div class="popular-list__information">
          <p class="popular-list__title">${title}</p>
          <span class="popular-list__genre">Genre</span><span class="popular-list__year">${date}</span>
          <span class="popular-list__rating">${rating}</span>
          </div>
        </li>`
      );
    },
    ''
  );

  refs.popularFilmList.innerHTML = '';
  refs.popularFilmList.insertAdjacentHTML('beforeend', markup);
};
