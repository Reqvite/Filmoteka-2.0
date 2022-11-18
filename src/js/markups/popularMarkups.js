import { fetchPopularMovieDay } from "../service/fetchPopularMovie"
import { fetchPopularActors } from "../service/fetchPopularActors"
import { handlePagination } from "../components/pagination"
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
let pageNumber = localStorage.getItem("popularPage");

export const popularMovieMarkup = async (pageNumber) => {

    const resp = await fetchPopularMovieDay(pageNumber)
    
    console.log(resp)


    const markup = resp.data.results.reduce((acc, { poster_path, title, release_date, vote_average, id }) => {
    
        const date = release_date.slice(0, 4);

        const rating = vote_average.toFixed(1)

        return acc + `<li class="popular-list__item" data-name="film" data-id=${id}>
          <img class="popular-list__img" src="https://www.themoviedb.org/t/p/w500/${poster_path}" alt="${title}">
          <div class="popular-list__information">
          <p class="popular-list__title">${title}</p>
          <span class="popular-list__genre">Genre</span><span class="popular-list__year">${date}</span>
          <span class="popular-list__rating">${rating}</span>
          </div>
        </li>`
    
    }, '')
    
    refs.popularFilmList.insertAdjacentHTML('beforeend', markup)

          
    if (pageNumber < 5) {
        if (refs.paginationList.children.length === 0) {
           createDefaultPagination(resp) 
        }
        if (refs.paginationList.children.length === 11 || refs.paginationList.children.length === 10) {
            refs.paginationList.innerHTML = '';
           createDefaultPagination(resp) 
        }
    }    
}

popularMovieMarkup(pageNumber)



function createDefaultPagination(resp) {
    
        const defaultPaginationMarkup = `
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>1</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>2</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>3</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>4</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>5</span></button></li>
        <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>...</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>${resp.data.total_pages}</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>-></span></button></li>
    `

    refs.paginationList.insertAdjacentHTML('beforeend', defaultPaginationMarkup);
}


function dynamicPagination(resp) {
     const paginationMarkup = `
        <li class="pagination-list__item pagination-list__arrow-backward"><button type="button" class="pagination-list__button"><span><-</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>1</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>...</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span class="pagination-list__prev-page">3</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span class="pagination-list__active-prev-page">4</span></button></li>
        <li class="pagination-list__item "><button type="button" class="pagination-list__button"><span class="pagination-list__active-page">5</span></button></li>
         <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span class="pagination-list__active-next-page">6</span></button></li>
          <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span class="pagination-list__next-page">7</span></button></li>
          <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>...</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>${resp.data.total_pages}</span></button></li>
    <li class="pagination-list__item"><button type="button" class="pagination-list__button"><span>-></span></button></li>
    `
      
          
         refs.paginationList.insertAdjacentHTML('beforeend', paginationMarkup);
}