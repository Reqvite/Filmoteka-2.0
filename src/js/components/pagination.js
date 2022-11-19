import { refs } from "../refs";

import { popularMovieMarkup } from "../markups/popularMarkups"; 

import { fetchPopularMovieDay } from "../service/fetchPopularMovie";

        const paginationArrowBackwardItem = document.querySelector('.pagination-list__arrow-backward');

         const backWardDotsSpan = document.querySelector('.pagination-list__backward-dots-span');
         
           const paginationListprevPageSpan = document.querySelector('.pagination-list__prev-page');


        const paginationListActiveprevPageSpan = document.querySelector('.pagination-list__active-prev-page');
  
    const paginationListActivePageSpan = document.querySelector('.pagination-list__active-page');
        
    const paginationListActivenextPageSpan = document.querySelector('.pagination-list__active-next-page');
        
    const paginationListnextPageItem = document.querySelector('.pagination-list__next-item');
        const paginationListnextPageSpan = document.querySelector('.pagination-list__next-page');
   
const forwardDotsItem = document.querySelector('.pagination-list__forward-dots');
              
const paginationListTotalSpan = document.querySelector('.pagination-list__total-span');
    

const paginationListArrowForward = document.querySelector('.pagination-list__arrow-forward');

const  createDefaultPagination = async () => {
        let pageNumber = localStorage.getItem("popularPage") || 1;
    
       const resp = await fetchPopularMovieDay(pageNumber)
    
       let  totalPage = resp.data.total_pages
        
  
        if (pageNumber < 5) {
            
             if (pageNumber > 1) {

        paginationArrowBackwardItem.style.display ='block'
       
    } else {
        paginationArrowBackwardItem.style.display ='none'
            }
            
            backWardDotsSpan.textContent = '2';
            paginationListActivenextPageSpan.textContent = '...';

            paginationListnextPageItem.style.display = 'none';
            forwardDotsItem.style.display = 'none';
            paginationListTotalSpan.textContent = totalPage;

        } else {

            // if (pageNumber === totalPage - 5 ) {
            //     paginationListArrowForward.style.display = 'none';

            // }



            backWardDotsSpan.textContent = '...';
            paginationListnextPageItem.style.display = 'block';
            forwardDotsItem.style.display = 'block';
         paginationListprevPageSpan.textContent = +pageNumber - 2;
            paginationListActiveprevPageSpan.textContent = +pageNumber - 1;
            paginationListActivePageSpan.textContent = pageNumber; 
            paginationListActivenextPageSpan.textContent = +pageNumber + 1;
            paginationListnextPageSpan.textContent = +pageNumber + 2;

            paginationListTotalSpan.textContent = totalPage;
    }


}

createDefaultPagination()


export const handlePagination = async (e) => {
    
    let pageNumber = e.target.textContent;

    console.log(pageNumber)
    localStorage.setItem('popularPage', pageNumber)

    refs.popularFilmList.innerHTML = '';

    popularMovieMarkup(pageNumber)


    if (pageNumber > 1) {

        paginationArrowBackwardItem.style.display ='block'
       
    } else {
        paginationArrowBackwardItem.style.display ='none'
     }


    if (pageNumber >= 5) {
          backWardDotsSpan.textContent = '...';
            paginationListnextPageItem.style.display = 'block';
            forwardDotsItem.style.display = 'block';
         paginationListprevPageSpan.textContent = +pageNumber - 2;
            paginationListActiveprevPageSpan.textContent = +pageNumber - 1;
            paginationListActivePageSpan.textContent = pageNumber; 
            paginationListActivenextPageSpan.textContent = +pageNumber + 1;
            paginationListnextPageSpan.textContent = +pageNumber + 2;


    
    } else {
        backWardDotsSpan.textContent = 2;
        paginationListprevPageSpan.textContent = 3;
         paginationListActiveprevPageSpan.textContent = 4;
            paginationListActivePageSpan.textContent = 5;
            paginationListActivenextPageSpan.textContent = '...';

            paginationListnextPageItem.style.display = 'none';
            forwardDotsItem.style.display = 'none';
        }
   
    
}


refs.paginationList.addEventListener('click', handlePagination)

