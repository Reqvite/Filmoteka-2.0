import { fetchPopularMovieWeek, fetchPopularMovieDay } from "../service/fetchPopularMovie"
import { fetchPopularActors } from "../service/fetchPopularActors"
import { refs } from "../refs"

export const popularMovieMarkupSlider = async () => {
    const resp = await fetchPopularActors()

   const markup = resp.data.results.reduce((acc, { profile_path, name }) => {
       
        return acc + `<li class="swiper-slide" data-name="actor"><img class="main-slider__img" src="https://www.themoviedb.org/t/p/w500/${profile_path}" alt="${name}"></li>`
        
    }, '')
    
    refs.mainSliderList.insertAdjacentHTML('beforeend', markup)

}

popularMovieMarkupSlider()

const popularMovieMarkup = async () => {
    const resp = await fetchPopularMovieDay()
    
    const markup = resp.data.results.reduce((acc, { poster_path, title, release_date, vote_average }) => {
    
        const date = release_date.slice(0, 4);

        const rating = vote_average.toFixed(1)

        return acc + `<li class="popular-list__item" data-name="film">
          <img class="popular-list__img" src="https://www.themoviedb.org/t/p/w500/${poster_path}" alt="${title}">
          <div class="popular-list__information">
          <p class="popular-list__title">${title}</p>
          <span class="popular-list__genre">Genre</span><span class="popular-list__year">${date}</span>
          <span class="popular-list__rating">${rating}</span>
          </div>
        </li>`
    
    }, '')
    
    refs.popularFilmList.insertAdjacentHTML('beforeend', markup)
}



popularMovieMarkup()