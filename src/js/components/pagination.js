import { refs } from "../refs";

import { popularMovieMarkup } from "../markups/popularMarkups"; 
import { fetchPopularMovieDay } from "../service/fetchPopularMovie";


export const handlePagination = (e) => {
    let paginationArrowBackward = document.querySelector('.pagination-list__arrow-backward');

    let pageNumber = e.target.textContent;

    localStorage.setItem('popularPage', pageNumber)

    refs.popularFilmList.innerHTML = '';

    popularMovieMarkup(pageNumber)


    if (pageNumber > 1) {

        if(!paginationArrowBackward){
                     const addArrowbackward = `
    <li class="pagination-list__item pagination-list__arrow-backward"><button type="button" class="pagination-list__button"><span><-</span></button></li>
    `
        refs.paginationList.insertAdjacentHTML('afterbegin', addArrowbackward);
        } 

     } else {
         paginationArrowBackward?.remove();
    }


console.log(pageNumber)
    if (pageNumber >= 5) {
        let paginationListprevPage = document.querySelector('.pagination-list__prev-page');
        let paginationListActiveprevPage = document.querySelector('.pagination-list__active-prev-page');
        let paginationListActivePage = document.querySelector('.pagination-list__active-page');
        let paginationListActivenextPage = document.querySelector('.pagination-list__active-next-page');
        let paginationListnextPage = document.querySelector('.pagination-list__next-page');
        if (refs.paginationList.children.length !== 11) {
            refs.paginationList.innerHTML = ''; 

                fetchPopularMovieDay(pageNumber).then(resp => {
          
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

      })
        } else {
            paginationListprevPage.textContent = +pageNumber - 2;
            paginationListActiveprevPage.textContent = +pageNumber - 1;
            paginationListActivePage.textContent = pageNumber; 
            paginationListActivenextPage.textContent = +pageNumber + 1;
            paginationListnextPage.textContent = +pageNumber + 2;

    }
        }
   
    
}


refs.paginationList.addEventListener('click', handlePagination)

