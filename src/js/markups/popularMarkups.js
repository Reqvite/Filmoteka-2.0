import img from '../../images/errorImgs/csaff-no-poster.jpg';

import { fetchPopularMovieDay } from "../service/fetchPopularMovie"
import { fetchPopularActors } from "../service/fetchPopularActors"
import { refs } from "../refs"



export const popularMovieMarkupSlider = async () => {
    const resp = await fetchPopularActors()

   const markup = resp.data.results.reduce((acc, { profile_path, name, id }) => {
       
        return acc + `<li class="swiper-slide" data-name="actor" data-id="${id}"><img class="main-slider__img" src="https://www.themoviedb.org/t/p/w500/${profile_path}" alt="${name}"></li>`
        
    }, '')
    
    refs.mainSliderList.insertAdjacentHTML('beforeend', markup)
}


popularMovieMarkupSlider()

//Page open Markup popularFilms
let pageNumber = localStorage.getItem("popularPage") || 1;

export const popularMovieMarkup = async (pageNumber) => {

    const resp = await fetchPopularMovieDay(pageNumber)
    
    console.log(resp)

    const markup = resp.data.results.reduce((acc, { poster_path, title, release_date, vote_average, id }) => {
    

    poster_path
    ? (poster_path = `https://www.themoviedb.org/t/p/w500/${poster_path}`)
    : (poster_path = img);

          refs.popularFilmList.setAttribute('data-currentPage', pageNumber);
        
        const date = release_date.slice(0, 4);

        const rating = vote_average.toFixed(1)

        return acc + `<li class="popular-list__item" data-name="film" data-id=${id}>
          <img class="popular-list__img" src="${poster_path}" alt="${title}">
          <div class="popular-list__information">
          <p class="popular-list__title">${title}</p>
          <span class="popular-list__genre">Genre</span><span class="popular-list__year">${date}</span>
          <span class="popular-list__rating">${rating}</span>
          </div>
        </li>`
    
    }, '')
    
  refs.popularFilmList.insertAdjacentHTML('beforeend', markup)  
}

popularMovieMarkup(pageNumber)

