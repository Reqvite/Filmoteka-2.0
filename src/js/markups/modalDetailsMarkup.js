import img from '../../images/errorImgs/csaff-no-poster.jpg';

import { refs } from "../refs"

import { fetchPopularActors } from "../service/fetchPopularActors";
import { fetchFilmDetails } from "../service/fetchFilmDetails";
import { title } from 'process';

export const actorDetailsMarkup = async (id) => {
    const resp = await fetchPopularActors();

    const { profile_path, name, known_for } = resp.data.results.filter((el) => el.id === Number(id))[0];


  const actorFilmsListMarkup = known_for.reduce((acc, { poster_path, original_title, original_name, id }) => {
      
      poster_path
    ? (poster_path = `https://www.themoviedb.org/t/p/w500/${poster_path}`)
    : (poster_path = img);



       return acc + `<li class="actor-films-list__item" data-name="film" data-id="${id}">
        <img class="actor-films-list__img" src="${poster_path}"  width="150" height="255" alt="${original_title || original_name 
}">
        <p class="actor-films-list__title">${original_title || original_name}</p>
        </li>`
    },'')


    const markup = ` <div class="modal-container-actors">
  <img class="modal-container-actors__img" src="https://www.themoviedb.org/t/p/w500/${profile_path}" alt="${name} class="modal-container__img">
  <div class="modal-details">
    <p class="modal-details__name">${name} is known for</p>
    <ul class="actor-films-list list">${actorFilmsListMarkup}</ul>
  </div>
</div>`
        
   
    
    refs.modal.insertAdjacentHTML("afterbegin", markup)
       refs.backdropModal.classList.remove('is-hidden')
}



export const createFilmDetailsMarkup = async (idFilm) => {

    const resp = await fetchFilmDetails(idFilm);
     
  let {
    poster_path,
    original_title,
    vote_average,
    vote_count,
    popularity,
    genres,
    overview,
    id,
  } = resp.data;

  let rating = null;

  poster_path
    ? (poster_path = `https://www.themoviedb.org/t/p/w500/${poster_path}`)
    : (poster_path = img);
  vote_average
    ? (vote_average = vote_average.toFixed(1))
    : (vote_average = '?');



  if (vote_average >= 7) {
    rating = 'masterpiece';
  } else if (vote_average >= 5 && vote_average <= 7) {
    rating = 'good';
  } else if (vote_average <= 5) {
    rating = 'bad';
  }

  const markup = `<div class="modal-container-film">
	<img class="modal-img" src="${poster_path}" alt="${original_title}" data-id="${id}" />
	<div class="film-details">
		<h2 class="film-details__main-title">${original_title}</h2>
		<ul class="details-list list">
			<li class="details-list__item">
				<p class="details-list_title">Vote / Votes</p>
				<span class="details-list__information-1 ${rating}">${vote_average}</span>&nbsp/&nbsp<span
					class="details-list__information-2">${vote_count}</span>
			</li>
			<li class="details-list__item">
				<p class="details-list_title">Popularity</p>
				<span class="details-list__information-2">${popularity}</span>
			</li>
			<li class="details-list__item">
				<p class="details-list_title">Original Title</p>
				<span class="details-list__information-2 ">${original_title}</span>
			</li>
			<li class="details-list__item">
				<p class="details-list_title">Genre</p>
				<span class="details-list__information-2">${genres.map(el => {
          return el.name;
        })}</span>
			</li>
		</ul>
		<h3 class="film-details__secondary-title">About</h3>
		<p class="film-details__about">${overview}</p>
		<ul class="buttons-list list">		
		</ul>
	</div>
</div>`;

    
    if (refs.modal.children.length === 1) {
       refs.modal.insertAdjacentHTML("beforeend", markup) 
    } else if (refs.modal.children.length >= 2) {
        let filmContainer = document.querySelector('.modal-container-film')   
        filmContainer.remove();
       refs.modal.insertAdjacentHTML("beforeend", markup) 
    }
    else {
           refs.modal.insertAdjacentHTML("afterbegin", markup)
  }
     refs.backdropModal.classList.remove('is-hidden')
}
    


