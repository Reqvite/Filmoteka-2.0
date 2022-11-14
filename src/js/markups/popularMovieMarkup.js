import { fetchPopularMovieWeek } from "../service/fetchPopularMovie"
import { refs } from "../refs"

export const popularMovieMarkup = async () => {
    const resp = await fetchPopularMovieWeek()

    const markup = resp.data.results.reduce((acc, { poster_path, title }) => {
       
        return acc + `<li class="main-slider__item"><img class="main-slider__img" src="https://www.themoviedb.org/t/p/w500/${poster_path}" alt="${title}"></li>`
        
    }, '')
    

    refs.mainSliderList.insertAdjacentHTML('beforeend', markup)
}

popularMovieMarkup()

