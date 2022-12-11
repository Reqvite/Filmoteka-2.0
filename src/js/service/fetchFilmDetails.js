import axios from 'axios';

const API_KEY = 'e145377b3a98d62607e7dc90339d279b';

let language = localStorage.getItem('language');

//https://developers.themoviedb.org/3/tv/get-tv-details
//если дата тв то
//https://api.themoviedb.org/3/tv/119051?api_key=e145377b3a98d62607e7dc90339d279b&language=en-US
export const fetchFilmDetails = async id => {
  return await axios.get(
    `https://api.themoviedb.org/3/movie/${id}?api_key=e145377b3a98d62607e7dc90339d279b&language=${language}`
  );
};
