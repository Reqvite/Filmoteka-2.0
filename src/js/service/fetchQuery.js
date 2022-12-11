import axios from 'axios';
import { refs } from '../refs';

import { queryMovieMarkup } from '../markups/searchQueryMarkup';

let query = null;
let pageNumber = 1;

refs.searchForm.addEventListener('input', e => {
  query = e.target.value;
});

let language = localStorage.getItem('language');

const API_KEY = 'e145377b3a98d62607e7dc90339d279b';

export const fetchQuery = async (query, pageNumber) => {
  return await axios.get(
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}&page=${pageNumber}`
  );
};

refs.searchForm.addEventListener('submit', e => {
  e.preventDefault();
  queryMovieMarkup(query, pageNumber);
});
