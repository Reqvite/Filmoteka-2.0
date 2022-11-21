import { refs } from "../refs";

import { popularMovieMarkup } from "../markups/popularMarkups"; 

import { fetchPopularMovieDay } from "../service/fetchPopularMovie";

        const paginationArrowBackwardItem = document.querySelector('.pagination-list__arrow-backward');

                 const backWardDotsItem = document.querySelector('.pagination-list__backward-dots');
         const backWardDotsSpan = document.querySelector('.pagination-list__backward-dots-span');
         

         const paginationListprevPageItem = document.querySelector('.pagination-list__prev-page-item');
           const paginationListprevPageSpan = document.querySelector('.pagination-list__prev-page');

const paginationListActiveprevPageItem = document.querySelector('.pagination-list__active-prev-item');
        const paginationListActiveprevPageSpan = document.querySelector('.pagination-list__active-prev-page');
  
    const paginationListActivePageSpan = document.querySelector('.pagination-list__active-page');
        
        const paginationListActivenextPageItem = document.querySelector('.pagination-list__active-next-item');
    const paginationListActivenextPageSpan = document.querySelector('.pagination-list__active-next-page');
        
    const paginationListnextPageItem = document.querySelector('.pagination-list__next-item');
        const paginationListnextPageSpan = document.querySelector('.pagination-list__next-page');
   
const forwardDotsItem = document.querySelector('.pagination-list__forward-dots');        
const forwardDotsSpan = document.querySelector('.pagination-list__forward-dots-span');

const paginationListTotalSpan = document.querySelector('.pagination-list__total-span');
    

const paginationListArrowForward = document.querySelector('.pagination-list__arrow-forward');



let minLastPage;
let totalPage;

const createDefaultPagination = async () => {
    let pageNumber = Number(localStorage.getItem("popularPage")) || 1;

    
    const resp = await fetchPopularMovieDay(pageNumber)
    
    totalPage = Number(resp.data.total_pages)
        
  
    if (pageNumber > 1) {

        paginationArrowBackwardItem.style.display = 'block';
       
    } else {
        paginationArrowBackwardItem.style.display = 'none'
    }
    
    if (+pageNumber === +totalPage) {
        paginationListArrowForward.style.display = 'none'
    } else {
        paginationListArrowForward.style.display = 'block'
    }
    
    if (pageNumber < 5) {
    
        backWardDotsSpan.textContent = '2';
        paginationListActivenextPageSpan.textContent = '...';

        paginationListnextPageItem.style.display = 'none';
        forwardDotsItem.style.display = 'none';
        paginationListTotalSpan.textContent = totalPage;

    } else {
         

          minLastPage = totalPage - 3;
            
        paginationListTotalSpan.textContent = totalPage;
        if (pageNumber <= totalPage && pageNumber >= minLastPage) {
            if (pageNumber === totalPage) {
                paginationListArrowForward.display = 'none'
            } else {
                paginationListArrowForward.display = 'block'
            }
                
            forwardDotsSpan.textContent = totalPage - 1;
            paginationListnextPageSpan.textContent = totalPage - 2;
            paginationListActivenextPageSpan.textContent = totalPage - 3;
            paginationListActivePageSpan.textContent = totalPage - 4;
            paginationListprevPageItem.style.display = 'none';
            paginationListActiveprevPageItem.style.display = 'none';


        } else {
            backWardDotsSpan.textContent = '...';
            paginationListnextPageItem.style.display = 'block';
            forwardDotsItem.style.display = 'block';
            paginationListprevPageSpan.textContent = +pageNumber - 2;
            paginationListActiveprevPageSpan.textContent = +pageNumber - 1;
            paginationListActivePageSpan.textContent = pageNumber;
            paginationListActivenextPageSpan.textContent = +pageNumber + 1;
            paginationListnextPageSpan.textContent = +pageNumber + 2;

           
        }
    
    }

     let allSpans = document.querySelectorAll('.pagination-list span');
    const arrOfSpans = [...allSpans]
   
    arrOfSpans.find(el => el.textContent === String(pageNumber)).closest('button').classList.add('is-active')
   

}

createDefaultPagination()


export const handlePagination = async (e) => {
    
        let pageNumber = e.target.textContent;
 
    if (e.target.closest('li').dataset.arrow) {
        if (e.target.closest('li').dataset.arrow === 'forward') {
            pageNumber = +refs.popularFilmList.getAttribute('data-currentPage') + 1;
        } else {
             pageNumber = +refs.popularFilmList.getAttribute('data-currentPage') - 1;
        }
    } 

    if (e.target.closest('li').dataset.dots && e.target.textContent === '...') {
        if (e.target.closest('li').dataset.dots === 'forward') {
            pageNumber = +refs.popularFilmList.getAttribute('data-currentPage') + 5;
        } else {
            if (+refs.popularFilmList.getAttribute('data-currentPage') === 5) {
               pageNumber = +refs.popularFilmList.getAttribute('data-currentPage') - 4;
            } else {
                pageNumber = +refs.popularFilmList.getAttribute('data-currentPage') - 5;
            }         
        }
    } 
        
   
    if (+pageNumber === +refs.popularFilmList.getAttribute('data-currentPage')) {
        return;
    }

        refs.popularFilmList.setAttribute('data-currentPage', pageNumber);
    localStorage.setItem('popularPage', pageNumber)

    refs.popularFilmList.innerHTML = '';

    popularMovieMarkup(pageNumber)


    if (pageNumber > 1) {

        paginationArrowBackwardItem.style.display ='block'
       
    } else {
        paginationArrowBackwardItem.style.display ='none'
     }


    if (pageNumber >= 5) {

             minLastPage = totalPage - 3;

        if (+pageNumber <= +totalPage && +pageNumber >= +minLastPage) {
        
            if (+pageNumber === +totalPage) {
           
               paginationListArrowForward.style.display = 'none'
           } else {
               paginationListArrowForward.style.display = 'block'
                }

            
            forwardDotsItem.style.display = 'block';
            forwardDotsSpan.textContent = totalPage - 1;
            paginationListnextPageItem.style.display = 'block';
            paginationListnextPageSpan.textContent = totalPage - 2;
            paginationListActivenextPageSpan.textContent = totalPage - 3;
            paginationListActivePageSpan.textContent = totalPage - 4;
            paginationListprevPageItem.style.display = 'none';
            paginationListActiveprevPageItem.style.display = 'none';
            backWardDotsItem.display = 'none'
            backWardDotsSpan.textContent = '...'

        } else {
                      backWardDotsSpan.textContent = '...';
            paginationListnextPageItem.style.display = 'block';
            forwardDotsItem.style.display = 'block';
            paginationListprevPageItem.style.display = 'block';
            paginationListActiveprevPageItem.style.display = 'block';
         paginationListprevPageSpan.textContent = +pageNumber - 2;
            paginationListActiveprevPageSpan.textContent = +pageNumber - 1;
            paginationListActivePageSpan.textContent = pageNumber; 
            paginationListActivenextPageSpan.textContent = +pageNumber + 1;
            paginationListnextPageSpan.textContent = +pageNumber + 2;
            forwardDotsSpan.textContent = '...'

        } 
    } else {
      
        backWardDotsSpan.textContent = 2;
        paginationListprevPageSpan.textContent = 3;
         paginationListActiveprevPageSpan.textContent = 4;
            paginationListActivePageSpan.textContent = 5;
            paginationListActivenextPageSpan.textContent = '...';

            paginationListnextPageItem.style.display = 'none';
        forwardDotsItem.style.display = 'none';
        
        paginationListArrowForward.style.display = 'block';
                paginationListprevPageItem.style.display = 'block';
                paginationListActiveprevPageItem.style.display = 'block';
        }
   
    let allSpans = document.querySelectorAll('.pagination-list span');
    let allButtons = document.querySelectorAll('.pagination-list__button');

    const arrOfSpans = [...allSpans]
    const arrOfButtons = [...allButtons]
   

    arrOfButtons.find(el => el.classList.contains('is-active')).classList.remove('is-active')
    arrOfSpans.find(el => el.textContent === String(pageNumber)).closest('button').classList.add('is-active')
}


refs.paginationList.addEventListener('click', handlePagination)

