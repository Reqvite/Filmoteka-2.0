import { refs } from "../refs";

 import {actorDetailsMarkup, createFilmDetailsMarkup} from '../markups/modalDetailsMarkup.js'

//detailsModal
refs.body.addEventListener('click', openModal)

function openModal(e) {
    
    if (e.target.closest('li')?.classList.contains('navbar__item-sign-in')) {
        openRegistrationModal()
         document.addEventListener('keydown', checkModalKey )
    }


    if (e.target.classList.contains('backdrop') || e.target.classList.contains('registration-backdrop')) {
        closeModal() 
    }
    
    let id = e.target?.closest('li')?.dataset.id

    if (!e.target?.closest('li')?.hasAttribute('data-name')) {
        return;
    } else {
        refs.body.style.overflow = 'hidden'
        document.addEventListener('keydown', checkModalKey )
            
        
        if (e.target.closest('li').dataset.name === 'actor') {
            actorDetailsMarkup(id);
        }

        if (e.target.closest('li').dataset.name === 'film') {
            createFilmDetailsMarkup(id);
        }
    }

}

    function checkModalKey(e) {
        console.log(e.code)
       if (e.code === 'Escape') {

      closeModal() 
        }
        
 
}

function closeModal() {
    refs.body.style.overflowY = 'scroll'
    refs.backdropModal.classList.add('is-hidden')
     refs.registationModal.classList.add('is-hidden')
           document.removeEventListener('keydown', checkModalKey)
           
           refs.modal.innerHTML = ''
}


//registrationModal

function openRegistrationModal() {
    refs.registationModal.classList.toggle('is-hidden')

}